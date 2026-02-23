'use client'

import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'
import { FadeInUp } from './animations/FadeInUp'
import { motion } from 'framer-motion'
import { useSectionTracking } from '@/lib/hooks/useAnalytics'

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4 }
  })
}

export function Comparison() {
  const { locale } = useLocale()
  const t = getContent(locale).comparison
  const headers = t.headers ?? { feature: 'Feature', other: 'Other audit platforms', us: 'ArabAudit' }
  const comparisonRef = useSectionTracking('comparison')
  const isRTL = locale === 'ar'

  return (
    <section ref={comparisonRef} id="whyUs" className="relative overflow-hidden px-6 py-20 scroll-mt-16 sm:px-8 sm:py-28">
      {/* Background */}
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
      <svg className="absolute inset-0 h-full w-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <pattern id="comparison-pattern" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
            <path d="M80 12 L148 80 L80 148 L12 80 Z" fill="none" stroke="rgb(11 70 52)" strokeWidth="0.35" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#comparison-pattern)" />
      </svg>

      <div className={`relative z-10 mx-auto max-w-5xl ${isRTL ? 'rtl' : 'ltr'}`}>
        <FadeInUp>
          <div className="text-center">
            <div className="mx-auto h-1 w-16 rounded-full bg-accent" />
            <h2 className="mt-4 text-section font-bold tracking-royal text-primary">
              {t.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-primary/80">
              {t.tagline}
            </p>
          </div>
        </FadeInUp>

        {/* Comparison table */}
        <motion.div
          className="mt-14 overflow-hidden rounded-2xl border-[3px] border-accent/60 bg-white/90 shadow-xl backdrop-blur-sm"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.05, delayChildren: 0.1 }
            }
          }}
        >
          {/* Table header - sticky and highly visible */}
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
                <svg className="h-4 w-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92z" clipRule="evenodd" />
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
                <svg className="h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Table body - tabular rows */}
          {t.rows.map((row, i) => (
            <motion.div
              key={i}
              role="row"
              className="grid grid-cols-1 border-b-2 border-accent/50 last:border-b-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]"
              variants={rowVariants}
              custom={i}
            >
              {/* Feature column */}
              <div className="flex items-start border-b-2 border-accent/50 bg-primary/5 py-4 pl-4 pr-3 align-top md:border-b-0 md:border-r-[3px] md:border-accent/60 md:py-5 md:pl-5 md:pr-4">
                <span className="text-xs font-bold uppercase tracking-wider text-primary/80 sm:text-sm">
                  {row.feature}
                </span>
              </div>

              {/* Other platforms column */}
              <div className="flex flex-col border-b-2 border-accent/50 py-4 pl-4 pr-3 align-top md:border-b-0 md:border-r-[3px] md:border-accent/60 md:py-5 md:pl-5 md:pr-4">
                <p className="text-sm leading-relaxed text-primary/70 sm:text-[15px]">
                  {row.other}
                </p>
              </div>

              {/* ArabAudit column */}
              <div className="flex flex-col border-b-2 border-accent/50 bg-gradient-to-b from-accent/5 to-white py-4 pl-4 pr-3 align-top last:border-b-0 md:border-b-0 md:border-r-0 md:py-5 md:pl-5 md:pr-4">
                <p className="mb-2 text-sm font-medium leading-relaxed text-primary sm:text-[15px]">
                  {row.us}
                </p>
                <p className="border-t-2 border-accent/40 pt-2 text-xs leading-relaxed text-primary/75">
                  <span className="font-semibold text-accent">Why it matters: </span>
                  {row.whyItMatters}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
