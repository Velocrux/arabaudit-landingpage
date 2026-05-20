"use client";

import { useId, useMemo } from "react";

interface Geometry {
  cardY: number;
  sheikhY: number;
}

interface Props {
  geometries: Geometry[];
  totalHeight: number;
}

type Side = "left" | "right";

interface PalmSpec {
  kind: "palm";
  side: Side;
  edgeOffset: number;
  top: number;
  scale: number;
  flip: boolean;
  phase: number;
}

interface CactusSpec {
  kind: "cactus";
  side: Side;
  edgeOffset: number;
  top: number;
  scale: number;
  phase: number;
}

interface DuneSpec {
  kind: "dune";
  side: Side;
  edgeOffset: number;
  top: number;
  width: number;
  height: number;
  layer: 0 | 1 | 2;
}

type Spec = PalmSpec | CactusSpec | DuneSpec;

// --- Palette ---
const PALM_TRUNK_HIGHLIGHT = "#a06a32";
const PALM_TRUNK_MID = "#6e451f";
const PALM_TRUNK_SHADE = "#3a2310";
const PALM_FROND_DARK = "#3a6224";
const PALM_FROND_MID = "#5a8a3a";
const PALM_FROND_LIGHT = "#86b056";
const PALM_FROND_TIP = "#a8c97a";
const COCONUT_DARK = "#2c1c0c";
const COCONUT_HIGHLIGHT = "#5a3a20";

const CACTUS_DARK = "#2f5a32";
const CACTUS_MID = "#4a7c4a";
const CACTUS_LIGHT = "#6da06d";
const CACTUS_GLOW = "#a8c878";
const SPINE = "#f3e9c5";

const SAND_DEEP = "#a87648";
const SAND_MID = "#c4905a";
const SAND_LIGHT = "#dcb074";
const SAND_HIGHLIGHT = "#ead098";

