'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotionSafe } from '@/lib/hooks/useReducedMotionSafe'
import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'
import { useSectionTracking } from '@/lib/hooks/useAnalytics'

const ease = [0.25, 0.1, 0.25, 1] as const

function IconNCA() {
  return (
    <svg
      className="h-10 w-10 shrink-0 text-accent"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}
function IconSAMA() {
  return (
    <svg
      className="h-10 w-10 shrink-0 text-accent"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
    </svg>
  )
}
function IconSDAIA() {
  return (
    <svg
      className="h-10 w-10 shrink-0 text-accent"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
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
  reduce,
  staggerBase = 0,
}: {
  points?: string[]
  desc?: string
  className?: string
  isRtl?: boolean
  reduce: boolean
  staggerBase?: number
}) {
  if (points && points.length > 0) {
    return (
      <ul className={`flex-1 space-y-4 ${className}`} role="list">
        {points.map((point, i) => (
          <motion.li
            key={i}
            className={`flex gap-4 text-[15px] leading-[1.6] text-white/90 ${isRtl ? 'flex-row-reverse' : ''}`}
            initial={{ opacity: reduce ? 1 : 0, x: reduce ? 0 : isRtl ? 12 : -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{
              duration: reduce ? 0.01 : 0.38,
              delay: reduce ? 0 : staggerBase + i * 0.055,
              ease,
            }}
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/20 text-sm font-semibold text-accent">
              {i + 1}
            </span>
            <span className="pt-0.5">{point}</span>
          </motion.li>
        ))}
      </ul>
    )
  }
  if (desc) {
    return (
      <motion.p
        className={`flex-1 text-sm leading-relaxed text-white/90 ${className}`}
        initial={{ opacity: reduce ? 1 : 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: reduce ? 0.01 : 0.4, delay: staggerBase, ease }}
      >
        {desc}
      </motion.p>
    )
  }
  return null
}

type ColumnConfig = {
  Icon: () => JSX.Element
  data: FrameworkCard
}

export function Frameworks() {
  const { locale } = useLocale()
  const reduce = useReducedMotionSafe()
  const t = getContent(locale).frameworks
  const forLabel = 'forLabel' in t ? (t as { forLabel: string }).forLabel : 'Who must comply'
  const nca = t.nca as FrameworkCard
  const sama = t.sama as FrameworkCard
  const sdaia = 'sdaia' in t ? (t as { sdaia: FrameworkCard }).sdaia : null
  const subtitle = 'subtitle' in t ? (t as { subtitle?: string }).subtitle : undefined
  const frameworksRef = useSectionTracking('frameworks')
  const isRTL = locale === 'ar'

  const titleWords = useMemo(() => t.title.split(/\s+/).filter(Boolean), [t.title])
  const subtitleWords = useMemo(
    () => (subtitle ?? '').split(/\s+/).filter(Boolean),
    [subtitle]
  )

  const columns: ColumnConfig[] = useMemo(
    () => [
      { Icon: IconNCA, data: nca },
      { Icon: IconSAMA, data: sama },
      ...(sdaia ? [{ Icon: IconSDAIA, data: sdaia }] : []),
    ],
    [nca, sama, sdaia]
  )

  return (
    <section
      ref={frameworksRef}
      id="frameworks"
      className={`relative scroll-mt-16 overflow-hidden px-6 py-20 text-white sm:px-8 sm:py-28 md:py-32 ${isRTL ? 'rtl' : 'ltr'}`}
    >
      <div
        className="absolute inset-0"
        style={{
          background: [
            'linear-gradient(160deg, #0a3d2e 0%, #0B4634 35%, #082f24 70%, #051f18 100%)',
            'radial-gradient(ellipse 100% 80% at 50% -20%, rgba(216, 176, 74, 0.06) 0%, transparent 50%)',
          ].join(', '),
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-[1] animate-gradient-shift opacity-25"
        style={{
          background:
            'linear-gradient(118deg, rgba(216,176,74,0.07) 0%, rgba(255,255,255,0.04) 45%, rgba(216,176,74,0.05) 100%)',
          backgroundSize: '200% 200%',
        }}
        aria-hidden
      />

      <svg
        className="absolute inset-0 z-[1] h-full w-full opacity-[0.04]"
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
        <div className="text-center">
          <motion.div
            className="mx-auto h-1 w-16 origin-center rounded-full bg-accent"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: reduce ? 0.01 : 0.45, ease }}
          />
          <h2 className="mt-4 text-section font-bold tracking-royal text-white">
            {titleWords.map((word, i) => (
              <span key={`${word}-${i}`} className="inline-block">
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, y: 18 }}
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
        </div>

        {subtitleWords.length > 0 && (
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg leading-relaxed text-white/80">
            {subtitleWords.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                className="inline-block"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  duration: reduce ? 0.01 : 0.38,
                  delay: reduce ? 0 : 0.08 + i * 0.02,
                  ease,
                }}
              >
                {word}
                {i < subtitleWords.length - 1 ? '\u00A0' : ''}
              </motion.span>
            ))}
          </p>
        )}

        <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-3 lg:gap-14">
          {columns.map(({ Icon, data }, colIndex) => (
            <motion.article
              key={data.name}
              className="group relative flex min-h-[340px] flex-col overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-10 shadow-xl backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-accent/35 hover:shadow-2xl hover:shadow-accent/10"
              initial={{ opacity: 0, y: 32, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                type: 'spring',
                stiffness: reduce ? 500 : 300,
                damping: reduce ? 55 : 26,
                delay: reduce ? 0 : 0.12 + colIndex * 0.09,
              }}
              whileHover={
                reduce
                  ? undefined
                  : {
                      y: -8,
                      transition: { type: 'spring', stiffness: 400, damping: 22 },
                    }
              }
            >
              <div
                className="absolute inset-x-0 top-0 z-[1] h-0.5 origin-center scale-x-0 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-[transform,opacity] duration-300 ease-out group-hover:scale-x-100 group-hover:opacity-100"
                aria-hidden
              />

              <div
                className={`flex shrink-0 items-start gap-5 border-b border-white/20 pb-5 ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <motion.div
                  whileHover={reduce ? undefined : { scale: 1.06 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                >
                  <Icon />
                </motion.div>
                <div className="min-w-0 flex-1">
                  <motion.h3
                    className="text-xl font-bold tracking-royal text-white"
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: reduce ? 0 : 0.15 + colIndex * 0.05,
                      duration: 0.4,
                      ease,
                    }}
                  >
                    {data.name}
                  </motion.h3>
                  <motion.p
                    className="mt-1.5 text-sm font-semibold text-accent"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: reduce ? 0 : 0.2 + colIndex * 0.05, duration: 0.35 }}
                  >
                    {data.tagline}
                  </motion.p>
                </div>
              </div>

              <div className="mt-6 min-h-0 flex-1">
                <CardContent
                  points={data.points}
                  desc={data.desc}
                  isRtl={isRTL}
                  reduce={!!reduce}
                  staggerBase={0.22 + colIndex * 0.06}
                />
              </div>

              <motion.div
                className="mt-5 shrink-0 rounded-xl border border-white/20 bg-white/10 px-5 py-4 pt-3"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: reduce ? 0 : 0.35 + colIndex * 0.06,
                  duration: 0.42,
                  ease,
                }}
              >
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-accent/90">{forLabel}</p>
                <p className="text-[15px] leading-snug text-white/95">{data.for}</p>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
