import en from '@/content/en.json'
import ar from '@/content/ar.json'
import type { Locale } from '@/context/LocaleContext'

export type Content = typeof en

const content: Record<Locale, Content> = { en, ar }

export function getContent(locale: Locale): Content {
  return content[locale] ?? en
}

// Helper to get sector-specific content
export function getSectorContent(locale: Locale, sectorId: string) {
  const allContent = getContent(locale)
  return allContent.sectorCTAs.find(sector => sector.sector === sectorId)
}
