'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'
import { FadeInUp } from './animations/FadeInUp'
import { StaggerChildren, StaggerItem } from './animations/StaggerChildren'
import { useSectionTracking } from '@/lib/hooks/useAnalytics'

function IconCheck({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}
function IconAlert({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  )
}
function IconSparkles({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  )
}
function IconFileSearch({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )
}
function IconChat({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  )
}
function IconClipboardCheck({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  )
}
function IconChartBar({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  )
}
function IconLink({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  )
}

export function AICapabilities() {
  const { locale } = useLocale()
  const content = getContent(locale) as {
    aiCapabilities?: {
      title: string
      subtitle: string
      items: Array<{
        title: string
        tagline: string
        painTitle: string
        painPoints: string[]
        benefitTitle: string
        benefits: string[]
      }>
    }
  }
  const t = content.aiCapabilities
  const sectionRef = useSectionTracking('aiCapabilities')

  if (!t?.items?.length) return null

  // Single active card for expansion (only one can be expanded at a time)
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [drawerEntered, setDrawerEntered] = useState(false)
  const [drawerClosing, setDrawerClosing] = useState(false)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout>>()

  // Toggle card expansion (functional update avoids stale closure)
  const toggleCard = useCallback((index: number) => {
    setActiveCard(prev => (prev === index ? null : index))
  }, [])

  // Drawer enter animation: start off-screen then slide in
  useEffect(() => {
    if (activeCard !== null) {
      setDrawerClosing(false)
      setDrawerEntered(false)
      const t = requestAnimationFrame(() => {
        requestAnimationFrame(() => setDrawerEntered(true))
      })
      return () => cancelAnimationFrame(t)
    } else {
      setDrawerEntered(false)
    }
  }, [activeCard])

  // Close drawer: slide out then clear state
  const closeDrawer = useCallback(() => {
    setDrawerClosing(true)
    closeTimeoutRef.current = setTimeout(() => {
      setActiveCard(null)
      setDrawerClosing(false)
    }, 300)
  }, [])

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    }
  }, [])

  // Close drawer on Escape
  useEffect(() => {
    if (activeCard === null) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [activeCard, closeDrawer])

  // Lock body scroll when drawer is open
  useEffect(() => {
    const open = activeCard !== null || drawerClosing
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeCard, drawerClosing])

  // Short summaries for collapsed state
  const getPainSummary = (index: number): string => {
    const summaries = [
      "Manual evidence validation is slow and error-prone",
      "Writing findings takes too long and must be regulator-ready",
      "Auditors lack quick access to framework guidance",
      "Hard to assess audit readiness before submission",
      "Dashboard data lacks actionable insights",
      "Remediation and document mapping is manual and slow"
    ]
    return summaries[index] || "Pain point summary"
  }

  const icons = [IconFileSearch, IconSparkles, IconChat, IconClipboardCheck, IconChartBar, IconLink] as const

  return (
    <section
      ref={sectionRef}
      id="ai-capabilities"
      className={`relative scroll-mt-16 overflow-hidden px-6 py-20 sm:px-8 sm:py-28 ${locale === 'ar' ? 'rtl' : 'ltr'}`}
    >
      <div
        className="absolute inset-0"
        style={{
          background: [
            'linear-gradient(165deg, #f2f5f4 0%, #e8efe9 35%, #dce8e2 70%, #d0e2da 100%)',
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(11, 70, 52, 0.06) 0%, transparent 55%)',
            'radial-gradient(ellipse 60% 40% at 20% 100%, rgba(216, 176, 74, 0.06) 0%, transparent 50%)',
          ].join(', '),
        }}
      />
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <pattern id="ai-cap-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M50 4 L96 50 L50 96 L4 50 Z" fill="none" stroke="rgb(11 70 52)" strokeWidth="0.35" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ai-cap-pattern)" />
      </svg>

      <div className="relative z-10 mx-auto max-w-6xl">
        <FadeInUp>
          <div className="text-center">
            <div className="mx-auto w-16 h-1 rounded-full bg-accent" />
            <h2 className="mt-4 font-bold text-section tracking-royal text-primary">{t.title}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-primary/80">{t.subtitle}</p>
          </div>
        </FadeInUp>

        <StaggerChildren className="grid grid-cols-1 gap-8 mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((item, i) => {
            const Icon = icons[i] ?? IconSparkles
            const isActive = activeCard === i

            return (
              <StaggerItem key={i}>
                <div className={`flex flex-col h-full min-h-[340px] rounded-2xl border-2 bg-white/95 shadow-xl backdrop-blur-sm transition-all duration-300 border-accent/20 hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/10 ${isActive ? 'ring-2 border-accent ring-accent/30' : ''} ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                  {/* Header */}
                  <div className="px-6 py-5 bg-gradient-to-r via-white border-b border-accent/20 from-accent/10 to-accent/5">
                    <div className="flex gap-4 items-start">
                      <div className="flex justify-center items-center w-12 h-12 rounded-xl ring-2 shrink-0 bg-accent/20 text-accent ring-accent/30">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold tracking-royal text-primary">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm text-primary/75">{item.tagline}</p>
                      </div>
                    </div>
                  </div>

                  {/* Pain: one-line summary only (full list is in the expansion panel) */}
                  <div className="flex-1 px-6 py-5 border-b border-primary/10 min-h-[100px]">
                    <div className="flex gap-2 items-center text-sm font-bold tracking-wider uppercase text-primary/90">
                      <IconAlert className="w-4 h-4 text-amber-600 shrink-0" />
                      {item.painTitle}
                    </div>
                    <div className="mt-3">
                      <div className="flex gap-2 text-sm text-primary/80">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/80" />
                        <span>{getPainSummary(i)}</span>
                      </div>
                    </div>
                  </div>

                  {/* How we help + View details (opens drawer) */}
                  <div className="px-6 py-5">
                    <div className="flex gap-2 items-center mb-3 text-sm font-bold tracking-wider uppercase text-accent">
                      <IconCheck className="w-4 h-4 shrink-0" />
                      {item.benefitTitle}
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleCard(i)}
                      className="inline-flex gap-2 items-center rounded-full border-2 border-accent/40 bg-accent/10 px-4 py-2.5 text-sm font-semibold text-accent transition-colors duration-200 hover:bg-accent/20 hover:border-accent/60"
                      aria-expanded={isActive}
                      aria-controls={isActive ? 'ai-capability-detail-panel' : undefined}
                    >
                      <span>{locale === 'ar' ? 'عرض التفاصيل' : 'View details'}</span>
                      {locale === 'ar' ? (
                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerChildren>

        {/* Right-side drawer - portaled to body so it sits above header navbar */}
        {(activeCard !== null || drawerClosing) &&
          typeof document !== 'undefined' &&
          createPortal(
            <>
              {/* Backdrop: click outside to close */}
              <div
                role="presentation"
                className={`fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
                  drawerClosing ? 'opacity-0' : 'opacity-100'
                }`}
                onClick={closeDrawer}
                aria-hidden
              />

              {/* Drawer panel - slides in from the right (or left in RTL) */}
              <div
                id="ai-capability-detail-panel"
                role="dialog"
                aria-modal="true"
                aria-label="Capability details"
                className={`fixed top-0 bottom-0 z-[9999] w-full max-w-md sm:max-w-lg bg-white shadow-2xl overflow-y-auto transition-transform duration-300 ease-out ${
                locale === 'ar' ? 'left-0' : 'right-0'
              } ${
                drawerEntered && !drawerClosing
                  ? 'translate-x-0'
                  : locale === 'ar'
                    ? '-translate-x-full'
                    : 'translate-x-full'
              }`}
              onClick={e => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 border-b-2 border-accent/30 bg-white pr-14 py-4 pl-6 shadow-md">
                <h3 className={`text-lg font-bold text-primary min-w-0 truncate ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                  {activeCard !== null ? t.items[activeCard].title : ''}
                </h3>
                {/* Close button fixed to top-right corner of drawer */}
                <button
                  type="button"
                  onClick={closeDrawer}
                  className={`absolute top-4 w-10 h-10 flex items-center justify-center rounded-full border-2 border-accent bg-accent/15 text-accent transition-colors hover:bg-accent/25 hover:border-accent ${locale === 'ar' ? 'left-4' : 'right-4'}`}
                  aria-label="Close drawer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                {activeCard !== null && (
                  <div className={`space-y-8 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                    {/* Pain Points */}
                    <div>
                      <div className="flex gap-2 items-center mb-4 text-sm font-bold tracking-wider uppercase text-primary/90">
                        <IconAlert className="w-5 h-5 text-amber-600 shrink-0" />
                        {t.items[activeCard].painTitle}
                      </div>
                      <ul className="space-y-3">
                        {t.items[activeCard].painPoints.map((point, j) => (
                          <li key={j} className="flex gap-2 text-sm text-primary/80">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/80" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Benefits */}
                    <div>
                      <div className="flex gap-2 items-center mb-4 text-sm font-bold tracking-wider uppercase text-accent">
                        <IconCheck className="w-5 h-5 shrink-0" />
                        {t.items[activeCard].benefitTitle}
                      </div>
                      <ul className="space-y-3">
                        {t.items[activeCard].benefits.map((benefit, j) => (
                          <li key={j} className="flex gap-2 text-sm text-primary/85">
                            <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
            </>,
            document.body
          )}
      </div>
    </section>
  )
}
