import { createContext, useContext, useEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from './media'

gsap.registerPlugin(ScrollTrigger)
// Mobile address bars resize the viewport while scrolling; don't re-measure pins for that.
ScrollTrigger.config({ ignoreMobileResize: true })

const ScrollCtx = createContext({ lenis: null })

/*
  Lenis drives smooth scrolling and GSAP's ticker drives Lenis, so
  ScrollTrigger and the smooth scroll share one clock and never drift.
  With reduced motion turned on we keep native scrolling.
*/
export function ScrollProvider({ children }) {
  const reduced = useReducedMotion()
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    if (reduced) return
    const instance = new Lenis({
      // A long, soft glide: heavy enough to feel considered, never laggy.
      lerp: 0.075,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
    })
    instance.on('scroll', ScrollTrigger.update)
    const tick = (time) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    setLenis(instance)
    window.__lenis = instance // handy for debugging and automated checks
    return () => {
      gsap.ticker.remove(tick)
      instance.destroy()
      setLenis(null)
    }
  }, [reduced])

  useEffect(() => {
    // Fonts change line breaks, which moves every trigger. Re-measure once they land.
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [])

  useEffect(() => {
    /*
      Content that changes height after load (the booking calendar filling in,
      a booking step changing, a language switch) moves every section below it.
      Without a re-measure, pinned sections start too early and overlap the
      section above. Watch the page height and refresh when it really changes;
      the pin spacers a refresh creates are ignored by comparing against the
      height measured right after the last refresh.
    */
    const main = document.getElementById('main')
    if (!main || typeof ResizeObserver === 'undefined') return
    let settled = main.offsetHeight
    let timer
    const onRefresh = () => requestAnimationFrame(() => (settled = main.offsetHeight))
    ScrollTrigger.addEventListener('refresh', onRefresh)
    const ro = new ResizeObserver(() => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        if (window.__lenis && window.__lenis.isScrolling) return;
        if (Math.abs(main.offsetHeight - settled) > 16) {
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
        }
      }, 200)
    })
    ro.observe(main)
    return () => {
      clearTimeout(timer)
      ro.disconnect()
      ScrollTrigger.removeEventListener('refresh', onRefresh)
    }
  }, [])

  return <ScrollCtx.Provider value={{ lenis }}>{children}</ScrollCtx.Provider>
}

export function useLenis() {
  return useContext(ScrollCtx).lenis
}

const NAV_OFFSET = -72

export function scrollToTarget(lenis, target, { immediate = false, offset = NAV_OFFSET } = {}) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (target === 0 || target === 'top') {
    if (lenis) lenis.scrollTo(0, { immediate, force: true })
    else window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' })
    return
  }
  if (!el) return
  if (lenis) {
    lenis.scrollTo(el, { offset, immediate, force: true, duration: 1.8, easing: (t) => 1 - Math.pow(1 - t, 4) })
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset
    window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' })
  }
}
