'use client'

import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'
import { FadeInUp } from './animations/FadeInUp'
import { StaggerChildren, StaggerItem } from './animations/StaggerChildren'

export function Features() {
  const { locale } = useLocale()
  const t = getContent(locale).features

  return (
    <section className="relative scroll-mt-16 overflow-hidden px-6 py-20 sm:px-8 sm:py-28">
      {/* Royal gradient: same palette, soft and luxurious */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'linear-gradient(165deg, #f2f5f4 0%, #e8efe9 35%, #dce8e2 70%, #d0e2da 100%)',
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(11, 70, 52, 0.06) 0%, transparent 55%)',
            'radial-gradient(ellipse 60% 40% at 80% 100%, rgba(216, 176, 74, 0.05) 0%, transparent 50%)',
          ].join(', '),
        }}
      />
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <pattern
            id="features-pattern"
            x="0"
            y="0"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M60 8 L112 60 L60 112 L8 60 Z"
              fill="none"
              stroke="rgb(11 70 52)"
              strokeWidth="0.35"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#features-pattern)" />
      </svg>

      <div className="relative z-10 mx-auto max-w-6xl">
        <FadeInUp>
          <div className="text-center">
            <div className="mx-auto h-1 w-16 rounded-full bg-accent" />
            <h2 className="mt-4 text-section font-bold tracking-royal text-primary">
              {t.title}
            </h2>
          </div>
        </FadeInUp>

        <StaggerChildren className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((item, i) => {
            const isHighlighted = 'highlighted' in item && item.highlighted
            return (
              <StaggerItem key={i}>
                <div className={`flex h-full min-h-[200px] flex-col rounded-2xl p-8 shadow-lg backdrop-blur-sm transition-all duration-300 ${
                  isHighlighted 
                    ? 'border-2 border-accent/50 bg-gradient-to-br from-accent/10 via-white/95 to-accent/5 ring-2 ring-accent/20 hover:border-accent hover:shadow-gold' 
                    : 'border border-primary/10 bg-white/95 hover:border-accent/30 hover:shadow-xl'
                }`}>
                  {isHighlighted && (
                    <div className="mb-3 flex items-center gap-2">
                      <svg className="h-5 w-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                      <span className="text-xs font-bold uppercase tracking-wider text-accent">Featured</span>
                    </div>
                  )}
                  <span
                    className={`mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold ring-2 ${
                      isHighlighted 
                        ? 'bg-accent/20 text-accent ring-accent/50' 
                        : 'bg-accent/15 text-accent ring-accent/30'
                    }`}
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <h3 className={`font-bold text-lg tracking-royal ${
                    isHighlighted ? 'text-primary' : 'text-primary'
                  }`}>
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[15px] text-primary/80 leading-relaxed">
                    {item.desc}
                  </p>
                  {isHighlighted && (
                    <div className="mt-4 pt-4 border-t border-accent/20">
                      <div className="flex items-center gap-2 text-xs font-semibold text-accent">
                        <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                        <span className="uppercase tracking-wider">Vision 2030 Aligned</span>
                      </div>
                    </div>
                  )}
                </div>
              </StaggerItem>
            )
          })}
        </StaggerChildren>
      </div>
    </section>
  )
}
