import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion } from 'motion/react'
import { TLink } from '../lib/transition'
import { LANGS, useContent, useLocale } from '../lib/i18n'
import Button from './Button'
import Logo from './Logo'
import MobileMenu from './MobileMenu'

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
      className={`flex items-center gap-0.5 rounded-[2px] p-1 ${className}`}
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
            className={`relative flex h-8 items-center gap-2 rounded-[2px] px-2 transition-colors duration-300 ${
              on ? 'text-ivory' : 'text-ivory/45 hover:text-ivory'
            }`}
          >
            {on && (
              <motion.span
                layoutId={`lang-${id}`}
                className="absolute inset-0 rounded-[2px] bg-ivory/10"
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

/*
  Header in the Dogpound pattern, on every screen size: menu on the left, the
  name in the middle, the booking button on the right. Nothing else competes.
*/
export default function Nav() {
  const { t, brand } = useContent()
  const bar = useRef(null)
  const progress = useRef(null)
  const [menu, setMenu] = useState(false)
  const location = useLocation()
  // Training pages carry the booking button in their hero, so the header drops
  // its own and moves the logo to the right: menu left, name right.
  const training = /^\/services\/[^/]+/.test(location.pathname)

  // Light or dark header text, from whatever sits under the bar: anything inside
  // an .on-dark block (photo heroes, the closing band) turns the header light.
  const tone = useRef(() => {})
  tone.current = () => {
    const el = bar.current
    if (!el) return
    const y = el.offsetHeight / 2
    const hit = document
      .elementsFromPoint(window.innerWidth / 2, y)
      .find((n) => !el.contains(n))
    const dark = !!hit?.closest('.on-dark')
    el.classList.toggle('on-dark', dark)
    el.dataset.tone = dark ? 'dark' : 'light'
  }

  // Transparent over the hero, a matte bar once the page moves. Always visible.
  useEffect(() => {
    const el = bar.current
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate(self) {
        const isScrolled = self.scroll() > 40 ? 'true' : 'false'
        if (el.dataset.scrolled !== isScrolled) {
          el.dataset.scrolled = isScrolled
        }
        // How far down the page you are, as a thin gold line along the top edge.
        // Measured against the live page height, so pages that load in later never leave it stale.
        const max = ScrollTrigger.maxScroll(window) || 1
        const p = Math.min(1, Math.max(0, self.scroll() / max))
        if (progress.current) progress.current.style.transform = `scaleX(${p})`
        tone.current()
      },
    })
    const onResize = () => tone.current()
    window.addEventListener('resize', onResize)
    return () => {
      st.kill()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  // Re-check on every page: run now and again once the page transition has painted.
  useEffect(() => {
    tone.current()
    const ids = [120, 600, 1400].map((ms) => setTimeout(() => tone.current(), ms))
    return () => ids.forEach(clearTimeout)
  }, [location.key])

  // A new page starts the line again from zero.
  useEffect(() => {
    if (progress.current) progress.current.style.transform = 'scaleX(0)'
  }, [location.key])

  useEffect(() => {
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
        className="fixed inset-x-0 top-0 z-50 text-ivory transition-[background-color,backdrop-filter,color] duration-500 data-[scrolled=true]:bg-onyx/90 data-[scrolled=true]:backdrop-blur-md"
      >
        <span
          ref={progress}
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left bg-gold will-change-transform"
          style={{ transform: 'scaleX(0)' }}
          aria-hidden="true"
        />
        <nav
          className={`shell grid h-16 items-center md:h-20 ${training ? 'grid-cols-[1fr_auto]' : 'grid-cols-[1fr_auto_1fr]'}`}
          aria-label={t.nav.main}
        >
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setMenu(true)}
              className="group -ml-2 inline-flex h-11 items-center gap-3 px-2 text-ivory"
              aria-expanded={menu}
              aria-controls="mobile-menu"
            >
              <span className="flex w-6 flex-col gap-[6px]" aria-hidden="true">
                <span className="h-px w-full bg-current transition-transform duration-300 group-hover:translate-x-1" />
                <span className="h-px w-full bg-current" />
                <span className="h-px w-2/3 bg-current transition-[width] duration-300 group-hover:w-full" />
              </span>
              <span className="t-label hidden md:inline">{t.nav.menu}</span>
            </button>
            <LanguageSwitch className="hidden lg:flex" />
          </div>

          <TLink
            to="/"
            className={`font-serif text-[0.8rem] uppercase tracking-[0.12em] min-[400px]:text-[0.95rem] min-[400px]:tracking-[0.16em] sm:text-[1.15rem] sm:tracking-[0.24em] md:text-[1.3rem] ${training ? 'justify-self-end' : ''}`}
            aria-label={`${brand.name}, ${t.nav.home}`}
          >
            <Logo name={brand.name} markClass="h-[1.9em]" nameClass="max-[359px]:hidden" />
          </TLink>

          {!training && (
            <div className="flex justify-end">
              <Button to="/#book" size="sm" className="max-sm:min-h-9 max-sm:px-3.5">
                <span className="hidden lg:inline">{t.hero.cta}</span>
                <span className="lg:hidden">{t.nav.book}</span>
              </Button>
            </div>
          )}
        </nav>
      </header>
      <AnimatePresence>{menu && <MobileMenu onClose={() => setMenu(false)} />}</AnimatePresence>
    </>
  )
}
