import type { Metadata } from "next";
import { Suspense } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import UseCasesSelector from "@/components/use-cases/UseCasesSelector";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbNode, jsonLdGraph } from "@/lib/jsonld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.useCases" });
  return buildMetadata({
    locale,
    path: "/use-cases",
    title: t("title"),
    description: t("description"),
    keywords: t("keywords")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
  });
}

export default async function UseCasesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "meta.useCases" });
  const ld = jsonLdGraph([
    breadcrumbNode(locale, [
      { name: "ArabAudit", path: "/" },
      { name: t("title"), path: "/use-cases" },
    ]),
  ]);
  return (
    <>
      <JsonLd id="ld-use-cases" data={ld} />
      <Nav />
      <main id="main">
        <Suspense fallback={null}>
          <UseCasesSelector />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
