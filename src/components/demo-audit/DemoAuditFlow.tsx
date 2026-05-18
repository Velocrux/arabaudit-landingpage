"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import {
  Tick02Icon,
  MagicWand01Icon,
  File01Icon,
  AlertCircleIcon,
  Refresh01Icon,
} from "hugeicons-react";

// ----- Types -----
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

// ----- Static demo data -----
const LOCAL_FILES: LocalFile[] = [
  { icon: <File01Icon size={18} />, name: "IT Security Policy v3.2.pdf", size: "2.4 MB", date: "15 Nov 2025" },
  { icon: <File01Icon size={18} />, name: "سياسة أمن المعلومات.pdf", size: "1.8 MB", date: "22 Nov 2025" },
  { icon: <File01Icon size={18} />, name: "Firewall Configuration Q4-2025.xlsx", size: "512 KB", date: "31 Dec 2025" },
  { icon: <File01Icon size={18} />, name: "AWS Riyadh Region Attestation.pdf", size: "890 KB", date: "12 Jan 2026" },
  { icon: <File01Icon size={18} />, name: "Quarterly Access Review Q4.csv", size: "128 KB", date: "03 Jan 2026" },
  { icon: <File01Icon size={18} />, name: "Data-Classification-Standard.pdf", size: "1.2 MB", date: "28 Oct 2025" },
  { icon: <File01Icon size={18} />, name: "Incident-Response-Plan-v2.1.docx", size: "760 KB", date: "05 Feb 2026" },
  { icon: <File01Icon size={18} />, name: "Iqama-Renewals-2026.xlsx", size: "320 KB", date: "18 Apr 2026" },
];

