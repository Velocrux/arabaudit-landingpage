"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  LicenseIcon,
  Building01Icon,
  File01Icon,
  Tick02Icon,
  MagicWand01Icon,
} from "hugeicons-react";

interface Finding {
  label: string;
  value: string;
  status: "pass" | "warn" | "fail";
  pill: string;
}

interface Template {
  title: string;
  findings: Finding[];
}

type TplKey = "expiry" | "extract" | "sponsor" | "ar";

interface Props {
  autoStart?: number;
  compact?: boolean;
}

export default function DocChatDemo({ autoStart, compact }: Props = {}) {
  const t = useTranslations("product.docchat");

  const templates: Record<TplKey, Template> = {
    expiry: {
      title: t("exp_title"),
      findings: [
        { label: t("exp_l1"), value: t("exp_v1"), status: "pass", pill: t("pill_valid") },
        { label: t("exp_l2"), value: "2487563219", status: "pass", pill: t("pill_verified") },
        { label: t("exp_l3"), value: t("exp_v3"), status: "pass", pill: t("pill_matched") },
        { label: t("exp_l4"), value: t("exp_v4"), status: "warn", pill: t("pill_expiring") },
        { label: t("exp_l5"), value: t("exp_v5"), status: "warn", pill: t("pill_action") },
      ],
    },
    extract: {
      title: t("ext_title"),
      findings: [
        { label: t("ext_l1"), value: t("ext_v1"), status: "pass", pill: t("pill_extracted") },
        { label: t("ext_l2"), value: "أحمد حسن الفاروق", status: "pass", pill: t("pill_extracted") },
        { label: t("ext_l3"), value: "2487563219", status: "pass", pill: t("pill_extracted") },
        { label: t("ext_l4"), value: t("ext_v4"), status: "pass", pill: t("pill_extracted") },
        { label: t("ext_l5"), value: t("ext_v5"), status: "pass", pill: t("pill_extracted") },
        { label: t("ext_l6"), value: t("ext_v6"), status: "pass", pill: t("pill_extracted") },
        { label: t("ext_l7"), value: "2025-03-15 → 2026-04-25", status: "warn", pill: t("pill_expiring") },
      ],
    },
    sponsor: {
      title: t("spo_title"),
      findings: [
        { label: t("spo_l1"), value: t("spo_v1"), status: "pass", pill: t("pill_match") },
        { label: t("spo_l2"), value: t("spo_v2"), status: "pass", pill: t("pill_verified") },
        { label: t("spo_l3"), value: t("spo_v3"), status: "pass", pill: t("pill_confirmed") },
        { label: t("spo_l4"), value: t("spo_v4"), status: "pass", pill: t("pill_active") },
        { label: t("spo_l5"), value: t("spo_v5"), status: "pass", pill: t("pill_compliant") },
      ],
    },
    ar: {
      title: t("ar_title"),
      findings: [
        { label: t("ar_l1"), value: t("ar_v1"), status: "pass", pill: t("ar_pill_valid") },
        { label: t("ar_l2"), value: "أحمد حسن الفاروق", status: "pass", pill: t("ar_pill_extracted") },
        { label: t("ar_l3"), value: "2487563219", status: "pass", pill: t("ar_pill_extracted") },
        { label: t("ar_l4"), value: t("ar_v4"), status: "warn", pill: t("ar_pill_expiring") },
        { label: t("ar_l5"), value: t("ar_v5"), status: "warn", pill: t("ar_pill_action") },
      ],
    },
  };

  const [state, setState] = useState<"idle" | "loading" | "result">("idle");
  const [activeKey, setActiveKey] = useState<TplKey | null>(null);
  const [shownFindings, setShownFindings] = useState<number>(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => { timers.current.forEach(clearTimeout); }, []);

  const lastAutoStart = useRef(0);

  const run = (key: TplKey) => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setState("loading");
    setActiveKey(key);
    setShownFindings(0);
    const tpl = templates[key];
    timers.current.push(
      setTimeout(() => {
        setState("result");
        tpl.findings.forEach((_, i) => {
          timers.current.push(
            setTimeout(() => setShownFindings((s) => Math.max(s, i + 1)), i * 280)
          );
        });
      }, 900)
    );
  };

  useEffect(() => {
    if (autoStart && autoStart > lastAutoStart.current) {
      lastAutoStart.current = autoStart;
      run("expiry");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart]);

  const activeTpl = activeKey ? templates[activeKey] : null;
  const isAr = activeKey === "ar";

  return (
    <>
      {!compact && (
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
          <div
            style={{
              marginTop: 32,
              padding: "14px 18px",
              background: "rgba(200,169,81,.08)",
              borderRadius: 8,
              borderLeft: "3px solid var(--aa-gold)",
              fontSize: 13,
              color: "var(--aa-slate-800)",
            }}
          >
            <b>{t("tryItLabel")}</b> {t("tryItText")}
          </div>
        </div>
      )}
      <div className="demo-app">
        <div className="app-frame">
          <div className="app-titlebar">
            <div className="dots"><span className="dot" /><span className="dot" /><span className="dot" /></div>
            <div className="url">arabaudit.com / media / iqama-renewal-2026.pdf</div>
            <div className="live">LIVE</div>
          </div>
          <div className="app-body" style={{ padding: 16 }}>
            <div className="doc-chat-grid">
              <div className="doc-preview">
                <div className="doc-preview-head">
                  <div className="name">Iqama-Renewal-2026.pdf</div>
                  <div className="type">AR/EN · 320KB</div>
                </div>
                <div className="doc-scan">
                  KINGDOM OF SAUDI ARABIA<br />
                  MINISTRY OF INTERIOR · IQAMA<br />
                  <br />
                  <span className="ar">
                    المملكة العربية السعودية<br />
                    وزارة الداخلية · بطاقة إقامة
                  </span>
                  <br /><br />
                  Name: <span className="hl">AHMED HASSAN AL-FAROUQ</span><br />
                  <span className="ar">
                    الاسم: <span className="hl">أحمد حسن الفاروق</span>
                  </span>
                  <br /><br />
                  Iqama #: <span className="hl">2487563219</span><br />
                  Nationality: <span className="hl">EGYPTIAN</span><br />
                  Sponsor: <span className="hl">Client Organization LLC</span><br />
                  CR: 1010293847<br /><br />
                  Issue Date: <span className="hl">2025-03-15</span><br />
                  Expiry Date: <span className="hl">2026-04-25</span><br /><br />
                  <span className="ar">
                    تاريخ الانتهاء: <span className="hl">2026-04-25</span>
                  </span>
                  <br />
                  Profession: IT Security Analyst<br />
                  Grade: 2<br /><br />
                  Qualification: Master&apos;s - Computer Science<br />
                  Status: <span className="hl">ACTIVE · Renewed Q1</span>
                </div>
              </div>
              <div className="doc-chat-panel">
                <div className="doc-templates">
                  <button className="doc-template" data-tour-target="docchat-expiry" onClick={() => run("expiry")}>
                    <span className="ico"><LicenseIcon size={14} /></span>
                    {t("tpl_expiry")}
                  </button>
                  <button className="doc-template" onClick={() => run("extract")}>
                    <span className="ico"><File01Icon size={14} /></span>
                    {t("tpl_extract")}
                  </button>
                  <button className="doc-template" onClick={() => run("sponsor")}>
                    <span className="ico"><Building01Icon size={14} /></span>
                    {t("tpl_sponsor")}
                  </button>
                  <button className="doc-template" data-tour-target="docchat-ar" onClick={() => run("ar")}>
                    <span className="ico"><MagicWand01Icon size={14} /></span>
                    {t("tpl_ar")}
                  </button>
                </div>
                <div className="doc-result">
                  {state === "idle" && (
                    <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--aa-slate-400)", fontSize: 13 }}>
                      <div style={{ color: "var(--aa-gold-light)", marginBottom: 8, display: "flex", justifyContent: "center" }}>
                        <File01Icon size={32} />
                      </div>
                      {t("idlePrompt")}
                    </div>
                  )}
                  {state === "loading" && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "10px 14px",
                        background: "white",
                        borderRadius: 6,
                        marginBottom: 10,
                      }}
                    >
                      <div className="typing-dots"><span /><span /><span /></div>
                      <div style={{ fontSize: 12, color: "var(--aa-gold-dark)" }}>{t("analyzing")}</div>
                    </div>
                  )}
                  {state === "result" && activeTpl && (
                    <>
                      <div
                        style={{
                          padding: "10px 12px",
                          background: "white",
                          borderRadius: 6,
                          marginBottom: 10,
                          borderLeft: "3px solid var(--aa-gold)",
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "var(--f-mono)",
                            fontSize: 10,
                            color: "var(--aa-gold-dark)",
                            letterSpacing: ".12em",
                            textTransform: "uppercase",
                            textAlign: isAr ? "right" : "left",
                          }}
                        >
                          {isAr ? t("ar_analysisLabel") : t("analysisLabel")}
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--f-serif)",
                            fontSize: 15,
                            color: "var(--aa-primary)",
                            marginTop: 3,
                            fontWeight: 500,
                            textAlign: isAr ? "right" : "left",
                            direction: isAr ? "rtl" : "ltr",
                          }}
                        >
                          {activeTpl.title}
                        </div>
                      </div>
                      {activeTpl.findings.slice(0, shownFindings).map((f, i) => (
                        <div key={i} className="doc-finding">
                          <div className="doc-finding-head">
                            <div
                              className="label"
                              style={{
                                direction: isAr ? "rtl" : "ltr",
                                textAlign: isAr ? "right" : "left",
                              }}
                            >
                              {f.label}
                            </div>
                            <div className={`status-pill ${f.status}`}>{f.pill}</div>
                          </div>
                          <div
                            className="value"
                            style={{
                              direction: isAr ? "rtl" : "ltr",
                              textAlign: isAr ? "right" : "left",
                              fontFamily: isAr ? "IBM Plex Sans Arabic, sans-serif" : undefined,
                            }}
                          >
                            {f.value}
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
