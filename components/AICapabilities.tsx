'use client'

import { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { useReducedMotionSafe } from '@/lib/hooks/useReducedMotionSafe'
import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'
import { useSectionTracking } from '@/lib/hooks/useAnalytics'

const ease = [0.25, 0.1, 0.25, 1] as const

function IconCheck({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}
function IconAlert({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  )
}
function IconSparkles({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  )
}
function IconFileSearch({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )
}
function IconChat({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  )
}
function IconClipboardCheck({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  )
}
function IconChartBar({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  )
}
function IconLink({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  )
}

export function AICapabilities() {
  const { locale } = useLocale()
  const reduce = useReducedMotionSafe()
  const content = getContent(locale) as {
    aiCapabilities?: {
      title: string
      subtitle: string
      items: Array<{
        title: string
        tagline: string
        painTitle: string
        painPoints: string[]
        benefitTitle: string
        benefits: string[]
      }>
    }
  }
  const t = content.aiCapabilities
  const sectionRef = useSectionTracking('aiCapabilities')

  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [drawerEntered, setDrawerEntered] = useState(false)
  const [drawerClosing, setDrawerClosing] = useState(false)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout>>()

  const titleWords = useMemo(() => (t?.title ?? '').split(/\s+/).filter(Boolean), [t?.title])
  const subtitleWords = useMemo(() => (t?.subtitle ?? '').split(/\s+/).filter(Boolean), [t?.subtitle])

  const toggleCard = useCallback((index: number) => {
    setActiveCard((prev) => (prev === index ? null : index))
  }, [])

  useEffect(() => {
    if (activeCard !== null) {
      setDrawerClosing(false)
      setDrawerEntered(false)
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => setDrawerEntered(true))
      })
      return () => cancelAnimationFrame(raf)
    }
    setDrawerEntered(false)
  }, [activeCard])

  const closeDrawer = useCallback(() => {
    setDrawerClosing(true)
    closeTimeoutRef.current = setTimeout(() => {
      setActiveCard(null)
      setDrawerClosing(false)
    }, 300)
  }, [])

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    if (activeCard === null) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [activeCard, closeDrawer])

  useEffect(() => {
    const open = activeCard !== null || drawerClosing
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeCard, drawerClosing])

  const getPainSummary = (index: number): string => {
    const summaries = [
      'Manual evidence validation is slow and error-prone',
      'Writing findings takes too long and must be regulator-ready',
      'Auditors lack quick access to framework guidance',
      'Hard to assess audit readiness before submission',
      'Dashboard data lacks actionable insights',
      'Remediation and document mapping is manual and slow',
    ]
    return summaries[index] || 'Pain point summary'
  }

  const icons = [IconFileSearch, IconSparkles, IconChat, IconClipboardCheck, IconChartBar, IconLink] as const

  const drawerListVariants = useMemo(
    () => ({
      hidden: { opacity: reduce ? 1 : 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: reduce ? 0 : 0.05,
          delayChildren: reduce ? 0 : 0.06,
        },
      },
    }),
    [reduce]
  )

  const drawerListItemVariants = useMemo(
    () => ({
      hidden: {
        opacity: reduce ? 1 : 0,
        x: reduce ? 0 : locale === 'ar' ? -8 : 8,
      },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: reduce ? 0 : 0.3, ease },
      },
    }),
    [reduce, locale]
  )

  if (!t?.items?.length) return null

  const drawerOpen = drawerEntered && !drawerClosing
  const panelX = locale === 'ar' ? '-100%' : '100%'

  return (
    <section
      ref={sectionRef}
      id="ai-capabilities"
      className={`relative scroll-mt-16 overflow-hidden px-6 py-20 sm:px-8 sm:py-28 ${locale === 'ar' ? 'rtl' : 'ltr'}`}
    >
      <div
        className="absolute inset-0"
        style={{
          background: [
            'linear-gradient(165deg, #f2f5f4 0%, #e8efe9 35%, #dce8e2 70%, #d0e2da 100%)',
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(11, 70, 52, 0.06) 0%, transparent 55%)',
            'radial-gradient(ellipse 60% 40% at 20% 100%, rgba(216, 176, 74, 0.06) 0%, transparent 50%)',
          ].join(', '),
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-[1] animate-gradient-shift opacity-35"
        style={{
          background:
            'linear-gradient(118deg, rgba(11,70,52,0.05) 0%, rgba(216,176,74,0.06) 45%, rgba(11,70,52,0.04) 100%)',
          backgroundSize: '200% 200%',
        }}
        aria-hidden
      />

      <svg
        className="absolute inset-0 z-[1] h-full w-full opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <pattern id="ai-cap-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M50 4 L96 50 L50 96 L4 50 Z" fill="none" stroke="rgb(11 70 52)" strokeWidth="0.35" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ai-cap-pattern)" />
      </svg>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="text-center">
          <motion.div
            className="mx-auto h-1 w-16 origin-center rounded-full bg-accent"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: reduce ? 0.01 : 0.45, ease }}
          />
          <h2 className="mt-4 text-section font-bold tracking-royal text-primary">
            {titleWords.map((word, i) => (
              <span key={`${word}-${i}`} className="inline-block">
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: reduce ? 0.01 : 0.45,
                    delay: reduce ? 0 : 0.06 + i * 0.035,
                    ease,
                  }}
                >
                  {word}
                </motion.span>
                {i < titleWords.length - 1 ? '\u00A0' : ''}
              </span>
            ))}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-primary/80">
            {subtitleWords.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                className="inline-block"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  duration: reduce ? 0.01 : 0.38,
                  delay: reduce ? 0 : 0.1 + i * 0.022,
                  ease,
                }}
              >
                {word}
                {i < subtitleWords.length - 1 ? '\u00A0' : ''}
              </motion.span>
            ))}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((item, i) => {
            const Icon = icons[i] ?? IconSparkles
            const isActive = activeCard === i

            return (
              <motion.article
                key={i}
                className={`group relative flex min-h-[340px] flex-col overflow-hidden rounded-2xl border-2 border-accent/20 bg-white/95 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/10 ${isActive ? 'border-accent ring-2 ring-accent/30' : ''} ${locale === 'ar' ? 'text-right' : 'text-left'}`}
                initial={{ opacity: 0, y: 28, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  type: 'spring',
                  stiffness: reduce ? 500 : 300,
                  damping: reduce ? 55 : 26,
                  delay: reduce ? 0 : i * 0.07,
                }}
                whileHover={
                  reduce
                    ? undefined
                    : {
                        y: -6,
                        transition: { type: 'spring', stiffness: 400, damping: 22 },
                      }
                }
              >
                <div
                  className="absolute inset-x-0 top-0 z-[1] h-0.5 origin-center scale-x-0 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-[transform,opacity] duration-300 ease-out group-hover:scale-x-100 group-hover:opacity-100"
                  aria-hidden
                />

                <div className="border-b border-accent/20 bg-gradient-to-r from-accent/10 via-white to-accent/5 px-6 py-5">
                  <div
                    className={`flex items-start gap-4 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
                  >
                    <motion.div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-accent ring-2 ring-accent/30"
                      whileHover={reduce ? undefined : { scale: 1.06 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                    >
                      <Icon className="h-6 w-6" />
                    </motion.div>
                    <div className="min-w-0 flex-1">
                      <motion.h3
                        className="text-xl font-bold tracking-royal text-primary"
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: reduce ? 0 : 0.08 + i * 0.04,
                          duration: 0.35,
                          ease,
                        }}
                      >
                        {item.title}
                      </motion.h3>
                      <motion.p
                        className="mt-1 text-sm text-primary/75"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: reduce ? 0 : 0.12 + i * 0.04, duration: 0.35 }}
                      >
                        {item.tagline}
                      </motion.p>
                    </div>
                  </div>
                </div>

                <div className="min-h-[100px] flex-1 border-b border-primary/10 px-6 py-5">
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary/90">
                    <IconAlert className="h-4 w-4 shrink-0 text-amber-600" />
                    {item.painTitle}
                  </div>
                  <div className="mt-3">
                    <div className="flex gap-2 text-sm text-primary/80">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/80" />
                      <span>{getPainSummary(i)}</span>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-5">
                  <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-accent">
                    <IconCheck className="h-4 w-4 shrink-0" />
                    {item.benefitTitle}
                  </div>
                  <motion.button
                    type="button"
                    onClick={() => toggleCard(i)}
                    className="inline-flex items-center gap-2 rounded-full border-2 border-accent/40 bg-accent/10 px-4 py-2.5 text-sm font-semibold text-accent transition-colors duration-200 hover:border-accent/60 hover:bg-accent/20"
                    aria-expanded={isActive}
                    aria-controls={isActive ? 'ai-capability-detail-panel' : undefined}
                    whileTap={{ scale: 0.97 }}
                    whileHover={reduce ? undefined : { scale: 1.02 }}
                  >
                    <span>{locale === 'ar' ? 'عرض التفاصيل' : 'View details'}</span>
                    {locale === 'ar' ? (
                      <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </motion.button>
                </div>
              </motion.article>
            )
          })}
        </div>

        {(activeCard !== null || drawerClosing) &&
          typeof document !== 'undefined' &&
          createPortal(
            <>
              <motion.div
                role="presentation"
                className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: drawerClosing ? 0 : 1 }}
                transition={{ duration: reduce ? 0.01 : 0.3, ease }}
                onClick={closeDrawer}
                aria-hidden
              />

              <motion.div
                id="ai-capability-detail-panel"
                role="dialog"
                aria-modal="true"
                aria-label={locale === 'ar' ? 'تفاصيل القدرة' : 'Capability details'}
                className={`fixed bottom-0 top-0 z-[9999] w-full max-w-md overflow-y-auto bg-white shadow-2xl sm:max-w-lg ${locale === 'ar' ? 'left-0' : 'right-0'}`}
                initial={{ x: panelX }}
                animate={{ x: drawerOpen ? 0 : panelX }}
                transition={{ duration: reduce ? 0.01 : 0.3, ease }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 z-10 border-b-2 border-accent/30 bg-white py-4 pl-6 pr-14 shadow-md">
                  <h3
                    className={`min-w-0 truncate text-lg font-bold text-primary ${locale === 'ar' ? 'text-right' : 'text-left'}`}
                  >
                    {activeCard !== null ? t.items[activeCard].title : ''}
                  </h3>
                  <motion.button
                    type="button"
                    onClick={closeDrawer}
                    className={`absolute top-4 flex h-10 w-10 items-center justify-center rounded-full border-2 border-accent bg-accent/15 text-accent transition-colors hover:border-accent hover:bg-accent/25 ${locale === 'ar' ? 'left-4' : 'right-4'}`}
                    aria-label={locale === 'ar' ? 'إغلاق' : 'Close drawer'}
                    whileTap={{ scale: 0.94 }}
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                <div className="p-6">
                  {activeCard !== null && (
                    <div className={`space-y-8 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                      <div>
                        <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary/90">
                          <IconAlert className="h-5 w-5 shrink-0 text-amber-600" />
                          {t.items[activeCard].painTitle}
                        </div>
                        <motion.ul
                          className="space-y-3"
                          initial="hidden"
                          animate="visible"
                          variants={drawerListVariants}
                          key={`pain-${activeCard}`}
                        >
                          {t.items[activeCard].painPoints.map((point, j) => (
                            <motion.li
                              key={j}
                              className="flex gap-2 text-sm text-primary/80"
                              variants={drawerListItemVariants}
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/80" />
                              <span>{point}</span>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </div>

                      <div>
                        <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-accent">
                          <IconCheck className="h-5 w-5 shrink-0" />
                          {t.items[activeCard].benefitTitle}
                        </div>
                        <motion.ul
                          className="space-y-3"
                          initial="hidden"
                          animate="visible"
                          variants={drawerListVariants}
                          key={`benefit-${activeCard}`}
                        >
                          {t.items[activeCard].benefits.map((benefit, j) => (
                            <motion.li
                              key={j}
                              className="flex gap-2 text-sm text-primary/85"
                              variants={drawerListItemVariants}
                            >
                              <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                              <span>{benefit}</span>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </>,
            document.body
          )}
      </div>
    </section>
  )
}
