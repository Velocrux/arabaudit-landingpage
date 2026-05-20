"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { DemoProps, FeatureConfig, FeatureId } from "./types";
import { FEATURE_META } from "./featureMeta";

export {
  TYPEWRITER_CHARS_PER_SECOND_EN,
  TYPEWRITER_CHARS_PER_SECOND_AR,
  PHASE_HOLD_MS,
} from "./featureMeta";

const demoLoader = (importer: () => Promise<{ default: ComponentType<DemoProps> }>) =>
  dynamic(importer, { ssr: false }) as ComponentType<DemoProps>;

const DEMO_BY_ID: Record<FeatureId, ComponentType<DemoProps>> = {
  autoLink: demoLoader(() => import("@/components/product/AutoLinkDemo")),
  readiness: demoLoader(() => import("@/components/product/ReadinessDemo")),
  validation: demoLoader(() => import("@/components/product/ValidationDemo")),
  copilot: demoLoader(() => import("@/components/product/CopilotDemo")),
  finding: demoLoader(() => import("@/components/product/FindingDemo")),
  report: demoLoader(() => import("@/components/product/ReportDemo")),
  docchat: demoLoader(() => import("@/components/product/DocChatDemo")),
  insights: demoLoader(() => import("@/components/product/InsightsDemo")),
  remediation: demoLoader(() => import("@/components/product/RemediationDemo")),
};

export const FEATURE_SCRIPT: FeatureConfig[] = FEATURE_META.map((m) => ({
  ...m,
  demoComponent: DEMO_BY_ID[m.id],
}));
