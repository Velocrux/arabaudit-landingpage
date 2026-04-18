"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { PlayIcon, Refresh01Icon, Tick02Icon } from "hugeicons-react";

export default function ReportDemo() {
  const t = useTranslations("product.report");

  const [gaugeVal, setGaugeVal] = useState(0);
  const [gaugeOffset, setGaugeOffset] = useState(220);
  const [c1, setC1] = useState(0);
  const [c2, setC2] = useState(0);
  const [c3, setC3] = useState(0);
  const [c4, setC4] = useState(0);
  const [narrative, setNarrative] = useState(t("placeholder"));
  const [showCaret, setShowCaret] = useState(false);
  const [domainsReady, setDomainsReady] = useState(false);
  const [running, setRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervals = useRef<ReturnType<typeof setInterval>[]>([]);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
      intervals.current.forEach(clearInterval);
    },
    []
  );

  const domains = [
    { name: t("d1"), pct: 94, cls: "" },
    { name: t("d2"), pct: 86, cls: "" },
    { name: t("d3"), pct: 68, cls: "warn" },
    { name: t("d4"), pct: 79, cls: "" },
    { name: t("d5"), pct: 42, cls: "bad" },
  ];

  const animateCounter = (setter: (v: number) => void, target: number) => {
    const start = Date.now();
    const duration = 1500;
    const i = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / duration, 1);
      setter(Math.round(p * target));
      if (p >= 1) clearInterval(i);
    }, 30);
    intervals.current.push(i);
  };

  const stream = () => {
    timers.current.forEach(clearTimeout);
    intervals.current.forEach(clearInterval);
    timers.current = [];
    intervals.current = [];
    setRunning(true);
    setStarted(true);
    setC1(0);
    setC2(0);
    setC3(0);
    setC4(0);
    setGaugeVal(0);
    setGaugeOffset(220);
    setDomainsReady(false);
    setShowCaret(true);
    setNarrative("");

    const targetPct = 87;
    setGaugeOffset(220 - (targetPct / 100) * 220);

    const gStart = Date.now();
    const gInterval = setInterval(() => {
      const el = Date.now() - gStart;
      const p = Math.min(el / 1800, 1);
      setGaugeVal(Math.round(p * targetPct));
      if (p >= 1) clearInterval(gInterval);
    }, 30);
    intervals.current.push(gInterval);

    animateCounter(setC1, 87);
    animateCounter(setC2, 18);
    animateCounter(setC3, 7);
    animateCounter(setC4, 2);

    timers.current.push(setTimeout(() => setDomainsReady(true), 200));

    const narrativeText = t("narrative");
    let i = 0;
    const narrativeInterval = setInterval(() => {
      i += 3;
      setNarrative(narrativeText.slice(0, i));
      if (i >= narrativeText.length) {
        setNarrative(narrativeText);
        clearInterval(narrativeInterval);
        setShowCaret(false);
        setRunning(false);
      }
    }, 18);
    intervals.current.push(narrativeInterval);
  };

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
        <div style={{ marginTop: 32 }}>
          <button className="btn-ai" onClick={stream} disabled={running}>
            {running ? (
              <>
                <span className="ai-pulse" style={{ display: "inline-flex" }}>
                  <PlayIcon size={16} />
                </span>{" "}
                {t("streamingBtn")}
              </>
            ) : started ? (
              <>
                <Refresh01Icon size={16} /> {t("streamAgainBtn")}
              </>
            ) : (
              <>
                <PlayIcon size={16} /> {t("streamBtn")}
              </>
            )}
          </button>
        </div>
      </div>
      <div className="demo-app">
        <div className="app-frame">
          <div className="app-titlebar">
            <div className="dots"><span className="dot" /><span className="dot" /><span className="dot" /></div>
            <div className="url">arabaudit.com / reports / q1-2026 / ai-summary</div>
            <div className="live">LIVE</div>
          </div>
          <div className="app-body">
            <svg width="0" height="0" style={{ position: "absolute" }}>
              <defs>
                <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#c5402b" />
                  <stop offset="50%" stopColor="#c8a951" />
                  <stop offset="100%" stopColor="#006c35" />
                </linearGradient>
              </defs>
            </svg>

            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
              <div className="grade-badge grade-A">A</div>
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
                  {t("headerKicker")}
                </div>
                <div
                  style={{
                    fontFamily: "var(--f-serif)",
                    fontSize: 22,
                    color: "var(--aa-primary)",
                    fontWeight: 500,
                    marginTop: 4,
                  }}
                >
                  {t("clientName")}
                </div>
              </div>
              <div style={{ marginLeft: "auto", textAlign: "right" }}>
                <div className="gauge">
                  <svg viewBox="0 0 160 80">
                    <path className="track" d="M 14,66 A 56,56 0 0 1 146,66" />
                    <path
                      className="fill"
                      d="M 14,66 A 56,56 0 0 1 146,66"
                      style={{ strokeDashoffset: gaugeOffset }}
                    />
                  </svg>
                </div>
                <div className="gauge-value">{gaugeVal}%</div>
              </div>
            </div>

            <div className="report-stats">
              <div className="report-stat"><div className="v">{c1}</div><div className="l">{t("statCompliant")}</div></div>
              <div className="report-stat" style={{ borderColor: "var(--aa-gold)" }}><div className="v">{c2}</div><div className="l">{t("statPartial")}</div></div>
              <div className="report-stat" style={{ borderColor: "#c5402b" }}><div className="v">{c3}</div><div className="l">{t("statNon")}</div></div>
              <div className="report-stat" style={{ borderColor: "var(--aa-slate-200)" }}><div className="v">{c4}</div><div className="l">{t("statNA")}</div></div>
            </div>

            <div style={{ marginTop: 20 }}>
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
                {t("domainPerf")}
              </div>
              <div>
                {domains.map((d, i) => (
                  <div key={i} className={`domain-bar ${d.cls}`}>
                    <div className="dname">{d.name}</div>
                    <div className="dbar">
                      <div className="dfill" style={{ width: domainsReady ? `${d.pct}%` : 0 }} />
                    </div>
                    <div className="dval">{d.pct}%</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 20 }}>
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
                {t("execNar")}
              </div>
              <div className="narrative-box">
                <span>{narrative}</span>
                {showCaret && <span className="narrative-caret" />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
