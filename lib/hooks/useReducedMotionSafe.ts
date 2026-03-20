'use client'

import { useEffect, useState } from 'react'

/**
 * SSR-safe replacement for Framer Motion's `useReducedMotion()`.
 *
 * Framer initializes `prefers-reduced-motion` during render; on the server that
 * can disagree with the client's first paint and cause hydration mismatches
 * (including subtle DOM reordering around animated wrappers).
 *
 * This hook always returns `false` for the initial server + hydration render,
 * then syncs to the real media query after mount.
 */
export function useReducedMotionSafe(): boolean {
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduce(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  return reduce
}
