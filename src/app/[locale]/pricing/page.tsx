import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { FAQList } from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import PricingForm from "@/components/PricingForm";
import { buildMetadata, SITE_URL, BRAND } from "@/lib/seo";
import { breadcrumbNode, faqNode, jsonLdGraph } from "@/lib/jsonld";

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

  const ld = jsonLdGraph([
    {
      "@type": "Product",
      name: `${BRAND.name} — ${locale === "ar" ? "باقات الامتثال" : "Compliance Plans"}`,
      description: m("description"),
      brand: { "@type": "Brand", name: BRAND.name },
      url: `${SITE_URL}/${locale}/pricing`,
    },
    faqNode(faqItems),
    breadcrumbNode(locale, [
      { name: "ArabAudit", path: "/" },
      { name: m("title"), path: "/pricing" },
    ]),
  ]);

  const plans = [
    {
      name: t("p1name"),
      title: t("p1title"),
      desc: t("p1desc"),
      features: [t("p1f1"), t("p1f2"), t("p1f3"), t("p1f4"), t("p1f5"), t("p1f6"), t("p1f7")],
    },
    {
      name: t("p2name"),
      title: t("p2title"),
      desc: t("p2desc"),
      features: [t("p2f1"), t("p2f2"), t("p2f3"), t("p2f4"), t("p2f5"), t("p2f6")],
      featured: true,
    },
    {
      name: t("p3name"),
      title: t("p3title"),
      desc: t("p3desc"),
      features: [t("p3f1"), t("p3f2"), t("p3f3"), t("p3f4"), t("p3f5"), t("p3f6"), t("p3f7")],
    },
  ];

  return (
    <>
      <JsonLd id="ld-pricing" data={ld} />
      <Nav />
      <main id="main">

      {/* HERO */}
      <section className="pricing-hero">
        <div className="wrap">
          <div className="eyebrow">{t("eyebrow")}</div>
          <h1 className="h1" style={{ marginTop: 16, maxWidth: 820 }}>
            {t("titleA")}
            <em style={{ color: "var(--gold-1)" }}>{t("titleB")}</em>
          </h1>
          <p className="lede" style={{ marginTop: 20, maxWidth: 720 }}>{t("lede")}</p>
        </div>
      </section>

      {/* PLANS + FORM */}
      <section style={{ padding: "0 0 80px" }}>
        <div className="wrap">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 48,
              alignItems: "start",
            }}
            className="pricing-split"
          >
            {/* LEFT: plan feature cards */}
            <div>
              <div
                style={{
                  fontFamily: "var(--f-mono)",
                  fontSize: 11,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "var(--ink-3)",
                  marginBottom: 20,
                }}
              >
                {t("plansEyebrow")}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {plans.map((p, i) => (
                  <div
                    key={i}
                    style={{
                      background: p.featured
                        ? "linear-gradient(135deg, #0e3f2e 0%, #1a6b4f 100%)"
                        : "#fff",
                      border: p.featured
                        ? "none"
                        : "1px solid var(--line)",
                      borderRadius: 14,
                      padding: "24px 28px",
                      boxShadow: p.featured
                        ? "0 16px 40px -8px rgba(14,63,46,.35)"
                        : "0 2px 12px -4px rgba(14,63,46,.08)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {p.featured && (
                      <div
                        style={{
                          position: "absolute",
                          top: 16,
                          right: 16,
                          background: "var(--gold-3)",
                          color: "#0e3f2e",
                          fontSize: 10,
                          fontFamily: "var(--f-mono)",
                          letterSpacing: ".1em",
                          fontWeight: 700,
                          padding: "3px 10px",
                          borderRadius: 20,
                          textTransform: "uppercase",
                        }}
                      >
                        {t("mostPopular")}
                      </div>
                    )}
                    <div
                      style={{
                        fontFamily: "var(--f-mono)",
                        fontSize: 10,
                        letterSpacing: ".14em",
                        color: p.featured ? "var(--gold-3)" : "var(--gold-1)",
                        textTransform: "uppercase",
                        marginBottom: 4,
                      }}
                    >
                      {p.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--f-serif)",
                        fontSize: 20,
                        color: p.featured ? "var(--cream-1)" : "var(--emerald-3)",
                        fontWeight: 500,
                        marginBottom: 6,
                      }}
                    >
                      {p.title}
                    </div>
                    <p
                      style={{
                        fontSize: 13,
                        color: p.featured ? "rgba(247,243,234,.72)" : "var(--ink-3)",
                        margin: "0 0 16px",
                        lineHeight: 1.5,
                      }}
                    >
                      {p.desc}
                    </p>
                    <ul
                      style={{
                        padding: 0,
                        margin: 0,
                        listStyle: "none",
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                      }}
                    >
                      {p.features.map((f, j) => (
                        <li
                          key={j}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 8,
                            fontSize: 13,
                            color: p.featured ? "rgba(247,243,234,.85)" : "var(--ink-2)",
                            lineHeight: 1.4,
                          }}
                        >
                          <span
                            style={{
                              color: p.featured ? "var(--gold-3)" : "var(--emerald-3)",
                              flexShrink: 0,
                              marginTop: 1,
                            }}
                          >
                            ✓
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: 20,
                  padding: "16px 20px",
                  background: "var(--cream-1)",
                  border: "1px solid var(--line)",
                  borderLeft: "3px solid var(--gold-1)",
                  borderRadius: 8,
                  fontSize: 13,
                  color: "var(--ink-3)",
                  fontStyle: "italic",
                }}
              >
                {t("addonNoteA")}
                <strong style={{ color: "var(--emerald-3)", fontStyle: "normal" }}>
                  {t("addonNoteB")}
                </strong>
              </div>
            </div>

            {/* RIGHT: inquiry form */}
            <div style={{ position: "sticky", top: 100 }}>
              <PricingForm />
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .pricing-split {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* FEATURE COMPARE TABLE */}
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
                    <th>{t("p1name")}</th>
                    <th>{t("p2name")}</th>
                    <th>{t("p3name")}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) =>
                    row.head ? (
                      <tr key={i} className="section-head">
                        <td colSpan={4}>{t(`cmp.${row.key}` as any)}</td>
                      </tr>
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
          <h2 className="display" style={{ fontSize: "clamp(40px, 5.6vw, 84px)", marginTop: 20 }}>
            {t("ctaTitle")}
          </h2>
          <p className="lede" style={{ margin: "28px auto 0", maxWidth: 680 }}>{t("ctaLede")}</p>
          <div className="flex gap-3 mt-8 center">
            <Link href="/demo-audit" className="btn btn-primary">{t("ctaPrimary")}</Link>
            <Link href="/contact" className="btn btn-ghost on-dark">{t("ctaGhost")}</Link>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </>
  );
}
