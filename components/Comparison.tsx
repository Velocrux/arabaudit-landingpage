'use client'

import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'

export function Comparison() {
  const { locale } = useLocale()
  const t = getContent(locale).comparison

  return (
    <section className="scroll-mt-16 bg-primary/5 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-section font-bold text-primary">
          {t.title}
        </h2>
        <p className="mt-2 text-center text-primary/80">{t.tagline}</p>
        <p className="mt-4 text-center text-sm text-primary/70 max-w-2xl mx-auto">
          {t.explanation}
        </p>

        <div className="mt-10 space-y-6">
          {t.rows.map((row, i) => (
            <div key={i} className="rounded-xl border-2 border-primary/20 bg-base shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-primary/20 bg-primary/10">
                      <th className="px-4 py-3 font-semibold text-primary w-1/4">
                        {row.feature}
                      </th>
                      <th className="px-4 py-3 font-semibold text-primary/80">
                        {t.headers.global}
                      </th>
                      <th className="px-4 py-3 font-semibold text-primary/80">
                        {t.headers.regional}
                      </th>
                      <th className="border-s border-accent/40 bg-accent/20 px-4 py-3 font-semibold text-primary">
                        {t.headers.us}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-3 font-medium text-primary bg-primary/5">
                        {row.feature}
                      </td>
                      <td className="px-4 py-3 text-primary/75">{row.global}</td>
                      <td className="px-4 py-3 text-primary/75">{row.regional}</td>
                      <td className="border-s border-accent/30 bg-accent/10 px-4 py-3 font-medium text-primary">
                        {row.us}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="border-t border-primary/10 bg-accent/5 px-4 py-3">
                <p className="text-xs text-primary/80">
                  <span className="font-semibold text-accent">Why this matters: </span>
                  {row.whyItMatters}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
