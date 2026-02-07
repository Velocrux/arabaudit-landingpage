'use client'

import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'

export function AuditProcess() {
  const { locale } = useLocale()
  const t = getContent(locale).auditProcess

  return (
    <section className="scroll-mt-16 bg-base px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-section font-bold text-primary">
            {t.title}
          </h2>
          <p className="mt-2 text-body text-primary/85">
            {t.subtitle}
          </p>
        </div>

        {/* Dual Compliance Challenge */}
        <div className="mt-10 rounded-xl border-2 border-accent/40 bg-accent/5 p-6 sm:p-8">
          <h3 className="text-xl font-bold text-primary">
            {t.dualCompliance.headline}
          </h3>
          <p className="mt-2 text-primary/80">
            {t.dualCompliance.description}
          </p>
          <div className="mt-4 rounded-lg bg-base border border-primary/20 p-4">
            <p className="text-sm font-mono text-primary/75">
              {t.dualCompliance.example}
            </p>
          </div>
        </div>

        {/* Two Workflow Columns */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {t.workflows.map((workflow, i) => (
            <div
              key={i}
              className="rounded-xl border-2 border-primary/20 bg-base p-6 shadow-sm"
            >
              <div className="border-b border-accent/50 pb-3">
                <h3 className="text-lg font-bold text-primary">
                  {workflow.framework}
                </h3>
                <p className="mt-1 text-sm text-accent font-medium">
                  {workflow.authority}
                </p>
                <p className="mt-1 text-xs text-primary/70">
                  {workflow.target}
                </p>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-semibold text-primary/90 uppercase tracking-wide">
                  Workflow Steps
                </h4>
                <ol className="mt-3 space-y-2">
                  {workflow.steps.map((step, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-primary/80">
                      <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-4 rounded-lg bg-primary/5 p-3">
                <p className="text-xs font-semibold text-primary/75">
                  <span className="text-accent">Pain point: </span>
                  {workflow.pain}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Framework Harmonization */}
        <div className="mt-12 rounded-2xl border-2 border-accent/50 bg-gradient-to-br from-accent/10 to-primary/5 p-8 shadow-lg">
          <div className="text-center">
            <div className="mx-auto mb-3 h-1 w-20 rounded-full bg-accent" />
            <h3 className="text-2xl font-bold text-primary">
              {t.harmonization.title}
            </h3>
            <p className="mt-2 text-primary/85">
              {t.harmonization.description}
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.harmonization.steps.map((step, i) => (
              <div
                key={i}
                className="rounded-lg border border-accent/30 bg-base p-4 text-center"
              >
                <span className="text-2xl font-bold text-accent">
                  {i + 1}
                </span>
                <p className="mt-2 text-xs text-primary/80 leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2 text-lg font-bold text-primary shadow-md">
              <span aria-hidden>⚡</span>
              {t.harmonization.savings}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
