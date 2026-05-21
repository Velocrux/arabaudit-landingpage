"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Avatar from "./Avatar";

interface Props {
  active: boolean;
}

/* ── Palette ───────────────────────────────────────────────── */
// Sky — magrib (sunset) → twilight at the zenith
const SKY_ZENITH = "#1a2a4a";
const SKY_HIGH = "#3a3568";
const SKY_MID = "#a04c5a";
const SKY_LOW = "#e88a4a";
const SKY_HORIZON = "#f4cd72";

// Celestial
const MOON = "#fdf3d4";
const MOON_SHADE = "#e6d4a4";
const STAR = "#fdf3d4";

// Sun
const SUN_CORE = "#ffe8b0";
const SUN_RIM = "#f9b04c";
const SUN_HALO = "#f5933a";

// Distant skyline (Gulf harbor silhouette)
const SKYLINE_FAR = "#2a2348";
const SKYLINE_NEAR = "#1a1530";

// Water
const WATER_DEEP = "#0e2a4a";
const WATER_MID = "#1f4870";
const WATER_LIGHT = "#3d7ca0";
const WATER_GLINT = "#f4cd72";
const WATER_FOAM = "#f7eed8";

// Ship — rich teak with brass and emerald accents
const HULL_BLACK = "#1a0e06";
const HULL_DEEP = "#3a1e0a";
const HULL_TEAK = "#6a3a16";
const HULL_WARM = "#9c5a26";
const HULL_GLOW = "#d09858";
const BRASS_DARK = "#7a5418";
const BRASS = "#c08f2e";
const BRASS_BRIGHT = "#e8b84b";
const BRASS_HIGHLIGHT = "#fde6a0";
const EMERALD_DEEP = "#073727";
const EMERALD = "#0d6645";

// Sail — handwoven canvas, warm cream with sunset blush
const SAIL_LIGHT = "#fdf2d8";
const SAIL_MID = "#f3deae";
const SAIL_SHADE = "#c89c5e";

// Rope & wood
const ROPE = "#a9824a";
const MAST_DARK = "#2a1808";
const MAST_LIGHT = "#6e4424";

// Lanterns
const LANTERN_GLOW = "#ffd070";
const LANTERN_BODY = "#3a2a14";

/* Voyage timing — graceful arc across the sea with depth */
const VOYAGE_DURATION = 38; // seconds
const LTR_LEFT = ["-22%", "10%", "32%", "50%", "50%", "68%", "90%", "118%"];
const RTL_LEFT = ["118%", "90%", "68%", "50%", "50%", "32%", "10%", "-22%"];
const TOP_KF = ["38%", "36%", "33%", "30%", "30%", "32%", "34%", "37%"];
const SCALE_KF = [0.6, 0.78, 0.95, 1.1, 1.1, 0.95, 0.78, 0.6];
const TIMES_KF = [0, 0.12, 0.26, 0.42, 0.58, 0.74, 0.88, 1];

