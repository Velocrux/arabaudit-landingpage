'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotionSafe } from '@/lib/hooks/useReducedMotionSafe'
import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'
import { useSectionTracking } from '@/lib/hooks/useAnalytics'

type FeatureItem = { title: string; desc: string; category: string; highlighted?: boolean }

const ease = [0.25, 0.1, 0.25, 1] as const

const categoryIcons = {
  ai: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    </svg>
  ),
  automation: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  compliance: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  security: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  ),
}

export function Features() {
  const { locale } = useLocale()
  const content = getContent(locale)
  const t = content.features as {
    title: string
    tablistAriaLabel?: string
    featuredBadge?: string
    categories: Record<string, string>
    items: FeatureItem[]
  }
  const featuresRef = useSectionTracking('features')
  const reduce = useReducedMotionSafe()

  const categoryKeys = useMemo(() => Object.keys(t.categories ?? {}), [t.categories])
  const firstCategory = categoryKeys[0] ?? ''
  const [activeCategory, setActiveCategory] = useState<string>(firstCategory)

  useEffect(() => {
    setActiveCategory(categoryKeys[0] ?? '')
  }, [locale, categoryKeys])

  const filteredItems = t.items.filter((item) => item.category === activeCategory)
  const tablistAriaLabel =
    t.tablistAriaLabel ?? (locale === 'ar' ? 'فئات الميزات' : 'Feature categories')
  const featuredBadge = t.featuredBadge ?? 'Featured'
  const vision2030Badge =
    (content.hero as { vision2030Badge?: string })?.vision2030Badge ?? 'Vision 2030 Aligned'

  const titleWords = useMemo(() => t.title.split(/\s+/).filter(Boolean), [t.title])
  const alignStart = locale === 'ar' ? 'text-end' : 'text-start'

  if (!t?.items?.length) return null

  return (
    <section ref={featuresRef} id="product" className="relative scroll-mt-16 overflow-hidden px-6 py-20 sm:px-8 sm:py-28">
      <div
        className="absolute inset-0"
        style={{
          background: [
            'linear-gradient(165deg, #f2f5f4 0%, #e8efe9 35%, #dce8e2 70%, #d0e2da 100%)',
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(11, 70, 52, 0.06) 0%, transparent 55%)',
            'radial-gradient(ellipse 60% 40% at 80% 100%, rgba(216, 176, 74, 0.05) 0%, transparent 50%)',
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
          <pattern id="features-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M60 8 L112 60 L60 112 L8 60 Z" fill="none" stroke="rgb(11 70 52)" strokeWidth="0.35" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#features-pattern)" />
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
        </div>

        <motion.div
          className={`relative mt-12 flex justify-center border-b border-primary/15 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
          role="tablist"
          aria-label={tablistAriaLabel}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: reduce ? 0.01 : 0.45, delay: reduce ? 0 : 0.12, ease }}
        >
          <div className="flex gap-1 overflow-x-auto sm:gap-0">
            {categoryKeys.map((categoryKey) => (
              <motion.button
                key={categoryKey}
                role="tab"
                type="button"
                aria-selected={activeCategory === categoryKey}
                onClick={() => setActiveCategory(categoryKey)}
                className={`relative shrink-0 px-5 py-4 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                  activeCategory === categoryKey ? 'text-primary' : 'text-primary/60 hover:text-primary/90'
                }`}
                whileTap={{ scale: 0.97 }}
              >
                {t.categories[categoryKey]}
                {activeCategory === categoryKey && (
                  <motion.div
                    layoutId="featuresActiveTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: reduce ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -14 }}
            transition={{ duration: reduce ? 0.01 : 0.35, ease }}
            className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredItems.map((item, i) => {
              const isHighlighted = item.highlighted
              const icon =
                categoryIcons[item.category as keyof typeof categoryIcons] ?? categoryIcons.compliance

              return (
                <motion.article
                  key={`${activeCategory}-${item.title}-${i}`}
                  className={`group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border-2 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 sm:p-6 ${
                    isHighlighted
                      ? 'border-accent/50 bg-gradient-to-br from-accent/10 via-white/95 to-accent/5'
                      : 'border-primary/10 bg-white/95 hover:border-accent/50 hover:bg-gradient-to-br hover:from-accent/10 hover:via-white/95 hover:to-accent/5 hover:shadow-2xl hover:shadow-accent/10'
                  }`}
                  initial={{ opacity: 0, y: 28, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: reduce ? 500 : 300,
                    damping: reduce ? 55 : 26,
                    delay: reduce ? 0 : i * 0.065,
                  }}
                  whileHover={
                    reduce
                      ? undefined
                      : {
                          y: -8,
                          transition: { type: 'spring', stiffness: 400, damping: 22 },
                        }
                  }
                >
                  <div
                    className="absolute inset-x-0 top-0 h-0.5 origin-center scale-x-0 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-[transform,opacity] duration-300 ease-out group-hover:scale-x-100 group-hover:opacity-100"
                    aria-hidden
                  />

                  <div className={`mb-4 flex items-center gap-3 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <motion.div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-accent ring-2 ring-accent/30 ${
                        isHighlighted ? 'ring-accent/50' : ''
                      }`}
                      whileHover={reduce ? undefined : { scale: 1.08 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                    >
                      {icon}
                    </motion.div>
                    {isHighlighted && (
                      <div className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 shrink-0 text-accent"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                          />
                        </svg>
                        <span className="text-xs font-bold uppercase tracking-wider text-accent">{featuredBadge}</span>
                      </div>
                    )}
                  </div>

                  <motion.h3
                    className={`mb-2 text-lg font-bold tracking-royal text-primary transition-colors group-hover:text-accent ${alignStart}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: reduce ? 0 : 0.08 + i * 0.04,
                      duration: 0.35,
                      ease,
                    }}
                  >
                    {item.title}
                  </motion.h3>
                  <motion.p
                    className={`flex-1 text-sm leading-relaxed text-primary/80 ${alignStart}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: reduce ? 0 : 0.12 + i * 0.04,
                      duration: 0.4,
                      ease,
                    }}
                  >
                    {item.desc}
                  </motion.p>

                  {isHighlighted && (
                    <motion.div
                      className="mt-4 border-t border-accent/20 pt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: reduce ? 0 : 0.2 + i * 0.04 }}
                    >
                      <div className="flex items-center gap-2 text-xs font-semibold text-accent">
                        <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                        <span className="uppercase tracking-wider">{vision2030Badge}</span>
                      </div>
                    </motion.div>
                  )}
                </motion.article>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
