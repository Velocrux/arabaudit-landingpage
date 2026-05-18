import type { AutoplayStep } from "../types";

type Phase = 1 | 2 | 3 | 4 | 5 | 6;
type Rating = "compliant" | "noncompliant" | "na" | null;
type Criterion = { id: string; rating: Rating };
type RequiredDoc = { file: string | null };
type SignState = "idle" | "processing" | "complete";

export type AuditFlowSequenceArgs = {
  phase: Phase;
  filePickerOpen: boolean;
  requiredDocs: RequiredDoc[];
  criteria: Criterion[];
  signState: SignState;
  titleToType: string;
  descriptionToType: string;
  goTo: (n: Phase) => void;
  openFilePicker: (ctx: number) => void;
  confirmFilePicker: () => void;
  rateCriterion: (idx: number, rating: Rating) => void;
  triggerAIAnimation: () => void;
};

export function buildAuditFlowSequence({
  phase,
  filePickerOpen,
  requiredDocs,
  criteria,
  signState,
  titleToType,
  descriptionToType,
  goTo,
  openFilePicker,
  confirmFilePicker,
  rateCriterion,
  triggerAIAnimation,
}: AuditFlowSequenceArgs): AutoplayStep[] {
  // Rating steps adapt to however many criteria the demo has (DemoAuditFlow
  // ships 3; each use case in UseCasesAuditFlow ships 15). Mostly compliant
  // with one non-compliant every 5 to keep the demo believable.
  const ratingSteps: AutoplayStep[] = criteria.map((_, idx) => {
    const isNonCompliant = idx % 5 === 1;
    return {
      id: `rate-crit-${idx}`,
      labelKey: isNonCompliant ? "ratingNonCompliant" : "ratingCompliant",
      targetSelector: isNonCompliant
        ? '[data-autoplay="rate-noncompliant"]'
        : '[data-autoplay="rate-compliant"]',
      action: () =>
        rateCriterion(idx, isNonCompliant ? "noncompliant" : "compliant"),
      skipIf: () => criteria[idx]?.rating != null,
      postDelayMs: 900,
    };
  });

  return [
    {
      id: "type-phase1-title",
      labelKey: "typingAuditTitle",
      targetSelector: '[data-autoplay="phase1-title-input"]',
      typeText: titleToType,
      skipIf: () => phase >= 2,
      preDelayMs: 250,
      postDelayMs: 500,
    },
    {
      id: "pick-phase1-framework",
      labelKey: "selectingFrameworkOption",
      targetSelector: '[data-autoplay="phase1-framework-select"]',
      typeText: "sama-csf",
      skipIf: () => phase >= 2,
      preDelayMs: 250,
      postDelayMs: 500,
    },
    {
      id: "pick-phase1-date",
      labelKey: "pickingDate",
      targetSelector: '[data-autoplay="phase1-date-input"]',
      typeText: "2026-05-15",
      skipIf: () => phase >= 2,
      preDelayMs: 250,
      postDelayMs: 500,
    },
    {
      id: "pick-phase1-lead-auditor",
      labelKey: "selectingLeadAuditor",
      targetSelector: '[data-autoplay="phase1-lead-auditor-select"]',
      typeText: "Khalid Al-Mansour (CIA)",
      skipIf: () => phase >= 2,
      preDelayMs: 250,
      postDelayMs: 500,
    },
    {
      id: "type-phase1-description",
      labelKey: "typingDescription",
      targetSelector: '[data-autoplay="phase1-description-textarea"]',
      typeText: descriptionToType,
      typeSpeedMs: 22,
      skipIf: () => phase >= 2,
      preDelayMs: 250,
      postDelayMs: 700,
    },
    {
      id: "continue-to-prep",
      labelKey: "openingPreparation",
      targetSelector: '[data-autoplay="continue-to-prep"]',
      action: () => goTo(2),
      skipIf: () => phase >= 2,
    },
    {
      id: "link-evidence",
      labelKey: "linkingEvidence",
      targetSelector: '[data-autoplay="link-doc-0"]',
      action: () => openFilePicker(0),
      skipIf: () => phase >= 3 || !!requiredDocs[0]?.file || filePickerOpen,
    },
    {
      id: "confirm-file",
      labelKey: "confirmingEvidence",
      targetSelector: '[data-autoplay="picker-confirm"]',
      action: confirmFilePicker,
      skipIf: () => !filePickerOpen,
      preDelayMs: 900,
      // Upload simulation runs ~1.5s, then 350ms pause, then 900ms before goTo(3) =
      // ~2750ms before phase 3 is reached. Give the engine room to land in phase 3
      // before it polls for the rating buttons.
      postDelayMs: 3200,
    },
    ...ratingSteps,
    {
      id: "submit-generate-report",
      labelKey: "generatingReport",
      targetSelector: '[data-autoplay="submit-generate-report"]',
      action: triggerAIAnimation,
      skipIf: () => phase >= 5,
      preDelayMs: 500,
      // AI overlay (~5.6s) + phase 5 report animation (~2.5s) + 2s "rest"
      // buffer so the visitor sees the finished report before the cursor
      // moves on to sign.
      postDelayMs: 8200,
    },
    {
      id: "sign-and-lock",
      labelKey: "signingAudit",
      targetSelector: '[data-autoplay="sign-and-lock"]',
      action: () => goTo(6),
      skipIf: () => phase >= 6 || signState !== "idle",
      preDelayMs: 600,
      postDelayMs: 2500,
    },
  ];
}
