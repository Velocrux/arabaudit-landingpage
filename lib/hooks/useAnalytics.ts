'use client'

import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import type { SectionName } from '../analytics/types'
import type { AnalyticsContextValue } from '../../context/AnalyticsContext'

interface UseAnalyticsReturn {
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
}

export function useAnalytics(): UseAnalyticsReturn {
  const context = useContext(require('../../context/AnalyticsContext').AnalyticsContext)

  if (!context) {
    throw new Error('useAnalytics must be used within AnalyticsProvider')
  }

  const {
    trackPageView,
    trackSectionView: contextTrackSectionView,
    trackButtonClick: contextTrackButtonClick,
    trackNavigationClick: contextTrackNavigationClick,
    trackLanguageChange: contextTrackLanguageChange,
    trackScrollDepth: contextTrackScrollDepth,
    trackFormEvent: contextTrackFormEvent,
    trackDemoRequest: contextTrackDemoRequest,
    identifyUser: contextIdentifyUser,
    setUserProperties: contextSetUserProperties,
    getTimeOnPage,
    getCurrentScrollDepth,
    isInitialized
  } = context

  // Memoized callback functions to prevent unnecessary re-renders
  const memoizedTrackPageView = useCallback(() => {
    trackPageView()
  }, [trackPageView])

  const memoizedTrackSectionView = useCallback((sectionName: SectionName) => {
    contextTrackSectionView(sectionName)
  }, [contextTrackSectionView])

  const memoizedTrackButtonClick = useCallback((
    buttonText: string,
    buttonType: 'primary' | 'secondary' | 'tertiary',
    buttonLocation: string,
    additionalProps?: Record<string, any>
  ) => {
    contextTrackButtonClick(buttonText, buttonType, buttonLocation, additionalProps)
  }, [contextTrackButtonClick])

  const memoizedTrackNavigationClick = useCallback((
    navType: 'header_link' | 'mobile_menu' | 'logo_click' | 'contact_link',
    linkText: string,
    linkHref: string,
    additionalProps?: Record<string, any>
  ) => {
    contextTrackNavigationClick(navType, linkText, linkHref, additionalProps)
  }, [contextTrackNavigationClick])

  const memoizedTrackLanguageChange = useCallback((
    previousLanguage: string,
    newLanguage: string,
    changeMethod: 'toggle' | 'auto' = 'toggle'
  ) => {
    contextTrackLanguageChange(previousLanguage, newLanguage, changeMethod)
  }, [contextTrackLanguageChange])

  const memoizedTrackScrollDepth = useCallback((scrollPercentage: number) => {
    contextTrackScrollDepth(scrollPercentage)
  }, [contextTrackScrollDepth])

  const memoizedTrackFormEvent = useCallback((
    action: 'open' | 'close' | 'submit_attempt' | 'submit_success' | 'abandon' | 'field_focus' | 'field_blur' | 'validation_error',
    fieldName?: string,
    additionalProps?: Record<string, any>
  ) => {
    contextTrackFormEvent(action, fieldName, additionalProps)
  }, [contextTrackFormEvent])

  const memoizedTrackDemoRequest = useCallback((
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
    contextTrackDemoRequest(formData, sectionsViewed, timeToConversion, formCompletionTime)
  }, [contextTrackDemoRequest])

  const memoizedIdentifyUser = useCallback((email: string, properties?: Record<string, any>) => {
    contextIdentifyUser(email, properties)
  }, [contextIdentifyUser])

  const memoizedSetUserProperties = useCallback((properties: Record<string, any>) => {
    contextSetUserProperties(properties)
  }, [contextSetUserProperties])

  const memoizedGetTimeOnPage = useCallback(() => {
    return getTimeOnPage()
  }, [getTimeOnPage])

  const memoizedGetCurrentScrollDepth = useCallback(() => {
    return getCurrentScrollDepth()
  }, [getCurrentScrollDepth])

  return {
    trackPageView: memoizedTrackPageView,
    trackSectionView: memoizedTrackSectionView,
    trackButtonClick: memoizedTrackButtonClick,
    trackNavigationClick: memoizedTrackNavigationClick,
    trackLanguageChange: memoizedTrackLanguageChange,
    trackScrollDepth: memoizedTrackScrollDepth,
    trackFormEvent: memoizedTrackFormEvent,
    trackDemoRequest: memoizedTrackDemoRequest,
    identifyUser: memoizedIdentifyUser,
    setUserProperties: memoizedSetUserProperties,
    getTimeOnPage: memoizedGetTimeOnPage,
    getCurrentScrollDepth: memoizedGetCurrentScrollDepth,
    isInitialized
  }
}

// Hook for tracking section visibility with Intersection Observer
export function useSectionTracking(sectionName: SectionName, threshold: number = 0.5) {
  const { trackSectionView } = useAnalytics()
  const [hasBeenTracked, setHasBeenTracked] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = sectionRef.current
    if (!element || hasBeenTracked) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasBeenTracked) {
            trackSectionView(sectionName)
            setHasBeenTracked(true)
            observer.disconnect()
          }
        })
      },
      { threshold }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [sectionName, threshold, trackSectionView, hasBeenTracked])

  return sectionRef
}

// Hook for tracking scroll depth milestones
export function useScrollDepthTracking(milestones: number[] = [25, 50, 75, 100]) {
  const { trackScrollDepth } = useAnalytics()
  const trackedMilestones = useRef<Set<number>>(new Set())

  useEffect(() => {
    const handleScroll = () => {
      const scrollDepth = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      )

      milestones.forEach(milestone => {
        if (scrollDepth >= milestone && !trackedMilestones.current.has(milestone)) {
          trackScrollDepth(milestone)
          trackedMilestones.current.add(milestone)
        }
      })
    }

    // Debounce scroll events
    let timeoutId: NodeJS.Timeout
    const debouncedHandleScroll = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(handleScroll, 100)
    }

    window.addEventListener('scroll', debouncedHandleScroll)
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll)
      clearTimeout(timeoutId)
    }
  }, [milestones, trackScrollDepth])
}

// Hook for tracking form field interactions
export function useFormFieldTracking(
  fieldName: string,
  onFocus?: () => void,
  onBlur?: () => void
) {
  const { trackFormEvent } = useAnalytics()

  const handleFocus = useCallback(() => {
    trackFormEvent('field_focus', fieldName)
    onFocus?.()
  }, [trackFormEvent, fieldName, onFocus])

  const handleBlur = useCallback(() => {
    trackFormEvent('field_blur', fieldName)
    onBlur?.()
  }, [trackFormEvent, fieldName, onBlur])

  return { handleFocus, handleBlur }
}