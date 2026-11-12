import { createContext, useCallback, useContext, useLayoutEffect, useRef } from 'react'
import { Link, createPath, useLocation, useNavigate } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis, scrollToTarget } from './scroll'
import { prefersReducedMotion } from './media'

const TransitionCtx = createContext({ go: () => {} })

export function useTransitionNav() {
  return useContext(TransitionCtx)
}

/*
  Route changes are a short, quiet fade: the page dims and lifts away, the
  new one settles in from just below. Links to a section on the same page simply scroll there.
*/
export function TransitionProvider({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const lenis = useLenis()
  const state = useRef({ busy: false, first: true, hash: null, key: null })

  const main = () => document.getElementById('main')

  const go = useCallback(
    (to) => {
      const url = new URL(to, window.location.href)
      const target = url.pathname + url.search + url.hash
      const samePage = url.pathname === window.location.pathname && url.search === window.location.search
      if (samePage) {
        scrollToTarget(lenis, url.hash || 0)
        if (url.hash) window.history.replaceState(null, '', url.hash)
        return
      }
      if (state.current.busy) return
      state.current.hash = url.hash || null
      if (prefersReducedMotion() || !main()) {
        navigate(target)
        return
      }
      state.current.busy = true
      gsap.to(main(), {
        opacity: 0,
        y: -14,
        duration: 0.45,
        ease: 'power2.in',
        onComplete: () => navigate(target),
      })
    },
    [lenis, navigate],
  )

  useLayoutEffect(() => {
    const s = state.current
    // StrictMode runs this twice on mount; only react once per location.
    if (s.key === location.key) return
    s.key = location.key
    if (s.first) {
      s.first = false
      if (location.hash) {
        const hash = location.hash
        setTimeout(() => {
          ScrollTrigger.refresh()
          scrollToTarget(lenis, hash, { immediate: true })
        }, 300)
      }
      return
    }

    window.scrollTo(0, 0)
    lenis?.scrollTo(0, { immediate: true, force: true })

    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      if (s.hash) scrollToTarget(lenis, s.hash, { immediate: true })
      s.hash = null
      s.busy = false
      // No transform may stay on #main afterwards: it would break pinned sections.
      if (main())
        gsap.fromTo(
          main(),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'expo.out',
            clearProps: 'transform,opacity',
            onComplete: () => ScrollTrigger.refresh(),
          },
        )
    })
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key])

  return <TransitionCtx.Provider value={{ go }}>{children}</TransitionCtx.Provider>
}

/** Link that plays the route fade. Modifier clicks still open new tabs. */
export function TLink({ to, onClick, children, ref, ...rest }) {
  const { go } = useTransitionNav()
  const href = typeof to === 'string' ? to : createPath(to)
  return (
    <Link
      ref={ref}
      to={to}
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
        if (rest.target === '_blank') return
        e.preventDefault()
        go(href)
      }}
      {...rest}
    >
      {children}
    </Link>
  )
}
