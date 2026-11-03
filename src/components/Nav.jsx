import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence } from 'motion/react'
import { TLink } from '../lib/transition'
import { brand } from '../content/site'
import { prefersReducedMotion } from '../lib/media'
import Button from './Button'
import Monogram from './Monogram'
import MobileMenu from './MobileMenu'

export const NAV_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/#services', label: 'Services' },
  { to: '/#method', label: 'How it works' },
  { to: '/#engagements', label: 'Prices' },
]

export default function Nav() {
  const bar = useRef(null)
  const [menu, setMenu] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const el = bar.current
    let hidden = false
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate(self) {
        const y = self.scroll()
        el.dataset.scrolled = y > 40 ? 'true' : 'false'
        // Hide while reading down, return on the way back up (stays put with reduced motion).
        const shouldHide = !prefersReducedMotion() && self.direction === 1 && y > 240
        if (shouldHide !== hidden) {
          hidden = shouldHide
          gsap.to(el, { yPercent: hidden ? -110 : 0, duration: 0.6, ease: hidden ? 'power2.in' : 'expo.out' })
        }
      },
    })
    return () => st.kill()
  }, [])

  useEffect(() => {
    gsap.set(bar.current, { yPercent: 0 })
    setMenu(false)
  }, [location.key])

  return (
    <>
      <a
        href="#main"
        className="t-label fixed left-4 top-3 z-[70] -translate-y-24 rounded-[2px] bg-ivory px-5 py-3 text-ink focus:translate-y-0"
      >
        Skip to content
      </a>
      <header
        ref={bar}
        data-scrolled="false"
        className="group/nav fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-500 data-[scrolled=true]:bg-onyx/80 data-[scrolled=true]:backdrop-blur-md"
      >
        <nav className="shell flex h-[72px] items-center gap-6 md:h-[84px]" aria-label="Main">
          <TLink to="/" className="flex items-center gap-3 rounded-sm" aria-label={`${brand.name}, home`}>
            <Monogram size={38} />
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-serif text-[1.35rem] tracking-[-0.01em]">{brand.name}</span>
              <span className="t-label mt-1 text-[0.58rem] text-stone">{brand.role}</span>
            </span>
          </TLink>

          <HourDial />

          <ul className="ml-auto hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => {
              const active = !l.to.includes('#') && location.pathname.startsWith(l.to)
              return (
                <li key={l.to}>
                  <TLink
                    to={l.to}
                    aria-current={active ? 'page' : undefined}
                    className="t-label flex items-center px-4 py-3 text-ivory/65 transition-colors duration-300 hover:text-gold-2 aria-[current=page]:text-gold-2"
                  >
                    {l.label}
                  </TLink>
                </li>
              )
            })}
          </ul>

          <div className="ml-auto hidden lg:ml-4 lg:block">
            <Button to="/book" size="md" variant="ghost" magnetic={false}>
              Book
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMenu(true)}
            className="t-label ml-auto inline-flex h-12 items-center gap-3 rounded-[2px] bg-graphite px-5 lg:hidden"
            aria-expanded={menu}
            aria-controls="mobile-menu"
          >
            Menu
          </button>
        </nav>
      </header>
      <AnimatePresence>{menu && <MobileMenu onClose={() => setMenu(false)} />}</AnimatePresence>
    </>
  )
}

/*
  Scroll progress as an hour: a gold arc closes around a small dial while the
  minute count runs from 0 at the top of the page to 60 at the bottom.
*/
const DIAL_R = 13
const DIAL_C = 2 * Math.PI * DIAL_R
function HourDial() {
  const arc = useRef(null)
  const minRef = useRef(null)

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate(self) {
        const p = self.progress
        if (arc.current) arc.current.style.strokeDashoffset = String(DIAL_C * (1 - p))
        if (minRef.current) minRef.current.textContent = String(Math.round(p * 60)).padStart(2, '0')
      },
    })
    return () => st.kill()
  }, [])

  return (
    <div className="hidden items-center gap-3 xl:flex" aria-hidden="true">
      <svg width="32" height="32" viewBox="0 0 32 32" className="-rotate-90">
        <circle cx="16" cy="16" r={DIAL_R} fill="none" stroke="var(--color-line)" strokeWidth="1" />
        <circle
          ref={arc}
          cx="16"
          cy="16"
          r={DIAL_R}
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="1.25"
          strokeDasharray={DIAL_C}
          strokeDashoffset={DIAL_C}
        />
      </svg>
      <span className="t-label tabular text-stone">
        <span ref={minRef}>00</span> / 60 min
      </span>
    </div>
  )
}
