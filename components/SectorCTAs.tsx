'use client'

import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'

export function SectorCTAs() {
  const { locale } = useLocale()
  const t = getContent(locale).sectorCTAs

  return (
    <section className="scroll-mt-16 bg-base px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-section font-bold text-primary mb-12">
          Choose Your Path to Compliance
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.map((sector, i) => (
            <div
              key={i}
              className="group relative rounded-xl border-2 border-primary/20 bg-base p-6 shadow-sm transition-all hover:border-accent/50 hover:shadow-md"
            >
              <div className="absolute -top-2 -end-2">
                <span className="inline-flex items-center rounded-full bg-accent px-2 py-1 text-xs font-semibold text-primary">
                  {sector.sector.toUpperCase()}
                </span>
              </div>

              <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors">
                {sector.headline}
              </h3>
              <p className="mt-2 text-sm text-primary/80">
                {sector.message}
              </p>

              <div className="mt-4 rounded-lg bg-primary/5 p-3">
                <p className="text-xs font-medium text-primary/70">
                  {sector.urgency}
                </p>
              </div>

              <button
                type="button"
                className="mt-4 w-full rounded-lg border-2 border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-base focus:outline-none focus:ring-2 focus:ring-primary group-hover:border-accent group-hover:text-accent group-hover:hover:bg-accent group-hover:hover:text-primary"
              >
                {sector.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}