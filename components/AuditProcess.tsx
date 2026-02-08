'use client'

import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'

export function AuditProcess() {
  const { locale } = useLocale()
  const t = getContent(locale).auditProcess
  const workflowStepsLabel = 'workflowStepsLabel' in t ? (t as { workflowStepsLabel: string }).workflowStepsLabel : 'Workflow steps'
  const painLabel = 'painLabel' in t ? (t as { painLabel: string }).painLabel : 'Pain point'

  return (
    <section className="relative scroll-mt-16 overflow-hidden px-6 py-20 sm:px-8 sm:py-28 md:py-32">
      {/* Royal light background: soft gradient + very subtle pattern */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'linear-gradient(180deg, #fafaf9 0%, #f5f6f5 50%, #eef2f0 100%)',
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(11, 70, 52, 0.03) 0%, transparent 60%)',
          ].join(', '),
        }}
      />
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.035]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <pattern
            id="audit-process-pattern"
            x="0"
            y="0"
            width="200"
            height="200"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M100 15 L185 100 L100 185 L15 100 Z"
              fill="none"
              stroke="rgb(11 70 52)"
              strokeWidth="0.4"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#audit-process-pattern)" />
      </svg>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-1 w-16 rounded-full bg-accent" />
          <h2 className="mt-4 text-section font-bold tracking-royal text-primary">
            {t.title}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary/80 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Dual compliance challenge */}
        <div className="mt-16 rounded-2xl border border-accent/25 bg-white/80 p-8 shadow-lg sm:p-10 md:p-12 backdrop-blur-sm">
          <div className={locale === 'ar' ? 'border-r-4 border-accent pr-6' : 'border-l-4 border-accent pl-6'}>
            <h3 className="text-xl font-bold text-primary sm:text-2xl">
              {t.dualCompliance.headline}
            </h3>
            <p className="mt-4 text-base text-primary/80 leading-relaxed max-w-3xl">
              {t.dualCompliance.description}
            </p>
            <div className="mt-6 rounded-xl border border-primary/10 bg-primary/[0.02] px-5 py-4">
              <p className="text-sm text-primary/75 leading-relaxed font-medium">
                {t.dualCompliance.example}
              </p>
            </div>
          </div>
        </div>

        {/* Two workflow columns */}
        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-14">
          {t.workflows.map((workflow, i) => (
            <div
              key={i}
              className="flex min-h-[380px] flex-col rounded-2xl border border-primary/10 bg-white p-8 shadow-lg sm:p-10"
            >
              <div className="shrink-0 border-b border-primary/10 pb-6">
                <h3 className="text-xl font-bold text-primary">
                  {workflow.framework}
                </h3>
                <p className="mt-2 text-sm font-semibold text-accent">
                  {workflow.authority}
                </p>
                <p className="mt-1 text-sm text-primary/70">
                  {workflow.target}
                </p>
              </div>

              <div className="mt-6 min-h-0 flex-1">
                <h4 className="text-xs font-semibold text-primary/80 uppercase tracking-widest">
                  {workflowStepsLabel}
                </h4>
                <ol className="mt-4 space-y-4">
                  {workflow.steps.map((step, j) => (
                    <li key={j} className="flex gap-4 text-[15px] text-primary/85 leading-[1.6]">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent font-semibold text-sm">
                        {j + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-auto shrink-0 rounded-xl bg-primary/[0.04] border border-primary/10 px-5 py-4">
                <p className="text-xs font-semibold text-accent/90 uppercase tracking-widest mb-1.5">
                  {painLabel}
                </p>
                <p className="text-sm text-primary/80 leading-snug">
                  {workflow.pain}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Framework harmonization */}
        <div
          className="mt-16 rounded-2xl border border-accent/20 p-8 shadow-xl sm:p-10 md:p-12"
          style={{
            background: 'linear-gradient(145deg, rgba(216, 176, 74, 0.06) 0%, rgba(255,255,255,0.95) 40%, rgba(11, 70, 52, 0.04) 100%)',
          }}
        >
          <div className="text-center">
            <div className="mx-auto h-1 w-20 rounded-full bg-accent" />
            <h3 className="mt-4 text-2xl font-bold text-primary sm:text-3xl">
              {t.harmonization.title}
            </h3>
            <p className="mt-4 max-w-2xl mx-auto text-base text-primary/85 leading-relaxed">
              {t.harmonization.description}
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.harmonization.steps.map((step, i) => (
              <div
                key={i}
                className="rounded-xl border border-accent/20 bg-white/90 p-6 text-center shadow-sm"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-accent text-xl font-bold">
                  {i + 1}
                </span>
                <p className="mt-4 text-sm text-primary/85 leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/15 px-8 py-3 text-base font-bold text-primary shadow-md">
              <span aria-hidden className="text-accent">⚡</span>
              {t.harmonization.savings}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
