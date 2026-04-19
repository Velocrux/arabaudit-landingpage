import type { Metadata } from "next";
import { Suspense } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import DemoFrameworkWizard from "@/components/demo-framework/DemoFrameworkWizard";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbNode, jsonLdGraph } from "@/lib/jsonld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.demoFramework" });
  return buildMetadata({
    locale,
    path: "/demo-framework",
    title: t("title"),
    description: t("description"),
    keywords: t("keywords")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
  });
}

export default async function DemoFrameworkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "meta.demoFramework" });
  const ld = jsonLdGraph([
    breadcrumbNode(locale, [
      { name: "ArabAudit", path: "/" },
      { name: t("title"), path: "/demo-framework" },
    ]),
  ]);

  return (
    <>
      <JsonLd id="ld-demo-framework" data={ld} />
      <Nav />
      <main id="main">
        <Suspense fallback={null}>
          <DemoFrameworkWizard />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
