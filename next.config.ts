import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "node:path";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    const immutable = "public, max-age=31536000, immutable";
    const aiFiles = "public, max-age=3600, must-revalidate";
    return [
      {
        source: "/llms.txt",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Cache-Control", value: aiFiles },
        ],
      },
      {
        source: "/llms-full.txt",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Cache-Control", value: aiFiles },
        ],
      },
      {
        source: "/ai.txt",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Cache-Control", value: aiFiles },
        ],
      },
      {
        source: "/.well-known/ai-content.json",
        headers: [
          { key: "Content-Type", value: "application/json; charset=utf-8" },
          { key: "Cache-Control", value: aiFiles },
        ],
      },
      {
        source: "/logo.png",
        headers: [{ key: "Cache-Control", value: immutable }],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
