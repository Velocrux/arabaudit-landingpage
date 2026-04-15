'use client'
import dynamic from 'next/dynamic'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { TrustSignals } from '@/components/TrustSignals'
import { ScrollProgress } from '@/components/animations/ScrollProgress'

import { useScrollDepthTracking } from '@/lib/hooks/useAnalytics'

const Features = dynamic(() => import('@/components/Features').then((m) => ({ default: m.Features })))
const AICapabilities = dynamic(() =>
  import('@/components/AICapabilities').then((m) => ({ default: m.AICapabilities })),
)
const Comparison = dynamic(() =>
  import('@/components/Comparison').then((m) => ({ default: m.Comparison })),
)
const Personas = dynamic(() => import('@/components/Personas').then((m) => ({ default: m.Personas })))
const Frameworks = dynamic(() =>
  import('@/components/Frameworks').then((m) => ({ default: m.Frameworks })),
)
const FAQ = dynamic(() => import('@/components/FAQ').then((m) => ({ default: m.FAQ })))
const Team = dynamic(() => import('@/components/Team').then((m) => ({ default: m.Team })))
const CTA = dynamic(() => import('@/components/CTA').then((m) => ({ default: m.CTA })))
const Footer = dynamic(() => import('@/components/Footer').then((m) => ({ default: m.Footer })))

export default function Home() {
  useScrollDepthTracking([25, 50, 75, 100])
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <TrustSignals />
        <Features />
        <AICapabilities />
        <Comparison />
        <Personas />
        <Frameworks />
        <FAQ />
        <Team />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
