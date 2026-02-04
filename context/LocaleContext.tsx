'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react'

export type Locale = 'en' | 'ar'

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  dir: 'ltr' | 'rtl'
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')
  const [mounted, setMounted] = useState(false)

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem('arabaudit-locale', next)
      } catch {
        // ignore
      }
    }
  }, [])

  useEffect(() => {
    setMounted(true)
    try {
      const stored = window.localStorage.getItem('arabaudit-locale') as Locale | null
      if (stored === 'en' || stored === 'ar') setLocaleState(stored)
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    if (!mounted || typeof document === 'undefined') return
    const html = document.documentElement
    html.lang = locale === 'ar' ? 'ar' : 'en'
    html.dir = locale === 'ar' ? 'rtl' : 'ltr'
    html.classList.toggle('font-arabic', locale === 'ar')
    html.classList.toggle('font-sans', locale === 'en')
  }, [mounted, locale])

  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  return (
    <LocaleContext.Provider value={{ locale, setLocale, dir }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}
