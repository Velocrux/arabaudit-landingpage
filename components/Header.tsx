'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion'
import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'
import { LanguageToggle } from './LanguageToggle'
import { useAnalytics } from '@/lib/hooks/useAnalytics'
import { DemoRequestModal } from './DemoRequestModal'

const navItems = [
  { id: 'product', label: 'Product', isExternal: false },
  { id: 'whyUs', label: 'Why Us', isExternal: false },
  { id: 'frameworks', label: 'Frameworks', isExternal: false },
  {
    id: 'contact',
    label: 'Contact',
    isExternal: true,
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=kauser@arabaudit.com',
  },
] as const

const SECTION_IDS = ['product', 'whyUs', 'frameworks', 'contact'] as const

export function Header() {
  const { locale, dir } = useLocale()
  const t = getContent(locale).nav
  const heroCta = getContent(locale).hero.cta
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showDemoModal, setShowDemoModal] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const { trackNavigationClick, trackButtonClick } = useAnalytics()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 56)
  })

  const refreshActiveSection = useCallback(() => {
    const headerOffset = 120
    let bestId: string | null = null
    let bestTop = -Infinity

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id)
      if (!el) continue
      const rect = el.getBoundingClientRect()
      if (rect.top <= headerOffset && rect.bottom > headerOffset) {
        const visible = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
        if (visible > 0 && rect.top > bestTop) {
          bestTop = rect.top
          bestId = id
        }
      }
    }

    if (!bestId) {
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top >= 0 && rect.top < window.innerHeight * 0.45) {
          bestId = id
          break
        }
      }
    }

    setActiveSection(bestId)
  }, [])

  useEffect(() => {
    refreshActiveSection()
    window.addEventListener('scroll', refreshActiveSection, { passive: true })
    window.addEventListener('resize', refreshActiveSection)
    return () => {
      window.removeEventListener('scroll', refreshActiveSection)
      window.removeEventListener('resize', refreshActiveSection)
    }
  }, [refreshActiveSection])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const underlineOrigin = dir === 'rtl' ? 'right' : 'left'

  return (
    <motion.header
      className={`sticky top-0 z-50 scroll-mt-16 backdrop-blur-md transition-[box-shadow] duration-300 ${scrolled
          ? 'border-b border-accent/25 bg-primary/95 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.35)]'
          : 'border-b-2 border-primary/20 bg-pale-silver/95 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)]'
        }`}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 transition-[min-height] duration-300 ease-out sm:gap-4 sm:px-6 ${scrolled ? 'min-h-[52px]' : 'min-h-[3.6rem] sm:min-h-[4.2rem] md:min-h-[4.8rem]'
          }`}
      >
        <div className="flex items-center">
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.08 }}
          >
            <Link
              href="/"
              onClick={() => trackNavigationClick('logo_click', 'ArabAudit Logo', '/')}
              className={`flex shrink-0 items-center gap-2 rounded focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${scrolled ? 'focus:ring-offset-primary' : 'focus:ring-offset-pale-silver'
                }`}
              aria-label="ArabAudit Home"
            >
              <motion.div transition={{ type: 'spring', stiffness: 400, damping: 35 }}>
                <Image
                  src="/logo.png"
                  alt="ArabAudit"
                  width={180}
                  height={180}
                  className={`w-auto object-contain transition-all duration-300 ${scrolled
                      ? 'h-9 sm:h-10'
                      : 'h-[3.6rem] sm:h-[4.2rem] md:h-[4.8rem]'
                    }`}
                  priority
                />
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-5 md:flex lg:gap-6" aria-label="Main">
          {navItems.map((item) => {
            const label = t[item.id] || item.label
            const isActive = activeSection === item.id
            const linkClass = `relative text-sm tracking-royal transition-colors duration-300 ${scrolled
                ? 'text-white/90 hover:text-accent'
                : 'text-primary hover:text-accent'
              } ${isActive ? 'font-semibold text-accent' : 'font-medium'}`

            if (item.isExternal) {
              return (
                <motion.a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative py-2 ${linkClass}`}
                  onClick={() =>
                    trackNavigationClick('contact_link', label, item.href || '#', {
                      target: '_blank',
                    })
                  }
                  whileTap={{ scale: 0.97 }}
                >
                  <span>{label}</span>
                  <motion.span
                    className={`absolute bottom-0.5 h-px w-full bg-accent ${
                      underlineOrigin === 'right' ? 'right-0 origin-right' : 'left-0 origin-left'
                    }`}
                    initial={false}
                    animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                    whileHover={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                </motion.a>
              )
            }

            return (
              <Link
                key={item.id}
                href={`#${item.id}`}
                onClick={() =>
                  trackNavigationClick('header_link', label, `#${item.id}`)
                }
                className={`group relative block py-2 ${linkClass}`}
                aria-current={isActive ? 'location' : undefined}
              >
                <span>{label}</span>
                <motion.span
                  className={`absolute bottom-0.5 h-px w-full bg-accent ${
                    underlineOrigin === 'right' ? 'right-0 origin-right' : 'left-0 origin-left'
                  }`}
                  initial={false}
                  animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                  whileHover={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle />

          <motion.button
            onClick={() => {
              trackNavigationClick('mobile_menu', 'Mobile Menu Toggle', '#', {
                mobile_menu_open: !mobileMenuOpen,
              })
              setMobileMenuOpen(!mobileMenuOpen)
            }}
            className={`rounded-lg p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-accent md:hidden ${scrolled ? 'hover:bg-white/10' : 'hover:bg-primary/10'
              }`}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            whileTap={{ scale: 0.94 }}
          >
            <div className="flex h-6 w-6 flex-col justify-center gap-1.5">
              <motion.span
                className={`block h-0.5 rounded-full ${scrolled ? 'bg-white' : 'bg-primary'}`}
                animate={
                  mobileMenuOpen
                    ? { rotate: 45, y: 6, width: '100%' }
                    : { rotate: 0, y: 0, width: '100%' }
                }
                transition={{ duration: 0.25 }}
              />
              <motion.span
                className={`block h-0.5 rounded-full ${scrolled ? 'bg-white' : 'bg-primary'}`}
                animate={mobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className={`block h-0.5 rounded-full ${scrolled ? 'bg-white' : 'bg-primary'}`}
                animate={
                  mobileMenuOpen
                    ? { rotate: -45, y: -6, width: '100%' }
                    : { rotate: 0, y: 0, width: '100%' }
                }
                transition={{ duration: 0.25 }}
              />
            </div>
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence initial={false}>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
            className={`overflow-hidden border-t md:hidden ${scrolled ? 'border-white/15 bg-primary/98' : 'border-primary/20 bg-pale-silver'
              }`}
          >
            <motion.nav
              initial={{ y: -8 }}
              animate={{ y: 0 }}
              exit={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col space-y-1 px-4 py-4"
              aria-label="Mobile Navigation"
            >
              {navItems.map((item, index) => {
                const label = t[item.id] || item.label
                const isActive = activeSection === item.id
                const rowClass = `rounded-lg px-4 py-3 text-sm tracking-royal transition-colors ${scrolled
                    ? 'text-white/95 hover:bg-white/10 hover:text-accent'
                    : 'text-primary hover:bg-accent/10 hover:text-accent'
                  } ${isActive ? 'font-semibold text-accent' : 'font-medium'}`

                if (item.isExternal) {
                  return (
                    <motion.a
                      key={item.id}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: dir === 'rtl' ? 16 : -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * index }}
                      className={rowClass}
                      onClick={() => {
                        trackNavigationClick('contact_link', label, item.href || '#', {
                          target: '_blank',
                          mobile_menu: true,
                        })
                        setMobileMenuOpen(false)
                      }}
                    >
                      {label}
                    </motion.a>
                  )
                }

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: dir === 'rtl' ? 16 : -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * index }}
                  >
                    <Link
                      href={`#${item.id}`}
                      className={`block ${rowClass}`}
                      onClick={() => {
                        trackNavigationClick('header_link', label, `#${item.id}`, {
                          mobile_menu: true,
                        })
                        setMobileMenuOpen(false)
                      }}
                    >
                      {label}
                    </Link>
                  </motion.div>
                )
              })}
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onClick={() => {
                  trackButtonClick(String(heroCta), 'primary', 'header_mobile_nav')
                  setShowDemoModal(true)
                  setMobileMenuOpen(false)
                }}
                className="mt-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-accent px-4 py-3 text-sm font-bold text-primary shadow-gold"
              >
                {heroCta}
              </motion.button>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <DemoRequestModal isOpen={showDemoModal} onClose={() => setShowDemoModal(false)} />
    </motion.header>
  )
}