export default function DemoAuditFlow() {
  const t = useTranslations("demoAudit");
  const searchParams = useSearchParams();
  const fromFramework = searchParams?.get("from") === "framework-browser";

  // ----- Initial data (translated) -----
  const initialRequiredDocs = useCallback(
    (): RequiredDoc[] => [
      { cat: t("catPolicy"), name: t("docCyberPolicy"), file: null, pattern: "IT Security Policy v3.2.pdf" },
    ],
    [t]
  );

  const initialCriteria = useCallback(
    (): Criterion[] => [
      {
        id: "1.1.1",
        domain: t("d1Governance"),
        control: t("ct11Board"),
        title: t("crit111Title"),
        expect: t("crit111Expect"),
        rating: null,
      },
      {
        id: "1.1.2",
        domain: t("d1Governance"),
        control: t("ct11Board"),
        title: t("crit112Title"),
        expect: t("crit112Expect"),
        rating: null,
      },
      {
        id: "1.2.1",
        domain: t("d1Governance"),
        control: t("ct12Strategy"),
        title: t("crit121Title"),
        expect: t("crit121Expect"),
        rating: null,
      },
    ],
    [t]
  );

  // ----- State -----
  const PHASES: { n: Phase; label: string }[] = fromFramework
    ? [
        { n: 2, label: t("pPrepare") },
        { n: 3, label: t("pExecute") },
        { n: 5, label: t("pReport") },
        { n: 6, label: t("pComplete") },
      ]
    : [
        { n: 1, label: t("pSchedule") },
        { n: 2, label: t("pPrepare") },
        { n: 3, label: t("pExecute") },
        { n: 5, label: t("pReport") },
        { n: 6, label: t("pComplete") },
      ];

  const [phase, setPhase] = useState<Phase>(fromFramework ? 2 : 1);
  const [requiredDocs, setRequiredDocs] = useState<RequiredDoc[]>(initialRequiredDocs);
  const [criteria, setCriteria] = useState<Criterion[]>(initialCriteria);
  const [activeCritIdx, setActiveCritIdx] = useState(0);

  // File picker
  const [filePickerOpen, setFilePickerOpen] = useState(false);
  const [filePickerContext, setFilePickerContext] = useState<FilePickerContext>(null);
  const [selectedFileIdx, setSelectedFileIdx] = useState<number | null>(null);

  // Upload progress (keyed by index)
  const [uploadProgress, setUploadProgress] = useState<{ idx: number; file: LocalFile; pct: number } | null>(null);

  // AI engine overlay
  const [aiOverlayOpen, setAiOverlayOpen] = useState(false);
  const [aiVisibleSteps, setAiVisibleSteps] = useState<number>(0);
  const [aiReadyVisible, setAiReadyVisible] = useState(false);
  const [aiFading, setAiFading] = useState(false);

  // Finding
  const [findingLang, setFindingLang] = useState<"en" | "ar">("en");
  const [findingFields, setFindingFields] = useState<{ [k: string]: string }>({
    title: "",
    desc: "",
    root: "",
    impact: "",
    rec: "",
  });
  const [findingSeverity, setFindingSeverity] = useState<"analyzing" | "critical">("analyzing");

  // Report
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

  // Sign phase
  const [signState, setSignState] = useState<"idle" | "processing" | "complete">("idle");
  const [sigHash, setSigHash] = useState<string>("a3c2·f81d·5b90·22ee·6a5a·e7a6·1d20·bb9f");
  const [sigTimestamp, setSigTimestamp] = useState<string>("2026-04-18 16:22 AST");

  // Toast
  const [toast, setToast] = useState<{ title: string; sub: string; show: boolean }>({
    title: "",
    sub: "",
    show: false,
  });

  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ----- Scroll on phase change -----
  useEffect(() => {
    const panel = document.querySelector(".panel");
    if (panel) {
      window.scrollTo({
        top: (panel as HTMLElement).offsetTop - 40,
        behavior: "smooth",
      });
    }
  }, [phase]);

  // ----- Phase 6 auto-sign -----
  useEffect(() => {
    if (phase === 6 && signState === "idle") {
      const t1 = setTimeout(() => signAudit(), 400);
      return () => clearTimeout(t1);
    }
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  // ----- Phase 5 start report -----
  useEffect(() => {
    if (phase === 5) {
      startReport();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // ----- Helpers -----
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

  // ----- Phase 2: Preparation -----
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
    // auto-suggest expected file
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
      // upload progress
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

  // ----- Phase 3: Execution -----
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

  // ----- Phase 4: Finding draft (typewriter) -----
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

  const typewriterTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const typewriterIntervalsRef = useRef<ReturnType<typeof setInterval>[]>([]);

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
    } else {
      clearTypewriter();
    }
    return () => clearTypewriter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const acceptFinding = () => {
    showToast(t("toastFindingCreated"), "FND-2026-Q1-002 " + t("toastFindingAdded"));
    setTimeout(() => goTo(5), 700);
  };

  // ----- AI Engine animation -----
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

  // ----- Phase 5: Report -----
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

    // reset
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

    // Quick insights
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

    // Domain bars
    const d11List = criteria.filter((c) => c.control === t("ct11Board"));
    const d12List = criteria.filter((c) => c.control === t("ct12Strategy"));
    const d11Compliant = d11List.reduce((a, c) => a + (c.rating === "compliant" ? 1 : 0), 0);
    const d12Compliant = d12List.reduce((a, c) => a + (c.rating === "compliant" ? 1 : 0), 0);
    const d11Pct = Math.round((d11Compliant / Math.max(1, d11List.length)) * 100);
    const d12Pct = Math.round((d12Compliant / Math.max(1, d12List.length)) * 100);
    const domains = [
      {
        name: t("ct11Board") + " " + t("governanceSuffix"),
        pct: d11Pct,
        cls: d11Pct < 50 ? "bad" : d11Pct < 75 ? "warn" : "",
        widthShown: 0,
      },
      {
        name: t("ct12Strategy") + " " + t("alignmentSuffix"),
        pct: d12Pct,
        cls: d12Pct < 50 ? "bad" : d12Pct < 75 ? "warn" : "",
        widthShown: 0,
      },
    ];
    setRptDomains(domains);
    typewriterTimersRef.current.push(
      setTimeout(() => {
        setRptDomains((prev) => prev.map((d) => ({ ...d, widthShown: d.pct })));
      }, 500)
    );

    // Narratives
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

  // ----- Phase 6: Sign -----
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

  // ----- Reset -----
  const resetDemo = () => {
    clearTypewriter();
    setRequiredDocs(initialRequiredDocs());
    setCriteria(initialCriteria());
    setActiveCritIdx(0);
    setSignState("idle");
    setRptContentVisible(false);
    goTo(fromFramework ? 2 : 1);
  };

  // ----- Stepper -----
  const curIdx = PHASES.findIndex((p) => p.n === phase);
  const pct = PHASES.length <= 1 ? 100 : (curIdx / (PHASES.length - 1)) * 100;

  // ----- Render -----
  return (
    <>
      {/* HERO + STEPPER */}
      <section className="demo-hero">
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
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
            <span>{t("heroPill")}</span>
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
            {t("heroTitleA")}
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
          {/* ===== PHASE 1: SCHEDULE ===== */}
          {phase === 1 && (
            <div>
              <div className="stage-badge">
                <span className="dot" />
                <span>{t("p1Badge")}</span>
              </div>
              <h2 className="stage-h1">{t("p1Title")}</h2>
              <p className="stage-sub">{t("p1Sub")}</p>

              <div className="app-card">
                <AppTopbar url="arabaudit.com / audits / create" />
                <div className="app-content">
                  <h3
                    style={{
                      fontFamily: "var(--f-serif)",
                      fontSize: 20,
                      color: "var(--aa-primary)",
                      margin: "0 0 20px",
                      fontWeight: 500,
                    }}
                  >
                    {t("createNewAudit")}
                  </h3>
                  <div className="audit-form-grid">
                    <div className="form-card">
                      <h4>
                        <span className="num">1</span> {t("basic")}
                      </h4>
                      <div className="field">
                        <label>
                          {t("auditTitle")} <span className="req">*</span>
                        </label>
                        <input type="text" defaultValue={t("defaultAuditTitle")} />
                      </div>
                      <div className="field">
                        <label>
                          {t("framework")} <span className="req">*</span>
                        </label>
                        <select defaultValue="nca-ecc">
                          <option value="nca-ecc">NCA ECC (v2024)</option>
                          <option value="sama-csf">SAMA CSF (v2024)</option>
                          <option value="sdaia-pdpl">SDAIA PDPL (v2023)</option>
                        </select>
                      </div>
                      <div className="field">
                        <label>{t("scheduledDate")}</label>
                        <input type="date" defaultValue="2026-04-25" />
                      </div>
                    </div>
                    <div className="form-card">
                      <h4>
                        <span className="num">2</span> {t("team")}
                      </h4>
                      <div className="field">
                        <label>
                          {t("leadAuditor")} <span className="req">*</span>
                        </label>
                        <select>
                          <option>Layla Al-Sulaiman (CISA)</option>
                          <option>Khalid Al-Mansour (CIA)</option>
                        </select>
                      </div>
                      <div className="field">
                        <label>{t("organization")}</label>
                        <select disabled>
                          <option>Najm Insurance Services Co.</option>
                        </select>
                      </div>
                      <div className="field">
                        <label>{t("description")}</label>
                        <textarea rows={3} defaultValue={t("defaultDescription")} />
                      </div>
                    </div>
                  </div>
                  <div className="nav-actions">
                    <a className="btn-aa ghost" href="/">
                      {t("backToSite")}
                    </a>
                    <button type="button" className="btn-aa gold" onClick={() => goTo(2)}>
                      {t("continueToPrep")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

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
                <AppTopbar url="arabaudit.com / audits / AUD-2026-Q1-001 / prepare" />
                <div className="app-content">
                  <div className="prepare-layout">
                    {/* Sidebar */}
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

                    {/* Main */}
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 14,
                        }}
                      >
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
                                <div
                                  style={{
                                    fontSize: 11,
                                    color: "var(--aa-slate-400)",
                                    marginTop: 2,
                                  }}
                                >
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

          {/* ===== PHASE 4: FINDING ===== */}
          {phase === 4 && (
            <div>
              <div className="stage-badge">
                <span className="dot" />
                <span>{t("p4Badge")}</span>
              </div>
              <h2 className="stage-h1">{t("p4Title")}</h2>
              <p className="stage-sub">{t("p4Sub")}</p>

              <div className="app-card">
                <AppTopbar url="arabaudit.com / audits / findings / draft" />
                <div className="app-content">
                  <div
                    style={{
                      background: "rgba(239,68,68,.04)",
                      border: "1px solid rgba(239,68,68,.2)",
                      borderLeft: "3px solid var(--aa-red-500)",
                      borderRadius: 8,
                      padding: "14px 18px",
                      display: "flex",
                      gap: 14,
                      alignItems: "center",
                      marginBottom: 20,
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: "rgba(239,68,68,.1)",
                        color: "var(--aa-red-600, #dc2626)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <AlertCircleIcon size={22} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontFamily: "var(--f-serif)",
                          fontSize: 16,
                          color: "var(--aa-primary)",
                          fontWeight: 500,
                        }}
                      >
                        {t("aiGapDetected")}
                      </div>
                      <div style={{ fontSize: 13, color: "var(--aa-slate-600)", marginTop: 2 }}>
                        {t("gapDetail")}
                      </div>
                    </div>
                    <span
                      className={`severity-badge ${
                        findingSeverity === "critical" ? "sev-critical" : "sev-medium"
                      }`}
                    >
                      {findingSeverity === "critical" ? t("sevCritical") : t("sevAnalyzing")}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 12,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--f-serif)",
                        fontSize: 18,
                        color: "var(--aa-primary)",
                        fontWeight: 500,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <MagicWand01Icon size={18} /> {t("aiDraftTitle")}
                    </div>
                    <button
                      type="button"
                      className="btn-aa gold btn-sm"
                      onClick={regenerateFinding}
                    >
                      <Refresh01Icon size={14} /> {t("regenerate")}
                    </button>
                  </div>

                  <div className="lang-tabs">
                    <button
                      type="button"
                      className={`lang-tab${findingLang === "en" ? " active" : ""}`}
                      onClick={() => setFindingLang("en")}
                    >
                      English
                    </button>
                    <button
                      type="button"
                      className={`lang-tab${findingLang === "ar" ? " active" : ""}`}
                      onClick={() => setFindingLang("ar")}
                    >
                      عربي
                    </button>
                  </div>

                  {findingLang === "en" ? (
                    <>
                      <FindingField label={t("fLblTitle")} value={findingFields.title} />
                      <FindingField label={t("fLblDesc")} value={findingFields.desc} />
                      <FindingField label={t("fLblRoot")} value={findingFields.root} />
                      <FindingField label={t("fLblImpact")} value={findingFields.impact} />
                      <FindingField label={t("fLblRec")} value={findingFields.rec} />
                    </>
                  ) : (
                    <>
                      <FindingField ar label={t("fLblTitleAr")} value={findingData.ar.title} />
                      <FindingField ar label={t("fLblDescAr")} value={findingData.ar.desc} />
                      <FindingField ar label={t("fLblRootAr")} value={findingData.ar.root} />
                      <FindingField ar label={t("fLblImpactAr")} value={findingData.ar.impact} />
                      <FindingField ar label={t("fLblRecAr")} value={findingData.ar.rec} />
                    </>
                  )}

                  <div className="nav-actions">
                    <button type="button" className="btn-aa ghost" onClick={() => goTo(3)}>
                      {t("backToCriterion")}
                    </button>
                    <div style={{ display: "flex", gap: 10 }}>
                      <button type="button" className="btn-aa ghost" onClick={() => goTo(5)}>
                        {t("discardDraft")}
                      </button>
                      <button
                        type="button"
                        className="btn-aa"
                        style={{ background: "var(--aa-green-600)", color: "white" }}
                        onClick={acceptFinding}
                      >
                        <Tick02Icon size={14} /> {t("acceptFinding")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

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
                <AppTopbar url="arabaudit.com / audits / AUD-2026-Q1-001 / report" />
                <div
                  className="app-content"
                  style={{ opacity: rptContentVisible ? 1 : 0, transition: "opacity .5s" }}
                >
                  <div className="ov-header">
                    <div>
                      <div className="ov-label">{t("overviewReport")} · AUD-2026-Q1-001</div>
                      <h3 className="ov-title">{t("q1Assessment")}</h3>
                      <div className="ov-facts">
                        <span className="ov-fact">Najm Insurance Services Co.</span>
                        <span className="ov-fact">NCA ECC · v2024</span>
                        <span className="ov-fact">{t("reportDate")}</span>
                        <span className="ov-fact">Layla Al-Sulaiman, CISA</span>
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
                <AppTopbar url="arabaudit.com / audits / AUD-2026-Q1-001 / sign" />
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
                            AUD-2026-Q1-001
                          </span>
                        </div>
                        <div className="row">
                          <span className="k">{t("sigFramework")}</span>
                          <span className="v">NCA ECC · v2024</span>
                        </div>
                        <div className="row">
                          <span className="k">{t("sigComplianceScore")}</span>
                          <span className="v">87%</span>
                        </div>
                        <div className="row">
                          <span className="k">{t("sigSignedBy")}</span>
                          <span className="v">L. Al-Sulaiman, CISA</span>
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
                        <a className="btn-aa gold" href="/contact" style={{ textDecoration: "none" }}>
                          {t("bookWalkthrough")}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="dark" style={{ padding: "96px 0", backgroundColor: "rgb(7, 55, 39)" }}>
        <div className="wrap" style={{ textAlign: "center" }}>
          <div className="eyebrow on-dark">{t("ctaEyebrow")}</div>
          <h2 className="display" style={{ fontSize: "clamp(32px, 4.5vw, 60px)", marginTop: 20 }}>
            {t("ctaTitle")}
          </h2>
          <div className="flex gap-3 mt-8 center">
            <a href="/contact" className="btn btn-primary">
              {t("ctaPrimary")}
            </a>
            <a href="mailto:kauser@arabaudit.com" className="btn btn-ghost on-dark">
              {t("ctaGhost")}
            </a>
          </div>
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
              <div className="fp-path">~/Documents/Compliance/Najm-Insurance-2026</div>
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

  // ----- Phase 3: Execute (inner component) -----
  function ExecutePhase() {
    const c = criteria[activeCritIdx];
    const uploaded = requiredDocs[0]?.file;
    const isLast = activeCritIdx === criteria.length - 1;
    const showSubmit = isLast && c.rating !== null;
    const doneCount = criteria.filter((x) => x.rating).length;

    // Group by domain
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
          <AppTopbar url={`arabaudit.com / audits / AUD-2026-Q1-001 / execute / ${c.id}`} />
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

// ===== Sub-components =====
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
        <div className="avatar">KJ</div>
        <div className="name">Kauser · Najm Insurance</div>
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
