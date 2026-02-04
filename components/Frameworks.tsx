'use client'

import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'

export function Frameworks() {
  const { locale } = useLocale()
  const t = getContent(locale).frameworks

  return (
    <section id="frameworks" className="scroll-mt-16 bg-base px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-2xl font-bold text-primary sm:text-3xl">
          {t.title}
        </h2>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl border-2 border-primary/20 bg-base p-6 shadow-sm">
            <div className="border-b border-accent/50 pb-2">
              <h3 className="text-xl font-bold text-primary">{t.nca.name}</h3>
              <p className="text-sm text-accent font-medium">{t.nca.tagline}</p>
            </div>
            <p className="mt-4 text-sm text-primary/85">{t.nca.desc}</p>
            <p className="mt-3 text-xs font-medium text-primary/70">
              {t.nca.for}
            </p>
          </div>
          <div className="rounded-xl border-2 border-primary/20 bg-base p-6 shadow-sm">
            <div className="border-b border-accent/50 pb-2">
              <h3 className="text-xl font-bold text-primary">{t.sama.name}</h3>
              <p className="text-sm text-accent font-medium">{t.sama.tagline}</p>
            </div>
            <p className="mt-4 text-sm text-primary/85">{t.sama.desc}</p>
            <p className="mt-3 text-xs font-medium text-primary/70">
              {t.sama.for}
            </p>
          </div>
        </div>
        <div className="mt-12 overflow-hidden rounded-xl border border-primary/15">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/20 bg-primary/5">
                <th className="px-4 py-3 font-semibold text-primary">
                  {t.comparison.feature}
                </th>
                <th className="px-4 py-3 font-semibold text-primary">
                  NCA ECC-2024
                </th>
                <th className="px-4 py-3 font-semibold text-primary">
                  SAMA CSF
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10">
              <tr>
                <td className="px-4 py-3 font-medium text-primary/90">
                  {t.comparison.authority}
                </td>
                <td className="px-4 py-3 text-primary/80">
                  {t.comparison.ncaAuthority}
                </td>
                <td className="px-4 py-3 text-primary/80">
                  {t.comparison.samaAuthority}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-primary/90">
                  {t.comparison.focus}
                </td>
                <td className="px-4 py-3 text-primary/80">
                  {t.comparison.ncaFocus}
                </td>
                <td className="px-4 py-3 text-primary/80">
                  {t.comparison.samaFocus}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-primary/90">
                  {t.comparison.metric}
                </td>
                <td className="px-4 py-3 text-primary/80">
                  {t.comparison.ncaMetric}
                </td>
                <td className="px-4 py-3 text-primary/80">
                  {t.comparison.samaMetric}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
