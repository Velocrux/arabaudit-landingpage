"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { FeatureConfig, TourControls, TourPhase, TourState } from "./types";
import { PHASE_HOLD_MS } from "./featureScript";
import { FEATURES_DRIVEN_BY_CURSOR } from "./cursorSequences";

interface Options {
  enabled: boolean;
  charsPerSecond: number;
  problemText: (index: number) => string;
  solutionText: (index: number) => string;
  reducedMotion: boolean;
  onFeatureChange?: (index: number) => void;
}

const NARRATION_MIN_MS = 1500;
const NARRATION_MAX_MS = 5500;
const ENTRY_DELAY_MS = 800;

function estimateDurationMs(text: string, cps: number) {
  if (!text) return NARRATION_MIN_MS;
  const ms = (text.length / cps) * 1000;
  return Math.max(NARRATION_MIN_MS, Math.min(NARRATION_MAX_MS, Math.round(ms)));
}

export function useAvatarTour(
  features: FeatureConfig[],
  options: Options
): TourState {
  const { enabled, charsPerSecond, problemText, solutionText, reducedMotion, onFeatureChange } =
    options;

  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState<TourPhase>("idle");
  const [isPaused, setIsPaused] = useState(false);
  const [autoStartKey, setAutoStartKey] = useState(0);

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const enabledRef = useRef(enabled);
  const pausedRef = useRef(false);
  const phaseRef = useRef<TourPhase>("idle");
  const indexRef = useRef(0);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const schedule = useCallback(
    (fn: () => void, ms: number) => {
      const id = setTimeout(() => {
        if (!enabledRef.current || pausedRef.current) return;
        fn();
      }, ms);
      timersRef.current.push(id);
      return id;
    },
    []
  );

  useEffect(() => {
    enabledRef.current = enabled;
    if (!enabled) {
      clearTimers();
    }
  }, [enabled, clearTimers]);

  useEffect(() => {
    pausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    indexRef.current = activeIndex;
    if (onFeatureChange) onFeatureChange(activeIndex);
  }, [activeIndex, onFeatureChange]);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  const advanceToFeature = useCallback(
    (idx: number) => {
      clearTimers();
      if (idx >= features.length) {
        setPhase("finished");
        return;
      }
      setActiveIndex(idx);
      setPhase("entering");
      schedule(() => {
        const problem = problemText(idx);
        const problemMs = reducedMotion
          ? NARRATION_MIN_MS
          : estimateDurationMs(problem, charsPerSecond);
        setPhase("narratingProblem");
        schedule(() => {
          setPhase("transitioning");
          schedule(() => {
            const solution = solutionText(idx);
            const solutionMs = reducedMotion
              ? NARRATION_MIN_MS
              : estimateDurationMs(solution, charsPerSecond);
            setPhase("narratingSolution");
            schedule(() => {
              const cfg = features[idx];
              const cursorDrives = FEATURES_DRIVEN_BY_CURSOR.has(cfg.id);
              setPhase("demoPlaying");
              if (!cursorDrives) {
                schedule(() => {
                  setAutoStartKey((k) => k + 1);
                }, cfg.autoStartDelay);
              }
              schedule(() => {
                if (idx + 1 >= features.length) {
                  setPhase("finished");
                } else {
                  advanceToFeature(idx + 1);
                }
              }, cfg.demoMs);
            }, solutionMs + PHASE_HOLD_MS);
          }, PHASE_HOLD_MS);
        }, problemMs + PHASE_HOLD_MS);
      }, ENTRY_DELAY_MS);
    },
    [features, schedule, clearTimers, problemText, solutionText, charsPerSecond, reducedMotion]
  );

  const play = useCallback(() => {
    setIsPaused(false);
    pausedRef.current = false;
    if (phaseRef.current === "idle" || phaseRef.current === "finished") {
      advanceToFeature(0);
    } else {
      advanceToFeature(indexRef.current);
    }
  }, [advanceToFeature]);

  const pause = useCallback(() => {
    setIsPaused(true);
    pausedRef.current = true;
    clearTimers();
  }, [clearTimers]);

  const resume = useCallback(() => {
    if (!pausedRef.current && phaseRef.current !== "idle") return;
    setIsPaused(false);
    pausedRef.current = false;
    advanceToFeature(indexRef.current);
  }, [advanceToFeature]);

  const next = useCallback(() => {
    const nextIdx = indexRef.current + 1;
    if (nextIdx >= features.length) {
      clearTimers();
      setPhase("finished");
      return;
    }
    setIsPaused(false);
    pausedRef.current = false;
    advanceToFeature(nextIdx);
  }, [features.length, advanceToFeature, clearTimers]);

  const prev = useCallback(() => {
    const prevIdx = Math.max(0, indexRef.current - 1);
    setIsPaused(false);
    pausedRef.current = false;
    advanceToFeature(prevIdx);
  }, [advanceToFeature]);

  const skip = useCallback(() => {
    clearTimers();
    setPhase("finished");
  }, [clearTimers]);

  const restart = useCallback(() => {
    clearTimers();
    setIsPaused(false);
    pausedRef.current = false;
    advanceToFeature(0);
  }, [advanceToFeature, clearTimers]);

  useEffect(() => {
    if (!enabled) return;
    if (phaseRef.current === "idle") {
      schedule(() => {
        if (phaseRef.current === "idle") advanceToFeature(0);
      }, 200);
    }
    return () => clearTimers();
  }, [enabled, advanceToFeature, clearTimers, schedule]);

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden && phaseRef.current !== "idle" && phaseRef.current !== "finished") {
        pause();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [pause]);

  const controls: TourControls = useMemo(
    () => ({ play, pause, resume, next, prev, skip, restart }),
    [play, pause, resume, next, prev, skip, restart]
  );

  return {
    activeIndex,
    phase,
    isPaused,
    autoStartKey,
    controls,
  };
}