/* ── Sky & celestials ──────────────────────────────────────── */
function SkyAndCelestials({ reduced, uid }: { reduced: boolean; uid: string }) {
  const skyGrad = `bf-sky-${uid}`;
  const sunGrad = `bf-sun-${uid}`;
  const moonGrad = `bf-moon-${uid}`;
  const haloGrad = `bf-halo-${uid}`;

  const stars = [
    { x: 90, y: 60, r: 1.4, d: 2.4 },
    { x: 180, y: 38, r: 0.9, d: 3.1 },
    { x: 260, y: 80, r: 1.1, d: 2.8 },
    { x: 340, y: 50, r: 0.7, d: 3.6 },
    { x: 470, y: 32, r: 1.2, d: 2.2 },
    { x: 560, y: 68, r: 0.9, d: 3.4 },
    { x: 640, y: 44, r: 1.0, d: 2.6 },
    { x: 760, y: 78, r: 1.3, d: 2.9 },
    { x: 880, y: 36, r: 0.8, d: 3.2 },
    { x: 1020, y: 64, r: 1.1, d: 2.7 },
    { x: 1180, y: 28, r: 0.9, d: 3.0 },
    { x: 1320, y: 70, r: 1.4, d: 2.5 },
    { x: 1480, y: 42, r: 1.0, d: 3.3 },
  ];

  return (
    <g aria-hidden="true">
      <defs>
        <linearGradient id={skyGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={SKY_ZENITH} />
          <stop offset="28%" stopColor={SKY_HIGH} />
          <stop offset="62%" stopColor={SKY_MID} />
          <stop offset="86%" stopColor={SKY_LOW} />
          <stop offset="100%" stopColor={SKY_HORIZON} />
        </linearGradient>
        <radialGradient id={sunGrad} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={SUN_CORE} />
          <stop offset="42%" stopColor={SUN_RIM} />
          <stop offset="100%" stopColor={SUN_HALO} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={haloGrad} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fbd87a" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#fbd87a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={moonGrad} cx="0.35" cy="0.32" r="0.7">
          <stop offset="0%" stopColor={MOON} />
          <stop offset="100%" stopColor={MOON_SHADE} />
        </radialGradient>
      </defs>

      {/* Sky band */}
      <rect x="0" y="0" width="1600" height="340" fill={`url(#${skyGrad})`} />

      {/* Stars */}
      {stars.map((s, i) => (
        <motion.circle
          key={`star-${i}`}
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill={STAR}
          animate={reduced ? undefined : { opacity: [0.45, 1, 0.45] }}
          transition={
            reduced
              ? undefined
              : { duration: s.d, repeat: Infinity, ease: "easeInOut", delay: (i % 4) * 0.4 }
          }
        />
      ))}
      {[
        { x: 470, y: 32, s: 4 },
        { x: 1320, y: 70, s: 5 },
      ].map((g, i) => (
        <g key={`gl-${i}`} transform={`translate(${g.x} ${g.y})`} opacity="0.65">
          <line x1={-g.s} y1="0" x2={g.s} y2="0" stroke={STAR} strokeWidth="0.5" />
          <line x1="0" y1={-g.s} x2="0" y2={g.s} stroke={STAR} strokeWidth="0.5" />
        </g>
      ))}

      {/* Crescent moon */}
      <g transform="translate(220 88)">
        <circle r="20" fill={`url(#${moonGrad})`} opacity="0.95" />
        <circle cx="-8" cy="-3" r="18" fill={SKY_HIGH} />
        <circle r="34" fill="#fdf3d4" opacity="0.08" />
      </g>

      {/* Sun */}
      <g transform="translate(1280 280)">
        <ellipse rx="180" ry="120" fill={`url(#${haloGrad})`} opacity="0.7" />
        <ellipse rx="120" ry="100" fill={`url(#${sunGrad})`} />
        <circle r="56" fill={SUN_CORE} opacity="0.92" />
        <circle r="62" fill="none" stroke={SUN_CORE} strokeWidth="1.2" opacity="0.45" />
        <ellipse rx="240" ry="6" cy="48" fill={SUN_CORE} opacity="0.5" />
        <ellipse rx="180" ry="3" cy="62" fill={SUN_CORE} opacity="0.35" />
      </g>

      {/* Wispy clouds */}
      <motion.g
        animate={reduced ? undefined : { x: [0, -60, 0] }}
        transition={reduced ? undefined : { duration: 38, repeat: Infinity, ease: "easeInOut" }}
        opacity="0.5"
      >
        <ellipse cx="460" cy="160" rx="90" ry="9" fill="#fdf2d8" />
        <ellipse cx="500" cy="152" rx="56" ry="6" fill="#fdf2d8" />
        <ellipse cx="900" cy="120" rx="110" ry="8" fill="#fdf2d8" opacity="0.75" />
        <ellipse cx="940" cy="130" rx="60" ry="5" fill="#fdf2d8" opacity="0.6" />
      </motion.g>
    </g>
  );
}

/* ── Harbor skyline ────────────────────────────────────────── */
function HarborSkyline({ uid }: { uid: string }) {
  const farGrad = `bf-far-${uid}`;
  const nearGrad = `bf-near-${uid}`;
  return (
    <g aria-hidden="true">
      <defs>
        <linearGradient id={farGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={SKYLINE_FAR} stopOpacity="0.85" />
          <stop offset="100%" stopColor={SKYLINE_FAR} stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id={nearGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={SKYLINE_NEAR} />
          <stop offset="100%" stopColor={SKYLINE_NEAR} stopOpacity="0.9" />
        </linearGradient>
      </defs>

      <rect x="0" y="330" width="1600" height="20" fill="#f0a85e" opacity="0.35" />

      <g fill={`url(#${farGrad})`}>
        <path d="M 0 340 L 0 322 L 28 322 L 28 316 L 60 316 L 60 326 L 90 326 L 96 304 L 102 326 L 130 326 L 130 318 L 168 318 L 168 312 L 200 312 L 200 326 L 230 326 L 234 296 L 240 290 L 246 296 L 250 326 L 280 326 L 280 320 L 310 320 L 310 312 L 348 312 L 348 306 L 358 306 L 362 298 L 366 306 L 376 306 L 376 326 L 410 326 L 410 318 L 440 318 L 446 304 L 450 290 L 454 304 L 460 318 L 488 318 L 488 326 L 520 326 L 520 312 L 562 312 L 562 320 L 600 320 L 600 326 L 640 326 L 644 300 L 650 290 L 656 300 L 660 326 L 700 326 L 700 318 L 740 318 L 740 322 L 800 322 L 800 326 L 850 326 L 854 304 L 860 296 L 866 304 L 870 326 L 920 326 L 920 318 L 980 318 L 980 326 L 1040 326 L 1040 322 L 1100 322 L 1100 326 L 1140 326 L 1144 308 L 1150 296 L 1156 308 L 1160 326 L 1220 326 L 1220 318 L 1280 318 L 1280 312 L 1330 312 L 1334 298 L 1340 286 L 1346 298 L 1350 312 L 1400 312 L 1400 320 L 1460 320 L 1460 326 L 1520 326 L 1524 304 L 1530 296 L 1536 304 L 1540 326 L 1600 326 L 1600 340 Z" />
        {[240, 450, 650, 860, 1150, 1340, 1530].map((x, i) => (
          <g key={`min-${i}`} transform={`translate(${x} 286)`}>
            <circle r="2" fill={BRASS} opacity="0.75" />
          </g>
        ))}
      </g>

      <g fill={`url(#${nearGrad})`}>
        <path d="M 0 360 L 0 348 Q 120 332 240 344 Q 360 354 480 340 Q 600 326 720 344 Q 840 358 960 340 Q 1080 326 1200 346 Q 1320 360 1440 340 Q 1520 330 1600 346 L 1600 360 Z" />
      </g>

      {[
        { x: 110, scale: 1, lean: -2 },
        { x: 1490, scale: 1.05, lean: 2 },
      ].map((p, i) => (
        <g key={`palm-${i}`} transform={`translate(${p.x} 346) scale(${p.scale}) rotate(${p.lean})`}>
          <path
            d="M 0 0 Q -2 -28 1 -56 Q 4 -84 -1 -110"
            stroke={SKYLINE_NEAR}
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />
          <g stroke={SKYLINE_FAR} strokeWidth="0.8" opacity="0.6">
            <line x1="-3" y1="-20" x2="3" y2="-20" />
            <line x1="-3" y1="-40" x2="3" y2="-40" />
            <line x1="-3" y1="-60" x2="3" y2="-60" />
            <line x1="-3" y1="-80" x2="3" y2="-80" />
          </g>
          {[-90, -65, -40, -15, 15, 40, 65].map((a, j) => (
            <g key={`f-${j}`} transform={`translate(-1 -110) rotate(${a})`}>
              <path
                d={`M 0 0 Q ${a < 0 ? -22 : a > 0 ? 22 : 0} -8 ${a < 0 ? -38 : a > 0 ? 38 : 2} -14 Q ${a < 0 ? -28 : a > 0 ? 28 : 0} -6 0 0 Z`}
                fill={SKYLINE_NEAR}
                opacity="0.95"
              />
            </g>
          ))}
          <circle cx="-3" cy="-104" r="2.2" fill={BRASS_DARK} opacity="0.85" />
          <circle cx="3" cy="-104" r="2.2" fill={BRASS_DARK} opacity="0.85" />
          <circle cx="0" cy="-100" r="2.2" fill={BRASS_DARK} opacity="0.85" />
        </g>
      ))}
    </g>
  );
}

/* ── Falcons ───────────────────────────────────────────────── */
function Falcons({ reduced }: { reduced: boolean }) {
  return (
    <g aria-hidden="true" fill="#1a1530" opacity="0.85">
      <motion.g
        animate={reduced ? undefined : { x: [0, 40, 0], y: [0, -4, 0] }}
        transition={reduced ? undefined : { duration: 14, repeat: Infinity, ease: "easeInOut" }}
      >
        <g transform="translate(360 130) scale(1.6)">
          <motion.path
            d="M -8 0 Q -6 -3 -2 -2 Q 0 -3 2 -2 Q 6 -3 8 0 Q 6 1 2 0 Q 0 1 -2 0 Q -6 1 -8 0 Z"
            animate={
              reduced
                ? undefined
                : {
                    d: [
                      "M -8 0 Q -6 -3 -2 -2 Q 0 -3 2 -2 Q 6 -3 8 0 Q 6 1 2 0 Q 0 1 -2 0 Q -6 1 -8 0 Z",
                      "M -8 0 Q -6 -1 -2 -1 Q 0 -2 2 -1 Q 6 -1 8 0 Q 6 2 2 1 Q 0 2 -2 1 Q -6 2 -8 0 Z",
                      "M -8 0 Q -6 -3 -2 -2 Q 0 -3 2 -2 Q 6 -3 8 0 Q 6 1 2 0 Q 0 1 -2 0 Q -6 1 -8 0 Z",
                    ],
                  }
            }
            transition={reduced ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>
      </motion.g>
      <motion.g
        animate={reduced ? undefined : { x: [0, -60, 0], y: [0, 6, 0] }}
        transition={reduced ? undefined : { duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      >
        <g transform="translate(540 100) scale(1.1)">
          <motion.path
            d="M -8 0 Q -6 -3 -2 -2 Q 0 -3 2 -2 Q 6 -3 8 0 Q 6 1 2 0 Q 0 1 -2 0 Q -6 1 -8 0 Z"
            animate={
              reduced
                ? undefined
                : {
                    d: [
                      "M -8 0 Q -6 -3 -2 -2 Q 0 -3 2 -2 Q 6 -3 8 0 Q 6 1 2 0 Q 0 1 -2 0 Q -6 1 -8 0 Z",
                      "M -8 0 Q -6 0 -2 0 Q 0 -1 2 0 Q 6 0 8 0 Q 6 2 2 1 Q 0 2 -2 1 Q -6 2 -8 0 Z",
                      "M -8 0 Q -6 -3 -2 -2 Q 0 -3 2 -2 Q 6 -3 8 0 Q 6 1 2 0 Q 0 1 -2 0 Q -6 1 -8 0 Z",
                    ],
                  }
            }
            transition={reduced ? undefined : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>
      </motion.g>
    </g>
  );
}

/* ── Sea (with floating lanterns) ─────────────────────────── */
function Sea({ reduced, uid }: { reduced: boolean; uid: string }) {
  const waterGrad = `bf-water-${uid}`;
  const glintGrad = `bf-glint-${uid}`;

  const lanterns = [
    { x: 280, y: 470, scale: 0.9, dur: 4.2 },
    { x: 1300, y: 460, scale: 1.0, dur: 4.8 },
    { x: 1480, y: 510, scale: 0.7, dur: 5.4 },
  ];

  return (
    <g aria-hidden="true">
      <defs>
        <linearGradient id={waterGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={WATER_LIGHT} />
          <stop offset="40%" stopColor={WATER_MID} />
          <stop offset="100%" stopColor={WATER_DEEP} />
        </linearGradient>
        <linearGradient id={glintGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={WATER_GLINT} stopOpacity="0.85" />
          <stop offset="100%" stopColor={WATER_GLINT} stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect x="0" y="340" width="1600" height="320" fill={`url(#${waterGrad})`} />

      <g>
        <motion.path
          d="M 1230 340 L 1330 340 L 1380 660 L 1180 660 Z"
          fill={`url(#${glintGrad})`}
          animate={reduced ? undefined : { opacity: [0.55, 0.85, 0.55] }}
          transition={reduced ? undefined : { duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
        />
        {[360, 400, 444, 490, 540, 590].map((y, i) => (
          <motion.line
            key={`gl-${i}`}
            x1={1180 + i * 4}
            y1={y}
            x2={1380 - i * 4}
            y2={y}
            stroke={WATER_FOAM}
            strokeWidth={i % 2 === 0 ? 1.4 : 0.8}
            opacity={0.7 - i * 0.07}
            animate={reduced ? undefined : { opacity: [0.2, 0.85, 0.2] }}
            transition={
              reduced ? undefined : { duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }
            }
          />
        ))}
      </g>

      {/* wave bands */}
      <motion.path
        d="M 0 354 Q 200 348 400 354 T 800 354 T 1200 354 T 1600 354 L 1600 360 L 0 360 Z"
        fill={WATER_FOAM}
        opacity="0.35"
        animate={
          reduced
            ? undefined
            : {
                d: [
                  "M 0 354 Q 200 348 400 354 T 800 354 T 1200 354 T 1600 354 L 1600 360 L 0 360 Z",
                  "M 0 354 Q 200 360 400 354 T 800 354 T 1200 354 T 1600 354 L 1600 360 L 0 360 Z",
                  "M 0 354 Q 200 348 400 354 T 800 354 T 1200 354 T 1600 354 L 1600 360 L 0 360 Z",
                ],
              }
        }
        transition={reduced ? undefined : { duration: 6.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M 0 440 Q 240 430 480 442 T 960 440 T 1440 442 T 1600 440 L 1600 450 L 0 450 Z"
        fill={WATER_LIGHT}
        opacity="0.5"
        animate={
          reduced
            ? undefined
            : {
                d: [
                  "M 0 440 Q 240 430 480 442 T 960 440 T 1440 442 T 1600 440 L 1600 450 L 0 450 Z",
                  "M 0 440 Q 240 450 480 442 T 960 440 T 1440 442 T 1600 440 L 1600 450 L 0 450 Z",
                  "M 0 440 Q 240 430 480 442 T 960 440 T 1440 442 T 1600 440 L 1600 450 L 0 450 Z",
                ],
              }
        }
        transition={reduced ? undefined : { duration: 8.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M 0 540 Q 260 528 520 544 T 1040 540 T 1480 542 T 1600 540 L 1600 552 L 0 552 Z"
        fill={WATER_LIGHT}
        opacity="0.34"
        animate={
          reduced
            ? undefined
            : {
                d: [
                  "M 0 540 Q 260 528 520 544 T 1040 540 T 1480 542 T 1600 540 L 1600 552 L 0 552 Z",
                  "M 0 540 Q 260 552 520 544 T 1040 540 T 1480 542 T 1600 540 L 1600 552 L 0 552 Z",
                  "M 0 540 Q 260 528 520 544 T 1040 540 T 1480 542 T 1600 540 L 1600 552 L 0 552 Z",
                ],
              }
        }
        transition={reduced ? undefined : { duration: 11.2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* foam glints */}
      {[
        { x: 120, y: 480, r: 1.2 },
        { x: 320, y: 540, r: 0.9 },
        { x: 540, y: 500, r: 1.0 },
        { x: 1380, y: 540, r: 0.9 },
        { x: 1480, y: 490, r: 1.2 },
      ].map((p, i) => (
        <motion.circle
          key={`foam-${i}`}
          cx={p.x}
          cy={p.y}
          r={p.r}
          fill={WATER_FOAM}
          animate={reduced ? undefined : { opacity: [0.2, 0.85, 0.2] }}
          transition={
            reduced ? undefined : { duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }
          }
        />
      ))}

      {/* drifting lanterns on the water */}
      {lanterns.map((l, i) => (
        <motion.g
          key={`lan-${i}`}
          transform={`translate(${l.x} ${l.y}) scale(${l.scale})`}
          animate={reduced ? undefined : { y: [0, -3, 0, -2, 0] }}
          transition={
            reduced ? undefined : { duration: l.dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }
          }
        >
          <ellipse cx="0" cy="14" rx="14" ry="2" fill="#000" opacity="0.25" />
          <path d="M -10 6 Q 0 12 10 6 L 8 8 Q 0 12 -8 8 Z" fill={LANTERN_BODY} />
          <circle cx="0" cy="-2" r="10" fill={LANTERN_GLOW} opacity="0.45" />
          <circle cx="0" cy="-2" r="6" fill={LANTERN_GLOW} opacity="0.85" />
          <path d="M -4 -10 L 4 -10 L 6 -2 L -6 -2 Z" fill={LANTERN_BODY} stroke={BRASS_BRIGHT} strokeWidth="0.6" />
          <circle cx="0" cy="-6" r="2.4" fill={LANTERN_GLOW} />
          <path d="M 0 -10 L 0 -14 M -2 -14 L 2 -14" stroke={BRASS} strokeWidth="0.8" fill="none" />
        </motion.g>
      ))}
    </g>
  );
}

/* ── Water + atmosphere wrapper ───────────────────────────── */
function WaterScene({ reduced, uid }: { reduced: boolean; uid: string }) {
  return (
    <svg
      className="avt-boat-water"
      viewBox="0 0 1600 660"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <SkyAndCelestials reduced={reduced} uid={uid} />
      <Falcons reduced={reduced} />
      <HarborSkyline uid={uid} />
      <Sea reduced={reduced} uid={uid} />
    </svg>
  );
}

/* ── Arab Ship — grand traditional sambuk with two sails ──── */
function DhowSvg({ uid, reduced }: { uid: string; reduced: boolean }) {
  const hullGrad = `dhow-hull-${uid}`;
  const hullShine = `dhow-shine-${uid}`;
  const sailGrad = `dhow-sail-${uid}`;
  const sailShade = `dhow-sail-shade-${uid}`;
  const sailLight = `dhow-sail-light-${uid}`;
  const jibGrad = `dhow-jib-${uid}`;
  const mastGrad = `dhow-mast-${uid}`;
  const brassGrad = `dhow-brass-${uid}`;
  const deckGrad = `dhow-deck-${uid}`;
  const cabinGrad = `dhow-cabin-${uid}`;
  const windowGlow = `dhow-window-${uid}`;

  return (
    <svg
      width="620"
      height="420"
      viewBox="0 0 620 420"
      style={{ display: "block", overflow: "visible" }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={hullGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={HULL_GLOW} />
          <stop offset="36%" stopColor={HULL_WARM} />
          <stop offset="74%" stopColor={HULL_TEAK} />
          <stop offset="100%" stopColor={HULL_BLACK} />
        </linearGradient>
        <linearGradient id={hullShine} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff2c2" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#fff2c2" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={deckGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={HULL_WARM} />
          <stop offset="100%" stopColor={HULL_TEAK} />
        </linearGradient>
        <linearGradient id={cabinGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={HULL_WARM} />
          <stop offset="100%" stopColor={HULL_DEEP} />
        </linearGradient>
        <linearGradient id={sailGrad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={SAIL_LIGHT} />
          <stop offset="60%" stopColor={SAIL_MID} />
          <stop offset="100%" stopColor={SAIL_SHADE} />
        </linearGradient>
        <linearGradient id={jibGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={SAIL_LIGHT} />
          <stop offset="100%" stopColor={SAIL_MID} />
        </linearGradient>
        <radialGradient id={sailShade} cx="0.7" cy="0.75" r="0.85">
          <stop offset="0%" stopColor="rgba(60,30,12,0.3)" />
          <stop offset="100%" stopColor="rgba(60,30,12,0)" />
        </radialGradient>
        <radialGradient id={sailLight} cx="0.2" cy="0.2" r="0.5">
          <stop offset="0%" stopColor="#fff8e0" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#fff8e0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={mastGrad} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={MAST_LIGHT} />
          <stop offset="55%" stopColor={MAST_DARK} />
          <stop offset="100%" stopColor={MAST_LIGHT} />
        </linearGradient>
        <linearGradient id={brassGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={BRASS_HIGHLIGHT} />
          <stop offset="50%" stopColor={BRASS_BRIGHT} />
          <stop offset="100%" stopColor={BRASS_DARK} />
        </linearGradient>
        <radialGradient id={windowGlow} cx="0.5" cy="0.5" r="0.7">
          <stop offset="0%" stopColor={LANTERN_GLOW} />
          <stop offset="100%" stopColor={LANTERN_GLOW} stopOpacity="0.3" />
        </radialGradient>
      </defs>

      {/* water shadow under boat */}
      <ellipse cx="310" cy="378" rx="270" ry="11" fill="rgba(0,0,0,0.38)" />
      <ellipse cx="310" cy="388" rx="232" ry="7" fill="rgba(0,0,0,0.22)" />

      {/* ═══════════ HULL ═══════════ */}
      {/* Outer hull silhouette — long elegant Sambuk profile */}
      <path
        d="
          M 60 296
          L 552 296
          Q 572 312 576 328
          Q 554 372 310 380
          Q 70 372 44 328
          Q 42 312 60 296
          Z
        "
        fill={`url(#${hullGrad})`}
      />

      {/* upper deck edge — warm strip */}
      <path d="M 60 296 L 552 296 Q 568 304 564 310 L 56 310 Q 42 304 60 296 Z" fill={`url(#${deckGrad})`} />

      {/* plank lines on the curved hull bottom */}
      <path d="M 70 326 Q 310 354 560 326" stroke={HULL_BLACK} strokeWidth="1.3" fill="none" opacity="0.55" />
      <path d="M 78 344 Q 310 366 552 344" stroke={HULL_BLACK} strokeWidth="1" fill="none" opacity="0.45" />

      {/* highlight along upper hull */}
      <path d="M 70 322 Q 310 344 558 322" stroke={`url(#${hullShine})`} strokeWidth="3" fill="none" opacity="0.7" />

      {/* gold rim along the upper hull */}
      <path d="M 60 296 L 552 296 Q 572 312 576 328" stroke={`url(#${brassGrad})`} strokeWidth="2.4" fill="none" />
      <path d="M 60 296 Q 42 312 44 328" stroke={`url(#${brassGrad})`} strokeWidth="2.4" fill="none" />

      {/* CARVED ARABESQUE FRIEZE along the hull side — gold filigree */}
      <g stroke={BRASS_BRIGHT} strokeWidth="0.8" fill="none" opacity="0.85">
        <path d="M 100 332 Q 112 326 124 332 Q 136 338 148 332 Q 160 326 172 332 Q 184 338 196 332 Q 208 326 220 332 Q 232 338 244 332 Q 256 326 268 332 Q 280 338 292 332 Q 304 326 316 332 Q 328 338 340 332 Q 352 326 364 332 Q 376 338 388 332 Q 400 326 412 332 Q 424 338 436 332 Q 448 326 460 332 Q 472 338 484 332 Q 496 326 508 332" />
        {[124, 172, 220, 268, 316, 364, 412, 460, 508].map((x, i) => (
          <circle key={`flw-${i}`} cx={x} cy={332} r="1.6" fill={BRASS} stroke="none" opacity="0.95" />
        ))}
      </g>

      {/* porthole-style brass studs */}
      {[100, 156, 212, 408, 464, 520].map((x, i) => (
        <g key={`port-${i}`}>
          <circle cx={x} cy="318" r="3" fill={BRASS_DARK} stroke={BRASS_BRIGHT} strokeWidth="0.6" />
          <circle cx={x} cy="318" r="1.2" fill={LANTERN_GLOW} opacity="0.55" />
        </g>
      ))}

      {/* ═══════════ STERN (LEFT) — elevated cabin with arched window ═══════════ */}
      {/* Stern post — tall carved upright */}
      <g>
        <path
          d="M 32 296 Q 20 246 46 218 Q 70 228 64 296 Z"
          fill={HULL_TEAK}
          stroke={HULL_DEEP}
          strokeWidth="1"
        />
        {/* carved scroll detail on stern post */}
        <path d="M 46 226 Q 36 234 40 244 Q 50 252 56 244" stroke={BRASS_BRIGHT} strokeWidth="0.8" fill="none" opacity="0.85" />
        <path d="M 46 256 Q 56 262 60 274" stroke={BRASS_BRIGHT} strokeWidth="0.7" fill="none" opacity="0.7" />
        {/* brass finial on top of stern post */}
        <circle cx="46" cy="218" r="3.6" fill={`url(#${brassGrad})`} stroke={HULL_DEEP} strokeWidth="0.5" />
        <path d="M 46 214 L 46 208 M 43 208 L 49 208" stroke={`url(#${brassGrad})`} strokeWidth="1" />
      </g>

      {/* STERN CABIN — wooden cabin with arched window and small lantern */}
      <g>
        <rect x="68" y="266" width="92" height="30" fill={`url(#${cabinGrad})`} stroke={HULL_DEEP} strokeWidth="0.8" />
        {/* roof line */}
        <path d="M 64 266 L 164 266" stroke={`url(#${brassGrad})`} strokeWidth="1.6" />
        {/* cabin plank lines */}
        {[88, 108, 128, 148].map((x, i) => (
          <line key={`cb-${i}`} x1={x} y1="266" x2={x} y2="296" stroke={HULL_BLACK} strokeWidth="0.5" opacity="0.55" />
        ))}
        {/* arched window with warm glow */}
        <path
          d="M 100 296 L 100 282 Q 100 270 114 270 Q 128 270 128 282 L 128 296 Z"
          fill={`url(#${windowGlow})`}
          stroke={BRASS_BRIGHT}
          strokeWidth="0.9"
        />
        {/* window cross-bar */}
        <line x1="114" y1="270" x2="114" y2="296" stroke={BRASS_DARK} strokeWidth="0.6" opacity="0.7" />
        <line x1="100" y1="284" x2="128" y2="284" stroke={BRASS_DARK} strokeWidth="0.6" opacity="0.7" />
        {/* lantern hanging from cabin roof corner */}
        <line x1="158" y1="266" x2="158" y2="276" stroke={MAST_DARK} strokeWidth="0.8" />
        <g transform="translate(158 282)">
          <circle r="6" fill={LANTERN_GLOW} opacity="0.45" />
          <circle r="3" fill={LANTERN_GLOW} />
          <path d="M -2 -3 L 2 -3 L 2.6 1 L -2.6 1 Z" fill={LANTERN_BODY} stroke={BRASS_BRIGHT} strokeWidth="0.5" />
        </g>
      </g>

      {/* STERN PLATFORM — small raised deck where the sheikh stands (between cabin and stern post) */}
      <g>
        <rect x="64" y="288" width="6" height="8" fill={HULL_DEEP} />
        {/* tiller (small lever) */}
        <line x1="58" y1="278" x2="44" y2="262" stroke={MAST_DARK} strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="44" cy="262" r="2.6" fill={`url(#${brassGrad})`} />
      </g>

      {/* ═══════════ BOW (RIGHT) — towering carved prow ═══════════ */}
      <g>
        {/* main carved bow post */}
        <path
          d="M 552 296 Q 590 280 596 240 Q 600 220 588 212 Q 574 220 568 240 Q 562 260 558 296 Z"
          fill={HULL_TEAK}
          stroke={HULL_DEEP}
          strokeWidth="1"
        />
        {/* carved scroll-work on bow post */}
        <path d="M 580 240 Q 590 234 596 240 Q 592 248 584 250" stroke={BRASS_BRIGHT} strokeWidth="0.8" fill="none" opacity="0.9" />
        <path d="M 572 262 Q 582 268 588 264" stroke={BRASS_BRIGHT} strokeWidth="0.7" fill="none" opacity="0.75" />
        <path d="M 568 278 Q 580 282 586 276" stroke={BRASS_BRIGHT} strokeWidth="0.6" fill="none" opacity="0.65" />
        {/* protective eye medallion — traditional Arab maritime motif */}
        <circle cx="572" cy="288" r="5" fill={`url(#${brassGrad})`} stroke={HULL_DEEP} strokeWidth="0.7" />
        <circle cx="572" cy="288" r="1.8" fill={EMERALD_DEEP} />
        {/* brass crescent finial atop bow post */}
        <circle cx="592" cy="212" r="3.8" fill={`url(#${brassGrad})`} stroke={HULL_DEEP} strokeWidth="0.5" />
        <path d="M 588 206 Q 592 200 596 206 Q 594 210 588 206 Z" fill={BRASS_BRIGHT} />
      </g>

      {/* BOWSPRIT — short pole jutting forward from bow for jib sail */}
      <line x1="580" y1="294" x2="616" y2="276" stroke={`url(#${mastGrad})`} strokeWidth="4" strokeLinecap="round" />

      {/* ═══════════ MAIN MAST ═══════════ */}
      <line
        x1="270"
        y1="286"
        x2="220"
        y2="36"
        stroke={`url(#${mastGrad})`}
        strokeWidth="8"
        strokeLinecap="round"
      />
      {/* mast collar/fitting */}
      <circle cx="220" cy="36" r="6" fill={`url(#${brassGrad})`} stroke={MAST_DARK} strokeWidth="0.6" />
      {/* mast crow's nest ring */}
      <ellipse cx="234" cy="100" rx="14" ry="3" fill={HULL_TEAK} stroke={HULL_DEEP} strokeWidth="0.6" />
      <ellipse cx="234" cy="100" rx="10" ry="2" fill={HULL_WARM} />

      {/* ═══════════ MAIN LATEEN SAIL — large triangular sail ═══════════ */}
      {/* spar (yard) — long pole, peak high-left, tack low-right at bow deck */}
      <line
        x1="170"
        y1="50"
        x2="540"
        y2="282"
        stroke={MAST_DARK}
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* spar binding wraps */}
      {[0.16, 0.34, 0.52, 0.7, 0.86].map((t, i) => {
        const x = 170 + (540 - 170) * t;
        const y = 50 + (282 - 50) * t;
        return (
          <rect key={`bind-${i}`} x={x - 4} y={y - 3.5} width="8" height="7" fill={ROPE} opacity="0.9" transform={`rotate(32 ${x} ${y})`} />
        );
      })}

      <motion.g
        style={{ transformOrigin: "220px 36px" }}
        animate={reduced ? undefined : { rotate: [-0.7, 0.7, -0.7] }}
        transition={reduced ? undefined : { duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* sail body — triangle: mast top → spar tip → mast base */}
        <path
          d="M 220 38 L 540 282 Q 430 298 320 290 Q 252 282 232 268 Q 222 252 220 38 Z"
          fill={`url(#${sailGrad})`}
        />
        <path
          d="M 220 38 L 540 282 Q 430 298 320 290 Q 252 282 232 268 Q 222 252 220 38 Z"
          fill={`url(#${sailShade})`}
          opacity="0.55"
        />
        <path
          d="M 220 38 L 540 282 Q 430 298 320 290 Q 252 282 232 268 Q 222 252 220 38 Z"
          fill={`url(#${sailLight})`}
          opacity="0.85"
        />
        {/* sail curvature contour lines */}
        <path d="M 228 70 Q 314 116 514 274" stroke={SAIL_SHADE} strokeWidth="1.4" fill="none" opacity="0.45" />
        <path d="M 234 120 Q 328 152 500 274" stroke={SAIL_SHADE} strokeWidth="1.1" fill="none" opacity="0.35" />
        <path d="M 238 170 Q 340 196 486 276" stroke={SAIL_SHADE} strokeWidth="0.9" fill="none" opacity="0.28" />
        <path d="M 242 220 Q 350 240 472 278" stroke={SAIL_SHADE} strokeWidth="0.8" fill="none" opacity="0.22" />

        {/* trim along the leech with tassels */}
        <path d="M 540 282 Q 430 298 320 290 Q 252 282 232 268" stroke={EMERALD_DEEP} strokeWidth="2.4" fill="none" />
        {[
          { x: 268, y: 286 },
          { x: 320, y: 294 },
          { x: 376, y: 298 },
          { x: 432, y: 296 },
          { x: 488, y: 290 },
        ].map((t, i) => (
          <g key={`tas-${i}`} transform={`translate(${t.x} ${t.y})`}>
            <line x1="0" y1="0" x2="0" y2="11" stroke={EMERALD_DEEP} strokeWidth="1" />
            <circle cx="0" cy="12" r="2.6" fill={`url(#${brassGrad})`} />
          </g>
        ))}

        {/* horizontal reef-band stitching across the sail */}
        <path d="M 240 178 Q 350 192 478 244" stroke={SAIL_SHADE} strokeWidth="0.6" fill="none" opacity="0.4" strokeDasharray="3 3" />
      </motion.g>

      {/* ═══════════ JIB SAIL — small front sail attached to bowsprit ═══════════ */}
      <motion.g
        style={{ transformOrigin: "220px 36px" }}
        animate={reduced ? undefined : { rotate: [-0.4, 0.4, -0.4] }}
        transition={reduced ? undefined : { duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* forestay rope */}
        <line x1="220" y1="40" x2="614" y2="278" stroke={ROPE} strokeWidth="0.8" opacity="0.7" />
        {/* jib triangle: mast top → bowsprit tip → mast at mid-height */}
        <path
          d="M 222 50 L 614 276 Q 540 268 432 218 Q 322 168 224 124 Z"
          fill={`url(#${jibGrad})`}
          opacity="0.92"
        />
        {/* shading on jib */}
        <path
          d="M 222 50 L 614 276 Q 540 268 432 218 Q 322 168 224 124 Z"
          fill={`url(#${sailShade})`}
          opacity="0.4"
        />
        {/* jib curvature line */}
        <path d="M 250 88 Q 360 158 580 268" stroke={SAIL_SHADE} strokeWidth="0.9" fill="none" opacity="0.45" />
        {/* gold trim along jib edge */}
        <path d="M 222 50 L 614 276" stroke={BRASS_BRIGHT} strokeWidth="0.8" opacity="0.7" />
      </motion.g>

      {/* ═══════════ MASTHEAD PENNANTS ═══════════ */}
      <motion.g
        style={{ transformOrigin: "220px 10px" }}
        animate={reduced ? undefined : { rotate: [-3, 3, -3] }}
        transition={reduced ? undefined : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <line x1="220" y1="36" x2="220" y2="-6" stroke={MAST_DARK} strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="220" cy="-7" r="3.8" fill={`url(#${brassGrad})`} stroke={MAST_DARK} strokeWidth="0.6" />
        {/* primary pennant — emerald */}
        <motion.path
          d="M 220 -2 L 296 0 Q 280 12 296 26 L 220 26 Z"
          fill={EMERALD}
          stroke={EMERALD_DEEP}
          strokeWidth="0.8"
          animate={
            reduced
              ? undefined
              : {
                  d: [
                    "M 220 -2 L 296 0 Q 280 12 296 26 L 220 26 Z",
                    "M 220 -2 L 290 2 Q 286 12 290 26 L 220 26 Z",
                    "M 220 -2 L 296 0 Q 280 12 296 26 L 220 26 Z",
                  ],
                }
          }
          transition={reduced ? undefined : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* secondary pennant — gold triangle */}
        <motion.path
          d="M 220 28 L 268 32 L 220 40 Z"
          fill={BRASS_BRIGHT}
          stroke={BRASS_DARK}
          strokeWidth="0.5"
          animate={
            reduced
              ? undefined
              : {
                  d: [
                    "M 220 28 L 268 32 L 220 40 Z",
                    "M 220 28 L 264 34 L 220 40 Z",
                    "M 220 28 L 268 32 L 220 40 Z",
                  ],
                }
          }
          transition={reduced ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        />
      </motion.g>

      {/* SECONDARY FLAG on bowsprit tip */}
      <motion.g
        style={{ transformOrigin: "616px 276px" }}
        animate={reduced ? undefined : { rotate: [-3, 3, -3] }}
        transition={reduced ? undefined : { duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      >
        <line x1="616" y1="276" x2="618" y2="258" stroke={MAST_DARK} strokeWidth="1.4" />
        <motion.path
          d="M 618 258 L 640 262 L 618 270 Z"
          fill={EMERALD}
          stroke={EMERALD_DEEP}
          strokeWidth="0.5"
          animate={
            reduced
              ? undefined
              : {
                  d: [
                    "M 618 258 L 640 262 L 618 270 Z",
                    "M 618 258 L 636 264 L 618 270 Z",
                    "M 618 258 L 640 262 L 618 270 Z",
                  ],
                }
          }
          transition={reduced ? undefined : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.g>

      {/* ═══════════ HANGING BRASS LANTERN (from spar) ═══════════ */}
      <motion.g
        style={{ transformOrigin: "300px 110px" }}
        animate={reduced ? undefined : { rotate: [-4, 4, -4] }}
        transition={reduced ? undefined : { duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <line x1="300" y1="110" x2="300" y2="148" stroke={MAST_DARK} strokeWidth="0.8" />
        <g transform="translate(300 162)">
          <circle r="22" fill={LANTERN_GLOW} opacity="0.3" />
          <circle r="14" fill={LANTERN_GLOW} opacity="0.55" />
          <path
            d="M -8 -10 L 8 -10 L 10 0 L 8 8 L -8 8 L -10 0 Z"
            fill={LANTERN_BODY}
            stroke={`url(#${brassGrad})`}
            strokeWidth="1.4"
          />
          <ellipse cx="0" cy="-1" rx="4" ry="6" fill={LANTERN_GLOW} />
          <path d="M -7 -10 L 7 -10 L 8 -13 L -8 -13 Z" fill={`url(#${brassGrad})`} />
          <line x1="0" y1="-13" x2="0" y2="-16" stroke={`url(#${brassGrad})`} strokeWidth="1" />
          <path d="M -3 9 L 3 9 L 0 14 Z" fill={`url(#${brassGrad})`} />
        </g>
      </motion.g>

      {/* RIGGING ROPES */}
      <line x1="220" y1="36" x2="160" y2="290" stroke={ROPE} strokeWidth="1" opacity="0.6" />
      <line x1="220" y1="36" x2="356" y2="288" stroke={ROPE} strokeWidth="0.9" opacity="0.55" />
      <line x1="540" y1="282" x2="480" y2="290" stroke={ROPE} strokeWidth="1" opacity="0.6" />
      <line x1="380" y1="200" x2="356" y2="288" stroke={ROPE} strokeWidth="0.7" opacity="0.45" />
    </svg>
  );
}

/* ── BoatFinale (main component) ──────────────────────────── */
export default function BoatFinale({ active }: Props) {
  const reduced = useReducedMotion() ?? false;
  const locale = useLocale();
  const tTour = useTranslations("product.tour");
  const isRtl = locale === "ar";
  const uid = useId().replace(/[:]/g, "");

  const [revealBubble, setRevealBubble] = useState(false);
  const bubbleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active) {
      setRevealBubble(false);
      if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
      return;
    }
    bubbleTimer.current = setTimeout(() => setRevealBubble(true), reduced ? 200 : 1400);
    return () => {
      if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
    };
  }, [active, reduced]);

  const leftKf = isRtl ? RTL_LEFT : LTR_LEFT;

  return (
    <div className="avt-boat-scene" aria-hidden={!active}>
      <WaterScene reduced={reduced} uid={uid} />

      {/* foreground reeds */}
      <svg
        className="avt-boat-reeds"
        viewBox="0 0 1200 100"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        {[20, 50, 80, 105, 138, 1062, 1095, 1120, 1148, 1180].map((x, i) => (
          <g key={i} transform={`translate(${x} 100)`}>
            <path
              d={`M 0 0 Q ${i % 2 === 0 ? -3 : 3} -42 ${i % 2 === 0 ? -1 : 1} -76`}
              stroke="#1a2a16"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={`M 0 0 Q ${i % 2 === 0 ? -8 : 8} -38 ${i % 2 === 0 ? -12 : 12} -66`}
              stroke="#0e1c0c"
              strokeWidth="2.2"
              fill="none"
              strokeLinecap="round"
            />
            <ellipse cx={i % 2 === 0 ? -1 : 1} cy={-76} rx="1" ry="3" fill="#1a2a16" />
          </g>
        ))}
      </svg>

      <motion.div
        className="avt-boat-traveler"
        initial={false}
        animate={
          active
            ? reduced
              ? { left: leftKf[3], top: "30%", scale: 1.08 }
              : { left: leftKf, top: TOP_KF, scale: SCALE_KF }
            : { left: leftKf[0], top: TOP_KF[0], scale: SCALE_KF[0] }
        }
        transition={
          reduced
            ? { duration: 0.4 }
            : {
                duration: VOYAGE_DURATION,
                times: TIMES_KF,
                ease: "easeInOut",
                repeat: active ? Infinity : 0,
              }
        }
      >
        <motion.div
          className="avt-boat-bob"
          animate={
            reduced
              ? { y: 0, rotate: 0 }
              : { y: [0, -5, 0, -3, 0], rotate: [0, -1.1, 0, 1.1, 0] }
          }
          transition={
            reduced ? undefined : { duration: 4.6, repeat: Infinity, ease: "easeInOut" }
          }
        >
          {/* Sheikh — at the stern, face fully visible */}
          <div className="avt-boat-avatar">
            <Avatar talking={revealBubble} isRtl={isRtl} collectedCount={9} />
          </div>
          <div className="avt-boat-hull">
            <DhowSvg uid={uid} reduced={reduced} />
          </div>
        </motion.div>

        <motion.div
          className="avt-boat-bubble"
          initial={{ opacity: 0, y: 14, scale: 0.9 }}
          animate={
            revealBubble
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 14, scale: 0.9 }
          }
          transition={{ duration: reduced ? 0.2 : 0.65, ease: "easeOut" }}
        >
          <span className="avt-boat-bubble-corner avt-boat-bubble-corner-tl" aria-hidden="true" />
          <span className="avt-boat-bubble-corner avt-boat-bubble-corner-tr" aria-hidden="true" />
          <span className="avt-boat-bubble-corner avt-boat-bubble-corner-bl" aria-hidden="true" />
          <span className="avt-boat-bubble-corner avt-boat-bubble-corner-br" aria-hidden="true" />

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

      {/* Bow wake — moves with the boat */}
      <motion.div
        className="avt-boat-bowwave"
        initial={false}
        animate={
          active
            ? reduced
              ? { left: leftKf[3], top: "60%", scale: 1.08 }
              : { left: leftKf, top: TOP_KF.map((t) => `calc(${t} + 32%)`), scale: SCALE_KF }
            : { left: leftKf[0], top: `calc(${TOP_KF[0]} + 32%)`, scale: SCALE_KF[0] }
        }
        transition={
          reduced
            ? { duration: 0.4 }
            : {
                duration: VOYAGE_DURATION,
                times: TIMES_KF,
                ease: "easeInOut",
                repeat: active ? Infinity : 0,
              }
        }
      >
        <svg width="320" height="68" viewBox="-160 -34 320 68" aria-hidden="true">
          <motion.path
            d="M -130 14 Q -70 6 0 14 Q 70 6 130 14"
            stroke={WATER_FOAM}
            strokeWidth="2.8"
            fill="none"
            opacity="0.85"
            animate={
              reduced
                ? undefined
                : {
                    d: [
                      "M -130 14 Q -70 6 0 14 Q 70 6 130 14",
                      "M -130 16 Q -70 8 0 16 Q 70 8 130 16",
                      "M -130 14 Q -70 6 0 14 Q 70 6 130 14",
                    ],
                  }
            }
            transition={reduced ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M -100 22 Q -50 16 0 22 Q 50 16 100 22"
            stroke={WATER_FOAM}
            strokeWidth="1.6"
            fill="none"
            opacity="0.55"
            animate={
              reduced
                ? undefined
                : {
                    d: [
                      "M -100 22 Q -50 16 0 22 Q 50 16 100 22",
                      "M -100 24 Q -50 18 0 24 Q 50 18 100 24",
                      "M -100 22 Q -50 16 0 22 Q 50 16 100 22",
                    ],
                  }
            }
            transition={reduced ? undefined : { duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />
          {[
            { x: -82, y: 2, r: 1.3 },
            { x: -40, y: -4, r: 0.9 },
            { x: 8, y: -2, r: 1.1 },
            { x: 52, y: -6, r: 1.0 },
            { x: 92, y: 0, r: 1.2 },
          ].map((d, i) => (
            <motion.circle
              key={`drop-${i}`}
              cx={d.x}
              cy={d.y}
              r={d.r}
              fill={WATER_FOAM}
              animate={
                reduced
                  ? undefined
                  : { opacity: [0.2, 0.95, 0.2], cy: [d.y, d.y - 4, d.y] }
              }
              transition={
                reduced ? undefined : { duration: 1.6 + i * 0.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }
              }
            />
          ))}
        </svg>
      </motion.div>
    </div>
  );
}
