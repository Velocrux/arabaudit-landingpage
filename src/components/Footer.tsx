import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="footer" style={{ backgroundColor: "rgb(7, 55, 39)" }}>
      <div className="wrap">
        <div className="grid">
          <div className="col">
            <Link href="/" className="brand" style={{ color: "var(--cream-1)" }}>
              <Image
                className="mark"
                src="/logo.png"
                alt="ArabAudit Logo"
                width={32}
                height={32}
                style={{ height: 32, width: 32 }}
              />
              ArabAudit
            </Link>
            <p
              className="small"
              style={{
                color: "rgba(247,243,234,.65)",
                marginTop: 12,
                maxWidth: 280,
              }}
            >
              {t("tagline")}
            </p>
            <div
              className="mono"
              style={{
                fontSize: 10,
                color: "rgba(247,243,234,.5)",
                marginTop: 16,
                letterSpacing: ".14em",
              }}
            >
              {t("est")}
            </div>
          </div>
          <div className="col">
            <h4>{t("hProduct")}</h4>
            <Link href="/product">{t("capabilities")}</Link>
            <Link href="/frameworks">{t("frameworks")}</Link>
            <Link href="/pricing">{t("pricing")}</Link>
            <Link href="/demo-audit">{t("liveDemo")}</Link>
          </div>
          <div className="col">
            <h4>{t("hCompany")}</h4>
            <Link href="/about">{t("about")}</Link>
            <Link href="/about#leadership">{t("leadership")}</Link>
            <Link href="/contact">{t("contact")}</Link>
            <Link href="/">{t("privacy")}</Link>
          </div>
          <div className="col">
            <h4>{t("hFrameworks")}</h4>
            <Link href="/frameworks#nca-ecc">NCA ECC-2024</Link>
            <Link href="/frameworks#sama-csf">SAMA CSF</Link>
            <Link href="/frameworks#sdaia-pdpl">SDAIA / PDPL</Link>
            <Link href="/frameworks#cbahi-clinic">CBAHI</Link>
          </div>
          <div className="col">
            <h4>{t("hGetInTouch")}</h4>
            <a href={`mailto:${t("email")}`} style={{ color: "var(--gold-3)" }}>
              {t("email")}
            </a>
            <div className="card-dark" style={{ padding: 14, marginTop: 10 }}>
              <div
                className="mono"
                style={{
                  fontSize: 10,
                  letterSpacing: ".12em",
                  color: "var(--gold-3)",
                }}
              >
                {t("builtFor")}
              </div>
              <div className="small" style={{ marginTop: 6 }}>
                {t("serving")}
              </div>
              <div className="small" style={{ marginTop: 2 }}>
                {t("engine")}
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: 56,
            paddingTop: 24,
            borderTop: "1px solid var(--emerald-line)",
            display: "flex",
            justifyContent: "space-between",
            color: "rgba(247,243,234,.55)",
            fontSize: 12,
          }}
        >
          <div>{t("rights")}</div>
          <div style={{ display: "flex", gap: 24 }} className="mono">
            <span>NCA ECC-2024</span>
            <span>SAMA CSF</span>
            <span>PDPL</span>
            <span>CBAHI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
