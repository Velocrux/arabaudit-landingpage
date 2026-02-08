'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'
import { LanguageToggle } from './LanguageToggle'
import { useAnalytics } from '@/lib/hooks/useAnalytics'

const navItems = [
  { id: 'product', label: 'Product', isExternal: false },
  { id: 'whyUs', label: 'Why Us', isExternal: false },
  { id: 'frameworks', label: 'Frameworks', isExternal: false },
  { id: 'contact', label: 'Contact', isExternal: true, href: 'https://mail.google.com/mail/?view=cm&fs=1&to=kauser@velocrux.com' },
] as const

export function Header() {
  const { locale } = useLocale()
  const t = getContent(locale).nav
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { trackNavigationClick } = useAnalytics()

  return (
    <header className="sticky top-0 z-50 border-b-2 border-primary/20 bg-pale-silver backdrop-blur-sm shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] scroll-mt-16">
      <div className="mx-auto flex h-[3.6rem] sm:h-[4.2rem] md:h-[4.8rem] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          onClick={() => trackNavigationClick('logo_click', 'ArabAudit Logo', '/')}
          className="flex gap-2 items-center rounded shrink-0 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-pale-silver"
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
        <nav className="hidden gap-6 items-center md:flex" aria-label="Main">
          {navItems.map((item) => {
            if (item.isExternal) {
              return (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackNavigationClick('contact_link', t[item.id] || item.label, item.href || '#', { target: '_blank' })}
                  className="text-sm font-medium transition-colors duration-300 text-primary underline-offset-4 hover:text-accent tracking-royal"
                >
                  {t[item.id] || item.label}
                </a>
              )
            }
            return (
              <Link
                key={item.id}
                href={`#${item.id}`}
                onClick={() => trackNavigationClick('header_link', t[item.id] || item.label, `#${item.id}`)}
                className="text-sm font-medium transition-colors duration-300 text-primary underline-offset-4 hover:text-accent tracking-royal"
              >
                {t[item.id] || item.label}
              </Link>
            )
          })}
        </nav>

        {/* Mobile Menu & Language Toggle */}
        <div className="flex gap-3 items-center">
          <LanguageToggle />

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              trackNavigationClick('mobile_menu', 'Mobile Menu Toggle', '#', { mobile_menu_open: !mobileMenuOpen })
              setMobileMenuOpen(!mobileMenuOpen)
            }}
            className="p-2 rounded-lg transition-colors md:hidden hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-accent"
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
        <div className="border-t md:hidden border-primary/20 bg-pale-silver">
          <nav className="flex flex-col px-4 py-4 space-y-3" aria-label="Mobile Navigation">
            {navItems.map((item) => {
              if (item.isExternal) {
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      trackNavigationClick('contact_link', t[item.id] || item.label, item.href || '#', { target: '_blank', mobile_menu: true })
                      setMobileMenuOpen(false)
                    }}
                    className="px-4 py-2 text-sm font-medium rounded-lg transition-colors text-primary hover:bg-accent/10 hover:text-accent tracking-royal"
                  >
                    {t[item.id] || item.label}
                  </a>
                )
              }
              return (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => {
                    trackNavigationClick('header_link', t[item.id] || item.label, `#${item.id}`, { mobile_menu: true })
                    setMobileMenuOpen(false)
                  }}
                  className="px-4 py-2 text-sm font-medium rounded-lg transition-colors text-primary hover:bg-accent/10 hover:text-accent tracking-royal"
                >
                  {t[item.id] || item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}
