'use client'

import { useState, useRef, useMemo, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotionSafe } from '@/lib/hooks/useReducedMotionSafe'
import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'
import { DemoRequestModal } from './DemoRequestModal'
import { useSectionTracking, useAnalytics } from '@/lib/hooks/useAnalytics'
import Image from 'next/image'

const ease = [0.25, 0.1, 0.25, 1] as const

function MagneticCTAButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
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
    const strength = 0.2
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
      type="button"
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

export function CTA() {
  const { locale } = useLocale()
  const reduce = useReducedMotionSafe()
  const t = getContent(locale).cta
  const [showDemoModal, setShowDemoModal] = useState(false)
  const ctaRef = useSectionTracking('cta')
  const { trackButtonClick } = useAnalytics()
  const isRTL = locale === 'ar'

  const titleWords = useMemo(() => t.title.split(/\s+/).filter(Boolean), [t.title])
  const subtitleWords = useMemo(() => t.subtitle.split(/\s+/).filter(Boolean), [t.subtitle])

  return (
    <section
      ref={ctaRef}
      id="contact"
      className={`relative scroll-mt-16 overflow-hidden border-t-2 border-accent bg-gradient-to-br from-primary via-primary to-primary/90 px-4 py-20 sm:px-6 sm:py-24 ${isRTL ? 'rtl' : 'ltr'}`}
    >
      <div className="absolute inset-0 opacity-15">
        <Image src="/images/riyadh-skyline.jpg" alt="" fill className="object-cover" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] animate-gradient-shift opacity-40 mix-blend-soft-light"
        style={{
          background:
            'linear-gradient(125deg, rgba(11,70,52,0.5) 0%, rgba(216,176,74,0.12) 45%, rgba(11,70,52,0.55) 100%)',
          backgroundSize: '220% 220%',
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <motion.div
          className="mx-auto mb-6 h-1 w-24 origin-center rounded-full bg-accent shadow-gold"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: reduce ? 0.01 : 0.5, ease }}
        />

        <h2 className="text-section font-bold tracking-royal text-white">
          {titleWords.map((word, i) => (
            <span key={`${word}-${i}`} className="inline-block">
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: reduce ? 0.01 : 0.45,
                  delay: reduce ? 0 : 0.06 + i * 0.03,
                  ease,
                }}
              >
                {word}
              </motion.span>
              {i < titleWords.length - 1 ? '\u00A0' : ''}
            </span>
          ))}
        </h2>

        <p className="mt-4 text-body leading-relaxed text-white/90">
          {subtitleWords.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              className="inline-block"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{
                duration: reduce ? 0.01 : 0.38,
                delay: reduce ? 0 : 0.1 + i * 0.02,
                ease,
              }}
            >
              {word}
              {i < subtitleWords.length - 1 ? '\u00A0' : ''}
            </motion.span>
          ))}
        </p>

        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: reduce ? 0.01 : 0.45, delay: reduce ? 0 : 0.2, ease }}
        >
          <MagneticCTAButton
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-accent px-10 py-5 font-bold text-cta text-primary shadow-gold ring-2 ring-accent ring-offset-2 ring-offset-primary transition-shadow duration-300 hover:shadow-gold focus:outline-none focus:ring-2 focus:ring-accent"
            onClick={() => {
              trackButtonClick(String(t.button), 'primary', 'cta_section')
              setShowDemoModal(true)
            }}
          >
            <span className="relative z-10">{t.button}</span>
            <div className="absolute inset-0 bg-gold-shimmer bg-[length:200%_100%] opacity-0 transition-opacity duration-500 group-hover:opacity-100 animate-shimmer" />
          </MagneticCTAButton>
        </motion.div>
      </div>

      <DemoRequestModal isOpen={showDemoModal} onClose={() => setShowDemoModal(false)} />
    </section>
  )
}
