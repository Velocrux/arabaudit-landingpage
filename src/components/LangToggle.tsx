"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTransition } from "react";

export default function LangToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: "en" | "ar") => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div className="lang" aria-disabled={isPending}>
      <button
        type="button"
        className={locale === "en" ? "on" : ""}
        onClick={() => switchTo("en")}
      >
        ENG
      </button>
      <button
        type="button"
        className={locale === "ar" ? "on" : ""}
        onClick={() => switchTo("ar")}
      >
        العربية
      </button>
    </div>
  );
}
