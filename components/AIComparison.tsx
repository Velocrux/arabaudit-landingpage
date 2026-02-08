'use client'

import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'
import { FadeInUp } from './animations/FadeInUp'

export function AIComparison() {
  const { locale } = useLocale()
  const t = getContent(locale).aiDifferentiation as {
    title: string
    subtitle: string
    headers?: { category: string; competitor: string; arabaudit: string }
    comparison: Array<{ category: string; competitor: string; arabaudit: string }>
    realExample: { title: string; competitor: string; arabaudit: string }
  }

  const headers = t.headers ?? {
    category: 'Feature',
    competitor: 'Other audit platforms (surface-level)',
    arabaudit: 'ArabAudit AI (Deep Technical)',
  }

  return (
    <section className="px-4 py-16 scroll-mt-16 bg-gradient-to-b from-primary/5 via-primary/10 to-base sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <FadeInUp>
            <div className="mx-auto mb-3 h-1 w-16 rounded-full bg-accent" />
            <h2 className="text-section font-bold text-primary tracking-royal">
              {t.title}
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.05}>
            <p className="mx-auto mt-3 max-w-2xl text-body text-primary/85">
              {t.subtitle}
            </p>
          </FadeInUp>
        </div>

        <FadeInUp delay={0.1}>
          <div className="mt-12 overflow-hidden rounded-2xl border-2 border-accent/40 bg-base shadow-premium">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full min-w-[520px] text-left">
                <thead>
                  <tr className="border-b-2 border-accent/30 bg-primary text-base">
                    <th className="px-5 py-4 font-semibold text-white tracking-royal">
                      {headers.category}
                    </th>
                    <th className="px-5 py-4 font-semibold text-white/90">
                      {headers.competitor}
                    </th>
                    <th className="border-s-2 border-accent/40 bg-accent/20 px-5 py-4 font-semibold text-accent">
                      {headers.arabaudit}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/10 bg-base">
                  {t.comparison.map((row, i) => (
                    <tr
                      key={i}
                      className="transition-colors hover:bg-primary/[0.03]"
                    >
                      <td className="px-5 py-4 font-medium text-primary">
                        {row.category}
                      </td>
                      <td className="px-5 py-4 text-sm text-primary/75">
                        {row.competitor}
                      </td>
                      <td className="border-s-2 border-accent/30 bg-accent/5 px-5 py-4 text-sm font-medium text-primary">
                        {row.arabaudit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-primary/10">
              {t.comparison.map((row, i) => (
                <div key={i} className="p-5 space-y-4">
                  <h3 className="font-bold text-primary text-base">{row.category}</h3>
                  <div className="space-y-3">
                    <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-primary/60 mb-2">
                        {headers.competitor}
                      </p>
                      <p className="text-sm text-primary/75">{row.competitor}</p>
                    </div>
                    <div className="rounded-lg border-2 border-accent/30 bg-accent/5 p-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-accent mb-2">
                        {headers.arabaudit}
                      </p>
                      <p className="text-sm font-medium text-primary">{row.arabaudit}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.2}>
          <div className="mt-12 rounded-2xl border-2 border-accent/40 bg-base p-6 shadow-premium sm:p-8">
            <div className="h-1 w-16 rounded-full bg-accent mb-4" />
            <h3 className="text-lg font-bold text-primary tracking-royal">
              {t.realExample.title}
            </h3>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-5 transition-colors hover:border-primary/30">
                <h4 className="text-sm font-bold uppercase tracking-wide text-primary/80">
                  {headers.competitor}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-primary/80">
                  {t.realExample.competitor}
                </p>
              </div>

              <div className="rounded-xl border-2 border-accent/40 bg-accent/5 p-5 transition-colors hover:border-accent/50 hover:shadow-[0_0_20px_rgba(216,176,74,0.12)]">
                <h4 className="text-sm font-bold uppercase tracking-wide text-accent">
                  {headers.arabaudit}
                </h4>
                <p className="mt-3 text-sm font-medium leading-relaxed text-primary/90">
                  {t.realExample.arabaudit}
                </p>
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
