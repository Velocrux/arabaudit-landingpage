'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotionSafe } from '@/lib/hooks/useReducedMotionSafe'
import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'
import { useSectionTracking } from '@/lib/hooks/useAnalytics'

const ease = [0.25, 0.1, 0.25, 1] as const

export function Personas() {
  const { locale } = useLocale()
  const reduce = useReducedMotionSafe()
  const t = getContent(locale).personas as {
    title: string
    problemLabel?: string
    howItWorksLabel?: string
    items: Array<{
      role: string
      headline: string
      pain: string
      solution: string
      value: string
      feature: string
    }>
  }
  const personasRef = useSectionTracking('personas')

  const problemLabel = t.problemLabel ?? (locale === 'ar' ? 'المشكلة' : 'The Problem')
  const howItWorksLabel = t.howItWorksLabel ?? (locale === 'ar' ? 'كيف يعمل' : 'How It Works')

  const titleWords = useMemo(() => t.title.split(/\s+/).filter(Boolean), [t.title])
  const isRTL = locale === 'ar'

  return (
    <section
      ref={personasRef}
      className={`relative scroll-mt-16 overflow-hidden px-6 py-20 sm:px-8 sm:py-28 ${isRTL ? 'rtl' : 'ltr'}`}
    >
      <div
        className="absolute inset-0"
        style={{
          background: [
            'linear-gradient(165deg, #fafaf9 0%, #f2f5f4 40%, #e8efe9 100%)',
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(11, 70, 52, 0.04) 0%, transparent 60%)',
            'radial-gradient(ellipse 60% 40% at 20% 100%, rgba(216, 176, 74, 0.03) 0%, transparent 50%)',
          ].join(', '),
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-[1] animate-gradient-shift opacity-35"
        style={{
          background:
            'linear-gradient(118deg, rgba(11,70,52,0.04) 0%, rgba(216,176,74,0.05) 45%, rgba(11,70,52,0.03) 100%)',
          backgroundSize: '200% 200%',
        }}
        aria-hidden
      />

      <svg
        className="absolute inset-0 z-[1] h-full w-full opacity-[0.03]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <pattern id="personas-pattern" x="0" y="0" width="140" height="140" patternUnits="userSpaceOnUse">
            <path
              d="M70 10 L130 70 L70 130 L10 70 Z"
              fill="none"
              stroke="rgb(11 70 52)"
              strokeWidth="0.3"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#personas-pattern)" />
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

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {t.items.map((item, i) => (
            <motion.article
              key={i}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-accent/20 bg-white shadow-xl transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/10"
              initial={{ opacity: 0, y: 28, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                type: 'spring',
                stiffness: reduce ? 500 : 300,
                damping: reduce ? 55 : 26,
                delay: reduce ? 0 : i * 0.08,
              }}
              whileHover={
                reduce
                  ? undefined
                  : {
                      y: -6,
                      scale: 1.015,
                      transition: { type: 'spring', stiffness: 400, damping: 22 },
                    }
              }
            >
              <div
                className="absolute inset-x-0 top-0 z-[1] h-0.5 origin-center scale-x-0 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-[transform,opacity] duration-300 ease-out group-hover:scale-x-100 group-hover:opacity-100"
                aria-hidden
              />

              <div className="relative border-b border-accent/20 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 px-8 py-6">
                <div className="absolute start-0 top-0 h-full w-1 bg-gradient-to-b from-accent via-accent/70 to-accent/30" />
                <motion.h3
                  className="text-lg font-bold uppercase tracking-wider text-primary transition-colors duration-300 group-hover:text-accent"
                  initial={{ opacity: 0, x: isRTL ? 8 : -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: reduce ? 0 : 0.1 + i * 0.04, duration: 0.4, ease }}
                >
                  {item.role}
                </motion.h3>
                <motion.h4
                  className="mt-2 text-xl font-semibold leading-snug text-accent drop-shadow-sm transition-all duration-300 group-hover:text-primary group-hover:drop-shadow-md"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: reduce ? 0 : 0.14 + i * 0.04, duration: 0.45, ease }}
                >
                  {item.headline}
                </motion.h4>
              </div>

              <div className="flex flex-1 flex-col p-8">
                <div className="space-y-5">
                  <motion.div
                    className="rounded-lg border border-primary/10 bg-primary/[0.02] p-4"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: reduce ? 0 : 0.18 + i * 0.04, duration: 0.4, ease }}
                  >
                    <div
                      className={`mb-2 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                      <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40 shadow-sm" />
                      <h5 className="text-xs font-bold uppercase tracking-widest text-primary/70">
                        {problemLabel}
                      </h5>
                    </div>
                    <p className="text-[15px] leading-relaxed text-primary/75 transition-colors duration-300 group-hover:text-primary/85">
                      {item.pain}
                    </p>
                  </motion.div>

                  <motion.div
                    className="rounded-lg border border-accent/20 bg-gradient-to-br from-accent/8 via-accent/5 to-accent/8 p-4 shadow-sm transition-all duration-300 group-hover:border-accent/30 group-hover:from-accent/12 group-hover:via-accent/8 group-hover:to-accent/12 group-hover:shadow-md"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: reduce ? 0 : 0.22 + i * 0.04, duration: 0.4, ease }}
                  >
                    <div
                      className={`mb-2 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                      <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-sm shadow-accent/50" />
                      <h5 className="text-xs font-bold uppercase tracking-widest text-accent">
                        {item.solution}
                      </h5>
                    </div>
                    <p className="text-[15px] font-medium leading-relaxed text-primary transition-colors duration-300 group-hover:text-primary">
                      {item.value}
                    </p>
                  </motion.div>
                </div>

                <div className="mt-auto pt-6">
                  <motion.div
                    className="rounded-xl border border-accent/20 bg-gradient-to-r from-primary/[0.02] via-accent/[0.04] to-primary/[0.02] px-6 py-4 shadow-sm transition-all duration-300 group-hover:border-accent/30 group-hover:from-primary/[0.04] group-hover:via-accent/[0.08] group-hover:to-primary/[0.04] group-hover:shadow-md"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: reduce ? 0 : 0.26 + i * 0.04, duration: 0.42, ease }}
                  >
                    <h5
                      className={`mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary/70 transition-colors duration-300 group-hover:text-primary/80 ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                      <div className="h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                      {howItWorksLabel}
                    </h5>
                    <p className="text-sm leading-relaxed text-primary/80 transition-colors duration-300 group-hover:text-primary/90">
                      {item.feature}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
