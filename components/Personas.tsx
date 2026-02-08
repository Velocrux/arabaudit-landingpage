'use client'

import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'
import { FadeInUp } from './animations/FadeInUp'
import { StaggerChildren, StaggerItem } from './animations/StaggerChildren'
import { useSectionTracking } from '@/lib/hooks/useAnalytics'

export function Personas() {
  const { locale } = useLocale()
  const t = getContent(locale).personas
  const personasRef = useSectionTracking('personas')

  return (
    <section ref={personasRef} className="relative scroll-mt-16 overflow-hidden px-6 py-20 sm:px-8 sm:py-28">
      {/* Royal gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'linear-gradient(165deg, #fafaf9 0%, #f2f5f4 40%, #e8efe9 100%)',
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(11, 70, 52, 0.04) 0%, transparent 60%)',
            'radial-gradient(ellipse 60% 40% at 20% 100%, rgba(216, 176, 74, 0.03) 0%, transparent 50%)',
          ].join(', '),
        }}
      />

      {/* Subtle diamond pattern */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.03]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <pattern
            id="personas-pattern"
            x="0"
            y="0"
            width="140"
            height="140"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M70 10 L130 70 L70 130 L10 70 Z"
              fill="none"
              stroke="rgb(11 70 52)"
              strokeWidth="0.3"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#personas-pattern)" />
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

        <StaggerChildren className="mt-14 grid gap-6 lg:grid-cols-2">
          {t.items.map((item, i) => (
            <StaggerItem key={i}>
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-accent/20 bg-white shadow-xl transition-all duration-500 ease-out cursor-pointer hover:shadow-2xl hover:shadow-accent/10 hover:border-accent/40 hover:scale-[1.02] hover:-translate-y-1">
                {/* Header with golden accent bar */}
                <div className="relative border-b border-accent/20 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 px-8 py-6">
                  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-accent via-accent/70 to-accent/30" />
                  <h3 className="text-lg font-bold uppercase tracking-wider text-primary transition-colors duration-300 group-hover:text-accent">
                    {item.role}
                  </h3>
                  <h4 className="mt-2 text-xl font-semibold text-accent leading-snug drop-shadow-sm transition-all duration-300 group-hover:text-primary group-hover:drop-shadow-md">
                    {item.headline}
                  </h4>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-8">
                  <div className="space-y-5">
                    {/* The Problem */}
                    <div className="rounded-lg border border-primary/10 bg-primary/[0.02] p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary/40 shadow-sm"></div>
                        <h5 className="text-xs font-bold uppercase tracking-widest text-primary/70">
                          The Problem
                        </h5>
                      </div>
                      <p className="text-[15px] text-primary/75 leading-relaxed transition-colors duration-300 group-hover:text-primary/85">
                        {item.pain}
                      </p>
                    </div>

                    {/* The Solution - golden highlight */}
                    <div className="rounded-lg border border-accent/20 bg-gradient-to-br from-accent/8 via-accent/5 to-accent/8 p-4 shadow-sm transition-all duration-300 group-hover:border-accent/30 group-hover:from-accent/12 group-hover:via-accent/8 group-hover:to-accent/12 group-hover:shadow-md">
                      <div className="mb-2 flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-accent shadow-sm shadow-accent/50"></div>
                        <h5 className="text-xs font-bold uppercase tracking-widest text-accent">
                          {item.solution}
                        </h5>
                      </div>
                      <p className="text-[15px] font-medium text-primary leading-relaxed transition-colors duration-300 group-hover:text-primary">
                        {item.value}
                      </p>
                    </div>
                  </div>

                  {/* How It Works - footer pinned with golden touch */}
                  <div className="mt-auto pt-6">
                    <div className="rounded-xl border border-accent/20 bg-gradient-to-r from-primary/[0.02] via-accent/[0.04] to-primary/[0.02] px-6 py-4 shadow-sm transition-all duration-300 group-hover:border-accent/30 group-hover:from-primary/[0.04] group-hover:via-accent/[0.08] group-hover:to-primary/[0.04] group-hover:shadow-md">
                      <h5 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary/70 transition-colors duration-300 group-hover:text-primary/80">
                        <div className="h-1 w-1 rounded-full bg-accent/60"></div>
                        How It Works
                      </h5>
                      <p className="text-sm text-primary/80 leading-relaxed transition-colors duration-300 group-hover:text-primary/90">
                        {item.feature}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}
