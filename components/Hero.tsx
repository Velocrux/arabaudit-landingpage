'use client'

import { useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import { useLocale } from '@/context/LocaleContext'
import { DEMO_CALENDLY_URL } from '@/lib/constants'
import { getContent } from '@/lib/content'
import { useSectionTracking, useAnalytics } from '@/lib/hooks/useAnalytics'
import Image from 'next/image'

const DemoRequestModal = dynamic(
  () => import('./DemoRequestModal').then((m) => ({ default: m.DemoRequestModal })),
  { ssr: false },
)

export function Hero() {
  const { locale } = useLocale()
  const t = getContent(locale).hero as Record<string, unknown>
  const headline = (t.defaultHeadline as string | undefined) ?? (t.headline as string)
  const subhead = (t.defaultSubhead as string | undefined) ?? (t.subhead as string)
  const personas = Array.isArray(t.personas) ? t.personas : []
  const firstPersona = personas[0] as { painPoint: string; solution: string } | undefined
  const problemLabel = String(t.problemLabel ?? 'The Problem')
  const solutionLabel = String(t.solutionLabel ?? 'The Solution')
  const cryptoVerified = String(t.cryptoVerifiedBadge ?? 'Cryptographically Verified')

  const [showDemoModal, setShowDemoModal] = useState(false)
  const heroRef = useSectionTracking('hero')
  const { trackButtonClick } = useAnalytics()
  const primaryRef = useRef<HTMLButtonElement>(null)

  const headlineWords = headline.split(/\s+/).filter(Boolean)

  return (
    <section ref={heroRef} className="relative overflow-hidden bg-primary px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
      {/* Riyadh Skyline at Night */}
      <div className="absolute inset-0">
        <Image
          src="/images/riyadh-skyline.webp"
          alt="Riyadh Skyline at Night - Saudi Arabia"
          fill
          sizes="100vw"
          unoptimized
          priority
          fetchPriority="high"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/55 to-primary/75" />
        <div
          className="absolute inset-0 opacity-80 mix-blend-soft-light"
          style={{
            background:
              'linear-gradient(125deg, rgba(11,70,52,0.55) 0%, rgba(216,176,74,0.12) 40%, rgba(11,70,52,0.65) 100%)',
          }}
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-[1] h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="relative z-[2] mx-auto max-w-4xl text-center">
        <h1 className="animate-hero-up font-bold text-white drop-shadow-lg text-hero tracking-royal">
          {headlineWords.map((word, i) => {
            const isHighlight =
              word.toLowerCase().includes('readiness') ||
              word.toLowerCase().includes('audit') ||
              word.toLowerCase().includes('تدقيق') ||
              word.toLowerCase().includes('جاهز')
            return (
              <span key={`${word}-${i}`} className="inline-block whitespace-nowrap">
                <span className={`relative inline-block ${isHighlight ? 'text-accent' : ''}`}>
                  {word}
                  {isHighlight && (
                    <span
                      className={`absolute -bottom-1 h-0.5 w-full rounded-full bg-accent ${
                        locale === 'ar' ? 'right-0' : 'left-0'
                      }`}
                    />
                  )}
                </span>
                {i < headlineWords.length - 1 ? '\u00A0' : null}
              </span>
            )
          })}
        </h1>

        <p className="animate-hero-up mx-auto mt-6 max-w-3xl leading-relaxed text-body text-white/95 lg:mt-8 [animation-delay:100ms]">
          {subhead}
        </p>

        {/* Badges */}
        <div className="animate-hero-up mt-6 flex flex-wrap items-center justify-center gap-2 px-2 sm:gap-3 [animation-delay:200ms]">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-white/10 px-3 py-2 text-center backdrop-blur-sm sm:gap-2 sm:px-4">
            <svg className="h-3.5 w-3.5 shrink-0 text-accent sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs font-medium tracking-wide text-white/90 sm:text-sm">
              {String(t.servingEnterprisesLabel ?? '')}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full border-2 border-accent/50 bg-accent/10 px-3 py-2 backdrop-blur-sm sm:gap-2 sm:px-4">
            <svg className="h-3.5 w-3.5 shrink-0 text-accent sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <span className="text-xs font-bold uppercase tracking-wider text-accent sm:text-sm">
              {String(t.vision2030Badge ?? '')}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-green-400/50 bg-green-500/10 px-3 py-2 backdrop-blur-sm sm:gap-2 sm:px-4">
            <svg className="h-3.5 w-3.5 shrink-0 text-green-400 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-xs font-medium tracking-wide text-green-300 sm:text-sm">
              {cryptoVerified}
            </span>
          </div>
        </div>

        {/* Problem/Solution Preview */}
        {firstPersona && (
          <div className="animate-hero-up mt-10 rounded-2xl border-2 border-accent/50 bg-white/10 p-6 text-left shadow-premium backdrop-blur-md sm:p-8 [animation-delay:300ms]">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-royal text-white">
                  <span className="inline-block h-0.5 w-8 bg-white/60" />
                  {problemLabel}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/90">{firstPersona.painPoint}</p>
              </div>
              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-royal text-accent">
                  <span className="inline-block h-0.5 w-8 bg-accent" />
                  {solutionLabel}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/95">{firstPersona.solution}</p>
              </div>
            </div>
          </div>
        )}

        <div className="animate-hero-up mt-10 flex flex-wrap items-center justify-center gap-4 [animation-delay:350ms]">
          <button
            ref={primaryRef}
            type="button"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-accent px-8 py-4 font-bold text-cta text-primary shadow-gold ring-2 ring-accent ring-offset-2 ring-offset-primary transition-all duration-300 hover:shadow-gold active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-accent"
            onClick={() => {
              trackButtonClick(String(t.cta ?? ''), 'primary', 'hero_section')
              setShowDemoModal(true)
            }}
          >
            <span className="relative z-10">{String(t.cta ?? '')}</span>
            <div className="absolute inset-0 bg-gold-shimmer bg-[length:200%_100%] opacity-0 transition-opacity duration-500 group-hover:opacity-100 animate-shimmer" />
          </button>

          <a
            href={DEMO_CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackButtonClick(String(t.ctaSecondary ?? ''), 'secondary', 'hero_section', {
                href: DEMO_CALENDLY_URL,
                target: '_blank',
              })
            }
            className="relative inline-flex items-center justify-center overflow-hidden rounded-lg border-2 border-accent bg-white/5 px-8 py-4 font-bold text-cta text-accent backdrop-blur-sm transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:shadow-gold active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <span className="relative z-10">{String(t.ctaSecondary ?? '')}</span>
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 flex justify-center">
          <div className="animate-scroll-hint">
            <svg
              className="h-6 w-6 text-accent drop-shadow-md"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {showDemoModal && (
        <DemoRequestModal isOpen={showDemoModal} onClose={() => setShowDemoModal(false)} />
      )}
    </section>
  )
}
