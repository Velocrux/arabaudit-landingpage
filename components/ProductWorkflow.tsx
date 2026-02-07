'use client'

import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'

export function ProductWorkflow() {
  const { locale } = useLocale()
  const t = getContent(locale).productWorkflow

  return (
    <section id="productWorkflow" className="scroll-mt-16 bg-base px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-section font-bold text-primary">
            {t.title}
          </h2>
          <p className="mt-3 text-body text-primary/85">
            {t.subtitle}
          </p>
        </div>

        <div className="mt-16 space-y-12">
          {t.phases.map((phase, i) => (
            <div
              key={i}
              className="relative"
            >
              {/* Connector line (not for last item) */}
              {i < t.phases.length - 1 && (
                <div
                  className="absolute left-8 top-20 h-full w-0.5 bg-accent/30 -z-10"
                  aria-hidden
                />
              )}

              <div className="flex gap-6">
                {/* Phase number badge */}
                <div className="shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-accent bg-primary shadow-lg">
                    <span className="text-2xl font-bold text-accent">
                      {phase.number}
                    </span>
                  </div>
                </div>

                {/* Phase content */}
                <div className="flex-1 rounded-xl border-2 border-primary/20 bg-base p-6 shadow-sm sm:p-8">
                  <div className="border-b border-accent/40 pb-4">
                    <h3 className="text-xl font-bold text-primary sm:text-2xl">
                      {phase.title}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-accent">
                      {phase.tagline}
                    </p>
                  </div>

                  <dl className="mt-6 space-y-4">
                    <div>
                      <dt className="text-sm font-semibold text-primary/90 uppercase tracking-wide">
                        Problem
                      </dt>
                      <dd className="mt-1 text-sm text-primary/75 leading-relaxed">
                        {phase.problem}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-sm font-semibold text-accent uppercase tracking-wide">
                        ArabAudit Solution
                      </dt>
                      <dd className="mt-1 text-sm text-primary/85 leading-relaxed">
                        {phase.solution}
                      </dd>
                    </div>

                    <div className="rounded-lg bg-accent/10 p-4">
                      <dt className="text-xs font-semibold text-primary/90 uppercase tracking-wide">
                        Outcome
                      </dt>
                      <dd className="mt-1 text-sm text-primary/85 font-medium">
                        {phase.outcome}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
