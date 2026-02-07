'use client'

import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'

export function ValueProp() {
  const { locale } = useLocale()
  const t = getContent(locale).valueProp

  return (
    <section id="whyUs" className="scroll-mt-16 bg-base px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-section font-bold text-primary">
          {t.title}
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((item, i) => (
            <div
              key={i}
              className="relative rounded-xl border border-primary/15 bg-base p-6 shadow-sm"
            >
              <span
                className="absolute top-4 inline-block h-0.5 w-8 rounded bg-accent"
                aria-hidden
              />
              <h3 className="mt-1 text-lg font-semibold text-primary">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-primary/80">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
