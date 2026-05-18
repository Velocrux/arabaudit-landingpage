import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { routing } from "@/i18n/routing";
import { frameworks } from "@/lib/data";

type Priority = 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1.0;
type ChangeFreq =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

const STATIC_ROUTES: {
  path: string;
  changeFrequency: ChangeFreq;
  priority: Priority;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/product", changeFrequency: "weekly", priority: 0.9 },
  { path: "/frameworks", changeFrequency: "weekly", priority: 0.9 },
  { path: "/use-cases", changeFrequency: "weekly", priority: 0.8 },
  { path: "/pricing", changeFrequency: "weekly", priority: 0.8 },
  { path: "/demo-audit", changeFrequency: "monthly", priority: 0.8 },
  { path: "/demo-framework", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
];

function localizedUrl(locale: string, path: string) {
  return `${SITE_URL}/${locale}${path === "/" ? "" : path}`;
}

function languageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = localizedUrl(l, path);
  }
  languages["x-default"] = localizedUrl(routing.defaultLocale, path);
  return languages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const route of STATIC_ROUTES) {
    for (const locale of routing.locales) {
      entries.push({
        url: localizedUrl(locale, route.path),
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: { languages: languageAlternates(route.path) },
      });
    }
  }

  for (const f of frameworks) {
    const path = `/frameworks/${f.id}`;
    for (const locale of routing.locales) {
      entries.push({
        url: localizedUrl(locale, path),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages: languageAlternates(path) },
      });
    }
  }

  return entries;
}
