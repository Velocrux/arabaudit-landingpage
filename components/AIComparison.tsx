'use client'
import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'

export function AIComparison() {
  const { locale } = useLocale()
  const t = getContent(locale).aiDifferentiation

  return (
    <section className="px-4 py-16 scroll-mt-16 bg-primary/5 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="text-section font-bold text-primary">
            {t.title}
          </h2>
          <p className="mt-2 text-body text-primary/85">
            {t.subtitle}
          </p>
        </div>

        <div className="overflow-hidden mt-10 rounded-xl border-2 shadow-md border-accent/40">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-base border-b border-primary/20 bg-primary">
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Competitor AI</th>
                <th className="px-4 py-3 font-semibold border-s border-accent/40 bg-accent/20 text-primary">
                  ArabAudit Deep AI
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10 bg-base">
              {t.comparison.map((row, i) => (
                <tr key={i}>
                  <td className="px-4 py-3 font-medium text-primary">
                    {row.category}
                  </td>
                  <td className="px-4 py-3 text-xs text-primary/75">
                    {row.competitor}
                  </td>
                  <td className="px-4 py-3 text-xs font-medium border-s border-accent/30 bg-accent/5 text-primary">
                    {row.arabaudit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Real Example */}
        <div className="p-6 mt-12 rounded-xl border-2 shadow-sm border-accent/40 bg-base sm:p-8">
          <h3 className="text-lg font-bold text-primary">
            {t.realExample.title}
          </h3>

          <div className="grid gap-6 mt-6 lg:grid-cols-2">
            <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
              <h4 className="text-sm font-semibold tracking-wide uppercase text-primary/90">
                Competitor: Shallow AI
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-primary/75">
                {t.realExample.competitor}
              </p>
            </div>

            <div className="p-4 rounded-lg border-2 border-accent/40 bg-accent/5">
              <h4 className="text-sm font-semibold tracking-wide uppercase text-accent">
                ArabAudit: Deep AI
              </h4>
              <p className="mt-2 text-xs font-medium leading-relaxed text-primary/85">
                {t.realExample.arabaudit}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
