'use client'

import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'

export function Hero() {
  const { locale } = useLocale()
  const t = getContent(locale).hero

  return (
    <section className="relative overflow-hidden bg-base px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      <div className="relative mx-auto max-w-4xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
          {t.headline}
        </h1>
        <p className="mt-4 text-lg text-primary/90 sm:text-xl lg:mt-6 lg:text-2xl">
          {t.subhead}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-semibold text-base shadow-sm ring-2 ring-accent/40 ring-offset-2 transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {t.cta}
          </a>
          <a
            href="#whyUs"
            className="inline-flex items-center justify-center rounded-lg border-2 border-primary px-6 py-3 text-base font-semibold text-primary transition hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {t.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  )
}
