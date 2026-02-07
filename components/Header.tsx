'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'
import { LanguageToggle } from './LanguageToggle'

const navIds = ['product', 'frameworks', 'whyUs', 'sectors'] as const

export function Header() {
  const { locale } = useLocale()
  const t = getContent(locale).nav

  return (
    <header className="sticky top-0 z-50 border-b-2 border-accent bg-primary/95 backdrop-blur-sm shadow-royal">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary rounded"
          aria-label="ArabAudit Home"
        >
          <Image
            src="/logo.png"
            alt="ArabAudit"
            width={120}
            height={40}
            className="h-9 w-auto object-contain brightness-0 invert"
            priority
          />
        </Link>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {navIds.map((id) => (
            <Link
              key={id}
              href={`#${id}`}
              className="text-sm font-medium text-white underline-offset-4 hover:text-accent transition-colors duration-300 tracking-royal"
            >
              {t[id]}
            </Link>
          ))}
          <Link
            href="#contact"
            className="text-sm font-medium text-white underline-offset-4 hover:text-accent transition-colors duration-300 tracking-royal"
          >
            {t.contact}
          </Link>
        </nav>
        <LanguageToggle />
      </div>
    </header>
  )
}
