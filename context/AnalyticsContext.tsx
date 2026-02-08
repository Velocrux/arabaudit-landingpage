'use client'

import React, { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import {
  trackPageView,
  trackSectionView,
  trackButtonClick,
  trackNavigationClick,
  trackLanguageChange,
  trackScrollDepth,
  trackFormEvent,
  trackDemoRequest,
  identifyUser,
  setUserProperties,
  startPageTimer,
  getCurrentScrollDepth
} from '../lib/analytics/events'
import type { SectionName } from '../lib/analytics/types'
import { useLocale } from './LocaleContext'

export interface AnalyticsContextValue {
  // Page tracking
  trackPageView: () => void

  // Section tracking
  trackSectionView: (sectionName: SectionName) => void

  // Button tracking
  trackButtonClick: (
    buttonText: string,
    buttonType: 'primary' | 'secondary' | 'tertiary',
    buttonLocation: string,
    additionalProps?: Record<string, any>
  ) => void

  // Navigation tracking
  trackNavigationClick: (
    navType: 'header_link' | 'mobile_menu' | 'logo_click' | 'contact_link',
    linkText: string,
    linkHref: string,
    additionalProps?: Record<string, any>
  ) => void

  // Language tracking
  trackLanguageChange: (
    previousLanguage: string,
    newLanguage: string,
    changeMethod?: 'toggle' | 'auto'
  ) => void

  // Scroll tracking
  trackScrollDepth: (scrollPercentage: number) => void

  // Form tracking
  trackFormEvent: (
    action: 'open' | 'close' | 'submit_attempt' | 'submit_success' | 'abandon' | 'field_focus' | 'field_blur' | 'validation_error',
    fieldName?: string,
    additionalProps?: Record<string, any>
  ) => void

  // Demo request tracking
  trackDemoRequest: (
    formData: {
      firstName: string
      lastName: string
      email: string
      organization: string
      industry: string
      phone: string
    },
    sectionsViewed: SectionName[],
    timeToConversion: number,
    formCompletionTime: number
  ) => void

  // User identification
  identifyUser: (email: string, properties?: Record<string, any>) => void
  setUserProperties: (properties: Record<string, any>) => void

  // Utility functions
  getTimeOnPage: () => number
  getCurrentScrollDepth: () => number
  isInitialized: boolean

  // Session info
  sectionsViewed: SectionName[]
  sessionStartTime: number
}

const AnalyticsContext = createContext<AnalyticsContextValue | null>(null)

interface AnalyticsProviderProps {
  children: ReactNode
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const { locale } = useLocale()
  const [isInitialized, setIsInitialized] = useState(false)
  const [sectionsViewed, setSectionsViewed] = useState<SectionName[]>([])
  const pageTimerRef = useRef<(() => number) | null>(null)
  const sessionStartTime = useRef<number>(Date.now())

  // Initialize analytics on mount
  useEffect(() => {
    // Start page timer
    pageTimerRef.current = startPageTimer()

    // Track initial page view after a short delay to ensure everything is loaded
    const timer = setTimeout(() => {
      trackPageView()
      setIsInitialized(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Track language changes
  useEffect(() => {
    if (!isInitialized) return

    // Skip initial load
    const stored = localStorage.getItem('arabaudit-locale')
    if (stored && (stored === 'en' || stored === 'ar')) {
      const previousLanguage = stored === 'en' ? 'ar' : 'en'
      if (previousLanguage !== locale) {
        trackLanguageChange(previousLanguage, locale, 'auto')
      }
    }
  }, [locale, isInitialized])

  const handleTrackSectionView = useCallback((sectionName: SectionName) => {
    if (!isInitialized) return

    setSectionsViewed(prev => {
      if (!prev.includes(sectionName)) {
        return [...prev, sectionName]
      }
      return prev
    })

    trackSectionView(sectionName)
  }, [isInitialized])

  const handleTrackButtonClick = useCallback((
    buttonText: string,
    buttonType: 'primary' | 'secondary' | 'tertiary',
    buttonLocation: string,
    additionalProps?: Record<string, any>
  ) => {
    if (!isInitialized) return

    trackButtonClick(buttonText, buttonType, buttonLocation, {
      language: locale,
      ...additionalProps
    })
  }, [isInitialized, locale])

  const handleTrackNavigationClick = useCallback((
    navType: 'header_link' | 'mobile_menu' | 'logo_click' | 'contact_link',
    linkText: string,
    linkHref: string,
    additionalProps?: Record<string, any>
  ) => {
    if (!isInitialized) return

    trackNavigationClick(navType, linkText, linkHref, {
      language: locale,
      ...additionalProps
    })
  }, [isInitialized, locale])

  const handleTrackLanguageChange = useCallback((
    previousLanguage: string,
    newLanguage: string,
    changeMethod: 'toggle' | 'auto' = 'toggle'
  ) => {
    if (!isInitialized) return

    trackLanguageChange(previousLanguage, newLanguage, changeMethod)
  }, [isInitialized])

  const handleTrackScrollDepth = useCallback((scrollPercentage: number) => {
    if (!isInitialized) return

    trackScrollDepth(scrollPercentage, {
      language: locale
    })
  }, [isInitialized, locale])

  const handleTrackFormEvent = useCallback((
    action: 'open' | 'close' | 'submit_attempt' | 'submit_success' | 'abandon' | 'field_focus' | 'field_blur' | 'validation_error',
    fieldName?: string,
    additionalProps?: Record<string, any>
  ) => {
    if (!isInitialized) return

    trackFormEvent('demo_request', action, {
      field_name: fieldName,
      language: locale,
      sections_viewed: sectionsViewed,
      time_in_form: additionalProps?.timeInForm || 0,
      ...additionalProps
    })
  }, [isInitialized, locale, sectionsViewed])

  const handleTrackDemoRequest = useCallback((
    formData: {
      firstName: string
      lastName: string
      email: string
      organization: string
      industry: string
      phone: string
    },
    sectionsViewed: SectionName[],
    timeToConversion: number,
    formCompletionTime: number
  ) => {
    if (!isInitialized) return

    trackDemoRequest(formData, sectionsViewed, timeToConversion, formCompletionTime, {
      language: locale
    })

    // Identify user after successful demo request
    identifyUser(formData.email, {
      $name: `${formData.firstName} ${formData.lastName}`,
      $phone: formData.phone,
      organization: formData.organization,
      industry: formData.industry,
      preferred_language: locale,
      first_seen: new Date().toISOString(),
      demo_requested: true,
      demo_requested_at: new Date().toISOString(),
      total_page_views: 1,
      total_sessions: 1
    })
  }, [isInitialized, locale])

  const handleIdentifyUser = useCallback((email: string, properties?: Record<string, any>) => {
    identifyUser(email, properties)
  }, [])

  const handleSetUserProperties = useCallback((properties: Record<string, any>) => {
    setUserProperties(properties)
  }, [])

  const getTimeOnPage = useCallback(() => {
    return pageTimerRef.current ? pageTimerRef.current() : 0
  }, [])

  const getCurrentScrollDepth = useCallback(() => {
    return getCurrentScrollDepth()
  }, [])

  const contextValue: AnalyticsContextValue = {
    trackPageView,
    trackSectionView: handleTrackSectionView,
    trackButtonClick: handleTrackButtonClick,
    trackNavigationClick: handleTrackNavigationClick,
    trackLanguageChange: handleTrackLanguageChange,
    trackScrollDepth: handleTrackScrollDepth,
    trackFormEvent: handleTrackFormEvent,
    trackDemoRequest: handleTrackDemoRequest,
    identifyUser: handleIdentifyUser,
    setUserProperties: handleSetUserProperties,
    getTimeOnPage,
    getCurrentScrollDepth,
    isInitialized,
    sectionsViewed,
    sessionStartTime: sessionStartTime.current
  }

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export { AnalyticsContext }