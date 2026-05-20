import type { ComponentType } from "react";

export type FeatureId =
  | "autoLink"
  | "readiness"
  | "validation"
  | "copilot"
  | "finding"
  | "report"
  | "docchat"
  | "insights"
  | "remediation";

export type TourPhase =
  | "idle"
  | "entering"
  | "narratingProblem"
  | "narratingSolution"
  | "demoPlaying"
  | "transitioning"
  | "finished";

export interface DemoProps {
  autoStart?: number;
  compact?: boolean;
}

export interface FeatureConfig {
  id: FeatureId;
  demoComponent: ComponentType<DemoProps>;
  problemKey: string;
  solutionKey: string;
  demoMs: number;
  autoStartDelay: number;
}

export interface TourControls {
  play: () => void;
  pause: () => void;
  resume: () => void;
  next: () => void;
  prev: () => void;
  skip: () => void;
  restart: () => void;
}

export interface TourState {
  activeIndex: number;
  phase: TourPhase;
  isPaused: boolean;
  autoStartKey: number;
  controls: TourControls;
}
