'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'

export function Footer() {
  const { locale } = useLocale()
  const t = getContent(locale).footer

  return (
    <footer className="relative overflow-hidden border-t-2 border-accent/40 bg-gradient-to-b from-primary via-[#0B4634] to-[#082f24]">
      {/* Elegant diamond pattern */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.025]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <pattern
            id="footer-pattern"
            x="0"
            y="0"
            width="140"
            height="140"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M70 10 L130 70 L70 130 L10 70 Z"
              fill="none"
              stroke="rgb(216 176 74)"
              strokeWidth="0.4"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#footer-pattern)" />
      </svg>

      {/* Subtle top glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24">
        {/* Main content */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Logo & Tagline Section */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <Link
              href="/"
              className="group focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-lg transition-all duration-300"
              aria-label="ArabAudit Home"
            >
              <div className="relative inline-block">
                <Image
                  src="/logo.png"
                  alt="ArabAudit"
                  width={200}
                  height={80}
                  className="h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  priority
                />
                <div className="absolute -bottom-2 left-0 right-0 h-0.5 scale-x-0 rounded-full bg-gradient-to-r from-accent via-accent/60 to-transparent transition-transform duration-300 group-hover:scale-x-100" />
              </div>
            </Link>
            
            <p className="max-w-sm text-sm leading-relaxed text-white/80">
              {t.tagline}
            </p>

            <div className="flex items-center gap-3">
              <div className="h-px w-10 bg-gradient-to-r from-accent to-transparent" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/70">
                Est. 2026
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-white/90">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-4" aria-label="Footer Navigation">
              <Link
                href="https://app.velocrux.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-sm text-white/75 transition-all duration-300 hover:text-accent hover:translate-x-1"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/5 transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent/10 group-hover:shadow-sm group-hover:shadow-accent/20">
                  <svg className="h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <span className="tracking-wide">{t.links.product}</span>
              </Link>

              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=kauser@velocrux.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-sm text-white/75 transition-all duration-300 hover:text-accent hover:translate-x-1"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/5 transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent/10 group-hover:shadow-sm group-hover:shadow-accent/20">
                  <svg className="h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="tracking-wide">{t.links.contact}</span>
              </a>

              <Link
                href="/privacy"
                className="group flex items-center gap-3 text-sm text-white/75 transition-all duration-300 hover:text-accent hover:translate-x-1"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/5 transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent/10 group-hover:shadow-sm group-hover:shadow-accent/20">
                  <svg className="h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="tracking-wide">{t.links.privacy}</span>
              </Link>

              <a
                href="https://cdn.nca.gov.sa/api/files/public/upload/86e09090-44e4-481f-bc28-355673607654_ECC--2024-EN.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-sm text-white/75 transition-all duration-300 hover:text-accent hover:translate-x-1"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/5 transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent/10 group-hover:shadow-sm group-hover:shadow-accent/20">
                  <svg className="h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="tracking-wide">{t.links.downloadECC}</span>
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-white/90">
              Get in Touch
            </h3>
            <div className="flex flex-col gap-4">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=kauser@velocrux.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3"
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent/10">
                  <svg className="h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium uppercase tracking-wider text-white/60">Email</span>
                  <span className="text-sm text-accent transition-colors group-hover:text-accent/80">
                    kauser@velocrux.com
                  </span>
                </div>
              </a>

              <div className="rounded-xl border border-accent/20 bg-accent/5 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent/80">
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent shadow-sm shadow-accent" />
                  Built for the Kingdom
                </div>
                <p className="mt-2 text-xs leading-relaxed text-white/70">
                  {t.servingEnterprises}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-white/60">
                  Saudi-native Smart Audit Engine
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-accent/20 pt-8">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between">
            <p className="text-xs tracking-wide text-white/60">
              © {new Date().getFullYear()} ArabAudit. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs text-white/50">
              <span>NCA ECC-2024</span>
              <span className="h-1 w-1 rounded-full bg-accent/40" />
              <span>SAMA CSF</span>
              <span className="h-1 w-1 rounded-full bg-accent/40" />
              <span>PDPL</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
