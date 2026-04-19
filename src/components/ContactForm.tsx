"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("contact");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (submitted) {
    return (
      <div className="thanks-banner" style={{ display: "block" }}>
        <h4>{t("thanksTitle")}</h4>
        <p>{t("thanksBody")}</p>
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

  return (
    <div className="contact-form">
      <h2 style={{ fontFamily: "var(--f-serif)", fontSize: 28, color: "var(--emerald-3)", margin: "0 0 8px", fontWeight: 500 }}>
        {t("formTitle")}
      </h2>
      <p style={{ color: "var(--ink-3)", fontSize: 14, margin: "0 0 28px", lineHeight: 1.5 }}>
        {t("formSub")}
      </p>

      {error ? (
        <p
          role="alert"
          style={{
            color: "#b91c1c",
            fontSize: 14,
            margin: "0 0 16px",
            lineHeight: 1.5,
          }}
        >
          {error}
        </p>
      ) : null}

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
            const data = (await res.json().catch(() => ({}))) as {
              error?: string;
            };

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
        <div className="cf-row">
          <div className="cf-field">
            <label htmlFor="fname">{t("fnameL")}</label>
            <input id="fname" name="fname" type="text" required placeholder={t("fnameP")} disabled={isSubmitting} />
          </div>
          <div className="cf-field">
            <label htmlFor="lname">{t("lnameL")}</label>
            <input id="lname" name="lname" type="text" required placeholder={t("lnameP")} disabled={isSubmitting} />
          </div>
        </div>

        <div className="cf-row">
          <div className="cf-field">
            <label htmlFor="email">{t("emailL")}</label>
            <input id="email" name="email" type="email" required placeholder={t("emailP")} disabled={isSubmitting} />
          </div>
          <div className="cf-field">
            <label htmlFor="phone">{t("phoneL")}</label>
            <input id="phone" name="phone" type="tel" placeholder={t("phoneP")} disabled={isSubmitting} />
          </div>
        </div>

        <div className="cf-row">
          <div className="cf-field">
            <label htmlFor="org">{t("orgL")}</label>
            <input id="org" name="org" type="text" required placeholder={t("orgP")} disabled={isSubmitting} />
          </div>
        </div>

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

        <div className="cf-field">
          <label htmlFor="message">{t("msgL")}</label>
          <textarea id="message" name="message" placeholder={t("msgP")} disabled={isSubmitting} />
        </div>

        <div className="cf-field">
          <label className="cf-agree">
            <input type="checkbox" name="agree" disabled={isSubmitting} />
            <span>{t("agree")}</span>
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "100%", padding: 14, fontSize: 15, border: "none", cursor: isSubmitting ? "wait" : "pointer", marginTop: 8 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? t("sending") : t("submit")}
        </button>

        <p style={{ textAlign: "center", color: "var(--ink-3)", fontSize: 12, margin: "16px 0 0" }}>
          {t("legal1")}
          <a href="#" style={{ color: "var(--emerald-3)" }}>{t("legalLink")}</a>
          {t("legal2")}
        </p>
      </form>
    </div>
  );
}