// ============================================================
// PALM
// ============================================================
function PalmSvg({ flip, phase, uid }: { flip: boolean; phase: number; uid: string }) {
  const trunkGrad = `palm-trunk-${uid}`;
  const frondGrad = `palm-frond-${uid}`;
  const coconutGrad = `palm-coconut-${uid}`;
  const shadowFilter = `palm-shadow-${uid}`;

  const fronds = [
    { angle: 200, len: 56, width: 8, color: PALM_FROND_DARK, depth: 0 },
    { angle: -20, len: 58, width: 8, color: PALM_FROND_DARK, depth: 0 },
    { angle: 220, len: 60, width: 9, color: PALM_FROND_MID, depth: 0 },
    { angle: -40, len: 60, width: 9, color: PALM_FROND_MID, depth: 0 },
    { angle: 240, len: 58, width: 8, color: PALM_FROND_MID, depth: 0 },
    { angle: -60, len: 56, width: 8, color: PALM_FROND_MID, depth: 0 },
    // mid layer
    { angle: 195, len: 52, width: 7, color: PALM_FROND_LIGHT, depth: 1 },
    { angle: 250, len: 50, width: 7, color: PALM_FROND_LIGHT, depth: 1 },
    { angle: -10, len: 52, width: 7, color: PALM_FROND_LIGHT, depth: 1 },
    { angle: -70, len: 50, width: 7, color: PALM_FROND_LIGHT, depth: 1 },
    { angle: 270, len: 46, width: 6, color: PALM_FROND_LIGHT, depth: 1 },
    // top/front layer
    { angle: 175, len: 40, width: 5, color: PALM_FROND_TIP, depth: 2 },
    { angle: 215, len: 42, width: 5, color: PALM_FROND_TIP, depth: 2 },
    { angle: 5, len: 40, width: 5, color: PALM_FROND_TIP, depth: 2 },
    { angle: -45, len: 42, width: 5, color: PALM_FROND_TIP, depth: 2 },
  ];

  const renderFronds = (depth: 0 | 1 | 2) =>
    fronds
      .filter((f) => f.depth === depth)
      .map((f, i) => {
        const rad = (f.angle * Math.PI) / 180;
        const x2 = Math.cos(rad) * f.len;
        const y2 = Math.sin(rad) * f.len;
        // arc the frond — bulge perpendicular to its direction
        const px = -Math.sin(rad) * 8;
        const py = Math.cos(rad) * 8;
        const arcCx = x2 * 0.55 + px;
        const arcCy = y2 * 0.55 + py;
        return (
          <g key={`${depth}-${i}`}>
            <path
              d={`M 0 0 Q ${arcCx} ${arcCy} ${x2} ${y2}`}
              stroke={f.color}
              strokeWidth={f.width}
              strokeLinecap="round"
              fill="none"
            />
            {/* leaflet details */}
            <path
              d={`M ${arcCx * 0.4} ${arcCy * 0.4} L ${arcCx * 0.4 - Math.sin(rad) * 6} ${arcCy * 0.4 + Math.cos(rad) * 6}`}
              stroke={f.color}
              strokeWidth={1.4}
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d={`M ${arcCx * 0.65} ${arcCy * 0.65} L ${arcCx * 0.65 - Math.sin(rad) * 5} ${arcCy * 0.65 + Math.cos(rad) * 5}`}
              stroke={f.color}
              strokeWidth={1.2}
              strokeLinecap="round"
              opacity="0.6"
            />
          </g>
        );
      });

  return (
    <svg
      width="180"
      height="260"
      viewBox="-90 -240 180 260"
      style={{
        display: "block",
        animation: `avt-palmSway 6s ease-in-out infinite`,
        animationDelay: `${phase}s`,
        transformOrigin: "50% 100%",
        transform: flip ? "scaleX(-1)" : undefined,
      }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={trunkGrad} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={PALM_TRUNK_SHADE} />
          <stop offset="38%" stopColor={PALM_TRUNK_MID} />
          <stop offset="68%" stopColor={PALM_TRUNK_HIGHLIGHT} />
          <stop offset="100%" stopColor={PALM_TRUNK_MID} />
        </linearGradient>
        <linearGradient id={frondGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={PALM_FROND_LIGHT} />
          <stop offset="100%" stopColor={PALM_FROND_DARK} />
        </linearGradient>
        <radialGradient id={coconutGrad} cx="0.3" cy="0.3" r="0.8">
          <stop offset="0%" stopColor={COCONUT_HIGHLIGHT} />
          <stop offset="100%" stopColor={COCONUT_DARK} />
        </radialGradient>
        <filter id={shadowFilter} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="2" dy="6" stdDeviation="3" floodColor="#2c1607" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* ground shadow */}
      <ellipse cx="0" cy="2" rx="36" ry="6" fill="rgba(40,20,8,0.32)" />

      {/* trunk — slight curve with rings */}
      <g filter={`url(#${shadowFilter})`}>
        <path
          d="M -7 0 Q -3 -60 -5 -110 Q -2 -150 -3 -190 Q -2 -200 0 -210
             Q 4 -200 5 -190 Q 3 -150 5 -110 Q 7 -60 7 0 Z"
          fill={`url(#${trunkGrad})`}
        />
        {/* rings */}
        {[-180, -160, -140, -120, -100, -80, -60, -40, -20].map((y, i) => (
          <path
            key={`ring-${i}`}
            d={`M -6 ${y} Q 0 ${y - 2} 6 ${y} Q 0 ${y + 1} -6 ${y} Z`}
            fill={PALM_TRUNK_SHADE}
            opacity="0.55"
          />
        ))}
        {/* trunk highlight stripe */}
        <path
          d="M 1 -200 Q 2 -120 0 -10"
          stroke={PALM_TRUNK_HIGHLIGHT}
          strokeWidth="1.2"
          fill="none"
          opacity="0.6"
        />
      </g>

      {/* fronds — render back→front for depth */}
      <g transform="translate(0 -208)">
        {renderFronds(0)}
        {renderFronds(1)}

        {/* coconuts cluster — beneath top fronds */}
        <g>
          <circle cx="-7" cy="2" r="5" fill={`url(#${coconutGrad})`} />
          <circle cx="0" cy="4" r="5.5" fill={`url(#${coconutGrad})`} />
          <circle cx="7" cy="2" r="5" fill={`url(#${coconutGrad})`} />
          <circle cx="-3" cy="-2" r="4.5" fill={`url(#${coconutGrad})`} />
          <circle cx="4" cy="-1" r="4.5" fill={`url(#${coconutGrad})`} />
          {/* highlights */}
          <circle cx="-8" cy="0" r="1.2" fill={COCONUT_HIGHLIGHT} opacity="0.7" />
          <circle cx="-1" cy="2" r="1.4" fill={COCONUT_HIGHLIGHT} opacity="0.7" />
          <circle cx="6" cy="0" r="1.2" fill={COCONUT_HIGHLIGHT} opacity="0.7" />
        </g>

        {renderFronds(2)}

        {/* center boss */}
        <circle cx="0" cy="0" r="4" fill={PALM_TRUNK_SHADE} opacity="0.7" />
      </g>
    </svg>
  );
}

// ============================================================
// CACTUS
// ============================================================
function CactusSvg({ phase, uid }: { phase: number; uid: string }) {
  const bodyGrad = `cactus-body-${uid}`;
  const shadowFilter = `cactus-shadow-${uid}`;
  return (
    <svg
      width="90"
      height="130"
      viewBox="-45 -110 90 130"
      style={{
        display: "block",
        animation: `avt-cactusBob 7s ease-in-out infinite`,
        animationDelay: `${phase}s`,
        transformOrigin: "50% 100%",
      }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={bodyGrad} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={CACTUS_DARK} />
          <stop offset="50%" stopColor={CACTUS_MID} />
          <stop offset="80%" stopColor={CACTUS_LIGHT} />
          <stop offset="100%" stopColor={CACTUS_MID} />
        </linearGradient>
        <filter id={shadowFilter} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="2" dy="4" stdDeviation="2" floodColor="#1a2c1a" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* ground shadow */}
      <ellipse cx="0" cy="2" rx="20" ry="4" fill="rgba(10,20,8,0.32)" />

      <g filter={`url(#${shadowFilter})`}>
        {/* right arm */}
        <path
          d="M 10 -56 Q 22 -56 24 -64 L 24 -80 Q 24 -88 18 -88 Q 16 -86 16 -82 L 16 -74 Q 16 -66 12 -64"
          stroke={CACTUS_MID}
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* left arm */}
        <path
          d="M -10 -46 Q -22 -46 -24 -54 L -24 -68 Q -24 -76 -18 -76 Q -16 -74 -16 -70 L -16 -62"
          stroke={CACTUS_MID}
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* main body */}
        <rect x="-12" y="-90" width="24" height="92" rx="11" fill={`url(#${bodyGrad})`} />
        <ellipse cx="0" cy="-90" rx="12" ry="8" fill={`url(#${bodyGrad})`} />

        {/* shading ribs */}
        <path d="M -6 -86 L -6 -2" stroke={CACTUS_DARK} strokeWidth="1.6" opacity="0.55" />
        <path d="M 0 -86 L 0 -2" stroke={CACTUS_DARK} strokeWidth="1.4" opacity="0.45" />
        <path d="M 6 -86 L 6 -2" stroke={CACTUS_DARK} strokeWidth="1.6" opacity="0.55" />
        {/* highlights */}
        <path d="M -3.5 -84 L -3.5 -4" stroke={CACTUS_GLOW} strokeWidth="1" opacity="0.5" />
        <path d="M 3.5 -84 L 3.5 -4" stroke={CACTUS_GLOW} strokeWidth="1" opacity="0.5" />

        {/* arm highlights */}
        <path d="M 18 -82 L 18 -66" stroke={CACTUS_GLOW} strokeWidth="0.8" opacity="0.5" />
        <path d="M -18 -70 L -18 -56" stroke={CACTUS_GLOW} strokeWidth="0.8" opacity="0.5" />
      </g>

      {/* spines */}
      {[-78, -68, -58, -48, -38, -28, -18, -8].map((y, i) => (
        <g key={`spine-${i}`}>
          <line x1="-11" y1={y} x2="-15" y2={y + 1} stroke={SPINE} strokeWidth="0.8" />
          <line x1="11" y1={y} x2="15" y2={y + 1} stroke={SPINE} strokeWidth="0.8" />
        </g>
      ))}
      {/* arm spines */}
      <line x1="18" y1="-80" x2="22" y2="-78" stroke={SPINE} strokeWidth="0.7" />
      <line x1="18" y1="-72" x2="22" y2="-70" stroke={SPINE} strokeWidth="0.7" />
      <line x1="-18" y1="-68" x2="-22" y2="-66" stroke={SPINE} strokeWidth="0.7" />
      <line x1="-18" y1="-60" x2="-22" y2="-58" stroke={SPINE} strokeWidth="0.7" />

      {/* tiny flower at top */}
      <g transform="translate(0 -98)">
        <circle cx="0" cy="0" r="3" fill="#e85a4a" />
        <circle cx="0" cy="0" r="1.2" fill="#ffd24a" />
      </g>
    </svg>
  );
}

