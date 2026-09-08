import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, BRAND, SITE_URL } from "@/lib/seo";
import { breadcrumbNode, jsonLdGraph } from "@/lib/jsonld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = await getTranslations({ locale, namespace: "meta.contact" });
  return buildMetadata({
    locale,
    path: "/contact",
    title: m("title"),
    description: m("description"),
    keywords: m("keywords")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const m = await getTranslations({ locale, namespace: "meta.contact" });

  const contactPageLd = {
    "@type": "ContactPage",
    url: `${SITE_URL}/${locale}/contact`,
    name: m("title"),
    description: m("description"),
    inLanguage: locale === "ar" ? "ar-SA" : "en-US",
    mainEntity: {
      "@type": "Organization",
      name: BRAND.name,
      email: BRAND.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: BRAND.addressLocality,
        addressCountry: BRAND.addressCountry,
      },
    },
  };

  const ld = jsonLdGraph([
    contactPageLd,
    breadcrumbNode(locale, [
      { name: "ArabAudit", path: "/" },
      { name: m("title"), path: "/contact" },
    ]),
  ]);

  return (
    <>
      <JsonLd id="ld-contact" data={ld} />
      <Nav />
      <main id="main">

        <section className="contact-hero">
          <div className="wrap">
            <div className="eyebrow">{t("eyebrow")}</div>
            <h1 className="h1" style={{ marginTop: 14, maxWidth: 820 }}>
              {t("titleA")}
            </h1>
            <p className="lede" style={{ marginTop: 20, maxWidth: 640 }}>{t("lede")}</p>
          </div>
        </section>

        <section>
          <div className="wrap">
            <div className="contact-grid">
              <ContactForm />

              <div className="contact-info">
                {[
                  { l: "i1L", tt: "i1T", body: <p>{t("i1P")}</p>, extra: <p><a href={`mailto:${BRAND.email}`}>{BRAND.email}</a></p> },
                  {
                    l: "i5L",
                    tt: "i5T",
                    body: (
                      <p>
                        <strong>{t("i5P1Label")}:</strong> {t("i5P1")}
                        <br />
                        <strong>{t("i5P2Label")}:</strong> {t("i5P2")}
                      </p>
                    ),
                    extra: null,
                  },
                  {
                    l: "i4L",
                    tt: "i4T",
                    body: <p>{t("i4P")}</p>,
                    extra: (
                      <p style={{ marginTop: 10 }}>
                        <Link href="/demo-audit">{t("i4Link1")}</Link>
                        <br />
                        <Link href="/demo-framework" style={{ marginTop: 4, display: "inline-block" }}>
                          {t("i4Link2")}
                        </Link>
                      </p>
                    ),
                  },
                ].map((b, i) => (
                  <div className="info-block" key={i}>
                    <div className="meta">{t(b.l as any)}</div>
                    <h4>{t(b.tt as any)}</h4>
                    {b.body}
                    {b.extra}
                  </div>
                ))}

                <div className="map-illus">
                  <svg className="arabesque" viewBox="0 0 200 200" fill="none">
                    <g stroke="currentColor" strokeWidth="1" fill="none">
                      <circle cx="100" cy="100" r="98" />
                      <circle cx="100" cy="100" r="75" />
                      <circle cx="100" cy="100" r="52" />
                      <polygon
                        points="100,10 130,70 190,100 130,130 100,190 70,130 10,100 70,70"
                        transform="rotate(22.5 100 100)"
                      />
                      <polygon points="100,10 130,70 190,100 130,130 100,190 70,130 10,100 70,70" />
                    </g>
                  </svg>
                  <div className="loc-label">{t("mapL")}</div>
                  <h5>{t("mapT")}</h5>
                  <p>{t("mapP")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
