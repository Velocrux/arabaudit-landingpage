"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  MagicWand01Icon,
  Tick02Icon,
  File01Icon,
  Certificate01Icon,
  ChartIncreaseIcon,
} from "hugeicons-react";

interface Doc {
  id: number;
  name: string;
  meta: string;
  lang: string;
  icon: React.ReactNode;
}

interface Suggestion {
  doc: string;
  path: string;
  conf: number;
  reason: string;
}

export default function AutoLinkDemo() {
  const t = useTranslations("product.autoLink");
  const tShared = useTranslations("product");

  const docs: Doc[] = [
    { id: 1, name: t("doc1"), meta: `${t("tagPolicy")} · 2.4 MB`, lang: "EN", icon: <File01Icon size={16} /> },
    { id: 2, name: t("doc2"), meta: `${t("tagPolicy")} · 1.8 MB`, lang: "AR", icon: <File01Icon size={16} /> },
    { id: 3, name: t("doc3"), meta: `${t("tagConfig")} · 512 KB`, lang: "EN", icon: <File01Icon size={16} /> },
    { id: 4, name: t("doc4"), meta: `${t("tagCert")} · 890 KB`, lang: "EN", icon: <Certificate01Icon size={16} /> },
    { id: 5, name: t("doc5"), meta: `${t("tagLog")} · 128 KB`, lang: "EN", icon: <ChartIncreaseIcon size={16} /> },
  ];

  const allSuggestions: Suggestion[] = [
    { doc: t("doc1"), path: t("path1"), conf: 94, reason: t("reason1") },
    { doc: t("doc1"), path: t("path2"), conf: 82, reason: t("reason2") },
    { doc: t("doc2"), path: t("path1"), conf: 92, reason: t("reason3") },
    { doc: t("doc3"), path: t("path4"), conf: 88, reason: t("reason4") },
    { doc: t("doc4"), path: t("path5"), conf: 97, reason: t("reason5") },
    { doc: t("doc5"), path: t("path6"), conf: 76, reason: t("reason6") },
    { doc: t("doc5"), path: t("path7"), conf: 84, reason: t("reason7") },
  ];

  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<number[]>([]);
  const [gran, setGran] = useState<"domain" | "control" | "criterion">("control");
  const [processed, setProcessed] = useState(0);
  const [phase, setPhase] = useState("");
  const [results, setResults] = useState<Suggestion[]>([]);
  const [appliedCount, setAppliedCount] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const phases = [t("phase1"), t("phase2"), t("phase3"), t("phase4")];

  const toggle = (id: number) => {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  };

  const start = () => {
    if (selected.length === 0) return;
    setStep(2);
    setProcessed(0);
    setPhase(phases[0]);
    const total = selected.length;
    let p = 0;
    timer.current = setInterval(() => {
      p++;
      setProcessed(p);
      const idx = Math.min(Math.floor((p / total) * phases.length), phases.length - 1);
      setPhase(phases[idx]);
      if (p >= total) {
        if (timer.current) clearInterval(timer.current);
        setTimeout(() => {
          const selectedDocs = docs.filter((d) => selected.includes(d.id));
          const filtered = allSuggestions.filter((s) =>
            selectedDocs.some((d) => d.name === s.doc)
          );
          setResults(filtered);
          setStep(3);
        }, 600);
      }
    }, 700);
  };

  const apply = () => {
    setAppliedCount(results.length);
    setStep(4);
  };

  const reset = () => {
    setSelected([]);
    setStep(1);
    setProcessed(0);
    setResults([]);
  };

  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

  const total = selected.length;
  const avgConf = results.length ? Math.round(results.reduce((a, s) => a + s.conf, 0) / results.length) : 0;
  const stepLabels = [t("stepConfigure"), t("stepProcessing"), t("stepReview"), t("stepApply")];

  return (
    <>
      <div className="demo-info">
        <div className="demo-header" style={{ marginBottom: 0 }}>
          <div className="demo-num">{t("num")}</div>
          <h2>
            {t("title1")}
            <br />
            <em>{t("title2")}</em>
          </h2>
          <p>{t("lede")}</p>
        </div>
        <ul className="demo-feature-list">
          <li><span className="fli-dot"><Tick02Icon size={10} /></span>{t("f1")}</li>
          <li><span className="fli-dot"><Tick02Icon size={10} /></span>{t("f2")}</li>
          <li><span className="fli-dot"><Tick02Icon size={10} /></span>{t("f3")}</li>
          <li><span className="fli-dot"><Tick02Icon size={10} /></span>{t("f4")}</li>
        </ul>
        <div style={{ marginTop: 32, display: "flex", gap: 12 }}>
          <Link href="/demo-audit" className="btn btn-primary">{t("ctaFull")} →</Link>
        </div>
      </div>
      <div className="demo-app">
        <div className="app-frame">
          <div className="app-titlebar">
            <div className="dots"><span className="dot" /><span className="dot" /><span className="dot" /></div>
            <div className="url">arabaudit.com / audits / q1-2026-nca-ecc / auto-link</div>
            <div className="live">LIVE</div>
          </div>
          <div className="app-body">
            <div className="autolink-steps">
              {stepLabels.map((label, i) => {
                const n = i + 1;
                const cls = step === n ? "active" : step > n ? "done" : "";
                return (
                  <div key={n} className={`al-step ${cls}`}>
                    <div className="circle">{step > n ? <Tick02Icon size={12} /> : n}</div>
                    <div className="al-label">{label}</div>
                  </div>
                );
              })}
            </div>

            {step === 1 && (
              <div>
                <div style={{ fontSize: 13, color: "var(--aa-slate-600)", marginBottom: 8 }}>
                  {t("selectDocs")}{" "}
                  <span style={{ color: "var(--aa-gold-dark)", fontWeight: 600 }}>
                    ({total} {t("selectedSuffix")})
                  </span>
                </div>
                <div className="doc-list">
                  {docs.map((d) => (
                    <div
                      key={d.id}
                      className={`doc-row ${selected.includes(d.id) ? "selected" : ""}`}
                      onClick={() => toggle(d.id)}
                    >
                      <div className="checkbox">{selected.includes(d.id) && <Tick02Icon size={12} />}</div>
                      <div className="doc-icon">{d.icon}</div>
                      <div className="details">
                        <div className="name">{d.name}</div>
                        <div className="meta">{d.meta}</div>
                      </div>
                      <span className="lang">{d.lang}</span>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 12, color: "var(--aa-slate-600)", marginTop: 16 }}>{t("granularity")}</div>
                <div className="granularity">
                  {(["domain", "control", "criterion"] as const).map((g) => (
                    <div
                      key={g}
                      className={`gtab ${gran === g ? "active" : ""}`}
                      onClick={() => setGran(g)}
                    >
                      {g === "domain" ? t("granDomain") : g === "control" ? t("granControl") : t("granCriterion")}
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
                  <button className="btn-ai" onClick={start} disabled={total === 0}>
                    <MagicWand01Icon size={16} /> {t("generateBtn")}
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="progress-container">
                <div className="progress-spinner">
                  <svg viewBox="0 0 60 60">
                    <circle className="track" cx="30" cy="30" r="24" />
                    <circle
                      className="bar"
                      cx="30"
                      cy="30"
                      r="24"
                      style={{ strokeDashoffset: 150 - (processed / Math.max(selected.length, 1)) * 150 }}
                    />
                  </svg>
                  <div className="sparkle ai-pulse"><MagicWand01Icon size={20} /></div>
                </div>
                <div style={{ fontFamily: "var(--f-serif)", fontSize: 20, color: "var(--aa-primary)", fontWeight: 500 }}>
                  {phase}
                </div>
                <div style={{ fontSize: 13, color: "var(--aa-slate-600)", marginTop: 6 }}>
                  {processed} {tShared("of")} {selected.length} {t("processedWord")}
                </div>
                <div className="progress-bar-track" style={{ maxWidth: 300, margin: "16px auto 0" }}>
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${(processed / Math.max(selected.length, 1)) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <div className="stats-row">
                  <div className="stat-card"><div className="v">{selected.length}</div><div className="l">{t("statDocs")}</div></div>
                  <div className="stat-card"><div className="v">{results.length}</div><div className="l">{t("statSugs")}</div></div>
                  <div className="stat-card"><div className="v">{avgConf}%</div><div className="l">{t("statConf")}</div></div>
                </div>
                <div style={{ maxHeight: 280, overflowY: "auto" }}>
                  {results.length === 0 ? (
                    <div style={{ padding: 20, textAlign: "center", color: "var(--aa-slate-600)" }}>{t("noSugs")}</div>
                  ) : (
                    results.map((s, i) => {
                      const level = s.conf >= 85 ? "high" : s.conf >= 65 ? "med" : "low";
                      return (
                        <div key={i} className="suggestion">
                          <div className="sug-head">
                            <div className="sug-path">
                              <span className="doc">{s.doc}</span>
                              <span className="arrow">→</span> {s.path}
                            </div>
                            <div className={`conf-badge conf-${level}`}>{s.conf}%</div>
                          </div>
                          <div className="sug-reason">{s.reason}</div>
                        </div>
                      );
                    })
                  )}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
                  <button className="btn-ai ghost" onClick={reset}>← {t("startOver")}</button>
                  <button className="btn-ai" onClick={apply}>{t("applyAll")} →</button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "rgba(0,108,53,.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                    color: "var(--aa-secondary)",
                  }}
                >
                  <Tick02Icon size={32} />
                </div>
                <div style={{ fontFamily: "var(--f-serif)", fontSize: 24, color: "var(--aa-primary)", fontWeight: 500 }}>
                  {appliedCount} {t("linksApplied")}
                </div>
                <div style={{ fontSize: 13, color: "var(--aa-slate-600)", marginTop: 8 }}>{t("linksAppliedSub")}</div>
                <button className="btn-ai ghost" onClick={reset} style={{ marginTop: 20 }}>
                  {t("runAgain")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
