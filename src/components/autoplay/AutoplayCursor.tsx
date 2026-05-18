"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { AutoplayCursorState } from "./types";

export default function AutoplayCursor({ state }: { state: AutoplayCursorState }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const { visible, x, y, label, pulseKey, instant } = state;

  return createPortal(
    <div
      className={`autoplay-cursor${visible ? " visible" : ""}${instant ? " instant" : ""}`}
      style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}
      aria-hidden="true"
      role="presentation"
    >
      <svg
        className="autoplay-cursor-arrow"
        viewBox="0 0 36 36"
        width="36"
        height="36"
      >
        <path
          d="M5 4 L29 16 L18 18 L13 31 Z"
          fill="#0b4634"
          stroke="#f7f3ea"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M5 4 L29 16 L18 18 L13 31 Z"
          fill="none"
          stroke="#e8b84b"
          strokeWidth="0.8"
          strokeLinejoin="round"
          opacity="0.8"
        />
      </svg>
      <span key={pulseKey} className="autoplay-cursor-pulse" />
      {label && <span className="autoplay-cursor-label">{label}</span>}
    </div>,
    document.body
  );
}
