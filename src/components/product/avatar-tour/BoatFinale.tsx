"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Avatar from "./Avatar";

interface Props {
  active: boolean;
}

/* ── Palette ────────────────────────────────────────────────── */
// Sky — magrib (sunset) deepening into twilight at the zenith
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

// Dhow — rich teak with brass and emerald accents
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
const SAIL_TRIM = "#7a2820";

// Rope & wood
const ROPE = "#a9824a";
const MAST_DARK = "#2a1808";
const MAST_LIGHT = "#6e4424";

// Lanterns
const LANTERN_GLOW = "#ffd070";
const LANTERN_BODY = "#3a2a14";

/* ────────────────────────────────────────────────────────────── */

function SkyAndCelestials({ reduced, uid }: { reduced: boolean; uid: string }) {
  const skyGrad = `bf-sky-${uid}`;
  const sunGrad = `bf-sun-${uid}`;
  const moonGrad = `bf-moon-${uid}`;
  const haloGrad = `bf-halo-${uid}`;

  // Twinkling stars — generated deterministically from uid
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

      {/* Stars (in upper twilight) */}
      <g>
        {stars.map((s, i) => (
          <motion.circle
            key={`star-${i}`}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill={STAR}
            animate={reduced ? undefined : { opacity: [0.45, 1, 0.45] }}
            transition={
              reduced ? undefined : { duration: s.d, repeat: Infinity, ease: "easeInOut", delay: (i % 4) * 0.4 }
            }
          />
        ))}
        {/* Cross-glints on the brightest two */}
        {[
          { x: 470, y: 32, s: 4 },
          { x: 1320, y: 70, s: 5 },
        ].map((g, i) => (
          <g key={`gl-${i}`} transform={`translate(${g.x} ${g.y})`} opacity="0.65">
            <line x1={-g.s} y1="0" x2={g.s} y2="0" stroke={STAR} strokeWidth="0.5" />
            <line x1="0" y1={-g.s} x2="0" y2={g.s} stroke={STAR} strokeWidth="0.5" />
          </g>
        ))}
      </g>

      {/* Crescent moon — a moon disc with an offset overlay matching the sky */}
      <g transform="translate(220 88)">
        <circle r="20" fill={`url(#${moonGrad})`} opacity="0.95" />
        {/* the bite that creates the crescent — colored to blend with sky at that y */}
        <circle cx="-8" cy="-3" r="18" fill={SKY_HIGH} />
        {/* soft outer glow */}
        <circle r="34" fill="#fdf3d4" opacity="0.08" />
      </g>

      {/* Sun — sitting low on horizon */}
      <g transform="translate(1180 270)">
        <ellipse rx="180" ry="120" fill={`url(#${haloGrad})`} opacity="0.7" />
        <ellipse rx="120" ry="100" fill={`url(#${sunGrad})`} />
        <circle r="56" fill={SUN_CORE} opacity="0.92" />
        <circle r="62" fill="none" stroke={SUN_CORE} strokeWidth="1.2" opacity="0.45" />
        {/* horizon light streaks */}
        <ellipse rx="240" ry="6" cy="48" fill={SUN_CORE} opacity="0.5" />
        <ellipse rx="180" ry="3" cy="62" fill={SUN_CORE} opacity="0.35" />
      </g>

      {/* Wispy clouds */}
      <motion.g
        animate={reduced ? undefined : { x: [0, -60, 0] }}
        transition={reduced ? undefined : { duration: 38, repeat: Infinity, ease: "easeInOut" }}
        opacity="0.5"
      >
        <ellipse cx="420" cy="160" rx="90" ry="9" fill="#fdf2d8" />
        <ellipse cx="460" cy="152" rx="56" ry="6" fill="#fdf2d8" />
        <ellipse cx="780" cy="120" rx="110" ry="8" fill="#fdf2d8" opacity="0.75" />
        <ellipse cx="820" cy="130" rx="60" ry="5" fill="#fdf2d8" opacity="0.6" />
      </motion.g>
    </g>
  );
}

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

      {/* Distant haze band — softens horizon */}
      <rect x="0" y="330" width="1600" height="20" fill="#f0a85e" opacity="0.35" />

      {/* FAR LAYER — distant city silhouette: minarets, low buildings, towers */}
      <g fill={`url(#${farGrad})`}>
        <path
          d="M 0 340 L 0 322 L 28 322 L 28 316 L 60 316 L 60 326 L 90 326 L 96 304 L 102 326 L 130 326 L 130 318 L 168 318 L 168 312 L 200 312 L 200 326 L 230 326 L 234 296 L 240 290 L 246 296 L 250 326 L 280 326 L 280 320 L 310 320 L 310 312 L 348 312 L 348 306 L 358 306 L 362 298 L 366 306 L 376 306 L 376 326 L 410 326 L 410 318 L 440 318 L 446 304 L 450 290 L 454 304 L 460 318 L 488 318 L 488 326 L 520 326 L 520 312 L 562 312 L 562 320 L 600 320 L 600 326 L 640 326 L 644 300 L 650 290 L 656 300 L 660 326 L 700 326 L 700 318 L 740 318 L 740 322 L 800 322 L 800 326 L 850 326 L 854 304 L 860 296 L 866 304 L 870 326 L 920 326 L 920 318 L 980 318 L 980 326 L 1040 326 L 1040 322 L 1100 322 L 1100 326 L 1140 326 L 1144 308 L 1150 296 L 1156 308 L 1160 326 L 1220 326 L 1220 318 L 1280 318 L 1280 312 L 1330 312 L 1334 298 L 1340 286 L 1346 298 L 1350 312 L 1400 312 L 1400 320 L 1460 320 L 1460 326 L 1520 326 L 1524 304 L 1530 296 L 1536 304 L 1540 326 L 1600 326 L 1600 340 Z"
        />
        {/* tiny minaret crescents */}
        {[240, 450, 650, 860, 1150, 1340, 1530].map((x, i) => (
          <g key={`min-${i}`} transform={`translate(${x} 286)`}>
            <circle r="2" fill={BRASS} opacity="0.75" />
          </g>
        ))}
      </g>

      {/* NEAR LAYER — palm grove and lower roofs */}
      <g fill={`url(#${nearGrad})`}>
        <path
          d="M 0 360 L 0 348 Q 120 332 240 344 Q 360 354 480 340 Q 600 326 720 344 Q 840 358 960 340 Q 1080 326 1200 346 Q 1320 360 1440 340 Q 1520 330 1600 346 L 1600 360 Z"
        />
      </g>

      {/* Foreground palm silhouettes flanking the scene */}
      <g aria-hidden="true">
        {[
          { x: 110, scale: 1, lean: -2 },
          { x: 1490, scale: 1.05, lean: 2 },
        ].map((p, i) => (
          <g key={`palm-${i}`} transform={`translate(${p.x} 346) scale(${p.scale}) rotate(${p.lean})`}>
            {/* trunk */}
            <path
              d="M 0 0 Q -2 -28 1 -56 Q 4 -84 -1 -110"
              stroke={SKYLINE_NEAR}
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* trunk segment scales */}
            <g stroke={SKYLINE_FAR} strokeWidth="0.8" opacity="0.6">
              <line x1="-3" y1="-20" x2="3" y2="-20" />
              <line x1="-3" y1="-40" x2="3" y2="-40" />
              <line x1="-3" y1="-60" x2="3" y2="-60" />
              <line x1="-3" y1="-80" x2="3" y2="-80" />
            </g>
            {/* fronds — 7 leaves */}
            {[-90, -65, -40, -15, 15, 40, 65].map((a, j) => (
              <g key={`f-${j}`} transform={`translate(-1 -110) rotate(${a})`}>
                <path
                  d={`M 0 0 Q ${a < 0 ? -22 : a > 0 ? 22 : 0} -8 ${a < 0 ? -38 : a > 0 ? 38 : 2} -14 Q ${a < 0 ? -28 : a > 0 ? 28 : 0} -6 0 0 Z`}
                  fill={SKYLINE_NEAR}
                  opacity="0.95"
                />
                <path
                  d={`M 0 0 Q ${a < 0 ? -22 : a > 0 ? 22 : 0} -8 ${a < 0 ? -38 : a > 0 ? 38 : 2} -14`}
                  stroke={SKYLINE_FAR}
                  strokeWidth="0.6"
                  fill="none"
                  opacity="0.5"
                />
              </g>
            ))}
            {/* coconut/date cluster */}
            <circle cx="-3" cy="-104" r="2.2" fill={BRASS_DARK} opacity="0.85" />
            <circle cx="3" cy="-104" r="2.2" fill={BRASS_DARK} opacity="0.85" />
            <circle cx="0" cy="-100" r="2.2" fill={BRASS_DARK} opacity="0.85" />
          </g>
        ))}
      </g>
    </g>
  );
}

