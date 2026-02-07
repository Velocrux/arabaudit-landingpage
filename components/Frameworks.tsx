'use client'

import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'
import { FadeInUp } from './animations/FadeInUp'
import { FloatingCard } from './animations/FloatingCard'

export function Frameworks() {
  const { locale } = useLocale()
  const t = getContent(locale).frameworks

  return (
    <section id="frameworks" className="px-4 py-16 scroll-mt-16 bg-primary text-white sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <FadeInUp>
          <h2 className="text-center text-section font-bold tracking-royal">
            {t.title}
          </h2>
        </FadeInUp>
        
        {'subtitle' in t && (
          <FadeInUp delay={0.1}>
            <p className="mt-3 text-center text-white/90 max-w-3xl mx-auto">
              {(t as { subtitle?: string }).subtitle}
            </p>
          </FadeInUp>
        )}
        
        <div className="grid gap-8 mt-12 lg:grid-cols-3">
          <FloatingCard delay={0.2}>
            <div className="p-8 rounded-2xl border-2 shadow-gold border-accent bg-white/10 backdrop-blur-sm h-full">
              <div className="pb-3 border-b-2 border-accent/50">
                <h3 className="text-xl font-bold text-white tracking-royal">{t.nca.name}</h3>
                <p className="text-sm font-bold text-accent mt-1">{t.nca.tagline}</p>
              </div>
              <p className="mt-4 text-sm text-white/90 leading-relaxed">{t.nca.desc}</p>
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/20 border border-secondary">
                <span className="text-xs font-medium text-secondary">{t.nca.for}</span>
              </div>
            </div>
          </FloatingCard>
          
          <FloatingCard delay={0.3}>
            <div className="p-8 rounded-2xl border-2 shadow-gold border-accent bg-white/10 backdrop-blur-sm h-full">
              <div className="pb-3 border-b-2 border-accent/50">
                <h3 className="text-xl font-bold text-white tracking-royal">{t.sama.name}</h3>
                <p className="text-sm font-bold text-accent mt-1">{t.sama.tagline}</p>
              </div>
              <p className="mt-4 text-sm text-white/90 leading-relaxed">{t.sama.desc}</p>
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/20 border border-secondary">
                <span className="text-xs font-medium text-secondary">{t.sama.for}</span>
              </div>
            </div>
          </FloatingCard>
          
          {'sdaia' in t && (
            <FloatingCard delay={0.4}>
              <div className="p-8 rounded-2xl border-2 shadow-gold border-accent bg-white/10 backdrop-blur-sm h-full">
                <div className="pb-3 border-b-2 border-accent/50">
                  <h3 className="text-xl font-bold text-white tracking-royal">{(t as { sdaia: { name: string; tagline: string; desc: string; for: string } }).sdaia.name}</h3>
                  <p className="text-sm font-bold text-accent mt-1">{(t as { sdaia: { name: string; tagline: string; desc: string; for: string } }).sdaia.tagline}</p>
                </div>
                <p className="mt-4 text-sm text-white/90 leading-relaxed">{(t as { sdaia: { name: string; tagline: string; desc: string; for: string } }).sdaia.desc}</p>
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/20 border border-secondary">
                  <span className="text-xs font-medium text-secondary">{(t as { sdaia: { name: string; tagline: string; desc: string; for: string } }).sdaia.for}</span>
                </div>
              </div>
            </FloatingCard>
          )}
        </div>
        
        <FadeInUp delay={0.5}>
          <div className="overflow-hidden overflow-x-auto mt-12 rounded-2xl border-2 border-accent/50 shadow-premium">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead>
                <tr className="border-b-2 border-accent/30 bg-white/5 backdrop-blur-sm">
                  <th className="px-6 py-4 font-bold text-accent tracking-royal">{t.comparison.feature}</th>
                  <th className="px-6 py-4 font-bold text-accent tracking-royal">NCA ECC-2024</th>
                  <th className="px-6 py-4 font-bold text-accent tracking-royal">SAMA CSF</th>
                  {'sdaiaAuthority' in t.comparison && (
                    <th className="px-6 py-4 font-bold text-accent tracking-royal">SDAIA / PDPL</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr className="hover:bg-white/5 transition-colors duration-200">
                  <td className="px-6 py-4 font-semibold text-white">{t.comparison.authority}</td>
                  <td className="px-6 py-4 text-white/85">{t.comparison.ncaAuthority}</td>
                  <td className="px-6 py-4 text-white/85">{t.comparison.samaAuthority}</td>
                  {'sdaiaAuthority' in t.comparison && (
                    <td className="px-6 py-4 text-white/85">{(t.comparison as { sdaiaAuthority: string }).sdaiaAuthority}</td>
                  )}
                </tr>
                <tr className="hover:bg-white/5 transition-colors duration-200">
                  <td className="px-6 py-4 font-semibold text-white">{t.comparison.focus}</td>
                  <td className="px-6 py-4 text-white/85">{t.comparison.ncaFocus}</td>
                  <td className="px-6 py-4 text-white/85">{t.comparison.samaFocus}</td>
                  {'sdaiaFocus' in t.comparison && (
                    <td className="px-6 py-4 text-white/85">{(t.comparison as { sdaiaFocus: string }).sdaiaFocus}</td>
                  )}
                </tr>
                <tr className="hover:bg-white/5 transition-colors duration-200">
                  <td className="px-6 py-4 font-semibold text-white">{t.comparison.metric}</td>
                  <td className="px-6 py-4 text-white/85">{t.comparison.ncaMetric}</td>
                  <td className="px-6 py-4 text-white/85">{t.comparison.samaMetric}</td>
                  {'sdaiaMetric' in t.comparison && (
                    <td className="px-6 py-4 text-white/85">{(t.comparison as { sdaiaMetric: string }).sdaiaMetric}</td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
