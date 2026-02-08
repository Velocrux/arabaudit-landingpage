import type { Metadata } from 'next'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import './globals.css'
import { LocaleProvider } from '@/context/LocaleContext'

const ibm = IBM_Plex_Sans_Arabic({ subsets: ['latin', 'arabic'], variable: '--font-ibm', display: 'swap', weight: ['400', '500', '700'] })

export const metadata: Metadata = {
  title: {
    default: 'ArabAudit | Saudi-Native Smart Audit Engine for NCA, SAMA & PDPL',
    template: '%s | ArabAudit',
  },
  description:
    'AI-powered audit compliance platform for the Kingdom. One workflow from evidence upload to one-click regulatory export. NCA ECC-2024, SAMA CSF, and PDPL—validated against Saudi authority templates. Built for critical infrastructure, financial sector, and government.',
  keywords: [
    'NCA ECC-2024',
    'SAMA CSF',
    'PDPL',
    'Saudi Arabia',
    'audit compliance',
    'cybersecurity controls',
    'regulatory export',
    'Saudi regulatory',
    'critical infrastructure',
    'SDAIA',
    'audit readiness',
    'compliance platform',
    'Kingdom of Saudi Arabia',
  ],
  authors: [{ name: 'ArabAudit', url: 'https://arabaudit.com' }],
  creator: 'ArabAudit',
  publisher: 'ArabAudit',
  formatDetection: { email: false, address: false, telephone: false },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://arabaudit.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ar_SA'],
    title: 'ArabAudit | Saudi-Native Smart Audit Engine for NCA, SAMA & PDPL',
    description:
      'AI-powered audit compliance for the Kingdom. One-click export to NCA and SAMA Excel templates. Built for Saudi critical infrastructure and financial sector.',
    siteName: 'ArabAudit',
    images: [
      {
        url: '/logo.png',
        width: 200,
        height: 80,
        alt: 'ArabAudit – Saudi-native Smart Audit Engine',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ArabAudit | Saudi-Native Smart Audit Engine for NCA, SAMA & PDPL',
    description:
      'AI-powered audit compliance for the Kingdom. One-click regulatory export. NCA, SAMA, PDPL.',
    images: ['/logo.png'],
  },
  icons: {
    icon: [{ url: '/logo.png', type: 'image/png', sizes: 'any' }],
    apple: [{ url: '/logo.png', type: 'image/png', sizes: 'any' }],
  },
  robots: {
    index: true,
    follow: true,
  },
  category: 'Technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${ibm.variable}`}
      suppressHydrationWarning
    >
      {/* Body font: IBM Plex Sans Arabic */}
      <body className="min-h-screen antialiased font-ibm">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  )
}
