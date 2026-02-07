'use client'

import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'

export function Personas() {
  const { locale } = useLocale()
  const t = getContent(locale).personas

  return (
    <section className="scroll-mt-16 bg-primary/5 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-section font-bold text-primary">
          {t.title}
        </h2>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {t.items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border-2 border-primary/15 bg-base p-8 shadow-sm"
            >
              <div className="border-b border-accent/40 pb-4">
                <h3 className="text-xl font-bold text-primary">{item.role}</h3>
                <h4 className="mt-1 text-lg font-semibold text-accent">
                  {item.headline}
                </h4>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <h5 className="text-sm font-semibold text-primary/90 uppercase tracking-wide">
                    The Problem
                  </h5>
                  <p className="mt-1 text-sm text-primary/80 leading-relaxed">
                    {item.pain}
                  </p>
                </div>

                <div>
                  <h5 className="text-sm font-semibold text-accent uppercase tracking-wide">
                    {item.solution}
                  </h5>
                  <p className="mt-1 text-sm text-primary/85 leading-relaxed">
                    {item.value}
                  </p>
                </div>

                <div className="rounded-lg bg-accent/10 p-4">
                  <h5 className="text-xs font-semibold text-primary/90 uppercase tracking-wide">
                    How It Works
                  </h5>
                  <p className="mt-1 text-xs text-primary/80 leading-relaxed">
                    {item.feature}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
