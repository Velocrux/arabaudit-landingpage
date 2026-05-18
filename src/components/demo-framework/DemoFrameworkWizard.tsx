"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { buildFrameworks, type Framework } from "@/lib/data";
import {
  Calendar03Icon,
  MagicWand01Icon,
  Cancel01Icon,
  Clock04Icon,
  Tick02Icon,
} from "hugeicons-react";
import { useAutoplay } from "@/components/autoplay/useAutoplay";
import AutoplayCursor from "@/components/autoplay/AutoplayCursor";
import { buildFrameworkWizardSequence } from "@/components/autoplay/sequences/frameworkWizard";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

const INDUSTRY = "Financial Services";

export default function DemoFrameworkWizard() {
  const t = useTranslations("demoFramework");
  const tFw = useTranslations("fwData");
  const frameworks = buildFrameworks(tFw);
  const router = useRouter();
  const searchParams = useSearchParams();
  const preId = searchParams?.get("id") || null;

  const [step, setStep] = useState<Step>(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [owned, setOwned] = useState<string[]>([]);
  const [auditorTags, setAuditorTags] = useState<string[]>([
    "Khalid Al-Mansour",
    "Sara Al-Nasser",
  ]);
  const [auditTitle, setAuditTitle] = useState(t("defaultAuditTitle"));
  const [auditFrameworkId, setAuditFrameworkId] = useState<string>("");
  const [auditDate, setAuditDate] = useState("2026-04-25");
  const [countdown, setCountdown] = useState(3);
  const [toastVisible, setToastVisible] = useState(false);
  const [adminApproved, setAdminApproved] = useState(false);
  const autoplayRootRef = useRef<HTMLDivElement | null>(null);

  // Pre-select from ?id=
  useEffect(() => {
    if (!preId) return;
    const fw = frameworks.find((f) => f.id === preId);
    if (!fw) return;
    setSelected([preId]);
    setOwned([preId]);
    setTimeout(() => setStep(4), 80);
  }, [preId]);

  // Scroll to panel when step changes
  useEffect(() => {
    const panel = document.querySelector(".panel");
    if (panel) {
      window.scrollTo({
        top: (panel as HTMLElement).offsetTop - 60,
        behavior: "smooth",
      });
    }
  }, [step]);

  // Populate audit framework on entering step 5
  useEffect(() => {
    if (step === 5 && owned.length > 0 && !auditFrameworkId) {
      setAuditFrameworkId(owned[0]);
    }
  }, [step, owned, auditFrameworkId]);

  // Step 6: countdown + redirect
  useEffect(() => {
    if (step !== 6) return;
    setCountdown(3);
    const t1 = setInterval(() => {
      setCountdown((n) => Math.max(0, n - 1));
    }, 1000);
    const t2 = setTimeout(() => {
      router.push("/demo-audit?from=framework-browser");
    }, 3000);
    return () => {
      clearInterval(t1);
      clearTimeout(t2);
    };
  }, [step, router]);

  const goTo = (n: Step) => {
    if (n === 2 && selected.length === 0) return;
    setStep(n);
  };

  const toggleFw = (id: string) => {
    if (owned.includes(id)) return;
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const submitRequest = () => setStep(3);

  const adminApprove = () => {
    setAdminApproved(true);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 4000);
    setOwned((prev) => {
      const next = [...prev];
      selected.forEach((id) => {
        if (!next.includes(id)) next.push(id);
      });
      return next;
    });
    setTimeout(() => setStep(4), 1600);
  };

  const resetDemo = () => {
    setSelected([]);
    setOwned([]);
    setAdminApproved(false);
    setAuditFrameworkId("");
    setStep(1);
  };

  const byId = (id: string) => frameworks.find((f) => f.id === id)!;

  const displayStep = step === 6 ? 5 : step;
  const pct = ((displayStep - 1) / 4) * 100;

  const autoplaySteps = buildFrameworkWizardSequence({
    step,
    selected,
    adminApproved,
    frameworks,
    titleToType: t("defaultAuditTitle"),
    contextToType: t("defaultNotes"),
    descriptionToType: t("defaultDescription"),
    toggleFw,
    goTo,
    submitRequest,
    adminApprove,
  });
  const cursorState = useAutoplay({
    containerRef: autoplayRootRef,
    steps: autoplaySteps,
  });

  const stepperSteps = [
    { n: 1 as const, label: t("s1") },
    { n: 2 as const, label: t("s2") },
    { n: 3 as const, label: t("s3") },
    { n: 4 as const, label: t("s4") },
    { n: 5 as const, label: t("s5") },
  ];

  return (
    <div ref={autoplayRootRef}>
      <AutoplayCursor state={cursorState} />
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
              fontSize: "clamp(40px, 6vw, 72px)",
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
            style={{ marginTop: 40, ["--step-progress" as any]: pct }}
          >
            {stepperSteps.map((s) => {
              const active = s.n === step || (step === 6 && s.n === 5);
              const done = s.n < step && !(step === 6 && s.n === 5);
              return (
                <button
                  key={s.n}
                  type="button"
                  className={`step${active ? " active" : ""}${done ? " done" : ""}`}
                  onClick={() => goTo(s.n)}
                >
                  <div className="circle">
                    <span>{s.n}</span>
                  </div>
                  <div className="label">{s.label}</div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* PANEL */}
      <section className="panel">
        <div className="stage">
          {step === 1 && (
            <div>
              <div className="stage-badge">
                <span className="dot" />
                <span>{t("stepOf", { n: 1 })}</span>
              </div>
              <h2 className="stage-h1">{t("stage1Title")}</h2>
              <p className="stage-sub">{t("stage1Sub")}</p>

              <div className="app-card">
                <AppTopbar url="arabaudit.com / choose-framework" />
                <div className="app-content">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div>
                      <h3 style={{ fontFamily: "var(--f-serif)", fontSize: 24, color: "var(--aa-primary)", fontWeight: 500, margin: 0 }}>
                        {t("catalogTitle")}
                      </h3>
                      <p style={{ color: "var(--aa-slate-600)", fontSize: 13, margin: "4px 0 0" }}>
                        {t("catalogSub")}{" "}
                        <strong style={{ color: "var(--aa-primary)" }}>{t("finServices")}</strong>
                      </p>
                    </div>
                    <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--aa-slate-600)" }}>
                      <span>{selected.length}</span> {t("selected")}
                    </div>
                  </div>

                  <div className="df-fw-grid">
                    {frameworks.map((fw, idx) => {
                      const isMatch =
                        fw.sector === INDUSTRY ||
                        (fw.sector &&
                          (fw.sector.includes("Financial") || fw.sector.includes("IT")));
                      const isOwned = owned.includes(fw.id);
                      const isSelected = selected.includes(fw.id);
                      return (
                        <button
                          key={fw.id}
                          type="button"
                          className={`df-fw-card${isOwned ? " owned" : ""}${isSelected ? " selected" : ""}`}
                          onClick={() => toggleFw(fw.id)}
                          disabled={isOwned}
                          data-autoplay={idx < 2 ? `fw-card-${idx}` : undefined}
                        >
                          <div className="df-fw-check" />
                          <div className="name">{fw.name}</div>
                          <div className="desc">{fw.summary || fw.tagline}</div>
                          <div className="meta">
                            {isOwned && <span className="chip-sm chip-owned">✓ {t("active")}</span>}
                            {isMatch && !isOwned && <span className="chip-sm chip-industry">{t("industryMatch")}</span>}
                            <span className="chip-sm chip-version">v{fw.version}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="nav-actions">
                    <span style={{ fontSize: 12, color: "var(--aa-slate-600)", alignSelf: "center" }}>
                      {t("industryMatchLine")}
                    </span>
                    <button
                      type="button"
                      className="btn-aa primary"
                      disabled={selected.length === 0}
                      onClick={() => goTo(2)}
                      data-autoplay="goto-step-2"
                    >
                      {t("requestAccess")} ({selected.length}) →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="stage-badge">
                <span className="dot" />
                <span>{t("stepOf", { n: 2 })}</span>
              </div>
              <h2 className="stage-h1">{t("stage2Title")}</h2>
              <p className="stage-sub">{t("stage2Sub")}</p>

              <div className="app-card">
                <AppTopbar url="arabaudit.com / choose-framework / request" />
                <div className="app-content">
                  <h3 style={{ fontFamily: "var(--f-serif)", fontSize: 22, color: "var(--aa-primary)", fontWeight: 500, margin: "0 0 4px" }}>
                    {t("requestTitle")}
                  </h3>
                  <p style={{ color: "var(--aa-slate-600)", fontSize: 13, margin: "0 0 20px" }}>
                    {t("requestSub")}
                  </p>

                  <div className="selected-list">
                    <div className="label">{t("requestingLabel")}</div>
                    <div className="items">
                      {selected.map((id) => (
                        <div className="item" key={id}>
                          {byId(id).shortCode}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="info-box">
                    <h4>
                      <Clock04Icon size={16} />
                      {t("howWorks")}
                    </h4>
                    <ul>
                      <li>{t("hw1")}</li>
                      <li>{t("hw2")}</li>
                      <li>{t("hw3")}</li>
                      <li>{t("hw4")}</li>
                    </ul>
                  </div>

                  <div className="field" style={{ marginTop: 20 }}>
                    <label>{t("additionalContext")}</label>
                    <textarea
                      rows={3}
                      placeholder={t("additionalContextP")}
                      defaultValue={t("defaultNotes")}
                      data-autoplay="step2-context-textarea"
                    />
                  </div>

                  <div className="nav-actions">
                    <button type="button" className="btn-aa ghost" onClick={() => goTo(1)}>
                      {t("backCatalog")}
                    </button>
                    <button
                      type="button"
                      className="btn-aa gold"
                      onClick={submitRequest}
                      data-autoplay="submit-request"
                    >
                      <MagicWand01Icon size={16} /> {t("submitRequest")} ({selected.length})
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="stage-badge">
                <span className="dot" style={{ background: "var(--aa-blue-500)" }} />
                <span>{t("stage3Badge")}</span>
              </div>
              <h2 className="stage-h1">{t("stage3Title")}</h2>
              <p className="stage-sub">{t("stage3Sub")}</p>

              <div
                className="dfw-pending-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 20,
                  marginTop: 32,
                }}
              >
                <div className="app-card">
                  <AppTopbar url="arabaudit.com / pending" small />
                  <div className="app-content" style={{ padding: 20 }}>
                    <div className="pending-panel" style={{ padding: "20px 0" }}>
                      <div className="pending-clock">
                        <Clock04Icon size={40} />
                      </div>
                      <h3 style={{ fontFamily: "var(--f-serif)", fontSize: 20, color: "var(--aa-primary)", fontWeight: 500, margin: 0 }}>
                        {t("underReview")}
                      </h3>
                      <p style={{ color: "var(--aa-slate-600)", fontSize: 13, margin: "8px 0 0" }}>
                        {t("autoRefresh")}
                      </p>
                      <div
                        style={{
                          marginTop: 14,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          fontFamily: "var(--f-mono)",
                          fontSize: 11,
                          color: "var(--aa-blue-600)",
                          letterSpacing: ".1em",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-block",
                            width: 12,
                            height: 12,
                            border: "2px solid rgba(59,130,246,.3)",
                            borderTopColor: "var(--aa-blue-500)",
                            borderRadius: "50%",
                            animation: adminApproved ? undefined : "spin 0.8s linear infinite",
                          }}
                        />
                        <span>{t("checkingStatus")}</span>
                      </div>
                    </div>
                    <div className="request-list" style={{ marginTop: 16 }}>
                      {selected.map((id) => (
                        <div
                          key={id}
                          className={`request-row ${adminApproved ? "approved" : "pending"}`}
                        >
                          <div className="status-icon">
                            {adminApproved ? <Tick02Icon size={18} /> : <Clock04Icon size={18} />}
                          </div>
                          <div className="details">
                            <div className="name">{byId(id).name}</div>
                            <div className="date">
                              {adminApproved ? t("approvedJustNow") : t("requestedJustNow")}
                            </div>
                          </div>
                          <div className="badge">
                            {adminApproved ? t("approved") : t("pending")}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="app-card">
                  <div
                    className="app-topbar"
                    style={{
                      background: "var(--aa-primary)",
                      borderBottomColor: "rgba(247,243,234,.1)",
                    }}
                  >
                    <div className="dots">
                      <span style={{ background: "rgba(247,243,234,.2)" }} />
                      <span style={{ background: "rgba(247,243,234,.2)" }} />
                      <span style={{ background: "rgba(247,243,234,.2)" }} />
                    </div>
                    <div
                      className="url"
                      style={{
                        background: "rgba(247,243,234,.08)",
                        borderColor: "rgba(247,243,234,.15)",
                        color: "var(--cream-1)",
                        fontSize: 10,
                      }}
                    >
                      superadmin / framework-requests
                    </div>
                    <div className="user">
                      <div className="avatar" style={{ background: "var(--aa-gold)", color: "var(--aa-primary)" }}>
                        SA
                      </div>
                      <div className="name" style={{ color: "var(--cream-1)" }}>{t("superadmin")}</div>
                    </div>
                  </div>
                  <div className="app-content" style={{ padding: 20, background: "var(--aa-slate-50)" }}>
                    <div
                      style={{
                        fontFamily: "var(--f-mono)",
                        fontSize: 10,
                        color: "var(--aa-gold-dark)",
                        letterSpacing: ".14em",
                        textTransform: "uppercase",
                        marginBottom: 12,
                      }}
                    >
                      {t("pendingRequests")}
                    </div>
                    <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: 10, padding: 16 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                        <div>
                          <div style={{ fontSize: 14, color: "var(--aa-primary)", fontWeight: 600 }}>
                            {t("orgName")}
                          </div>
                          <div style={{ fontSize: 11, color: "var(--aa-slate-600)", marginTop: 2 }}>
                            {t("requester")}
                          </div>
                        </div>
                        <div className={`chip-sm ${adminApproved ? "chip-owned" : "chip-pending"}`}>
                          {adminApproved ? t("approved") : t("pending")}
                        </div>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 14 }}>
                        {selected.map((id) => (
                          <span className="chip-sm chip-version" key={id}>
                            {byId(id).shortCode}
                          </span>
                        ))}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "var(--aa-slate-600)",
                          lineHeight: 1.5,
                          marginBottom: 14,
                          padding: 10,
                          background: "var(--aa-slate-50)",
                          borderRadius: 6,
                          fontStyle: "italic",
                        }}
                      >
                        &quot;{t("defaultNotes")}&quot;
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button
                          type="button"
                          className="btn-aa ghost"
                          style={{ flex: 1, padding: 8, fontSize: 13 }}
                          disabled
                        >
                          {t("reject")}
                        </button>
                        <button
                          type="button"
                          className="btn-aa primary"
                          style={{
                            flex: 1,
                            padding: 8,
                            fontSize: 13,
                            background: adminApproved ? undefined : "var(--aa-green-600)",
                            opacity: adminApproved ? 0.5 : 1,
                          }}
                          onClick={adminApprove}
                          disabled={adminApproved}
                          data-autoplay="admin-approve"
                        >
                          {adminApproved ? `✓ ${t("approved")}` : `✓ ${t("approve")}`}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="nav-actions">
                <button type="button" className="btn-aa ghost" onClick={() => goTo(2)}>
                  {t("back")}
                </button>
                <div style={{ fontSize: 12, color: "var(--aa-slate-600)", alignSelf: "center" }}>
                  {t("hintApprove")}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <div className="stage-badge">
                <span className="dot" style={{ background: "var(--aa-green-500)" }} />
                <span>{t("stage4Badge")}</span>
              </div>
              <h2 className="stage-h1">{t("stage4Title")}</h2>
              <p className="stage-sub">{t("stage4Sub")}</p>

              <div className="app-card">
                <AppTopbar url="arabaudit.com / org-admin-dashboard" />
                <div className="app-content">
                  <div className="approved-hero">
                    <div className="check-badge">✓</div>
                    <h3>{t("approvedHero")}</h3>
                    <p>
                      {t("approvedBy")}{" "}
                      <span style={{ fontFamily: "var(--f-mono)", color: "var(--aa-slate-400)", fontSize: 11 }}>
                        {t("justNow")}
                      </span>
                    </p>
                  </div>

                  <div
                    style={{
                      fontFamily: "var(--f-mono)",
                      fontSize: 10,
                      color: "var(--aa-gold-dark)",
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      margin: "0 0 12px",
                    }}
                  >
                    {t("yourActive")}
                  </div>
                  <div>
                    {owned.map((id) => {
                      const fw = byId(id);
                      return (
                        <div
                          key={id}
                          style={{
                            padding: "14px 16px",
                            background: "white",
                            border: "1px solid rgba(34,197,94,.25)",
                            borderRadius: 10,
                            marginBottom: 8,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div
                              style={{
                                width: 36,
                                height: 36,
                                borderRadius: 8,
                                background: fw.color || "#1f8060",
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontFamily: "var(--f-mono)",
                                fontSize: 11,
                                fontWeight: 700,
                              }}
                            >
                              {fw.shortCode.slice(0, 3).toUpperCase()}
                            </div>
                            <div>
                              <div style={{ fontSize: 14, color: "var(--aa-primary)", fontWeight: 600 }}>
                                {fw.name}
                              </div>
                              <div style={{ fontSize: 11, color: "var(--aa-slate-600)", marginTop: 2 }}>
                                {fw.domains} domains · {fw.controls} controls · v{fw.version}
                              </div>
                            </div>
                          </div>
                          <span className="chip-sm chip-owned">● {t("active")}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="nav-actions">
                    <button type="button" className="btn-aa ghost" onClick={() => goTo(3)}>
                      {t("back")}
                    </button>
                    <button
                      type="button"
                      className="btn-aa gold"
                      onClick={() => goTo(5)}
                      data-autoplay="schedule-first-audit"
                    >
                      {t("scheduleFirst")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <div className="stage-badge">
                <span className="dot" />
                <span>{t("stage5Badge")}</span>
              </div>
              <h2 className="stage-h1">{t("stage5Title")}</h2>
              <p className="stage-sub">{t("stage5Sub")}</p>

              <div className="app-card">
                <AppTopbar url="arabaudit.com / audits / create" />
                <div className="app-content">
                  <h3 style={{ fontFamily: "var(--f-serif)", fontSize: 22, color: "var(--aa-primary)", fontWeight: 500, margin: "0 0 20px" }}>
                    {t("createAudit")}
                  </h3>

                  <div className="audit-form-grid">
                    <div className="form-card">
                      <h4>
                        <span className="num">1</span> {t("basicInfo")}
                      </h4>
                      <div className="field">
                        <label>
                          {t("auditTitle")} <span className="req">*</span>
                        </label>
                        <input
                          type="text"
                          value={auditTitle}
                          onChange={(e) => setAuditTitle(e.target.value)}
                          data-autoplay="step5-title-input"
                        />
                        <div className="help">{t("auditTitleHelp")}</div>
                      </div>
                      <div className="field">
                        <label>
                          {t("compFramework")} <span className="req">*</span>
                        </label>
                        <select
                          value={auditFrameworkId}
                          onChange={(e) => setAuditFrameworkId(e.target.value)}
                          data-autoplay="step5-framework-select"
                        >
                          {owned.map((id) => {
                            const fw = byId(id);
                            return (
                              <option key={id} value={id}>
                                {fw.name} (v{fw.version})
                              </option>
                            );
                          })}
                        </select>
                        <div className="help">{t("compFrameworkHelp")}</div>
                      </div>
                      <div className="field">
                        <label>
                          {t("organization")} <span className="req">*</span>
                        </label>
                        <select disabled>
                          <option>{t("orgFull")}</option>
                        </select>
                      </div>
                      <div className="field">
                        <label>{t("scheduledDate")}</label>
                        <input
                          type="date"
                          value={auditDate}
                          onChange={(e) => setAuditDate(e.target.value)}
                          data-autoplay="step5-date-input"
                        />
                      </div>
                      <div className="field">
                        <label>{t("description")}</label>
                        <textarea
                          rows={3}
                          placeholder={t("descriptionP")}
                          defaultValue={t("defaultDescription")}
                          data-autoplay="step5-description-textarea"
                        />
                      </div>
                    </div>

                    <div className="form-card">
                      <h4>
                        <span className="num">2</span> {t("auditTeam")}
                      </h4>
                      <div className="field">
                        <label>
                          {t("leadAuditor")} <span className="req">*</span>
                        </label>
                        <select data-autoplay="step5-lead-auditor-select">
                          <option>Layla Al-Sulaiman (CISA) · Lead</option>
                          <option>Khalid Al-Mansour (CIA)</option>
                          <option>Ahmed Al-Farouq (CISA, CISM)</option>
                        </select>
                        <div className="help">{t("leadAuditorHelp")}</div>
                      </div>
                      <div className="field">
                        <label>{t("additionalAuditors")}</label>
                        <div className="auditor-picker">
                          {auditorTags.map((name) => (
                            <div className="auditor-tag" key={name}>
                              {name}{" "}
                              <span
                                className="x"
                                onClick={() =>
                                  setAuditorTags(auditorTags.filter((n) => n !== name))
                                }
                              >
                                <Cancel01Icon size={12} />
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="help">{t("addAuditors")}</div>
                      </div>
                      <div className="field">
                        <label>{t("orgContact")}</label>
                        <select data-autoplay="step5-org-contact-select">
                          <option>Mohammed Al-Qahtani (CISO)</option>
                          <option>Hassan Al-Rashid (Head of Compliance)</option>
                          <option>Fatima Al-Zahrani (Risk Manager)</option>
                        </select>
                        <div className="help">{t("orgContactHelp")}</div>
                      </div>

                      <h4 style={{ marginTop: 20 }}>
                        <span className="num">3</span> {t("auditSettings")}
                      </h4>
                      <div className="settings">
                        <label>
                          <input
                            type="checkbox"
                            defaultChecked
                            data-autoplay="step5-allow-remote-checkbox"
                          />{" "}
                          {t("allowRemote")}
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            defaultChecked
                            data-autoplay="step5-require-signoff-checkbox"
                          />{" "}
                          {t("requireSignoff")}
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="nav-actions">
                    <button type="button" className="btn-aa ghost" onClick={() => goTo(4)}>
                      {t("back")}
                    </button>
                    <div style={{ display: "flex", gap: 10 }}>
                      <button type="button" className="btn-aa ghost" onClick={() => goTo(6)}>
                        {t("saveDraft")}
                      </button>
                      <button
                        type="button"
                        className="btn-aa gold"
                        onClick={() => goTo(6)}
                        data-autoplay="schedule-audit-final"
                      >
                        <Calendar03Icon size={16} /> {t("scheduleAudit")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 6 && (
            <div>
              <div className="app-card">
                <AppTopbar url="arabaudit.com / audits / AUD-2026-Q1-001" />
                <div className="app-content">
                  <div className="success-hero">
                    <div className="success-circle">✓</div>
                    <h2 style={{ fontFamily: "var(--f-serif)", fontSize: 32, color: "var(--aa-primary)", fontWeight: 500, margin: "0 0 8px" }}>
                      {t("successTitle")}
                    </h2>
                    <p style={{ color: "var(--aa-slate-600)", fontSize: 15, margin: "0 auto", maxWidth: 480 }}>
                      {t("successSub")}
                    </p>

                    <div className="audit-summary">
                      <div className="row">
                        <span className="k">{t("auditId")}</span>
                        <span className="v" style={{ fontFamily: "var(--f-mono)", color: "var(--aa-gold-dark)" }}>
                          AUD-2026-Q1-001
                        </span>
                      </div>
                      <div className="row"><span className="k">{t("title")}</span><span className="v">{auditTitle}</span></div>
                      <div className="row">
                        <span className="k">{t("framework")}</span>
                        <span className="v">
                          {auditFrameworkId ? byId(auditFrameworkId).name : "NCA ECC"}
                        </span>
                      </div>
                      <div className="row"><span className="k">{t("leadAuditorLabel")}</span><span className="v">{t("leadAuditorValue")}</span></div>
                      <div className="row"><span className="k">{t("teamSize")}</span><span className="v">{t("teamSizeValue")}</span></div>
                      <div className="row"><span className="k">{t("scheduled")}</span><span className="v">{auditDate}</span></div>
                      <div className="row">
                        <span className="k">{t("status")}</span>
                        <span className="v" style={{ color: "var(--aa-green-600)" }}>{t("statusScheduled")}</span>
                      </div>
                    </div>

                    <div
                      style={{
                        marginTop: 28,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 14,
                      }}
                    >
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "10px 20px",
                          background: "rgba(11,70,52,.06)",
                          border: "1px solid rgba(11,70,52,.15)",
                          borderRadius: 8,
                          fontSize: 13,
                          color: "var(--aa-slate-600)",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-block",
                            width: 14,
                            height: 14,
                            border: "2px solid rgba(11,70,52,.2)",
                            borderTopColor: "var(--aa-primary)",
                            borderRadius: "50%",
                            animation: "spin 0.8s linear infinite",
                          }}
                        />
                        <span>
                          {t("redirecting")} <strong>{countdown}</strong>s…
                        </span>
                      </div>
                      <button type="button" className="btn-aa ghost" onClick={resetDemo}>
                        {t("runAgain")}
                      </button>
                    </div>
                  </div>
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
            <a href="/contact" className="btn btn-primary">{t("ctaPrimary")}</a>
            <a href="mailto:kauser@arabaudit.com" className="btn btn-ghost on-dark">{t("ctaGhost")}</a>
          </div>
        </div>
      </section>

      {/* TOAST */}
      <div className={`toast${toastVisible ? " show" : ""}`}>
        <div className="icon-wrap">
          <Tick02Icon size={16} />
        </div>
        <div>
          <div className="title">{t("toastTitle")}</div>
          <div className="sub">
            {selected.length}{" "}
            {selected.length === 1 ? t("toastSubA") : t("toastSubB")}
          </div>
        </div>
      </div>
    </div>
  );
}

function AppTopbar({ url, small }: { url: string; small?: boolean }) {
  return (
    <div className="app-topbar">
      <div className="dots">
        <span />
        <span />
        <span />
      </div>
      <div className="url" style={small ? { fontSize: 10 } : undefined}>{url}</div>
      <div className="user">
        <div className="avatar">KJ</div>
        {!small && <div className="name">Kauser · Najm Insurance</div>}
      </div>
    </div>
  );
}
