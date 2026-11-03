import { useSyncExternalStore } from 'react'

function subscribeQuery(query) {
  return (callback) => {
    if (typeof window === 'undefined') return () => {}
    const mql = window.matchMedia(query)
    mql.addEventListener('change', callback)
    return () => mql.removeEventListener('change', callback)
  }
}

/** Live media query hook (re-renders when the query result changes). */
export function useMediaQuery(query) {
  return useSyncExternalStore(
    subscribeQuery(query),
    () => window.matchMedia(query).matches,
    () => false,
  )
}

export const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

export function useReducedMotion() {
  return useMediaQuery(REDUCED_MOTION)
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia(REDUCED_MOTION).matches
}

/** Fine pointer = mouse or trackpad, where hover effects make sense. */
export function useFinePointer() {
  return useMediaQuery('(hover: hover) and (pointer: fine)')
}

export function useIsDesktop() {
  return useMediaQuery('(min-width: 1024px)')
}
