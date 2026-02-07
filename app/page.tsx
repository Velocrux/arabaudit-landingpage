import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { TrustSignals } from '@/components/TrustSignals'
import { AIComparison } from '@/components/AIComparison'
import { ValueProp } from '@/components/ValueProp'
import { Frameworks } from '@/components/Frameworks'
import { AuditProcess } from '@/components/AuditProcess'
import { HowItWorks } from '@/components/HowItWorks'
import { ProductWorkflow } from '@/components/ProductWorkflow'
import { Features } from '@/components/Features'
import { Comparison } from '@/components/Comparison'
import { Sectors } from '@/components/Sectors'
import { SectorCTAs } from '@/components/SectorCTAs'
import { Personas } from '@/components/Personas'
import { LeadMagnet } from '@/components/LeadMagnet'
import { CTA } from '@/components/CTA'
import { Footer } from '@/components/Footer'
import { ScrollProgress } from '@/components/animations/ScrollProgress'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <TrustSignals />
        <AIComparison />
        <ValueProp />
        <Frameworks />
        <AuditProcess />
        <HowItWorks />
        <ProductWorkflow />
        <Features />
        <Comparison />
        <Sectors />
        <SectorCTAs />
        <Personas />
        <LeadMagnet />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
