import { createContext, useCallback, useContext, useLayoutEffect, useRef } from 'react'
import { Link, createPath, useLocation, useNavigate } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis, scrollToTarget } from './scroll'
import { prefersReducedMotion } from './media'
import { revealStore } from './reveal'
import { buildContent, currentLang } from './i18n'

/** Destination name for the route transition panel, in the current language. */
export function routeMeta(pathname) {
  const { brand, services, t } = buildContent(currentLang())
  const meta = (label) => ({ label, color: '#111113', ink: '#ECE8E0' })
  if (pathname === '/') return meta(brand.name)
  if (pathname.startsWith('/services/')) {
    const s = services.find((x) => x.slug === pathname.split('/')[2])
    if (s) return meta(s.name)
  }
  if (pathname.startsWith('/about')) return meta(t.routes.about)
  if (pathname.startsWith('/book')) return meta(t.routes.book)
  if (pathname.startsWith('/privacy')) return meta(t.routes.privacy)
  if (pathname.startsWith('/imprint')) return meta(t.routes.imprint)
  return meta(t.routes.lost)
}

const TransitionCtx = createContext({ go: () => {} })

export function useTransitionNav() {
  return useContext(TransitionCtx)
}

/*
  Route changes: a matte panel wipes up with the
  destination name, the route swaps underneath, then the panel wipes away.
  Back/forward buttons get the same reveal (covered instantly, then lifted).
*/
export function TransitionProvider({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const lenis = useLenis()
  const panel = useRef(null)
  const label = useRef(null)
  const state = useRef({ busy: false, covered: false, first: true, hash: null, key: null })

  const paint = (meta) => {
    gsap.set(panel.current, { visibility: 'visible', backgroundColor: meta.color, color: meta.ink })
    label.current.textContent = meta.label
  }

  const coverIn = (meta) =>
    new Promise((resolve) => {
      gsap.killTweensOf([panel.current, label.current])
      paint(meta)
      revealStore.set(false)
      gsap
        .timeline({ onComplete: resolve })
        .fromTo(
          panel.current,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.75, ease: 'expo.inOut' },
        )
        .fromTo(label.current, { yPercent: 110 }, { yPercent: 0, duration: 0.6, ease: 'expo.out' }, 0.38)
    })

  const coverOut = useCallback(() => {
    revealStore.set(true)
    gsap
      .timeline({
        onComplete: () => {
          gsap.set(panel.current, { visibility: 'hidden' })
          state.current.busy = false
        },
      })
      .to(label.current, { yPercent: -110, duration: 0.45, ease: 'expo.in' })
      .to(panel.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.8, ease: 'expo.inOut' }, 0.12)
  }, [])

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
      if (prefersReducedMotion()) {
        navigate(target)
        return
      }
      state.current.busy = true
      lenis?.stop()
      coverIn(routeMeta(url.pathname)).then(() => {
        state.current.covered = true
        navigate(target)
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
        }, 400)
      }
      return
    }
    if (!s.covered && !prefersReducedMotion()) {
      // Back/forward navigation: the new page is already rendered, cover it before paint.
      paint(routeMeta(location.pathname))
      gsap.set(panel.current, { clipPath: 'inset(0% 0% 0% 0%)' })
      gsap.set(label.current, { yPercent: 0 })
      revealStore.set(false)
      s.covered = true
      s.busy = true
      s.hash = location.hash || null
    }

    lenis?.start()
    window.scrollTo(0, 0)
    lenis?.scrollTo(0, { immediate: true, force: true })

    let raf2
    const raf = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        ScrollTrigger.refresh()
        if (s.hash) scrollToTarget(lenis, s.hash, { immediate: true })
        s.hash = null
        if (s.covered) {
          s.covered = false
          setTimeout(coverOut, 140)
        } else {
          revealStore.set(true)
        }
      })
    })
    return () => {
      cancelAnimationFrame(raf)
      cancelAnimationFrame(raf2)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key])

  return (
    <TransitionCtx.Provider value={{ go }}>
      {children}
      <div
        ref={panel}
        aria-hidden="true"
        className="invisible fixed inset-0 z-[90] flex items-end overflow-hidden"
        style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      >
        <div className="shell pb-[7vh]">
          <div className="overflow-hidden pb-[0.06em]">
            <div ref={label} className="t-display pb-[0.08em] text-[clamp(3.25rem,12vw,13rem)] italic" />
          </div>
        </div>
      </div>
    </TransitionCtx.Provider>
  )
}

/** Link that plays the route transition. Modifier clicks still open new tabs. */
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
