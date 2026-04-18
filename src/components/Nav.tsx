"use client";

import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import LangToggle from "./LangToggle";

const LINKS = [
  { href: "/product", key: "product" },
  { href: "/frameworks", key: "frameworks" },
  { href: "/demo-framework", key: "demos" },
  { href: "/pricing", key: "pricing" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export default function Nav() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link className="brand" href="/">
          <Image
            className="mark"
            src="/logo.png"
            alt="ArabAudit Logo"
            width={44}
            height={44}
            priority
          />
          <span>
            ArabAudit{" "}
            <span
              style={{
                opacity: 0.55,
                fontStyle: "italic",
                marginInlineStart: "6px",
              }}
            >
              {t("brandAr")}
            </span>
          </span>
        </Link>
        <nav className="nav-links">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={isActive(l.href) ? "active" : undefined}
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>
        <div className="nav-right">
          <LangToggle />
          <Link
            href="/demo-audit"
            className="btn btn-primary"
            style={{ padding: "8px 16px", fontSize: 13 }}
          >
            {t("ctaDemo")}
          </Link>
        </div>
      </div>
    </header>
  );
}
