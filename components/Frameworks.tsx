'use client'

import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'
import { FadeInUp } from './animations/FadeInUp'
import { FloatingCard } from './animations/FloatingCard'

// Middle East–inspired icons: shield (guard), landmark (finance), lock+data (privacy)
function IconNCA() {
  return (
    <svg className="w-10 h-10 text-accent shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}
function IconSAMA() {
  return (
    <svg className="w-10 h-10 text-accent shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
    </svg>
  )
}
function IconSDAIA() {
  return (
    <svg className="w-10 h-10 text-accent shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

type FrameworkCard = {
  name: string
  tagline: string
  for: string
  points?: string[]
  desc?: string
}

function CardContent({
  points,
  desc,
  className = '',
  isRtl = false,
}: {
  points?: string[]
  desc?: string
  className?: string
  isRtl?: boolean
}) {
  if (points && points.length > 0) {
    return (
      <ul className={`space-y-4 flex-1 ${className}`} role="list">
        {points.map((point, i) => (
          <li
            key={i}
            className={`flex gap-4 text-[15px] text-white/90 leading-[1.6] ${isRtl ? 'flex-row-reverse' : ''}`}
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent font-semibold text-sm">
              {i + 1}
            </span>
            <span className="pt-0.5">{point}</span>
          </li>
        ))}
      </ul>
    )
  }
  if (desc) {
    return <p className={`text-sm text-white/90 leading-relaxed flex-1 ${className}`}>{desc}</p>
  }
  return null
}

export function Frameworks() {
  const { locale } = useLocale()
  const t = getContent(locale).frameworks
  const forLabel = 'forLabel' in t ? (t as { forLabel: string }).forLabel : 'Who must comply'
  const nca = t.nca as FrameworkCard
  const sama = t.sama as FrameworkCard
  const sdaia = 'sdaia' in t ? (t as { sdaia: FrameworkCard }).sdaia : null

  return (
    <section id="frameworks" className="relative px-6 py-20 scroll-mt-16 overflow-hidden text-white sm:px-8 sm:py-28 md:py-32">
      {/* Royal gradient: deep, smooth, one soft gold glow */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'linear-gradient(160deg, #0a3d2e 0%, #0B4634 35%, #082f24 70%, #051f18 100%)',
            'radial-gradient(ellipse 100% 80% at 50% -20%, rgba(216, 176, 74, 0.06) 0%, transparent 50%)',
          ].join(', '),
        }}
      />
      {/* Large, sparse pattern – one elegant motif per ~240px, very faint */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <pattern
            id="frameworks-royal-pattern"
            x="0"
            y="0"
            width="280"
            height="280"
            patternUnits="userSpaceOnUse"
          >
            {/* Single large diamond – royal, minimal, one per tile */}
            <path
              d="M140 25 L255 140 L140 255 L25 140 Z"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
              strokeLinejoin="round"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#frameworks-royal-pattern)" />
      </svg>
      <div className="relative z-10 mx-auto max-w-7xl">
        <FadeInUp>
          <h2 className="text-center text-section font-bold tracking-royal text-white">
            {t.title}
          </h2>
        </FadeInUp>
        
        {'subtitle' in t && (
          <FadeInUp delay={0.1}>
            <p className="mt-4 text-center text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
              {(t as { subtitle?: string }).subtitle}
            </p>
          </FadeInUp>
        )}
        
        <div className="grid gap-10 lg:gap-14 mt-16 lg:mt-20 lg:grid-cols-3">
          <FloatingCard delay={0.2}>
            <div className="p-10 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm h-full flex flex-col min-h-[340px] shadow-xl">
              <div className="flex items-start gap-5 pb-5 border-b border-white/20 shrink-0">
                <IconNCA />
                <div>
                  <h3 className="text-xl font-bold text-white tracking-royal">{nca.name}</h3>
                  <p className="text-sm font-semibold text-accent mt-1.5">{nca.tagline}</p>
                </div>
              </div>
              <div className="mt-6 flex-1 min-h-0">
                <CardContent points={nca.points} desc={nca.desc} isRtl={locale === 'ar'} />
              </div>
              <div className="mt-5 shrink-0 rounded-xl bg-white/10 border border-white/20 px-5 py-4 pt-3">
                <p className="text-xs font-semibold text-accent/90 uppercase tracking-widest mb-1.5">{forLabel}</p>
                <p className="text-[15px] text-white/95 leading-snug">{nca.for}</p>
              </div>
            </div>
          </FloatingCard>
          
          <FloatingCard delay={0.3}>
            <div className="p-10 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm h-full flex flex-col min-h-[340px] shadow-xl">
              <div className="flex items-start gap-5 pb-5 border-b border-white/20 shrink-0">
                <IconSAMA />
                <div>
                  <h3 className="text-xl font-bold text-white tracking-royal">{sama.name}</h3>
                  <p className="text-sm font-semibold text-accent mt-1.5">{sama.tagline}</p>
                </div>
              </div>
              <div className="mt-6 flex-1 min-h-0">
                <CardContent points={sama.points} desc={sama.desc} isRtl={locale === 'ar'} />
              </div>
              <div className="mt-5 shrink-0 rounded-xl bg-white/10 border border-white/20 px-5 py-4 pt-3">
                <p className="text-xs font-semibold text-accent/90 uppercase tracking-widest mb-1.5">{forLabel}</p>
                <p className="text-[15px] text-white/95 leading-snug">{sama.for}</p>
              </div>
            </div>
          </FloatingCard>
          
          {sdaia && (
            <FloatingCard delay={0.4}>
              <div className="p-10 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm h-full flex flex-col min-h-[340px] shadow-xl">
                <div className="flex items-start gap-5 pb-5 border-b border-white/20 shrink-0">
                  <IconSDAIA />
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-royal">{sdaia.name}</h3>
                    <p className="text-sm font-semibold text-accent mt-1.5">{sdaia.tagline}</p>
                  </div>
                </div>
                <div className="mt-6 flex-1 min-h-0">
                  <CardContent points={sdaia.points} desc={sdaia.desc} isRtl={locale === 'ar'} />
                </div>
                <div className="mt-5 shrink-0 rounded-xl bg-white/10 border border-white/20 px-5 py-4 pt-3">
                  <p className="text-xs font-semibold text-accent/90 uppercase tracking-widest mb-1.5">{forLabel}</p>
                  <p className="text-[15px] text-white/95 leading-snug">{sdaia.for}</p>
                </div>
              </div>
            </FloatingCard>
          )}
        </div>
      </div>
    </section>
  )
}
