"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Avatar from "./Avatar";

interface Props {
  active: boolean;
}

const SKY_TOP = "#f8c97a";
const SKY_MID = "#f7a05c";
const SKY_HAZE = "#fcd58e";
const FAR_SHORE = "#1a4a36";
const FAR_SHORE_LIGHT = "#3a7a5c";
const WATER_DEEP = "#1d4d72";
const WATER_MID = "#2f7aa6";
const WATER_LIGHT = "#67b3d8";
const WATER_HIGHLIGHT = "#e8f4fa";
const SUN_BODY = "#ffe6a2";
const SUN_HALO = "#ffd479";
const HULL_DARK = "#3a1e0a";
const HULL_MID = "#6d3a16";
const HULL_LIGHT = "#a8693a";
const HULL_RIM = "#d4a266";
const HULL_PLANK = "#552a10";
const SAIL_BASE = "#fbf3e0";
const SAIL_SHADE = "#e5d6b3";
const SAIL_SHADOW = "#bea778";
const SAIL_TRIM = "#7a2820";
const MAST_DARK = "#3a230f";
const MAST_LIGHT = "#6a4424";
const ROPE = "#a98353";
const FLAG_RED = "#b22a22";
const FLAG_GOLD = "#e3b34a";

function DhowSvg({ uid }: { uid: string }) {
  const hullGrad = `dhow-hull-${uid}`;
  const sailGrad = `dhow-sail-${uid}`;
  const mastGrad = `dhow-mast-${uid}`;
  const sailShadowGrad = `dhow-sail-shadow-${uid}`;
  return (
    <svg
      width="420"
      height="320"
      viewBox="0 0 420 320"
      style={{ display: "block", overflow: "visible" }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={hullGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={HULL_LIGHT} />
          <stop offset="55%" stopColor={HULL_MID} />
          <stop offset="100%" stopColor={HULL_DARK} />
        </linearGradient>
        <linearGradient id={sailGrad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={SAIL_BASE} />
          <stop offset="65%" stopColor={SAIL_SHADE} />
          <stop offset="100%" stopColor={SAIL_SHADOW} />
        </linearGradient>
        <linearGradient id={mastGrad} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={MAST_LIGHT} />
          <stop offset="100%" stopColor={MAST_DARK} />
        </linearGradient>
        <radialGradient id={sailShadowGrad} cx="0.3" cy="0.3" r="0.9">
          <stop offset="0%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(60,30,12,0.25)" />
        </radialGradient>
      </defs>

      {/* boat reflection on water */}
      <ellipse cx="210" cy="280" rx="180" ry="10" fill="rgba(0,0,0,0.28)" />

      {/* ===== MAST ===== */}
      <line
        x1="160"
        y1="248"
        x2="118"
        y2="36"
        stroke={`url(#${mastGrad})`}
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* spar (yard) holding the lateen sail — angled */}
      <line
        x1="108"
        y1="48"
        x2="372"
        y2="174"
        stroke={MAST_DARK}
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* ===== LATEEN SAIL (triangular) ===== */}
      <motion.g
        style={{ transformOrigin: "118px 36px" }}
        animate={{ rotate: [-0.6, 0.6, -0.6] }}
        transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* main sail body */}
        <path
          d="M 118 38 L 372 174 Q 290 196 198 188 Q 150 184 134 176 Q 124 168 118 38 Z"
          fill={`url(#${sailGrad})`}
        />
        {/* sail shadow (gives depth) */}
        <path
          d="M 118 38 L 372 174 Q 290 196 198 188 Q 150 184 134 176 Q 124 168 118 38 Z"
          fill={`url(#${sailShadowGrad})`}
          opacity="0.55"
        />
        {/* sail curvature accent */}
        <path
          d="M 124 60 Q 200 96 350 168"
          stroke={SAIL_SHADE}
          strokeWidth="1.4"
          fill="none"
          opacity="0.55"
        />
        <path
          d="M 130 92 Q 218 124 340 172"
          stroke={SAIL_SHADE}
          strokeWidth="1.2"
          fill="none"
          opacity="0.4"
        />
        {/* trim along the leech */}
        <path
          d="M 372 174 Q 290 196 198 188 Q 150 184 134 176"
          stroke={SAIL_TRIM}
          strokeWidth="1.6"
          fill="none"
          opacity="0.45"
        />

        {/* small pennant */}
        <path
          d="M 118 28 L 154 32 L 118 38 Z"
          fill={FLAG_RED}
        />
        <path d="M 118 32 L 144 34" stroke={FLAG_GOLD} strokeWidth="0.6" />
      </motion.g>

      {/* rigging ropes */}
      <line x1="118" y1="36" x2="86" y2="248" stroke={ROPE} strokeWidth="1" opacity="0.7" />
      <line x1="118" y1="36" x2="240" y2="240" stroke={ROPE} strokeWidth="0.8" opacity="0.55" />
      <line x1="372" y1="174" x2="320" y2="240" stroke={ROPE} strokeWidth="0.9" opacity="0.6" />

      {/* ===== HULL ===== */}
      {/* deck planks (top edge) */}
      <path
        d="M 64 244 Q 90 232 140 230 L 280 230 Q 332 232 366 244 Z"
        fill={HULL_PLANK}
      />
      {/* plank seams */}
      <line x1="110" y1="232" x2="110" y2="244" stroke={HULL_DARK} strokeWidth="0.7" opacity="0.6" />
      <line x1="160" y1="232" x2="160" y2="244" stroke={HULL_DARK} strokeWidth="0.7" opacity="0.6" />
      <line x1="210" y1="232" x2="210" y2="244" stroke={HULL_DARK} strokeWidth="0.7" opacity="0.6" />
      <line x1="260" y1="232" x2="260" y2="244" stroke={HULL_DARK} strokeWidth="0.7" opacity="0.6" />
      <line x1="310" y1="232" x2="310" y2="244" stroke={HULL_DARK} strokeWidth="0.7" opacity="0.6" />

      {/* main curved hull */}
      <path
        d="M 30 244 Q 22 218 60 198 L 60 218 Q 60 232 64 244 Q 100 282 200 286 Q 314 286 350 268 Q 364 256 366 244 Q 372 230 370 214 Q 410 220 400 246 Q 388 286 200 296 Q 60 288 30 244 Z"
        fill={`url(#${hullGrad})`}
      />
      {/* plank line on hull */}
      <path
        d="M 50 250 Q 200 270 380 246"
        stroke={HULL_DARK}
        strokeWidth="1.4"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M 56 264 Q 200 282 372 260"
        stroke={HULL_DARK}
        strokeWidth="1.2"
        fill="none"
        opacity="0.5"
      />

      {/* gold rim */}
      <path
        d="M 30 244 Q 22 218 60 198 L 60 218 Q 60 232 64 244"
        stroke={HULL_RIM}
        strokeWidth="2.2"
        fill="none"
      />
      <path
        d="M 366 244 Q 372 230 370 214 Q 410 220 400 246"
        stroke={HULL_RIM}
        strokeWidth="2.2"
        fill="none"
      />

      {/* carved stern decoration */}
      <path
        d="M 380 220 Q 396 216 398 230 Q 400 244 384 246"
        stroke={HULL_RIM}
        strokeWidth="1.4"
        fill="none"
      />
      <circle cx="392" cy="232" r="2" fill={HULL_RIM} />

      {/* carved prow decoration */}
      <path
        d="M 40 218 Q 30 210 40 200 Q 50 210 46 220"
        stroke={HULL_RIM}
        strokeWidth="1.4"
        fill="none"
      />
    </svg>
  );
}

