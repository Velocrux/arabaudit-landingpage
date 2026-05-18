import type { Metadata } from "next";
import { Suspense } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import DemoAuditFlow from "@/components/demo-audit/DemoAuditFlow";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbNode, jsonLdGraph } from "@/lib/jsonld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.demoAudit" });
  return buildMetadata({
    locale,
    path: "/demo-audit",
    title: t("title"),
    description: t("description"),
    keywords: t("keywords")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
  });
}

export default async function DemoAuditPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "meta.demoAudit" });
  const ld = jsonLdGraph([
    breadcrumbNode(locale, [
      { name: "ArabAudit", path: "/" },
      { name: t("title"), path: "/demo-audit" },
    ]),
  ]);
  return (
    <>
      <JsonLd id="ld-demo-audit" data={ld} />
      <Nav />
      <main id="main">
        <Suspense fallback={null}>
          <DemoAuditFlow />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
