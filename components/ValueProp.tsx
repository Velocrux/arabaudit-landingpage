'use client'

import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'
import { FadeInUp } from './animations/FadeInUp'
import { FloatingCard } from './animations/FloatingCard'

export function ValueProp() {
  const { locale } = useLocale()
  const t = getContent(locale).valueProp

  return (
    <section id="whyUs" className="scroll-mt-16 bg-gradient-to-b from-base to-primary/5 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <FadeInUp>
          <h2 className="text-center text-section font-bold text-primary tracking-royal">
            {t.title}
          </h2>
        </FadeInUp>
        
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((item, i) => (
            <FloatingCard key={i} delay={i * 0.1}>
              <div className="relative rounded-2xl border-2 border-primary/20 bg-white p-6 shadow-royal hover:shadow-premium hover:border-accent transition-all duration-300 h-full">
                <span
                  className="absolute -top-0 left-6 inline-block h-1 w-12 rounded-b-full bg-gradient-to-r from-accent to-secondary"
                  aria-hidden
                />
                <h3 className="mt-3 text-lg font-bold text-primary tracking-royal">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-text/80 leading-relaxed">{item.desc}</p>
                
                {/* Decorative corner accent */}
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-accent/20 rounded-br-lg"></div>
              </div>
            </FloatingCard>
          ))}
        </div>
      </div>
    </section>
  )
}
