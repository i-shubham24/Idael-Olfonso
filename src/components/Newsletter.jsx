import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { Check, X } from '@phosphor-icons/react'
import { useContent } from '../lib/i18n'
import { useLenis } from '../lib/scroll'
import { TLink } from '../lib/transition'
import Img from './Img'
import { Monogram } from './Logo'

/*
  Updates from Idael (no offers), in the Remedy Place pattern: a photograph on
  the left, one line and one email field on the right.

  When it appears: once, after 20 seconds on the site or half way down a
  page, whichever comes first. Never on /book. Closed, it stays away for two
  weeks; after signing up, for good. The footer link opens it on request.

  Sending: POST { email, lang } to VITE_NEWSLETTER_API when it is set (for
  example a Brevo or Mailchimp form endpoint). Without it the prototype only
  shows the thank you. Use double opt in on the mailing service (Swiss nFADP).
*/
const KEY = 'ia-news'
const AWAY_DAYS = 14
const DELAY = 20000
export const NEWS_EVENT = 'ia:newsletter'

function readState() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || 'null')
  } catch {
    return null
  }
}
function writeState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ state, at: Date.now() }))
  } catch {
    /* storage blocked */
  }
}
function mayShow() {
  const s = readState()
  if (!s) return true
  if (s.state === 'joined') return false
  return Date.now() - s.at > AWAY_DAYS * 864e5
}

const ease = [0.16, 1, 0.3, 1]

export default function Newsletter() {
  const { t, lang, brand, images } = useContent()
  const n = t.newsletter
  const { pathname } = useLocation()
  const lenis = useLenis()
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle, sending, done, error, failed
  const input = useRef(null)

  // Open once, by time or by scroll. Never over the calendar.
  useEffect(() => {
    if (pathname.startsWith('/book') || !mayShow()) return
    let fired = false
    const show = () => {
      if (fired) return
      fired = true
      setOpen(true)
    }
    const timer = setTimeout(show, DELAY)
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (max > 0 && window.scrollY / max > 0.5) show()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [pathname])

  // The footer link opens it on request.
  useEffect(() => {
    const onAsk = () => {
      setStatus('idle')
      setOpen(true)
    }
    window.addEventListener(NEWS_EVENT, onAsk)
    return () => window.removeEventListener(NEWS_EVENT, onAsk)
  }, [])

  // While open: page holds still, Escape closes, focus goes to the field.
  useEffect(() => {
    if (!open) return
    lenis?.stop()
    const onKey = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    const id = setTimeout(() => input.current?.focus({ preventScroll: true }), 500)
    return () => {
      lenis?.start()
      window.removeEventListener('keydown', onKey)
      clearTimeout(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, lenis])

  const close = () => {
    setOpen(false)
    if (status !== 'done') writeState('dismissed')
  }

  const submit = async (e) => {
    e.preventDefault()
    const value = email.trim().toLowerCase().slice(0, 254)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setStatus('error')
      input.current?.focus()
      return
    }
    setStatus('sending')
    try {
      const api = import.meta.env.VITE_NEWSLETTER_API
      if (api) {
        const res = await fetch(api, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: value, lang }),
        })
        if (!res.ok) throw new Error(String(res.status))
      } else {
        await new Promise((r) => setTimeout(r, 700))
      }
      writeState('joined')
      setStatus('done')
    } catch {
      setStatus('failed')
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.15 } }}
          transition={{ duration: 0.6 }}
          data-lenis-prevent
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default bg-onyx/75 backdrop-blur-sm"
            onClick={close}
            aria-label={n.close}
            tabIndex={-1}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="news-title"
            className="relative grid max-h-[calc(100dvh-2rem)] w-full max-w-[980px] overflow-hidden rounded-[2px] bg-onyx shadow-[0_40px_120px_rgb(0_0_0/0.7)] md:grid-cols-2"
            initial={{ opacity: 0, y: 40, clipPath: 'inset(6% 4% 6% 4% round 6px)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0% round 2px)' }}
            exit={{ opacity: 0, y: 24, transition: { duration: 0.4 } }}
            transition={{ duration: 1, ease }}
          >
            {/* The photo simply fills the height of the text column; the panel never scrolls. */}
            <div className="relative hidden md:block">
              <Img image={images.host} alt="" width={900} className="absolute inset-0 h-full w-full object-cover object-[50%_25%]" />
            </div>

            <div className="relative flex flex-col justify-center px-6 pb-8 pt-14 text-center md:px-12 md:py-[clamp(2rem,6vh,3.5rem)]">
              <button
                type="button"
                onClick={close}
                aria-label={n.close}
                className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center text-ivory/70 transition-colors hover:text-ivory"
              >
                <X size={20} aria-hidden="true" />
              </button>

              <Monogram className="mx-auto h-12 w-auto text-ivory" />
              <p className="mt-4 font-serif text-[1rem] uppercase tracking-[0.3em] text-ivory/90">{brand.name}</p>
              <p className="t-label mt-4 text-gold">{n.kicker}</p>

              <AnimatePresence mode="wait" initial={false}>
                {status === 'done' ? (
                  <motion.div key="done" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
                    <span className="mx-auto mt-10 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-ink">
                      <Check size={22} weight="bold" aria-hidden="true" />
                    </span>
                    <h2 id="news-title" className="t-display mt-8 text-[clamp(2.5rem,4vw,3.5rem)]">
                      {n.done}
                    </h2>
                    <p className="mx-auto mt-4 max-w-[34ch] text-ivory/70" aria-live="polite">
                      {n.doneText}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form key="form" noValidate onSubmit={submit} exit={{ opacity: 0, y: -12, transition: { duration: 0.3 } }}>
                    <h2 id="news-title" className="t-display mt-4 text-[clamp(2rem,min(3.6vw,6.5vh),3.25rem)]">
                      {n.title}
                    </h2>
                    <p className="mx-auto mt-4 max-w-[40ch] text-[0.95rem] text-ivory/70">{n.text}</p>
                    <label htmlFor="news-email" className="sr-only">
                      {n.email}
                    </label>
                    <input
                      ref={input}
                      id="news-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder={n.email}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (status === 'error' || status === 'failed') setStatus('idle')
                      }}
                      aria-invalid={status === 'error'}
                      aria-describedby={status === 'error' || status === 'failed' ? 'news-msg' : undefined}
                      className={`mt-6 h-12 w-full rounded-[2px] px-5 text-center outline-none focus-visible:outline-none text-ivory placeholder:text-stone/80 transition-colors ${
                        status === 'error' ? 'bg-[#2e1c18]' : 'bg-graphite hover:bg-line focus:bg-line'
                      }`}
                    />
                    {(status === 'error' || status === 'failed') && (
                      <p id="news-msg" className="mt-3 text-sm text-[#e08a78]">
                        {status === 'error' ? n.error : n.failed}
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="mt-3 h-12 w-full rounded-[2px] bg-gold text-[0.72rem] font-medium uppercase tracking-[0.2em] text-ink transition-colors duration-500 hover:bg-gold-2 disabled:opacity-60"
                    >
                      {status === 'sending' ? n.sending : n.cta}
                    </button>
                    <p className="mt-5 text-sm text-ivory/50">
                      {n.privacy}{' '}
                      <TLink to="/privacy" onClick={close} className="underline underline-offset-4 hover:text-ivory">
                        {n.privacyLink}
                      </TLink>
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
