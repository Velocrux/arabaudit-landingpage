import type { FeatureId } from "./types";

export interface CursorStop {
  target: string;
  delay: number;
  click: boolean;
  realClick?: boolean;
  labelKey?: string;
  offsetX?: number;
  offsetY?: number;
}

export type CursorSequence = CursorStop[];

export const CURSOR_SEQUENCES: Record<FeatureId, CursorSequence> = {
  autoLink: [
    { target: "autolink-doc-1", delay: 0, click: true, realClick: true, labelKey: "product.tour.cursor.selectDoc" },
    { target: "autolink-doc-2", delay: 550, click: true, realClick: true },
    { target: "autolink-doc-3", delay: 550, click: true, realClick: true },
    { target: "autolink-generate", delay: 600, click: true, realClick: true, labelKey: "product.tour.cursor.generate" },
    { target: "autolink-apply", delay: 4000, click: true, realClick: true, labelKey: "product.tour.cursor.apply" },
  ],
  readiness: [
    { target: "readiness-ring", delay: 0, click: false, labelKey: "product.tour.cursor.coverage" },
    { target: "readiness-missing", delay: 1800, click: false, labelKey: "product.tour.cursor.gap" },
  ],
  validation: [
    { target: "validation-run", delay: 0, click: true, realClick: true, labelKey: "product.tour.cursor.runValidation" },
    { target: "validation-result", delay: 3200, click: false, labelKey: "product.tour.cursor.rating" },
  ],
  copilot: [
    { target: "copilot-suggestion", delay: 0, click: true, realClick: true, labelKey: "product.tour.cursor.askCopilot" },
    { target: "copilot-chat", delay: 2400, click: false, labelKey: "product.tour.cursor.answer" },
  ],
  finding: [
    { target: "finding-body", delay: 0, click: false, labelKey: "product.tour.cursor.draftFinding" },
    { target: "finding-lang-ar", delay: 3200, click: true, realClick: true, labelKey: "product.tour.cursor.bilingual" },
  ],
  report: [
    { target: "report-gauge", delay: 0, click: false, labelKey: "product.tour.cursor.score" },
    { target: "report-narrative", delay: 2400, click: false, labelKey: "product.tour.cursor.narrative" },
  ],
  docchat: [
    { target: "docchat-expiry", delay: 0, click: true, realClick: true, labelKey: "product.tour.cursor.askDoc" },
    { target: "docchat-ar", delay: 3000, click: true, realClick: true, labelKey: "product.tour.cursor.bilingual" },
  ],
  insights: [
    { target: "insights-metrics", delay: 0, click: false, labelKey: "product.tour.cursor.trends" },
    { target: "insights-rec-1", delay: 2400, click: false, labelKey: "product.tour.cursor.priority" },
  ],
  remediation: [
    { target: "remediation-priority", delay: 0, click: false, labelKey: "product.tour.cursor.priority" },
    { target: "remediation-actions", delay: 2200, click: false, labelKey: "product.tour.cursor.plan" },
  ],
};

export const FEATURES_DRIVEN_BY_CURSOR: ReadonlySet<FeatureId> = new Set<FeatureId>([
  "autoLink",
  "validation",
  "copilot",
  "docchat",
]);
