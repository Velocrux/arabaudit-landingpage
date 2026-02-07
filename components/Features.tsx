'use client'

import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'

export function Features() {
  const { locale } = useLocale()
  const t = getContent(locale).features

  return (
    <section className="scroll-mt-16 bg-base px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-section font-bold text-primary">
          {t.title}
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((item, i) => (
            <div
              key={i}
              className="flex gap-4 rounded-xl border border-primary/15 bg-base p-6 shadow-sm"
            >
              <span
                className="mt-0.5 h-6 w-6 shrink-0 rounded-full border-2 border-accent bg-accent/10"
                aria-hidden
              />
              <div>
                <h3 className="font-semibold text-primary">{item.title}</h3>
                <p className="mt-1 text-sm text-primary/80">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
