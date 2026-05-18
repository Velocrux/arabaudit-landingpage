"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { AutoplayConfig, AutoplayStep, AutoplayCursorState } from "./types";

const SCROLL_IDLE_BEFORE_START_MS = 1500;
const TAKEOVER_RESUME_IDLE_MS = 5000;
const DEFAULT_PRE_DELAY = 250;
const DEFAULT_POST_DELAY = 700;
const DEFAULT_TYPE_SPEED_MS = 55;
const TRAVEL_MS = 750;
const PULSE_MS = 450;
const VIEWPORT_PADDING = 80;
const TARGET_POLL_INTERVAL_MS = 250;
const TARGET_POLL_MAX_ATTEMPTS = 40;
// Shake detection: if the real mouse covers more than this many pixels of path
// length within the window below, treat it as a deliberate takeover gesture.
const SHAKE_WINDOW_MS = 260;
const SHAKE_DISTANCE_PX = 240;

export function useAutoplay(config: AutoplayConfig) {
  const { containerRef, steps, enabled = true, labelNamespace = "autoplay" } = config;
  const t = useTranslations(labelNamespace);

  const [cursorState, setCursorState] = useState<AutoplayCursorState>({
    visible: false,
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
    label: "",
    pulseKey: 0,
    instant: false,
  });

  const stepsRef = useRef<AutoplayStep[]>(steps);
  stepsRef.current = steps;

  const stepIdxRef = useRef(0);
  const finishedRef = useRef(false);
  const pausedRef = useRef(false);
  const lastInteractionRef = useRef(0);
  const startedRef = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervalsRef = useRef<ReturnType<typeof setInterval>[]>([]);
  const ioRef = useRef<IntersectionObserver | null>(null);
  const prefersReducedMotionRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    prefersReducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined") return;
    if (typeof URLSearchParams !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("autoplay") === "0") return;
    }

    const container = containerRef.current;
    if (!container) return;

    const pushTimer = (id: ReturnType<typeof setTimeout>) => {
      timersRef.current.push(id);
      return id;
    };
    const pushInterval = (id: ReturnType<typeof setInterval>) => {
      intervalsRef.current.push(id);
      return id;
    };
    const clearAll = () => {
      timersRef.current.forEach((id) => clearTimeout(id));
      intervalsRef.current.forEach((id) => clearInterval(id));
      timersRef.current = [];
      intervalsRef.current = [];
    };

    const hideCursor = () => {
      setCursorState((s) => ({ ...s, visible: false, label: "" }));
    };

    const moveCursorTo = (x: number, y: number, label: string, instant = false) => {
      setCursorState((s) => ({
        ...s,
        visible: true,
        x,
        y,
        label,
        instant: instant || prefersReducedMotionRef.current,
      }));
    };

    const firePulse = () => {
      setCursorState((s) => ({ ...s, pulseKey: s.pulseKey + 1 }));
    };

    const ensureInViewport = (el: HTMLElement): Promise<void> => {
      const rect = el.getBoundingClientRect();
      const above = rect.top < VIEWPORT_PADDING;
      const below = rect.bottom > window.innerHeight - VIEWPORT_PADDING;
      if (!above && !below) return Promise.resolve();
      el.scrollIntoView({ block: "center", behavior: "smooth" });
      return new Promise((resolve) => {
        pushTimer(setTimeout(resolve, 450));
      });
    };

    type FormFieldEl = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

    const isTypeableTextLike = (el: HTMLElement): boolean => {
      if (el instanceof HTMLTextAreaElement) return true;
      if (el instanceof HTMLInputElement) {
        // Inputs that accept free typing. Excludes date/checkbox/select etc.
        const t = (el.type || "text").toLowerCase();
        return (
          t === "text" ||
          t === "search" ||
          t === "email" ||
          t === "url" ||
          t === "tel" ||
          t === "password" ||
          t === "number"
        );
      }
      return false;
    };

    const setNativeFieldValue = (el: FormFieldEl, value: string) => {
      let proto: object;
      if (el instanceof HTMLTextAreaElement) proto = HTMLTextAreaElement.prototype;
      else if (el instanceof HTMLSelectElement) proto = HTMLSelectElement.prototype;
      else proto = HTMLInputElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
      if (setter) {
        setter.call(el, value);
      } else {
        (el as HTMLInputElement).value = value;
      }
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.dispatchEvent(new Event("change", { bubbles: true }));
    };

    const animateTyping = (
      target: HTMLElement,
      text: string,
      speedMs: number
    ): Promise<void> => {
      return new Promise((resolve) => {
        if (
          !(target instanceof HTMLInputElement) &&
          !(target instanceof HTMLTextAreaElement) &&
          !(target instanceof HTMLSelectElement)
        ) {
          // Not a fillable element — just resolve quickly so the step
          // still produces a visit + pulse.
          pushTimer(setTimeout(resolve, 100));
          return;
        }
        const el = target as FormFieldEl;
        try {
          el.focus({ preventScroll: true });
        } catch {
          el.focus();
        }

        // For selects, dates, checkboxes, etc., we don't animate characters —
        // just set the value once with the appropriate events so React (or the
        // browser) picks it up.
        if (!isTypeableTextLike(el)) {
          setNativeFieldValue(el, text);
          pushTimer(setTimeout(resolve, 280));
          return;
        }

        // Clear current value so the typing animation is visible even when
        // the field starts with a default.
        setNativeFieldValue(el, "");
        let i = 0;
        const tick = () => {
          if (pausedRef.current || finishedRef.current) {
            resolve();
            return;
          }
          i += 1;
          setNativeFieldValue(el, text.slice(0, i));
          if (i >= text.length) {
            resolve();
            return;
          }
          pushTimer(setTimeout(tick, speedMs));
        };
        pushTimer(setTimeout(tick, 180));
      });
    };

    const waitForTarget = (selector: string): Promise<HTMLElement | null> => {
      return new Promise((resolve) => {
        let attempts = 0;
        const tryFind = () => {
          if (pausedRef.current || finishedRef.current) {
            resolve(null);
            return;
          }
          const el = container.querySelector<HTMLElement>(selector);
          if (el) {
            resolve(el);
            return;
          }
          if (attempts++ >= TARGET_POLL_MAX_ATTEMPTS) {
            resolve(null);
            return;
          }
          pushTimer(setTimeout(tryFind, TARGET_POLL_INTERVAL_MS));
        };
        tryFind();
      });
    };

    const runStep = async (idx: number) => {
      if (pausedRef.current || finishedRef.current) return;
      if (idx >= stepsRef.current.length) {
        finishedRef.current = true;
        pushTimer(setTimeout(hideCursor, 600));
        return;
      }
      const step = stepsRef.current[idx];
      stepIdxRef.current = idx;

      if (step.skipIf && step.skipIf()) {
        runStep(idx + 1);
        return;
      }

      const target = await waitForTarget(step.targetSelector);
      if (pausedRef.current || finishedRef.current) return;
      if (!target) {
        runStep(idx + 1);
        return;
      }

      // Re-evaluate skipIf — state may have changed while waiting for target.
      const freshStep = stepsRef.current[idx];
      if (freshStep && freshStep.skipIf && freshStep.skipIf()) {
        runStep(idx + 1);
        return;
      }

      await ensureInViewport(target);
      if (pausedRef.current || finishedRef.current) return;

      const preDelay = step.preDelayMs ?? DEFAULT_PRE_DELAY;
      const postDelay = step.postDelayMs ?? DEFAULT_POST_DELAY;
      const label = (() => {
        try {
          return t(step.labelKey);
        } catch {
          return "";
        }
      })();

      pushTimer(
        setTimeout(() => {
          if (pausedRef.current || finishedRef.current) return;
          const rect = target.getBoundingClientRect();
          // Position the cursor so its arrow tip (~(5, 4) in the SVG)
          // points at the target's center.
          const cx = rect.left + rect.width / 2 - 5;
          const cy = rect.top + rect.height / 2 - 4;
          moveCursorTo(cx, cy, label);

          const travelMs = prefersReducedMotionRef.current ? 30 : TRAVEL_MS;
          pushTimer(
            setTimeout(() => {
              if (pausedRef.current || finishedRef.current) return;
              firePulse();
              pushTimer(
                setTimeout(async () => {
                  if (pausedRef.current || finishedRef.current) return;
                  if (step.typeText !== undefined) {
                    await animateTyping(
                      target,
                      step.typeText,
                      step.typeSpeedMs ?? DEFAULT_TYPE_SPEED_MS
                    );
                    if (pausedRef.current || finishedRef.current) return;
                  }
                  if (step.action) step.action();
                  pushTimer(
                    setTimeout(() => {
                      if (pausedRef.current || finishedRef.current) return;
                      runStep(idx + 1);
                    }, postDelay)
                  );
                }, PULSE_MS)
              );
            }, travelMs)
          );
        }, preDelay)
      );
    };

    const startSequence = () => {
      if (startedRef.current || finishedRef.current) return;
      startedRef.current = true;
      pausedRef.current = false;
      // Show the cursor at a safe initial position (lower-right area of the
      // viewport) so the visitor sees it before the first step animates it
      // toward the first target.
      const initX = Math.max(40, window.innerWidth - 220);
      const initY = Math.max(40, window.innerHeight - 200);
      setCursorState((s) => ({ ...s, visible: true, x: initX, y: initY, label: "" }));
      pushTimer(setTimeout(() => runStep(0), 300));
    };

    const pauseSequence = () => {
      if (finishedRef.current) return;
      pausedRef.current = true;
      clearAll();
      hideCursor();
    };

    const resumeSequence = () => {
      if (finishedRef.current || !pausedRef.current) return;
      pausedRef.current = false;
      runStep(stepIdxRef.current);
    };

    const onInteract = () => {
      lastInteractionRef.current = Date.now();
      if (startedRef.current && !finishedRef.current && !pausedRef.current) {
        pauseSequence();
      }
    };

    // Mouse "shake" detection: passive hovering should not count as takeover,
    // but a deliberate fast wiggle of the mouse (or touchpad) should. We
    // measure the path length the real cursor covers within a short window;
    // if it exceeds the threshold, fire onInteract.
    let mouseTrail: Array<{ x: number; y: number; t: number }> = [];
    const onMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      mouseTrail.push({ x: e.clientX, y: e.clientY, t: now });
      // Trim trail to the window.
      while (mouseTrail.length > 0 && now - mouseTrail[0].t > SHAKE_WINDOW_MS) {
        mouseTrail.shift();
      }
      if (mouseTrail.length < 3) return;
      let dist = 0;
      for (let i = 1; i < mouseTrail.length; i++) {
        const dx = mouseTrail[i].x - mouseTrail[i - 1].x;
        const dy = mouseTrail[i].y - mouseTrail[i - 1].y;
        dist += Math.sqrt(dx * dx + dy * dy);
        if (dist >= SHAKE_DISTANCE_PX) break;
      }
      if (dist >= SHAKE_DISTANCE_PX) {
        mouseTrail = [];
        onInteract();
      }
    };

    // Clicks, key presses, and touches are unambiguous takeover signals.
    container.addEventListener("mousedown", onInteract);
    container.addEventListener("touchstart", onInteract, { passive: true });
    container.addEventListener("keydown", onInteract);
    container.addEventListener("mousemove", onMouseMove);

    pushInterval(
      setInterval(() => {
        if (
          startedRef.current &&
          pausedRef.current &&
          !finishedRef.current &&
          Date.now() - lastInteractionRef.current >= TAKEOVER_RESUME_IDLE_MS
        ) {
          resumeSequence();
        }
      }, 1000)
    );

    ioRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          lastInteractionRef.current = Date.now();
          pushTimer(
            setTimeout(() => {
              if (
                !startedRef.current &&
                Date.now() - lastInteractionRef.current >= SCROLL_IDLE_BEFORE_START_MS - 50
              ) {
                startSequence();
              }
            }, SCROLL_IDLE_BEFORE_START_MS)
          );
        }
      },
      { threshold: [0.05] }
    );
    ioRef.current.observe(container);

    return () => {
      clearAll();
      ioRef.current?.disconnect();
      ioRef.current = null;
      container.removeEventListener("mousedown", onInteract);
      container.removeEventListener("touchstart", onInteract);
      container.removeEventListener("keydown", onInteract);
      container.removeEventListener("mousemove", onMouseMove);
    };
  }, [containerRef, enabled, t]);

  return cursorState;
}
