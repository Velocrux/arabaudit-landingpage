'use client'

import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'

export function Comparison() {
  const { locale } = useLocale()
  const t = getContent(locale).comparison

  return (
    <section className="scroll-mt-16 bg-primary/5 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-2xl font-bold text-primary sm:text-3xl">
          {t.title}
        </h2>
        <p className="mt-2 text-center text-primary/80">{t.tagline}</p>
        <div className="mt-10 overflow-hidden rounded-xl border-2 border-primary/20 shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] text-left text-sm">
              <thead>
                <tr className="border-b border-primary/20 bg-primary text-base">
                  <th className="px-4 py-3 font-semibold">{t.headers.feature}</th>
                  <th className="px-4 py-3 font-semibold">{t.headers.global}</th>
                  <th className="px-4 py-3 font-semibold">{t.headers.regional}</th>
                  <th className="border-s border-accent/40 bg-accent/20 px-4 py-3 font-semibold text-primary">
                    {t.headers.us}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/10 bg-base">
                {t.rows.map((row, i) => (
                  <tr key={i}>
                    <td className="px-4 py-3 font-medium text-primary">
                      {row.feature}
                    </td>
                    <td className="px-4 py-3 text-primary/75">{row.global}</td>
                    <td className="px-4 py-3 text-primary/75">{row.regional}</td>
                    <td className="border-s border-accent/30 bg-primary/5 px-4 py-3 font-medium text-primary">
                      {row.us}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
