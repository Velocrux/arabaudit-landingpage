import type { MetadataRoute } from "next";

const SITE_URL = "https://arabaudit.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          "x-default": `${SITE_URL}/`,
          en: `${SITE_URL}/`,
          ar: `${SITE_URL}/`,
        },
      },
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
