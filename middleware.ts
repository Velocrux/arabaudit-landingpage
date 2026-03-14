import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Landing page middleware – worldwide access, no geo-blocking.
 * The site is available globally with a focus on Saudi Arabia (KSA) and the Middle East.
 * Do not add country-based redirects or blocks here; deployment/CDN geo rules
 * (e.g. Vercel, Cloudflare) must also allow all regions if you want worldwide access.
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Security / UX headers only – no geo-blocking; site is worldwide (incl. Saudi Arabia)
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  return response
}

export const config = {
  matcher: [
    /*
     * Match all pathnames except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, logo.png, other static assets
     */
    '/((?!_next/static|_next/image|favicon.ico|logo.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
