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

const SKY_TOP = "#fce5b3";
const SKY_MID = "#f7c98a";
const SKY_HORIZON = "#e29a55";

const SUN_CORE = "#fff4cf";
const SUN_RIM = "#f9c065";
const SUN_HALO = "rgba(255, 220, 140, 0.55)";

const MOUNTAIN_FAR = "#7a4a3a";
const MOUNTAIN_FAR_LIGHT = "#a26a52";
const MOUNTAIN_MID = "#a4684a";
const MOUNTAIN_MID_LIGHT = "#c98a64";
const MOUNTAIN_NEAR = "#c47a52";
const MOUNTAIN_NEAR_LIGHT = "#e09a6c";

const OASIS_DEEP = "#1f5a78";
const OASIS_MID = "#2f87a8";
const OASIS_LIGHT = "#73c4dc";
const OASIS_FOAM = "#e8f6fb";
const OASIS_BANK_DARK = "#a8753c";
const OASIS_BANK_LIGHT = "#d9a866";

const BIRD = "rgba(40, 22, 10, 0.78)";

function SunRays({ uid }: { uid: string }) {
  const rayCount = 18;
  return (
    <g aria-hidden="true">
      {Array.from({ length: rayCount }).map((_, i) => {
        const angle = (i / rayCount) * 360;
        const long = i % 2 === 0;
        const len = long ? 78 : 56;
        return (
          <line
            key={`ray-${i}`}
            x1={0}
            y1={0}
            x2={Math.cos((angle * Math.PI) / 180) * len}
            y2={Math.sin((angle * Math.PI) / 180) * len}
            stroke={`url(#sun-ray-${uid})`}
            strokeWidth={long ? 2 : 1.2}
            strokeLinecap="round"
            opacity={long ? 0.55 : 0.35}
          />
        );
      })}
    </g>
  );
}

