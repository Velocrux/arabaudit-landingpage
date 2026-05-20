"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { mouthVariants, nextViseme, TALK_INTERVAL_MAX, TALK_INTERVAL_MIN } from "./visemes";
import type { Viseme } from "./visemes";

interface Props {
  talking: boolean;
  isRtl: boolean;
}

const SHEMAGH_WHITE = "#fefcf5";
const SHEMAGH_SHADE = "#e9e1c6";
const SHEMAGH_FOLD = "#a59a7a";
const PATTERN_RED = "#c43030";
const PATTERN_RED_DEEP = "#8c1c1c";

const THOB_WHITE = "#ffffff";
const THOB_SHADE = "#ebe6d2";
const THOB_LINE = "#cbc6b0";
const THOB_BUTTON = "#a89c78";

const EGAL_BLACK = "#0a0a0a";
const EGAL_GREY = "#202020";
const EGAL_GOLD = "#8c6d28";

const SKIN_LIGHT = "#ecc9a4";
const SKIN_BASE = "#d2a07a";
const SKIN_SHADE = "#a87a52";
const SKIN_DEEP = "#7a4f30";
const BLUSH = "#df8c6e";

const BEARD_BLACK = "#0a0604";
const BEARD_DARK = "#1a100a";

const EYE = "#0a0805";
const BROW = "#0a0805";
const NOSE_LINE = "#9c6c44";
const NOSE_SHADOW = "#a8794f";
const LIP = "#7a2e22";

