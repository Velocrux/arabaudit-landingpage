import type { AutoplayStep } from "../types";
import type { Framework } from "@/lib/data";

export type FrameworkWizardSequenceArgs = {
  step: number;
  selected: string[];
  adminApproved: boolean;
  frameworks: Framework[];
  titleToType: string;
  contextToType: string;
  descriptionToType: string;
  toggleFw: (id: string) => void;
  goTo: (n: 1 | 2 | 3 | 4 | 5 | 6) => void;
  submitRequest: () => void;
  adminApprove: () => void;
};

export function buildFrameworkWizardSequence({
  step,
  selected,
  adminApproved,
  frameworks,
  titleToType,
  contextToType,
  descriptionToType,
  toggleFw,
  goTo,
  submitRequest,
  adminApprove,
}: FrameworkWizardSequenceArgs): AutoplayStep[] {
  const firstId = frameworks[0]?.id;
  const secondId = frameworks[1]?.id;

  return [
    {
      id: "select-fw-1",
      labelKey: "selectingFramework",
      targetSelector: '[data-autoplay="fw-card-0"]',
      action: () => firstId && toggleFw(firstId),
      skipIf: () => step > 1 || (!!firstId && selected.includes(firstId)),
    },
    {
      id: "select-fw-2",
      labelKey: "selectingSecondFramework",
      targetSelector: '[data-autoplay="fw-card-1"]',
      action: () => secondId && toggleFw(secondId),
      skipIf: () => step > 1 || (!!secondId && selected.includes(secondId)),
      postDelayMs: 900,
    },
    {
      id: "continue-to-request",
      labelKey: "openingRequestForm",
      targetSelector: '[data-autoplay="goto-step-2"]',
      action: () => goTo(2),
      skipIf: () => step >= 2,
    },
    {
      id: "type-step2-context",
      labelKey: "typingAdditionalContext",
      targetSelector: '[data-autoplay="step2-context-textarea"]',
      typeText: contextToType,
      typeSpeedMs: 22,
      skipIf: () => step >= 3,
      preDelayMs: 350,
      postDelayMs: 600,
    },
    {
      id: "submit-request",
      labelKey: "submittingRequest",
      targetSelector: '[data-autoplay="submit-request"]',
      action: submitRequest,
      skipIf: () => step >= 3,
      preDelayMs: 400,
    },
    {
      id: "admin-approve",
      labelKey: "approvingRequest",
      targetSelector: '[data-autoplay="admin-approve"]',
      action: adminApprove,
      skipIf: () => step >= 4 || adminApproved,
      preDelayMs: 900,
      postDelayMs: 1800,
    },
    {
      id: "schedule-first-audit",
      labelKey: "openingAuditScheduler",
      targetSelector: '[data-autoplay="schedule-first-audit"]',
      action: () => goTo(5),
      skipIf: () => step >= 5,
      preDelayMs: 600,
    },
    {
      id: "type-step5-title",
      labelKey: "typingAuditTitle",
      targetSelector: '[data-autoplay="step5-title-input"]',
      typeText: titleToType,
      skipIf: () => step >= 6,
      preDelayMs: 350,
      postDelayMs: 500,
    },
    {
      id: "pick-step5-framework",
      labelKey: "selectingComplianceFramework",
      targetSelector: '[data-autoplay="step5-framework-select"]',
      // Switch to the second owned framework if available; otherwise just
      // re-confirm the first (no-op change but still pulses the cursor).
      typeText: selected[1] ?? selected[0] ?? "",
      skipIf: () => step >= 6,
      preDelayMs: 250,
      postDelayMs: 500,
    },
    {
      id: "pick-step5-date",
      labelKey: "pickingDate",
      targetSelector: '[data-autoplay="step5-date-input"]',
      typeText: "2026-06-20",
      skipIf: () => step >= 6,
      preDelayMs: 250,
      postDelayMs: 500,
    },
    {
      id: "type-step5-description",
      labelKey: "typingDescription",
      targetSelector: '[data-autoplay="step5-description-textarea"]',
      typeText: descriptionToType,
      typeSpeedMs: 22,
      skipIf: () => step >= 6,
      preDelayMs: 250,
      postDelayMs: 600,
    },
    {
      id: "pick-step5-lead-auditor",
      labelKey: "selectingLeadAuditor",
      targetSelector: '[data-autoplay="step5-lead-auditor-select"]',
      typeText: "Khalid Al-Mansour (CIA)",
      skipIf: () => step >= 6,
      preDelayMs: 250,
      postDelayMs: 500,
    },
    {
      id: "pick-step5-org-contact",
      labelKey: "selectingOrgContact",
      targetSelector: '[data-autoplay="step5-org-contact-select"]',
      typeText: "Hassan Al-Rashid (Head of Compliance)",
      skipIf: () => step >= 6,
      preDelayMs: 250,
      postDelayMs: 500,
    },
    {
      id: "visit-step5-allow-remote",
      labelKey: "confirmingRemoteSetting",
      targetSelector: '[data-autoplay="step5-allow-remote-checkbox"]',
      skipIf: () => step >= 6,
      preDelayMs: 250,
      postDelayMs: 450,
    },
    {
      id: "visit-step5-signoff",
      labelKey: "confirmingSignoffSetting",
      targetSelector: '[data-autoplay="step5-require-signoff-checkbox"]',
      skipIf: () => step >= 6,
      preDelayMs: 250,
      postDelayMs: 550,
    },
    {
      id: "schedule-audit-final",
      labelKey: "schedulingAudit",
      targetSelector: '[data-autoplay="schedule-audit-final"]',
      action: () => goTo(6),
      skipIf: () => step >= 6,
      preDelayMs: 600,
    },
  ];
}
