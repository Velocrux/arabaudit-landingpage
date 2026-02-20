'use client'

import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'
import { FadeInUp } from './animations/FadeInUp'
import { StaggerChildren, StaggerItem } from './animations/StaggerChildren'
import { useSectionTracking } from '@/lib/hooks/useAnalytics'

function IconCheck({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}
function IconAlert({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  )
}
function IconSparkles({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  )
}
function IconFileSearch({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )
}
function IconChat({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  )
}
function IconClipboardCheck({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  )
}
function IconChartBar({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  )
}
function IconLink({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  )
}

export function AICapabilities() {
  const { locale } = useLocale()
  const content = getContent(locale) as {
    aiCapabilities?: {
      title: string
      subtitle: string
      items: Array<{
        title: string
        tagline: string
        painTitle: string
        painPoints: string[]
        benefitTitle: string
        benefits: string[]
      }>
    }
  }
  const t = content.aiCapabilities
  const sectionRef = useSectionTracking('aiCapabilities')

  if (!t?.items?.length) return null

  const icons = [IconFileSearch, IconSparkles, IconChat, IconClipboardCheck, IconChartBar, IconLink] as const

  return (
    <section
      ref={sectionRef}
      id="ai-capabilities"
      className={`relative scroll-mt-16 overflow-hidden px-6 py-20 sm:px-8 sm:py-28 ${locale === 'ar' ? 'rtl' : 'ltr'}`}
    >
      <div
        className="absolute inset-0"
        style={{
          background: [
            'linear-gradient(165deg, #f2f5f4 0%, #e8efe9 35%, #dce8e2 70%, #d0e2da 100%)',
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(11, 70, 52, 0.06) 0%, transparent 55%)',
            'radial-gradient(ellipse 60% 40% at 20% 100%, rgba(216, 176, 74, 0.06) 0%, transparent 50%)',
          ].join(', '),
        }}
      />
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <pattern id="ai-cap-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M50 4 L96 50 L50 96 L4 50 Z" fill="none" stroke="rgb(11 70 52)" strokeWidth="0.35" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ai-cap-pattern)" />
      </svg>

      <div className="relative z-10 mx-auto max-w-6xl">
        <FadeInUp>
          <div className="text-center">
            <div className="mx-auto h-1 w-16 rounded-full bg-accent" />
            <h2 className="mt-4 text-section font-bold tracking-royal text-primary">{t.title}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-primary/80">{t.subtitle}</p>
          </div>
        </FadeInUp>

        <StaggerChildren className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((item, i) => {
            const Icon = icons[i] ?? IconSparkles
            return (
              <StaggerItem key={i}>
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border-2 border-accent/20 bg-white/95 shadow-xl backdrop-blur-sm transition-all duration-500 ease-out hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/10">
                  {/* Header */}
                  <div className="border-b border-accent/20 bg-gradient-to-r from-accent/10 via-white to-accent/5 px-6 py-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-accent ring-2 ring-accent/30">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold tracking-royal text-primary">{item.title}</h3>
                        <p className="mt-1 text-sm text-primary/75">{item.tagline}</p>
                      </div>
                    </div>
                  </div>

                  {/* Pain */}
                  <div className="flex-1 border-b border-primary/10 px-6 py-5">
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary/90">
                      <IconAlert className="h-4 w-4 text-amber-600" />
                      {item.painTitle}
                    </div>
                    <ul className="mt-3 space-y-2">
                      {item.painPoints.map((point, j) => (
                        <li key={j} className="flex gap-2 text-sm text-primary/80">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/80" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-accent">
                      <IconCheck className="h-4 w-4" />
                      {item.benefitTitle}
                    </div>
                    <ul className="mt-3 space-y-2">
                      {item.benefits.map((benefit, j) => (
                        <li key={j} className="flex gap-2 text-sm text-primary/85">
                          <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerChildren>
      </div>
    </section>
  )
}
