"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import {
  Tick02Icon,
  MagicWand01Icon,
  File01Icon,
  AlertCircleIcon,
  Refresh01Icon,
  ArrowLeft01Icon,
} from "hugeicons-react";

type UseCaseKey = "healthcare" | "cybersecurity" | "itGovernance" | "general";
type Phase = 1 | 2 | 3 | 4 | 5 | 6;
type Rating = "compliant" | "noncompliant" | "na" | null;
type Criterion = {
  id: string;
  domain: string;
  control: string;
  title: string;
  expect: string;
  rating: Rating;
};
type LocalFile = { icon: React.ReactNode; name: string; size: string; date: string };
type RequiredDoc = { cat: string; name: string; file: string | null; pattern: string };
type FilePickerContext = "bulk" | "crit" | number | null;

const LOCAL_FILES: LocalFile[] = [
  { icon: <File01Icon size={18} />, name: "Compliance Policy v2.1.pdf", size: "2.4 MB", date: "15 Nov 2025" },
  { icon: <File01Icon size={18} />, name: "سياسة الامتثال.pdf", size: "1.8 MB", date: "22 Nov 2025" },
  { icon: <File01Icon size={18} />, name: "System Configuration Q4-2025.xlsx", size: "512 KB", date: "31 Dec 2025" },
  { icon: <File01Icon size={18} />, name: "Audit Evidence Attestation.pdf", size: "890 KB", date: "12 Jan 2026" },
  { icon: <File01Icon size={18} />, name: "Quarterly Review Q4.csv", size: "128 KB", date: "03 Jan 2026" },
  { icon: <File01Icon size={18} />, name: "Classification-Standard.pdf", size: "1.2 MB", date: "28 Oct 2025" },
  { icon: <File01Icon size={18} />, name: "Management-Plan-v2.docx", size: "760 KB", date: "05 Feb 2026" },
  { icon: <File01Icon size={18} />, name: "Assessment-Results-2026.xlsx", size: "320 KB", date: "18 Apr 2026" },
];

const useCaseConfigs: Record<
  UseCaseKey,
  {
    framework: string;
    domain: string;
    controls: { id: string; name: string }[];
    colors: { primary: string; accent: string; light: string };
  }
> = {
  healthcare: {
    framework: "CBAHI",
    domain: "Healthcare Accreditation",
    controls: [
      { id: "HG", name: "Patient Data Protection" },
      { id: "CG", name: "Clinical Governance" },
      { id: "RM", name: "Risk Management" },
      { id: "CM", name: "Compliance Monitoring" },
      { id: "DM", name: "Documentation Management" },
    ],
    colors: { primary: "rgb(34, 197, 94)", accent: "rgba(34, 197, 94, 0.15)", light: "rgba(34, 197, 94, 0.08)" },
  },
  cybersecurity: {
    framework: "SAMA CSF",
    domain: "Cybersecurity Framework",
    controls: [
      { id: "GOV", name: "Governance & Risk" },
      { id: "ASST", name: "Asset Management" },
      { id: "ACC", name: "Access Control" },
      { id: "RESP", name: "Incident Response" },
      { id: "SUPP", name: "Supply Chain Security" },
    ],
    colors: { primary: "rgb(59, 130, 246)", accent: "rgba(59, 130, 246, 0.15)", light: "rgba(59, 130, 246, 0.08)" },
  },
  itGovernance: {
    framework: "SAMA IT Governance",
    domain: "IT Governance",
    controls: [
      { id: "STRAT", name: "IT Strategy Alignment" },
      { id: "RESRC", name: "Resource Management" },
      { id: "PERF", name: "Performance Monitoring" },
      { id: "RISK", name: "IT Risk Management" },
      { id: "COMP", name: "Compliance Management" },
    ],
    colors: { primary: "rgb(168, 85, 247)", accent: "rgba(168, 85, 247, 0.15)", light: "rgba(168, 85, 247, 0.08)" },
  },
  general: {
    framework: "NCA ECC",
    domain: "Enterprise Compliance",
    controls: [
      { id: "ORG", name: "Organizational Governance" },
      { id: "RISK", name: "Risk Management" },
      { id: "SEC", name: "Security Controls" },
      { id: "OPS", name: "Operational Resilience" },
      { id: "TP", name: "Third-Party Management" },
    ],
    colors: { primary: "rgb(217, 119, 6)", accent: "rgba(217, 119, 6, 0.15)", light: "rgba(217, 119, 6, 0.08)" },
  },
};

