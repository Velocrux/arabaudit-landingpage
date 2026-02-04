import type { Metadata } from 'next'
import { Noto_Sans_Arabic, Inter } from 'next/font/google'
import './globals.css'
import { LocaleProvider } from '@/context/LocaleContext'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ArabAudit | From Audit Panic to Audit Readiness 24/7',
  description:
    'Digital Co-Pilot for NCA ECC-2024 and SAMA. AI-powered compliance platform. Saudi-native, bilingual, framework harmonization.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${notoArabic.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen font-sans">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  )
}
