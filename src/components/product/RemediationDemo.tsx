"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  MagicWand01Icon,
  Refresh01Icon,
  Tick02Icon,
  AlertCircleIcon,
} from "hugeicons-react";

export default function RemediationDemo() {
  const t = useTranslations("product.remediation");

  const [state, setState] = useState<"idle" | "loading" | "result">("idle");
  const [priority, setPriority] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({
    s1: false,
    s2: false,
    s3: false,
    s4: false,
  });
  const [running, setRunning] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervals = useRef<ReturnType<typeof setInterval>[]>([]);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
      intervals.current.forEach(clearInterval);
    },
    []
  );

  const steps = [
    { n: 1, text: t("step1"), hours: "4h", evidence: false },
    { n: 2, text: t("step2"), hours: "6h", evidence: false },
    { n: 3, text: t("step3"), hours: "12h", evidence: true },
    { n: 4, text: t("step4"), hours: "4h", evidence: false },
    { n: 5, text: t("step5"), hours: "6h", evidence: false },
    { n: 6, text: t("step6"), hours: "2h", evidence: false },
  ];

  const run = () => {
    timers.current.forEach(clearTimeout);
    intervals.current.forEach(clearInterval);
    timers.current = [];
    intervals.current = [];
    setRunning(true);
    setState("loading");
    setPriority(0);
    setVisibleSections({ s1: false, s2: false, s3: false, s4: false });

    timers.current.push(
      setTimeout(() => {
        setState("result");
        setVisibleSections((v) => ({ ...v, s1: true }));

        const start = Date.now();
        const pInterval = setInterval(() => {
          const p = Math.min((Date.now() - start) / 1200, 1);
          setPriority(Math.round(p * 87));
          if (p >= 1) clearInterval(pInterval);
        }, 30);
        intervals.current.push(pInterval);

        ["s2", "s3", "s4"].forEach((id, i) => {
          timers.current.push(
            setTimeout(
              () => setVisibleSections((v) => ({ ...v, [id]: true })),
              400 + i * 500
            )
          );
        });
        timers.current.push(setTimeout(() => setRunning(false), 2000));
      }, 1500)
    );
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
          <button className="btn-ai" onClick={run} disabled={running}>
            {running ? (
              <>
                <span className="ai-pulse" style={{ display: "inline-flex" }}>
                  <MagicWand01Icon size={16} />
                </span>{" "}
                {t("draftingBtn")}
              </>
            ) : state !== "idle" ? (
              <>
                <Refresh01Icon size={16} /> {t("regenBtn")}
              </>
            ) : (
              <>
                <span className="ai-pulse" style={{ display: "inline-flex" }}>
                  <MagicWand01Icon size={16} />
                </span>{" "}
                {t("draftBtn")}
              </>
            )}
          </button>
        </div>
      </div>
      <div className="demo-app">
        <div className="app-frame">
          <div className="app-titlebar">
            <div className="dots"><span className="dot" /><span className="dot" /><span className="dot" /></div>
            <div className="url">arabaudit.com / remediation / FND-2026-Q1-002</div>
            <div className="live">LIVE</div>
          </div>
          <div className="app-body">
            <div className="ticket-card">
              <div className="ticket-head">
                <div>
                  <div className="id">FND-2026-Q1-002 · NCA ECC CR-2.7.2</div>
                  <div className="title" style={{ marginTop: 4 }}>{t("findingTitle")}</div>
                </div>
                <div className="ticket-priority">
                  <div className="score">{state === "result" ? priority : "—"}</div>
                  <div className="label">{t("priorityLabel")}</div>
                </div>
              </div>
              <div className="ticket-body">
                {state === "idle" && (
                  <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--aa-slate-400)", fontSize: 13 }}>
                    <div style={{ color: "var(--aa-gold-light)", marginBottom: 8, display: "flex", justifyContent: "center" }}>
                      <MagicWand01Icon size={32} />
                    </div>
                    {t("idlePrompt")}
                  </div>
                )}
                {state === "loading" && (
                  <div style={{ textAlign: "center", padding: "40px 20px" }}>
                    <div className="typing-dots" style={{ marginBottom: 10 }}>
                      <span /><span /><span />
                    </div>
                    <div style={{ fontSize: 12, color: "var(--aa-gold-dark)" }}>{t("analyzing")}</div>
                  </div>
                )}
                {state === "result" && (
                  <>
                    <div className={`ticket-section ${visibleSections.s1 ? "visible" : ""}`}>
                      <div className="ticket-section-label">{t("riskImpact")}</div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                        <div
                          style={{
                            padding: "10px 12px",
                            background: "rgba(197,64,43,.06)",
                            borderRadius: 6,
                            borderLeft: "2px solid #c5402b",
                          }}
                        >
                          <div
                            style={{
                              fontFamily: "var(--f-mono)",
                              fontSize: 9,
                              color: "#c5402b",
                              letterSpacing: ".1em",
                              textTransform: "uppercase",
                            }}
                          >
                            {t("regPenalty")}
                          </div>
                          <div style={{ fontSize: 13, color: "var(--aa-primary)", marginTop: 3, fontWeight: 500 }}>
                            {t("regPenaltyValue")}
                          </div>
                        </div>
                        <div
                          style={{
                            padding: "10px 12px",
                            background: "rgba(200,169,81,.08)",
                            borderRadius: 6,
                            borderLeft: "2px solid var(--aa-gold)",
                          }}
                        >
                          <div
                            style={{
                              fontFamily: "var(--f-mono)",
                              fontSize: 9,
                              color: "var(--aa-gold-dark)",
                              letterSpacing: ".1em",
                              textTransform: "uppercase",
                            }}
                          >
                            {t("affectedCtrls")}
                          </div>
                          <div style={{ fontSize: 13, color: "var(--aa-primary)", marginTop: 3, fontWeight: 500 }}>
                            {t("affectedCtrlsValue")}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`ticket-section ${visibleSections.s2 ? "visible" : ""}`}
                      style={{ marginTop: 16 }}
                    >
                      <div className="ticket-section-label">{t("assigneeLabel")}</div>
                      <div className="ticket-assignee">
                        <div className="avatar">KM</div>
                        <div style={{ flex: 1 }}>
                          <div className="name">{t("assigneeName")}</div>
                          <div className="role">{t("assigneeRole")}</div>
                        </div>
                        <div className="status-pill pass">{t("pill_match")}</div>
                      </div>
                      <div className="sod-alert">
                        <AlertCircleIcon size={11} /> {t("sodAlert")}
                      </div>
                    </div>

                    <div
                      className={`ticket-section ${visibleSections.s3 ? "visible" : ""}`}
                      style={{ marginTop: 16 }}
                    >
                      <div className="ticket-section-label">{t("actionPlan")}</div>
                      {steps.map((s) => (
                        <div
                          key={s.n}
                          className="action-step"
                          style={s.evidence ? { flexDirection: "column", alignItems: "stretch" } : undefined}
                        >
                          {s.evidence ? (
                            <>
                              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                                <div className="num">{s.n}</div>
                                <div style={{ flex: 1 }}>{s.text}</div>
                                <div className="hrs">{s.hours}</div>
                              </div>
                              <div className="evidence-callout">
                                <Tick02Icon size={11} /> {t("evidenceCallout")}
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="num">{s.n}</div>
                              <div style={{ flex: 1 }}>{s.text}</div>
                              <div className="hrs">{s.hours}</div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>

                    <div
                      className={`ticket-section ${visibleSections.s4 ? "visible" : ""}`}
                      style={{ marginTop: 16 }}
                    >
                      <div className="ticket-section-label">{t("deadlinesLabel")}</div>
                      <div className="deadlines">
                        <div className="deadline-box suggested">
                          <div className="l">{t("sugCompletion")}</div>
                          <div className="d">2026-05-02</div>
                          <div style={{ fontSize: 11, color: "var(--aa-slate-600)", marginTop: 3 }}>
                            {t("sugCompletionSub")}
                          </div>
                        </div>
                        <div className="deadline-box hard">
                          <div className="l">{t("hardDeadline")}</div>
                          <div className="d">2026-05-09</div>
                          <div style={{ fontSize: 11, color: "var(--aa-slate-600)", marginTop: 3 }}>
                            {t("hardDeadlineSub")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
