'use client'

import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'
import { FadeInUp } from './animations/FadeInUp'
import { StaggerChildren, StaggerItem } from './animations/StaggerChildren'

export function Comparison() {
  const { locale } = useLocale()
  const t = getContent(locale).comparison
  const headers = t.headers ?? { feature: 'Feature', other: 'Other audit platforms', us: 'ArabAudit' }

  return (
    <section id="whyUs" className="relative scroll-mt-16 overflow-hidden px-6 py-20 sm:px-8 sm:py-28">
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
            <div className="mx-auto h-1 w-16 rounded-full bg-accent" />
            <h2 className="mt-4 text-section font-bold tracking-royal text-primary">
              {t.title}
            </h2>
            <p className="mt-4 text-lg text-primary/80 leading-relaxed">
              {t.tagline}
            </p>
          </div>
        </FadeInUp>

        <StaggerChildren className="mt-14 space-y-6">
          {t.rows.map((row, i) => (
            <StaggerItem key={i}>
              <div className="group overflow-hidden rounded-2xl border border-accent/20 bg-white shadow-xl transition-all duration-500 ease-out cursor-pointer hover:shadow-2xl hover:shadow-accent/10 hover:border-accent/40 hover:scale-[1.01] hover:-translate-y-1">
                {/* Feature Header with golden accent */}
                <div className="relative border-b border-accent/20 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 px-8 py-5">
                  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-accent via-accent/70 to-accent/30" />
                  <h3 className="text-base font-bold uppercase tracking-widest text-primary transition-colors duration-300 group-hover:text-accent">
                    {row.feature}
                  </h3>
                </div>

                {/* Comparison Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-accent/15">
                  {/* Other platforms column */}
                  <div className="px-6 sm:px-8 py-6">
                    <div className="mb-3 flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary/60">
                      <div className="h-1 w-1 rounded-full bg-primary/30 shrink-0"></div>
                      <span className="break-words">{headers.other}</span>
                    </div>
                    <p className="text-sm sm:text-[15px] text-primary/75 leading-relaxed">
                      {row.other}
                    </p>
                  </div>

                  {/* ArabAudit column - highlighted with golden glow */}
                  <div className="relative bg-gradient-to-br from-accent/8 via-accent/5 to-accent/8 px-6 sm:px-8 py-6">
                    <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-accent via-accent/60 to-accent/20" />
                    <div className="mb-3 flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-primary">
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
                  <p className="text-xs sm:text-sm text-primary/80 leading-relaxed transition-all duration-300 group-hover:text-primary/90">
                    <span className="font-semibold text-accent drop-shadow-sm transition-colors duration-300 group-hover:text-accent">Why it matters: </span>
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
