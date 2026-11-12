import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { InstagramLogo, WhatsappLogo } from '@phosphor-icons/react'
import { TLink } from '../lib/transition'
import { useLenis } from '../lib/scroll'
import { useContent } from '../lib/i18n'
import { useFinePointer } from '../lib/media'
import Img from './Img'
import Logo from './Logo'
import { LanguageSwitch } from './Nav'

const ease = [0.16, 1, 0.3, 1]
// Slow start, slow finish: the menu draws down like a curtain.
const curtain = [0.76, 0, 0.24, 1]

/*
  Full screen menu in the Dogpound pattern: a black page with a few very large
  words. On a mouse, the photo for the word you point at fades in behind it.
*/
export default function MobileMenu({ onClose }) {
  const { t, brand, contact, about, images } = useContent()
  const lenis = useLenis()
  const fine = useFinePointer()
  const closeRef = useRef(null)
  const [hover, setHover] = useState(null)

  const links = [
    { to: '/#training', label: t.nav.services, image: about.gallery[0] },
    { to: '/about', label: t.nav.about, image: about.standing },
    { to: '/#places', label: t.nav.places, image: images.manifesto },
    { to: '/#book', label: t.nav.book, image: about.gallery[1] },
  ]

  useEffect(() => {
    lenis?.stop()
    document.documentElement.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      lenis?.start()
      document.documentElement.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [lenis, onClose])

  const shown = links.find((l) => l.to === hover)

  return (
    <motion.div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label={t.nav.menu}
      data-lenis-prevent
      className="fixed inset-0 z-[60] flex h-[100dvh] flex-col overflow-hidden bg-onyx"
      initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={{ clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.8, ease: curtain, delay: 0.1 } }}
      transition={{ duration: 0.9, ease: curtain }}
    >
      {/* The photo for the hovered word, very dark so the word stays the hero. */}
      <AnimatePresence>
        {fine && shown && (
          <motion.div
            key={shown.to}
            className="pointer-events-none fixed inset-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 0.3, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease }}
            aria-hidden="true"
          >
            <Img image={shown.image} alt="" eager className="h-full w-full object-cover object-[50%_20%]" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="shell relative grid h-16 shrink-0 grid-cols-[1fr_auto_1fr] items-center md:h-20">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="-ml-2 inline-flex h-11 items-center gap-3 justify-self-start px-2"
        >
          {/* The menu lines fold into a cross as the curtain comes down. */}
          <span className="relative block h-6 w-6" aria-hidden="true">
            <motion.span
              className="absolute left-0 top-1/2 h-px w-full bg-current"
              initial={{ rotate: 0, y: -4 }}
              animate={{ rotate: 45, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.35 }}
            />
            <motion.span
              className="absolute left-0 top-1/2 h-px w-full bg-current"
              initial={{ rotate: 0, y: 4 }}
              animate={{ rotate: -45, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.35 }}
            />
          </span>
          <span className="t-label hidden md:inline">{t.nav.close}</span>
        </button>
        <TLink
          to="/"
          onClick={onClose}
          className="font-serif text-[0.8rem] uppercase tracking-[0.12em] min-[400px]:text-[0.95rem] min-[400px]:tracking-[0.16em] sm:text-[1.15rem] sm:tracking-[0.24em] md:text-[1.3rem]"
        >
          <Logo name={brand.name} markClass="h-[1.9em]" nameClass="max-[359px]:hidden" />
        </TLink>
      </div>

      <nav className="shell relative flex min-h-0 flex-1 flex-col justify-center py-4" aria-label="Menu">
        <ul className="flex flex-col items-center gap-1 text-center" onPointerLeave={() => setHover(null)}>
          {links.map((l, i) => (
            <li key={l.to} className="overflow-hidden">
              <motion.div
                initial={{ y: '110%', rotate: 2 }}
                animate={{ y: 0, rotate: 0 }}
                exit={{ y: '-60%', opacity: 0, transition: { duration: 0.4, ease: curtain } }}
                transition={{ duration: 1.1, ease, delay: 0.4 + i * 0.07 }}
                style={{ transformOrigin: '0% 100%' }}
              >
                <TLink
                  to={l.to}
                  onClick={onClose}
                  onPointerEnter={() => setHover(l.to)}
                  onFocus={() => setHover(l.to)}
                  className={`t-display block pb-[0.08em] text-[clamp(2.25rem,min(7.5vw,9.5vh),5.75rem)] tracking-[0.04em] uppercase transition-opacity duration-500 ease-[var(--ease-out-expo)] ${
                    hover && hover !== l.to ? 'opacity-35' : 'opacity-100'
                  }`}
                >
                  {l.label}
                </TLink>
              </motion.div>
            </li>
          ))}
        </ul>
      </nav>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.75 }}
        className="shell relative flex shrink-0 flex-col items-center gap-3 pb-6 text-sm text-ivory/70 md:flex-row md:justify-between md:pb-8"
      >
        <LanguageSwitch id="menu" />
        <p>{brand.area}</p>
        <div className="flex items-center gap-6">
          <a href={contact.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-ivory">
            <InstagramLogo size={18} aria-hidden="true" /> {contact.instagramHandle}
          </a>
          <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-ivory">
            <WhatsappLogo size={18} aria-hidden="true" /> WhatsApp
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}
