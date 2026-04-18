"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { MagicWand01Icon, Tick02Icon, StarIcon } from "hugeicons-react";

export default function ValidationDemo() {
  const t = useTranslations("product.validation");
  const [stage, setStage] = useState<"idle" | "loading" | "result">("idle");
  const [phaseIdx, setPhaseIdx] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const phases = [t("phase1"), t("phase2"), t("phase3"), t("phase4")];

  const run = () => {
    setStage("loading");
    setPhaseIdx(0);
    let i = 0;
    timer.current = setInterval(() => {
      i++;
      setPhaseIdx(i);
      if (i >= phases.length) {
        if (timer.current) clearInterval(timer.current);
        setTimeout(() => setStage("result"), 500);
      }
    }, 900);
  };

  const reset = () => {
    setStage("idle");
  };

  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

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
      </div>
      <div className="demo-app">
        <div className="app-frame">
          <div className="app-titlebar">
            <div className="dots"><span className="dot" /><span className="dot" /><span className="dot" /></div>
            <div className="url">arabaudit.com / audits / q1-2026 / execute / CR-1.2.3</div>
            <div className="live">LIVE</div>
          </div>
          <div className="app-body">
            <div
              style={{
                background: "var(--aa-slate-50)",
                padding: 16,
                borderRadius: 8,
                marginBottom: 20,
                borderLeft: "3px solid var(--aa-primary)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--f-mono)",
                  fontSize: 10,
                  color: "var(--aa-slate-600)",
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                }}
              >
                {t("criterionLabel")}
              </div>
              <div
                style={{
                  fontFamily: "var(--f-serif)",
                  fontSize: 18,
                  color: "var(--aa-primary)",
                  marginTop: 6,
                  fontWeight: 500,
                }}
              >
                {t("criterionText")}
              </div>
              <div style={{ fontSize: 12, color: "var(--aa-slate-600)", marginTop: 8 }}>{t("linkedEvidence")}</div>
            </div>

            {stage === "idle" && (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <button className="btn-ai" onClick={run}>
                  <span className="ai-pulse" style={{ display: "inline-flex" }}>
                    <MagicWand01Icon size={16} />
                  </span>{" "}
                  {t("runBtn")}
                </button>
                <div style={{ fontSize: 12, color: "var(--aa-slate-600)", marginTop: 12 }}>{t("runtime")}</div>
              </div>
            )}

            {stage === "loading" && (
              <div style={{ textAlign: "center", padding: "30px 0" }}>
                <div className="progress-spinner" style={{ marginBottom: 16 }}>
                  <svg viewBox="0 0 60 60">
                    <circle className="track" cx="30" cy="30" r="24" />
                    <circle
                      className="bar"
                      cx="30"
                      cy="30"
                      r="24"
                      style={{ strokeDashoffset: 150 - (phaseIdx / phases.length) * 150 }}
                    />
                  </svg>
                  <div className="sparkle ai-pulse"><MagicWand01Icon size={20} /></div>
                </div>
                <div style={{ fontFamily: "var(--f-serif)", fontSize: 16, color: "var(--aa-primary)" }}>
                  {phases[Math.min(phaseIdx, phases.length - 1)]}
                </div>
              </div>
            )}

            {stage === "result" && (
              <div>
                <div className="validation-result">
                  <div className="validation-header compliant">
                    <div className="val-status compliant">
                      <div className="val-status-icon"><Tick02Icon size={18} /></div>
                      <div>
                        <div className="val-status-label">{t("compliant")}</div>
                        <div style={{ fontSize: 12, color: "var(--aa-slate-600)", marginTop: 2 }}>{t("basedOn")}</div>
                      </div>
                    </div>
                    <div className="conf-badge conf-high">87% {t("confidence")}</div>
                  </div>
                  <div className="val-body">
                    <div className="val-section">
                      <div className="val-section-label">{t("recRating")}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div className="rating-stars">
                          {[0, 1, 2, 3].map((i) => (
                            <StarIcon key={i} size={16} className="star-filled" />
                          ))}
                          <StarIcon size={16} />
                        </div>
                        <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--aa-slate-600)" }}>
                          {t("ratingValue")}
                        </span>
                      </div>
                    </div>
                    <div className="val-section">
                      <div className="val-section-label">{t("justifLabel")}</div>
                      <div className="val-section-text">{t("justifText")}</div>
                    </div>
                    <div className="val-section">
                      <div className="val-section-label">{t("missingLabel")}</div>
                      <ul className="missing-list">
                        <li>{t("missing1")}</li>
                        <li>{t("missing2")}</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                  <button className="btn-ai ghost" onClick={reset}>{t("runAgain")}</button>
                  <button className="btn-ai">{t("acceptBtn")} →</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
