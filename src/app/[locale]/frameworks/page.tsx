import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { frameworks } from "@/lib/data";

export default async function FrameworksListPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("frameworks");

  return (
    <>
      <Nav />

      <section className="fw-hero">
        <div className="wrap">
          <div className="eyebrow">{t("eyebrow")}</div>
          <h1 className="h1" style={{ marginTop: 16 }}>{t("title")}</h1>
          <p className="lede" style={{ marginTop: 20, color: "var(--ink-2)" }}>{t("lede")}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {frameworks.map((f, idx) => (
              <Link
                key={f.id}
                href={`/frameworks/${f.id}`}
                id={f.id}
                className="fw-card-item"
                style={{ borderTop: `3px solid ${f.color}` }}
              >
                <div className="fw-card-content">
                  <div
                    style={{
                      fontFamily: "var(--f-mono)",
                      fontSize: 11,
                      color: f.color,
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                    }}
                  >
                    {t("framework")} {String(idx + 1).padStart(2, "0")}
                  </div>
                  <h3 className="fw-card-title">{f.name}</h3>
                  <div className="fw-card-tagline">{f.shortCode}</div>
                  <p className="fw-card-summary">{f.summary}</p>
                  <div className="fw-card-sector"><strong>{f.sector}</strong> · {f.authority}</div>
                </div>
                <div className="fw-card-footer">
                  <div>
                    <div className="fw-card-stat">{t("domains")}</div>
                    <div className="fw-card-stat-value">{f.domains}</div>
                  </div>
                  <div>
                    <div className="fw-card-stat">{t("controls")}</div>
                    <div className="fw-card-stat-value">{f.controls}</div>
                  </div>
                  <div>
                    <div className="fw-card-stat">{t("version")}</div>
                    <div className="fw-card-stat-value">{f.version}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      <section className="section" style={{ background: "var(--cream-1)" }}>
        <div className="wrap-narrow">
          <div className="eyebrow">{t("howEyebrow")}</div>
          <h2 className="mt-4 h1">{t("howTitle")}</h2>
          <p className="lede mt-6" style={{ color: "var(--ink-2)" }}>{t("howLede")}</p>
        </div>
      </section>

      <Footer />
    </>
  );
}
