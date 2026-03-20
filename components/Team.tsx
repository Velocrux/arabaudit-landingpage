'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useReducedMotionSafe } from '@/lib/hooks/useReducedMotionSafe'
import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'
import { useSectionTracking } from '@/lib/hooks/useAnalytics'

const ease = [0.25, 0.1, 0.25, 1] as const

export function Team() {
  const { locale } = useLocale()
  const reduce = useReducedMotionSafe()
  const t = getContent(locale).team as {
    title: string
    subtitle: string
    connectLinkedIn?: string
    members: Array<{
      name: string
      role: string
      bio: string
      image: string
      linkedin: string
    }>
  }
  const teamRef = useSectionTracking('team')
  const isRTL = locale === 'ar'
  const linkedInLabel = t.connectLinkedIn ?? (isRTL ? 'تواصل عبر لينكدإن' : 'Connect on LinkedIn')

  const titleWords = useMemo(() => t.title.split(/\s+/).filter(Boolean), [t.title])
  const subtitleWords = useMemo(() => t.subtitle.split(/\s+/).filter(Boolean), [t.subtitle])

  return (
    <section
      ref={teamRef}
      className={`relative scroll-mt-16 overflow-hidden px-6 py-20 sm:px-8 sm:py-28 ${isRTL ? 'rtl' : 'ltr'}`}
    >
      <div
        className="absolute inset-0"
        style={{
          background: [
            'linear-gradient(165deg, #f8faf9 0%, #f0f4f1 35%, #e4ede7 70%, #d8e7de 100%)',
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(11, 70, 52, 0.05) 0%, transparent 60%)',
            'radial-gradient(ellipse 50% 40% at 90% 100%, rgba(216, 176, 74, 0.04) 0%, transparent 50%)',
          ].join(', '),
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-[1] animate-gradient-shift opacity-35"
        style={{
          background:
            'linear-gradient(118deg, rgba(11,70,52,0.04) 0%, rgba(216,176,74,0.05) 45%, rgba(11,70,52,0.03) 100%)',
          backgroundSize: '200% 200%',
        }}
        aria-hidden
      />

      <svg
        className="absolute inset-0 z-[1] h-full w-full opacity-[0.03]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <pattern id="team-pattern" x="0" y="0" width="140" height="140" patternUnits="userSpaceOnUse">
            <path
              d="M70 10 L130 70 L70 130 L10 70 Z"
              fill="none"
              stroke="rgb(11 70 52)"
              strokeWidth="0.35"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#team-pattern)" />
      </svg>

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="text-center">
          <motion.div
            className="mx-auto h-1 w-16 origin-center rounded-full bg-accent"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: reduce ? 0.01 : 0.45, ease }}
          />
          <h2 className="mt-4 text-section font-bold tracking-royal text-primary">
            {titleWords.map((word, i) => (
              <span key={`${word}-${i}`} className="inline-block">
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: reduce ? 0.01 : 0.45,
                    delay: reduce ? 0 : 0.06 + i * 0.035,
                    ease,
                  }}
                >
                  {word}
                </motion.span>
                {i < titleWords.length - 1 ? '\u00A0' : ''}
              </span>
            ))}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-primary/80">
            {subtitleWords.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                className="inline-block"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  duration: reduce ? 0.01 : 0.38,
                  delay: reduce ? 0 : 0.1 + i * 0.022,
                  ease,
                }}
              >
                {word}
                {i < subtitleWords.length - 1 ? '\u00A0' : ''}
              </motion.span>
            ))}
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
          {t.members.map((member, i) => (
            <motion.article
              key={`${member.name}-${i}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-accent/30 bg-white p-6 shadow-premium transition-[border-color,box-shadow] duration-300 hover:border-accent hover:shadow-gold sm:p-8"
              initial={{ opacity: 0, y: 28, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                type: 'spring',
                stiffness: reduce ? 500 : 300,
                damping: reduce ? 55 : 26,
                delay: reduce ? 0 : 0.08 + i * 0.07,
              }}
              whileHover={
                reduce
                  ? undefined
                  : {
                      y: -6,
                      transition: { type: 'spring', stiffness: 400, damping: 22 },
                    }
              }
            >
              <div
                className="absolute inset-x-0 top-0 z-[1] h-0.5 origin-center scale-x-0 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-[transform,opacity] duration-300 ease-out group-hover:scale-x-100 group-hover:opacity-100"
                aria-hidden
              />

              <div className="pointer-events-none absolute end-0 top-0 h-24 w-24 bg-gradient-to-bl from-accent/10 to-transparent" />

              <div className="relative flex flex-1 flex-col items-center text-center">
                <div className="relative mb-6">
                  <motion.div
                    className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-accent/20 shadow-lg sm:h-40 sm:w-40"
                    whileHover={reduce ? undefined : { scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                  >
                    {member.image && member.image.startsWith('/') ? (
                      <Image src={member.image} alt={member.name} fill className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/20 via-accent/10 to-primary/5">
                        <span className="text-4xl font-bold tracking-wider text-accent sm:text-5xl">
                          {member.image || member.name.split(' ').map((n) => n[0]).join('')}
                        </span>
                      </div>
                    )}
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-2 -end-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-accent bg-accent/10 shadow-md sm:h-12 sm:w-12"
                    initial={{ scale: 0.85, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: reduce ? 0 : 0.2 + i * 0.05, type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    <svg
                      className="h-5 w-5 text-accent sm:h-6 sm:w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                </div>

                <motion.h3
                  className="text-xl font-bold text-primary sm:text-2xl"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: reduce ? 0 : 0.12 + i * 0.04, duration: 0.4, ease }}
                >
                  {member.name}
                </motion.h3>
                <motion.p
                  className="mt-2 text-sm font-semibold uppercase tracking-wider text-accent"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: reduce ? 0 : 0.16 + i * 0.04, duration: 0.35 }}
                >
                  {member.role}
                </motion.p>

                <motion.p
                  className="mt-6 flex-1 text-sm leading-relaxed text-primary/80"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: reduce ? 0 : 0.2 + i * 0.04, duration: 0.45, ease }}
                >
                  {member.bio}
                </motion.p>

                {member.linkedin ? (
                  <motion.a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-lg border-2 border-primary/20 bg-primary/5 px-4 py-2.5 text-sm font-semibold text-primary transition-colors duration-300 hover:border-accent hover:bg-accent/10 hover:shadow-md hover:[&_svg]:scale-110 sm:px-6 sm:py-3 sm:text-base"
                    aria-label={`${linkedInLabel} — ${member.name}`}
                    whileTap={{ scale: 0.98 }}
                    whileHover={reduce ? undefined : { scale: 1.02 }}
                  >
                    <svg
                      className="h-4 w-4 shrink-0 text-primary transition-transform sm:h-5 sm:w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    <span className="text-primary">{linkedInLabel}</span>
                  </motion.a>
                ) : null}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
