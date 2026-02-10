'use client'

import { useState } from 'react'
import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'
import { FadeInUp } from './animations/FadeInUp'
import { DemoRequestModal } from './DemoRequestModal'
import { useSectionTracking, useAnalytics } from '@/lib/hooks/useAnalytics'
import Image from 'next/image'

export function CTA() {
  const { locale } = useLocale()
  const t = getContent(locale).cta
  const [showDemoModal, setShowDemoModal] = useState(false)
  const ctaRef = useSectionTracking('cta')
  const { trackButtonClick } = useAnalytics()

  return (
    <section
      ref={ctaRef}
      id="contact"
      className="overflow-hidden relative px-4 py-20 bg-gradient-to-br border-t-2 scroll-mt-16 border-accent from-primary via-primary to-primary/90 sm:px-6 sm:py-24"
    >
      {/* Background Image */}
      <div className="absolute inset-0 opacity-15">
        <Image
          src="/images/riyadh-skyline.jpg"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="relative mx-auto max-w-2xl text-center">
        <FadeInUp>
          <div className="mx-auto mb-6 w-24 h-1 rounded-full bg-accent shadow-gold" />
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <h2 className="font-bold text-white text-section tracking-royal">
            {t.title}
          </h2>
        </FadeInUp>

        <FadeInUp delay={0.2}>
          <p className="mt-4 leading-relaxed text-body text-white/90">{t.subtitle}</p>
        </FadeInUp>

        <FadeInUp delay={0.3}>
          <button
            onClick={() => {
              trackButtonClick(String(t.button), 'primary', 'cta_section')
              setShowDemoModal(true)
            }}
            type="button"
            className="inline-flex overflow-hidden relative justify-center items-center px-10 py-5 mt-10 font-bold rounded-lg ring-2 ring-offset-2 transition-all duration-300 group bg-accent text-cta text-primary shadow-gold ring-accent ring-offset-primary hover:scale-105 hover:shadow-gold focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <span className="relative z-10">{t.button}</span>
            <div className="absolute inset-0 bg-gold-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] animate-shimmer"></div>
          </button>
        </FadeInUp>
      </div>

      {/* Demo Request Modal */}
      <DemoRequestModal isOpen={showDemoModal} onClose={() => setShowDemoModal(false)} />
    </section>
  )
}
