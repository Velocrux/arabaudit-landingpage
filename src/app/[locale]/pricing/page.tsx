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

          {(() => {
            type Cell = { kind: "check" } | { kind: "dash" } | { kind: "val"; key: string };
            const rows: Array<
              | { head: true; key: string }
              | { head: false; labelKey: string; cells: [Cell, Cell, Cell] }
            > = [
              { head: true, key: "sec1" },
              { head: false, labelKey: "r1", cells: [{ kind: "val", key: "r1s" }, { kind: "val", key: "r1p" }, { kind: "val", key: "r1e" }] },
              { head: false, labelKey: "r2", cells: [{ kind: "val", key: "r2s" }, { kind: "val", key: "r2p" }, { kind: "val", key: "r2e" }] },
              { head: false, labelKey: "r3", cells: [{ kind: "dash" }, { kind: "check" }, { kind: "check" }] },
              { head: false, labelKey: "r4", cells: [{ kind: "dash" }, { kind: "check" }, { kind: "check" }] },

              { head: true, key: "sec2" },
              { head: false, labelKey: "r5", cells: [{ kind: "check" }, { kind: "check" }, { kind: "check" }] },
              { head: false, labelKey: "r6", cells: [{ kind: "check" }, { kind: "val", key: "richer" }, { kind: "val", key: "richer" }] },
              { head: false, labelKey: "r7", cells: [{ kind: "dash" }, { kind: "check" }, { kind: "check" }] },
              { head: false, labelKey: "r8", cells: [{ kind: "dash" }, { kind: "check" }, { kind: "check" }] },
              { head: false, labelKey: "r9", cells: [{ kind: "dash" }, { kind: "check" }, { kind: "check" }] },
              { head: false, labelKey: "r10", cells: [{ kind: "dash" }, { kind: "check" }, { kind: "check" }] },
              { head: false, labelKey: "r11", cells: [{ kind: "dash" }, { kind: "check" }, { kind: "check" }] },
              { head: false, labelKey: "r12", cells: [{ kind: "dash" }, { kind: "check" }, { kind: "check" }] },

              { head: true, key: "sec3" },
              { head: false, labelKey: "r13", cells: [{ kind: "check" }, { kind: "check" }, { kind: "check" }] },
              { head: false, labelKey: "r14", cells: [{ kind: "check" }, { kind: "check" }, { kind: "check" }] },
              { head: false, labelKey: "r15", cells: [{ kind: "check" }, { kind: "check" }, { kind: "check" }] },
              { head: false, labelKey: "r16", cells: [{ kind: "check" }, { kind: "check" }, { kind: "check" }] },

              { head: true, key: "sec4" },
              { head: false, labelKey: "r17", cells: [{ kind: "val", key: "r17s" }, { kind: "val", key: "r17p" }, { kind: "val", key: "r17e" }] },
              { head: false, labelKey: "r18", cells: [{ kind: "dash" }, { kind: "val", key: "r18p" }, { kind: "val", key: "r18e" }] },
              { head: false, labelKey: "r19", cells: [{ kind: "check" }, { kind: "check" }, { kind: "check" }] },
              { head: false, labelKey: "r20", cells: [{ kind: "dash" }, { kind: "dash" }, { kind: "check" }] },

              { head: true, key: "sec5" },
              { head: false, labelKey: "r21", cells: [{ kind: "val", key: "r21s" }, { kind: "val", key: "r21p" }, { kind: "val", key: "r21e" }] },
              { head: false, labelKey: "r22", cells: [{ kind: "dash" }, { kind: "dash" }, { kind: "check" }] },
              { head: false, labelKey: "r23", cells: [{ kind: "dash" }, { kind: "dash" }, { kind: "check" }] },

              { head: true, key: "sec6" },
              { head: false, labelKey: "r24", cells: [{ kind: "check" }, { kind: "check" }, { kind: "check" }] },
              { head: false, labelKey: "r25", cells: [{ kind: "dash" }, { kind: "val", key: "r25p" }, { kind: "val", key: "r25e" }] },
              { head: false, labelKey: "r26", cells: [{ kind: "dash" }, { kind: "dash" }, { kind: "check" }] },
            ];
            return (
              <table>
                <thead>
                  <tr>
                    <th>{t("cmp.thFeature")}</th>
                    <th>{t("p1name")}<br /><span style={{ fontFamily: "var(--f-serif)", fontSize: 13, color: "var(--emerald-3)", textTransform: "none", letterSpacing: 0 }}>{t("cmp.priceStarter")}</span></th>
                    <th>{t("p2name")}<br /><span style={{ fontFamily: "var(--f-serif)", fontSize: 13, color: "var(--emerald-3)", textTransform: "none", letterSpacing: 0 }}>{t("cmp.pricePro")}</span></th>
                    <th>{t("p3name")}<br /><span style={{ fontFamily: "var(--f-serif)", fontSize: 13, color: "var(--emerald-3)", textTransform: "none", letterSpacing: 0 }}>{t("cmp.priceEnterprise")}</span></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) =>
                    row.head ? (
                      <tr key={i} className="section-head"><td colSpan={4}>{t(`cmp.${row.key}` as any)}</td></tr>
                    ) : (
                      <tr key={i}>
                        <td>{t(`cmp.${row.labelKey}` as any)}</td>
                        {row.cells.map((cell, j) =>
                          cell.kind === "check" ? (
                            <td key={j} className="check">✓</td>
                          ) : cell.kind === "dash" ? (
                            <td key={j} className="dash">—</td>
                          ) : (
                            <td key={j}><span className="val">{t(`cmp.${cell.key}` as any)}</span></td>
                          ),
                        )}
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            );
          })()}
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
