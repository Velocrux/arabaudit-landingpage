'use client'

import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'

export function TrustSignals() {
  const { locale } = useLocale()
  const t = getContent(locale).trustSignals

  return (
    <section className="px-4 py-16 scroll-mt-16 bg-primary/5 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-section font-bold text-primary">
          {t.title}
        </h2>
        <p className="mt-3 text-body text-primary/85">
          {t.subtitle}
        </p>
        <div className="grid gap-8 mt-12 sm:grid-cols-3">
          {t.badges.map((badge, i) => (
            <div
              key={i}
              className="relative p-6 rounded-xl border-2 shadow-sm border-accent/30 bg-base"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-accent text-primary">
                  ✓ {badge.title}
                </span>
              </div>
              <div className="pt-4">
                <p className="text-sm leading-relaxed text-primary/80">
                  {badge.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}