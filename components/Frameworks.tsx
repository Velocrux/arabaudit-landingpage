'use client'

import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'

export function Frameworks() {
  const { locale } = useLocale()
  const t = getContent(locale).frameworks

  return (
    <section id="frameworks" className="px-4 py-16 scroll-mt-16 bg-base sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-section font-bold text-primary">
          {t.title}
        </h2>
        {'subtitle' in t && (
          <p className="mt-2 text-center text-primary/80">
            {(t as { subtitle?: string }).subtitle}
          </p>
        )}
        <div className="grid gap-8 mt-12 lg:grid-cols-3">
          <div className="p-6 rounded-xl border-2 shadow-sm border-primary/20 bg-base">
            <div className="pb-2 border-b border-accent/50">
              <h3 className="text-xl font-bold text-primary">{t.nca.name}</h3>
              <p className="text-sm font-medium text-accent">{t.nca.tagline}</p>
            </div>
            <p className="mt-4 text-sm text-primary/85">{t.nca.desc}</p>
            <p className="mt-3 text-xs font-medium text-primary/70">{t.nca.for}</p>
          </div>
          <div className="p-6 rounded-xl border-2 shadow-sm border-primary/20 bg-base">
            <div className="pb-2 border-b border-accent/50">
              <h3 className="text-xl font-bold text-primary">{t.sama.name}</h3>
              <p className="text-sm font-medium text-accent">{t.sama.tagline}</p>
            </div>
            <p className="mt-4 text-sm text-primary/85">{t.sama.desc}</p>
            <p className="mt-3 text-xs font-medium text-primary/70">{t.sama.for}</p>
          </div>
          {'sdaia' in t && (
            <div className="p-6 rounded-xl border-2 shadow-sm border-primary/20 bg-base">
              <div className="pb-2 border-b border-accent/50">
                <h3 className="text-xl font-bold text-primary">{(t as { sdaia: { name: string; tagline: string; desc: string; for: string } }).sdaia.name}</h3>
                <p className="text-sm font-medium text-accent">{(t as { sdaia: { name: string; tagline: string; desc: string; for: string } }).sdaia.tagline}</p>
              </div>
              <p className="mt-4 text-sm text-primary/85">{(t as { sdaia: { name: string; tagline: string; desc: string; for: string } }).sdaia.desc}</p>
              <p className="mt-3 text-xs font-medium text-primary/70">{(t as { sdaia: { name: string; tagline: string; desc: string; for: string } }).sdaia.for}</p>
            </div>
          )}
        </div>
        <div className="overflow-hidden overflow-x-auto mt-12 rounded-xl border border-primary/15">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead>
              <tr className="border-b border-primary/20 bg-primary/5">
                <th className="px-4 py-3 font-semibold text-primary">{t.comparison.feature}</th>
                <th className="px-4 py-3 font-semibold text-primary">NCA ECC-2024</th>
                <th className="px-4 py-3 font-semibold text-primary">SAMA CSF</th>
                {'sdaiaAuthority' in t.comparison && (
                  <th className="px-4 py-3 font-semibold text-primary">SDAIA / PDPL</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10">
              <tr>
                <td className="px-4 py-3 font-medium text-primary/90">{t.comparison.authority}</td>
                <td className="px-4 py-3 text-primary/80">{t.comparison.ncaAuthority}</td>
                <td className="px-4 py-3 text-primary/80">{t.comparison.samaAuthority}</td>
                {'sdaiaAuthority' in t.comparison && (
                  <td className="px-4 py-3 text-primary/80">{(t.comparison as { sdaiaAuthority: string }).sdaiaAuthority}</td>
                )}
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-primary/90">{t.comparison.focus}</td>
                <td className="px-4 py-3 text-primary/80">{t.comparison.ncaFocus}</td>
                <td className="px-4 py-3 text-primary/80">{t.comparison.samaFocus}</td>
                {'sdaiaFocus' in t.comparison && (
                  <td className="px-4 py-3 text-primary/80">{(t.comparison as { sdaiaFocus: string }).sdaiaFocus}</td>
                )}
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-primary/90">{t.comparison.metric}</td>
                <td className="px-4 py-3 text-primary/80">{t.comparison.ncaMetric}</td>
                <td className="px-4 py-3 text-primary/80">{t.comparison.samaMetric}</td>
                {'sdaiaMetric' in t.comparison && (
                  <td className="px-4 py-3 text-primary/80">{(t.comparison as { sdaiaMetric: string }).sdaiaMetric}</td>
                )}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
