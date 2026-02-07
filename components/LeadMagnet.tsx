'use client'

import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'

export function LeadMagnet() {
  const { locale } = useLocale()
  const t = getContent(locale).leadMagnet

  return (
    <section id="leadMagnet" className="scroll-mt-16 bg-gradient-to-b from-primary/5 to-accent/5 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border-2 border-accent/40 bg-base p-8 shadow-lg sm:p-10">
          <div className="text-center">
            <div className="mx-auto mb-4 h-1 w-16 rounded-full bg-accent" />
            <h2 className="text-section font-bold text-primary">
              {t.title}
            </h2>
            <p className="mt-2 text-body text-accent font-medium">
              {t.subtitle}
            </p>
            <p className="mt-4 text-body text-primary/80">
              {t.description}
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {t.benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-accent shrink-0" />
                <span className="text-sm text-primary/85">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-8 py-4 text-cta font-semibold text-primary shadow-md ring-2 ring-accent/40 ring-offset-2 transition hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {t.cta}
            </button>
            <p className="mt-3 text-xs text-primary/70">
              {t.trustLine}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}