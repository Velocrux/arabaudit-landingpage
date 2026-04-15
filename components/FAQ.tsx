'use client'

import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'

type FaqItem = { q: string; a: string }
type FaqContent = { title: string; subtitle?: string; items: FaqItem[] }

export function FAQ() {
  const { locale } = useLocale()
  const content = getContent(locale) as unknown as { faq?: FaqContent }
  const faq = content.faq
  if (!faq || !faq.items?.length) return null

  const isRTL = locale === 'ar'

  return (
    <section
      id="faq"
      className={`relative scroll-mt-16 px-6 py-20 sm:px-8 sm:py-28 md:py-32 ${isRTL ? 'rtl' : 'ltr'}`}
    >
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <div className="mx-auto h-1 w-16 rounded-full bg-accent" />
          <h2 className="mt-4 text-section font-bold tracking-royal">
            {faq.title}
          </h2>
          {faq.subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-black/70">
              {faq.subtitle}
            </p>
          )}
        </div>

        <div className="mt-12 space-y-4" itemScope itemType="https://schema.org/FAQPage">
          {faq.items.map((item, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm transition hover:border-accent/40 hover:shadow-md open:border-accent/50 open:shadow-md"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <summary
                className={`flex cursor-pointer list-none items-start justify-between gap-4 text-[17px] font-semibold leading-snug ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}
              >
                <span itemProp="name" className="flex-1">
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent transition-transform duration-200 group-open:rotate-45"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <div
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
                className={`mt-4 text-[15px] leading-relaxed text-black/75 ${isRTL ? 'text-right' : 'text-left'}`}
              >
                <p itemProp="text">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
