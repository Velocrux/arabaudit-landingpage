'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'

export function Footer() {
  const { locale } = useLocale()
  const t = getContent(locale).footer

  return (
    <footer className="border-t-2 border-accent/50 bg-primary text-base">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col items-center gap-3 text-center md:items-start md:text-start">
            <Link href="/" className="focus:outline-none focus:ring-2 focus:ring-accent rounded" aria-label="ArabAudit Home">
              <Image
                src="/logo.png"
                alt="ArabAudit"
                width={120}
                height={40}
                className="h-9 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="max-w-sm text-sm text-white/90">{t.tagline}</p>
          </div>
          <nav className="flex flex-wrap justify-center gap-6" aria-label="Footer">
            <Link
              href="#product"
              className="text-sm text-white/90 underline-offset-4 hover:text-white hover:underline"
            >
              {t.links.product}
            </Link>
            <Link
              href="#contact"
              className="text-sm text-white/90 underline-offset-4 hover:text-white hover:underline"
            >
              {t.links.contact}
            </Link>
            <Link
              href="#"
              className="text-sm text-white/90 underline-offset-4 hover:text-white hover:underline"
            >
              {t.links.privacy}
            </Link>
          </nav>
        </div>
        <p className="mt-10 border-t border-white/20 pt-6 text-center text-xs text-white/70">
          © {new Date().getFullYear()} ArabAudit. Saudi-native Smart Audit Engine.
        </p>
      </div>
    </footer>
  )
}
