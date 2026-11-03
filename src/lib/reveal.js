import { useSyncExternalStore } from 'react'

/*
  A tiny store that says whether the current page is visible to the visitor.
  It is false while the first-visit loader or a route transition panel covers
  the screen, so entrance animations wait and play as the cover lifts.
*/
let ready = false
const listeners = new Set()

export const revealStore = {
  get: () => ready,
  set(value) {
    if (ready === value) return
    ready = value
    listeners.forEach((l) => l())
  },
  subscribe(l) {
    listeners.add(l)
    return () => listeners.delete(l)
  },
}

export function usePageReady() {
  return useSyncExternalStore(revealStore.subscribe, revealStore.get, () => false)
}
