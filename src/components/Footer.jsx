import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { useLocation } from 'react-router'
import { EnvelopeSimple, InstagramLogo, WhatsappLogo } from '@phosphor-icons/react'
import { useContent } from '../lib/i18n'
import { prefersReducedMotion } from '../lib/media'
import { TLink } from '../lib/transition'
import Button from './Button'
import Img from './Img'
import Title from './Title'
import Logo from './Logo'
import { NEWS_EVENT } from './Newsletter'

/*
  The close of every page:
  1. A full width photograph of Idael that opens out from a framed card as
     it arrives, with the closing line and the booking button over it.
     (Not on /book, where the calendar already is.)
  2. Columns of links in the site serif, a thin line, then the legal row.
*/
export default function Footer() {
  const { t, brand, contact, images, services } = useContent()
  const { pathname } = useLocation()
  const f = t.footer
  const root = useRef(null)
  const year = new Date().getFullYear()
  const linkCls = 'inline-flex items-center gap-2 transition-colors duration-300 hover:text-ivory'
  // Links in the site's serif, sentence case: quieter and more personal than shouted capitals.
  const colLink = 'inline-flex items-center gap-2.5 font-serif text-[1.2rem] leading-snug text-ivory/75 transition-colors duration-300 hover:text-ivory'
  const cta = !pathname.startsWith('/book')

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      if (cta) {
        const st = { trigger: '.close-band', start: 'top bottom', end: 'top 20%', scrub: true }
        gsap.fromTo(
          '.close-band',
          { clipPath: 'inset(0% 6% 0% 6% round 10px)' },
          { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: st },
        )
        gsap.fromTo('.close-img', { scale: 1.2 }, { scale: 1, ease: 'none', scrollTrigger: { ...st, end: 'bottom top' } })
      }
    }, root)
    return () => ctx.revert()
  }, [cta])

  return (
    <footer ref={root} className="bg-onyx-2">
      {cta && (
        <section className="close-band relative flex min-h-[86svh] items-end overflow-hidden" aria-labelledby="closing-cta">
          <div className="absolute inset-0">
            <Img
              image={images.closing}
              alt=""
              width={1800}
              sizes="100vw"
              className="close-img h-full w-full object-cover object-[50%_30%]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(10_10_11/0.92),rgb(10_10_11/0.35)_55%,rgb(10_10_11/0.15))]" />
          </div>
          <div className="shell relative grid w-full gap-10 pb-16 md:pb-24 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Title id="closing-cta" kicker={f.kicker} kickerClass="text-ivory/70" className="t-display text-[clamp(3rem,6.4vw,7rem)]">
                {f.title}
              </Title>
              <p className="t-lead mt-6 max-w-[38ch] text-ivory/80">{f.intro}</p>
            </div>
            <div className="flex flex-col items-start gap-5 lg:col-span-4 lg:col-start-9 lg:items-end">
              <Button to="/#book" size="lg">
                {t.hero.cta}
              </Button>
              <a className={`${linkCls} text-ivory/75`} href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer">
                <WhatsappLogo size={18} aria-hidden="true" /> {f.message}
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Equinox style close: columns of links, a thin line, then the legal row. */}
      <div className="shell pb-10 pt-20 md:pt-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <TLink to="/" className="inline-block font-serif text-[1.2rem] uppercase tracking-[0.22em]" aria-label={brand.name}>
              <Logo name={brand.name} markClass="h-[1.8em]" />
            </TLink>
            <p className="mt-4 text-sm text-ivory/60">
              {brand.area}
              <br />
              {t.nav.appointment}
            </p>
            <dl className="mt-6 grid gap-1 text-sm text-ivory/60">
              {t.availabilitySummary.map((h) => (
                <div key={h.label} className="flex flex-wrap gap-x-2">
                  <dt>{h.label}</dt>
                  <dd className="tabular text-ivory">{h.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <FooterColumn title={f.services} className="lg:col-span-2">
            {services.map((s) => (
              <TLink key={s.slug} className={colLink} to={`/services/${s.slug}`}>
                {s.name}
              </TLink>
            ))}
          </FooterColumn>

          <FooterColumn title={f.explore} className="lg:col-span-2">
            <TLink className={colLink} to="/about">{f.about}</TLink>
            <TLink className={colLink} to="/#method">{t.method.kicker}</TLink>
            <TLink className={colLink} to="/#clients">{t.clients.kicker}</TLink>
            <TLink className={colLink} to="/#places">{t.locations.title}</TLink>
            <TLink className={colLink} to="/#faq">{t.faq.title}</TLink>
            <TLink className={colLink} to="/#book">{t.nav.book}</TLink>
          </FooterColumn>

          <FooterColumn title={f.contact} className="lg:col-span-3">
            <a className={`${colLink} [overflow-wrap:anywhere]`} href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
            <a className={colLink} href={`tel:${contact.phone.replace(/\s/g, '')}`}>
              {contact.phone}
            </a>
          </FooterColumn>

          <FooterColumn title={f.follow} className="lg:col-span-2">
            <a className={colLink} href={contact.instagram} target="_blank" rel="noreferrer">
              <InstagramLogo size={16} aria-hidden="true" /> Instagram
            </a>
            <a className={colLink} href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer">
              <WhatsappLogo size={16} aria-hidden="true" /> WhatsApp
            </a>
            <button type="button" className={colLink} onClick={() => window.dispatchEvent(new Event(NEWS_EVENT))}>
              <EnvelopeSimple size={16} aria-hidden="true" /> {t.newsletter.open}
            </button>
          </FooterColumn>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ivory/10 pt-8 text-sm text-ivory/50 md:mt-20 md:flex-row md:items-center md:justify-between">
          <p className="flex flex-wrap gap-x-8 gap-y-2">
            <TLink className="transition-colors hover:text-ivory" to="/privacy">
              {f.privacy}
            </TLink>
            <TLink className="transition-colors hover:text-ivory" to="/imprint">
              {f.imprint}
            </TLink>
            <span>{f.photos}</span>
          </p>
          <p>
            © {year} {brand.name}. {f.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, className = '', children }) {
  return (
    <nav className={className} aria-label={title}>
      <h3 className="t-label mb-5 text-stone">{title}</h3>
      <div className="flex flex-col items-start gap-2.5">{children}</div>
    </nav>
  )
}
