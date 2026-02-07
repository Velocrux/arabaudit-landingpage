'use client'

import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'
import { FadeInUp } from './animations/FadeInUp'
import { StaggerChildren, StaggerItem } from './animations/StaggerChildren'

export function Comparison() {
  const { locale } = useLocale()
  const t = getContent(locale).comparison

  return (
    <section className="scroll-mt-16 bg-gradient-to-b from-primary/5 to-base px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <FadeInUp>
          <h2 className="text-center text-section font-bold text-primary tracking-royal">
            {t.title}
          </h2>
        </FadeInUp>
        
        <FadeInUp delay={0.1}>
          <p className="mt-3 text-center text-text/85">{t.tagline}</p>
        </FadeInUp>
        
        <FadeInUp delay={0.2}>
          <p className="mt-4 text-center text-sm text-text/70 max-w-2xl mx-auto leading-relaxed">
            {t.explanation}
          </p>
        </FadeInUp>

        <StaggerChildren className="mt-12 space-y-6">
          {t.rows.map((row, i) => (
            <StaggerItem key={i}>
              <div className="rounded-2xl border-2 border-primary/20 bg-white shadow-royal hover:shadow-premium hover:border-accent/50 transition-all duration-300">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[500px] text-left text-sm">
                    <thead>
                      <tr className="border-b-2 border-primary/20 bg-gradient-to-r from-primary/10 to-primary/5">
                        <th className="px-6 py-4 font-bold text-primary w-1/4 tracking-royal">
                          {row.feature}
                        </th>
                        <th className="px-6 py-4 font-semibold text-text/80">
                          {t.headers.global}
                        </th>
                        <th className="px-6 py-4 font-semibold text-text/80">
                          {t.headers.regional}
                        </th>
                        <th className="border-s-2 border-accent/40 bg-accent/10 px-6 py-4 font-bold text-primary tracking-royal">
                          {t.headers.us}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-6 py-4 font-semibold text-primary bg-primary/5">
                          {row.feature}
                        </td>
                        <td className="px-6 py-4 text-text/75">{row.global}</td>
                        <td className="px-6 py-4 text-text/75">{row.regional}</td>
                        <td className="border-s-2 border-accent/30 bg-accent/5 px-6 py-4 font-medium text-primary">
                          {row.us}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="border-t-2 border-secondary/20 bg-secondary/5 px-6 py-4">
                  <p className="text-sm text-text/85 leading-relaxed">
                    <span className="font-bold text-secondary">Why this matters: </span>
                    {row.whyItMatters}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}
