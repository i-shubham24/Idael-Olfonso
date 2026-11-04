import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { useContent } from '../../lib/i18n'
import { prefersReducedMotion } from '../../lib/media'
import Img from '../../components/Img'
import Button from '../../components/Button'
import Reveal from '../../components/Reveal'

// Bento placement for exactly six cells: five places and the availability card.
const PLACE = {
  studio: 'lg:col-span-7 lg:row-span-2 min-h-[440px] lg:min-h-[680px]',
  residence: 'lg:col-span-5 min-h-[320px]',
  hotel: 'lg:col-span-5 min-h-[320px]',
  outdoors: 'lg:col-span-4 min-h-[360px]',
  online: 'lg:col-span-4 min-h-[360px]',
}

function Zone({ zone }) {
  return (
    <figure
      className={`zone group relative overflow-hidden rounded-[2px] bg-graphite ${PLACE[zone.id] ?? 'lg:col-span-4 min-h-[300px]'}`}
    >
      <div className="zone-mask will-change-[clip-path] absolute inset-0">
        <Img
          image={zone.image}
          alt=""
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="zone-img will-change-transform absolute inset-[-8%_0] h-[116%] w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(10_10_11/0.85),rgb(10_10_11/0)_60%)] transition-opacity duration-700 group-hover:opacity-70" />
      </div>
      <figcaption className="absolute inset-x-0 bottom-0 p-5 md:p-7">
        <span className="t-h3 block text-3xl md:text-4xl">{zone.name}</span>
        <span className="mt-2 block max-w-[34ch] text-sm text-ivory/75 md:text-base">{zone.detail}</span>
      </figcaption>
    </figure>
  )
}

function AvailabilityCell() {
  const { t } = useContent()
  return (
    <div className="zone flex min-h-[360px] flex-col justify-between rounded-[2px] bg-onyx-2 p-6 md:p-8 lg:col-span-4">
      <div>
        <p className="font-serif text-3xl">{t.locations.available}</p>
        <dl className="mt-8 grid gap-4">
          {t.availabilitySummary.map((h) => (
            <div key={h.label}>
              <dt className="t-label text-stone">{h.label}</dt>
              <dd className="tabular mt-1 font-serif text-2xl text-ivory">{h.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="mt-8">
        <Button to="/#book" variant="ivory">
          {t.locations.bookTime}
        </Button>
      </div>
    </div>
  )
}

export default function Locations() {
  const { t, zones } = useContent()
  const root = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.zone').forEach((cell) => {
        const mask = cell.querySelector('.zone-mask')
        const img = cell.querySelector('.zone-img')
        if (mask) {
          gsap.fromTo(
            mask,
            { clipPath: 'inset(100% 0% 0% 0%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 1.5,
              ease: 'expo.inOut',
              scrollTrigger: { trigger: cell, start: 'top 85%', once: true },
            },
          )
        } else {
          gsap.from(cell, {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: { trigger: cell, start: 'top 85%', once: true },
          })
        }
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: 'none',
              scrollTrigger: { trigger: cell, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        }
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="locations" className="shell py-28 md:py-44" aria-labelledby="locations-title">
      <Reveal as="h2" id="locations-title" className="t-h2 text-[clamp(3rem,7vw,7.5rem)]">
        {t.locations.title}
      </Reveal>
      <p className="t-lead mt-6 max-w-[46ch] text-ivory/70">{t.locations.intro}</p>
      <div className="mt-14 grid grid-cols-1 gap-3 md:mt-20 md:grid-cols-2 lg:grid-cols-12 lg:gap-4">
        {zones.map((z) => (
          <Zone key={z.id} zone={z} />
        ))}
        <AvailabilityCell />
      </div>
    </section>
  )
}
