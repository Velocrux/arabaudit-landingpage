import type { RefObject } from "react";

export type AutoplayStep = {
  id: string;
  labelKey: string;
  targetSelector: string;
  action?: () => void;
  /** If set, the engine focuses the target and animates typing this text char-by-char before running `action`. */
  typeText?: string;
  /** ms between typed characters (default 55). */
  typeSpeedMs?: number;
  skipIf?: () => boolean;
  preDelayMs?: number;
  postDelayMs?: number;
};

export type AutoplayConfig = {
  containerRef: RefObject<HTMLElement | null>;
  steps: AutoplayStep[];
  enabled?: boolean;
  labelNamespace?: string;
};

export type AutoplayCursorState = {
  visible: boolean;
  x: number;
  y: number;
  label: string;
  pulseKey: number;
  instant: boolean;
};