// ============================================================
// DUNE
// ============================================================
function DuneSvg({
  width,
  height,
  layer,
  uid,
}: {
  width: number;
  height: number;
  layer: 0 | 1 | 2;
  uid: string;
}) {
  const grad = `dune-${layer}-${uid}`;
  // colors per layer (back→front: deep→light)
  const top = layer === 0 ? SAND_DEEP : layer === 1 ? SAND_MID : SAND_LIGHT;
  const bot = layer === 0 ? SAND_MID : layer === 1 ? SAND_LIGHT : SAND_HIGHLIGHT;
  const opacity = layer === 0 ? 0.55 : layer === 1 ? 0.72 : 0.86;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ display: "block", opacity }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={grad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={top} />
          <stop offset="100%" stopColor={bot} />
        </linearGradient>
      </defs>
      <path
        d={`M 0 ${height}
            Q ${width * 0.18} ${height * 0.55} ${width * 0.32} ${height * 0.4}
            Q ${width * 0.5} ${height * 0.22} ${width * 0.66} ${height * 0.42}
            Q ${width * 0.82} ${height * 0.62} ${width} ${height}
            Z`}
        fill={`url(#${grad})`}
      />
      {/* ridge highlight */}
      <path
        d={`M ${width * 0.18} ${height * 0.55}
            Q ${width * 0.34} ${height * 0.38} ${width * 0.5} ${height * 0.24}`}
        stroke={layer === 2 ? "#fbeac8" : "#f5d6a0"}
        strokeWidth="1.2"
        fill="none"
        opacity="0.45"
      />
    </svg>
  );
}

