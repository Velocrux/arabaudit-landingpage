'use client'

import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'
import { FadeInUp } from './animations/FadeInUp'
import { FloatingCard } from './animations/FloatingCard'
import Image from 'next/image'

export function TrustSignals() {
  const { locale } = useLocale()
  const t = getContent(locale).trustSignals

  const badges = [
    { ...t.badges[0], image: '/images/NCA.png' },
    { ...t.badges[1], image: '/images/SAMA.jpeg' },
    { ...t.badges[2], image: '/images/SDAIA.jpeg' },
  ]

  return (
    <section className="px-4 py-16 bg-gradient-to-b scroll-mt-16 from-primary/5 via-primary/10 to-base sm:px-6 sm:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <FadeInUp>
          <h2 className="font-bold text-section text-primary tracking-royal">
            {t.title}
          </h2>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-body text-text/85">
            {t.subtitle}
          </p>
        </FadeInUp>

        <div className="grid gap-8 mt-12 sm:grid-cols-3">
          {badges.map((badge, i) => (
            <FloatingCard key={i} delay={0.2 + i * 0.1}>
              <div className="relative p-8 bg-white rounded-2xl border-2 transition-colors duration-300 shadow-premium border-accent group hover:border-secondary h-full min-h-[280px] flex flex-col">
                {/* Badge Image */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                  <div className="flex justify-center items-center p-3 w-24 h-24 bg-white rounded-full transition-transform duration-300 shadow-gold group-hover:scale-110">
                    <Image
                      src={badge.image}
                      alt={badge.title}
                      width={64}
                      height={64}
                      className="object-contain max-w-full max-h-full"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow pt-16">
                  <h3 className="inline-flex items-center px-4 py-1.5 text-sm font-bold rounded-full bg-secondary/10 text-secondary border border-secondary/30 self-center">
                    ✓ {badge.title}
                  </h3>
                  <p className="flex-grow mt-4 text-sm leading-relaxed text-text/80">
                    {badge.desc}
                  </p>
                </div>
              </div>
            </FloatingCard>
          ))}
        </div>
      </div>
    </section>
  )
}
