'use client'

import { useLocale } from '@/context/LocaleContext'
import { useAnalytics } from '@/lib/hooks/useAnalytics'

export function LanguageToggle() {
  const { locale, setLocale } = useLocale()
  const { trackLanguageChange } = useAnalytics()

  const handleLanguageChange = (newLanguage: 'en' | 'ar') => {
    if (newLanguage !== locale) {
      trackLanguageChange(locale, newLanguage)
      setLocale(newLanguage)
    }
  }

  return (
    <div className="flex items-center gap-1 rounded-md border border-primary/20 bg-base px-1 py-0.5">
      <button
        type="button"
        onClick={() => handleLanguageChange('en')}
        className={`rounded px-2 py-1 text-sm font-medium transition-colors ${locale === 'en'
          ? 'bg-primary text-base'
          : 'text-primary hover:bg-primary/10'
          }`}
        aria-pressed={locale === 'en'}
        aria-label="English"
      >
        ENG
      </button>
      <button
        type="button"
        onClick={() => handleLanguageChange('ar')}
        className={`rounded px-2 py-1 text-sm font-medium transition-colors ${locale === 'ar'
          ? 'bg-primary text-base'
          : 'text-primary hover:bg-primary/10'
          }`}
        aria-pressed={locale === 'ar'}
        aria-label="Arabic"
      >
        العربية
      </button>
    </div>
  )
}
