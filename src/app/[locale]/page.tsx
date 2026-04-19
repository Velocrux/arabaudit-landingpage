import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import HomeHero from "@/components/home/HomeHero";
import Marquee from "@/components/Marquee";
import CapabilitiesCycle from "@/components/home/CapabilitiesCycle";
import { FAQList } from "@/components/FAQ";
import { frameworks } from "@/lib/data";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const rows = [
    { h: "r1h", a: "r1a", b: "r1b", w: "r1why" },
    { h: "r2h", a: "r2a", b: "r2b", w: "r2why" },
    { h: "r3h", a: "r3a", b: "r3b", w: "r3why" },
    { h: "r4h", a: "r4a", b: "r4b", w: "r4why" },
    { h: "r5h", a: "r5a", b: "r5b", w: "r5why" },
    { h: "r6h", a: "r6a", b: "r6b", w: "r6why" },
  ] as const;

  const heatmap = [0.95, 0.7, 0.4, 0.6, 0.8, 0.9, 0.7, 0.5, 0.3, 0.9, 0.85, 0.65, 0.45, 0.55, 0.75, 0.9, 0.8, 0.7, 0.6, 0.5, 0.95, 0.9, 0.85, 0.8, 0.6];
  const heatColor = (v: number) => (v > 0.8 ? "#1f8060" : v > 0.6 ? "#c98a1d" : v > 0.4 ? "#d97a3d" : "#c5402b");

  const faqItems = [1, 2, 3, 4, 5, 6, 7].map((n) => ({
    q: t(`home.faq.q${n}` as any),
    a: t(`home.faq.a${n}` as any),
  }));

  return (
    <>
      <Nav />
      <HomeHero />
      <Marquee />
      <hr className="divider" />

      {/* Stats */}
      <section className="section">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }}>

            {/* LEFT — text */}
            <div style={{ paddingTop: 8 }}>
              <div className="eyebrow">{t("home.stats.eyebrow")}</div>
              <h2 className="h1" style={{ marginTop: 16 }}>{t("home.stats.title")}</h2>
              <p className="body" style={{ marginTop: 20, color: "var(--ink-3)" }}>
                {t("home.stats.lede")}
              </p>
            </div>

            {/* RIGHT — 4 × 2 stats grid */}
            <div className="stats" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
              {(
                [
                  { n: "s1Num", l: "s1Lbl", gold: false },
                  { n: "s2Num", l: "s2Lbl", gold: false },
                  { n: "s3Num", l: "s3Lbl", gold: true  },
                  { n: "s4Num", l: "s4Lbl", gold: false },
                  { n: "s5Num", l: "s5Lbl", gold: false },
                  { n: "s6Num", l: "s6Lbl", gold: false },
                  { n: "s7Num", l: "s7Lbl", gold: true  },
                  { n: "s8Num", l: "s8Lbl", gold: true  },
                ] as const
              ).map(({ n, l, gold }, i) => (
                <div
                  key={n}
                  className="stat"
                  style={{
                    borderRight: (i + 1) % 4 === 0 ? "none" : "1px solid var(--line)",
                    borderBottom: i < 4 ? "1px solid var(--line)" : "none",
                  }}
                >
                  <div className="num" style={gold ? { color: "var(--gold-2)" } : undefined}>
                    {t(`home.stats.${n}` as any)}
                  </div>
                  <div className="lbl">{t(`home.stats.${l}` as any)}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Capabilities — SmartArt cycle */}
      <CapabilitiesCycle />

      <hr className="divider" />

      {/* Frameworks */}
      <section className="section" id="frameworks">
        <div className="wrap">
          <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto" }}>
            <div className="eyebrow">{t("home.frameworks.eyebrow")}</div>
            <h2 className="h1" style={{ marginTop: 16 }}>{t("home.frameworks.title")}</h2>
            <p className="lede" style={{ marginTop: 20 }}>{t("home.frameworks.lede")}</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginTop: 56 }}>
            {frameworks.map((f) => (
              <div key={f.id} className="fw-card-item" style={{ borderTopColor: f.color, borderTop: `3px solid ${f.color}` }}>
                <div className="fw-card-content">
                  <div className="eyebrow" style={{ color: f.color }}>{f.shortCode}</div>
                  <h3 className="fw-card-title">{f.name}</h3>
                  <div className="fw-card-tagline">{f.tagline}</div>
                  <p className="fw-card-summary">{f.summary}</p>
                </div>
                <div className="fw-card-footer">
                  <div>
                    <div className="fw-card-stat">{t("home.frameworks.domains")}</div>
                    <div className="fw-card-stat-value">{f.domains}</div>
                  </div>
                  <div>
                    <div className="fw-card-stat">{t("home.frameworks.controls")}</div>
                    <div className="fw-card-stat-value">{f.controls}</div>
                  </div>
                </div>
                <div className="fw-card-overlay">
                  <div className="fw-card-overlay-name">{f.name}</div>
                  <Link href={`/demo-framework?id=${f.id}`} className="fw-overlay-btn-primary">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                    {t("home.frameworks.use")}
                  </Link>
                  <Link href={`/frameworks/${f.id}`} className="fw-overlay-btn-ghost">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7c1.5-3.5 4-5 6-5s4.5 1.5 6 5c-1.5 3.5-4 5-6 5S2.5 10.5 1 7Z" stroke="currentColor" strokeWidth="1.4" /><circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.4" /></svg>
                    {t("home.frameworks.preview")}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link href="/frameworks" className="btn btn-ghost">{t("home.frameworks.browseAll")}</Link>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Compare */}
      <section className="section" style={{ background: "var(--cream-1)" }}>
        <div className="wrap">
          <div style={{ textAlign: "center", maxWidth: 860, margin: "0 auto" }}>
            <div className="eyebrow">{t("home.compare.eyebrow")}</div>
            <h2 className="h1" style={{ marginTop: 16 }}>{t("home.compare.title")}</h2>
          </div>

          <table className="mt-12 compare">
            <thead>
              <tr>
                <th>{t("home.compare.thFeature")}</th>
                <th>{t("home.compare.thOther")}</th>
                <th>{t("home.compare.thUs")}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <th>{t(`home.compare.${r.h}` as any)}</th>
                  <td>{t(`home.compare.${r.a}` as any)}</td>
                  <td className="us">
                    {t(`home.compare.${r.b}` as any)}
                    <div className="why"><b>{t("home.compare.whyLabel")}</b> {t(`home.compare.${r.w}` as any)}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <hr className="divider" />

      {/* Roles */}
      <section className="section">
        <div className="wrap">
          <div className="eyebrow">{t("home.roles.eyebrow")}</div>
          <h2 className="mt-4 h1" style={{ maxWidth: 760 }}>{t("home.roles.title")}</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 56 }}>
            {[
              { e: "r1e", tt: "r1t", b: "r1b", cs: ["r1c1", "r1c2", "r1c3"], border: "var(--gold-3)" },
              { e: "r2e", tt: "r2t", b: "r2b", cs: ["r2c1", "r2c2", "r2c3"], border: "var(--emerald-4)" },
              { e: "r3e", tt: "r3t", b: "r3b", cs: ["r3c1", "r3c2", "r3c3"], border: "var(--ink-3)" },
            ].map((r, i) => (
              <div key={i} className="card" style={{ borderTop: `3px solid ${r.border}` }}>
                <div className="eyebrow">{t(`home.roles.${r.e}` as any)}</div>
                <h3 className="h3" style={{ fontFamily: "var(--f-serif)", fontSize: 26, fontWeight: 400, marginTop: 10 }}>{t(`home.roles.${r.tt}` as any)}</h3>
                <p className="mt-4 body">{t(`home.roles.${r.b}` as any)}</p>
                <div className="mt-6" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {r.cs.map((c) => (
                    <span key={c} className="chip">{t(`home.roles.${c}` as any)}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Sample report */}
      <section className="section dark" style={{ position: "relative", overflow: "hidden" }}>
        <div className="hero-bg" />
        <div className="wrap" style={{ position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <div className="eyebrow on-dark">{t("home.report.eyebrow")}</div>
              <h2 className="h1" style={{ marginTop: 16 }}>{t("home.report.title")}</h2>
              <p className="lede" style={{ marginTop: 20, color: "rgba(247,243,234,.78)" }}>{t("home.report.lede")}</p>
              <div className="flex gap-3 mt-8">
                <a href="/arabaudit-sample-report.pdf" download="ArabAudit-Sample-Report.pdf" className="btn btn-primary">{t("home.report.download")}</a>
                <Link href="/demo-audit" className="btn btn-ghost on-dark">{t("home.report.generate")}</Link>
              </div>
              <ul style={{ marginTop: 32, padding: 0, listStyle: "none", display: "grid", gap: 10, color: "rgba(247,243,234,.78)", fontSize: 14 }}>
                <li>· {t("home.report.li1")}</li>
                <li>· {t("home.report.li2")}</li>
                <li>· {t("home.report.li3")}</li>
                <li>· {t("home.report.li4")}</li>
              </ul>
            </div>

            <div style={{ position: "relative" }}>
              <div style={{ background: "var(--cream-1)", color: "var(--ink-1)", borderRadius: 6, padding: 36, aspectRatio: "8.5 / 11", boxShadow: "var(--shadow-3)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 8, background: "var(--emerald-3)" }} />
                <div style={{ position: "absolute", left: 0, right: 0, top: 8, height: 3, background: "var(--gold-3)" }} />
                <div className="mono" style={{ fontSize: 10, letterSpacing: ".14em", color: "var(--ink-3)", textTransform: "uppercase", marginTop: 16 }}>{t("home.report.cover")}</div>
                <div style={{ marginTop: 24, fontFamily: "var(--f-serif)", fontSize: 36, lineHeight: 1.05, color: "var(--emerald-3)", letterSpacing: "-0.02em" }}>{t("home.report.coverTitle")}</div>
                <div style={{ marginTop: 6, fontFamily: "var(--f-serif)", fontStyle: "italic", color: "var(--gold-1)", fontSize: 18 }}>{t("home.report.coverClient")}</div>
                <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div><div className="mono" style={{ fontSize: 9, letterSpacing: ".1em", color: "var(--ink-3)", textTransform: "uppercase" }}>{t("home.report.controlsAssessed")}</div><div style={{ fontFamily: "var(--f-serif)", fontSize: 28, color: "var(--emerald-3)" }}>114 / 114</div></div>
                  <div><div className="mono" style={{ fontSize: 9, letterSpacing: ".1em", color: "var(--ink-3)", textTransform: "uppercase" }}>{t("home.report.complianceScore")}</div><div style={{ fontFamily: "var(--f-serif)", fontSize: 28, color: "var(--emerald-3)" }}>87<span style={{ color: "var(--gold-2)" }}>%</span></div></div>
                  <div><div className="mono" style={{ fontSize: 9, letterSpacing: ".1em", color: "var(--ink-3)", textTransform: "uppercase" }}>{t("home.report.findings")}</div><div style={{ fontFamily: "var(--f-serif)", fontSize: 28, color: "var(--emerald-3)" }}>14</div></div>
                  <div><div className="mono" style={{ fontSize: 9, letterSpacing: ".1em", color: "var(--ink-3)", textTransform: "uppercase" }}>{t("home.report.criticalGaps")}</div><div style={{ fontFamily: "var(--f-serif)", fontSize: 28, color: "#c5402b" }}>2</div></div>
                </div>
                <div style={{ marginTop: 28 }}>
                  <div className="mono" style={{ fontSize: 9, letterSpacing: ".1em", color: "var(--ink-3)", textTransform: "uppercase", marginBottom: 8 }}>{t("home.report.domainHeatmap")}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 4 }}>
                    {heatmap.map((v, i) => (
                      <div key={i} style={{ height: 22, background: heatColor(v), opacity: 0.4 + v * 0.6, borderRadius: 2 }} />
                    ))}
                  </div>
                  <div className="mono" style={{ fontSize: 9, letterSpacing: ".1em", color: "var(--ink-3)", textTransform: "uppercase", marginTop: 6, display: "flex", justifyContent: "space-between" }}>
                    <span>D1 Gov</span><span>D2 Def</span><span>D3 Res</span><span>D4 3P</span><span>D5 ICS</span>
                  </div>
                </div>
                <div style={{ position: "absolute", bottom: 24, left: 36, right: 36, display: "flex", justifyContent: "space-between", alignItems: "end" }}>
                  <div>
                    <div className="mono" style={{ fontSize: 9, letterSpacing: ".1em", color: "var(--ink-3)" }}>{t("home.report.sha")}</div>
                    <div className="mono" style={{ fontSize: 9, color: "var(--ink-3)", marginTop: 2 }}>b8f4·a912·77d3·3e02…</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="mono" style={{ fontSize: 9, letterSpacing: ".1em", color: "var(--ink-3)" }}>{t("home.report.signed")}</div>
                    <div style={{ fontFamily: "var(--f-serif)", fontStyle: "italic", color: "var(--gold-1)", fontSize: 18 }}>{t("home.report.signer")}</div>
                  </div>
                </div>
              </div>
              <div style={{ position: "absolute", top: -16, right: -16, bottom: 16, left: 16, background: "rgba(247,243,234,.5)", borderRadius: 6, zIndex: -1, transform: "rotate(2deg)" }} />
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* FAQ */}
      <section className="section">
        <div className="wrap-narrow">
          <div className="eyebrow">{t("home.faq.eyebrow")}</div>
          <h2 className="mt-4 h1">{t("home.faq.title")}</h2>
          <div style={{ marginTop: 48 }}>
            <FAQList items={faqItems} firstOpen />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="dark" style={{ position: "relative", overflow: "hidden", padding: "120px 0", backgroundColor: "rgb(7, 55, 39)" }}>
        <div className="skyline" style={{ backgroundColor: "rgb(7, 55, 39)" }} />
        <div className="hero-bg" />
        <div className="wrap" style={{ position: "relative", textAlign: "center" }}>
          <div className="eyebrow on-dark">{t("home.cta.eyebrow")}</div>
          <h2 className="display" style={{ fontSize: "clamp(40px, 5.6vw, 84px)", marginTop: 20 }}>{t("home.cta.title")}</h2>
          <p className="lede" style={{ margin: "28px auto 0", maxWidth: 680 }}>{t("home.cta.lede")}</p>
          <div className="flex gap-3 mt-8 center">
            <Link href="/demo-audit" className="btn btn-primary">{t("home.cta.primary")}</Link>
            <Link href="/contact" className="btn btn-ghost on-dark">{t("home.cta.ghost")}</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
