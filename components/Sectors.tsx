'use client'

import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'

export function Sectors() {
  const { locale } = useLocale()
  const t = getContent(locale).sectors

  return (
    <section id="sectors" className="scroll-mt-16 bg-base px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-2xl font-bold text-primary sm:text-3xl">
          {t.title}
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {t.items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-primary/15 bg-base p-6 shadow-sm"
            >
              <div className="flex items-center gap-2 border-b border-accent/40 pb-2">
                <span
                  className="h-2 w-2 rounded-full bg-accent"
                  aria-hidden
                />
                <h3 className="text-lg font-bold text-primary">{item.name}</h3>
              </div>
              <p className="mt-2 text-sm font-medium text-primary/80">
                {item.regulator} · {item.framework}
              </p>
              <p className="mt-1 text-sm text-primary/75">{item.why}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
