import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { X } from '@phosphor-icons/react'
import { TLink } from '../lib/transition'
import { useLenis } from '../lib/scroll'
import { availabilitySummary, contact } from '../content/site'
import Button from './Button'
import { NAV_LINKS } from './Nav'

const ease = [0.16, 1, 0.3, 1]

export default function MobileMenu({ onClose }) {
  const lenis = useLenis()
  const closeRef = useRef(null)

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

  return (
    <motion.div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      data-lenis-prevent
      className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-onyx"
      initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      transition={{ duration: 0.7, ease }}
    >
      <div className="shell flex h-[72px] shrink-0 items-center justify-end">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="t-label inline-flex h-12 items-center gap-2 rounded-[2px] bg-graphite px-5"
        >
          <X size={16} aria-hidden="true" />
          Close
        </button>
      </div>
      <nav className="shell flex flex-1 flex-col justify-between gap-12 pb-10 pt-6" aria-label="Mobile">
        <ul className="flex flex-col gap-1">
          {[{ to: '/', label: 'Home' }, ...NAV_LINKS, { to: '/book', label: 'Book' }].map((l, i) => (
            <li key={l.to} className="overflow-hidden">
              <motion.div
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.15 + i * 0.05 }}
              >
                <TLink
                  to={l.to}
                  onClick={onClose}
                  className="t-h2 block py-1 text-[clamp(2.75rem,13vw,4.75rem)]"
                >
                  {l.label}
                </TLink>
              </motion.div>
            </li>
          ))}
        </ul>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.5 }}
          className="flex flex-col gap-8"
        >
          <Button to="/book?type=consultation" size="lg" onClick={onClose} magnetic={false} full>
            Book a free consultation
          </Button>
          <div className="grid grid-cols-2 gap-6 text-sm text-stone">
            <div>
              <p className="text-ivory">{contact.area}</p>
              <p>By appointment only</p>
            </div>
            <div>
              {availabilitySummary.map((h) => (
                <p key={h.label}>
                  {h.label}: {h.value}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      </nav>
    </motion.div>
  )
}
