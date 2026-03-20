'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useReducedMotionSafe } from '@/lib/hooks/useReducedMotionSafe'
import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'

const ease = [0.25, 0.1, 0.25, 1] as const

const colVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
}

const linkRowClass =
  'group flex items-center gap-3 text-sm text-white/75 transition-colors duration-300 hover:text-accent hover:translate-x-1 rtl:hover:-translate-x-1'

const iconBoxClass =
  'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/5 transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent/10 group-hover:shadow-sm group-hover:shadow-accent/20'

export function Footer() {
  const { locale } = useLocale()
  const reduce = useReducedMotionSafe()
  const isRTL = locale === 'ar'
  const year = new Date().getFullYear()

  const t = getContent(locale).footer as {
    tagline: string
    servingEnterprises: string
    quickLinksTitle?: string
    getInTouchTitle?: string
    emailLabel?: string
    established?: string
    builtForKingdom?: string
    engineTagline?: string
    copyrightLine?: string
    navAriaLabel?: string
    homeAriaLabel?: string
    links: {
      product: string
      contact: string
      privacy: string
      downloadECC: string
    }
  }

  const quickLinksTitle = t.quickLinksTitle ?? (isRTL ? 'روابط سريعة' : 'Quick Links')
  const getInTouchTitle = t.getInTouchTitle ?? (isRTL ? 'تواصل معنا' : 'Get in Touch')
  const emailLabel = t.emailLabel ?? (isRTL ? 'البريد الإلكتروني' : 'Email')
  const established = t.established ?? (isRTL ? 'تأسست ٢٠٢٦' : 'Est. 2026')
  const builtForKingdom = t.builtForKingdom ?? (isRTL ? 'صُممت للمملكة' : 'Built for the Kingdom')
  const engineTagline = t.engineTagline ?? (isRTL ? 'محرك تدقيق ذكي سعودي المنشأ' : 'Saudi-native Smart Audit Engine')
  const copyrightLine =
    (t.copyrightLine ?? '© {year} ArabAudit. All rights reserved.').replace('{year}', String(year))
  const navAria = t.navAriaLabel ?? (isRTL ? 'تذييل التنقل' : 'Footer navigation')
  const homeAria = t.homeAriaLabel ?? 'ArabAudit Home'

  const taglineWords = useMemo(() => t.tagline.split(/\s+/).filter(Boolean), [t.tagline])

  const staggerContainer = useMemo(
    () => ({
      hidden: { opacity: reduce ? 1 : 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: reduce ? 0 : 0.1,
          delayChildren: reduce ? 0 : 0.06,
        },
      },
    }),
    [reduce]
  )

  const navItemVariant = useMemo(
    () => ({
      hidden: { opacity: reduce ? 1 : 0, x: reduce ? 0 : isRTL ? 12 : -12 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.38, ease },
      },
    }),
    [reduce, isRTL]
  )

  return (
    <footer
      className={`relative overflow-hidden border-t-2 border-accent/40 bg-gradient-to-b from-primary via-[#0B4634] to-[#082f24] ${isRTL ? 'rtl' : 'ltr'}`}
    >
      <div
        className="pointer-events-none absolute inset-0 z-[1] animate-gradient-shift opacity-20 mix-blend-soft-light"
        style={{
          background:
            'linear-gradient(118deg, rgba(216,176,74,0.08) 0%, rgba(255,255,255,0.03) 50%, rgba(216,176,74,0.06) 100%)',
          backgroundSize: '200% 200%',
        }}
        aria-hidden
      />

      <svg
        className="absolute inset-0 z-[1] h-full w-full opacity-[0.025]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <pattern id="footer-pattern" x="0" y="0" width="140" height="140" patternUnits="userSpaceOnUse">
            <path
              d="M70 10 L130 70 L70 130 L10 70 Z"
              fill="none"
              stroke="rgb(216 176 74)"
              strokeWidth="0.4"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#footer-pattern)" />
      </svg>

      <motion.div
        className="absolute inset-x-0 top-0 z-[2] h-px origin-center bg-gradient-to-r from-transparent via-accent to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: reduce ? 0.01 : 0.55, ease }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24">
        <motion.div
          className="grid gap-12 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
        >
          <motion.div className="flex flex-col gap-6 lg:col-span-1" variants={colVariants}>
            <motion.div
              whileHover={reduce ? undefined : { scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 380, damping: 22 }}
              className="inline-flex"
            >
              <Link
                href="/"
                className="group rounded-full focus:outline-none focus:ring-2 focus:ring-accent/50"
                aria-label={homeAria}
              >
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-accent bg-pale-silver p-1 shadow-gold sm:h-[104px] sm:w-[104px]">
                  <Image
                    src="/logo.png"
                    alt="ArabAudit"
                    fill
                    className="rounded-full object-cover"
                    priority
                    sizes="104px"
                  />
                </div>
              </Link>
            </motion.div>

            <p className="max-w-sm text-sm leading-relaxed text-white/80">
              {taglineWords.map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  className="inline-block"
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: reduce ? 0.01 : 0.35,
                    delay: reduce ? 0 : 0.04 + i * 0.018,
                    ease,
                  }}
                >
                  {word}
                  {i < taglineWords.length - 1 ? '\u00A0' : ''}
                </motion.span>
              ))}
            </p>

            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: reduce ? 0 : 0.25, duration: 0.4 }}
            >
              <motion.div
                className="h-px w-10 bg-gradient-to-r from-accent to-transparent rtl:bg-gradient-to-l"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: reduce ? 0.01 : 0.45, ease }}
                style={{ transformOrigin: isRTL ? 'right' : 'left' }}
              />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/70">
                {established}
              </span>
            </motion.div>
          </motion.div>

          <motion.div className="flex flex-col gap-6" variants={colVariants}>
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-white/90">
              {quickLinksTitle}
            </h3>
            <motion.nav
              className="flex flex-col gap-4"
              aria-label={navAria}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-30px' }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: reduce ? 0 : 0.07, delayChildren: 0.05 } },
              }}
            >
              <motion.div variants={navItemVariant}>
                {/* Native <a> for external URL — avoids Next <Link> prefetch/ref edge cases with motion wrappers */}
                <a
                  href="https://app.velocrux.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkRowClass}
                >
                  <div className={iconBoxClass}>
                    <svg className="h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                  <span className="tracking-wide">{t.links.product}</span>
                </a>
              </motion.div>

              <motion.div variants={navItemVariant}>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=kauser@arabaudit.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkRowClass}
                >
                  <div className={iconBoxClass}>
                    <svg className="h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="tracking-wide">{t.links.contact}</span>
                </a>
              </motion.div>

              <motion.div variants={navItemVariant}>
                <Link href="/privacy" className={linkRowClass}>
                  <div className={iconBoxClass}>
                    <svg className="h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="tracking-wide">{t.links.privacy}</span>
                </Link>
              </motion.div>

              <motion.div variants={navItemVariant}>
                <a
                  href="https://cdn.nca.gov.sa/api/files/public/upload/86e09090-44e4-481f-bc28-355673607654_ECC--2024-EN.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkRowClass}
                >
                  <div className={iconBoxClass}>
                    <svg className="h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="tracking-wide">{t.links.downloadECC}</span>
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>

          <motion.div className="flex flex-col gap-6" variants={colVariants}>
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-white/90">{getInTouchTitle}</h3>
            <div className="flex flex-col gap-4">
              <motion.a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=kauser@arabaudit.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3"
                whileHover={reduce ? undefined : { x: isRTL ? -2 : 2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent/10">
                  <svg className="h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium uppercase tracking-wider text-white/60">{emailLabel}</span>
                  <span className="text-sm text-accent transition-colors group-hover:text-accent/80">
                    kauser@arabaudit.com
                  </span>
                </div>
              </motion.a>

              <motion.div
                className="rounded-xl border border-accent/20 bg-accent/5 p-4"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: reduce ? 0.01 : 0.45, delay: reduce ? 0 : 0.15, ease }}
              >
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent/80">
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent shadow-sm shadow-accent" />
                  {builtForKingdom}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-white/70">{t.servingEnterprises}</p>
                <p className="mt-1 text-xs leading-relaxed text-white/60">{engineTagline}</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-16 border-t border-accent/20 pt-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: reduce ? 0.01 : 0.45, ease }}
        >
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between">
            <p className="text-xs tracking-wide text-white/60">{copyrightLine}</p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/50">
              <span>NCA ECC-2024</span>
              <span className="h-1 w-1 rounded-full bg-accent/40" aria-hidden />
              <span>SAMA CSF</span>
              <span className="h-1 w-1 rounded-full bg-accent/40" aria-hidden />
              <span>PDPL</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
