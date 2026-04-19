import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { FAQList } from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, SITE_URL, BRAND } from "@/lib/seo";
import {
  breadcrumbNode,
  faqNode,
  jsonLdGraph,
} from "@/lib/jsonld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = await getTranslations({ locale, namespace: "meta.pricing" });
  return buildMetadata({
    locale,
    path: "/pricing",
    title: m("title"),
    description: m("description"),
    keywords: m("keywords")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
  });
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pricing");
  const m = await getTranslations({ locale, namespace: "meta.pricing" });

  const faqItems = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
    q: t(`q${n}` as any),
    a: t(`a${n}` as any),
  }));

  const offersLd = {
    "@type": "Product",
    name: `${BRAND.name} — ${locale === "ar" ? "باقات الامتثال" : "Compliance Plans"}`,
    description: m("description"),
    brand: { "@type": "Brand", name: BRAND.name },
    url: `${SITE_URL}/${locale}/pricing`,
    offers: [
      {
        "@type": "Offer",
        name: "Starter",
        price: "30000",
        priceCurrency: "SAR",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/${locale}/pricing`,
      },
      {
        "@type": "Offer",
        name: "Professional",
        price: "70000",
        priceCurrency: "SAR",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/${locale}/pricing`,
      },
      {
        "@type": "Offer",
        name: "Enterprise",
        priceCurrency: "SAR",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/${locale}/contact`,
      },
    ],
  };

  const ld = jsonLdGraph([
    offersLd,
    faqNode(faqItems),
    breadcrumbNode(locale, [
      { name: "ArabAudit", path: "/" },
      { name: m("title"), path: "/pricing" },
    ]),
  ]);

  interface Plan {
    name: string;
    title: string;
    desc: string;
    amt: string;
    per: string;
    note: string;
    features: string[];
    cta: string;
    ctaHref: string;
    ctaClass: string;
    featured?: boolean;
    amtSmall?: boolean;
  }

  const plans: Plan[] = [
    {
      name: t("p1name"),
      title: t("p1title"),
      desc: t("p1desc"),
      amt: t("p1amt"),
      per: t("p1per"),
      note: t("p1note"),
      features: [t("p1f1"), t("p1f2"), t("p1f3"), t("p1f4"), t("p1f5"), t("p1f6"), t("p1f7")],
      cta: t("p1cta"),
      ctaHref: "mailto:kauser@arabaudit.com?subject=Starter%20Plan%20Inquiry",
      ctaClass: "ghost",
    },
    {
      name: t("p2name"),
      title: t("p2title"),
      desc: t("p2desc"),
      amt: t("p2amt"),
      per: t("p2per"),
      note: t("p2note"),
      features: [t("p2f1"), t("p2f2"), t("p2f3"), t("p2f4"), t("p2f5"), t("p2f6")],
      cta: t("p2cta"),
      ctaHref: "mailto:kauser@arabaudit.com?subject=Professional%20Plan%20Inquiry",
      ctaClass: "featured-cta",
      featured: true,
    },
    {
      name: t("p3name"),
      title: t("p3title"),
      desc: t("p3desc"),
      amt: t("p3amt"),
      per: t("p3per"),
      note: t("p3note"),
      features: [t("p3f1"), t("p3f2"), t("p3f3"), t("p3f4"), t("p3f5"), t("p3f6"), t("p3f7")],
      cta: t("p3cta"),
      ctaHref: "mailto:kauser@arabaudit.com?subject=Enterprise%20Inquiry",
      ctaClass: "primary",
      amtSmall: true,
    },
  ];

  return (
    <>
      <JsonLd id="ld-pricing" data={ld} />
      <Nav />
      <main id="main">

      <section className="pricing-hero">
        <div className="wrap">
          <div className="eyebrow">{t("eyebrow")}</div>
          <h1 className="h1" style={{ marginTop: 16, maxWidth: 820 }}>
            {t("titleA")}
            <em style={{ color: "var(--gold-1)" }}>{t("titleB")}</em>
          </h1>
          <p className="lede" style={{ marginTop: 20, maxWidth: 720 }}>{t("lede")}</p>

          <div className="plans-grid">
            {plans.map((p, i) => (
              <div
                key={i}
                className={`plan${p.featured ? " featured" : ""}`}
                data-popular={p.featured ? t("mostPopular") : undefined}
              >
                <div className="plan-name">{p.name}</div>
                <div className="plan-title">{p.title}</div>
                <div className="plan-desc">{p.desc}</div>

                <div className="plan-price">
                  <div className="amt" style={p.amtSmall ? { fontSize: 36 } : undefined}>
                    {!p.amtSmall && <span className="cur">SAR</span>}
                    {p.amt}
                  </div>
                  <div className="per">{p.per}</div>
                  <div className="note">{p.note}</div>
                </div>

                <ul className="plan-features">
                  {p.features.map((f, j) => <li key={j}>{f}</li>)}
                </ul>

                <a href={p.ctaHref} className={`plan-cta ${p.ctaClass}`}>
                  {p.cta}
                </a>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 40,
              padding: 20,
              background: "white",
              border: "1px solid var(--line)",
              borderLeft: "3px solid var(--gold-1)",
              borderRadius: 8,
              textAlign: "center",
              fontSize: 14,
              color: "var(--ink-2)",
              fontStyle: "italic",
            }}
          >
            {t("addonNoteA")}
            <strong style={{ color: "var(--emerald-3)", fontStyle: "normal" }}>{t("addonNoteB")}</strong>
          </div>
        </div>
      </section>

      {/* Compare */}
      <section className="compare-table">
        <div className="wrap">
          <div className="eyebrow">{t("compareEyebrow")}</div>
          <h2 className="mt-4 h1" style={{ maxWidth: 720 }}>{t("compareTitle")}</h2>

          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Starter<br /><span style={{ fontFamily: "var(--f-serif)", fontSize: 13, color: "var(--emerald-3)", textTransform: "none", letterSpacing: 0 }}>SAR 30,000/yr</span></th>
                <th>Professional<br /><span style={{ fontFamily: "var(--f-serif)", fontSize: 13, color: "var(--emerald-3)", textTransform: "none", letterSpacing: 0 }}>SAR 70,000/yr</span></th>
                <th>Enterprise<br /><span style={{ fontFamily: "var(--f-serif)", fontSize: 13, color: "var(--emerald-3)", textTransform: "none", letterSpacing: 0 }}>Custom</span></th>
              </tr>
            </thead>
            <tbody>
              <tr className="section-head"><td colSpan={4}>Frameworks & Scope</td></tr>
              <tr><td>Frameworks included</td><td><span className="val">1 Core</span></td><td><span className="val">Multi-framework</span></td><td><span className="val">Unlimited</span></td></tr>
              <tr><td>Additional frameworks</td><td><span className="val">SAR 20k each</span></td><td><span className="val">SAR 20k each</span></td><td><span className="val">Included</span></td></tr>
              <tr><td>Multi-Framework Overlap Engine</td><td className="dash">—</td><td className="check">✓</td><td className="check">✓</td></tr>
              <tr><td>Findings & Remediation workflow</td><td className="dash">—</td><td className="check">✓</td><td className="check">✓</td></tr>

              <tr className="section-head"><td colSpan={4}>AI Features</td></tr>
              <tr><td>AI-powered validity monitoring</td><td className="check">✓</td><td className="check">✓</td><td className="check">✓</td></tr>
              <tr><td>AI Audit Readiness</td><td className="check">✓</td><td><span className="val">Richer readiness</span></td><td><span className="val">Richer readiness</span></td></tr>
              <tr><td>AI Evidence Validation</td><td className="dash">—</td><td className="check">✓</td><td className="check">✓</td></tr>
              <tr><td>AI Finding Draft (bilingual)</td><td className="dash">—</td><td className="check">✓</td><td className="check">✓</td></tr>
              <tr><td>Audit Copilot</td><td className="dash">—</td><td className="check">✓</td><td className="check">✓</td></tr>
              <tr><td>Deep Arabic Document AI</td><td className="dash">—</td><td className="check">✓</td><td className="check">✓</td></tr>
              <tr><td>AI Summary Report (streaming)</td><td className="dash">—</td><td className="check">✓</td><td className="check">✓</td></tr>
              <tr><td>AI Remediation Planner</td><td className="dash">—</td><td className="check">✓</td><td className="check">✓</td></tr>

              <tr className="section-head"><td colSpan={4}>Operations & Export</td></tr>
              <tr><td>Digital Evidence Vault</td><td className="check">✓</td><td className="check">✓</td><td className="check">✓</td></tr>
              <tr><td>One-Click Regulatory Export</td><td className="check">✓</td><td className="check">✓</td><td className="check">✓</td></tr>
              <tr><td>Evidence ledger (SHA-256)</td><td className="check">✓</td><td className="check">✓</td><td className="check">✓</td></tr>
              <tr><td>Data export (JSON/CSV/PDF)</td><td className="check">✓</td><td className="check">✓</td><td className="check">✓</td></tr>

              <tr className="section-head"><td colSpan={4}>Users & Access</td></tr>
              <tr><td>User seats included</td><td><span className="val">3 seats</span></td><td><span className="val">10 seats</span></td><td><span className="val">Unlimited</span></td></tr>
              <tr><td>Additional user seats</td><td className="dash">—</td><td><span className="val">On request</span></td><td><span className="val">Included</span></td></tr>
              <tr><td>Role-based access control</td><td className="check">✓</td><td className="check">✓</td><td className="check">✓</td></tr>
              <tr><td>SSO · SAML · AD integration</td><td className="dash">—</td><td className="dash">—</td><td className="check">✓</td></tr>

              <tr className="section-head"><td colSpan={4}>Infrastructure</td></tr>
              <tr><td>Hosting</td><td><span className="val">me-central-2</span></td><td><span className="val">me-central-2</span></td><td><span className="val">Sovereign Gateway (on-prem)</span></td></tr>
              <tr><td>Custom integrations (AD/SIEM)</td><td className="dash">—</td><td className="dash">—</td><td className="check">✓</td></tr>
              <tr><td>API access & webhooks</td><td className="dash">—</td><td className="dash">—</td><td className="check">✓</td></tr>

              <tr className="section-head"><td colSpan={4}>Support</td></tr>
              <tr><td>Email support</td><td className="check">✓</td><td className="check">✓</td><td className="check">✓</td></tr>
              <tr><td>Response SLA</td><td className="dash">—</td><td><span className="val">4-hr</span></td><td><span className="val">1-hr</span></td></tr>
              <tr><td>Dedicated Customer Success Manager</td><td className="dash">—</td><td className="dash">—</td><td className="check">✓</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <hr className="divider" />

      {/* FAQ */}
      <section style={{ padding: "80px 0" }}>
        <div className="wrap-narrow">
          <div className="eyebrow">{t("faqEyebrow")}</div>
          <h2 className="mt-4 h1">{t("faqTitle")}</h2>
          <div style={{ marginTop: 40 }}>
            <FAQList items={faqItems} />
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* CTA */}
      <section className="dark" style={{ padding: "120px 0", backgroundColor: "rgb(7, 55, 39)" }}>
        <div className="wrap" style={{ textAlign: "center" }}>
          <div className="eyebrow on-dark">{t("ctaEyebrow")}</div>
          <h2 className="display" style={{ fontSize: "clamp(40px, 5.6vw, 84px)", marginTop: 20 }}>{t("ctaTitle")}</h2>
          <p className="lede" style={{ margin: "28px auto 0", maxWidth: 680 }}>{t("ctaLede")}</p>
          <div className="flex gap-3 mt-8 center">
            <Link href="/demo-audit" className="btn btn-primary">{t("ctaPrimary")}</Link>
            <a href="mailto:kauser@arabaudit.com" className="btn btn-ghost on-dark">{t("ctaGhost")}</a>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </>
  );
}
