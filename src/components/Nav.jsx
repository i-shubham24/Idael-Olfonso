import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion } from 'motion/react'
import { TLink } from '../lib/transition'
import { LANGS, useContent, useLocale } from '../lib/i18n'
import { prefersReducedMotion } from '../lib/media'
import Button from './Button'
import Monogram from './Monogram'
import MobileMenu from './MobileMenu'

/** Main links, in the current language. The booking button is separate. */
export function navLinks(t) {
  return [
    { to: '/about', label: t.nav.about },
    { to: '/#why', label: t.nav.why },
    { to: '/#services', label: t.nav.services },
  ]
}

/* Small square flags for the language switch (Swiss for German, British for English). */
const FLAGS = {
  de: (
    <svg viewBox="0 0 32 32" className="h-full w-full">
      <rect width="32" height="32" fill="#D52B1E" />
      <path d="M13 6h6v7h7v6h-7v7h-6v-7H6v-6h7z" fill="#fff" />
    </svg>
  ),
  en: (
    <svg viewBox="0 0 60 60" className="h-full w-full">
      <rect width="60" height="60" fill="#012169" />
      <path d="M0 0L60 60M60 0L0 60" stroke="#fff" strokeWidth="12" />
      <path d="M0 0L60 60M60 0L0 60" stroke="#C8102E" strokeWidth="5" />
      <path d="M30 0v60M0 30h60" stroke="#fff" strokeWidth="18" />
      <path d="M30 0v60M0 30h60" stroke="#C8102E" strokeWidth="10" />
    </svg>
  ),
}

/*
  Language switch, like the one on OkyFit: two flags in one control, the
  active one in colour on a sliding block, the other one greyed out.
  The site is German first, English for everyone else.
*/
export function LanguageSwitch({ className = '', id = 'nav' }) {
  const { lang, setLang } = useLocale()
  const { t } = useContent()
  return (
    <div
      className={`flex items-center gap-0.5 rounded-[2px] bg-graphite/80 p-1 ${className}`}
      role="group"
      aria-label={t.nav.language}
    >
      {LANGS.map((l) => {
        const on = lang === l
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={on}
            lang={l}
            className={`relative flex h-8 items-center gap-2 rounded-[2px] px-2.5 transition-colors duration-300 ${
              on ? 'text-ivory' : 'text-ivory/45 hover:text-ivory'
            }`}
          >
            {on && (
              <motion.span
                layoutId={`lang-${id}`}
                className="absolute inset-0 rounded-[2px] bg-line"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            <span
              className={`relative block h-3.5 w-3.5 overflow-hidden rounded-[1px] transition-[filter,opacity] duration-300 ${
                on ? '' : 'opacity-60 grayscale'
              }`}
              aria-hidden="true"
            >
              {FLAGS[l]}
            </span>
            <span className="t-label relative">{l.toUpperCase()}</span>
          </button>
        )
      })}
    </div>
  )
}

export default function Nav() {
  const { t, brand } = useContent()
  const links = navLinks(t)
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
        {t.nav.skip}
      </a>
      <header
        ref={bar}
        data-scrolled="false"
        className="group/nav fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-500 data-[scrolled=true]:bg-onyx/80 data-[scrolled=true]:backdrop-blur-md"
      >
        <nav className="shell flex h-[72px] items-center gap-6 md:h-[84px]" aria-label="Main">
          <TLink to="/" className="flex items-center gap-3 rounded-sm" aria-label={`${brand.name}, ${t.nav.home}`}>
            <Monogram size={38} />
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-serif text-[1.35rem] tracking-[-0.01em]">{brand.name}</span>
              <span className="t-label mt-1 text-[0.58rem] text-stone">{brand.role}</span>
            </span>
          </TLink>

          <HourDial />

          <ul className="ml-auto hidden items-center gap-1 lg:flex">
            {links.map((l) => {
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

          <LanguageSwitch className="ml-auto lg:ml-3" />

          <div className="hidden lg:ml-2 lg:block">
            <Button to="/#book" size="md" variant="ghost" magnetic={false}>
              {t.nav.book}
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMenu(true)}
            className="t-label inline-flex h-12 items-center gap-3 rounded-[2px] bg-graphite px-5 lg:hidden"
            aria-expanded={menu}
            aria-controls="mobile-menu"
          >
            {t.nav.menu}
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
