'use client'

import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'
import { FadeInUp } from './animations/FadeInUp'
import { StaggerChildren, StaggerItem } from './animations/StaggerChildren'
import { useSectionTracking } from '@/lib/hooks/useAnalytics'

export function Comparison() {
  const { locale } = useLocale()
  const t = getContent(locale).comparison
  const headers = t.headers ?? { feature: 'Feature', other: 'Other audit platforms', us: 'ArabAudit' }
  const comparisonRef = useSectionTracking('comparison')

  return (
    <section ref={comparisonRef} id="whyUs" className="overflow-hidden relative px-6 py-20 scroll-mt-16 sm:px-8 sm:py-28">
      {/* Royal gradient: soft green palette */}
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
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.035]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <pattern
            id="comparison-pattern"
            x="0"
            y="0"
            width="160"
            height="160"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M80 12 L148 80 L80 148 L12 80 Z"
              fill="none"
              stroke="rgb(11 70 52)"
              strokeWidth="0.35"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#comparison-pattern)" />
      </svg>

      <div className="relative z-10 mx-auto max-w-4xl">
        <FadeInUp>
          <div className="text-center">
            <div className="mx-auto w-16 h-1 rounded-full bg-accent" />
            <h2 className="mt-4 font-bold text-section tracking-royal text-primary">
              {t.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-primary/80">
              {t.tagline}
            </p>
          </div>
        </FadeInUp>

        <StaggerChildren className="mt-14 space-y-6">
          {t.rows.map((row, i) => (
            <StaggerItem key={i}>
              <div className="group overflow-hidden rounded-2xl border border-accent/20 bg-white shadow-xl transition-all duration-500 ease-out cursor-pointer hover:shadow-2xl hover:shadow-accent/10 hover:border-accent/40 hover:scale-[1.01] hover:-translate-y-1">
                {/* Feature Header with golden accent */}
                <div className="relative px-8 py-5 bg-gradient-to-r border-b border-accent/20 from-primary/5 via-accent/5 to-primary/5">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent via-accent/70 to-accent/30" />
                  <h3 className="text-base font-bold tracking-widest uppercase transition-colors duration-300 text-primary group-hover:text-accent">
                    {row.feature}
                  </h3>
                </div>

                {/* Comparison Grid */}
                <div className="grid grid-cols-1 divide-y md:grid-cols-2 md:divide-y-0 md:divide-x divide-accent/15">
                  {/* Other platforms column */}
                  <div className="px-6 py-6 sm:px-8">
                    <div className="flex gap-2 items-center mb-3 text-xs font-semibold tracking-wider uppercase sm:text-sm text-primary/60">
                      <div className="w-1 h-1 rounded-full bg-primary/30 shrink-0"></div>
                      <span className="break-words">{headers.other}</span>
                    </div>
                    <p className="text-sm sm:text-[15px] text-primary/75 leading-relaxed">
                      {row.other}
                    </p>
                  </div>

                  {/* ArabAudit column - highlighted with golden glow */}
                  <div className="relative px-6 py-6 bg-gradient-to-br from-accent/8 via-accent/5 to-accent/8 sm:px-8">
                    <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-accent via-accent/60 to-accent/20" />
                    <div className="flex gap-2 items-center mb-3 text-xs font-bold tracking-wider uppercase sm:text-sm text-primary">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent shadow-sm shadow-accent/50 shrink-0"></div>
                      <span className="break-words">{headers.us}</span>
                    </div>
                    <p className="text-sm sm:text-[15px] font-medium text-primary leading-relaxed">
                      {row.us}
                    </p>
                  </div>
                </div>

                {/* Why it matters footer with golden border */}
                <div className="border-t border-accent/20 bg-gradient-to-r from-primary/[0.02] via-accent/[0.04] to-primary/[0.02] px-6 sm:px-8 py-4 sm:py-5">
                  <p className="text-xs leading-relaxed transition-all duration-300 sm:text-sm text-primary/80 group-hover:text-primary/90">
                    <span className="font-semibold drop-shadow-sm transition-colors duration-300 text-accent group-hover:text-accent">Why it matters: </span>
                    {row.whyItMatters}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}
