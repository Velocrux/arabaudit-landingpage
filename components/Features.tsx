'use client'

import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'
import { FadeInUp } from './animations/FadeInUp'
import { StaggerChildren, StaggerItem } from './animations/StaggerChildren'

export function Features() {
  const { locale } = useLocale()
  const t = getContent(locale).features

  return (
    <section className="scroll-mt-16 bg-base px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <FadeInUp>
          <h2 className="text-center text-section font-bold text-primary tracking-royal">
            {t.title}
          </h2>
        </FadeInUp>
        
        <StaggerChildren className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((item, i) => (
            <StaggerItem key={i}>
              <div className="group flex gap-4 rounded-2xl border-2 border-primary/15 bg-premium-card p-6 shadow-royal hover:shadow-premium hover:border-accent/50 transition-all duration-300 hover:-translate-y-1">
                <span
                  className="mt-0.5 h-10 w-10 shrink-0 rounded-full border-2 border-accent bg-accent/20 flex items-center justify-center text-accent font-bold group-hover:bg-accent group-hover:text-primary transition-all duration-300"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold text-primary group-hover:text-secondary transition-colors duration-300">{item.title}</h3>
                  <p className="mt-2 text-sm text-text/80 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}