export default function Avatar({ talking, isRtl }: Props) {
  const reduced = useReducedMotion();
  const [viseme, setViseme] = useState<Viseme>("closed");
  const [blink, setBlink] = useState(false);
  const visemeRef = useRef<Viseme>("closed");
  const uid = useId().replace(/[:]/g, "");
  const idPattern = `shem-${uid}`;
  const idSkin = `skin-${uid}`;
  const idHalo = `halo-${uid}`;
  const idBeard = `beard-${uid}`;
  const idThob = `thob-${uid}`;
  const idNose = `nose-${uid}`;

  useEffect(() => {
    if (!talking || reduced) {
      setViseme("closed");
      visemeRef.current = "closed";
      return;
    }
    let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      const next = nextViseme(visemeRef.current);
      visemeRef.current = next;
      setViseme(next);
      const interval =
        TALK_INTERVAL_MIN + Math.random() * (TALK_INTERVAL_MAX - TALK_INTERVAL_MIN);
      setTimeout(tick, interval);
    };
    setViseme("half");
    visemeRef.current = "half";
    const startId = setTimeout(tick, 120);
    return () => {
      cancelled = true;
      clearTimeout(startId);
      setViseme("closed");
      visemeRef.current = "closed";
    };
  }, [talking, reduced]);

  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      setBlink(true);
      setTimeout(() => {
        if (cancelled) return;
        setBlink(false);
      }, 130);
      const next = 2800 + Math.random() * 2400;
      setTimeout(tick, next);
    };
    const startId = setTimeout(tick, 1600);
    return () => {
      cancelled = true;
      clearTimeout(startId);
    };
  }, [reduced]);

  return (
    <motion.svg
      className="avt-avatar"
      viewBox="0 0 320 560"
      width="100%"
      height="100%"
      role="img"
      aria-label="Saudi AI co-auditor avatar"
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={isRtl ? { transform: "scaleX(-1)" } : undefined}
    >
      <defs>
        <pattern
          id={idPattern}
          x="0"
          y="0"
          width="22"
          height="22"
          patternUnits="userSpaceOnUse"
        >
          <rect width="22" height="22" fill={SHEMAGH_WHITE} />
          <path
            d="M 0 11 L 22 11 M 11 0 L 11 22"
            stroke={PATTERN_RED}
            strokeWidth="0.7"
            opacity="0.5"
          />
          <g transform="translate(11 11)">
            <rect
              x="-4"
              y="-4"
              width="8"
              height="8"
              fill={PATTERN_RED}
              transform="rotate(45)"
            />
            <rect
              x="-1.5"
              y="-1.5"
              width="3"
              height="3"
              fill={PATTERN_RED_DEEP}
              transform="rotate(45)"
            />
          </g>
          <circle cx="0" cy="0" r="1.4" fill={PATTERN_RED} />
          <circle cx="22" cy="0" r="1.4" fill={PATTERN_RED} />
          <circle cx="0" cy="22" r="1.4" fill={PATTERN_RED} />
          <circle cx="22" cy="22" r="1.4" fill={PATTERN_RED} />
        </pattern>
        <radialGradient id={idHalo} cx="50%" cy="30%" r="55%">
          <stop offset="0%" stopColor="rgba(243, 210, 124, 0.30)" />
          <stop offset="100%" stopColor="rgba(243, 210, 124, 0)" />
        </radialGradient>
        <linearGradient id={idSkin} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={SKIN_LIGHT} />
          <stop offset="65%" stopColor={SKIN_BASE} />
          <stop offset="100%" stopColor={SKIN_SHADE} />
        </linearGradient>
        <linearGradient id={idBeard} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={BEARD_DARK} />
          <stop offset="100%" stopColor={BEARD_BLACK} />
        </linearGradient>
        <linearGradient id={idThob} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={THOB_WHITE} />
          <stop offset="100%" stopColor={THOB_SHADE} />
        </linearGradient>
        <linearGradient id={idNose} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={SKIN_LIGHT} />
          <stop offset="60%" stopColor={SKIN_BASE} />
          <stop offset="100%" stopColor={NOSE_SHADOW} />
        </linearGradient>
      </defs>

      <ellipse cx="160" cy="548" rx="135" ry="12" fill="rgba(10,31,23,0.18)" />
      <circle cx="160" cy="170" r="170" fill={`url(#${idHalo})`} />

      <g id="avt-thob-base">
        <path
          d="M 56 560 L 70 360 Q 92 314 132 304 L 158 320 L 162 320 L 188 304 Q 228 314 250 360 L 264 560 Z"
          fill={`url(#${idThob})`}
          stroke={THOB_LINE}
          strokeWidth="1.4"
        />
        <path
          d="M 132 304 L 158 332 L 162 332 L 188 304 L 178 308 L 160 320 L 142 308 Z"
          fill={THOB_SHADE}
          stroke={THOB_LINE}
          strokeWidth="0.8"
        />
        <path
          d="M 160 332 L 160 560"
          stroke={THOB_LINE}
          strokeWidth="1"
          opacity="0.6"
        />
        <circle cx="160" cy="354" r="2.4" fill={THOB_BUTTON} />
        <circle cx="160" cy="376" r="2.4" fill={THOB_BUTTON} />
        <circle cx="160" cy="398" r="2.4" fill={THOB_BUTTON} />
        <circle cx="160" cy="420" r="2.4" fill={THOB_BUTTON} />
      </g>

      <g id="avt-shemagh-back">
        <path
          d="M 44 110 Q 22 220 36 332 Q 48 364 90 376 L 124 372 L 122 134 Q 96 102 64 100 Q 50 102 44 110 Z"
          fill={`url(#${idPattern})`}
        />
        <path
          d="M 44 110 Q 22 220 36 332 Q 48 364 90 376 L 124 372 L 122 134 Q 96 102 64 100 Q 50 102 44 110 Z"
          fill="rgba(0,0,0,0.06)"
        />
        <path
          d="M 276 110 Q 298 220 284 332 Q 272 364 230 376 L 196 372 L 198 134 Q 224 102 256 100 Q 270 102 276 110 Z"
          fill={`url(#${idPattern})`}
        />
        <path
          d="M 276 110 Q 298 220 284 332 Q 272 364 230 376 L 196 372 L 198 134 Q 224 102 256 100 Q 270 102 276 110 Z"
          fill="rgba(0,0,0,0.06)"
        />
        <path
          d="M 70 130 Q 56 220 66 300"
          stroke={SHEMAGH_FOLD}
          strokeWidth="0.6"
          opacity="0.5"
          fill="none"
        />
        <path
          d="M 250 130 Q 264 220 254 300"
          stroke={SHEMAGH_FOLD}
          strokeWidth="0.6"
          opacity="0.5"
          fill="none"
        />
        <path
          d="M 90 376 L 96 408 L 116 410 L 124 376"
          fill={SHEMAGH_SHADE}
          stroke={SHEMAGH_FOLD}
          strokeWidth="0.7"
          opacity="0.7"
        />
        <path
          d="M 230 376 L 224 408 L 204 410 L 196 376"
          fill={SHEMAGH_SHADE}
          stroke={SHEMAGH_FOLD}
          strokeWidth="0.7"
          opacity="0.7"
        />
      </g>

      {/* RIGHT ARM (character's right, viewer's left) - hangs at side with subtle motion */}
      <motion.g
        id="avt-arm-right-upper"
        animate={
          talking && !reduced
            ? { rotate: [-14, -16, -12, -15, -13, -16, -14] }
            : { rotate: -14 }
        }
        transition={
          talking
            ? { duration: 8, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.6 }
        }
        style={{ transformOrigin: "95px 322px" }}
      >
        <path
          d="M 78 322 Q 76 326 78 380 L 112 380 Q 114 326 112 322 Q 95 316 78 322 Z"
          fill={`url(#${idThob})`}
          stroke={THOB_LINE}
          strokeWidth="1.2"
        />

        <motion.g
          id="avt-arm-right-forearm"
          animate={
            talking && !reduced
              ? { rotate: [0, 4, -2, 3, -3, 2, 0] }
              : { rotate: 0 }
          }
          transition={
            talking
              ? { duration: 8, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.6 }
          }
          style={{ transformOrigin: "95px 380px" }}
        >
          <path
            d="M 80 380 L 110 380 Q 113 408 110 432 Q 95 438 80 432 Q 77 408 80 380 Z"
            fill={`url(#${idThob})`}
            stroke={THOB_LINE}
            strokeWidth="1.2"
          />
          <path
            d="M 80 384 Q 95 388 110 384"
            stroke={THOB_LINE}
            strokeWidth="0.7"
            opacity="0.5"
            fill="none"
          />

          {/* Hand: wrist at origin (95, 432). Fingers extend in +Y so they continue
              the forearm direction. At ~88° forearm rotation, fingers point outward. */}
          <g id="avt-hand-right" transform="translate(95 432)">
            <ellipse cx="0" cy="11" rx="13" ry="10" fill={`url(#${idSkin})`} stroke={SKIN_SHADE} strokeWidth="0.7" />
            <ellipse cx="-9" cy="24" rx="2.6" ry="7" fill={`url(#${idSkin})`} stroke={SKIN_SHADE} strokeWidth="0.5" />
            <ellipse cx="-3" cy="26" rx="2.6" ry="9" fill={`url(#${idSkin})`} stroke={SKIN_SHADE} strokeWidth="0.5" />
            <ellipse cx="3" cy="26" rx="2.6" ry="9" fill={`url(#${idSkin})`} stroke={SKIN_SHADE} strokeWidth="0.5" />
            <ellipse cx="9" cy="24" rx="2.6" ry="7" fill={`url(#${idSkin})`} stroke={SKIN_SHADE} strokeWidth="0.5" />
            <ellipse cx="14" cy="11" rx="3.5" ry="6" fill={`url(#${idSkin})`} stroke={SKIN_SHADE} strokeWidth="0.5" transform="rotate(40 14 11)" />
            <ellipse cx="0" cy="8" rx="6" ry="2.5" fill={SKIN_LIGHT} opacity="0.55" />
            <path d="M -10 18 Q 0 19 10 18" stroke={SKIN_SHADE} strokeWidth="0.4" fill="none" opacity="0.5" />
          </g>
        </motion.g>
      </motion.g>

      {/* LEFT ARM (character's left, viewer's right) - mirrored resting pose */}
      <motion.g
        id="avt-arm-left-upper"
        animate={
          talking && !reduced
            ? { rotate: [14, 16, 12, 15, 13, 16, 14] }
            : { rotate: 14 }
        }
        transition={
          talking
            ? { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
            : { duration: 0.6 }
        }
        style={{ transformOrigin: "225px 322px" }}
      >
        <path
          d="M 208 322 Q 206 326 208 380 L 242 380 Q 244 326 242 322 Q 225 316 208 322 Z"
          fill={`url(#${idThob})`}
          stroke={THOB_LINE}
          strokeWidth="1.2"
        />

        <motion.g
          id="avt-arm-left-forearm"
          animate={
            talking && !reduced
              ? { rotate: [0, -4, 2, -3, 3, -2, 0] }
              : { rotate: 0 }
          }
          transition={
            talking
              ? { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
              : { duration: 0.6 }
          }
          style={{ transformOrigin: "225px 380px" }}
        >
          <path
            d="M 210 380 L 240 380 Q 243 408 240 432 Q 225 438 210 432 Q 207 408 210 380 Z"
            fill={`url(#${idThob})`}
            stroke={THOB_LINE}
            strokeWidth="1.2"
          />
          <path
            d="M 210 384 Q 225 388 240 384"
            stroke={THOB_LINE}
            strokeWidth="0.7"
            opacity="0.5"
            fill="none"
          />

          <g id="avt-hand-left" transform="translate(225 432)">
            <ellipse cx="0" cy="11" rx="13" ry="10" fill={`url(#${idSkin})`} stroke={SKIN_SHADE} strokeWidth="0.7" />
            <ellipse cx="9" cy="24" rx="2.6" ry="7" fill={`url(#${idSkin})`} stroke={SKIN_SHADE} strokeWidth="0.5" />
            <ellipse cx="3" cy="26" rx="2.6" ry="9" fill={`url(#${idSkin})`} stroke={SKIN_SHADE} strokeWidth="0.5" />
            <ellipse cx="-3" cy="26" rx="2.6" ry="9" fill={`url(#${idSkin})`} stroke={SKIN_SHADE} strokeWidth="0.5" />
            <ellipse cx="-9" cy="24" rx="2.6" ry="7" fill={`url(#${idSkin})`} stroke={SKIN_SHADE} strokeWidth="0.5" />
            <ellipse cx="-14" cy="11" rx="3.5" ry="6" fill={`url(#${idSkin})`} stroke={SKIN_SHADE} strokeWidth="0.5" transform="rotate(-40 -14 11)" />
            <ellipse cx="0" cy="8" rx="6" ry="2.5" fill={SKIN_LIGHT} opacity="0.55" />
            <path d="M 10 18 Q 0 19 -10 18" stroke={SKIN_SHADE} strokeWidth="0.4" fill="none" opacity="0.5" />
          </g>
        </motion.g>
      </motion.g>

      <g id="avt-neck">
        <path d="M 138 248 L 182 248 L 188 304 L 132 304 Z" fill={`url(#${idSkin})`} />
        <path d="M 138 290 Q 160 304 182 290" fill={SKIN_DEEP} opacity="0.3" />
      </g>

      <motion.g
        id="avt-head-group"
        animate={
          talking && !reduced
            ? { rotate: [-1, 1, -1] }
            : { rotate: 0 }
        }
        transition={
          talking
            ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.4 }
        }
        style={{ transformOrigin: "160px 220px" }}
      >
        <g id="avt-head" transform="translate(160 180)">
          <ellipse cx="0" cy="0" rx="68" ry="78" fill={`url(#${idSkin})`} />

          <ellipse cx="-46" cy="22" rx="13" ry="7" fill={BLUSH} opacity="0.3" />
          <ellipse cx="46" cy="22" rx="13" ry="7" fill={BLUSH} opacity="0.3" />

          <ellipse cx="-64" cy="6" rx="5" ry="9" fill={`url(#${idSkin})`} />
          <ellipse cx="64" cy="6" rx="5" ry="9" fill={`url(#${idSkin})`} />

          <g id="avt-beard">
            <path
              d="M -62 8 Q -58 62 -36 84 Q -16 94 0 94 Q 16 94 36 84 Q 58 62 62 8 Q 58 38 42 58 Q 22 72 0 74 Q -22 72 -42 58 Q -58 38 -62 8 Z"
              fill={`url(#${idBeard})`}
            />
            <path
              d="M -40 56 Q -22 68 0 70 Q 22 68 40 56"
              stroke={BEARD_DARK}
              strokeWidth="0.6"
              fill="none"
              opacity="0.7"
            />
          </g>

          <g id="avt-brow-left">
            <motion.path
              d="M -40 -24 Q -24 -32 -10 -22"
              stroke={BROW}
              strokeWidth="5.2"
              strokeLinecap="round"
              fill="none"
              animate={{ y: talking ? -1.5 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </g>
          <g id="avt-brow-right">
            <motion.path
              d="M 10 -22 Q 24 -32 40 -24"
              stroke={BROW}
              strokeWidth="5.2"
              strokeLinecap="round"
              fill="none"
              animate={{ y: talking ? -1.5 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </g>

          <g id="avt-eyes">
            <motion.g
              animate={{ scaleY: blink ? 0.06 : 1 }}
              transition={{ duration: 0.08 }}
              style={{ transformOrigin: "-22px -4px" }}
            >
              <ellipse cx="-22" cy="-4" rx="9" ry="6.5" fill="white" />
              <circle cx="-21" cy="-3" r="4.2" fill={EYE} />
              <circle cx="-19.5" cy="-5" r="1.6" fill="white" />
            </motion.g>
            <motion.g
              animate={{ scaleY: blink ? 0.06 : 1 }}
              transition={{ duration: 0.08 }}
              style={{ transformOrigin: "22px -4px" }}
            >
              <ellipse cx="22" cy="-4" rx="9" ry="6.5" fill="white" />
              <circle cx="23" cy="-3" r="4.2" fill={EYE} />
              <circle cx="24.5" cy="-5" r="1.6" fill="white" />
            </motion.g>
          </g>

          <g id="avt-nose">
            <path
              d="M -2 4 Q -8 22 -5 30 Q 0 32 5 30 Q 8 22 2 4 Z"
              fill={`url(#${idNose})`}
            />
            <path
              d="M -5 30 Q 0 33 5 30"
              stroke={NOSE_LINE}
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
              opacity="0.7"
            />
            <circle cx="-2.5" cy="30" r="1" fill={NOSE_SHADOW} opacity="0.55" />
            <circle cx="2.5" cy="30" r="1" fill={NOSE_SHADOW} opacity="0.55" />
          </g>

          <g id="avt-mustache">
            <path
              d="M -28 38 Q -16 32 -4 34 Q 0 32 4 34 Q 16 32 28 38 Q 20 44 4 38 Q 0 38 -4 38 Q -20 44 -28 38 Z"
              fill={`url(#${idBeard})`}
            />
          </g>

          <g id="avt-mouth" transform="translate(0 50)">
            <motion.path
              stroke={LIP}
              strokeWidth="2.6"
              strokeLinecap="round"
              fill={viseme === "closed" ? "none" : "rgba(58,18,12,0.65)"}
              animate={mouthVariants[viseme]}
              initial={mouthVariants.closed}
              transition={{ duration: 0.12 }}
            />
          </g>
        </g>

        <g id="avt-shemagh-front">
          <path
            d="M 90 118 Q 110 80 160 74 Q 210 80 230 118 Q 240 138 222 148 Q 200 132 160 130 Q 120 132 98 148 Q 80 138 90 118 Z"
            fill={`url(#${idPattern})`}
          />
          <path
            d="M 90 118 Q 110 80 160 74 Q 210 80 230 118 Q 240 138 222 148 Q 200 132 160 130 Q 120 132 98 148 Q 80 138 90 118 Z"
            fill="rgba(0,0,0,0.05)"
          />
          <path
            d="M 108 124 Q 130 116 160 114 Q 190 116 212 124"
            stroke={SHEMAGH_FOLD}
            strokeWidth="0.7"
            opacity="0.7"
            fill="none"
          />
        </g>

        <g id="avt-egal">
          <ellipse cx="160" cy="130" rx="76" ry="12" fill={EGAL_BLACK} />
          <ellipse cx="160" cy="120" rx="66" ry="7.5" fill={EGAL_GREY} />
          <ellipse
            cx="160"
            cy="126"
            rx="72"
            ry="3"
            fill="none"
            stroke={EGAL_GOLD}
            strokeWidth="0.8"
            opacity="0.5"
          />
          <ellipse
            cx="160"
            cy="130"
            rx="76"
            ry="12"
            fill="none"
            stroke="#000"
            strokeWidth="0.5"
            opacity="0.5"
          />
          <circle cx="160" cy="106" r="4" fill={EGAL_BLACK} />
          <circle cx="160" cy="106" r="2" fill={EGAL_GREY} />
        </g>
      </motion.g>
    </motion.svg>
  );
}
