'use client'

import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'
import { FadeInUp } from './animations/FadeInUp'
import { FloatingCard } from './animations/FloatingCard'

export function Sectors() {
  const { locale } = useLocale()
  const t = getContent(locale).sectors

  return (
    <section id="sectors" className="scroll-mt-16 bg-base px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <FadeInUp>
          <h2 className="text-center text-section font-bold text-primary tracking-royal">
            {t.title}
          </h2>
        </FadeInUp>
        
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {t.items.map((item, i) => (
            <FloatingCard key={i} delay={i * 0.1}>
              <div className="rounded-2xl border-2 border-primary/20 bg-premium-card p-8 shadow-royal hover:shadow-premium hover:border-secondary/50 transition-all duration-300 h-full">
                <div className="flex items-center gap-3 border-b-2 border-accent/50 pb-4">
                  <span
                    className="h-4 w-4 rounded-full bg-gradient-to-br from-accent to-secondary shadow-md"
                    aria-hidden
                  />
                  <h3 className="text-xl font-bold text-primary tracking-royal">{item.name}</h3>
                </div>
                <div className="mt-5 space-y-3">
                  <p className="text-sm font-semibold text-text/85">
                    <span className="text-accent font-bold">Regulator:</span> {item.regulator}
                  </p>
                  <p className="text-sm font-semibold text-text/85">
                    <span className="text-accent font-bold">Framework:</span> {item.framework}
                  </p>
                  <div className="rounded-xl bg-secondary/5 border border-secondary/20 p-4 mt-4">
                    <p className="text-sm text-primary font-medium leading-relaxed">
                      <span className="text-secondary font-bold">Why now:</span> {item.why}
                    </p>
                  </div>
                </div>
              </div>
            </FloatingCard>
          ))}
        </div>
      </div>
    </section>
  )
}
