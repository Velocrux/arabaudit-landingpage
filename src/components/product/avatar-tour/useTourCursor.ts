"use client";

import { useEffect, useRef, useState } from "react";
import { CURSOR_SEQUENCES, type CursorStop } from "./cursorSequences";
import type { FeatureId } from "./types";

interface Options {
  containerRef: React.RefObject<HTMLElement | null>;
  featureId: FeatureId | null;
  active: boolean;
  reducedMotion: boolean;
}

interface CursorState {
  visible: boolean;
  x: number;
  y: number;
  label: string | null;
  labelKey: string | null;
  clickPulseKey: number;
}

const FALLBACK_POLL_INTERVAL = 100;
const FALLBACK_POLL_MAX_ATTEMPTS = 20;
const REAL_CLICK_DELAY = 220;

export function useTourCursor(options: Options): CursorState {
  const { containerRef, featureId, active, reducedMotion } = options;
  const [state, setState] = useState<CursorState>({
    visible: false,
    x: 0,
    y: 0,
    label: null,
    labelKey: null,
    clickPulseKey: 0,
  });
  const pulseKeyRef = useRef(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const sessionRef = useRef(0);

  useEffect(() => {
    const clearAll = () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };

    sessionRef.current += 1;
    const session = sessionRef.current;

    if (!active || !featureId) {
      setState((s) => ({ ...s, visible: false, label: null, labelKey: null }));
      return clearAll;
    }

    const container = containerRef.current;
    if (!container) return clearAll;
    const sequence = CURSOR_SEQUENCES[featureId];
    if (!sequence || sequence.length === 0) return clearAll;

    const positionForTarget = (
      stop: CursorStop
    ): { x: number; y: number; el: HTMLElement | null } => {
      const c = containerRef.current;
      if (!c) return { x: 0, y: 0, el: null };
      const el = c.querySelector<HTMLElement>(
        `[data-tour-target="${stop.target}"]`
      );
      if (!el) {
        return { x: 0, y: 0, el: null };
      }
      const elRect = el.getBoundingClientRect();
      const cRect = c.getBoundingClientRect();
      const x =
        elRect.left - cRect.left + elRect.width / 2 + (stop.offsetX ?? 0);
      const y =
        elRect.top - cRect.top + elRect.height / 2 + (stop.offsetY ?? 0);
      return { x, y, el };
    };

    const visitStop = (stop: CursorStop) => {
      const apply = (attempt: number) => {
        if (sessionRef.current !== session) return;
        const { x, y, el } = positionForTarget(stop);
        if (!el) {
          if (attempt >= FALLBACK_POLL_MAX_ATTEMPTS) return;
          const t = setTimeout(() => apply(attempt + 1), FALLBACK_POLL_INTERVAL);
          timersRef.current.push(t);
          return;
        }
        if (stop.click) {
          pulseKeyRef.current += 1;
        }
        setState({
          visible: true,
          x,
          y,
          label: null,
          labelKey: stop.labelKey ?? null,
          clickPulseKey: pulseKeyRef.current,
        });
        if (stop.realClick && el) {
          const t = setTimeout(() => {
            if (sessionRef.current !== session) return;
            try {
              el.click();
            } catch (_) {
              /* ignore */
            }
          }, REAL_CLICK_DELAY);
          timersRef.current.push(t);
        }
      };
      apply(0);
    };

    let accDelay = 0;
    sequence.forEach((stop, idx) => {
      accDelay += stop.delay;
      const fireDelay = reducedMotion ? idx * 250 : accDelay;
      const t = setTimeout(() => {
        if (sessionRef.current !== session) return;
        visitStop(stop);
      }, fireDelay);
      timersRef.current.push(t);
    });

    return clearAll;
  }, [active, featureId, containerRef, reducedMotion]);

  return state;
}
