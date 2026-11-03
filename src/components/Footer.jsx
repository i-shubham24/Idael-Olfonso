import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowUpRight, InstagramLogo, WhatsappLogo } from '@phosphor-icons/react'
import { availabilitySummary, brand, contact } from '../content/site'
import { prefersReducedMotion } from '../lib/media'
import { TLink } from '../lib/transition'
import { useFitText } from '../lib/useFitText'
import Button from './Button'

/*
  The one deliberate theme switch on the site: the page turns ivory at the end.
  The panel widens to full bleed as it arrives and the name rises letter by
  letter out of the bottom edge.
*/
export default function Footer({ cta = true }) {
  const root = useRef(null)
  const panel = useRef(null)
  const word = useRef(null)
  useFitText(word)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        panel.current,
        { clipPath: 'inset(0% 3% 0% 3% round 4px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 0px)',
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top 35%', scrub: true },
        },
      )
      gsap.fromTo(
        '.ft-letter',
        { yPercent: 100 },
        {
          yPercent: 0,
          ease: 'none',
          stagger: 0.04,
          scrollTrigger: { trigger: word.current, start: 'top bottom', end: 'bottom bottom', scrub: 0.8 },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [])

  const year = new Date().getFullYear()
  const linkCls = 'inline-flex items-center gap-2 transition-colors hover:text-ink'

  return (
    <footer ref={root} className="relative">
      <div ref={panel} className="bg-ivory text-ink">
        {cta && (
          <section className="shell pb-20 pt-24 md:pb-28 md:pt-40" aria-labelledby="closing-cta">
            <h2 id="closing-cta" className="t-h2 max-w-[14ch] text-[clamp(3rem,8.5vw,9rem)]">
              Start with a <em className="text-[#8a6d3f]">free consultation.</em>
            </h2>
            <div className="mt-10 flex flex-col items-start gap-10 md:mt-14 md:flex-row md:items-end md:justify-between">
              <p className="t-lead max-w-[44ch] text-ink/70">
                A 20 minute call by phone or video. Tell Idael what you want to achieve and when you can train, and he
                will suggest how to start.
              </p>
              <Button to="/book?type=consultation" variant="ink" size="xl">
                Book a consultation
              </Button>
            </div>
          </section>
        )}

        <div
          className={`shell grid gap-10 pb-16 sm:grid-cols-2 lg:grid-cols-4 ${cta ? 'pt-8' : 'pt-28'}`}
        >
          <div>
            <h3 className="t-label mb-4 text-ink/55">Where</h3>
            <p className="font-serif text-2xl leading-tight">{contact.area}</p>
            <p className="mt-2 text-ink/65">Your home, your hotel, outdoors or a private studio.</p>
          </div>
          <div>
            <h3 className="t-label mb-4 text-ink/55">Availability</h3>
            <dl className="grid gap-1 text-ink/65">
              {availabilitySummary.map((h) => (
                <div key={h.label} className="flex flex-wrap gap-x-2">
                  <dt>{h.label}</dt>
                  <dd className="tabular text-ink">{h.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h3 className="t-label mb-4 text-ink/55">Contact</h3>
            <ul className="grid gap-1 text-ink/65">
              <li>
                <a className={linkCls} href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </li>
              <li>
                <a className={linkCls} href={`tel:${contact.phone.replace(/\s/g, '')}`}>
                  {contact.phone}
                </a>
              </li>
              <li>
                <a className={linkCls} href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer">
                  <WhatsappLogo size={18} aria-hidden="true" /> Message Idael
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="t-label mb-4 text-ink/55">Explore</h3>
            <ul className="grid gap-1 text-ink/65">
              <li>
                <TLink className={linkCls} to="/about">
                  About Idael
                </TLink>
              </li>
              <li>
                <TLink className={linkCls} to="/#services">
                  Services
                </TLink>
              </li>
              <li>
                <TLink className={linkCls} to="/book">
                  Book a session <ArrowUpRight size={14} aria-hidden="true" />
                </TLink>
              </li>
              <li className="pt-2">
                <a className={linkCls} href={contact.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                  <InstagramLogo size={22} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="shell overflow-hidden">
          <div className="flex justify-center">
            <p
              ref={word}
              aria-hidden="true"
              className="t-display flex select-none whitespace-nowrap pb-[0.06em] leading-[0.9]"
            >
              {[...brand.name].map((ch, i) => (
                <span key={i} className="inline-block overflow-hidden">
                  <span className="ft-letter inline-block">{ch === ' ' ? ' ' : ch}</span>
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="shell flex flex-col gap-2 py-6 text-sm text-ink/55 sm:flex-row sm:justify-between">
          <p>
            © {year} {brand.name}. All rights reserved.
          </p>
          <p className="flex gap-6">
            <TLink className="hover:text-ink" to="/privacy">
              Privacy
            </TLink>
            <TLink className="hover:text-ink" to="/imprint">
              Imprint
            </TLink>
            <span>Demo photography from Unsplash</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