function Mountains({ uid, width }: { uid: string; width: number }) {
  const w = width;
  // Three ridge layers, back→front
  const far = `M 0 120 L 0 86 Q 60 30 120 56 Q 180 78 240 42 Q 300 12 360 38 Q 420 64 480 24 Q 540 -4 600 28 Q 660 56 720 30 Q 780 6 840 38 Q 900 64 960 32 Q 1020 6 1080 36 Q 1140 60 1200 30 Q 1260 8 1320 36 L 1440 60 L 1440 120 Z`;
  const mid = `M 0 120 L 0 102 Q 80 70 140 86 Q 200 100 270 70 Q 340 42 400 76 Q 460 106 520 78 Q 580 54 640 82 Q 700 108 760 78 Q 820 52 880 82 Q 940 110 1000 82 Q 1060 56 1120 84 Q 1180 110 1240 80 Q 1300 54 1360 82 Q 1410 100 1440 96 L 1440 120 Z`;
  const near = `M 0 120 L 0 114 Q 100 96 180 108 Q 260 116 340 100 Q 420 86 500 104 Q 580 116 660 104 Q 740 92 820 108 Q 900 118 980 106 Q 1060 92 1140 108 Q 1220 118 1300 104 Q 1380 92 1440 102 L 1440 120 Z`;

  return (
    <g aria-hidden="true" transform={`translate(0 0) scale(${w / 1440} 1)`} style={{ transformBox: "fill-box" }}>
      <defs>
        <linearGradient id={`mtn-far-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={MOUNTAIN_FAR_LIGHT} />
          <stop offset="100%" stopColor={MOUNTAIN_FAR} />
        </linearGradient>
        <linearGradient id={`mtn-mid-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={MOUNTAIN_MID_LIGHT} />
          <stop offset="100%" stopColor={MOUNTAIN_MID} />
        </linearGradient>
        <linearGradient id={`mtn-near-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={MOUNTAIN_NEAR_LIGHT} />
          <stop offset="100%" stopColor={MOUNTAIN_NEAR} />
        </linearGradient>
      </defs>
      <path d={far} fill={`url(#mtn-far-${uid})`} opacity="0.7" />
      <path d={mid} fill={`url(#mtn-mid-${uid})`} opacity="0.78" />
      <path d={near} fill={`url(#mtn-near-${uid})`} opacity="0.85" />
      {/* tiny snow caps on a couple of back peaks */}
      <path d="M 232 44 Q 240 36 248 44 Z" fill="#f3e6c5" opacity="0.85" />
      <path d="M 472 28 Q 480 18 488 28 Z" fill="#f3e6c5" opacity="0.85" />
      <path d="M 1072 38 Q 1080 30 1088 38 Z" fill="#f3e6c5" opacity="0.85" />
    </g>
  );
}

interface Bird {
  x: number;
  y: number;
  scale: number;
  delay: number;
  duration: number;
}

function Birds({ birds }: { birds: Bird[] }) {
  return (
    <>
      {birds.map((b, i) => (
        <div
          key={`bird-${i}`}
          className="avt-bird"
          style={{
            top: b.y,
            left: 0,
            transform: `translateX(${b.x}px) scale(${b.scale})`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
          aria-hidden="true"
        >
          <svg width="38" height="14" viewBox="0 0 38 14" fill="none">
            <path
              d="M 1 9 Q 8 1 14 8 Q 19 4 24 8 Q 30 1 37 9"
              stroke={BIRD}
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
      ))}
    </>
  );
}

function Oasis({ top, uid }: { top: number; uid: string }) {
  const wGrad = `oasis-water-${uid}`;
  const bGrad = `oasis-bank-${uid}`;
  return (
    <div
      className="avt-oasis"
      style={{ top }}
      aria-hidden="true"
    >
      <svg width="520" height="240" viewBox="0 0 520 240" style={{ display: "block", overflow: "visible" }}>
        <defs>
          <radialGradient id={wGrad} cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor={OASIS_LIGHT} />
            <stop offset="55%" stopColor={OASIS_MID} />
            <stop offset="100%" stopColor={OASIS_DEEP} />
          </radialGradient>
          <radialGradient id={bGrad} cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={OASIS_BANK_LIGHT} />
            <stop offset="100%" stopColor={OASIS_BANK_DARK} />
          </radialGradient>
          <filter id={`oasis-blur-${uid}`} x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="1.4" />
          </filter>
        </defs>

        {/* outer sand bank */}
        <ellipse cx="260" cy="140" rx="240" ry="76" fill={`url(#${bGrad})`} opacity="0.85" />
        {/* darker rim */}
        <ellipse cx="260" cy="142" rx="218" ry="62" fill="#7a4f24" opacity="0.4" />
        {/* water body */}
        <ellipse cx="260" cy="138" rx="200" ry="52" fill={`url(#${wGrad})`} />
        {/* foam edge */}
        <ellipse cx="260" cy="120" rx="180" ry="32" fill={OASIS_FOAM} opacity="0.18" filter={`url(#oasis-blur-${uid})`} />
        {/* ripples */}
        <ellipse cx="220" cy="138" rx="60" ry="6" fill="none" stroke={OASIS_FOAM} strokeWidth="0.8" opacity="0.5">
          <animate attributeName="rx" values="40;80;40" dur="6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.05;0.5" dur="6s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="310" cy="142" rx="44" ry="4" fill="none" stroke={OASIS_FOAM} strokeWidth="0.7" opacity="0.55">
          <animate attributeName="rx" values="24;64;24" dur="7s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.55;0.05;0.55" dur="7s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="270" cy="148" rx="80" ry="6" fill="none" stroke={OASIS_FOAM} strokeWidth="0.6" opacity="0.4">
          <animate attributeName="rx" values="60;100;60" dur="8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0.04;0.4" dur="8s" repeatCount="indefinite" />
        </ellipse>

        {/* highlight crescent */}
        <path
          d="M 110 124 Q 200 102 320 110"
          stroke={OASIS_FOAM}
          strokeWidth="1.2"
          fill="none"
          opacity="0.5"
        />

        {/* reeds clusters */}
        <g opacity="0.85">
          <line x1="78" y1="148" x2="76" y2="116" stroke="#3a6224" strokeWidth="2" strokeLinecap="round" />
          <line x1="84" y1="148" x2="86" y2="120" stroke="#3a6224" strokeWidth="2" strokeLinecap="round" />
          <line x1="90" y1="148" x2="88" y2="122" stroke="#3a6224" strokeWidth="2" strokeLinecap="round" />
          <line x1="74" y1="120" x2="78" y2="108" stroke="#86b056" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="84" y1="122" x2="88" y2="110" stroke="#86b056" strokeWidth="1.6" strokeLinecap="round" />
        </g>
        <g opacity="0.85">
          <line x1="430" y1="146" x2="432" y2="118" stroke="#3a6224" strokeWidth="2" strokeLinecap="round" />
          <line x1="436" y1="146" x2="434" y2="122" stroke="#3a6224" strokeWidth="2" strokeLinecap="round" />
          <line x1="442" y1="146" x2="444" y2="124" stroke="#3a6224" strokeWidth="2" strokeLinecap="round" />
          <line x1="432" y1="118" x2="436" y2="106" stroke="#86b056" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="438" y1="120" x2="442" y2="108" stroke="#86b056" strokeWidth="1.6" strokeLinecap="round" />
        </g>

        {/* small palm cluster on far side (reflected on water below) */}
        <g transform="translate(170 56)">
          <path d="M -3 60 Q -2 30 -2 0" stroke="#6e451f" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M -2 0 Q -22 -8 -34 4" stroke="#5a8a3a" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M -2 0 Q 18 -8 30 4" stroke="#5a8a3a" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M -2 0 Q -16 -22 -10 -34" stroke="#3a6224" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M -2 0 Q 12 -22 6 -34" stroke="#3a6224" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M -2 0 Q -2 -28 -2 -36" stroke="#86b056" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>
        <g transform="translate(350 50)">
          <path d="M -3 60 Q -2 30 -2 0" stroke="#6e451f" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M -2 0 Q -24 -8 -38 4" stroke="#3a6224" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M -2 0 Q 20 -8 32 4" stroke="#5a8a3a" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M -2 0 Q -18 -24 -12 -36" stroke="#5a8a3a" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M -2 0 Q 14 -24 8 -36" stroke="#86b056" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>

        {/* reflection of palms in water */}
        <g opacity="0.28" transform="translate(170 140)">
          <path d="M -3 0 Q -2 24 -2 48" stroke="#6e451f" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M -2 0 Q -16 18 -10 30" stroke="#3a6224" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M -2 0 Q 12 18 6 30" stroke="#3a6224" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>
      </svg>
    </div>
  );
}

export default function Atmosphere({ geometries, totalHeight }: Props) {
  const uid = useId().replace(/[:]/g, "");

  const birds = useMemo<Bird[]>(() => {
    if (totalHeight === 0) return [];
    return [
      { x: 100, y: 80, scale: 0.9, delay: 0, duration: 28 },
      { x: 280, y: 130, scale: 0.7, delay: 3.2, duration: 34 },
      { x: 60, y: 210, scale: 1.0, delay: 7.0, duration: 32 },
      { x: 320, y: 60, scale: 0.55, delay: 11, duration: 38 },
    ];
  }, [totalHeight]);

  // Pick a mid-journey station gap to place the oasis
  const oasisTop = useMemo(() => {
    if (geometries.length < 6) return null;
    const a = geometries[4];
    const b = geometries[5];
    if (!a || !b) return null;
    // place between station 5 and 6, offset so it sits in the gutter row
    return (a.sheikhY + b.sheikhY) / 2 - 90;
  }, [geometries]);

  if (totalHeight === 0) return null;

  return (
    <div className="avt-atmosphere" style={{ height: totalHeight }} aria-hidden="true">
      {/* ===== SKY BAND (top of journey) ===== */}
      <div className="avt-atmosphere-sky">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1440 280"
          preserveAspectRatio="xMidYMid slice"
          style={{ display: "block" }}
        >
          <defs>
            <linearGradient id={`sky-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={SKY_TOP} />
              <stop offset="60%" stopColor={SKY_MID} />
              <stop offset="100%" stopColor={SKY_HORIZON} stopOpacity="0" />
            </linearGradient>
            <radialGradient id={`sun-halo-${uid}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={SUN_HALO} />
              <stop offset="100%" stopColor="rgba(255, 220, 140, 0)" />
            </radialGradient>
            <radialGradient id={`sun-core-${uid}`} cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor={SUN_CORE} />
              <stop offset="65%" stopColor={SUN_RIM} />
              <stop offset="100%" stopColor="#e88d4a" />
            </radialGradient>
            <linearGradient id={`sun-ray-${uid}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={SUN_RIM} stopOpacity="0.9" />
              <stop offset="100%" stopColor={SUN_RIM} stopOpacity="0" />
            </linearGradient>
          </defs>

          <rect width="1440" height="280" fill={`url(#sky-${uid})`} />

          {/* sun */}
          <g transform="translate(1180 90)">
            <circle r="140" fill={`url(#sun-halo-${uid})`} />
            <g className="avt-sun-rays">
              <SunRays uid={uid} />
            </g>
            <circle r="44" fill={`url(#sun-core-${uid})`} />
            <circle r="44" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1" />
          </g>

          {/* mountain layer at horizon */}
          <g transform="translate(0 170)">
            <Mountains uid={uid} width={1440} />
          </g>
        </svg>
      </div>

      {/* ===== HEAT SHIMMER STRIP ===== */}
      <div className="avt-atmosphere-shimmer" />

      {/* ===== BIRDS ===== */}
      <Birds birds={birds} />

      {/* ===== OASIS (mid-journey) ===== */}
      {oasisTop !== null && <Oasis top={oasisTop} uid={uid} />}

      {/* ===== END-OF-JOURNEY GLOW ===== */}
      <div
        className="avt-atmosphere-glow"
        style={{ top: Math.max(0, totalHeight - 280) }}
      />
    </div>
  );
}