// ============================================================
// MAIN
// ============================================================
export default function DesertDecor({ geometries, totalHeight }: Props) {
  const uid = useId().replace(/[:]/g, "");

  const items = useMemo<Spec[]>(() => {
    if (!totalHeight || geometries.length === 0) return [];
    let seed = 421;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    const arr: Spec[] = [];

    // ---- DUNES — 3 layers (back to front) along both sides ----
    const duneRows = 6;
    for (let i = 0; i < duneRows; i += 1) {
      const top = (i / duneRows) * totalHeight + rand() * 80 + 40;
      // back layer
      arr.push({
        kind: "dune",
        side: i % 2 === 0 ? "left" : "right",
        edgeOffset: -60 - rand() * 40,
        top,
        width: 460 + rand() * 240,
        height: 140 + rand() * 70,
        layer: 0,
      });
      // mid layer
      arr.push({
        kind: "dune",
        side: i % 2 === 0 ? "right" : "left",
        edgeOffset: -50 - rand() * 30,
        top: top + 20,
        width: 360 + rand() * 200,
        height: 100 + rand() * 50,
        layer: 1,
      });
      // front layer
      arr.push({
        kind: "dune",
        side: i % 2 === 0 ? "left" : "right",
        edgeOffset: -30 - rand() * 20,
        top: top + 50 + rand() * 20,
        width: 280 + rand() * 160,
        height: 70 + rand() * 30,
        layer: 2,
      });
    }

    // ---- PALMS in the gaps between stations ----
    for (let i = 0; i < geometries.length; i += 1) {
      const cur = geometries[i];
      const next = geometries[i + 1];
      if (!cur) continue;
      const midY = next ? (cur.sheikhY + next.sheikhY) / 2 : cur.sheikhY + 180;
      arr.push({
        kind: "palm",
        side: "left",
        edgeOffset: 14 + rand() * 26,
        top: midY + (rand() - 0.5) * 60,
        scale: 0.62 + rand() * 0.32,
        flip: false,
        phase: rand() * 6,
      });
      if (rand() > 0.25) {
        arr.push({
          kind: "palm",
          side: "right",
          edgeOffset: 14 + rand() * 26,
          top: midY + (rand() - 0.5) * 50,
          scale: 0.6 + rand() * 0.35,
          flip: true,
          phase: rand() * 6,
        });
      }
    }

    // ---- CACTI sparsely along ----
    for (let i = 0; i < geometries.length; i += 2) {
      const cur = geometries[i];
      const next = geometries[i + 1];
      if (!cur) continue;
      const midY = next ? (cur.sheikhY + next.sheikhY) / 2 : cur.sheikhY + 120;
      const side: Side = rand() > 0.5 ? "left" : "right";
      arr.push({
        kind: "cactus",
        side,
        edgeOffset: 100 + rand() * 50,
        top: midY + 50 + rand() * 30,
        scale: 0.7 + rand() * 0.35,
        phase: rand() * 7,
      });
    }

    return arr;
  }, [geometries, totalHeight]);

  if (items.length === 0) return null;

  return (
    <div
      className="avt-desert-decor"
      style={{ height: totalHeight }}
      aria-hidden="true"
    >
      {items.map((it, i) => {
        const positionStyle =
          it.side === "left"
            ? { left: it.edgeOffset }
            : { right: it.edgeOffset };
        return (
          <div
            key={i}
            className={`avt-decor-item avt-decor-${it.kind} avt-decor-${it.kind}-${
              it.kind === "dune" ? it.layer : "x"
            }`}
            style={{ top: it.top, ...positionStyle }}
          >
            {it.kind === "palm" && <PalmSvg flip={it.flip} phase={it.phase} uid={`${uid}-${i}`} />}
            {it.kind === "cactus" && <CactusSvg phase={it.phase} uid={`${uid}-${i}`} />}
            {it.kind === "dune" && (
              <DuneSvg width={it.width} height={it.height} layer={it.layer} uid={`${uid}-${i}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
