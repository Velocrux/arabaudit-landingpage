import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AvatarTourLoader from "@/components/product/avatar-tour/AvatarTourLoader";
import SeoFallback from "@/components/product/avatar-tour/SeoFallback";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import {
  breadcrumbNode,
  jsonLdGraph,
  softwareApplicationNode,
} from "@/lib/jsonld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = await getTranslations({ locale, namespace: "meta.product" });
  return buildMetadata({
    locale,
    path: "/product",
    title: m("title"),
    description: m("description"),
    keywords: m("keywords")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("product");
  const m = await getTranslations({ locale, namespace: "meta.product" });
  const ld = jsonLdGraph([
    softwareApplicationNode(locale),
    breadcrumbNode(locale, [
      { name: "ArabAudit", path: "/" },
      { name: m("title"), path: "/product" },
    ]),
  ]);

  return (
    <>
      <JsonLd id="ld-product" data={ld} />
      <Nav />
      <main id="main">

      {/* HERO */}
      <section
        className="section"
        style={{
          background: "var(--emerald-1)",
          color: "var(--cream-1)",
          padding: "120px 0 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 55% 45% at 88% 8%, rgba(232,184,75,.18), transparent 62%), radial-gradient(ellipse 45% 55% at 0% 100%, rgba(31,128,96,.25), transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <div className="wrap" style={{ position: "relative" }}>
          <div className="demo-live-badge">
            <span className="dot" />
            <span>{t("hero.pill")}</span>
          </div>
          <h1
            style={{
              fontFamily: "var(--f-serif)",
              fontSize: "clamp(48px, 7vw, 96px)",
              fontWeight: 400,
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
              marginTop: 24,
              color: "var(--cream-1)",
            }}
          >
            {t("hero.title1")}
            <br />
            <span style={{ color: "var(--gold-3)", fontStyle: "italic" }}>
              {t("hero.title2")}
            </span>
          </h1>
          <p
            style={{
              color: "rgba(247,243,234,.72)",
              fontFamily: "var(--f-serif)",
              fontWeight: 300,
              fontSize: "clamp(17px, 1.5vw, 22px)",
              lineHeight: 1.55,
              maxWidth: 680,
              marginTop: 28,
            }}
          >
            {t("hero.ledeA")}{" "}
            <b style={{ color: "var(--cream-1)", fontWeight: 400 }}>{t("hero.ledeBold")}</b>
            {t("hero.ledeB")}
          </p>
        </div>
      </section>

      {/* AVATAR-NARRATED TOUR (replaces the 9 individual demo sections) */}
      <section className="avt-section">
        <div className="wrap">
          <AvatarTourLoader />
        </div>
      </section>

      {/* SEO summary (screen-reader-only, indexed by crawlers) */}
      <SeoFallback />

      {/* CTA */}
      <section className="dark" style={{ padding: "120px 0", backgroundColor: "rgb(7, 55, 39)" }}>
        <div className="wrap" style={{ textAlign: "center" }}>
          <div className="eyebrow on-dark">{t("cta.eyebrow")}</div>
          <h2 className="display" style={{ fontSize: "clamp(40px, 5.6vw, 84px)", marginTop: 20 }}>
            {t("cta.title")}
          </h2>
          <p className="lede" style={{ margin: "28px auto 0", maxWidth: 680 }}>
            {t("cta.lede")}
          </p>
          <div className="flex gap-3 mt-8 center">
            <Link href="/demo-audit" className="btn btn-primary">
              {t("cta.primary")}
            </Link>
            <Link href="/contact" className="btn btn-ghost on-dark">
              {t("cta.ghost")}
            </Link>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </>
  );
}
