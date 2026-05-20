import type { FeatureId } from "./types";

export interface FeatureMeta {
  id: FeatureId;
  problemKey: string;
  solutionKey: string;
  demoMs: number;
  autoStartDelay: number;
}

export const FEATURE_META: FeatureMeta[] = [
  {
    id: "autoLink",
    problemKey: "product.autoLink.tour.problem",
    solutionKey: "product.autoLink.tour.solution",
    demoMs: 7000,
    autoStartDelay: 600,
  },
  {
    id: "readiness",
    problemKey: "product.readiness.tour.problem",
    solutionKey: "product.readiness.tour.solution",
    demoMs: 5000,
    autoStartDelay: 400,
  },
  {
    id: "validation",
    problemKey: "product.validation.tour.problem",
    solutionKey: "product.validation.tour.solution",
    demoMs: 6500,
    autoStartDelay: 400,
  },
  {
    id: "copilot",
    problemKey: "product.copilot.tour.problem",
    solutionKey: "product.copilot.tour.solution",
    demoMs: 7000,
    autoStartDelay: 500,
  },
  {
    id: "finding",
    problemKey: "product.finding.tour.problem",
    solutionKey: "product.finding.tour.solution",
    demoMs: 8500,
    autoStartDelay: 500,
  },
  {
    id: "report",
    problemKey: "product.report.tour.problem",
    solutionKey: "product.report.tour.solution",
    demoMs: 7500,
    autoStartDelay: 500,
  },
  {
    id: "docchat",
    problemKey: "product.docchat.tour.problem",
    solutionKey: "product.docchat.tour.solution",
    demoMs: 6500,
    autoStartDelay: 500,
  },
  {
    id: "insights",
    problemKey: "product.insights.tour.problem",
    solutionKey: "product.insights.tour.solution",
    demoMs: 7000,
    autoStartDelay: 500,
  },
  {
    id: "remediation",
    problemKey: "product.remediation.tour.problem",
    solutionKey: "product.remediation.tour.solution",
    demoMs: 7500,
    autoStartDelay: 500,
  },
];

export const TYPEWRITER_CHARS_PER_SECOND_EN = 28;
export const TYPEWRITER_CHARS_PER_SECOND_AR = 22;
export const PHASE_HOLD_MS = 600;
