import { BRAND, SITE_URL } from "./seo";
import { frameworks } from "./data";

type Graph = Record<string, unknown>;

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;
const PRODUCT_ID = `${SITE_URL}/#software`;

export function organizationNode(locale: string): Graph {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: BRAND.name,
    alternateName: BRAND.nameAr,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.png`,
      width: 512,
      height: 512,
    },
    description:
      locale === "ar" ? BRAND.descriptionAr : BRAND.description,
    email: BRAND.email,
    foundingDate: BRAND.founded,
    address: {
      "@type": "PostalAddress",
      addressLocality: BRAND.addressLocality,
      addressCountry: BRAND.addressCountry,
    },
    areaServed: { "@type": "Country", name: "Saudi Arabia" },
    sameAs: BRAND.sameAs,
    knowsAbout: [
      "NCA ECC",
      "SAMA CSF",
      "SAMA IT Governance",
      "SDAIA PDPL",
      "CBAHI",
      "PCI DSS",
      "ISO 27001",
      "Regulatory compliance",
      "Cybersecurity audit",
      "Saudi Arabia compliance",
    ],
  };
}

export function websiteNode(locale: string): Graph {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE_URL,
    name: BRAND.name,
    inLanguage: locale === "ar" ? "ar-SA" : "en-US",
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/${locale}/frameworks?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function softwareApplicationNode(locale: string): Graph {
  return {
    "@type": "SoftwareApplication",
    "@id": PRODUCT_ID,
    name: BRAND.name,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Governance, Risk & Compliance",
    operatingSystem: "Web",
    url: `${SITE_URL}/${locale}/product`,
    description:
      locale === "ar" ? BRAND.descriptionAr : BRAND.description,
    provider: { "@id": ORG_ID },
    inLanguage: ["en", "ar"],
    featureList: [
      "AI Auto-Link evidence to controls",
      "Readiness coverage check",
      "Per-criterion evidence validation",
      "In-audit bilingual copilot",
      "Bilingual finding drafts",
      "Regulator-grade AI summary reports",
      "Document chat",
      "Executive insights",
      "Remediation tracking",
    ],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "SAR",
      lowPrice: "30000",
      highPrice: "70000",
      offerCount: 3,
      url: `${SITE_URL}/${locale}/pricing`,
    },
  };
}

export function breadcrumbNode(
  locale: string,
  trail: { name: string; path: string }[]
): Graph {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${SITE_URL}/${locale}${t.path === "/" ? "" : t.path}`,
    })),
  };
}

export function faqNode(items: { q: string; a: string }[]): Graph {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

export function frameworksItemListNode(locale: string): Graph {
  return {
    "@type": "ItemList",
    name:
      locale === "ar"
        ? "أطر الامتثال السعودية المدعومة"
        : "Supported Saudi regulatory frameworks",
    itemListElement: frameworks.map((f, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/${locale}/frameworks/${f.id}`,
      name: f.name,
    })),
  };
}

export function frameworkDetailNode(
  locale: string,
  id: string
): Graph | null {
  const f = frameworks.find((x) => x.id === id);
  if (!f) return null;
  return {
    "@type": "TechArticle",
    headline: f.name,
    name: f.name,
    url: `${SITE_URL}/${locale}/frameworks/${f.id}`,
    description: f.summary || f.tagline,
    inLanguage: locale === "ar" ? "ar-SA" : "en-US",
    about: {
      "@type": "Thing",
      name: f.name,
      description: f.tagline,
    },
    articleSection: f.sector,
    keywords: [f.name, f.shortCode, f.authority, "Saudi Arabia", "compliance"],
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}

/**
 * Wrap any collection of nodes into a JSON-LD @graph document.
 */
export function jsonLdGraph(nodes: Graph[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean),
  };
}
