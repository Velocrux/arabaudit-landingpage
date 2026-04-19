import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Newsreader, Inter_Tight, JetBrains_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import { routing } from "@/i18n/routing";
import { BRAND, SITE_URL, buildAlternates, DEFAULT_OG_IMAGE, LOCALE_OG_MAP } from "@/lib/seo";
import { jsonLdGraph, organizationNode, websiteNode } from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";
import "../globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter-tight",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const alternates = buildAlternates(locale, "/");
  const ogLocale = LOCALE_OG_MAP[locale] ?? "en_US";
  const alternateLocale = routing.locales
    .filter((l) => l !== locale)
    .map((l) => LOCALE_OG_MAP[l])
    .filter(Boolean);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("home.title"),
      template: `%s · ${BRAND.name}`,
    },
    description: t("home.description"),
    applicationName: BRAND.name,
    generator: "Next.js",
    keywords: t("home.keywords")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
    authors: [{ name: BRAND.name, url: SITE_URL }],
    creator: BRAND.name,
    publisher: BRAND.name,
    category: "Compliance & Audit Software",
    icons: {
      icon: [{ url: "/logo.png", type: "image/png" }],
      apple: [{ url: "/logo.png", sizes: "180x180" }],
      shortcut: ["/logo.png"],
    },
    manifest: "/manifest.webmanifest",
    alternates,
    openGraph: {
      type: "website",
      url: alternates.canonical,
      siteName: BRAND.name,
      locale: ogLocale,
      alternateLocale,
      title: t("home.title"),
      description: t("home.description"),
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: t("home.title"),
      description: t("home.description"),
      images: [DEFAULT_OG_IMAGE.url],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    referrer: "origin-when-cross-origin",
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f3ea" },
    { media: "(prefers-color-scheme: dark)", color: "#073727" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  const dir = locale === "ar" ? "rtl" : "ltr";
  const fontVars = `${newsreader.variable} ${interTight.variable} ${jetbrainsMono.variable} ${plexArabic.variable}`;

  const siteJsonLd = jsonLdGraph([organizationNode(locale), websiteNode(locale)]);

  return (
    <html lang={locale} dir={dir} className={fontVars} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <JsonLd id="ld-site" data={siteJsonLd} />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
