"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import Avatar from "./Avatar";
import SpeechBubble from "./SpeechBubble";
import TourCursor from "./TourCursor";
import JourneyRoad from "./JourneyRoad";
import DesertDecor from "./DesertDecor";
import CamelSvg from "./CamelSvg";
import BoatFinale from "./BoatFinale";
import {
  FEATURE_SCRIPT,
  TYPEWRITER_CHARS_PER_SECOND_AR,
  TYPEWRITER_CHARS_PER_SECOND_EN,
} from "./featureScript";
import { useTourCursor } from "./useTourCursor";
import { FEATURES_DRIVEN_BY_CURSOR } from "./cursorSequences";

type StationPhase = "idle" | "walking" | "problem" | "solution" | "demo";

interface StationState {
  phase: StationPhase;
  autoStartKey: number;
}

interface StationGeometry {
  cardX: number;
  cardY: number;
  cardWidth: number;
  cardHeight: number;
  sheikhX: number;
  sheikhY: number;
  side: "left" | "right";
}

const WALK_MS = 1400;
const PROBLEM_HOLD_MS = 700;
const SOLUTION_HOLD_MS = 900;

export default function AvatarTour() {
  const locale = useLocale();
  const t = useTranslations();
  const tTour = useTranslations("product.tour");
  const reducedMotion = useReducedMotion() ?? false;
  const isRtl = locale === "ar";
  const cps = isRtl ? TYPEWRITER_CHARS_PER_SECOND_AR : TYPEWRITER_CHARS_PER_SECOND_EN;

  const journeyWrapRef = useRef<HTMLElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const stationRefs = useRef<Array<HTMLElement | null>>([]);
  const demoRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [stationStates, setStationStates] = useState<StationState[]>(
    () => FEATURE_SCRIPT.map(() => ({ phase: "idle", autoStartKey: 0 }))
  );
  const [isFinished, setIsFinished] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [talking, setTalking] = useState(false);
  const [geometries, setGeometries] = useState<StationGeometry[]>([]);

  const stationStatesRef = useRef(stationStates);
  useEffect(() => {
    stationStatesRef.current = stationStates;
  }, [stationStates]);

  const updateStation = useCallback(
    (idx: number, updater: (s: StationState) => StationState) => {
      setStationStates((prev) => {
        const next = [...prev];
        next[idx] = updater(prev[idx]);
        return next;
      });
    },
    []
  );

  const estimateMs = useCallback(
    (text: string) => {
      if (!text) return 1500;
      const ms = (text.length / Math.max(1, cps)) * 1000;
      return Math.max(1500, Math.min(5500, Math.round(ms)));
    },
    [cps]
  );

  const measure = useCallback(() => {
    const journey = journeyRef.current;
    if (!journey) return;
    const jr = journey.getBoundingClientRect();
    const next: StationGeometry[] = [];
    stationRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const side: "left" | "right" = i % 2 === 0 ? "left" : "right";
      const cardX = r.left - jr.left + r.width / 2;
      const cardY = r.top - jr.top + r.height / 2;
      const margin = Math.min(180, jr.width * 0.18);
      const sheikhX =
        side === "left"
          ? Math.min(jr.width - margin, jr.width * 0.78)
          : Math.max(margin, jr.width * 0.22);
      next[i] = {
        cardX,
        cardY,
        cardWidth: r.width,
        cardHeight: r.height,
        sheikhX,
        sheikhY: cardY,
        side,
      };
    });
    setGeometries(next);
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    const handle = () => measure();
    window.addEventListener("resize", handle);
    const ro = new ResizeObserver(() => measure());
    stationRefs.current.forEach((el) => {
      if (el) ro.observe(el);
    });
    const journey = journeyRef.current;
    if (journey) ro.observe(journey);
    const timer = setTimeout(() => measure(), 400);
    return () => {
      window.removeEventListener("resize", handle);
      ro.disconnect();
      clearTimeout(timer);
    };
  }, [measure]);

  useEffect(() => {
    const node = journeyWrapRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsStarted(true);
      },
      { threshold: 0.1 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isStarted) return;
    const elements = stationRefs.current.filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;
    const visibility: number[] = new Array(elements.length).fill(0);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = elements.indexOf(entry.target as HTMLElement);
          if (idx === -1) return;
          visibility[idx] = entry.intersectionRatio;
        });
        let best = -1;
        let bestVal = 0;
        visibility.forEach((v, i) => {
          if (v > bestVal) {
            bestVal = v;
            best = i;
          }
        });
        if (best >= 0 && bestVal > 0.3) {
          setActiveIndex((prev) => (prev === best ? prev : best));
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [isStarted]);

  useEffect(() => {
    if (!isStarted) return;
    const idx = activeIndex;
    const cfg = FEATURE_SCRIPT[idx];
    const cursorDrives = FEATURES_DRIVEN_BY_CURSOR.has(cfg.id);
    const problem = t(cfg.problemKey as never) as string;
    const solution = t(cfg.solutionKey as never) as string;
    const problemMs = reducedMotion ? 1500 : estimateMs(problem);
    const solutionMs = reducedMotion ? 1500 : estimateMs(solution);

    const localTimers: ReturnType<typeof setTimeout>[] = [];

    updateStation(idx, (s) => ({
      phase: "walking",
      autoStartKey: s?.autoStartKey ?? 0,
    }));

    const t1 = setTimeout(() => {
      updateStation(idx, (s) => ({ ...s, phase: "problem" }));
      const t2 = setTimeout(() => {
        updateStation(idx, (s) => ({ ...s, phase: "solution" }));
        const t3 = setTimeout(() => {
          updateStation(idx, (s) => ({
            ...s,
            phase: "demo",
            autoStartKey: cursorDrives ? (s?.autoStartKey ?? 0) : ((s?.autoStartKey ?? 0) + 1),
          }));
          if (idx === FEATURE_SCRIPT.length - 1) {
            const t4 = setTimeout(() => setIsFinished(true), cfg.demoMs);
            localTimers.push(t4);
          }
        }, solutionMs + SOLUTION_HOLD_MS);
        localTimers.push(t3);
      }, problemMs + PROBLEM_HOLD_MS);
      localTimers.push(t2);
    }, WALK_MS);
    localTimers.push(t1);

    return () => {
      localTimers.forEach(clearTimeout);
      updateStation(idx, (s) => ({
        phase: "idle",
        autoStartKey: s?.autoStartKey ?? 0,
      }));
    };
  }, [activeIndex, isStarted, t, estimateMs, reducedMotion, updateStation]);

  const setStationRef = useCallback(
    (idx: number) => (el: HTMLElement | null) => {
      stationRefs.current[idx] = el;
    },
    []
  );

  const setDemoRef = useCallback(
    (idx: number) => (el: HTMLDivElement | null) => {
      demoRefs.current[idx] = el;
    },
    []
  );

  const activeStation = stationStates[activeIndex];
  const activeConfig = FEATURE_SCRIPT[activeIndex];
  const activeGeometry = geometries[activeIndex];

  let bubbleText = "";
  let bubbleTone: "problem" | "solution" = "problem";
  if (activeStation) {
    if (activeStation.phase === "problem") {
      bubbleText = t(activeConfig.problemKey as never) as string;
      bubbleTone = "problem";
    } else if (
      activeStation.phase === "solution" ||
      activeStation.phase === "demo"
    ) {
      bubbleText = t(activeConfig.solutionKey as never) as string;
      bubbleTone = "solution";
    }
  }

  const cursorActive = !!activeStation && activeStation.phase === "demo";
  const activeDemoRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    activeDemoRef.current = demoRefs.current[activeIndex] ?? null;
  }, [activeIndex, stationStates]);

  const cursor = useTourCursor({
    containerRef: activeDemoRef as React.RefObject<HTMLElement | null>,
    featureId: cursorActive ? activeConfig.id : null,
    active: cursorActive,
    reducedMotion,
  });

  const cursorLabel = cursor.labelKey ? (t(cursor.labelKey as never) as string) : null;

  const stationSides = useMemo(
    () => FEATURE_SCRIPT.map((_, i) => (i % 2 === 0 ? "left" : "right") as "left" | "right"),
    []
  );

  const isWalking = activeStation?.phase === "walking";

  const sheikhX = activeGeometry?.sheikhX ?? 0;
  const sheikhY = activeGeometry?.sheikhY ?? 0;
  const sheikhReady = geometries.length === FEATURE_SCRIPT.length;

  const totalHeight = useMemo(() => {
    if (geometries.length === 0) return 0;
    const maxY = geometries.reduce(
      (acc, g) => (g && g.sheikhY > acc ? g.sheikhY : acc),
      0
    );
    return maxY + 240;
  }, [geometries]);

  const camelSpots = useMemo(() => {
    if (geometries.length < 4) return [] as Array<{ top: number; side: "left" | "right" }>;
    const positions: Array<{ idx: number; side: "left" | "right" }> = [
      { idx: 1, side: "left" },
      { idx: 5, side: "right" },
    ];
    return positions
      .map(({ idx, side }) => {
        const cur = geometries[idx];
        const next = geometries[idx + 1];
        if (!cur || !next) return null;
        const top = (cur.sheikhY + next.sheikhY) / 2 - 90;
        return { top, side };
      })
      .filter(
        (s): s is { top: number; side: "left" | "right" } => s !== null
      );
  }, [geometries]);

  const handleReplay = useCallback(() => {
    setStationStates(FEATURE_SCRIPT.map(() => ({ phase: "idle", autoStartKey: 0 })));
    setIsFinished(false);
    setActiveIndex(0);
    const first = stationRefs.current[0];
    if (first) {
      first.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  const handleScrollDown = useCallback(() => {
    const after = document.getElementById("avt-after");
    if (after) {
      after.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  }, []);

  return (
    <section
      ref={journeyWrapRef}
      className="avt-journey-wrap"
      aria-label={tTour("stageAria")}
    >
      <a href="#avt-after" className="avt-skip">
        {tTour("skipAnchor")}
      </a>

      <div ref={journeyRef} className="avt-journey">
        <DesertDecor geometries={geometries} totalHeight={totalHeight} />

        <JourneyRoad
          geometries={geometries}
          activeIndex={activeIndex}
          stationSides={stationSides}
        />

        {camelSpots.map((spot, i) => (
          <div
            key={`camel-${i}`}
            className="avt-decor-camel"
            style={{
              top: spot.top,
              ...(spot.side === "left" ? { left: "2%" } : { right: "2%" }),
            }}
          >
            <CamelSvg flip={spot.side === "right"} />
          </div>
        ))}

        {sheikhReady && (
          <motion.div
            className="avt-sheikh-traveler-abs"
            aria-hidden="false"
            initial={false}
            animate={{
              x: sheikhX,
              y: sheikhY,
            }}
            transition={{
              x: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] },
              y: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] },
            }}
          >
            <motion.div
              className="avt-sheikh-figure-wrap"
              animate={
                isWalking && !reducedMotion
                  ? { y: [0, -6, 0, -6, 0], rotate: [0, -1, 1, -1, 0] }
                  : { y: 0, rotate: 0 }
              }
              transition={
                isWalking
                  ? { duration: 0.6, repeat: 2, ease: "easeInOut" }
                  : { duration: 0.2 }
              }
            >
              <div className="avt-sheikh-figure">
                <Avatar talking={talking} isRtl={isRtl} />
              </div>
            </motion.div>
            {bubbleText && (
              <div className="avt-sheikh-bubble-wrap">
                <SpeechBubble
                  text={bubbleText}
                  charsPerSecond={cps}
                  reducedMotion={reducedMotion}
                  tone={bubbleTone}
                  onTalkingChange={setTalking}
                  ariaLabel={
                    bubbleTone === "problem"
                      ? tTour("ariaProblem")
                      : tTour("ariaSolution")
                  }
                />
              </div>
            )}
          </motion.div>
        )}

        {FEATURE_SCRIPT.map((cfg, idx) => {
          const Demo = cfg.demoComponent;
          const state = stationStates[idx];
          const side = stationSides[idx];
          const isActive = idx === activeIndex && !isFinished;
          const ns = `product.${cfg.id}`;
          const title = `${t(`${ns}.title1` as never)} ${t(`${ns}.title2` as never)}`;
          const lede = t(`${ns}.lede` as never) as string;
          return (
            <section
              key={cfg.id}
              ref={setStationRef(idx)}
              className={`avt-station avt-station-${side}${isActive ? " is-active" : ""}`}
              data-station-index={idx}
              aria-current={isActive ? "true" : undefined}
            >
              <div className="avt-station-card">
                <div className="avt-station-num">
                  {tTour("featureLabel", { n: idx + 1, total: FEATURE_SCRIPT.length })}
                </div>
                <h3 className="avt-station-title">{title}</h3>
                <p className="avt-station-lede">{lede}</p>
                <div ref={setDemoRef(idx)} className="avt-station-demo">
                  <Demo autoStart={state?.autoStartKey ?? 0} compact />
                  {isActive && cursorActive && (
                    <TourCursor
                      x={cursor.x}
                      y={cursor.y}
                      visible={cursor.visible}
                      clickPulseKey={cursor.clickPulseKey}
                      label={cursorLabel ?? undefined}
                      isRtl={isRtl}
                    />
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <div className="avt-journey-controls" aria-label={tTour("controlsAria")}>
        <span className="avt-journey-progress">
          {tTour("featureLabel", { n: Math.min(activeIndex + 1, FEATURE_SCRIPT.length), total: FEATURE_SCRIPT.length })}
        </span>
        {activeIndex === FEATURE_SCRIPT.length - 1 && isFinished ? (
          <button type="button" className="btn btn-primary" onClick={handleScrollDown}>
            {tTour("scrollDown")}
          </button>
        ) : (
          <button type="button" className="btn btn-ghost" onClick={handleReplay}>
            {tTour("controls.replay")}
          </button>
        )}
      </div>

      <div id="avt-after" className="avt-journey-end">
        <BoatFinale active={isFinished} />
        <div className="avt-finished-inner">
          <div className="eyebrow">{tTour("finishedEyebrow")}</div>
          <h3>{tTour("finishedTitle")}</h3>
          <p>{tTour("finishedLede")}</p>
          <div className="avt-finished-cta">
            <button type="button" className="btn btn-primary" onClick={handleReplay}>
              {tTour("controls.replay")}
            </button>
            <Link href="/demo-audit" className="btn btn-ghost">
              {tTour("ctaFullAudit")}
            </Link>
          </div>
        </div>
      </div>
      {!isFinished && (
        <div className="avt-scroll-hint" aria-hidden="true">
          <span>{tTour("scrollHint")}</span>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M 4 8 L 11 15 L 18 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </section>
  );
}
