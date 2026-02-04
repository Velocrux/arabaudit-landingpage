'use client'

import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'

export function CTA() {
  const { locale } = useLocale()
  const t = getContent(locale).cta

  return (
    <section
      id="contact"
      className="scroll-mt-16 border-t border-accent/30 bg-base px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-4 h-0.5 w-24 rounded-full bg-accent" />
        <h2 className="text-2xl font-bold text-primary sm:text-3xl">
          {t.title}
        </h2>
        <p className="mt-3 text-primary/85">{t.subtitle}</p>
        <a
          href="mailto:contact@arabaudit.com?subject=Demo%20Request"
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-base shadow-md ring-2 ring-accent/40 ring-offset-2 transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-accent"
        >
          {t.button}
        </a>
      </div>
    </section>
  )
}
