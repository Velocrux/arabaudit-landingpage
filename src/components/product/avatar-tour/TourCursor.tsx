"use client";

import { motion } from "framer-motion";

interface Props {
  x: number;
  y: number;
  visible: boolean;
  clickPulseKey: number;
  label?: string;
  isRtl: boolean;
}

export default function TourCursor({
  x,
  y,
  visible,
  clickPulseKey,
  label,
  isRtl,
}: Props) {
  return (
    <motion.div
      className="avt-cursor-layer"
      aria-hidden="true"
      initial={false}
      animate={{
        x,
        y,
        opacity: visible ? 1 : 0,
      }}
      transition={{
        x: { type: "spring", stiffness: 220, damping: 26, mass: 0.5 },
        y: { type: "spring", stiffness: 220, damping: 26, mass: 0.5 },
        opacity: { duration: 0.22 },
      }}
      style={{ pointerEvents: "none" }}
    >
      <svg
        className="avt-cursor-arrow"
        width="22"
        height="26"
        viewBox="0 0 22 26"
        fill="none"
      >
        <path
          d="M 2 2 L 2 20 L 7 16 L 10 23 L 13 22 L 10 15 L 16 15 Z"
          fill="#0e3f2e"
          stroke="#f7f3ea"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>

      {clickPulseKey > 0 && (
        <motion.span
          key={clickPulseKey}
          className="avt-cursor-pulse"
          initial={{ scale: 0.4, opacity: 0.8 }}
          animate={{ scale: 2.4, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      )}

      {label && (
        <span
          className={`avt-cursor-label${isRtl ? " avt-cursor-label-rtl" : ""}`}
        >
          {label}
        </span>
      )}
    </motion.div>
  );
}
