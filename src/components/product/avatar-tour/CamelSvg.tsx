"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface Props {
  flip?: boolean;
}

const CAMEL_LIGHT = "#e3b67c";
const CAMEL_MID = "#c89968";
const CAMEL_SHADE = "#a4774a";
const CAMEL_DARK = "#7a5634";
const CAMEL_BELLY = "#e8c993";
const HOOF = "#3a2a18";
const SADDLE_DARK = "#4a2410";
const SADDLE_MID = "#7a4422";
const SADDLE_GOLD = "#e0b04a";
const BLANKET_RED = "#a02a22";
const BLANKET_DARK_RED = "#6b1814";
const BLANKET_GOLD = "#f3d27c";
const EYE = "#1a120a";
const EYE_HIGHLIGHT = "#fbeac8";
const MUZZLE = "#7a5436";
const NOSE = "#3a2010";

export default function CamelSvg({ flip }: Props) {
  const reduced = useReducedMotion();
  const uid = useId().replace(/[:]/g, "");
  const bodyGrad = `camel-body-${uid}`;
  const humpGrad = `camel-hump-${uid}`;
  const legGrad = `camel-leg-${uid}`;
  const dropShadow = `camel-shadow-${uid}`;

  return (
    <svg
      width="260"
      height="220"
      viewBox="0 0 260 220"
      style={{
        display: "block",
        transform: flip ? "scaleX(-1)" : undefined,
      }}
      role="img"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={bodyGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={CAMEL_LIGHT} />
          <stop offset="50%" stopColor={CAMEL_MID} />
          <stop offset="100%" stopColor={CAMEL_SHADE} />
        </linearGradient>
        <linearGradient id={humpGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={CAMEL_MID} />
          <stop offset="100%" stopColor={CAMEL_DARK} />
        </linearGradient>
        <linearGradient id={legGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={CAMEL_MID} />
          <stop offset="100%" stopColor={CAMEL_SHADE} />
        </linearGradient>
        <filter id={dropShadow} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="6" stdDeviation="4" floodColor="#3a1f08" floodOpacity="0.32" />
        </filter>
      </defs>

      {/* ground shadow */}
      <ellipse cx="130" cy="205" rx="84" ry="6" fill="rgba(40,20,8,0.28)" />

      {/* BACK LEGS — walk cycle */}
      <motion.g
        animate={reduced ? { rotate: 0 } : { rotate: [-3, 4, -3] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "70px 130px" }}
      >
        <path
          d="M 64 130 Q 60 158 62 196 L 76 196 Q 78 158 76 130 Z"
          fill={`url(#${legGrad})`}
        />
        {/* knee shading */}
        <ellipse cx="70" cy="158" rx="8" ry="3.5" fill={CAMEL_DARK} opacity="0.3" />
        {/* hoof */}
        <ellipse cx="70" cy="198" rx="9" ry="4" fill={HOOF} />
      </motion.g>

      <motion.g
        animate={reduced ? { rotate: 0 } : { rotate: [3, -4, 3] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        style={{ transformOrigin: "92px 130px" }}
      >
        <path
          d="M 86 130 Q 82 158 84 198 L 98 198 Q 100 158 98 130 Z"
          fill={`url(#${legGrad})`}
        />
        <ellipse cx="92" cy="158" rx="8" ry="3.5" fill={CAMEL_DARK} opacity="0.3" />
        <ellipse cx="92" cy="200" rx="9" ry="4" fill={HOOF} />
      </motion.g>

      {/* FRONT LEGS — opposite phase */}
      <motion.g
        animate={reduced ? { rotate: 0 } : { rotate: [4, -3, 4] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        style={{ transformOrigin: "168px 134px" }}
      >
        <path
          d="M 162 134 Q 158 160 160 196 L 174 196 Q 176 160 174 134 Z"
          fill={`url(#${legGrad})`}
        />
        <ellipse cx="168" cy="160" rx="8" ry="3.5" fill={CAMEL_DARK} opacity="0.3" />
        <ellipse cx="168" cy="198" rx="9" ry="4" fill={HOOF} />
      </motion.g>

      <motion.g
        animate={reduced ? { rotate: 0 } : { rotate: [-4, 3, -4] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        style={{ transformOrigin: "190px 134px" }}
      >
        <path
          d="M 184 134 Q 180 160 182 198 L 196 198 Q 198 160 196 134 Z"
          fill={`url(#${legGrad})`}
        />
        <ellipse cx="190" cy="160" rx="8" ry="3.5" fill={CAMEL_DARK} opacity="0.3" />
        <ellipse cx="190" cy="200" rx="9" ry="4" fill={HOOF} />
      </motion.g>

      {/* BODY — main mass */}
      <g filter={`url(#${dropShadow})`}>
        <path
          d="M 50 140 Q 44 120 64 110 L 200 100 Q 220 100 224 122 Q 226 142 214 150 L 60 156 Q 46 152 50 140 Z"
          fill={`url(#${bodyGrad})`}
        />
        {/* belly highlight */}
        <path
          d="M 64 152 Q 130 162 210 148"
          stroke={CAMEL_BELLY}
          strokeWidth="6"
          fill="none"
          opacity="0.55"
          strokeLinecap="round"
        />
        {/* chest shadow */}
        <path
          d="M 50 140 Q 70 152 86 140"
          stroke={CAMEL_DARK}
          strokeWidth="1.4"
          fill="none"
          opacity="0.45"
        />
      </g>

      {/* HUMP — single, characteristic */}
      <g filter={`url(#${dropShadow})`}>
        <path
          d="M 100 108 Q 108 72 134 68 Q 162 68 168 108 Z"
          fill={`url(#${humpGrad})`}
        />
        {/* hump highlight */}
        <path
          d="M 110 92 Q 118 80 134 78 Q 150 78 160 92"
          stroke={CAMEL_LIGHT}
          strokeWidth="2.4"
          fill="none"
          opacity="0.55"
          strokeLinecap="round"
        />
        {/* fur tufts on hump */}
        <path
          d="M 134 68 L 132 74 M 138 70 L 136 76 M 130 70 L 128 76"
          stroke={CAMEL_DARK}
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.8"
        />
      </g>

      {/* SADDLE BLANKET — under saddle, fringed */}
      <g filter={`url(#${dropShadow})`}>
        <path
          d="M 92 106 L 100 100 L 168 100 L 176 106 L 168 118 L 100 118 Z"
          fill={BLANKET_RED}
        />
        <path
          d="M 92 106 L 100 100 L 168 100 L 176 106"
          stroke={BLANKET_DARK_RED}
          strokeWidth="1"
          fill="none"
        />
        {/* gold trim */}
        <line x1="98" y1="103" x2="170" y2="103" stroke={BLANKET_GOLD} strokeWidth="1.4" />
        <line x1="100" y1="115" x2="168" y2="115" stroke={BLANKET_GOLD} strokeWidth="1.2" />
        {/* diamond pattern */}
        {[110, 124, 138, 152].map((x, i) => (
          <g key={i}>
            <path d={`M ${x} 108 L ${x + 3} 111 L ${x} 114 L ${x - 3} 111 Z`} fill={BLANKET_GOLD} />
            <circle cx={x} cy={111} r="0.8" fill={BLANKET_DARK_RED} />
          </g>
        ))}
        {/* tassels */}
        <line x1="94" y1="118" x2="92" y2="126" stroke={BLANKET_GOLD} strokeWidth="1.6" strokeLinecap="round" />
        <line x1="174" y1="118" x2="176" y2="126" stroke={BLANKET_GOLD} strokeWidth="1.6" strokeLinecap="round" />
        <line x1="98" y1="118" x2="96" y2="125" stroke={BLANKET_DARK_RED} strokeWidth="1.2" strokeLinecap="round" />
        <line x1="170" y1="118" x2="172" y2="125" stroke={BLANKET_DARK_RED} strokeWidth="1.2" strokeLinecap="round" />
      </g>

      {/* SADDLE proper */}
      <g filter={`url(#${dropShadow})`}>
        <rect x="116" y="84" width="36" height="20" rx="4" fill={SADDLE_MID} />
        <rect x="118" y="86" width="32" height="4" rx="2" fill={SADDLE_GOLD} />
        <rect x="118" y="98" width="32" height="4" rx="2" fill={SADDLE_DARK} />
        {/* saddle horn */}
        <ellipse cx="134" cy="84" rx="6" ry="3" fill={SADDLE_GOLD} />
      </g>

      {/* NECK + HEAD */}
      <motion.g
        style={{ transformOrigin: "210px 130px" }}
        animate={reduced ? { rotate: 0 } : { rotate: [0, -1.5, 0, -0.5, 0] }}
        transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* neck */}
        <g filter={`url(#${dropShadow})`}>
          <path
            d="M 200 120 Q 218 82 240 56 L 252 70 Q 230 92 224 130 Z"
            fill={`url(#${bodyGrad})`}
          />
          {/* neck mane */}
          <path
            d="M 210 100 Q 222 92 234 80"
            stroke={CAMEL_DARK}
            strokeWidth="2"
            fill="none"
            opacity="0.55"
            strokeLinecap="round"
          />
        </g>

        {/* head */}
        <g filter={`url(#${dropShadow})`}>
          <ellipse cx="244" cy="56" rx="18" ry="14" fill={`url(#${bodyGrad})`} />
          {/* muzzle */}
          <ellipse cx="254" cy="62" rx="11" ry="9" fill={MUZZLE} />
          <path
            d="M 246 65 Q 254 67 262 65"
            stroke={NOSE}
            strokeWidth="0.9"
            fill="none"
            opacity="0.7"
          />
          {/* nostril */}
          <ellipse cx="259" cy="62" rx="1.6" ry="2.4" fill={NOSE} />
          {/* mouth */}
          <path
            d="M 250 67 Q 256 70 260 67"
            stroke="#4a2818"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
          {/* lower lip */}
          <ellipse cx="255" cy="68" rx="2.4" ry="1.2" fill={CAMEL_DARK} opacity="0.6" />

          {/* ear */}
          <path
            d="M 232 42 Q 230 32 240 36 Q 238 44 232 42 Z"
            fill={CAMEL_SHADE}
          />
          <path
            d="M 234 40 Q 236 36 238 38"
            stroke={CAMEL_DARK}
            strokeWidth="0.8"
            fill="none"
            opacity="0.7"
          />
          <path
            d="M 240 38 Q 240 28 250 32 Q 248 42 240 40 Z"
            fill={CAMEL_SHADE}
          />
          <path
            d="M 242 36 Q 244 32 246 34"
            stroke={CAMEL_DARK}
            strokeWidth="0.8"
            fill="none"
            opacity="0.7"
          />

          {/* eye */}
          <ellipse cx="240" cy="52" rx="2.6" ry="3.2" fill={EYE} />
          <circle cx="240.5" cy="50.5" r="0.9" fill={EYE_HIGHLIGHT} />
          {/* eyelashes */}
          <line x1="238" y1="47" x2="237" y2="44" stroke={EYE} strokeWidth="1" strokeLinecap="round" />
          <line x1="240" y1="46.5" x2="240" y2="43" stroke={EYE} strokeWidth="1" strokeLinecap="round" />
          <line x1="242" y1="47" x2="243" y2="44" stroke={EYE} strokeWidth="1" strokeLinecap="round" />
          {/* eyebrow */}
          <path
            d="M 236 45 Q 240 43 244 45"
            stroke={CAMEL_DARK}
            strokeWidth="1.4"
            fill="none"
            opacity="0.7"
            strokeLinecap="round"
          />
        </g>

        {/* halter / rope on muzzle */}
        <path
          d="M 244 60 Q 252 56 262 60"
          stroke={SADDLE_MID}
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 244 60 L 240 56"
          stroke={SADDLE_MID}
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
      </motion.g>

      {/* TAIL — flicking */}
      <motion.g
        style={{ transformOrigin: "50px 130px" }}
        animate={reduced ? { rotate: 0 } : { rotate: [0, 14, -4, 8, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M 50 130 Q 38 134 32 148 Q 32 152 36 150 Q 40 148 44 142"
          stroke={CAMEL_SHADE}
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* tail tuft */}
        <ellipse cx="32" cy="150" rx="3.5" ry="4.5" fill={CAMEL_DARK} />
      </motion.g>
    </svg>
  );
}
