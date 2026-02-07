'use client'

import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'
import { FadeInUp } from './animations/FadeInUp'
import { StaggerChildren, StaggerItem } from './animations/StaggerChildren'
import Image from 'next/image'

export function Hero() {
  const { locale } = useLocale()
  const t = getContent(locale).hero as Record<string, unknown>
  const headline = (t.defaultHeadline as string | undefined) ?? (t.headline as string)
  const subhead = (t.defaultSubhead as string | undefined) ?? (t.subhead as string)
  const personas = Array.isArray(t.personas) ? t.personas : []
  const firstPersona = personas[0] as { painPoint: string; solution: string } | undefined

  return (
    <section className="overflow-hidden relative px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
      {/* Riyadh Skyline at Night */}
      <div className="absolute inset-0">
        <Image
          src="/images/riyadh-skyline.jpg"
          alt="Riyadh Skyline at Night - Saudi Arabia"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/55 to-primary/75" />
      </div>

      {/* Gold accent line */}
      <div className="absolute right-0 bottom-0 left-0 h-1 bg-gradient-to-r from-transparent to-transparent via-accent" />

      <div className="relative mx-auto max-w-4xl text-center">
        <FadeInUp>
          <h1 className="font-bold text-white drop-shadow-lg text-hero tracking-royal">
            {headline.split(' ').map((word, i) => {
              const isHighlight = word.toLowerCase().includes('readiness') || word.toLowerCase().includes('audit')
              return (
                <span key={i} className={isHighlight ? 'text-accent' : ''}>
                  {word}{' '}
                </span>
              )
            })}
          </h1>
        </FadeInUp>

        <FadeInUp delay={0.2}>
          <p className="mx-auto mt-6 max-w-3xl leading-relaxed text-body text-white/95 lg:mt-8">
            {subhead}
          </p>
        </FadeInUp>

        {/* Problem/Solution Preview */}
        {firstPersona && (
          <FadeInUp delay={0.3}>
            <div className="p-6 mt-10 text-left rounded-2xl border-2 backdrop-blur-md border-accent/50 bg-white/10 sm:p-8 shadow-premium">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="flex gap-2 items-center text-sm font-bold text-white uppercase tracking-royal">
                    <span className="inline-block w-8 h-0.5 bg-white/60"></span>
                    The Problem
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/90">
                    {firstPersona.painPoint}
                  </p>
                </div>
                <div>
                  <h3 className="flex gap-2 items-center text-sm font-bold uppercase text-accent tracking-royal">
                    <span className="inline-block w-8 h-0.5 bg-accent"></span>
                    The Solution
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/95">
                    {firstPersona.solution}
                  </p>
                </div>
              </div>
            </div>
          </FadeInUp>
        )}

        <StaggerChildren className="flex flex-wrap gap-4 justify-center items-center mt-10" staggerDelay={0.1}>
          <StaggerItem>
            <a
              href="#contact"
              className="inline-flex overflow-hidden relative justify-center items-center px-8 py-4 font-bold rounded-lg ring-2 ring-offset-2 transition-all duration-300 group bg-accent text-cta text-primary shadow-gold ring-accent ring-offset-primary hover:scale-105 hover:shadow-gold focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <span className="relative z-10">{String(t.cta ?? '')}</span>
              <div className="absolute inset-0 bg-gold-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] animate-shimmer"></div>
            </a>
          </StaggerItem>
          <StaggerItem>
            <a
              href="#leadMagnet"
              className="inline-flex justify-center items-center px-8 py-4 font-bold rounded-lg border-2 backdrop-blur-sm transition-all duration-300 border-accent text-cta text-accent bg-white/5 hover:bg-accent hover:text-primary hover:scale-105 hover:shadow-gold focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {String(t.ctaSecondary ?? '')}
            </a>
          </StaggerItem>
        </StaggerChildren>

        {/* Scroll Indicator */}
        <FadeInUp delay={0.6}>
          <div className="flex justify-center mt-16">
            <div className="animate-bounce">
              <svg
                className="w-6 h-6 text-accent"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
