'use client'

import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'

export function Personas() {
  const { locale } = useLocale()
  const t = getContent(locale).personas

  return (
    <section className="scroll-mt-16 bg-primary/5 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-2xl font-bold text-primary sm:text-3xl">
          {t.title}
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {t.items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border-2 border-primary/15 bg-base p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-primary">{item.role}</h3>
              <p className="mt-2 text-sm text-primary/75">
                <span className="font-medium text-primary/90">Pain: </span>
                {item.pain}
              </p>
              <p className="mt-2 text-sm text-primary/85">
                <span className="font-medium text-accent">Value: </span>
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