export default function UseCasesAuditFlow({
  selectedUseCase,
  onBack,
}: {
  selectedUseCase: UseCaseKey;
  onBack: () => void;
}) {
  const t = useTranslations("demoAudit");
  const config = useCaseConfigs[selectedUseCase];

  const initialRequiredDocs = useCallback(
    (): RequiredDoc[] => {
      const docMaps: Record<UseCaseKey, RequiredDoc[]> = {
        healthcare: [
          { cat: "Policies", name: "Patient Privacy Policy", file: null, pattern: "Compliance Policy v2.1.pdf" },
          { cat: "Governance", name: "Clinical Governance Framework", file: null, pattern: "System Configuration Q4-2025.xlsx" },
        ],
        cybersecurity: [
          { cat: "Security", name: "Information Security Policy", file: null, pattern: "Compliance Policy v2.1.pdf" },
          { cat: "Governance", name: "Risk Management Framework", file: null, pattern: "System Configuration Q4-2025.xlsx" },
        ],
        itGovernance: [
          { cat: "Strategy", name: "IT Strategy Document", file: null, pattern: "Compliance Policy v2.1.pdf" },
          { cat: "Management", name: "Resource Management Plan", file: null, pattern: "Management-Plan-v2.docx" },
        ],
        general: [
          { cat: "Governance", name: "Corporate Governance Policy", file: null, pattern: "Compliance Policy v2.1.pdf" },
          { cat: "Compliance", name: "Compliance Framework", file: null, pattern: "Classification-Standard.pdf" },
        ],
      };
      return docMaps[selectedUseCase] || [];
    },
    [t, selectedUseCase]
  );

  const initialCriteria = useCallback(
    (): Criterion[] => {
      const baseData: Record<UseCaseKey, Criterion[]> = {
        healthcare: [
          { id: "HG-1", domain: "Patient Data Protection", control: "Patient Data Protection", title: "Patient Record Access Controls", expect: "Ensure patient records are accessible only by authorized personnel with documented approval", rating: null },
          { id: "HG-2", domain: "Patient Data Protection", control: "Patient Data Protection", title: "Data Encryption Standards", expect: "All sensitive patient data must be encrypted in transit and at rest using approved algorithms", rating: null },
          { id: "HG-3", domain: "Patient Data Protection", control: "Patient Data Protection", title: "Data Breach Response", expect: "Documented procedures for breach notification and incident response within regulatory timeframes", rating: null },
          { id: "CG-1", domain: "Clinical Governance", control: "Clinical Governance", title: "Clinical Quality Standards", expect: "Established protocols for clinical quality assurance and continuous improvement", rating: null },
          { id: "CG-2", domain: "Clinical Governance", control: "Clinical Governance", title: "Staff Competency Assessment", expect: "Regular competency assessments and continuing education programs for clinical staff", rating: null },
          { id: "CG-3", domain: "Clinical Governance", control: "Clinical Governance", title: "Patient Safety Reporting", expect: "Formal adverse event reporting system with root cause analysis capability", rating: null },
          { id: "RM-1", domain: "Risk Management", control: "Risk Management", title: "Risk Assessment Framework", expect: "Comprehensive risk assessment process covering clinical, operational, and financial risks", rating: null },
          { id: "RM-2", domain: "Risk Management", control: "Risk Management", title: "Risk Mitigation Plans", expect: "Documented risk mitigation strategies with assigned owners and completion targets", rating: null },
          { id: "RM-3", domain: "Risk Management", control: "Risk Management", title: "Risk Monitoring", expect: "Regular monitoring and reporting of identified risks to governance bodies", rating: null },
          { id: "CM-1", domain: "Compliance Monitoring", control: "Compliance Monitoring", title: "Regulatory Compliance Tracking", expect: "Documented tracking of regulatory requirements and compliance status", rating: null },
          { id: "CM-2", domain: "Compliance Monitoring", control: "Compliance Monitoring", title: "Audit Schedule", expect: "Annual internal audit plan covering all critical compliance areas", rating: null },
          { id: "CM-3", domain: "Compliance Monitoring", control: "Compliance Monitoring", title: "Finding Follow-up", expect: "Documented evidence of corrective actions and resolution of audit findings", rating: null },
          { id: "DM-1", domain: "Documentation Management", control: "Documentation Management", title: "Medical Record Standards", expect: "Standard formats and retention policies for all medical records", rating: null },
          { id: "DM-2", domain: "Documentation Management", control: "Documentation Management", title: "Policy Management", expect: "Documented policies with review dates, approvals, and evidence of implementation", rating: null },
          { id: "DM-3", domain: "Documentation Management", control: "Documentation Management", title: "Records Archival", expect: "Secure archival and retrieval processes for historical records", rating: null },
        ],
        cybersecurity: [
          { id: "GOV-1", domain: "Governance & Risk", control: "Governance & Risk", title: "Security Policy Framework", expect: "Comprehensive security policies aligned with SAMA CSF and organizational risk appetite", rating: null },
          { id: "GOV-2", domain: "Governance & Risk", control: "Governance & Risk", title: "Board Cybersecurity Oversight", expect: "Executive and board-level oversight of cybersecurity governance and risk", rating: null },
          { id: "GOV-3", domain: "Governance & Risk", control: "Governance & Risk", title: "Security Risk Assessment", expect: "Annual comprehensive risk assessment with threat modeling and impact analysis", rating: null },
          { id: "ASST-1", domain: "Asset Management", control: "Asset Management", title: "Asset Inventory", expect: "Complete and updated inventory of all IT and security assets", rating: null },
          { id: "ASST-2", domain: "Asset Management", control: "Asset Management", title: "Asset Classification", expect: "Classification of assets based on criticality and sensitivity levels", rating: null },
          { id: "ASST-3", domain: "Asset Management", control: "Asset Management", title: "Vulnerability Management", expect: "Documented vulnerability scanning and patching procedures with SLAs", rating: null },
          { id: "ACC-1", domain: "Access Control", control: "Access Control", title: "Identity Management", expect: "Centralized identity and access management with role-based access controls", rating: null },
          { id: "ACC-2", domain: "Access Control", control: "Access Control", title: "Privileged Access Management", expect: "Documented procedures for privileged account management and monitoring", rating: null },
          { id: "ACC-3", domain: "Access Control", control: "Access Control", title: "Multi-Factor Authentication", expect: "MFA enforced for all critical systems and privileged accounts", rating: null },
          { id: "RESP-1", domain: "Incident Response", control: "Incident Response", title: "Incident Response Plan", expect: "Documented IR plan with clear escalation procedures and contact information", rating: null },
          { id: "RESP-2", domain: "Incident Response", control: "Incident Response", title: "Security Monitoring", expect: "24/7 security event logging and monitoring with alerting mechanisms", rating: null },
          { id: "RESP-3", domain: "Incident Response", control: "Incident Response", title: "Incident Recovery", expect: "Documented recovery procedures and business continuity plans tested annually", rating: null },
          { id: "SUPP-1", domain: "Supply Chain Security", control: "Supply Chain Security", title: "Vendor Assessment", expect: "Security assessment of vendors and third-party service providers", rating: null },
          { id: "SUPP-2", domain: "Supply Chain Security", control: "Supply Chain Security", title: "Supply Chain Monitoring", expect: "Continuous monitoring of supply chain security posture and compliance", rating: null },
          { id: "SUPP-3", domain: "Supply Chain Security", control: "Supply Chain Security", title: "Software Supply Chain", expect: "Controls for software development pipeline security and code integrity", rating: null },
        ],
        itGovernance: [
          { id: "STRAT-1", domain: "IT Strategy", control: "IT Strategy Alignment", title: "IT Strategy Definition", expect: "Documented IT strategy aligned with business objectives and approved by governance", rating: null },
          { id: "STRAT-2", domain: "IT Strategy", control: "IT Strategy Alignment", title: "Digital Roadmap", expect: "Clear digital transformation roadmap with defined milestones and KPIs", rating: null },
          { id: "STRAT-3", domain: "IT Strategy", control: "IT Strategy Alignment", title: "Architecture Standards", expect: "Established enterprise architecture standards and technology selection criteria", rating: null },
          { id: "RESRC-1", domain: "Resource Management", control: "Resource Management", title: "IT Budget Management", expect: "Formal IT budgeting process with resource allocation and cost tracking", rating: null },
          { id: "RESRC-2", domain: "Resource Management", control: "Resource Management", title: "Capacity Planning", expect: "Documented capacity planning process with performance baselines and growth projections", rating: null },
          { id: "RESRC-3", domain: "Resource Management", control: "Resource Management", title: "Skills Assessment", expect: "Workforce skills assessment with training and development programs", rating: null },
          { id: "PERF-1", domain: "Performance Monitoring", control: "Performance Monitoring", title: "Service Metrics", expect: "Defined SLAs and KPIs for IT services with regular monitoring and reporting", rating: null },
          { id: "PERF-2", domain: "Performance Monitoring", control: "Performance Monitoring", title: "System Performance", expect: "Real-time monitoring of system performance with alerting for anomalies", rating: null },
          { id: "PERF-3", domain: "Performance Monitoring", control: "Performance Monitoring", title: "User Satisfaction", expect: "Regular measurement of user satisfaction and IT service quality", rating: null },
          { id: "RISK-1", domain: "IT Risk Management", control: "IT Risk Management", title: "IT Risk Framework", expect: "Comprehensive IT risk identification and assessment framework", rating: null },
          { id: "RISK-2", domain: "IT Risk Management", control: "IT Risk Management", title: "Risk Register", expect: "Maintained risk register with mitigation plans and ownership", rating: null },
          { id: "RISK-3", domain: "IT Risk Management", control: "IT Risk Management", title: "Business Continuity", expect: "BC/DR plans tested at least annually with documented recovery time objectives", rating: null },
          { id: "COMP-1", domain: "Compliance Management", control: "Compliance Management", title: "Regulatory Mapping", expect: "Documented mapping of IT controls to regulatory requirements", rating: null },
          { id: "COMP-2", domain: "Compliance Management", control: "Compliance Management", title: "Compliance Audits", expect: "Internal and external audits of IT controls with management review", rating: null },
          { id: "COMP-3", domain: "Compliance Management", control: "Compliance Management", title: "Policy Enforcement", expect: "Documented enforcement of IT policies and standards", rating: null },
        ],
        general: [
          { id: "ORG-1", domain: "Organizational Governance", control: "Organizational Governance", title: "Board Governance", expect: "Documented board structure with clear roles and responsibilities", rating: null },
          { id: "ORG-2", domain: "Organizational Governance", control: "Organizational Governance", title: "Management Accountability", expect: "Clear accountability frameworks with defined authorities and delegations", rating: null },
          { id: "ORG-3", domain: "Organizational Governance", control: "Organizational Governance", title: "Ethics & Compliance Program", expect: "Formal ethics and compliance program with training and reporting mechanisms", rating: null },
          { id: "RISK-1", domain: "Risk Management", control: "Risk Management", title: "Risk Framework", expect: "Enterprise-wide risk management framework with documented policies", rating: null },
          { id: "RISK-2", domain: "Risk Management", control: "Risk Management", title: "Risk Assessment", expect: "Regular risk assessments across all business areas and risk categories", rating: null },
          { id: "RISK-3", domain: "Risk Management", control: "Risk Management", title: "Risk Reporting", expect: "Regular risk reporting to senior management and board", rating: null },
          { id: "SEC-1", domain: "Security Controls", control: "Security Controls", title: "Access Security", expect: "Security controls for physical and logical access to facilities and systems", rating: null },
          { id: "SEC-2", domain: "Security Controls", control: "Security Controls", title: "Data Security", expect: "Encryption and data protection controls for sensitive information", rating: null },
          { id: "SEC-3", domain: "Security Controls", control: "Security Controls", title: "Security Awareness", expect: "Mandatory security awareness training for all employees", rating: null },
          { id: "OPS-1", domain: "Operational Resilience", control: "Operational Resilience", title: "Change Management", expect: "Formal change management process with testing and approval", rating: null },
          { id: "OPS-2", domain: "Operational Resilience", control: "Operational Resilience", title: "Incident Management", expect: "Formal incident management procedures with escalation paths", rating: null },
          { id: "OPS-3", domain: "Operational Resilience", control: "Operational Resilience", title: "Business Continuity", expect: "BC/DR plans with regular testing and documented recovery procedures", rating: null },
          { id: "TP-1", domain: "Third-Party Management", control: "Third-Party Management", title: "Vendor Risk Assessment", expect: "Assessment of third-party risks before engagement and ongoing monitoring", rating: null },
          { id: "TP-2", domain: "Third-Party Management", control: "Third-Party Management", title: "Vendor Contracts", expect: "Contracts include security and compliance requirements with audit rights", rating: null },
          { id: "TP-3", domain: "Third-Party Management", control: "Third-Party Management", title: "Vendor Compliance", expect: "Regular monitoring of third-party compliance with contractual obligations", rating: null },
        ],
      };
      return baseData[selectedUseCase] || [];
    },
    [selectedUseCase]
  );

  const PHASES: { n: Phase; label: string }[] = [
    { n: 2, label: t("pPrepare") },
    { n: 3, label: t("pExecute") },
    { n: 5, label: t("pReport") },
    { n: 6, label: t("pComplete") },
  ];

  const [phase, setPhase] = useState<Phase>(2);
  const [requiredDocs, setRequiredDocs] = useState<RequiredDoc[]>(initialRequiredDocs);
  const [criteria, setCriteria] = useState<Criterion[]>(initialCriteria);
  const [activeCritIdx, setActiveCritIdx] = useState(0);

  const [filePickerOpen, setFilePickerOpen] = useState(false);
  const [filePickerContext, setFilePickerContext] = useState<FilePickerContext>(null);
  const [selectedFileIdx, setSelectedFileIdx] = useState<number | null>(null);

  const [uploadProgress, setUploadProgress] = useState<{ idx: number; file: LocalFile; pct: number } | null>(null);

  const [aiOverlayOpen, setAiOverlayOpen] = useState(false);
  const [aiVisibleSteps, setAiVisibleSteps] = useState<number>(0);
  const [aiReadyVisible, setAiReadyVisible] = useState(false);
  const [aiFading, setAiFading] = useState(false);

  const [findingLang, setFindingLang] = useState<"en" | "ar">("en");
  const [findingFields, setFindingFields] = useState<{ [k: string]: string }>({
    title: "",
    desc: "",
    root: "",
    impact: "",
    rec: "",
  });
  const [findingSeverity, setFindingSeverity] = useState<"analyzing" | "critical">("analyzing");

  const [rptLang, setRptLang] = useState<"en" | "ar">("en");
  const [rptContentVisible, setRptContentVisible] = useState(false);
  const [rptGrade, setRptGrade] = useState<string>("—");
  const [rptGradeLbl, setRptGradeLbl] = useState<string>(t("computing"));
  const [rptGaugeOffset, setRptGaugeOffset] = useState(170);
  const [rptGaugeVal, setRptGaugeVal] = useState(0);
  const [rptEvCov, setRptEvCov] = useState(0);
  const [rptAiCov, setRptAiCov] = useState(0);
  const [rptCompliant, setRptCompliant] = useState(0);
  const [rptPartial, setRptPartial] = useState(0);
  const [rptNC, setRptNC] = useState(0);
  const [rptNA, setRptNA] = useState(0);
  const [rptInsightsShow, setRptInsightsShow] = useState<{ strengths: boolean[]; concerns: boolean[]; wins: boolean[] }>({
    strengths: [],
    concerns: [],
    wins: [],
  });
  const [rptDomains, setRptDomains] = useState<{ name: string; pct: number; cls: string; widthShown: number }[]>([]);
  const [rptNarrativeEN, setRptNarrativeEN] = useState("");
  const [rptNarrativeAR, setRptNarrativeAR] = useState("");
  const [rptNarrativeCaretEN, setRptNarrativeCaretEN] = useState(false);
  const [rptNarrativeCaretAR, setRptNarrativeCaretAR] = useState(false);
  const [rptRiskMetrics, setRptRiskMetrics] = useState<{ riskScore: number; riskLevel: string; criticalCount: number; highCount: number }[]>([]);
  const [rptRecommendationsShow, setRptRecommendationsShow] = useState<boolean[]>([]);
  const [rptMetricsShow, setRptMetricsShow] = useState<boolean>(false);

  const [signState, setSignState] = useState<"idle" | "processing" | "complete">("idle");
  const [sigHash, setSigHash] = useState<string>("a3c2·f81d·5b90·22ee·6a5a·e7a6·1d20·bb9f");
  const [sigTimestamp, setSigTimestamp] = useState<string>("2026-04-18 16:22 AST");

  const [toast, setToast] = useState<{ title: string; sub: string; show: boolean }>({
    title: "",
    sub: "",
    show: false,
  });

  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typewriterTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const typewriterIntervalsRef = useRef<ReturnType<typeof setInterval>[]>([]);

  useEffect(() => {
    const panel = document.querySelector(".panel");
    if (panel) {
      window.scrollTo({
        top: (panel as HTMLElement).offsetTop - 40,
        behavior: "smooth",
      });
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 6 && signState === "idle") {
      const t1 = setTimeout(() => signAudit(), 400);
      return () => clearTimeout(t1);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 5) {
      startReport();
    }
  }, [phase]);

  const showToast = useCallback((title: string, sub: string) => {
    setToast({ title, sub, show: true });
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToast((s) => ({ ...s, show: false }));
    }, 3500);
  }, []);

  const goTo = (n: Phase) => {
    setPhase(n);
  };

  const prepLinked = requiredDocs.filter((d) => d.file).length;
  const prepTotal = requiredDocs.length;
  const prepPct = Math.round((prepLinked / Math.max(1, prepTotal)) * 100);
  const prepCirc = 377;
  const prepRingOffset = prepCirc - (prepPct / 100) * prepCirc;
  const [prepAutoHint, setPrepAutoHint] = useState(false);

  const openFilePicker = (ctx: FilePickerContext) => {
    setFilePickerContext(ctx);
    setSelectedFileIdx(null);
    setFilePickerOpen(true);
    const expected = typeof ctx === "number" ? requiredDocs[ctx]?.pattern : null;
    if (expected) {
      const idx = LOCAL_FILES.findIndex((f) => f.name === expected);
      if (idx > -1) {
        setTimeout(() => setSelectedFileIdx(idx), 300);
      }
    }
  };

  const closeFilePicker = () => {
    setFilePickerOpen(false);
  };

  const confirmFilePicker = () => {
    if (selectedFileIdx === null) return;
    const file = LOCAL_FILES[selectedFileIdx];
    closeFilePicker();
    simulateUpload(file);
  };

  const simulateUpload = (file: LocalFile) => {
    const ctx = filePickerContext;
    if (ctx === "bulk") {
      requiredDocs.forEach((d, i) => {
        const match = LOCAL_FILES.find((f) => f.name === d.pattern);
        if (match) {
          setTimeout(() => {
            setRequiredDocs((prev) => {
              const next = [...prev];
              next[i] = { ...next[i], file: match.name };
              return next;
            });
            showToast(t("toastDocLinked"), d.name);
          }, i * 250);
        }
      });
      return;
    }
    if (ctx === "crit") {
      showToast(t("toastEvidenceLinked"), file.name + " → CR-" + criteria[activeCritIdx].id);
      return;
    }
    if (typeof ctx === "number") {
      let p = 0;
      setUploadProgress({ idx: ctx, file, pct: 0 });
      const int = setInterval(() => {
        p += 8 + Math.random() * 12;
        if (p >= 100) p = 100;
        setUploadProgress((prev) => (prev ? { ...prev, pct: p } : prev));
        if (p >= 100) {
          clearInterval(int);
          setTimeout(() => {
            setUploadProgress(null);
            setRequiredDocs((prev) => {
              const next = [...prev];
              next[ctx] = { ...next[ctx], file: file.name };
              return next;
            });
            showToast(t("toastEvidenceLinked"), file.name);
            setPrepAutoHint(true);
            setTimeout(() => {
              setPrepAutoHint(false);
              goTo(3);
            }, 900);
          }, 350);
        }
      }, 90);
    }
  };

  const selectRating = (r: Rating) => {
    setCriteria((prev) => {
      const next = [...prev];
      next[activeCritIdx] = { ...next[activeCritIdx], rating: r };
      return next;
    });
    const isLast = activeCritIdx === criteria.length - 1;
    if (!isLast) {
      setAdvancingHint(true);
      setTimeout(() => {
        setAdvancingHint(false);
        setActiveCritIdx((i) => Math.min(criteria.length - 1, i + 1));
      }, 600);
    }
  };

  const [advancingHint, setAdvancingHint] = useState(false);
  const jumpCrit = (i: number) => setActiveCritIdx(i);

  const findingData = {
    en: {
      title: t("fdEnTitle"),
      desc: t("fdEnDesc"),
      root: t("fdEnRoot"),
      impact: t("fdEnImpact"),
      rec: t("fdEnRec"),
    },
    ar: {
      title: t("fdArTitle"),
      desc: t("fdArDesc"),
      root: t("fdArRoot"),
      impact: t("fdArImpact"),
      rec: t("fdArRec"),
    },
  };

  const clearTypewriter = () => {
    typewriterTimersRef.current.forEach((t) => clearTimeout(t));
    typewriterIntervalsRef.current.forEach((t) => clearInterval(t));
    typewriterTimersRef.current = [];
    typewriterIntervalsRef.current = [];
  };

  const typeText = (key: string, txt: string, done: () => void) => {
    let i = 0;
    const speed = Math.max(6, 18 - txt.length / 20);
    const int = setInterval(() => {
      i += 3;
      const slice = txt.slice(0, i);
      setFindingFields((prev) => ({ ...prev, [key]: slice }));
      if (i >= txt.length) {
        setFindingFields((prev) => ({ ...prev, [key]: txt }));
        clearInterval(int);
        done();
      }
    }, speed);
    typewriterIntervalsRef.current.push(int);
  };

  const regenerateFinding = () => {
    clearTypewriter();
    setFindingSeverity("analyzing");
    setFindingFields({ title: "", desc: "", root: "", impact: "", rec: "" });

    const fields = ["title", "desc", "root", "impact", "rec"] as const;
    let i = 0;
    const next = () => {
      if (i >= fields.length) {
        setFindingSeverity("critical");
        return;
      }
      const k = fields[i];
      typeText(k, findingData.en[k], () => {
        i++;
        const t2 = setTimeout(next, 200);
        typewriterTimersRef.current.push(t2);
      });
    };
    const t0 = setTimeout(next, 400);
    typewriterTimersRef.current.push(t0);
  };

  useEffect(() => {
    if (phase === 4) {
      regenerateFinding();
    } else if (phase !== 5) {
      clearTypewriter();
    }
    return () => clearTypewriter();
  }, [phase]);

  const acceptFinding = () => {
    showToast(t("toastFindingCreated"), "FND-2026-Q1-002 " + t("toastFindingAdded"));
    setTimeout(() => goTo(5), 700);
  };

  const triggerAIAnimation = () => {
    setAiOverlayOpen(true);
    setAiVisibleSteps(0);
    setAiReadyVisible(false);
    setAiFading(false);

    const stepCount = 5;
    const stepDelay = 720;
    const stepStart = 300;

    for (let i = 0; i < stepCount; i++) {
      const to = setTimeout(() => setAiVisibleSteps((v) => Math.max(v, i + 1)), i * stepDelay + stepStart);
      typewriterTimersRef.current.push(to);
    }

    const totalDelay = stepCount * stepDelay + 900;
    const tReady = setTimeout(() => setAiReadyVisible(true), totalDelay);
    typewriterTimersRef.current.push(tReady);

    const tFade = setTimeout(() => {
      setAiFading(true);
      const tClose = setTimeout(() => {
        setAiOverlayOpen(false);
        setAiFading(false);
        setAiVisibleSteps(0);
        setAiReadyVisible(false);
        goTo(5);
      }, 700);
      typewriterTimersRef.current.push(tClose);
    }, totalDelay + 1100);
    typewriterTimersRef.current.push(tFade);
  };

  const animateValTo = (setter: (n: number) => void, target: number, dur = 1500) => {
    const start = Date.now();
    const int = setInterval(() => {
      const p = Math.min((Date.now() - start) / dur, 1);
      const val = Math.round(p * target);
      setter(val);
      if (p >= 1) clearInterval(int);
    }, 30);
    typewriterIntervalsRef.current.push(int);
  };

  const startReport = () => {
    const total = criteria.length;
    const compliant = criteria.filter((c) => c.rating === "compliant").length;
    const nc = criteria.filter((c) => c.rating === "noncompliant").length;
    const na = criteria.filter((c) => c.rating === "na").length;
    const partial = total - compliant - nc - na;
    const score = Math.round((compliant / Math.max(1, total)) * 100);
    const grade = score >= 90 ? "A" : score >= 75 ? "B+" : score >= 60 ? "B" : "C+";
    const gradeLbl =
      score >= 90 ? t("gradeExcellent") : score >= 75 ? t("gradeGood") : score >= 60 ? t("gradeSatisfactory") : t("gradeNeedsWork");

    setRptContentVisible(false);
    setRptGrade("—");
    setRptGradeLbl(t("computing"));
    setRptGaugeOffset(170);
    setRptGaugeVal(0);
    setRptEvCov(0);
    setRptAiCov(0);
    setRptCompliant(0);
    setRptPartial(0);
    setRptNC(0);
    setRptNA(0);
    setRptNarrativeEN("");
    setRptNarrativeAR("");
    setRptNarrativeCaretEN(true);
    setRptNarrativeCaretAR(true);

    const t1 = setTimeout(() => setRptContentVisible(true), 80);
    typewriterTimersRef.current.push(t1);

    const t2 = setTimeout(() => {
      setRptGrade(grade);
      setRptGradeLbl(gradeLbl);
    }, 200);
    typewriterTimersRef.current.push(t2);

    const len = 170;
    const t3 = setTimeout(() => setRptGaugeOffset(len - (score / 100) * len), 300);
    typewriterTimersRef.current.push(t3);

    animateValTo(setRptGaugeVal, score, 1600);
    animateValTo(setRptEvCov, 100, 1200);
    animateValTo(setRptAiCov, 100, 1400);

    typewriterTimersRef.current.push(setTimeout(() => animateValTo(setRptCompliant, compliant, 1000), 250));
    typewriterTimersRef.current.push(setTimeout(() => animateValTo(setRptPartial, partial, 1000), 500));
    typewriterTimersRef.current.push(setTimeout(() => animateValTo(setRptNC, nc, 1000), 750));
    typewriterTimersRef.current.push(setTimeout(() => animateValTo(setRptNA, na, 1000), 1000));

    const strengths = [t("insStrength1"), t("insStrength2"), t("insStrength3")];
    const concerns = [nc > 0 ? t("insConcern1Nc") : t("insConcern1Ok"), t("insConcern2")];
    const wins = [t("insWin1"), t("insWin2"), t("insWin3")];
    setRptInsightsShow({
      strengths: strengths.map(() => false),
      concerns: concerns.map(() => false),
      wins: wins.map(() => false),
    });

    const animateListShow = (key: "strengths" | "concerns" | "wins", arr: string[]) => {
      arr.forEach((_, i) => {
        const tt = setTimeout(() => {
          setRptInsightsShow((prev) => {
            const arrCopy = [...prev[key]];
            arrCopy[i] = true;
            return { ...prev, [key]: arrCopy };
          });
        }, 600 + i * 120);
        typewriterTimersRef.current.push(tt);
      });
    };
    animateListShow("strengths", strengths);
    animateListShow("concerns", concerns);
    animateListShow("wins", wins);

    const controlMetrics = config.controls.map((ctrl) => {
      const ctrlCriteria = criteria.filter((c) => c.control === ctrl.name);
      const compliantCnt = ctrlCriteria.reduce((a, c) => a + (c.rating === "compliant" ? 1 : 0), 0);
      const pct = Math.round((compliantCnt / Math.max(1, ctrlCriteria.length)) * 100);
      return {
        name: ctrl.name,
        pct,
        cls: pct < 50 ? "bad" : pct < 75 ? "warn" : "",
        widthShown: 0,
      };
    });
    setRptDomains(controlMetrics);
    typewriterTimersRef.current.push(
      setTimeout(() => {
        setRptDomains((prev) => prev.map((d) => ({ ...d, widthShown: d.pct })));
      }, 500)
    );

    const recommendations = [
      { text: "Prioritize remediation of critical findings in high-risk control domains.", show: false },
      { text: "Implement enhanced monitoring for partially compliant controls within 30 days.", show: false },
      { text: "Establish governance oversight for identified control improvement areas.", show: false },
    ];
    setRptRecommendationsShow(recommendations.map(() => false));
    recommendations.forEach((_, i) => {
      const tt = setTimeout(() => {
        setRptRecommendationsShow((prev) => {
          const copy = [...prev];
          copy[i] = true;
          return copy;
        });
      }, 1200 + i * 150);
      typewriterTimersRef.current.push(tt);
    });

    const tMetrics = setTimeout(() => setRptMetricsShow(true), 1500);
    typewriterTimersRef.current.push(tMetrics);

    const narrativeEN = t("narrativeEN", {
      solidOrDeveloping: score >= 75 ? t("solid") : t("developing"),
      score,
      total,
      ncLine: nc > 0 ? t("ncLineEN") : t("noCriticalEN"),
    });
    const narrativeAR = t("narrativeAR", {
      solidOrDeveloping: score >= 75 ? t("solidAr") : t("developingAr"),
      score,
      total,
      ncLine: nc > 0 ? t("ncLineAR") : t("noCriticalAR"),
    });

    const streamText = (text: string, setter: (s: string) => void, caretSetter: (b: boolean) => void, delay: number) => {
      const tt = setTimeout(() => {
        let n = 0;
        const int = setInterval(() => {
          n += 5;
          const slice = text.slice(0, n);
          setter(slice);
          if (n >= text.length) {
            setter(text);
            caretSetter(false);
            clearInterval(int);
          }
        }, 16);
        typewriterIntervalsRef.current.push(int);
      }, delay);
      typewriterTimersRef.current.push(tt);
    };

    streamText(narrativeEN, setRptNarrativeEN, setRptNarrativeCaretEN, 700);
    streamText(narrativeAR, setRptNarrativeAR, setRptNarrativeCaretAR, 700);
  };

  const downloadReport = () => {
    showToast(t("toastDownloadStarted"), "ArabAudit-Sample-Report.pdf");
  };

  const signAudit = () => {
    setSignState("processing");
    setTimeout(() => {
      const hash = Array.from({ length: 8 }, () => Math.random().toString(16).slice(2, 6)).join("·");
      const now = new Date();
      const ts = now.toISOString().slice(0, 16).replace("T", " ") + " AST";
      setSigHash(hash);
      setSigTimestamp(ts);
      setSignState("complete");
      showToast(t("toastSigned"), t("toastSignedSub"));
    }, 1800);
  };

  const resetDemo = () => {
    clearTypewriter();
    setRequiredDocs(initialRequiredDocs());
    setCriteria(initialCriteria());
    setActiveCritIdx(0);
    setSignState("idle");
    setRptContentVisible(false);
    goTo(2);
  };

  const curIdx = PHASES.findIndex((p) => p.n === phase);
  const pct = PHASES.length <= 1 ? 100 : (curIdx / (PHASES.length - 1)) * 100;

  return (
    <>
      {/* HERO + STEPPER */}
      <section className="demo-hero">
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
              marginBottom: 24,
            }}
          >
            <button
              type="button"
              onClick={onBack}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 16px",
                background: "rgba(232,184,75,.12)",
                border: "1px solid rgba(232,184,75,.3)",
                borderRadius: 6,
                color: "var(--gold-3)",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              <ArrowLeft01Icon size={16} /> Back
            </button>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                borderRadius: 999,
                background: "rgba(232,184,75,.12)",
                border: "1px solid rgba(232,184,75,.3)",
                fontFamily: "var(--f-mono)",
                fontSize: 10,
                letterSpacing: ".14em",
                color: "var(--gold-3)",
                textTransform: "uppercase",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold-3)" }} />
              <span>{config.framework}</span>
            </div>
          </div>
          <h1
            style={{
              fontFamily: "var(--f-serif)",
              fontSize: "clamp(40px, 6vw, 76px)",
              fontWeight: 400,
              letterSpacing: "-0.03em",
              lineHeight: 0.98,
              marginTop: 20,
              color: "var(--cream-1)",
              maxWidth: 820,
            }}
          >
            {config.domain}
            <br />
            <span style={{ color: "var(--gold-3)", fontStyle: "italic" }}>{t("heroTitleB")}</span>
          </h1>
          <p
            style={{
              color: "rgba(247,243,234,.72)",
              fontFamily: "var(--f-serif)",
              fontWeight: 300,
              fontSize: "clamp(15px, 1.3vw, 19px)",
              lineHeight: 1.55,
              maxWidth: 620,
              marginTop: 20,
            }}
          >
            {t("heroLede")}
          </p>

          <div
            className="stepper"
            style={{ marginTop: 36, ["--step-progress" as string]: pct } as unknown as React.CSSProperties}
          >
            {PHASES.map((p, i) => {
              const myIdx = PHASES.findIndex((x) => x.n === p.n);
              const active = p.n === phase;
              const done = myIdx < curIdx;
              return (
                <button
                  key={p.n}
                  type="button"
                  className={`step${active ? " active" : ""}${done ? " done" : ""}`}
                  onClick={() => goTo(p.n)}
                >
                  <div className="circle">
                    <span>{i + 1}</span>
                  </div>
                  <div className="label">{p.label}</div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* PANEL */}
      <section className="panel">
        <div className="stage">
          {/* ===== PHASE 2: PREPARE ===== */}
          {phase === 2 && (
            <div>
              <div className="stage-badge">
                <span className="dot" />
                <span>{t("p2Badge")}</span>
              </div>
              <h2 className="stage-h1">{t("p2Title")}</h2>
              <p className="stage-sub">{t("p2Sub")}</p>

              <div className="app-card">
                <AppTopbar url={`arabaudit.com / audits / USE-${selectedUseCase} / prepare`} />
                <div className="app-content">
                  <div className="prepare-layout">
                    <div className="prepare-sidebar">
                      <div className="prep-ring">
                        <svg viewBox="0 0 140 140">
                          <circle className="track" cx="70" cy="70" r="60" />
                          <circle
                            className="fill"
                            cx="70"
                            cy="70"
                            r="60"
                            style={{ strokeDashoffset: prepRingOffset }}
                          />
                        </svg>
                        <div className="percent">
                          <div className="n">{prepPct}%</div>
                          <div className="l">{t("ready")}</div>
                        </div>
                      </div>
                      <div style={{ textAlign: "center", marginTop: 14 }}>
                        <div style={{ fontSize: 13, color: "var(--aa-slate-800)", fontWeight: 500 }}>
                          {prepLinked} {t("ofWord")} {prepTotal} {t("linkedWord")}
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--f-mono)",
                            fontSize: 10,
                            color: prepLinked === prepTotal ? "var(--aa-green-600)" : "var(--aa-slate-600)",
                            letterSpacing: ".1em",
                            marginTop: 4,
                          }}
                        >
                          {prepLinked === prepTotal ? t("readyLaunching") : t("prepNeeded")}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                        <div>
                          <div
                            style={{
                              fontFamily: "var(--f-mono)",
                              fontSize: 10,
                              color: "var(--aa-gold-dark)",
                              letterSpacing: ".12em",
                              textTransform: "uppercase",
                            }}
                          >
                            {t("reqEvidence")}
                          </div>
                          <div style={{ fontSize: 13, color: "var(--aa-slate-600)", marginTop: 2 }}>
                            {t("uploadCybersec")}
                          </div>
                        </div>
                        <button
                          type="button"
                          className="btn-aa ghost btn-sm"
                          onClick={() => openFilePicker("bulk")}
                        >
                          <File01Icon size={14} /> {t("uploadAndLink")}
                        </button>
                      </div>

                      <div id="required-docs">
                        {requiredDocs.map((d, i) => (
                          <div
                            className={`req-doc ${d.file ? "linked" : "pending"}`}
                            key={i}
                            data-idx={i}
                          >
                            <div className="info">
                              <div className="cat">{d.cat}</div>
                              <div className="name">{d.name}</div>
                              {d.file ? (
                                <div className="file">
                                  <Tick02Icon size={12} /> {d.file}
                                </div>
                              ) : (
                                <div style={{ fontSize: 11, color: "var(--aa-slate-400)", marginTop: 2 }}>
                                  {t("noDocLinked")}
                                </div>
                              )}
                            </div>
                            <button
                              type="button"
                              className="btn-aa ghost btn-sm"
                              onClick={() => openFilePicker(i)}
                            >
                              {d.file ? (
                                <>
                                  <Refresh01Icon size={14} /> {t("replace")}
                                </>
                              ) : (
                                <>+ {t("upload")}</>
                              )}
                            </button>
                            <div className="status-icon">
                              {d.file ? <Tick02Icon size={14} /> : <span className="dot-pending" />}
                            </div>
                          </div>
                        ))}
                        {uploadProgress && (
                          <div className="upload-progress show">
                            <div className="up-icon">{uploadProgress.file.icon}</div>
                            <div className="up-info">
                              <div className="up-name">{uploadProgress.file.name}</div>
                              <div className="up-meta">
                                {t("uploading")} · <span className="pct">{uploadProgress.pct.toFixed(0)}%</span>
                              </div>
                              <div className="up-bar">
                                <div className="up-fill" style={{ width: uploadProgress.pct + "%" }} />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {prepAutoHint && (
                    <div
                      style={{
                        textAlign: "center",
                        marginTop: 20,
                        color: "var(--aa-slate-600)",
                        fontSize: 13,
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          width: 12,
                          height: 12,
                          border: "2px solid rgba(11,70,52,.2)",
                          borderTopColor: "var(--aa-primary)",
                          borderRadius: "50%",
                          animation: "spin .8s linear infinite",
                          verticalAlign: "middle",
                          marginRight: 8,
                        }}
                      />
                      {t("evidenceLinkedLaunching")}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ===== PHASE 3: EXECUTE ===== */}
          {phase === 3 && <ExecutePhase />}

          {/* ===== PHASE 5: REPORT ===== */}
          {phase === 5 && (
            <div>
              <div className="stage-badge">
                <span className="dot" style={{ background: "var(--aa-gold)" }} />
                <span>{t("p5Badge")}</span>
              </div>
              <h2 className="stage-h1">{t("p5Title")}</h2>
              <p className="stage-sub">{t("p5Sub")}</p>

              <div className="app-card">
                <AppTopbar url={`arabaudit.com / audits / USE-${selectedUseCase} / report`} />
                <div
                  className="app-content"
                  style={{ opacity: rptContentVisible ? 1 : 0, transition: "opacity .5s" }}
                >
                  <div className="ov-header">
                    <div>
                      <div className="ov-label">{t("overviewReport")} · USE-{selectedUseCase.toUpperCase()}</div>
                      <h3 className="ov-title">{t("q1Assessment")}</h3>
                      <div className="ov-facts">
                        <span className="ov-fact">{config.domain}</span>
                        <span className="ov-fact">{config.framework} · v2024</span>
                        <span className="ov-fact">18 April 2026</span>
                        <span className="ov-fact">ArabAudit Demo</span>
                      </div>
                    </div>
                    <div className="ov-grade-wrap">
                      <div className="ov-grade">{rptGrade}</div>
                      <div className="ov-grade-lbl">{rptGradeLbl}</div>
                      <div className="ov-score-wrap">
                        <div className="ov-score-gauge">
                          <svg viewBox="0 0 120 65" width={120} height={65}>
                            <path className="rg-track" d="M 10,55 A 45,45 0 0 1 110,55" />
                            <path
                              className="rg-fill"
                              d="M 10,55 A 45,45 0 0 1 110,55"
                              style={{ strokeDashoffset: rptGaugeOffset }}
                            />
                          </svg>
                          <div className="ov-gauge-val">{rptGaugeVal}%</div>
                        </div>
                        <div className="ov-evidence-row">
                          <div className="ov-mini-stat">
                            <span>{rptEvCov}%</span>
                            <span className="ov-mini-lbl">{t("evidence")}</span>
                          </div>
                          <div className="ov-mini-stat">
                            <span>{rptAiCov}%</span>
                            <span className="ov-mini-lbl">{t("aiValidated")}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ov-stats">
                    <div className="ov-stat ov-green">
                      <div className="ov-stat-n">{rptCompliant}</div>
                      <div className="ov-stat-l">{t("compliant")}</div>
                    </div>
                    <div className="ov-stat ov-amber">
                      <div className="ov-stat-n">{rptPartial}</div>
                      <div className="ov-stat-l">{t("partial")}</div>
                    </div>
                    <div className="ov-stat ov-red">
                      <div className="ov-stat-n">{rptNC}</div>
                      <div className="ov-stat-l">{t("nonCompliant")}</div>
                    </div>
                    <div className="ov-stat ov-slate">
                      <div className="ov-stat-n">{rptNA}</div>
                      <div className="ov-stat-l">N/A</div>
                    </div>
                  </div>

                  <div style={{ padding: "1.5rem", background: "rgba(59, 130, 246, 0.05)", borderRadius: 8, border: "1px solid rgba(59, 130, 246, 0.1)", marginTop: "1.5rem" }}>
                    <div style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "#999", fontWeight: 600, marginBottom: "1rem", letterSpacing: "0.5px" }}>
                      Audit Metrics
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem" }}>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "rgb(59, 130, 246)", marginBottom: "0.25rem" }}>
                          {criteria.length}
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "#666" }}>Total Controls</div>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "rgb(34, 197, 94)", marginBottom: "0.25rem" }}>
                          {Math.round(((rptCompliant + rptPartial) / criteria.length) * 100)}%
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "#666" }}>Compliance Rate</div>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "rgb(217, 119, 6)", marginBottom: "0.25rem" }}>
                          {rptNC}
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "#666" }}>Critical Gaps</div>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#3b82f6", marginBottom: "0.25rem" }}>
                          {config.controls.length}
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "#666" }}>Control Domains</div>
                      </div>
                    </div>
                  </div>

                  <div className="ov-insights">
                    <div className="ov-insight ov-insight-green">
                      <div className="ov-insight-head">
                        <Tick02Icon size={14} /> {t("strengths")}
                      </div>
                      <ul className="ov-insight-list">
                        {[t("insStrength1"), t("insStrength2"), t("insStrength3")].map((s, i) => (
                          <li key={i} className={rptInsightsShow.strengths[i] ? "show" : ""}>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="ov-insight ov-insight-amber">
                      <div className="ov-insight-head">
                        <AlertCircleIcon size={14} /> {t("concerns")}
                      </div>
                      <ul className="ov-insight-list">
                        {[
                          rptNC > 0 ? t("insConcern1Nc") : t("insConcern1Ok"),
                          t("insConcern2"),
                        ].map((s, i) => (
                          <li key={i} className={rptInsightsShow.concerns[i] ? "show" : ""}>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="ov-insight ov-insight-blue">
                      <div className="ov-insight-head">
                        <MagicWand01Icon size={14} /> {t("quickWins")}
                      </div>
                      <ul className="ov-insight-list">
                        {[t("insWin1"), t("insWin2"), t("insWin3")].map((s, i) => (
                          <li key={i} className={rptInsightsShow.wins[i] ? "show" : ""}>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="ov-section">
                    <div className="ov-section-head">{t("domainPerformance")}</div>
                    <div>
                      {rptDomains.map((d, i) => (
                        <div className={`domain-bar ${d.cls}`} key={i}>
                          <div className="dname">{d.name}</div>
                          <div className="dbar">
                            <div
                              className="dfill"
                              style={{ width: d.widthShown + "%" }}
                            />
                          </div>
                          <div className="dval">{d.pct}%</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="ov-section" style={{ opacity: rptMetricsShow ? 1 : 0, transition: "opacity .4s", borderTop: "1px solid rgba(200, 200, 200, 0.1)", paddingTop: "1.5rem", marginTop: "1.5rem" }}>
                    <div className="ov-section-head" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <MagicWand01Icon size={16} /> AI-Powered Recommendations
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {["Prioritize remediation of critical findings in high-risk control domains.", "Implement enhanced monitoring for partially compliant controls within 30 days.", "Establish governance oversight for identified control improvement areas."].map(
                        (rec, i) => (
                          <div
                            key={i}
                            style={{
                              padding: "12px 14px",
                              background: "rgba(59, 130, 246, 0.08)",
                              border: "1px solid rgba(59, 130, 246, 0.15)",
                              borderRadius: 6,
                              fontSize: "0.9rem",
                              color: "#333",
                              lineHeight: 1.5,
                              opacity: rptRecommendationsShow[i] ? 1 : 0,
                              transform: rptRecommendationsShow[i] ? "translateX(0)" : "translateX(-10px)",
                              transition: "all .3s ease",
                            }}
                          >
                            • {rec}
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="ov-section">
                    <div className="ov-section-head">{t("aiExecSummary")}</div>
                    <div className="lang-tabs" style={{ marginBottom: 0 }}>
                      <button
                        type="button"
                        className={`lang-tab${rptLang === "en" ? " active" : ""}`}
                        onClick={() => setRptLang("en")}
                      >
                        English
                      </button>
                      <button
                        type="button"
                        className={`lang-tab${rptLang === "ar" ? " active" : ""}`}
                        onClick={() => setRptLang("ar")}
                      >
                        عربي
                      </button>
                    </div>
                    {rptLang === "en" ? (
                      <div className="narrative-box" style={{ borderRadius: "0 8px 8px 8px", minHeight: 100 }}>
                        <span>{rptNarrativeEN}</span>
                        {rptNarrativeCaretEN && <span className="caret" />}
                      </div>
                    ) : (
                      <div
                        className="narrative-box"
                        dir="rtl"
                        style={{
                          fontFamily: "var(--f-arabic)",
                          borderRadius: "0 8px 8px 8px",
                          minHeight: 100,
                        }}
                      >
                        <span>{rptNarrativeAR}</span>
                        {rptNarrativeCaretAR && <span className="caret" />}
                      </div>
                    )}
                  </div>

                  <div className="nav-actions">
                    <button type="button" className="btn-aa ghost" onClick={() => goTo(3)}>
                      {t("reviewCriteria")}
                    </button>
                    <div style={{ display: "flex", gap: 10 }}>
                      <button type="button" className="btn-aa ghost" onClick={downloadReport}>
                        <File01Icon size={14} /> {t("downloadPdf")}
                      </button>
                      <button type="button" className="btn-aa gold" onClick={() => goTo(6)}>
                        {t("signLockAudit")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===== PHASE 6: SIGN ===== */}
          {phase === 6 && (
            <div>
              <div className="stage-badge">
                <span className="dot" style={{ background: "var(--aa-green-500)" }} />
                <span>{t("p6Badge")}</span>
              </div>
              <h2 className="stage-h1">{t("p6Title")}</h2>
              <p className="stage-sub">{t("p6Sub")}</p>

              <div className="app-card">
                <AppTopbar url={`arabaudit.com / audits / USE-${selectedUseCase} / sign`} />
                <div className="app-content">
                  {signState === "idle" && (
                    <div className="sign-panel">
                      <div className="sign-ring">
                        <MagicWand01Icon size={36} />
                      </div>
                      <h3
                        style={{
                          fontFamily: "var(--f-serif)",
                          fontSize: 26,
                          color: "var(--aa-primary)",
                          margin: "0 0 8px",
                          fontWeight: 500,
                        }}
                      >
                        {t("lockSignAudit")}
                      </h3>
                      <p
                        style={{
                          color: "var(--aa-slate-600)",
                          fontSize: 14,
                          margin: "0 auto 28px",
                          maxWidth: 440,
                        }}
                      >
                        {t("lockSignBody")}
                      </p>
                      <button type="button" className="btn-aa gold" onClick={signAudit}>
                        <File01Icon size={16} /> {t("signSession")}
                      </button>
                    </div>
                  )}

                  {signState === "processing" && (
                    <div className="sign-panel">
                      <div className="processing" style={{ padding: "40px 20px" }}>
                        <div className="spinner" style={{ width: 64, height: 64 }}>
                          <svg viewBox="0 0 80 80">
                            <circle className="track" cx="40" cy="40" r="34" />
                            <circle
                              className="bar"
                              cx="40"
                              cy="40"
                              r="34"
                              style={{ strokeDashoffset: 80 }}
                            />
                          </svg>
                          <div className="ico">
                            <MagicWand01Icon size={26} />
                          </div>
                        </div>
                        <h3
                          style={{
                            fontFamily: "var(--f-serif)",
                            fontSize: 20,
                            color: "var(--aa-primary)",
                            margin: "16px 0 6px",
                            fontWeight: 500,
                          }}
                        >
                          {t("anchoringLedger")}
                        </h3>
                        <p style={{ color: "var(--aa-slate-600)", fontSize: 12 }}>
                          {t("computingHash")}
                        </p>
                      </div>
                    </div>
                  )}

                  {signState === "complete" && (
                    <div className="sign-panel">
                      <div
                        className="sign-ring pop-in"
                        style={{
                          background: "rgba(34,197,94,.12)",
                          borderColor: "var(--aa-green-500)",
                          color: "var(--aa-green-600)",
                        }}
                      >
                        <Tick02Icon size={36} />
                      </div>
                      <h3
                        style={{
                          fontFamily: "var(--f-serif)",
                          fontSize: 28,
                          color: "var(--aa-primary)",
                          margin: "0 0 8px",
                          fontWeight: 500,
                        }}
                      >
                        {t("auditComplete")}
                      </h3>
                      <p style={{ color: "var(--aa-slate-600)", fontSize: 14, margin: "0 0 20px" }}>
                        {t("auditCompleteSub")}
                      </p>

                      <div className="sig-pad">
                        <div className="row">
                          <span className="k">{t("sigAuditId")}</span>
                          <span className="v" style={{ color: "var(--aa-gold-dark)" }}>
                            USE-{selectedUseCase.toUpperCase()}
                          </span>
                        </div>
                        <div className="row">
                          <span className="k">{t("sigFramework")}</span>
                          <span className="v">{config.framework} · v2024</span>
                        </div>
                        <div className="row">
                          <span className="k">{t("sigComplianceScore")}</span>
                          <span className="v">87%</span>
                        </div>
                        <div className="row">
                          <span className="k">{t("sigSignedBy")}</span>
                          <span className="v">ArabAudit Demo</span>
                        </div>
                        <div className="row">
                          <span className="k">{t("sigSignedAt")}</span>
                          <span className="v">{sigTimestamp}</span>
                        </div>
                        <div className="row">
                          <span className="k">SHA-256</span>
                          <span className="v" style={{ fontSize: 10 }}>
                            {sigHash}
                          </span>
                        </div>
                        <div className="row">
                          <span className="k">{t("sigStatus")}</span>
                          <span className="v" style={{ color: "var(--aa-green-600)" }}>
                            {t("sigLocked")}
                          </span>
                        </div>
                      </div>

                      <div
                        style={{
                          marginTop: 24,
                          display: "flex",
                          gap: 10,
                          justifyContent: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        <button type="button" className="btn-aa ghost" onClick={downloadReport}>
                          <File01Icon size={14} /> {t("downloadSignedPdf")}
                        </button>
                        <button type="button" className="btn-aa ghost" onClick={resetDemo}>
                          <Refresh01Icon size={14} /> {t("runDemoAgain")}
                        </button>
                        <button type="button" className="btn-aa gold" onClick={onBack}>
                          Back to Use Cases
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* AI ENGINE OVERLAY */}
      {aiOverlayOpen && (
        <div
          id="ai-engine-overlay"
          style={{
            position: "fixed",
            inset: 0,
            background:
              "linear-gradient(160deg,#081e14 0%,#0B2E1E 50%,#071810 100%)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 20px",
            opacity: aiFading ? 0 : 1,
            transition: aiFading ? "opacity .7s ease" : undefined,
          }}
        >
          <div className="ai-pulse-wrap">
            <svg className="ai-pulse-svg" viewBox="0 0 200 200">
              <circle className="ai-ring ai-ring-1" cx="100" cy="100" r="80" />
              <circle className="ai-ring ai-ring-2" cx="100" cy="100" r="64" />
              <circle className="ai-ring ai-ring-3" cx="100" cy="100" r="48" />
              <circle r="5" fill="var(--aa-gold)">
                <animateMotion dur="3s" repeatCount="indefinite" path="M 100,20 A 80,80 0 1 1 99.9,20" />
              </circle>
              <circle r="3" fill="rgba(200,169,81,.5)">
                <animateMotion dur="5s" repeatCount="indefinite" path="M 36,100 A 64,64 0 1 1 35.9,100" />
              </circle>
            </svg>
            <div className="ai-center-icon">
              <MagicWand01Icon size={52} />
            </div>
          </div>

          <div className="ai-anim-title">{t("aiEngineRunning")}</div>
          <div className="ai-anim-sub">{t("validatingResponses")}</div>

          <div className="ai-steps">
            {[
              { icon: <File01Icon size={20} />, text: t("aiStep1Text"), detail: t("aiStep1Detail") },
              { icon: <MagicWand01Icon size={20} />, text: t("aiStep2Text"), detail: t("aiStep2Detail") },
              { icon: <MagicWand01Icon size={20} />, text: t("aiStep3Text"), detail: t("aiStep3Detail") },
              { icon: <MagicWand01Icon size={20} />, text: t("aiStep4Text"), detail: t("aiStep4Detail") },
              { icon: <File01Icon size={20} />, text: t("aiStep5Text"), detail: t("aiStep5Detail") },
            ].map((s, i) => (
              <div key={i} className={`ai-step${i < aiVisibleSteps ? " visible" : ""}`}>
                <div className="ai-step-icon">{s.icon}</div>
                <div className="ai-step-body">
                  <div className="ai-step-text">{s.text}</div>
                  <div className="ai-step-detail">{s.detail}</div>
                </div>
                <div className="ai-step-check">
                  <Tick02Icon size={12} />
                </div>
              </div>
            ))}
          </div>

          <div className={`ai-ready${aiReadyVisible ? " visible" : ""}`}>
            <div className="ai-ready-icon">
              <MagicWand01Icon size={20} />
            </div>
            <div className="ai-ready-text">{t("reportReady")}</div>
          </div>

          <div className="ai-particles">
            {["10%", "25%", "42%", "58%", "74%", "88%"].map((l, i) => (
              <span
                key={i}
                className="ai-p"
                style={{ left: l, animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </div>
        </div>
      )}

      {/* FILE PICKER */}
      {filePickerOpen && (
        <div className={`modal-backdrop active`} onClick={closeFilePicker}>
          <div className="file-picker" onClick={(e) => e.stopPropagation()}>
            <div className="fp-titlebar">
              <div className="fp-dots">
                <span className="red" />
                <span className="yellow" />
                <span className="green" />
              </div>
              <div className="fp-title">{t("chooseFiles")}</div>
              <div style={{ width: 40 }} />
            </div>
            <div className="fp-toolbar">
              <div className="fp-nav">
                <button type="button">‹</button>
                <button type="button">›</button>
              </div>
              <div className="fp-path">~/Documents/Compliance/Audits-2026</div>
            </div>
            <div className="fp-content">
              <div className="fp-sidebar">
                <div className="fp-section">{t("favorites")}</div>
                <div className="fp-item">
                  <span className="ico">
                    <File01Icon size={12} />
                  </span>
                  <span>iCloud Drive</span>
                </div>
                <div className="fp-item">
                  <span className="ico">
                    <File01Icon size={12} />
                  </span>
                  <span>AirDrop</span>
                </div>
                <div className="fp-item active">
                  <span className="ico">
                    <File01Icon size={12} />
                  </span>
                  <span>{t("documents")}</span>
                </div>
                <div className="fp-item">
                  <span className="ico">
                    <File01Icon size={12} />
                  </span>
                  <span>{t("downloads")}</span>
                </div>
                <div className="fp-item">
                  <span className="ico">
                    <File01Icon size={12} />
                  </span>
                  <span>{t("desktop")}</span>
                </div>
                <div className="fp-section">{t("tags")}</div>
                <div className="fp-item">
                  <span className="ico" style={{ color: "#ff9500" }}>
                    ●
                  </span>
                  <span>{t("tagCompliance")}</span>
                </div>
                <div className="fp-item">
                  <span className="ico" style={{ color: "#34c759" }}>
                    ●
                  </span>
                  <span>{t("tagApproved")}</span>
                </div>
                <div className="fp-item">
                  <span className="ico" style={{ color: "#ff3b30" }}>
                    ●
                  </span>
                  <span>{t("tagConfidential")}</span>
                </div>
              </div>
              <div className="fp-files">
                {LOCAL_FILES.map((f, i) => {
                  const expected =
                    typeof filePickerContext === "number"
                      ? requiredDocs[filePickerContext]?.pattern
                      : null;
                  const isExpected = f.name === expected;
                  return (
                    <div
                      key={i}
                      className={`fp-file${selectedFileIdx === i ? " selected" : ""}`}
                      onClick={() => setSelectedFileIdx(i)}
                    >
                      <div className="ico">{f.icon}</div>
                      <div className="fname">
                        {f.name}
                        {isExpected && (
                          <span style={{ color: "var(--aa-gold-dark)", fontSize: 10 }}>
                            {" "}
                            {t("recommended")}
                          </span>
                        )}
                      </div>
                      <div className="fsize">{f.size}</div>
                      <div className="fdate">{f.date}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="fp-actions">
              <button type="button" onClick={closeFilePicker}>
                {t("cancel")}
              </button>
              <button
                type="button"
                className="primary"
                disabled={selectedFileIdx === null}
                onClick={confirmFilePicker}
              >
                {t("uploadBtn")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      <div className={`toast${toast.show ? " show" : ""}`}>
        <div className="icon-wrap">
          <Tick02Icon size={16} />
        </div>
        <div>
          <div className="title">{toast.title}</div>
          <div className="sub">{toast.sub}</div>
        </div>
      </div>
    </>
  );

  function ExecutePhase() {
    const c = criteria[activeCritIdx];
    const uploaded = requiredDocs[0]?.file;
    const isLast = activeCritIdx === criteria.length - 1;
    const showSubmit = isLast && c.rating !== null;
    const doneCount = criteria.filter((x) => x.rating).length;

    const byDomain: { [k: string]: { crit: Criterion; idx: number }[] } = {};
    criteria.forEach((cr, i) => {
      if (!byDomain[cr.domain]) byDomain[cr.domain] = [];
      byDomain[cr.domain].push({ crit: cr, idx: i });
    });

    return (
      <div>
        <div className="stage-badge">
          <span className="dot" />
          <span>{t("p3Badge")}</span>
        </div>
        <h2 className="stage-h1">{t("p3Title")}</h2>
        <p className="stage-sub">{t("p3Sub")}</p>

        <div className="app-card">
          <AppTopbar url={`arabaudit.com / audits / USE-${selectedUseCase} / execute / ${c.id}`} />
          <div className="app-content">
            <div className="exec-layout">
              <div className="exec-nav">
                <div className="exec-nav-head">
                  {t("criteriaLabel")} · {doneCount}/{criteria.length} {t("doneLabel")}
                </div>
                <div className="domain-group">
                  {Object.entries(byDomain).map(([domain, list]) => {
                    const done = list.filter((l) => l.crit.rating).length;
                    return (
                      <div key={domain}>
                        <div className="domain-header">
                          {domain}
                          <span className="count">
                            {done}/{list.length}
                          </span>
                        </div>
                        {list.map(({ crit, idx }) => {
                          const stateCls =
                            crit.rating === "compliant"
                              ? "compliant"
                              : crit.rating === "noncompliant"
                                ? "noncompliant"
                                : "";
                          const shortTitle =
                            crit.title.length > 26 ? crit.title.slice(0, 24) + "…" : crit.title;
                          return (
                            <div
                              key={crit.id}
                              className={`crit-item ${stateCls} ${idx === activeCritIdx ? "active" : ""}`}
                              onClick={() => jumpCrit(idx)}
                            >
                              <div className="crit-dot" />
                              {crit.id} {shortTitle}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="exec-main">
                <div className="crit-head">
                  <div className="crit-breadcrumb">
                    {c.domain} › {c.control} › CR-{c.id}
                  </div>
                  <h3 className="crit-title">{c.title}</h3>
                  <div className="crit-expect">
                    <div className="lbl">{t("expected")}</div>
                    <div>{c.expect}</div>
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <div
                    style={{
                      fontFamily: "var(--f-mono)",
                      fontSize: 10,
                      color: "var(--aa-gold-dark)",
                      letterSpacing: ".12em",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    {t("yourRating")}
                  </div>
                  <div className="rating-group">
                    {(["compliant", "noncompliant", "na"] as const).map((r) => {
                      const selected = c.rating === r;
                      const label =
                        r === "compliant"
                          ? t("ratingCompliant")
                          : r === "noncompliant"
                            ? t("ratingNonCompliant")
                            : t("ratingNA");
                      return (
                        <div
                          key={r}
                          className={`rating-option${selected ? " selected " + r : ""}`}
                          onClick={() => {
                            if (!advancingHint) selectRating(r);
                          }}
                          style={advancingHint ? { pointerEvents: "none" } : undefined}
                        >
                          <div className="ico">
                            {r === "compliant" ? (
                              <Tick02Icon size={22} />
                            ) : r === "noncompliant" ? (
                              <AlertCircleIcon size={22} />
                            ) : (
                              <span>—</span>
                            )}
                          </div>
                          <div className="rl">{label}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <div
                    style={{
                      fontFamily: "var(--f-mono)",
                      fontSize: 10,
                      color: "var(--aa-gold-dark)",
                      letterSpacing: ".12em",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    {t("linkedEvidence")}
                  </div>
                  <div>
                    {uploaded ? (
                      <div className="linked-doc">
                        <div className="ico">
                          <File01Icon size={16} />
                        </div>
                        <div className="n">{uploaded}</div>
                        <div className="m">2.4 MB · EN/AR</div>
                      </div>
                    ) : (
                      <div style={{ fontSize: 12, color: "var(--aa-slate-400)" }}>
                        {t("noDocLinkedYet")}
                      </div>
                    )}
                  </div>
                </div>

                {advancingHint && (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "14px 0",
                      color: "var(--aa-slate-600)",
                      fontSize: 13,
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: 12,
                        height: 12,
                        border: "2px solid rgba(11,70,52,.2)",
                        borderTopColor: "var(--aa-primary)",
                        borderRadius: "50%",
                        animation: "spin .8s linear infinite",
                        verticalAlign: "middle",
                        marginRight: 8,
                      }}
                    />
                    {t("savingAdvancing")}
                  </div>
                )}

                {showSubmit && (
                  <div
                    style={{
                      marginTop: 24,
                      paddingTop: 20,
                      borderTop: "1px solid var(--line)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--f-mono)",
                        fontSize: 10,
                        color: "var(--aa-gold-dark)",
                        letterSpacing: ".12em",
                        textTransform: "uppercase",
                        marginBottom: 4,
                      }}
                    >
                      {t("allAssessed")}
                    </div>
                    <button
                      type="button"
                      className="btn-aa gold"
                      style={{ fontSize: 15, padding: "14px 32px", gap: 10 }}
                      onClick={triggerAIAnimation}
                    >
                      <MagicWand01Icon size={16} /> {t("submitGenerateReport")}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function AppTopbar({ url }: { url: string }) {
  return (
    <div className="app-topbar">
      <div className="dots">
        <span />
        <span />
        <span />
      </div>
      <div className="url">{url}</div>
      <div className="user">
        <div className="avatar">AA</div>
        <div className="name">ArabAudit Demo</div>
      </div>
    </div>
  );
}

function FindingField({
  label,
  value,
  ar,
}: {
  label: string;
  value: string;
  ar?: boolean;
}) {
  return (
    <div className={`finding-field${ar ? " ar" : ""}`}>
      <span className="lbl">{label}</span>
      <span className="val show">{value}</span>
    </div>
  );
}
