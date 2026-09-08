import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

export const SITE_URL = "https://arabaudit.com".replace(/\/$/, "");

export const BRAND = {
  name: "ArabAudit",
  legalName: "ArabAudit",
  nameAr: "عرب أوديت",
  aliases: [
    "ArabAudit",
    "Arab Audit",
    "Arab-Audit",
    "arabaudit",
    "arab audit",
    "arab-audit",
    "Arabaudit",
    "ARAB AUDIT",
    "عرب أوديت",
    "عرب اوديت",
    "عرباوديت",
    "عرب-اوديت",
    "ArabAudit KSA",
    "ArabAudit Saudi Arabia",
    "ArabAudit Saudi",
    "ArabAudit Riyadh",
    "Arab Audit KSA",
    "Arab Audit Saudi",
  ] as string[],
  tagline: "Saudi-native compliance, validated by AI",
  taglineAr: "امتثال سعودي المنشأ، مُحقَّق بالذكاء الاصطناعي",
  description:
    "AI-native compliance and audit platform for Saudi Arabia. Supports NCA ECC, SAMA CSF, SDAIA PDPL, CBAHI, PCI DSS and ISO 27001 with bilingual evidence, findings and regulator-grade reports.",
  descriptionAr:
    "منصّة تدقيق وامتثال مدعومة بالذكاء الاصطناعي وُلدت في المملكة. تدعم أطر NCA ECC وSAMA CSF وSDAIA PDPL وCBAHI وPCI DSS وISO 27001 بتقارير ثنائية اللغة جاهزة للجهات التنظيمية.",
  email: "sales@arabaudit.com",
  addressLocality: "Riyadh",
  addressCountry: "SA",
  founded: "2026",
  sameAs: [] as string[],
} as const;

export const DEFAULT_OG_IMAGE = {
  url: `${SITE_URL}/logo.png`,
  width: 1200,
  height: 630,
  alt: "ArabAudit - Saudi-native compliance, validated by AI",
} as const;

export const LOCALE_OG_MAP: Record<string, string> = {
  en: "en_US",
  ar: "ar_SA",
};

/**
 * Build canonical + hreflang alternates for a given path.
 * Path should start with "/" and NOT include the locale segment.
 */
export function buildAlternates(locale: string, path: string) {
  const p = path === "/" ? "" : path;
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = `${SITE_URL}/${l}${p}`;
  }
  languages["x-default"] = `${SITE_URL}/${routing.defaultLocale}${p}`;
  return {
    canonical: `${SITE_URL}/${locale}${p}`,
    languages,
  };
}

type BuildMetadataInput = {
  locale: string;
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: { url: string; width?: number; height?: number; alt?: string };
  type?: "website" | "article";
  noindex?: boolean;
};

/**
 * Build a Metadata object with consistent OG/Twitter/canonical/hreflang.
 * Titles are expected to be already localized (don't include brand - the
 * layout title template appends it).
 */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  type = "website",
  noindex,
}: BuildMetadataInput): Metadata {
  const alternates = buildAlternates(locale, path);
  const image = ogImage ?? DEFAULT_OG_IMAGE;
  const ogLocale = LOCALE_OG_MAP[locale] ?? "en_US";
  const ogLocaleAlternate = routing.locales
    .filter((l) => l !== locale)
    .map((l) => LOCALE_OG_MAP[l])
    .filter(Boolean);

  return {
    title,
    description,
    keywords,
    alternates,
    openGraph: {
      type,
      url: alternates.canonical,
      siteName: BRAND.name,
      locale: ogLocale,
      alternateLocale: ogLocaleAlternate,
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      images: [image.url],
    },
    robots: noindex
      ? { index: false, follow: false }
      : {
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
  };
}
