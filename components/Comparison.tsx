'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotionSafe } from '@/lib/hooks/useReducedMotionSafe'
import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'
import { useSectionTracking } from '@/lib/hooks/useAnalytics'

const ease = [0.25, 0.1, 0.25, 1] as const

export function Comparison() {
  const { locale } = useLocale()
  const reduce = useReducedMotionSafe()
  const t = getContent(locale).comparison as {
    title: string
    tagline: string
    whyItMattersLabel?: string
    headers?: { feature: string; other: string; us: string }
    rows: Array<{ feature: string; other: string; us: string; whyItMatters: string }>
  }
  const headers = t.headers ?? { feature: 'Feature', other: 'Other audit platforms', us: 'ArabAudit' }
  const whyLabel = t.whyItMattersLabel ?? (locale === 'ar' ? 'لماذا يهم:' : 'Why it matters:')
  const comparisonRef = useSectionTracking('comparison')
  const isRTL = locale === 'ar'

  const titleWords = useMemo(() => t.title.split(/\s+/).filter(Boolean), [t.title])
  const taglineWords = useMemo(() => t.tagline.split(/\s+/).filter(Boolean), [t.tagline])

  const rowVariants = useMemo(
    () => ({
      hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 16 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: reduce ? 0 : i * 0.055,
          duration: reduce ? 0.01 : 0.42,
          ease,
        },
      }),
    }),
    [reduce]
  )

  return (
    <section
      ref={comparisonRef}
      id="whyUs"
      className="relative scroll-mt-16 overflow-hidden px-6 py-20 sm:px-8 sm:py-28"
    >
      <div
        className="absolute inset-0"
        style={{
          background: [
            'linear-gradient(165deg, #f0f4f2 0%, #e4ebe7 40%, #d8e4de 100%)',
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(11, 70, 52, 0.05) 0%, transparent 55%)',
            'radial-gradient(ellipse 50% 30% at 90% 80%, rgba(216, 176, 74, 0.04) 0%, transparent 50%)',
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
        className="absolute inset-0 z-[1] h-full w-full opacity-[0.035]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <pattern id="comparison-pattern" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
            <path d="M80 12 L148 80 L80 148 L12 80 Z" fill="none" stroke="rgb(11 70 52)" strokeWidth="0.35" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#comparison-pattern)" />
      </svg>

      <div className={`relative z-10 mx-auto max-w-5xl ${isRTL ? 'rtl' : 'ltr'}`}>
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
          <p className="mt-4 text-lg leading-relaxed text-primary/80">
            {taglineWords.map((word, i) => (
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
                {i < taglineWords.length - 1 ? '\u00A0' : ''}
              </motion.span>
            ))}
          </p>
        </div>

        <motion.div
          className="group relative mt-14 overflow-hidden rounded-2xl border-[3px] border-accent/60 bg-white/90 shadow-xl backdrop-blur-sm"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            type: 'spring',
            stiffness: reduce ? 500 : 280,
            damping: reduce ? 55 : 28,
            delay: reduce ? 0 : 0.08,
          }}
          whileHover={
            reduce
              ? undefined
              : {
                  boxShadow:
                    '0 25px 50px -12px rgba(11, 70, 52, 0.15), 0 0 0 1px rgba(216, 176, 74, 0.12)',
                  transition: { duration: 0.35, ease },
                }
          }
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-0.5 origin-center scale-x-0 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-[transform,opacity] duration-500 ease-out group-hover:scale-x-100 group-hover:opacity-100"
            aria-hidden
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={{
              hidden: { opacity: reduce ? 1 : 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: reduce ? 0 : 0.05,
                  delayChildren: reduce ? 0 : 0.1,
                },
              },
            }}
          >
            <div
              role="row"
              className="sticky top-0 z-10 grid grid-cols-1 border-b-[3px] border-accent/70 bg-gradient-to-r from-primary/95 via-primary/90 to-primary/95 shadow-lg md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]"
            >
              <div className="flex items-center border-b-2 border-accent/60 px-4 py-4 md:border-b-0 md:border-r-[3px] md:border-accent/70 md:px-5 md:py-5">
                <span className="text-xs font-bold uppercase tracking-widest text-white sm:text-sm">
                  {headers.feature}
                </span>
              </div>
              <div className="flex items-center gap-2 border-b-2 border-accent/60 bg-white/10 px-4 py-4 md:border-b-0 md:border-r-[3px] md:border-accent/70 md:px-5 md:py-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-red-200/80 bg-red-50/90">
                  <svg className="h-4 w-4 text-red-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-white sm:text-sm">
                  {headers.other}
                </span>
              </div>
              <div className="flex items-center justify-end gap-2 border-b-2 border-accent/60 bg-accent/20 px-4 py-4 md:border-b-0 md:px-5 md:py-5">
                <span className="bg-gradient-to-r from-amber-300 via-accent to-amber-400 bg-clip-text text-right text-xs font-bold uppercase tracking-widest text-transparent drop-shadow-sm sm:text-sm">
                  {headers.us}
                </span>
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-white/90">
                  <svg className="h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {t.rows.map((row, i) => (
              <motion.div
                key={i}
                role="row"
                className="grid grid-cols-1 border-b-2 border-accent/50 last:border-b-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]"
                variants={rowVariants}
                custom={i}
              >
                <div className="flex items-start border-b-2 border-accent/50 bg-primary/5 py-4 pl-4 pr-3 align-top md:border-b-0 md:border-r-[3px] md:border-accent/60 md:py-5 md:pl-5 md:pr-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary/80 sm:text-sm">
                    {row.feature}
                  </span>
                </div>

                <div className="flex flex-col border-b-2 border-accent/50 py-4 pl-4 pr-3 align-top md:border-b-0 md:border-r-[3px] md:border-accent/60 md:py-5 md:pl-5 md:pr-4">
                  <p className="text-sm leading-relaxed text-primary/70 sm:text-[15px]">{row.other}</p>
                </div>

                <div className="flex flex-col border-b-2 border-accent/50 bg-gradient-to-b from-accent/5 to-white py-4 pl-4 pr-3 align-top last:border-b-0 md:border-b-0 md:border-r-0 md:py-5 md:pl-5 md:pr-4">
                  <p className="mb-2 text-sm font-medium leading-relaxed text-primary sm:text-[15px]">{row.us}</p>
                  <p className="border-t-2 border-accent/40 pt-2 text-xs leading-relaxed text-primary/75">
                    <span className="font-semibold text-accent">{whyLabel}</span>{' '}
                    {row.whyItMatters}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
