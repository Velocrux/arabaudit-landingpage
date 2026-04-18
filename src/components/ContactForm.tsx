"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("contact");
  const [submitted, setSubmitted] = useState(false);

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

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
          if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <div className="cf-row">
          <div className="cf-field">
            <label htmlFor="fname">{t("fnameL")}</label>
            <input id="fname" type="text" required placeholder={t("fnameP")} />
          </div>
          <div className="cf-field">
            <label htmlFor="lname">{t("lnameL")}</label>
            <input id="lname" type="text" required placeholder={t("lnameP")} />
          </div>
        </div>

        <div className="cf-row">
          <div className="cf-field">
            <label htmlFor="email">{t("emailL")}</label>
            <input id="email" type="email" required placeholder={t("emailP")} />
          </div>
          <div className="cf-field">
            <label htmlFor="phone">{t("phoneL")}</label>
            <input id="phone" type="tel" placeholder={t("phoneP")} />
          </div>
        </div>

        <div className="cf-row">
          <div className="cf-field">
            <label htmlFor="org">{t("orgL")}</label>
            <input id="org" type="text" required placeholder={t("orgP")} />
          </div>
          <div className="cf-field">
            <label htmlFor="role">{t("roleL")}</label>
            <select id="role" required defaultValue="">
              <option value="" disabled>{t("roleSelect")}</option>
              <option>{t("role1")}</option>
              <option>{t("role2")}</option>
              <option>{t("role3")}</option>
              <option>{t("role4")}</option>
              <option>{t("role5")}</option>
              <option>{t("role6")}</option>
              <option>{t("role7")}</option>
              <option>{t("role8")}</option>
            </select>
          </div>
        </div>

        <div className="cf-field">
          <label>{t("fwL")}</label>
          <div className="cf-cb">
            {frameworks.map((f) => (
              <label key={f.v}>
                <input type="checkbox" name="fw" value={f.v} /> {f.label}
              </label>
            ))}
          </div>
        </div>

        <div className="cf-field">
          <label htmlFor="plan">{t("planL")}</label>
          <select id="plan" defaultValue={t("plan2")}>
            <option>{t("plan1")}</option>
            <option>{t("plan2")}</option>
            <option>{t("plan3")}</option>
            <option>{t("plan4")}</option>
          </select>
        </div>

        <div className="cf-field">
          <label htmlFor="timing">{t("timingL")}</label>
          <select id="timing">
            <option>{t("timing1")}</option>
            <option>{t("timing2")}</option>
            <option>{t("timing3")}</option>
            <option>{t("timing4")}</option>
            <option>{t("timing5")}</option>
          </select>
        </div>

        <div className="cf-field">
          <label htmlFor="message">{t("msgL")}</label>
          <textarea id="message" placeholder={t("msgP")} />
        </div>

        <div className="cf-field">
          <label className="cf-cb" style={{ display: "inline-flex", marginTop: 6 }}>
            <input type="checkbox" required />{" "}
            <span style={{ textTransform: "none", letterSpacing: 0, fontFamily: "inherit" }}>
              {t("agree")}
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "100%", padding: 14, fontSize: 15, border: "none", cursor: "pointer", marginTop: 8 }}
        >
          {t("submit")}
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
