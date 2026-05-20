"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  text: string;
  charsPerSecond: number;
  reducedMotion: boolean;
  onTalkingChange?: (talking: boolean) => void;
  tone?: "problem" | "solution";
  ariaLabel?: string;
}

const PUNCT_PAUSE = 260;
const JITTER = 38;

export default function SpeechBubble({
  text,
  charsPerSecond,
  reducedMotion,
  onTalkingChange,
  tone = "problem",
  ariaLabel,
}: Props) {
  const [visible, setVisible] = useState("");
  const [showCaret, setShowCaret] = useState(false);
  const cancelRef = useRef(false);
  const talkingRef = useRef(false);

  useEffect(() => {
    cancelRef.current = false;
    setVisible("");
    setShowCaret(false);

    if (!text) {
      if (talkingRef.current) {
        talkingRef.current = false;
        onTalkingChange?.(false);
      }
      return;
    }

    if (reducedMotion) {
      setVisible(text);
      setShowCaret(false);
      if (!talkingRef.current) {
        talkingRef.current = true;
        onTalkingChange?.(true);
      }
      const offTimer = setTimeout(() => {
        if (cancelRef.current) return;
        talkingRef.current = false;
        onTalkingChange?.(false);
      }, 1200);
      return () => {
        cancelRef.current = true;
        clearTimeout(offTimer);
      };
    }

    setShowCaret(true);
    if (!talkingRef.current) {
      talkingRef.current = true;
      onTalkingChange?.(true);
    }

    let i = 0;
    const baseDelay = Math.max(20, Math.round(1000 / Math.max(1, charsPerSecond)));
    let stopped = false;

    const tick = () => {
      if (cancelRef.current || stopped) return;
      if (i >= text.length) {
        stopped = true;
        setShowCaret(false);
        if (talkingRef.current) {
          talkingRef.current = false;
          onTalkingChange?.(false);
        }
        return;
      }
      const ch = text.charAt(i);
      i += 1;
      setVisible(text.slice(0, i));
      const punct = /[.,!?:،؟؛]/.test(ch) ? PUNCT_PAUSE : 0;
      const jitter = Math.random() * JITTER - JITTER / 2;
      setTimeout(tick, baseDelay + punct + jitter);
    };

    const startTimer = setTimeout(tick, 80);

    return () => {
      cancelRef.current = true;
      stopped = true;
      clearTimeout(startTimer);
      if (talkingRef.current) {
        talkingRef.current = false;
        onTalkingChange?.(false);
      }
    };
  }, [text, charsPerSecond, reducedMotion, onTalkingChange]);

  return (
    <div className={`avt-bubble avt-bubble-${tone}`}>
      <div className="avt-bubble-body">
        <span aria-hidden="true">
          {visible}
          {showCaret && <span className="avt-caret" />}
        </span>
        <div
          className="avt-sr-only"
          role="status"
          aria-live="polite"
          aria-atomic="true"
          aria-label={ariaLabel}
        >
          {text}
        </div>
      </div>
      <div className="avt-bubble-tail" aria-hidden="true" />
    </div>
  );
}