function Falcons({ reduced, uid }: { reduced: boolean; uid: string }) {
  // Two falcons soaring with subtle motion
  const path1 =
    "M -8 0 Q -6 -3 -2 -2 Q 0 -3 2 -2 Q 6 -3 8 0 Q 6 1 2 0 Q 0 1 -2 0 Q -6 1 -8 0 Z";
  return (
    <g aria-hidden="true" fill="#1a1530" opacity="0.85">
      <motion.g
        animate={reduced ? undefined : { x: [0, 40, 0], y: [0, -4, 0] }}
        transition={reduced ? undefined : { duration: 14, repeat: Infinity, ease: "easeInOut" }}
      >
        <g transform="translate(360 130) scale(1.6)">
          <motion.path
            d={path1}
            animate={reduced ? undefined : {
              d: [
                "M -8 0 Q -6 -3 -2 -2 Q 0 -3 2 -2 Q 6 -3 8 0 Q 6 1 2 0 Q 0 1 -2 0 Q -6 1 -8 0 Z",
                "M -8 0 Q -6 -1 -2 -1 Q 0 -2 2 -1 Q 6 -1 8 0 Q 6 2 2 1 Q 0 2 -2 1 Q -6 2 -8 0 Z",
                "M -8 0 Q -6 -3 -2 -2 Q 0 -3 2 -2 Q 6 -3 8 0 Q 6 1 2 0 Q 0 1 -2 0 Q -6 1 -8 0 Z",
              ],
            }}
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
            d={path1}
            animate={reduced ? undefined : {
              d: [
                "M -8 0 Q -6 -3 -2 -2 Q 0 -3 2 -2 Q 6 -3 8 0 Q 6 1 2 0 Q 0 1 -2 0 Q -6 1 -8 0 Z",
                "M -8 0 Q -6 0 -2 0 Q 0 -1 2 0 Q 6 0 8 0 Q 6 2 2 1 Q 0 2 -2 1 Q -6 2 -8 0 Z",
                "M -8 0 Q -6 -3 -2 -2 Q 0 -3 2 -2 Q 6 -3 8 0 Q 6 1 2 0 Q 0 1 -2 0 Q -6 1 -8 0 Z",
              ],
            }}
            transition={reduced ? undefined : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>
      </motion.g>
    </g>
  );
}

function Sea({ reduced, uid }: { reduced: boolean; uid: string }) {
  const waterGrad = `bf-water-${uid}`;
  const glintGrad = `bf-glint-${uid}`;
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

      {/* Water body */}
      <rect x="0" y="340" width="1600" height="320" fill={`url(#${waterGrad})`} />

      {/* Sun reflection — vertical column under the sun, narrowing toward horizon */}
      <g>
        <motion.path
          d="M 1130 340 L 1230 340 L 1280 660 L 1080 660 Z"
          fill={`url(#${glintGrad})`}
          animate={reduced ? undefined : { opacity: [0.55, 0.85, 0.55] }}
          transition={reduced ? undefined : { duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* horizontal sparkles within the reflection */}
        {[360, 400, 444, 490, 540, 590].map((y, i) => (
          <motion.line
            key={`gl-${i}`}
            x1={1080 + i * 4}
            y1={y}
            x2={1280 - i * 4}
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

      {/* Wave layers — three parallax bands */}
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
        d="M 0 408 Q 240 398 480 410 T 960 408 T 1440 410 T 1600 408 L 1600 418 L 0 418 Z"
        fill={WATER_LIGHT}
        opacity="0.5"
        animate={
          reduced
            ? undefined
            : {
                d: [
                  "M 0 408 Q 240 398 480 410 T 960 408 T 1440 410 T 1600 408 L 1600 418 L 0 418 Z",
                  "M 0 408 Q 240 418 480 410 T 960 408 T 1440 410 T 1600 408 L 1600 418 L 0 418 Z",
                  "M 0 408 Q 240 398 480 410 T 960 408 T 1440 410 T 1600 408 L 1600 418 L 0 418 Z",
                ],
              }
        }
        transition={reduced ? undefined : { duration: 8.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M 0 500 Q 260 488 520 504 T 1040 500 T 1480 502 T 1600 500 L 1600 512 L 0 512 Z"
        fill={WATER_LIGHT}
        opacity="0.34"
        animate={
          reduced
            ? undefined
            : {
                d: [
                  "M 0 500 Q 260 488 520 504 T 1040 500 T 1480 502 T 1600 500 L 1600 512 L 0 512 Z",
                  "M 0 500 Q 260 512 520 504 T 1040 500 T 1480 502 T 1600 500 L 1600 512 L 0 512 Z",
                  "M 0 500 Q 260 488 520 504 T 1040 500 T 1480 502 T 1600 500 L 1600 512 L 0 512 Z",
                ],
              }
        }
        transition={reduced ? undefined : { duration: 11.2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Scattered foam glints */}
      {[
        { x: 120, y: 460, r: 1.2 },
        { x: 320, y: 520, r: 0.9 },
        { x: 540, y: 480, r: 1.0 },
        { x: 760, y: 540, r: 0.8 },
        { x: 880, y: 500, r: 1.1 },
        { x: 1380, y: 520, r: 0.9 },
        { x: 1480, y: 470, r: 1.2 },
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
    </g>
  );
}

function FloatingLanterns({ reduced }: { reduced: boolean }) {
  const lanterns = [
    { x: 280, y: 470, scale: 0.9, dur: 4.2 },
    { x: 760, y: 540, scale: 0.7, dur: 5.4 },
    { x: 1300, y: 460, scale: 1.0, dur: 4.8 },
  ];
  return (
    <g aria-hidden="true">
      {lanterns.map((l, i) => (
        <motion.g
          key={`lan-${i}`}
          transform={`translate(${l.x} ${l.y}) scale(${l.scale})`}
          animate={reduced ? undefined : { y: [0, -3, 0, -2, 0] }}
          transition={reduced ? undefined : { duration: l.dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
        >
          {/* water shadow ring */}
          <ellipse cx="0" cy="14" rx="14" ry="2" fill="#000" opacity="0.25" />
          {/* base / boat */}
          <path d="M -10 6 Q 0 12 10 6 L 8 8 Q 0 12 -8 8 Z" fill={LANTERN_BODY} />
          {/* glow */}
          <circle cx="0" cy="-2" r="10" fill={LANTERN_GLOW} opacity="0.45" />
          <circle cx="0" cy="-2" r="6" fill={LANTERN_GLOW} opacity="0.85" />
          {/* lantern body */}
          <path
            d="M -4 -10 L 4 -10 L 6 -2 L -6 -2 Z"
            fill={LANTERN_BODY}
            stroke={BRASS_BRIGHT}
            strokeWidth="0.6"
          />
          <circle cx="0" cy="-6" r="2.4" fill={LANTERN_GLOW} />
          {/* top loop */}
          <path d="M 0 -10 L 0 -14 M -2 -14 L 2 -14" stroke={BRASS} strokeWidth="0.8" fill="none" />
          {/* reflection on water */}
          <motion.ellipse
            cx="0"
            cy="20"
            rx="4"
            ry="0.8"
            fill={LANTERN_GLOW}
            opacity="0.6"
            animate={reduced ? undefined : { rx: [3, 6, 3], opacity: [0.4, 0.7, 0.4] }}
            transition={reduced ? undefined : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.g>
      ))}
    </g>
  );
}

function WaterScene({ reduced, uid }: { reduced: boolean; uid: string }) {
  return (
    <svg
      className="avt-boat-water"
      viewBox="0 0 1600 660"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <SkyAndCelestials reduced={reduced} uid={uid} />
      <Falcons reduced={reduced} uid={uid} />
      <HarborSkyline uid={uid} />
      <Sea reduced={reduced} uid={uid} />
      <FloatingLanterns reduced={reduced} />
    </svg>
  );
}

/* ── Dhow (Sambuk) — ornate Arab sailing vessel ──────────────── */
function DhowSvg({ uid, reduced }: { uid: string; reduced: boolean }) {
  const hullGrad = `dhow-hull-${uid}`;
  const hullShine = `dhow-shine-${uid}`;
  const sailGrad = `dhow-sail-${uid}`;
  const sailShade = `dhow-sail-shade-${uid}`;
  const sailLight = `dhow-sail-light-${uid}`;
  const mastGrad = `dhow-mast-${uid}`;
  const brassGrad = `dhow-brass-${uid}`;

  return (
    <svg
      width="520"
      height="380"
      viewBox="0 0 520 380"
      style={{ display: "block", overflow: "visible" }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={hullGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={HULL_GLOW} />
          <stop offset="38%" stopColor={HULL_WARM} />
          <stop offset="76%" stopColor={HULL_TEAK} />
          <stop offset="100%" stopColor={HULL_BLACK} />
        </linearGradient>
        <linearGradient id={hullShine} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff2c2" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#fff2c2" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={sailGrad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={SAIL_LIGHT} />
          <stop offset="60%" stopColor={SAIL_MID} />
          <stop offset="100%" stopColor={SAIL_SHADE} />
        </linearGradient>
        <radialGradient id={sailShade} cx="0.7" cy="0.7" r="0.8">
          <stop offset="0%" stopColor="rgba(60,30,12,0.3)" />
          <stop offset="100%" stopColor="rgba(60,30,12,0)" />
        </radialGradient>
        <radialGradient id={sailLight} cx="0.18" cy="0.16" r="0.5">
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
      </defs>

      {/* Soft water shadow under boat */}
      <ellipse cx="260" cy="340" rx="220" ry="9" fill="rgba(0,0,0,0.32)" />
      <ellipse cx="260" cy="346" rx="190" ry="6" fill="rgba(0,0,0,0.18)" />

      {/* ===== MAST (raked forward, Arab dhow style) ===== */}
      <line
        x1="208"
        y1="298"
        x2="156"
        y2="44"
        stroke={`url(#${mastGrad})`}
        strokeWidth="7"
        strokeLinecap="round"
      />
      {/* Mast collar / fitting */}
      <circle cx="156" cy="44" r="5" fill={`url(#${brassGrad})`} stroke={MAST_DARK} strokeWidth="0.6" />

      {/* Spar (yard) — long, angled, holds the lateen sail */}
      <line
        x1="118"
        y1="60"
        x2="488"
        y2="232"
        stroke={MAST_DARK}
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* spar binding wraps */}
      {[0.18, 0.36, 0.54, 0.72, 0.88].map((t, i) => {
        const x = 118 + (488 - 118) * t;
        const y = 60 + (232 - 60) * t;
        return (
          <g key={`bind-${i}`} transform={`translate(${x} ${y}) rotate(24.9)`}>
            <rect x="-4" y="-3.5" width="8" height="7" fill={ROPE} opacity="0.9" />
          </g>
        );
      })}

      {/* ===== LATEEN SAIL ===== */}
      <motion.g
        style={{ transformOrigin: "156px 44px" }}
        animate={reduced ? undefined : { rotate: [-0.7, 0.7, -0.7] }}
        transition={reduced ? undefined : { duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* main sail body — taut, gentle billow */}
        <path
          d="M 156 46 L 488 232 Q 400 252 296 246 Q 210 240 178 226 Q 162 214 156 46 Z"
          fill={`url(#${sailGrad})`}
        />
        {/* shadow gradient on the sail (windward shading) */}
        <path
          d="M 156 46 L 488 232 Q 400 252 296 246 Q 210 240 178 226 Q 162 214 156 46 Z"
          fill={`url(#${sailShade})`}
          opacity="0.6"
        />
        {/* highlight gradient (sun-touched corner) */}
        <path
          d="M 156 46 L 488 232 Q 400 252 296 246 Q 210 240 178 226 Q 162 214 156 46 Z"
          fill={`url(#${sailLight})`}
          opacity="0.85"
        />
        {/* sail curvature contour lines */}
        <path d="M 164 70 Q 240 110 460 224" stroke={SAIL_SHADE} strokeWidth="1.4" fill="none" opacity="0.45" />
        <path d="M 170 110 Q 256 142 446 224" stroke={SAIL_SHADE} strokeWidth="1.2" fill="none" opacity="0.35" />
        <path d="M 174 152 Q 270 174 432 226" stroke={SAIL_SHADE} strokeWidth="1.0" fill="none" opacity="0.28" />

        {/* trim along the leech (bottom edge) — emerald with brass tassels */}
        <path
          d="M 488 232 Q 400 252 296 246 Q 210 240 178 226"
          stroke={EMERALD_DEEP}
          strokeWidth="2.6"
          fill="none"
        />
        {/* tassels hanging from leech */}
        {[
          { x: 220, y: 244 },
          { x: 280, y: 250 },
          { x: 340, y: 252 },
          { x: 400, y: 250 },
          { x: 450, y: 244 },
        ].map((t, i) => (
          <g key={`tas-${i}`} transform={`translate(${t.x} ${t.y})`}>
            <line x1="0" y1="0" x2="0" y2="10" stroke={EMERALD_DEEP} strokeWidth="1" />
            <circle cx="0" cy="11" r="2.4" fill={`url(#${brassGrad})`} />
          </g>
        ))}

        {/* ===== Geometric medallion at sail center (Islamic-art inspired star) ===== */}
        <g transform="translate(300 158)">
          {/* outer ring */}
          <circle r="34" fill="none" stroke={EMERALD} strokeWidth="1.4" opacity="0.85" />
          <circle r="28" fill="none" stroke={EMERALD} strokeWidth="0.6" opacity="0.55" />
          {/* eight-point star — two overlapped squares */}
          <g opacity="0.85">
            <rect
              x="-18"
              y="-18"
              width="36"
              height="36"
              fill="none"
              stroke={EMERALD}
              strokeWidth="1.2"
              transform="rotate(0)"
            />
            <rect
              x="-18"
              y="-18"
              width="36"
              height="36"
              fill="none"
              stroke={EMERALD}
              strokeWidth="1.2"
              transform="rotate(45)"
            />
          </g>
          {/* inner disk */}
          <circle r="9" fill={EMERALD} opacity="0.9" />
          <circle r="9" fill="none" stroke={BRASS_BRIGHT} strokeWidth="0.8" />
          {/* central star/sparkle */}
          <path
            d="M 0 -5 L 1.4 -1.4 L 5 0 L 1.4 1.4 L 0 5 L -1.4 1.4 L -5 0 L -1.4 -1.4 Z"
            fill={BRASS_HIGHLIGHT}
          />
        </g>
      </motion.g>

      {/* ===== PENNANTS at masthead — celebratory ===== */}
      <motion.g
        style={{ transformOrigin: "156px 18px" }}
        animate={reduced ? undefined : { rotate: [-3, 3, -3] }}
        transition={reduced ? undefined : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* flagpole */}
        <line x1="156" y1="44" x2="156" y2="6" stroke={MAST_DARK} strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="156" cy="5" r="3.4" fill={`url(#${brassGrad})`} stroke={MAST_DARK} strokeWidth="0.6" />
        {/* top pennant — emerald with brass medallion */}
        <motion.path
          d="M 156 10 L 218 12 Q 204 22 218 36 L 156 36 Z"
          fill={EMERALD}
          stroke={EMERALD_DEEP}
          strokeWidth="0.8"
          animate={reduced ? undefined : {
            d: [
              "M 156 10 L 218 12 Q 204 22 218 36 L 156 36 Z",
              "M 156 10 L 214 14 Q 208 22 214 36 L 156 36 Z",
              "M 156 10 L 218 12 Q 204 22 218 36 L 156 36 Z",
            ],
          }}
          transition={reduced ? undefined : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <circle cx="194" cy="23" r="3" fill={BRASS_BRIGHT} stroke={EMERALD_DEEP} strokeWidth="0.5" />
        {/* small secondary pennant — gold triangle */}
        <motion.path
          d="M 156 38 L 196 42 L 156 48 Z"
          fill={BRASS_BRIGHT}
          stroke={BRASS_DARK}
          strokeWidth="0.5"
          animate={reduced ? undefined : {
            d: [
              "M 156 38 L 196 42 L 156 48 Z",
              "M 156 38 L 192 44 L 156 48 Z",
              "M 156 38 L 196 42 L 156 48 Z",
            ],
          }}
          transition={reduced ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        />
      </motion.g>

      {/* ===== HANGING BRASS LANTERN (from spar) — glowing celebration ===== */}
      <motion.g
        style={{ transformOrigin: "230px 100px" }}
        animate={reduced ? undefined : { rotate: [-4, 4, -4] }}
        transition={reduced ? undefined : { duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <line x1="230" y1="100" x2="230" y2="138" stroke={MAST_DARK} strokeWidth="0.8" />
        <g transform="translate(230 152)">
          {/* outer glow */}
          <circle r="22" fill={LANTERN_GLOW} opacity="0.28" />
          <circle r="14" fill={LANTERN_GLOW} opacity="0.55" />
          {/* lantern body */}
          <path
            d="M -7 -10 L 7 -10 L 9 0 L 7 8 L -7 8 L -9 0 Z"
            fill={LANTERN_BODY}
            stroke={`url(#${brassGrad})`}
            strokeWidth="1.4"
          />
          {/* glowing window */}
          <ellipse cx="0" cy="-1" rx="4" ry="6" fill={LANTERN_GLOW} />
          {/* top cap */}
          <path d="M -6 -10 L 6 -10 L 7 -13 L -7 -13 Z" fill={`url(#${brassGrad})`} />
          <line x1="0" y1="-13" x2="0" y2="-16" stroke={`url(#${brassGrad})`} strokeWidth="1" />
          {/* bottom finial */}
          <path d="M 0 8 L 0 14 M -2 14 L 2 14" stroke={`url(#${brassGrad})`} strokeWidth="0.8" />
        </g>
      </motion.g>

      {/* RIGGING ROPES */}
      <line x1="156" y1="44" x2="106" y2="298" stroke={ROPE} strokeWidth="1" opacity="0.65" />
      <line x1="156" y1="44" x2="276" y2="296" stroke={ROPE} strokeWidth="0.8" opacity="0.5" />
      <line x1="488" y1="232" x2="420" y2="298" stroke={ROPE} strokeWidth="0.9" opacity="0.55" />
      <line x1="380" y1="180" x2="362" y2="296" stroke={ROPE} strokeWidth="0.6" opacity="0.4" />

      {/* ===== HULL ===== */}
      {/* deck planks */}
      <path d="M 80 296 Q 110 280 168 278 L 348 278 Q 408 280 440 296 Z" fill={HULL_BLACK} />
      {/* plank seams */}
      {[130, 180, 230, 280, 330, 380].map((x, i) => (
        <line key={`seam-${i}`} x1={x} y1="280" x2={x} y2="296" stroke={HULL_DEEP} strokeWidth="0.6" opacity="0.6" />
      ))}

      {/* main curved hull — longer, more elegant Sambuk shape */}
      <path
        d="
          M 30 296
          Q 18 268 60 240
          L 70 264
          Q 70 282 80 296
          Q 130 346 260 350
          Q 392 350 440 322
          Q 458 308 460 296
          Q 468 280 466 262
          L 478 240
          Q 510 248 498 280
          Q 484 336 260 358
          Q 80 350 30 296
          Z
        "
        fill={`url(#${hullGrad})`}
      />
      {/* shine highlight along upper hull */}
      <path
        d="M 60 296 Q 200 320 460 296"
        stroke={`url(#${hullShine})`}
        strokeWidth="4"
        fill="none"
        opacity="0.6"
      />
      {/* plank lines */}
      <path d="M 60 308 Q 260 332 470 304" stroke={HULL_BLACK} strokeWidth="1.2" fill="none" opacity="0.55" />
      <path d="M 70 322 Q 260 346 460 318" stroke={HULL_BLACK} strokeWidth="1.0" fill="none" opacity="0.45" />

      {/* gold brass rim along upper edges */}
      <path
        d="M 30 296 Q 18 268 60 240 L 70 264 Q 70 282 80 296"
        stroke={`url(#${brassGrad})`}
        strokeWidth="2.6"
        fill="none"
      />
      <path
        d="M 440 296 Q 458 308 460 296 Q 468 280 466 262 L 478 240 Q 510 248 498 280"
        stroke={`url(#${brassGrad})`}
        strokeWidth="2.6"
        fill="none"
      />

      {/* ===== ORNATE STERN (back of boat) — carved post with brass finial ===== */}
      <g>
        <path
          d="M 472 220 Q 488 200 500 220 Q 512 244 502 270 Q 498 280 488 282 L 472 278 Z"
          fill={HULL_TEAK}
          stroke={HULL_DEEP}
          strokeWidth="0.8"
        />
        {/* carved geometric pattern on stern */}
        <g stroke={BRASS_BRIGHT} strokeWidth="0.6" fill="none" opacity="0.85">
          <path d="M 482 226 L 492 234 L 482 242 L 472 234 Z" />
          <path d="M 484 246 L 494 254 L 484 262 L 474 254 Z" />
        </g>
        <circle cx="494" cy="218" r="3" fill={`url(#${brassGrad})`} stroke={HULL_DEEP} strokeWidth="0.4" />
      </g>

      {/* ===== CARVED PROW (front of boat) — upward-curving with brass medallion ===== */}
      <g>
        <path
          d="M 22 250 Q 12 232 28 218 Q 42 226 38 246 Z"
          fill={HULL_TEAK}
          stroke={HULL_DEEP}
          strokeWidth="0.8"
        />
        {/* prow eye/medallion — traditional protective motif */}
        <circle cx="30" cy="236" r="4" fill={`url(#${brassGrad})`} stroke={HULL_DEEP} strokeWidth="0.6" />
        <circle cx="30" cy="236" r="1.6" fill={EMERALD_DEEP} />
      </g>

      {/* Side porthole-like decorations */}
      <g opacity="0.9">
        <circle cx="140" cy="316" r="3" fill={BRASS_DARK} stroke={BRASS_BRIGHT} strokeWidth="0.6" />
        <circle cx="200" cy="324" r="3" fill={BRASS_DARK} stroke={BRASS_BRIGHT} strokeWidth="0.6" />
        <circle cx="260" cy="328" r="3" fill={BRASS_DARK} stroke={BRASS_BRIGHT} strokeWidth="0.6" />
        <circle cx="320" cy="324" r="3" fill={BRASS_DARK} stroke={BRASS_BRIGHT} strokeWidth="0.6" />
        <circle cx="380" cy="316" r="3" fill={BRASS_DARK} stroke={BRASS_BRIGHT} strokeWidth="0.6" />
      </g>
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

  // Boat travels left → right (RTL: right → left), looping.
  const travelFrom = isRtl ? "110%" : "-20%";
  const travelTo = isRtl ? "-20%" : "110%";

  return (
    <div className="avt-boat-scene" aria-hidden={!active}>
      <WaterScene reduced={reduced} uid={uid} />

      {/* Foreground reeds at the riverbank corners */}
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
            {/* reed tip */}
            <ellipse
              cx={i % 2 === 0 ? -1 : 1}
              cy={-76}
              rx="1"
              ry="3"
              fill="#1a2a16"
            />
          </g>
        ))}
      </svg>

      <motion.div
        className="avt-boat-traveler"
        initial={{ left: travelFrom }}
        animate={active ? { left: travelTo } : { left: travelFrom }}
        transition={{
          duration: reduced ? 0.5 : 34,
          ease: "linear",
          repeat: active && !reduced ? Infinity : 0,
        }}
      >
        <motion.div
          className="avt-boat-bob"
          animate={
            reduced
              ? { y: 0, rotate: 0 }
              : { y: [0, -5, 0, -3, 0], rotate: [0, -1.1, 0, 1.1, 0] }
          }
          transition={
            reduced
              ? undefined
              : { duration: 4.6, repeat: Infinity, ease: "easeInOut" }
          }
        >
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
          {/* ornate corner glints */}
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

      {/* Bow wake — foam + sparkles */}
      <motion.div
        className="avt-boat-bowwave"
        initial={{ left: travelFrom }}
        animate={active ? { left: travelTo } : { left: travelFrom }}
        transition={{
          duration: reduced ? 0.5 : 34,
          ease: "linear",
          repeat: active && !reduced ? Infinity : 0,
        }}
      >
        <svg width="280" height="64" viewBox="-140 -32 280 64" aria-hidden="true">
          <motion.path
            d="M -110 14 Q -60 6 0 14 Q 60 6 110 14"
            stroke={WATER_FOAM}
            strokeWidth="2.6"
            fill="none"
            opacity="0.8"
            animate={
              reduced
                ? undefined
                : {
                    d: [
                      "M -110 14 Q -60 6 0 14 Q 60 6 110 14",
                      "M -110 16 Q -60 8 0 16 Q 60 8 110 16",
                      "M -110 14 Q -60 6 0 14 Q 60 6 110 14",
                    ],
                  }
            }
            transition={reduced ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M -86 22 Q -40 16 0 22 Q 40 16 86 22"
            stroke={WATER_FOAM}
            strokeWidth="1.6"
            fill="none"
            opacity="0.55"
            animate={
              reduced
                ? undefined
                : {
                    d: [
                      "M -86 22 Q -40 16 0 22 Q 40 16 86 22",
                      "M -86 24 Q -40 18 0 24 Q 40 18 86 24",
                      "M -86 22 Q -40 16 0 22 Q 40 16 86 22",
                    ],
                  }
            }
            transition={reduced ? undefined : { duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />
          {/* foam droplet sparkles */}
          {[
            { x: -70, y: 2, r: 1.2 },
            { x: -34, y: -4, r: 0.8 },
            { x: 8, y: -2, r: 1.0 },
            { x: 44, y: -6, r: 0.9 },
            { x: 78, y: 0, r: 1.1 },
          ].map((d, i) => (
            <motion.circle
              key={`drop-${i}`}
              cx={d.x}
              cy={d.y}
              r={d.r}
              fill={WATER_FOAM}
              animate={reduced ? undefined : { opacity: [0.2, 0.95, 0.2], cy: [d.y, d.y - 4, d.y] }}
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
