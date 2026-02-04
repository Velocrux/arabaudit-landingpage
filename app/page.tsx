import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { ValueProp } from '@/components/ValueProp'
import { Frameworks } from '@/components/Frameworks'
import { HowItWorks } from '@/components/HowItWorks'
import { Features } from '@/components/Features'
import { Comparison } from '@/components/Comparison'
import { Sectors } from '@/components/Sectors'
import { Personas } from '@/components/Personas'
import { CTA } from '@/components/CTA'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ValueProp />
        <Frameworks />
        <HowItWorks />
        <Features />
        <Comparison />
        <Sectors />
        <Personas />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
