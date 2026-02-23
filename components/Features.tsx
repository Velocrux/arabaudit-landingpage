'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'
import { FadeInUp } from './animations/FadeInUp'
import { StaggerChildren, StaggerItem } from './animations/StaggerChildren'
import { FloatingCard } from './animations/FloatingCard'
import { useSectionTracking } from '@/lib/hooks/useAnalytics'

type FeatureItem = { title: string; desc: string; category: string; highlighted?: boolean }

const categoryIcons = {
  ai: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  automation: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  compliance: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  security: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
}

export function Features() {
  const { locale } = useLocale()
  const content = getContent(locale)
  const t = content.features as { title: string; tablistAriaLabel?: string; featuredBadge?: string; categories: Record<string, string>; items: FeatureItem[] }
  const featuresRef = useSectionTracking('features')

  const categoryKeys = Object.keys(t.categories ?? {})
  const firstCategory = categoryKeys[0] ?? ''
  const [activeCategory, setActiveCategory] = useState<string>(firstCategory)

  useEffect(() => {
    setActiveCategory(categoryKeys[0] ?? '')
  }, [locale])

  const filteredItems = t.items.filter(item => item.category === activeCategory)
  const tablistAriaLabel = t.tablistAriaLabel ?? (locale === 'ar' ? 'فئات الميزات' : 'Feature categories')
  const featuredBadge = t.featuredBadge ?? 'Featured'
  const vision2030Badge = (content.hero as { vision2030Badge?: string })?.vision2030Badge ?? 'Vision 2030 Aligned'

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
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.04]"
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
        <FadeInUp>
          <div className="text-center">
            <div className="mx-auto h-1 w-16 rounded-full bg-accent" />
            <h2 className="mt-4 text-section font-bold tracking-royal text-primary">{t.title}</h2>
          </div>
        </FadeInUp>

        {/* Category selector: minimal underline, centered */}
        <FadeInUp delay={0.2}>
          <div
            className={`relative mt-12 flex justify-center border-b border-primary/15 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
            role="tablist"
            aria-label={tablistAriaLabel}
          >
            <div className="flex gap-1 overflow-x-auto sm:gap-0">
              {categoryKeys.map((categoryKey) => (
                <button
                  key={categoryKey}
                  role="tab"
                  aria-selected={activeCategory === categoryKey}
                  onClick={() => setActiveCategory(categoryKey)}
                  className={`relative shrink-0 px-5 py-4 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                    activeCategory === categoryKey
                      ? 'text-primary'
                      : 'text-primary/60 hover:text-primary/90'
                  }`}
                >
                  {t.categories[categoryKey]}
                  {activeCategory === categoryKey && (
                    <motion.div
                      layoutId="featuresActiveTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </FadeInUp>

        {/* Animated Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="mt-8"
          >
            <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item, i) => {
                const isHighlighted = item.highlighted

                return (
                  <StaggerItem key={`${activeCategory}-${i}`}>
                    <FloatingCard
                      className={`group flex h-full min-h-[280px] flex-col rounded-2xl border-2 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 ${
                        isHighlighted
                          ? 'border-accent/50 bg-gradient-to-br from-accent/10 via-white/95 to-accent/5'
                          : 'border-primary/10 bg-white/95 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 hover:bg-gradient-to-br hover:from-accent/10 hover:via-white/95 hover:to-accent/5'
                      }`}
                    >
                      {/* Category Icon */}
                      <div className="mb-4 flex items-center gap-3">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-accent ring-2 ring-accent/30 ${
                          isHighlighted ? 'ring-accent/50' : ''
                        }`}>
                          {categoryIcons[item.category as keyof typeof categoryIcons]}
                        </div>
                        {isHighlighted && (
                          <div className="flex items-center gap-2">
                            <svg className="h-4 w-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                            <span className="text-xs font-bold uppercase tracking-wider text-accent">{featuredBadge}</span>
                          </div>
                        )}
                      </div>

                      <h3 className="mb-2 font-bold text-lg tracking-royal text-primary group-hover:text-accent transition-colors text-start">
                        {item.title}
                      </h3>
                      <p className="flex-1 text-sm text-primary/80 leading-relaxed text-start">
                        {item.desc}
                      </p>

                      {isHighlighted && (
                        <div className="mt-4 pt-4 border-t border-accent/20">
                          <div className="flex items-center gap-2 text-xs font-semibold text-accent">
                            <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                            <span className="uppercase tracking-wider">{vision2030Badge}</span>
                          </div>
                        </div>
                      )}
                    </FloatingCard>
                  </StaggerItem>
                )
              })}
            </StaggerChildren>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
