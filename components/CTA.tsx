'use client'

import { useState } from 'react'
import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'
import { FadeInUp } from './animations/FadeInUp'
import { DemoRequestModal } from './DemoRequestModal'
import Image from 'next/image'

export function CTA() {
  const { locale } = useLocale()
  const t = getContent(locale).cta
  const [showDemoModal, setShowDemoModal] = useState(false)

  return (
    <section
      id="contact"
      className="scroll-mt-16 border-t-2 border-accent bg-gradient-to-br from-primary via-primary to-primary/90 px-4 py-20 sm:px-6 sm:py-24 relative overflow-hidden"
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
          <div className="mx-auto mb-6 h-1 w-24 rounded-full bg-accent shadow-gold" />
        </FadeInUp>
        
        <FadeInUp delay={0.1}>
          <h2 className="text-section font-bold text-white tracking-royal">
            {t.title}
          </h2>
        </FadeInUp>
        
        <FadeInUp delay={0.2}>
          <p className="mt-4 text-body text-white/90 leading-relaxed">{t.subtitle}</p>
        </FadeInUp>
        
        <FadeInUp delay={0.3}>
          <button
            onClick={() => setShowDemoModal(true)}
            type="button"
            className="group relative mt-10 inline-flex items-center justify-center rounded-lg bg-accent px-10 py-5 text-cta font-bold text-primary shadow-gold ring-2 ring-accent ring-offset-2 ring-offset-primary transition-all duration-300 hover:scale-105 hover:shadow-gold focus:outline-none focus:ring-2 focus:ring-accent overflow-hidden"
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