function WaterScene({
  reduced,
  uid,
}: {
  reduced: boolean;
  uid: string;
}) {
  const waterGrad = `water-${uid}`;
  const skyGrad = `sky-${uid}`;
  const glintMask = `glint-mask-${uid}`;
  const sunGrad = `sun-${uid}`;
  const rippleFilter = `ripple-${uid}`;

  return (
    <svg
      className="avt-boat-water"
      width="100%"
      height="100%"
      viewBox="0 0 1600 540"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={skyGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={SKY_TOP} />
          <stop offset="55%" stopColor={SKY_HAZE} />
          <stop offset="100%" stopColor={SKY_MID} />
        </linearGradient>
        <linearGradient id={waterGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={WATER_LIGHT} />
          <stop offset="45%" stopColor={WATER_MID} />
          <stop offset="100%" stopColor={WATER_DEEP} />
        </linearGradient>
        <radialGradient id={sunGrad} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={SUN_BODY} stopOpacity="1" />
          <stop offset="55%" stopColor={SUN_HALO} stopOpacity="0.7" />
          <stop offset="100%" stopColor={SUN_HALO} stopOpacity="0" />
        </radialGradient>

        <mask id={glintMask}>
          <rect x="0" y="0" width="1600" height="540" fill="black" />
          <ellipse cx="1180" cy="320" rx="220" ry="18" fill="white" />
          <ellipse cx="1180" cy="360" rx="180" ry="10" fill="white" opacity="0.7" />
          <ellipse cx="1180" cy="400" rx="140" ry="8" fill="white" opacity="0.45" />
        </mask>

        {!reduced && (
          <filter id={rippleFilter} x="0" y="0" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.045"
              numOctaves="2"
              seed="3"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="14s"
                values="0.012 0.045; 0.018 0.05; 0.012 0.045"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="6"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        )}
      </defs>

      {/* SKY */}
      <rect x="0" y="0" width="1600" height="280" fill={`url(#${skyGrad})`} />

      {/* SUN */}
      <ellipse cx="1180" cy="190" rx="100" ry="100" fill={`url(#${sunGrad})`} />
      <circle cx="1180" cy="190" r="46" fill={SUN_BODY} opacity="0.95" />
      <circle cx="1180" cy="190" r="62" fill="none" stroke={SUN_BODY} strokeWidth="1.5" opacity="0.35" />

      {/* SOFT CLOUDS */}
      <motion.g
        animate={reduced ? undefined : { x: [0, -80, 0] }}
        transition={reduced ? undefined : { duration: 32, repeat: Infinity, ease: "easeInOut" }}
        opacity="0.55"
      >
        <ellipse cx="280" cy="120" rx="80" ry="14" fill="#fbf3e0" />
        <ellipse cx="320" cy="110" rx="52" ry="10" fill="#fbf3e0" />
        <ellipse cx="780" cy="80" rx="90" ry="12" fill="#fbf3e0" opacity="0.7" />
      </motion.g>

      {/* FAR SHORE silhouette */}
      <path
        d="M 0 256 Q 200 234 360 248 Q 540 264 720 246 Q 920 224 1140 244 Q 1340 262 1600 248 L 1600 280 L 0 280 Z"
        fill={FAR_SHORE}
        opacity="0.75"
      />
      {/* palms on far shore */}
      <g opacity="0.7">
        {[180, 350, 540, 880, 1320].map((x, i) => (
          <g key={`fs-palm-${i}`} transform={`translate(${x} 260)`}>
            <path d="M 0 0 Q 1 -10 -1 -22" stroke={FAR_SHORE} strokeWidth="2.4" fill="none" />
            <path d="M -1 -22 Q -10 -28 -16 -22 M -1 -22 Q 10 -28 16 -22 M -1 -22 Q -6 -34 -2 -36 M -1 -22 Q 4 -34 0 -36" stroke={FAR_SHORE} strokeWidth="2" fill="none" />
          </g>
        ))}
      </g>

      {/* NEAR SHORE — slightly lighter shade */}
      <path
        d="M 0 276 Q 240 262 480 272 Q 720 282 980 268 Q 1100 262 1600 274 L 1600 290 L 0 290 Z"
        fill={FAR_SHORE_LIGHT}
        opacity="0.5"
      />

      {/* WATER BODY */}
      <rect x="0" y="280" width="1600" height="260" fill={`url(#${waterGrad})`} />

      {/* Water depth shading (vertical column under boat path) */}
      <rect x="0" y="430" width="1600" height="110" fill={WATER_DEEP} opacity="0.45" />

      {/* WAVE LAYERS — three parallax bands, morphing */}
      <motion.path
        d="M 0 290 Q 200 282 400 290 T 800 290 T 1200 290 T 1600 290 L 1600 296 L 0 296 Z"
        fill={WATER_HIGHLIGHT}
        opacity="0.45"
        animate={
          reduced
            ? undefined
            : {
                d: [
                  "M 0 290 Q 200 282 400 290 T 800 290 T 1200 290 T 1600 290 L 1600 296 L 0 296 Z",
                  "M 0 290 Q 200 298 400 290 T 800 290 T 1200 290 T 1600 290 L 1600 296 L 0 296 Z",
                  "M 0 290 Q 200 282 400 290 T 800 290 T 1200 290 T 1600 290 L 1600 296 L 0 296 Z",
                ],
              }
        }
        transition={reduced ? undefined : { duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M 0 330 Q 240 320 480 332 T 960 330 T 1440 332 T 1600 330 L 1600 340 L 0 340 Z"
        fill={WATER_LIGHT}
        opacity="0.55"
        animate={
          reduced
            ? undefined
            : {
                d: [
                  "M 0 330 Q 240 320 480 332 T 960 330 T 1440 332 T 1600 330 L 1600 340 L 0 340 Z",
                  "M 0 330 Q 240 340 480 332 T 960 330 T 1440 332 T 1600 330 L 1600 340 L 0 340 Z",
                  "M 0 330 Q 240 320 480 332 T 960 330 T 1440 332 T 1600 330 L 1600 340 L 0 340 Z",
                ],
              }
        }
        transition={reduced ? undefined : { duration: 8.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M 0 400 Q 260 388 520 404 T 1040 400 T 1480 402 T 1600 400 L 1600 412 L 0 412 Z"
        fill={WATER_LIGHT}
        opacity="0.32"
        animate={
          reduced
            ? undefined
            : {
                d: [
                  "M 0 400 Q 260 388 520 404 T 1040 400 T 1480 402 T 1600 400 L 1600 412 L 0 412 Z",
                  "M 0 400 Q 260 412 520 404 T 1040 400 T 1480 402 T 1600 400 L 1600 412 L 0 412 Z",
                  "M 0 400 Q 260 388 520 404 T 1040 400 T 1480 402 T 1600 400 L 1600 412 L 0 412 Z",
                ],
              }
        }
        transition={reduced ? undefined : { duration: 11.2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* SUN GLINT — animated bright streak under sun, masked */}
      <g mask={`url(#${glintMask})`}>
        <motion.rect
          x="900"
          y="290"
          width="560"
          height="160"
          fill={WATER_HIGHLIGHT}
          animate={reduced ? undefined : { opacity: [0.6, 0.95, 0.6] }}
          transition={
            reduced ? undefined : { duration: 4.6, repeat: Infinity, ease: "easeInOut" }
          }
        />
      </g>

      {/* DISTANT SHIMMER SCAN LINES */}
      {[300, 360, 440].map((y, i) => (
        <motion.path
          key={`shimmer-${i}`}
          d={`M 0 ${y} Q 400 ${y - 1.5} 800 ${y} T 1600 ${y}`}
          stroke={WATER_HIGHLIGHT}
          strokeWidth={i === 0 ? 1.4 : 0.9}
          fill="none"
          opacity={0.6 - i * 0.12}
          animate={
            reduced
              ? undefined
              : { x: [0, i % 2 === 0 ? -160 : 160, 0] }
          }
          transition={
            reduced
              ? undefined
              : { duration: 7 + i * 1.4, repeat: Infinity, ease: "easeInOut" }
          }
        />
      ))}

      {/* SUBTLE RIPPLES near boat path (filter-based, desktop only) */}
      {!reduced && (
        <g filter={`url(#${rippleFilter})`} opacity="0.5">
          <rect x="0" y="318" width="1600" height="90" fill="rgba(255,255,255,0)" />
        </g>
      )}
    </svg>
  );
}

export default function BoatFinale({ active }: Props) {
  const reduced = useReducedMotion() ?? false;
  const locale = useLocale();
  const tTour = useTranslations("product.tour");
  const isRtl = locale === "ar";
  const uid = useId().replace(/[:]/g, "");

  const [revealBubble, setRevealBubble] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active) {
      setRevealBubble(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }
    timerRef.current = setTimeout(() => setRevealBubble(true), reduced ? 200 : 1400);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, reduced]);

  // Boat travels from far-left off-screen → far-right off-screen, then loops.
  // In RTL, motion is mirrored (right → left).
  const travelFrom = isRtl ? "115%" : "-15%";
  const travelTo = isRtl ? "-15%" : "115%";

  return (
    <div className="avt-boat-scene" aria-hidden={!active}>
      <WaterScene reduced={reduced} uid={uid} />

      {/* Foreground reeds at the riverbank corners */}
      <svg
        className="avt-boat-reeds"
        viewBox="0 0 1200 80"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        {[40, 70, 95, 1100, 1130, 1162].map((x, i) => (
          <g key={i} transform={`translate(${x} 80)`}>
            <path
              d={`M 0 0 Q ${i % 2 === 0 ? -4 : 4} -40 ${i % 2 === 0 ? -2 : 2} -68`}
              stroke="#3a623a"
              strokeWidth="2.2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={`M 0 0 Q ${i % 2 === 0 ? -8 : 8} -36 ${i % 2 === 0 ? -10 : 10} -60`}
              stroke="#2a4a2a"
              strokeWidth="2.4"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        ))}
      </svg>

      <motion.div
        className="avt-boat-traveler"
        initial={{ left: travelFrom }}
        animate={active ? { left: travelTo } : { left: travelFrom }}
        transition={{
          duration: reduced ? 0.5 : 28,
          ease: "linear",
          repeat: active && !reduced ? Infinity : 0,
        }}
      >
        <motion.div
          className="avt-boat-bob"
          animate={
            reduced
              ? { y: 0, rotate: 0 }
              : { y: [0, -5, 0, -3, 0], rotate: [0, -1.2, 0, 1.2, 0] }
          }
          transition={
            reduced
              ? undefined
              : { duration: 4.2, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <div className="avt-boat-avatar">
            <Avatar talking={revealBubble} isRtl={isRtl} />
          </div>
          <div className="avt-boat-hull">
            <DhowSvg uid={uid} />
          </div>
        </motion.div>

        <motion.div
          className="avt-boat-bubble"
          initial={{ opacity: 0, y: 12, scale: 0.92 }}
          animate={
            revealBubble
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 12, scale: 0.92 }
          }
          transition={{ duration: reduced ? 0.2 : 0.6, ease: "easeOut" }}
        >
          <div className="avt-boat-bubble-inner">
            <span className="avt-boat-bubble-text">{tTour("complianceLine")}</span>
            <span className="avt-boat-bubble-star" aria-hidden="true">
              ✦
            </span>
          </div>
          <p className="avt-boat-bubble-caption">{tTour("complianceCaption")}</p>
          <div className="avt-boat-bubble-tail" aria-hidden="true" />
        </motion.div>
      </motion.div>

      {/* gentle bow-wave splash that follows the boat */}
      <motion.div
        className="avt-boat-bowwave"
        initial={{ left: travelFrom }}
        animate={active ? { left: travelTo } : { left: travelFrom }}
        transition={{
          duration: reduced ? 0.5 : 28,
          ease: "linear",
          repeat: active && !reduced ? Infinity : 0,
        }}
      >
        <svg width="220" height="50" viewBox="-110 -25 220 50" aria-hidden="true">
          <motion.path
            d="M -80 12 Q -40 6 0 12 Q 40 6 80 12"
            stroke={WATER_HIGHLIGHT}
            strokeWidth="2.4"
            fill="none"
            opacity="0.7"
            animate={
              reduced
                ? undefined
                : {
                    d: [
                      "M -80 12 Q -40 6 0 12 Q 40 6 80 12",
                      "M -80 14 Q -40 8 0 14 Q 40 8 80 14",
                      "M -80 12 Q -40 6 0 12 Q 40 6 80 12",
                    ],
                  }
            }
            transition={
              reduced ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
            }
          />
          <motion.path
            d="M -60 18 Q -30 14 0 18 Q 30 14 60 18"
            stroke={WATER_HIGHLIGHT}
            strokeWidth="1.6"
            fill="none"
            opacity="0.5"
            animate={
              reduced
                ? undefined
                : {
                    d: [
                      "M -60 18 Q -30 14 0 18 Q 30 14 60 18",
                      "M -60 20 Q -30 16 0 20 Q 30 16 60 20",
                      "M -60 18 Q -30 14 0 18 Q 30 14 60 18",
                    ],
                  }
            }
            transition={
              reduced ? undefined : { duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }
            }
          />
        </svg>
      </motion.div>
    </div>
  );
}
