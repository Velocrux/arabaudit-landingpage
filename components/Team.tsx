'use client'

import Image from 'next/image'
import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'
import { FadeInUp } from './animations/FadeInUp'
import { FloatingCard } from './animations/FloatingCard'

export function Team() {
  const { locale } = useLocale()
  const t = getContent(locale).team

  return (
    <section className="relative scroll-mt-16 overflow-hidden px-6 py-20 sm:px-8 sm:py-28">
      {/* Royal gradient background */}
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

      {/* Elegant diamond pattern */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.03]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <pattern
            id="team-pattern"
            x="0"
            y="0"
            width="140"
            height="140"
            patternUnits="userSpaceOnUse"
          >
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
        {/* Header */}
        <div className="text-center">
          <FadeInUp>
            <div className="mx-auto h-1 w-16 rounded-full bg-accent" />
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h2 className="mt-4 text-section font-bold tracking-royal text-primary">
              {t.title}
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-primary/80 leading-relaxed">
              {t.subtitle}
            </p>
          </FadeInUp>
        </div>

        {/* Team Members */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto">
          {t.members.map((member, i) => (
            <FloatingCard key={i} delay={0.3 + i * 0.05}>
              <div className="relative overflow-hidden rounded-2xl border-2 border-accent/30 bg-white p-6 sm:p-8 shadow-premium transition-all duration-300 hover:border-accent hover:shadow-gold h-full flex flex-col">
                {/* Gold accent corner */}
                <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-accent/10 to-transparent" />

                <div className="relative flex flex-col items-center text-center flex-1">
                  {/* Photo */}
                  <div className="relative mb-6">
                    <div className="relative h-36 w-36 sm:h-40 sm:w-40 overflow-hidden rounded-full border-4 border-accent/20 shadow-lg transition-transform duration-300 hover:scale-105">
                      {member.image && member.image.startsWith('/') ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/20 via-accent/10 to-primary/5">
                          <span className="text-4xl sm:text-5xl font-bold text-accent tracking-wider">
                            {member.image || member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      )}
                    </div>
                    {/* Gold ring accent */}
                    <div className="absolute -bottom-2 -right-2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 border-accent bg-accent/10 shadow-md">
                      <svg className="h-5 w-5 sm:h-6 sm:w-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Name & Role */}
                  <h3 className="text-xl sm:text-2xl font-bold text-primary">
                    {member.name}
                  </h3>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-accent">
                    {member.role}
                  </p>

                  {/* Bio */}
                  <p className="mt-6 text-sm leading-relaxed text-primary/80 flex-1">
                    {member.bio}
                  </p>

                  {/* LinkedIn Link - only when provided */}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-6 inline-flex items-center gap-2 rounded-lg border-2 border-primary/20 bg-primary/5 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-primary transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:shadow-md"
                    >
                      <svg className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:scale-110 shrink-0 text-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      <span className="text-primary">Connect on LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>
            </FloatingCard>
          ))}
        </div>
      </div>
    </section>
  )
}
