'use client'

import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'

export function HowItWorks() {
  const { locale } = useLocale()
  const t = getContent(locale).howItWorks

  return (
    <section id="product" className="scroll-mt-16 bg-primary/5 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-2xl font-bold text-primary sm:text-3xl">
          {t.title}
        </h2>
        <p className="mt-2 text-center text-primary/80">{t.subtitle}</p>
        <div className="mt-12 space-y-10">
          {t.phases.map((phase, i) => (
            <div
              key={i}
              className="relative rounded-xl border-2 border-primary/20 bg-base p-6 shadow-sm"
            >
              <span
                className="absolute -top-2 -start-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-primary"
                aria-hidden
              >
                {i + 1}
              </span>
              <h3 className="text-lg font-bold text-primary">{phase.title}</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="font-semibold text-primary/90">Rule</dt>
                  <dd className="mt-0.5 text-primary/75">{phase.rule}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-primary/90">Excel chaos</dt>
                  <dd className="mt-0.5 text-primary/75">{phase.chaos}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-accent">ArabAudit</dt>
                  <dd className="mt-0.5 text-primary/85">{phase.solution}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
