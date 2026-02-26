'use client'

import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'
import { FadeInUp } from './animations/FadeInUp'
import { FloatingCard } from './animations/FloatingCard'
import { useSectionTracking } from '@/lib/hooks/useAnalytics'
import Image from 'next/image'

export function TrustSignals() {
  const { locale } = useLocale()
  const t = getContent(locale).trustSignals
  const trustSignalsRef = useSectionTracking('trust_signals')

  const badgeImages: Record<number, string | undefined> = {
    0: '/images/NCA.png',
    1: '/images/SAMA.jpeg',
    2: '/images/SDAIA.jpeg',
    3: '/images/tour.png',
  }
  const badges = (t.badges as Array<{ framework: string; title: string; desc: string }>).map((b, i) => ({
    ...b,
    image: badgeImages[i],
  }))

  return (
    <section ref={trustSignalsRef} className="px-4 py-16 bg-gradient-to-b scroll-mt-16 from-primary/5 via-primary/10 to-base sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl text-center">
        <FadeInUp>
          <h2 className="font-bold text-hero text-primary tracking-royal">
            {t.title}
          </h2>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary/80">
            {t.subtitle}
          </p>
        </FadeInUp>

        <div className="grid gap-6 mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map((badge, i) => (
            <FloatingCard key={i} delay={0.2 + i * 0.1}>
              <div className="relative h-full flex flex-col rounded-2xl border-2 border-primary/15 bg-white p-6 shadow-lg transition-all duration-300 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 sm:p-6 group">
                {/* Icon row: compact, no overlap */}
                <div className={`flex items-center gap-4 ${locale === 'ar' ? 'flex-row-reverse text-right' : 'text-left'}`}>
                  <div className={`flex shrink-0 items-center justify-center rounded-xl bg-primary/10 ring-2 ring-primary/20 transition-colors group-hover:bg-accent/15 group-hover:ring-accent/30 ${i === 3 ? 'h-16 w-16' : 'h-14 w-14'}`}>
                    {badge.image ? (
                      <Image
                        src={badge.image}
                        alt=""
                        width={i === 3 ? 80 : 40}
                        height={i === 3 ? 80 : 40}
                        className={i === 3 ? 'object-contain h-12 w-12 sm:h-80 sm:w-80' : 'object-contain max-h-10 max-w-10'}
                      />
                    ) : (
                      <svg className="h-8 w-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-primary/70">
                      {badge.framework}
                    </span>
                    <h3 className="mt-0.5 text-base font-bold leading-tight text-primary sm:text-lg">
                      {badge.title}
                    </h3>
                  </div>
                </div>

                {/* Description: better contrast and spacing */}
                <p className={`mt-4 flex-1 text-sm leading-relaxed text-gray-700 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                  {badge.desc}
                </p>
              </div>
            </FloatingCard>
          ))}
        </div>
      </div>
    </section>
  )
}
