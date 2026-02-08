'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'
import { LanguageToggle } from './LanguageToggle'

const navIds = ['product', 'frameworks', 'whyUs'] as const

export function Header() {
  const { locale } = useLocale()
  const t = getContent(locale).nav
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b-2 border-primary/20 bg-pale-silver backdrop-blur-sm shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)]">
      <div className="mx-auto flex h-[3.6rem] sm:h-[4.2rem] md:h-[4.8rem] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-pale-silver rounded"
          aria-label="ArabAudit Home"
        >
          <Image
            src="/logo.png"
            alt="ArabAudit"
            width={180}
            height={180}
            className="h-[3.6rem] sm:h-[4.2rem] md:h-[4.8rem] w-auto object-contain"
            priority
          />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {navIds.map((id) => (
            <Link
              key={id}
              href={`#${id}`}
              className="text-sm font-medium text-primary underline-offset-4 hover:text-accent transition-colors duration-300 tracking-royal"
            >
              {t[id]}
            </Link>
          ))}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=kauser@velocrux.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary underline-offset-4 hover:text-accent transition-colors duration-300 tracking-royal"
          >
            {t.contact}
          </a>
        </nav>

        {/* Mobile Menu & Language Toggle */}
        <div className="flex items-center gap-3">
          <LanguageToggle />
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-primary/20 bg-pale-silver">
          <nav className="flex flex-col px-4 py-4 space-y-3" aria-label="Mobile Navigation">
            {navIds.map((id) => (
              <Link
                key={id}
                href={`#${id}`}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-sm font-medium text-primary hover:bg-accent/10 hover:text-accent rounded-lg transition-colors tracking-royal"
              >
                {t[id]}
              </Link>
            ))}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=kauser@velocrux.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 text-sm font-medium text-primary hover:bg-accent/10 hover:text-accent rounded-lg transition-colors tracking-royal"
            >
              {t.contact}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
