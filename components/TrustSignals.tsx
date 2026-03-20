'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotionSafe } from '@/lib/hooks/useReducedMotionSafe'
import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'
import { useSectionTracking } from '@/lib/hooks/useAnalytics'
import Image from 'next/image'

const ease = [0.25, 0.1, 0.25, 1] as const

export function TrustSignals() {
  const { locale } = useLocale()
  const t = getContent(locale).trustSignals
  const trustSignalsRef = useSectionTracking('trust_signals')
  const reduce = useReducedMotionSafe()

  const badgeImages: Record<number, string | undefined> = {
    0: '/images/NCA.png',
    1: '/images/SAMA.jpeg',
    2: '/images/SDAIA.jpeg',
    3: '/images/tour.png',
  }
  const badges = (t.badges as Array<{ framework: string; title: string; desc: string }>).map((b, i) => ({
    ...b,
    image: badgeImages[i],
  }))

  const titleWords = useMemo(() => t.title.split(/\s+/).filter(Boolean), [t.title])
  const subtitleWords = useMemo(() => t.subtitle.split(/\s+/).filter(Boolean), [t.subtitle])

  return (
    <section
      ref={trustSignalsRef}
      className="relative scroll-mt-16 overflow-hidden bg-gradient-to-b from-primary/5 via-primary/10 to-base px-4 py-16 sm:px-6 sm:py-20"
    >
      {/* Subtle shifting wash (matches Hero depth) */}
      <div
        className="pointer-events-none absolute inset-0 animate-gradient-shift opacity-40"
        style={{
          background:
            'linear-gradient(118deg, rgba(11,70,52,0.06) 0%, rgba(216,176,74,0.07) 45%, rgba(11,70,52,0.05) 100%)',
          backgroundSize: '200% 200%',
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl text-center">
        <h2 className="font-bold text-primary text-hero tracking-royal">
          {titleWords.map((word, i) => (
            <span key={`${word}-${i}`} className="inline-block">
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: reduce ? 0.01 : 0.5,
                  delay: reduce ? 0 : i * 0.04,
                  ease,
                }}
              >
                {word}
              </motion.span>
              {i < titleWords.length - 1 ? '\u00A0' : ''}
            </span>
          ))}
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-lg text-primary/80">
          {subtitleWords.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              className="inline-block"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{
                duration: reduce ? 0.01 : 0.38,
                delay: reduce ? 0 : 0.08 + i * 0.025,
                ease,
              }}
            >
              {word}
              {i < subtitleWords.length - 1 ? '\u00A0' : ''}
            </motion.span>
          ))}
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map((badge, i) => {
            const isTour = i === 3
            const imageAlt = `${badge.framework} — ${badge.title}`

            return (
              <motion.article
                key={i}
                className="group relative h-full"
                initial={{ opacity: 0, y: 32, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  type: 'spring',
                  stiffness: reduce ? 500 : 320,
                  damping: reduce ? 60 : 28,
                  delay: reduce ? 0 : 0.1 + i * 0.08,
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
                <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-primary/15 bg-white p-6 shadow-lg transition-[border-color,box-shadow] duration-300 group-hover:border-accent/40 group-hover:shadow-xl group-hover:shadow-accent/10 sm:p-6">
                  {/* Top accent sweep on card hover */}
                  <div
                    className="absolute inset-x-0 top-0 h-0.5 origin-center scale-x-0 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-[transform,opacity] duration-300 ease-out group-hover:scale-x-100 group-hover:opacity-100"
                    aria-hidden
                  />

                  <div
                    className={`flex items-center gap-4 ${locale === 'ar' ? 'flex-row-reverse text-right' : 'text-left'}`}
                  >
                    <motion.div
                      className={`flex shrink-0 items-center justify-center rounded-xl bg-primary/10 ring-2 ring-primary/20 transition-colors group-hover:bg-accent/15 group-hover:ring-accent/30 ${isTour ? 'h-16 w-16' : 'h-14 w-14'}`}
                      whileHover={reduce ? undefined : { scale: 1.06 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      {badge.image ? (
                        <Image
                          src={badge.image}
                          alt={imageAlt}
                          width={isTour ? 56 : 40}
                          height={isTour ? 56 : 40}
                          className={
                            isTour
                              ? 'h-12 w-12 object-contain sm:h-14 sm:w-14'
                              : 'max-h-10 max-w-10 object-contain'
                          }
                        />
                      ) : (
                        <svg
                          className="h-8 w-8 text-accent"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      )}
                    </motion.div>
                    <div className="min-w-0 flex-1">
                      <motion.span
                        className="inline-block text-[10px] font-semibold uppercase tracking-wider text-primary/70"
                        initial={{ opacity: 0, x: locale === 'ar' ? 8 : -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: reduce ? 0 : 0.2 + i * 0.06,
                          duration: 0.35,
                          ease,
                        }}
                      >
                        {badge.framework}
                      </motion.span>
                      <motion.h3
                        className="mt-0.5 text-base font-bold leading-tight text-primary sm:text-lg"
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: reduce ? 0 : 0.26 + i * 0.06,
                          duration: 0.4,
                          ease,
                        }}
                      >
                        {badge.title}
                      </motion.h3>
                    </div>
                  </div>

                  <motion.p
                    className={`mt-4 flex-1 text-sm leading-relaxed text-gray-700 ${locale === 'ar' ? 'text-right' : 'text-left'}`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: reduce ? 0 : 0.32 + i * 0.06,
                      duration: 0.45,
                      ease,
                    }}
                  >
                    {badge.desc}
                  </motion.p>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
