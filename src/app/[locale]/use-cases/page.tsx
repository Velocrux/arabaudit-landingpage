import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import UseCasesSelector from "@/components/use-cases/UseCasesSelector";

export default async function UseCasesPage({
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
        <UseCasesSelector />
      </Suspense>
      <Footer />
    </>
  );
}
