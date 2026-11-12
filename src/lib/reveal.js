import { useSyncExternalStore } from 'react'

/*
  Whether the current page is visible to the visitor. There is no loader or
  cover panel any more, so it is always true; kept so pages can ask.
*/
let ready = true
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
  return useSyncExternalStore(revealStore.subscribe, revealStore.get, () => true)
}
