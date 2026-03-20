'use client'

import { useState, useRef, useMemo, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotionSafe } from '@/lib/hooks/useReducedMotionSafe'
import { useLocale } from '@/context/LocaleContext'
import { DEMO_CALENDLY_URL } from '@/lib/constants'
import { getContent } from '@/lib/content'
import { DemoRequestModal } from './DemoRequestModal'
import { useSectionTracking, useAnalytics } from '@/lib/hooks/useAnalytics'
import Image from 'next/image'

const headlineEase = [0.25, 0.1, 0.25, 1] as const

function MagneticButton({
  children,
  className,
  onClick,
  type = 'button',
  disabled,
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const reduce = useReducedMotionSafe()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (reduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const strength = 0.22
    x.set((e.clientX - rect.left - rect.width / 2) * strength)
    y.set((e.clientY - rect.top - rect.height / 2) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      className={className}
      style={reduce ? undefined : { x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  )
}

const PARTICLE_POSITIONS = [
  { left: '8%', top: '22%', delay: 0 },
  { left: '78%', top: '18%', delay: 0.4 },
  { left: '44%', top: '38%', delay: 0.8 },
  { left: '88%', top: '52%', delay: 1.2 },
  { left: '18%', top: '58%', delay: 1.6 },
] as const

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
  const reduce = useReducedMotionSafe()

  const headlineWords = useMemo(() => headline.split(/\s+/).filter(Boolean), [headline])
  const subheadWords = useMemo(() => subhead.split(/\s+/).filter(Boolean), [subhead])

  return (
    <section ref={heroRef} className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
      {/* Riyadh Skyline at Night */}
      <div className="absolute inset-0">
        <Image
          src="/images/riyadh-skyline.jpg"
          alt="Riyadh Skyline at Night - Saudi Arabia"
          fill
          className="object-cover"
          priority
        />
        {/* Base overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/55 to-primary/75" />
        {/* Subtle shifting gradient */}
        <div
          className="absolute inset-0 animate-gradient-shift opacity-90 mix-blend-soft-light"
          style={{
            background:
              'linear-gradient(125deg, rgba(11,70,52,0.55) 0%, rgba(216,176,74,0.12) 40%, rgba(11,70,52,0.65) 100%)',
            backgroundSize: '220% 220%',
          }}
        />
      </div>

      {/* Floating gold particles */}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        {PARTICLE_POSITIONS.map((p, i) => (
          <motion.span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-accent shadow-gold sm:h-2 sm:w-2"
            style={{ left: p.left, top: p.top }}
            initial={{ opacity: 0.15, y: 0 }}
            animate={
              reduce
                ? { opacity: 0.35 }
                : {
                    opacity: [0.2, 0.85, 0.35, 0.75, 0.25],
                    y: [0, -14, 4, -10, 0],
                    scale: [1, 1.2, 0.95, 1.1, 1],
                  }
            }
            transition={{
              duration: 7 + i * 0.6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: p.delay,
            }}
            aria-hidden
          />
        ))}
      </div>

      {/* Gold accent line */}
      <div className="absolute bottom-0 left-0 right-0 z-[1] h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="relative z-[2] mx-auto max-w-4xl text-center">
        <h1 className="font-bold text-white drop-shadow-lg text-hero tracking-royal">
          {headlineWords.map((word, i) => {
            const isHighlight =
              word.toLowerCase().includes('readiness') ||
              word.toLowerCase().includes('audit') ||
              word.toLowerCase().includes('تدقيق') ||
              word.toLowerCase().includes('جاهز')
            return (
              <span key={`${word}-${i}`} className="inline-block whitespace-nowrap">
                <span className="relative inline-block">
                  <motion.span
                    className={`inline-block ${isHighlight ? 'text-accent' : ''}`}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduce ? 0.01 : 0.55,
                      delay: reduce ? 0 : i * 0.05,
                      ease: headlineEase,
                    }}
                  >
                    {word}
                  </motion.span>
                  {isHighlight && (
                    <motion.span
                      className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-accent ${
                        locale === 'ar' ? 'right-0 left-auto origin-right' : 'origin-left'
                      }`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: reduce ? 0.01 : 0.45,
                        delay: reduce ? 0 : 0.25 + i * 0.05,
                        ease: headlineEase,
                      }}
                      style={{ width: '100%' }}
                    />
                  )}
                </span>
                {i < headlineWords.length - 1 ? '\u00A0' : null}
              </span>
            )
          })}
        </h1>

        <p className="mx-auto mt-6 max-w-3xl leading-relaxed text-body text-white/95 lg:mt-8">
          {subheadWords.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              className="inline-block"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduce ? 0.01 : 0.4,
                delay: reduce ? 0 : 0.15 + i * 0.02,
                ease: headlineEase,
              }}
            >
              {word}
              {i < subheadWords.length - 1 ? '\u00A0' : ''}
            </motion.span>
          ))}
        </p>

        {/* Badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 px-2 sm:gap-3">
          {[
            {
              key: 'serving',
              node: (
                <div className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-white/10 px-3 py-2 text-center backdrop-blur-sm sm:gap-2 sm:px-4">
                  <svg
                    className="h-3.5 w-3.5 shrink-0 text-accent sm:h-4 sm:w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-xs font-medium tracking-wide text-white/90 sm:text-sm">
                    {String(t.servingEnterprisesLabel ?? '')}
                  </span>
                </div>
              ),
            },
            {
              key: 'v2030',
              node: (
                <div className="inline-flex items-center gap-1.5 rounded-full border-2 border-accent/50 bg-accent/10 px-3 py-2 backdrop-blur-sm sm:gap-2 sm:px-4">
                  <svg
                    className="h-3.5 w-3.5 shrink-0 text-accent sm:h-4 sm:w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                  <span className="text-xs font-bold uppercase tracking-wider text-accent sm:text-sm">
                    {String(t.vision2030Badge ?? '')}
                  </span>
                </div>
              ),
            },
            {
              key: 'crypto',
              node: (
                <div className="inline-flex items-center gap-1.5 rounded-full border border-green-400/50 bg-green-500/10 px-3 py-2 backdrop-blur-sm sm:gap-2 sm:px-4">
                  <svg
                    className="h-3.5 w-3.5 shrink-0 text-green-400 sm:h-4 sm:w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span className="text-xs font-medium tracking-wide text-green-300 sm:text-sm">
                    {cryptoVerified}
                  </span>
                </div>
              ),
            },
          ].map((badge, i) => (
            <motion.div
              key={badge.key}
              initial={{ opacity: 0, scale: 0.86, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                type: 'spring',
                stiffness: 420,
                damping: 22,
                delay: reduce ? 0 : 0.2 + i * 0.08,
              }}
            >
              {badge.node}
            </motion.div>
          ))}
        </div>

        {/* Problem/Solution Preview */}
        {firstPersona && (
          <motion.div
            className="mt-10 rounded-2xl border-2 border-accent/50 bg-white/10 p-6 text-left shadow-premium backdrop-blur-md sm:p-8"
            initial={{ opacity: 0, y: 24, boxShadow: '0 0 0 rgba(216, 176, 74, 0)' }}
            animate={{
              opacity: 1,
              y: 0,
              boxShadow: reduce
                ? '0 20px 60px -15px rgba(11, 70, 52, 0.2), 0 10px 20px -10px rgba(11, 70, 52, 0.1)'
                : [
                    '0 0 0 rgba(216, 176, 74, 0)',
                    '0 0 36px rgba(216, 176, 74, 0.35)',
                    '0 20px 60px -15px rgba(11, 70, 52, 0.2), 0 10px 20px -10px rgba(11, 70, 52, 0.1)',
                  ],
            }}
            transition={{
              duration: reduce ? 0.01 : 0.55,
              delay: reduce ? 0 : 0.35,
              ease: headlineEase,
              boxShadow: reduce
                ? undefined
                : { duration: 1.35, times: [0, 0.42, 1], delay: 0.35 },
            }}
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: locale === 'ar' ? 28 : -28 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: reduce ? 0.01 : 0.5,
                  delay: reduce ? 0 : 0.45,
                  ease: headlineEase,
                }}
              >
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-royal text-white">
                  <span className="inline-block h-0.5 w-8 bg-white/60" />
                  {problemLabel}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/90">{firstPersona.painPoint}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: locale === 'ar' ? -28 : 28 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: reduce ? 0.01 : 0.5,
                  delay: reduce ? 0 : 0.55,
                  ease: headlineEase,
                }}
              >
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-royal text-accent">
                  <span className="inline-block h-0.5 w-8 bg-accent" />
                  {solutionLabel}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/95">{firstPersona.solution}</p>
              </motion.div>
            </div>
          </motion.div>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-accent px-8 py-4 font-bold text-cta text-primary shadow-gold ring-2 ring-accent ring-offset-2 ring-offset-primary transition-shadow duration-300 hover:shadow-gold focus:outline-none focus:ring-2 focus:ring-accent"
            onClick={() => {
              trackButtonClick(String(t.cta ?? ''), 'primary', 'hero_section')
              setShowDemoModal(true)
            }}
          >
            <span className="relative z-10">{String(t.cta ?? '')}</span>
            <div className="absolute inset-0 bg-gold-shimmer bg-[length:200%_100%] opacity-0 transition-opacity duration-500 group-hover:opacity-100 animate-shimmer" />
          </MagneticButton>

          <motion.div
            className="relative inline-flex"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.5, delay: reduce ? 0 : 0.2 }}
          >
            <motion.a
              href={DEMO_CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackButtonClick(String(t.ctaSecondary ?? ''), 'secondary', 'hero_section', {
                  href: DEMO_CALENDLY_URL,
                  target: '_blank',
                })
              }
              className="relative inline-flex items-center justify-center overflow-hidden rounded-lg border-2 border-accent bg-white/5 px-8 py-4 font-bold text-cta text-accent backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent"
              whileHover={{
                scale: 1.04,
                borderColor: 'rgba(216, 176, 74, 1)',
                boxShadow:
                  '0 0 0 1px rgba(216, 176, 74, 0.5), 0 0 28px rgba(216, 176, 74, 0.35), inset 0 0 20px rgba(216, 176, 74, 0.08)',
                backgroundColor: 'rgba(216, 176, 74, 0.12)',
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            >
              <span className="relative z-10">{String(t.ctaSecondary ?? '')}</span>
            </motion.a>
          </motion.div>
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

      <DemoRequestModal isOpen={showDemoModal} onClose={() => setShowDemoModal(false)} />
    </section>
  )
}
