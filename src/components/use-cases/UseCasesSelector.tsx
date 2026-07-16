"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import UseCasesAuditFlow from "./UseCasesAuditFlow";

type UseCaseKey =
  | "healthcare"
  | "cybersecurity"
  | "itGovernance"
  | "dataProtection"
  | "payments"
  | "infosec"
  | "general";

const useCaseColors: Record<UseCaseKey, string> = {
  healthcare: "rgb(34, 197, 94)",
  cybersecurity: "rgb(59, 130, 246)",
  itGovernance: "rgb(168, 85, 247)",
  dataProtection: "rgb(109, 64, 153)",
  payments: "rgb(204, 51, 51)",
  infosec: "rgb(26, 77, 122)",
  general: "rgb(217, 119, 6)",
};

export default function UseCasesSelector() {
  const t = useTranslations("useCases");
  const [selectedUseCase, setSelectedUseCase] = useState<UseCaseKey | null>(null);

  if (selectedUseCase) {
    return (
      <UseCasesAuditFlow
        selectedUseCase={selectedUseCase}
        onBack={() => setSelectedUseCase(null)}
      />
    );
  }

  const useCases: UseCaseKey[] = ["healthcare", "cybersecurity", "itGovernance", "dataProtection", "payments", "infosec", "general"];

  return (
    <main className="page-container">
      {/* Hero */}
      <section className="hero-section">
        <div className="fw-hero">
          <div className="wrap">
            <div className="eyebrow">{t("heroEyebrow")}</div>
            <h1 className="h1">
              {t("heroTitleA")} {t("heroTitleB")} {t("heroTitleC")}
            </h1>
            <p className="lede">{t("heroLede")}</p>
          </div>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="use-cases-section">
        <div className="section-inner">
          <h2 className="section-title">{t("selectUseCaseTitle")}</h2>
          <p className="section-sub">{t("selectUseCaseSub")}</p>

          <div className="use-cases-grid">
            {useCases.map((key) => {
              return (
                <button
                  key={key}
                  className="uc-card-item"
                  style={{ borderTopColor: useCaseColors[key] }}
                  onClick={() => setSelectedUseCase(key)}
                >
                  <div className="uc-card-content">
                    <div className="uc-card-framework">{t(`${key}.framework`)}</div>
                    <h3 className="uc-card-title">{t(`${key}.title`)}</h3>
                    <div className="uc-card-tagline">{t(`${key}.subtitle`)}</div>
                    <p className="uc-card-summary">{t(`${key}.description`)}</p>
                  </div>
                  <div className="uc-card-cta">
                    <span>{t("startDemo")}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <style jsx>{`
        .page-container {
          width: 100%;
        }

        .hero-section {
          padding: 0;
          background: transparent;
        }

        .fw-hero {
          padding: clamp(2.5rem, 5vw, 5rem) clamp(1rem, 3vw, 2rem);
          background: var(--cream-1, rgb(254, 251, 245));
          border-bottom: 1px solid var(--line, rgba(200, 200, 200, 0.1));
        }

        .wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(0.25rem, 1vw, 0.75rem);
        }

        .eyebrow {
          font-family: var(--f-mono, monospace);
          font-size: 11px;
          color: var(--gold-4, rgb(217, 119, 6));
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .h1 {
          font-family: var(--f-serif, serif);
          font-size: clamp(1.875rem, 4.5vw, 3.5rem);
          font-weight: 400;
          line-height: 1.2;
          margin: 1rem 0 0 0;
          color: var(--emerald-3, #064e3b);
        }

        .lede {
          font-size: clamp(0.95rem, 1.1vw, 1.0625rem);
          line-height: 1.7;
          margin: 1.25rem 0 0 0;
          color: var(--ink-2, #666);
        }

        .use-cases-section {
          padding: clamp(2rem, 4vw, 4rem) clamp(1rem, 3vw, 2rem);
          border-bottom: 1px solid var(--line, rgba(200, 200, 200, 0.1));
        }

        .section-inner {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-title {
          font-family: var(--f-serif, serif);
          font-size: clamp(1.5rem, 3vw, 2.25rem);
          font-weight: 400;
          margin: 0 0 1rem 0;
          color: var(--ink-1, #000);
        }

        .section-sub {
          font-size: 0.95rem;
          color: var(--ink-2, #666);
          margin: 0 0 3rem 0;
          max-width: 700px;
          line-height: 1.6;
        }

        .use-cases-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-top: 2rem;
        }

        .uc-card-item {
          display: flex;
          flex-direction: column;
          padding: 24px;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          background: white;
          border: 1px solid var(--line, rgba(200, 200, 200, 0.2));
          border-top: 3px solid;
          border-radius: 8px;
          transition: all 0.25s ease;
          cursor: pointer;
          text-align: left;
        }

        .uc-card-item:hover {
          border-color: var(--gold-2, rgba(217, 119, 6, 0.3));
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
          transform: translateY(-3px);
        }

        .uc-card-content {
          flex: 1;
          min-height: 0;
          display: flex;
          flex-direction: column;
          transition: opacity 0.25s, filter 0.25s;
        }

        .uc-card-framework {
          font-family: var(--f-mono, monospace);
          font-size: 11px;
          color: var(--ink-4, #999);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .uc-card-title {
          font-family: var(--f-serif, serif);
          font-weight: 400;
          font-size: 24px;
          margin: 0 0 4px 0;
          color: var(--emerald-3, #000);
        }

        .uc-card-tagline {
          font-size: 13px;
          color: var(--ink-4, #999);
          font-style: italic;
          margin-bottom: 14px;
          margin-top: 0;
        }

        .uc-card-summary {
          font-size: 14px;
          color: var(--ink-3, #666);
          line-height: 1.6;
          margin: 0 0 auto 0;
        }

        .uc-card-cta {
          font-size: 14px;
          font-weight: 500;
          margin-top: 16px;
          padding-top: 12px;
        }

        @media (max-width: 768px) {
          .h1 {
            font-size: 2rem;
          }

          .use-cases-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
