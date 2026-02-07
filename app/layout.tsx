import type { Metadata } from 'next'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import './globals.css'
import { LocaleProvider } from '@/context/LocaleContext'


const ibm = IBM_Plex_Sans_Arabic({ subsets: ['latin', 'arabic'], variable: '--font-ibm', display: 'swap', weight: ['400', '500', '700'] })
export const metadata: Metadata = {
  title: 'ArabAudit | From Audit Panic to Audit Readiness',
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
