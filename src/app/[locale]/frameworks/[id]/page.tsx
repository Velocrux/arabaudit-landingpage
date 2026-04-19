import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { frameworks, getFramework } from "@/lib/data";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import {
  breadcrumbNode,
  frameworkDetailNode,
  jsonLdGraph,
} from "@/lib/jsonld";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    frameworks.map((f) => ({ locale, id: f.id }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const framework = getFramework(id);
  if (!framework) return {};

  const m = await getTranslations({
    locale,
    namespace: "meta.frameworkDetail",
  });

  const values = {
    name: framework.name,
    shortCode: framework.shortCode,
    domains: framework.domains,
    controls: framework.controls,
    authority: framework.authority,
  };

  const title = m("titleTemplate", values);
  const description = m("descriptionTemplate", values);
  const keywords = m("keywordsTemplate", values)
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  return buildMetadata({
    locale,
    path: `/frameworks/${framework.id}`,
    title,
    description,
    keywords,
    type: "article",
  });
}

export default async function FrameworkDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const framework = getFramework(id);
  if (!framework) notFound();
  const t = await getTranslations("frameworkDetail");
  const mf = await getTranslations({ locale, namespace: "meta.frameworks" });

  const detailNode = frameworkDetailNode(locale, id);
  const ld = jsonLdGraph(
    [
      detailNode,
      breadcrumbNode(locale, [
        { name: "ArabAudit", path: "/" },
        { name: mf("title"), path: "/frameworks" },
        { name: framework.name, path: `/frameworks/${framework.id}` },
      ]),
    ].filter((n): n is NonNullable<typeof n> => n !== null)
  );

  return (
    <>
      <JsonLd id={`ld-framework-${framework.id}`} data={ld} />
      <Nav />
      <main id="main">

      <section className="detail-hero">
        <div className="wrap">
          <Link href="/frameworks" style={{ color: "var(--gold-3)", textDecoration: "none", fontSize: 14 }}>
            {t("back")}
          </Link>
          <div style={{ borderLeft: `3px solid ${framework.color}`, paddingLeft: 24, marginTop: 16 }}>
            <div
              style={{
                fontFamily: "var(--f-mono)",
                fontSize: 11,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: framework.color,
              }}
            >
              {framework.shortCode}
            </div>
            <h1 className="h1" style={{ marginTop: 10 }}>{framework.name}</h1>
            <p className="lede" style={{ marginTop: 12, color: "var(--ink-2)" }}>{framework.tagline}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="detail-grid">
            {/* Main */}
            <div>
              <div style={{ background: "var(--cream-1)", padding: 24, borderRadius: 8, marginBottom: 40 }}>
                <h3 className="h3" style={{ marginTop: 0 }}>{t("overview")}</h3>
                <p style={{ color: "var(--ink-2)", lineHeight: 1.7, marginTop: 12 }}>{framework.summary}</p>
              </div>

              <div className="detail-domains">
                <h3 className="h3">
                  {t("domainsHeading")} ({framework.domains})
                </h3>
                <p style={{ color: "var(--ink-3)", marginTop: 8, marginBottom: 24 }}>
                  {t("domainsIntro", { count: framework.domains, controls: framework.controls })}
                </p>

                {framework.domainsList.map((d) => (
                  <div className="domain-card" key={d.id}>
                    <h4>{t("domainLabel")} {d.number}: {d.name}</h4>
                    <div style={{ fontSize: 13, color: "var(--ink-4)", padding: "12px 0", borderTop: "1px solid var(--line)" }}>
                      <strong>{d.controlCount}</strong> {t("controlsInDomain")}
                    </div>
                    {d.description && (
                      <p style={{ fontSize: 13, color: "var(--ink-2)", marginTop: 12, lineHeight: 1.6 }}>
                        {d.description}
                      </p>
                    )}
                  </div>
                ))}

                <div
                  style={{
                    marginTop: 32,
                    padding: 20,
                    background: "var(--cream-1)",
                    borderRadius: 8,
                    borderLeft: `3px solid ${framework.color}`,
                  }}
                >
                  <p style={{ margin: 0, color: "var(--ink-2)" }}>
                    <strong>
                      {t("mappingNote")}{" "}
                      <Link href="/demo-framework" style={{ color: framework.color }}>
                        {t("mappingLink")}
                      </Link>
                      .
                    </strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="sidebar-stat">
                <div className="label">{t("totalControls")}</div>
                <div className="value">{framework.controls}</div>
              </div>
              <div className="sidebar-stat">
                <div className="label">{t("domainsSidebar")}</div>
                <div className="value">{framework.domains}</div>
              </div>
              <div className="sidebar-info">
                <div className="label">{t("authority")}</div>
                <div className="value">{framework.authority}</div>
              </div>
              <div className="sidebar-info" style={{ marginTop: 20 }}>
                <div className="label">{t("sector")}</div>
                <div className="value">{framework.sector}</div>
              </div>
              <div className="sidebar-info" style={{ marginTop: 20 }}>
                <div className="label">{t("versionSidebar")}</div>
                <div className="value">{framework.version}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      <section className="section" style={{ background: "var(--cream-1)" }}>
        <div className="wrap">
          <div className="eyebrow">{t("ctaEyebrow")}</div>
          <h2 className="mt-4 h1">{t("ctaTitle")}</h2>
          <p className="lede mt-6" style={{ color: "var(--ink-2)" }}>{t("ctaLede")}</p>
          <div className="flex gap-3 mt-8">
            <Link href="/demo-audit" className="btn btn-primary">{t("ctaPrimary")}</Link>
            <Link href="/contact" className="btn btn-ghost">{t("ctaGhost")}</Link>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </>
  );
}
