import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbNode, jsonLdGraph } from "@/lib/jsonld";
import {
  ShieldEnergyIcon,
  Agreement01Icon,
  GlobalIcon,
  Linkedin01Icon,
  Tick02Icon,
} from "hugeicons-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = await getTranslations({ locale, namespace: "meta.about" });
  return buildMetadata({
    locale,
    path: "/about",
    title: m("title"),
    description: m("description"),
    keywords: m("keywords")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const m = await getTranslations({ locale, namespace: "meta.about" });
  const ld = jsonLdGraph([
    breadcrumbNode(locale, [
      { name: "ArabAudit", path: "/" },
      { name: m("title"), path: "/about" },
    ]),
  ]);

  return (
    <>
      <JsonLd id="ld-about" data={ld} />
      <Nav />
      <main id="main">

      <section className="about-hero">
        <div className="wrap">
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
              fontSize: "clamp(48px, 7vw, 88px)",
              fontWeight: 400,
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
              marginTop: 28,
              color: "var(--cream-1)",
              maxWidth: 900,
            }}
          >
            {t("heroTitleA")}
            <br />
            <span style={{ color: "var(--gold-3)", fontStyle: "italic" }}>
              {t("heroTitleB")}
            </span>
          </h1>
          <p
            style={{
              color: "rgba(247,243,234,.72)",
              fontFamily: "var(--f-serif)",
              fontWeight: 300,
              fontSize: "clamp(17px, 1.5vw, 21px)",
              lineHeight: 1.55,
              maxWidth: 720,
              marginTop: 28,
            }}
          >
            {t("heroLede")}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section" style={{ background: "var(--cream-1)" }}>
        <div className="wrap">
          <div className="about-mission-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 80, alignItems: "start" }}>
            <div>
              <div className="eyebrow">{t("missionEyebrow")}</div>
              <h2 className="h1" style={{ marginTop: 12 }}>{t("missionTitle")}</h2>
            </div>
            <div>
              <p className="body" style={{ fontSize: 17, lineHeight: 1.75, color: "var(--ink-2)" }}>
                {t("missionP1")}
              </p>
              <p className="body" style={{ fontSize: 17, lineHeight: 1.75, color: "var(--ink-2)", marginTop: 16 }}>
                {t("missionP2a")}
                <strong>{t("missionP2b")}</strong>
                {t("missionP2c")}
              </p>
            </div>
          </div>

          <div className="stat-block">
            <div className="stat-item"><div className="n"><em>8</em></div><div className="l">{t("stat1")}</div></div>
            <div className="stat-item"><div className="n">1,847</div><div className="l">{t("stat2")}</div></div>
            <div className="stat-item"><div className="n">100%</div><div className="l">{t("stat3")}</div></div>
            <div className="stat-item"><div className="n"><em>9</em></div><div className="l">{t("stat4")}</div></div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Story */}
      <section className="section">
        <div className="wrap">
          <div className="eyebrow">{t("storyEyebrow")}</div>
          <h2 className="mt-4 h1" style={{ maxWidth: 720 }}>{t("storyTitle")}</h2>

          <div style={{ marginTop: 56 }}>
            {[
              { y: "2024", key: "y1", text: t("y1"), title: t("y1t"), body: [t("y1b")] },
              { y: "2025", key: "y2", text: t("y2"), title: t("y2t"), body: [t("y2b1"), t("y2b2")] },
              { y: "2026", key: "y3", text: t("y3"), title: t("y3t"), body: [t("y3b")] },
            ].map((s) => (
              <div className="story-block" key={s.y}>
                <div>
                  <div className="year">{s.y}</div>
                  <div className="year-label">{s.text}</div>
                </div>
                <div>
                  <h3>{s.title}</h3>
                  {s.body.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Values */}
      <section className="section" style={{ background: "var(--cream-1)" }}>
        <div className="wrap">
          <div className="eyebrow">{t("valuesEyebrow")}</div>
          <h2 className="mt-4 h1" style={{ maxWidth: 720 }}>{t("valuesTitle")}</h2>

          <div className="values-grid">
            <div className="value-card">
              <div className="icon"><ShieldEnergyIcon size={22} /></div>
              <h4>{t("v1t")}</h4>
              <p>{t("v1b")}</p>
            </div>
            <div className="value-card">
              <div className="icon"><Agreement01Icon size={22} /></div>
              <h4>{t("v2t")}</h4>
              <p>{t("v2b")}</p>
            </div>
            <div className="value-card">
              <div className="icon"><GlobalIcon size={22} /></div>
              <h4>{t("v3t")}</h4>
              <p>{t("v3b")}</p>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Leadership */}
      <section className="section" id="leadership">
        <div className="wrap">
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 64, height: 2, background: "var(--gold-1)", margin: "0 auto" }} />
            <h2 className="h1" style={{ marginTop: 16 }}>{t("leadershipTitle")}</h2>
            <p className="lede" style={{ margin: "16px auto 0", maxWidth: 620, color: "var(--ink-2)" }}>
              {t("leadershipLede")}
            </p>
          </div>

          <div className="leader-grid">
            {[
              { name: t("l1name"), role: t("l1role"), bio: t("l1bio"), img: "/team/kauser-jahan.jpg", linkedin: "https://www.linkedin.com/in/kauser-jahan-324985300", cta: t("l1cta") },
              { name: t("l2name"), role: t("l2role"), bio: t("l2bio"), img: "/team/abdul-sagheer.jpg" },
              { name: t("l3name"), role: t("l3role"), bio: t("l3bio"), img: "/team/javeed-pasha.png" },
              { name: t("l4name"), role: t("l4role"), bio: t("l4bio"), initials: "ZT" },
            ].map((l, i) => (
              <article className="leader-card" key={i}>
                <div className="leader-photo-wrap">
                  <div className="leader-photo">
                    {l.img ? (
                      <Image src={l.img} alt={l.name} width={140} height={140} />
                    ) : (
                      <span className="initials">{l.initials}</span>
                    )}
                  </div>
                  <div className="leader-check">
                    <Tick02Icon size={18} />
                  </div>
                </div>
                <h4>{l.name}</h4>
                <div className="role">{l.role}</div>
                <p className="bio">{l.bio}</p>
                {l.linkedin && (
                  <a href={l.linkedin} target="_blank" rel="noopener noreferrer" className="leader-linkedin">
                    <Linkedin01Icon size={16} />
                    <span>{l.cta}</span>
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Partners */}
      <section className="section" style={{ background: "var(--cream-1)" }}>
        <div className="wrap">
          <div className="eyebrow">{t("partnersEyebrow")}</div>
          <h2 className="mt-4 h1" style={{ maxWidth: 720 }}>{t("partnersTitle")}</h2>

          <div className="about-partners-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginTop: 40 }}>
            {[
              { h: "p1h", tt: "p1t", s: "p1s" },
              { h: "p2h", tt: "p2t", s: "p2s" },
              { h: "p3h", tt: "p3t", s: "p3s" },
              { h: "p4h", tt: "p4t", s: "p4s" },
            ].map((p, i) => (
              <div key={i} style={{ padding: 28, background: "white", border: "1px solid var(--line)", borderRadius: 10, textAlign: "center" }}>
                <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--gold-1)", letterSpacing: ".1em", textTransform: "uppercase" }}>{t(p.h as any)}</div>
                <div style={{ fontFamily: "var(--f-serif)", fontSize: 18, color: "var(--emerald-3)", marginTop: 8, fontWeight: 500 }}>{t(p.tt as any)}</div>
                <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 6 }}>{t(p.s as any)}</div>
              </div>
            ))}
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
            <Link href="/contact" className="btn btn-primary">{t("ctaPrimary")}</Link>
            <a href="mailto:kauser@arabaudit.com" className="btn btn-ghost on-dark">{t("ctaGhost")}</a>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </>
  );
}
