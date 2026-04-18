import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import DemoFrameworkWizard from "@/components/demo-framework/DemoFrameworkWizard";

export default async function DemoFrameworkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Nav />
      <Suspense fallback={null}>
        <DemoFrameworkWizard />
      </Suspense>
      <Footer />
    </>
  );
}
