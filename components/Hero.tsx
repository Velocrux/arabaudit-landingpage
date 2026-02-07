'use client'

import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'

export function Hero() {
  const { locale } = useLocale()
  const t = getContent(locale).hero as Record<string, unknown>
  const headline = (t.defaultHeadline as string | undefined) ?? (t.headline as string)
  const subhead = (t.defaultSubhead as string | undefined) ?? (t.subhead as string)
  const personas = Array.isArray(t.personas) ? t.personas : []
  const firstPersona = personas[0] as { painPoint: string; solution: string } | undefined

  return (
    <section className="relative overflow-hidden bg-base px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      <div className="relative mx-auto max-w-4xl text-center">
        <h1 className="text-hero font-bold tracking-tight text-primary">
          {headline}
        </h1>
        <p className="mt-4 text-body text-primary/90 lg:mt-6">
          {subhead}
        </p>

        {/* Problem/Solution Preview - only when personas content exists */}
        {firstPersona && (
          <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-6 text-left">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold text-primary/90 uppercase tracking-wide">
                  The Problem
                </h3>
                <p className="mt-2 text-sm text-primary/80">
                  {firstPersona.painPoint}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-accent uppercase tracking-wide">
                  The Solution
                </h3>
                <p className="mt-2 text-sm text-primary/85">
                  {firstPersona.solution}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-cta font-semibold text-white shadow-sm ring-2 ring-accent/40 ring-offset-2 transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {String(t.cta ?? '')}
          </a>
          <a
            href="#leadMagnet"
            className="inline-flex items-center justify-center rounded-lg border-2 border-accent px-6 py-3 text-cta font-semibold text-accent transition hover:bg-accent/5 focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {String(t.ctaSecondary ?? '')}
          </a>
        </div>
      </div>
    </section>
  )
}
