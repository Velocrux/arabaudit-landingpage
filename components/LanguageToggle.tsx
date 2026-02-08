'use client'

import { useLocale } from '@/context/LocaleContext'

export function LanguageToggle() {
  const { locale, setLocale } = useLocale()

  return (
    <div className="flex items-center gap-1 rounded-md border border-primary/20 bg-base px-1 py-0.5">
      <button
        type="button"
        onClick={() => setLocale('en')}
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
        onClick={() => setLocale('ar')}
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
