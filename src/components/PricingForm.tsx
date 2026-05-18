"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function PricingForm() {
  const t = useTranslations("pricing.form");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (submitted) {
    return (
      <div
        style={{
          background: "linear-gradient(135deg, #f0faf5 0%, #e6f4ed 100%)",
          border: "1px solid rgba(31,128,96,.25)",
          borderRadius: 16,
          padding: "48px 40px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "var(--emerald-3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            fontSize: 24,
          }}
        >
          ✓
        </div>
        <h3
          style={{
            fontFamily: "var(--f-serif)",
            fontSize: 24,
            color: "var(--emerald-3)",
            fontWeight: 500,
            margin: "0 0 10px",
          }}
        >
          {t("thanksTitle")}
        </h3>
        <p style={{ color: "var(--ink-3)", fontSize: 15, margin: 0, lineHeight: 1.6 }}>
          {t("thanksBody")}
        </p>
      </div>
    );
  }

  const frameworks = [
    { v: "nca-ecc", label: "NCA ECC" },
    { v: "sama-csf", label: "SAMA CSF" },
    { v: "sdaia-pdpl", label: "SDAIA PDPL" },
    { v: "cbahi", label: "CBAHI" },
    { v: "iso-27001", label: "ISO 27001" },
    { v: "pci-dss", label: "PCI DSS" },
    { v: "sama-it", label: "SAMA IT Governance" },
  ];

  const teamSizes = [
    { v: "1-10", label: t("ts1") },
    { v: "11-50", label: t("ts2") },
    { v: "51-200", label: t("ts3") },
    { v: "201-500", label: t("ts4") },
    { v: "500+", label: t("ts5") },
  ];

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid var(--line)",
        borderRadius: 16,
        padding: "40px",
        boxShadow: "0 4px 32px -8px rgba(14,63,46,.10)",
      }}
    >
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            fontFamily: "var(--f-mono)",
            fontSize: 11,
            letterSpacing: ".14em",
            color: "var(--gold-1)",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          {t("eyebrow")}
        </div>
        <h2
          style={{
            fontFamily: "var(--f-serif)",
            fontSize: 28,
            color: "var(--emerald-3)",
            fontWeight: 500,
            margin: "0 0 8px",
            letterSpacing: "-0.02em",
          }}
        >
          {t("title")}
        </h2>
        <p style={{ color: "var(--ink-3)", fontSize: 14, margin: 0, lineHeight: 1.6 }}>
          {t("sub")}
        </p>
      </div>

      {error && (
        <p
          role="alert"
          style={{
            color: "#b91c1c",
            background: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: 8,
            padding: "10px 14px",
            fontSize: 14,
            margin: "0 0 20px",
            lineHeight: 1.5,
          }}
        >
          {error}
        </p>
      )}

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setError(null);
          const form = e.currentTarget;
          const fd = new FormData(form);

          const agree = fd.get("agree");
          if (agree !== "on") {
            setError(t("errorValidation"));
            return;
          }

          const body = {
            firstName: String(fd.get("fname") ?? "").trim(),
            lastName: String(fd.get("lname") ?? "").trim(),
            email: String(fd.get("email") ?? "").trim(),
            phone: String(fd.get("phone") ?? "").trim(),
            organization: String(fd.get("org") ?? "").trim(),
            teamSize: String(fd.get("teamSize") ?? "").trim(),
            plan: String(fd.get("plan") ?? "").trim(),
            frameworks: fd.getAll("fw").map(String),
            message: String(fd.get("message") ?? "").trim(),
          };

          setIsSubmitting(true);
          try {
            const res = await fetch("/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            });
            const data = (await res.json().catch(() => ({}))) as { error?: string };

            if (!res.ok) {
              setError(data.error ?? t("errorGeneric"));
              return;
            }

            setSubmitted(true);
            form.reset();
            if (typeof window !== "undefined") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          } catch {
            setError(t("errorGeneric"));
          } finally {
            setIsSubmitting(false);
          }
        }}
      >
        {/* Plan interest */}
        <div className="cf-field" style={{ marginBottom: 20 }}>
          <label
            style={{
              display: "block",
              fontSize: 13,
              fontWeight: 600,
              color: "var(--ink-2)",
              marginBottom: 10,
            }}
          >
            {t("planL")}
          </label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 10,
            }}
          >
            {(["starter", "professional", "enterprise"] as const).map((p) => (
              <label
                key={p}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  border: "1px solid var(--line)",
                  borderRadius: 10,
                  padding: "12px 14px",
                  cursor: "pointer",
                  transition: "border-color .15s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input
                    type="radio"
                    name="plan"
                    value={p}
                    defaultChecked={p === "professional"}
                    disabled={isSubmitting}
                    style={{ accentColor: "var(--emerald-3)" }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--f-serif)",
                      fontSize: 15,
                      color: "var(--emerald-3)",
                      fontWeight: 500,
                    }}
                  >
                    {t(`plan${p.charAt(0).toUpperCase() + p.slice(1)}` as any)}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--ink-3)",
                    paddingLeft: 20,
                    lineHeight: 1.4,
                  }}
                >
                  {t(`plan${p.charAt(0).toUpperCase() + p.slice(1)}Sub` as any)}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Name row */}
        <div className="cf-row">
          <div className="cf-field">
            <label htmlFor="pf-fname">{t("fnameL")}</label>
            <input id="pf-fname" name="fname" type="text" required placeholder={t("fnameP")} disabled={isSubmitting} />
          </div>
          <div className="cf-field">
            <label htmlFor="pf-lname">{t("lnameL")}</label>
            <input id="pf-lname" name="lname" type="text" required placeholder={t("lnameP")} disabled={isSubmitting} />
          </div>
        </div>

        {/* Email + Phone */}
        <div className="cf-row">
          <div className="cf-field">
            <label htmlFor="pf-email">{t("emailL")}</label>
            <input id="pf-email" name="email" type="email" required placeholder={t("emailP")} disabled={isSubmitting} />
          </div>
          <div className="cf-field">
            <label htmlFor="pf-phone">{t("phoneL")}</label>
            <input id="pf-phone" name="phone" type="tel" placeholder={t("phoneP")} disabled={isSubmitting} />
          </div>
        </div>

        {/* Org + Team size */}
        <div className="cf-row">
          <div className="cf-field">
            <label htmlFor="pf-org">{t("orgL")}</label>
            <input id="pf-org" name="org" type="text" required placeholder={t("orgP")} disabled={isSubmitting} />
          </div>
          <div className="cf-field">
            <label htmlFor="pf-teamsize">{t("teamsizeL")}</label>
            <select id="pf-teamsize" name="teamSize" disabled={isSubmitting} style={{ width: "100%" }}>
              <option value="">{t("teamsizeP")}</option>
              {teamSizes.map((s) => (
                <option key={s.v} value={s.v}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Frameworks */}
        <div className="cf-field">
          <label>{t("fwL")}</label>
          <div className="cf-cb">
            {frameworks.map((f) => (
              <label key={f.v}>
                <input type="checkbox" name="fw" value={f.v} disabled={isSubmitting} /> {f.label}
              </label>
            ))}
          </div>
        </div>

        {/* Message */}
        <div className="cf-field">
          <label htmlFor="pf-message">{t("msgL")}</label>
          <textarea id="pf-message" name="message" rows={4} placeholder={t("msgP")} disabled={isSubmitting} />
        </div>

        {/* Agree */}
        <div className="cf-field">
          <label className="cf-agree">
            <input type="checkbox" name="agree" disabled={isSubmitting} />
            <span>{t("agree")}</span>
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{
            width: "100%",
            padding: 14,
            fontSize: 15,
            border: "none",
            cursor: isSubmitting ? "wait" : "pointer",
            marginTop: 8,
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? t("sending") : t("submit")}
        </button>

        <p style={{ textAlign: "center", color: "var(--ink-3)", fontSize: 12, margin: "16px 0 0" }}>
          {t("legal")}
        </p>
      </form>
    </div>
  );
}
