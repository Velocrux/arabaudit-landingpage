"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Refresh01Icon, AlertCircleIcon, Cancel01Icon, Tick02Icon } from "hugeicons-react";

export default function ReadinessDemo() {
  const t = useTranslations("product.readiness");
  const tShared = useTranslations("product");

  const docs = [
    { name: t("d1name"), status: "satisfied" as const, sub: t("d1sub") },
    { name: t("d2name"), status: "satisfied" as const, sub: t("d2sub") },
    { name: t("d3name"), status: "satisfied" as const, sub: t("d3sub") },
    { name: t("d4name"), status: "expiring" as const, sub: t("d4sub") },
    { name: t("d5name"), status: "expiring" as const, sub: t("d5sub") },
    { name: t("d6name"), status: "missing" as const, sub: t("d6sub") },
    { name: t("d7name"), status: "missing" as const, sub: t("d7sub") },
  ];

  const total = docs.length;
  const linked = docs.filter((d) => d.status !== "missing").length;
  const pct = Math.round((linked / total) * 100);
  const [displayPct, setDisplayPct] = useState(0);
  const [displayLinked, setDisplayLinked] = useState(0);
  const [runKey, setRunKey] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (timer.current) clearInterval(timer.current);
    setDisplayPct(0);
    setDisplayLinked(0);
    const duration = 1200;
    const start = Date.now();
    timer.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      setDisplayPct(Math.round(progress * pct));
      setDisplayLinked(Math.round(progress * linked));
      if (progress >= 1 && timer.current) clearInterval(timer.current);
    }, 30);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [runKey, pct, linked]);

  const circumference = 377;
  const offset = circumference - (displayPct / 100) * circumference;

  const chip =
    pct >= 90
      ? { cls: "ok", label: t("chipReady") }
      : pct >= 70
      ? { cls: "warn", label: t("chipAlmost") }
      : { cls: "bad", label: t("chipPrep") };

  const narrative =
    pct >= 90 ? t("narrReady") : `${total - linked} ${t("narrGaps")}`;

  const statusChipLabel = (s: "satisfied" | "expiring" | "missing") =>
    s === "satisfied" ? t("statusLinked") : s === "expiring" ? t("statusExpiring") : t("statusMissing");

  const statusChipCls = (s: "satisfied" | "expiring" | "missing") =>
    s === "satisfied" ? "ok" : s === "expiring" ? "warn" : "bad";

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
          <button className="btn-ai" onClick={() => setRunKey((k) => k + 1)}>
            <Refresh01Icon size={16} /> {t("rerunBtn")}
          </button>
        </div>
      </div>
      <div className="demo-app">
        <div className="app-frame">
          <div className="app-titlebar">
            <div className="dots"><span className="dot" /><span className="dot" /><span className="dot" /></div>
            <div className="url">arabaudit.com / audits / q1-2026 / prepare</div>
            <div className="live">LIVE</div>
          </div>
          <div className="app-body">
            <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 24, alignItems: "center" }}>
              <div>
                <div className="readiness-status-ring">
                  <svg viewBox="0 0 140 140">
                    <circle className="track" cx="70" cy="70" r="60" />
                    <circle
                      className="fill"
                      cx="70"
                      cy="70"
                      r="60"
                      style={{ strokeDashoffset: offset }}
                    />
                  </svg>
                  <div className="percent">
                    <div className="n">{displayPct}%</div>
                    <div className="l">{t("ringLabel")}</div>
                  </div>
                </div>
              </div>
              <div>
                <div className={`status-chip ${chip.cls}`}>{chip.label}</div>
                <div
                  style={{
                    fontFamily: "var(--f-serif)",
                    fontSize: 22,
                    color: "var(--aa-primary)",
                    marginTop: 12,
                    fontWeight: 500,
                  }}
                >
                  {displayLinked} {tShared("of")} {total} {t("requiredDocsLinked")}
                </div>
                <div style={{ fontSize: 13, color: "var(--aa-slate-600)", marginTop: 4 }}>{narrative}</div>
              </div>
            </div>

            <div style={{ marginTop: 24 }}>
              <div
                style={{
                  fontFamily: "var(--f-mono)",
                  fontSize: 10,
                  color: "var(--aa-gold-dark)",
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                {t("requiredDocsHeading")}
              </div>
              {docs.map((d, i) => (
                <div key={i} className={`readiness-card ${d.status}`}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 14, color: "var(--aa-slate-800)", fontWeight: 500 }}>
                        {d.name}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "var(--aa-slate-600)",
                          marginTop: 3,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        {d.status === "expiring" && <AlertCircleIcon size={12} />}
                        {d.status === "missing" && <Cancel01Icon size={12} />}
                        {d.status === "satisfied" && <Tick02Icon size={12} />}
                        <span>{d.sub}</span>
                      </div>
                    </div>
                    <div className={`status-chip ${statusChipCls(d.status)}`}>{statusChipLabel(d.status)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
