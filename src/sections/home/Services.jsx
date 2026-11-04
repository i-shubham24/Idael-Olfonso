import { Suspense, lazy, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useContent } from '../../lib/i18n'
import { useReducedMotion } from '../../lib/media'
import Img from '../../components/Img'
import Video from '../../components/Video'
import Tilt from '../../components/Tilt'
import { ROLL_MARGIN, ROLL_RADIUS } from '../../three/rollingConfig'
import Button from '../../components/Button'
import { TLink } from '../../lib/transition'
import Reveal from '../../components/Reveal'

const RollingScene = lazy(() => import('../../three/RollingScene'))

const engraving = (s) => `${s.duration} MIN  ·  ${s.name.toUpperCase()}  ·  `

function Facts({ service }) {
  const { t } = useContent()
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
      <dt className="t-label text-stone">{t.services.session}</dt>
      <dt className="t-label text-stone">{t.services.format}</dt>
      <dd className="tabular">
        {service.duration} {t.servicePage.minutes}
      </dd>
      <dd>{service.format}</dd>
    </dl>
  )
}

function Intro({ compact = false }) {
  const { t, services } = useContent()
  return (
    <div className="flex flex-col justify-center">
      <Reveal as="h2"
        id="services-title"
        className={`t-h2 ${compact ? 'text-[clamp(2.75rem,4.4vw,5rem)]' : 'text-[clamp(3rem,5.6vw,6.25rem)]'}`}
      >
        {t.services.title}
      </Reveal>
      <p className={`t-lead mt-6 max-w-[34ch] text-ivory/70 ${compact ? 'hidden [@media(min-height:900px)]:block' : ''}`}>
        {t.services.intro}
      </p>
      <ol className={`grid gap-1 ${compact ? 'mt-8' : 'mt-10'}`} aria-label={t.services.title}>
        {services.map((s) => (
          <li key={s.slug}>
            <TLink to={`/services/${s.slug}`} className={`group flex items-baseline gap-4 rounded-[2px] bg-onyx-2 px-4 transition-colors duration-300 hover:bg-graphite ${compact ? 'py-2.5' : 'py-3.5'}`}>
              <span className="font-serif text-xl transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2">
                {s.name}
              </span>
              <span className="t-label tabular ml-auto text-stone">{s.duration} min</span>
            </TLink>
          </li>
        ))}
      </ol>
    </div>
  )
}

function Panel({ service, index, stacked = false }) {
  const { t } = useContent()
  // `stacked`: the narrow swipe-rail version (reduced motion only).
  return (
    <article
      className="service-panel group flex h-full w-full flex-col"
      aria-labelledby={`service-${service.slug}`}
      data-index={index}
    >
      <p className="t-label text-gold">{service.kicker}</p>
      <h3
        id={`service-${service.slug}`}
        className={`panel-name t-h2 mt-1.5 ${stacked ? 'text-[clamp(2.4rem,10vw,3.5rem)]' : 'text-[clamp(2.25rem,4.5vw,5.5rem)]'}`}
      >
        {service.name}
      </h3>
      <div
        className={`mt-3 grid min-h-0 flex-1 grid-cols-1 grid-rows-[1fr_auto] gap-4 ${stacked ? '' : 'lg:mt-3 lg:grid-cols-12 lg:grid-rows-1 lg:gap-8'}`}
      >
        <Tilt className={`min-h-[200px] ${stacked ? '' : 'lg:col-span-8'}`}>
          <TLink
            to={`/services/${service.slug}`}
            tabIndex={-1}
            aria-hidden="true"
            data-cursor={t.cursor.view}
            className="relative block h-full overflow-hidden rounded-[2px] bg-graphite"
          >
            {/* Services with a clip of Idael play it while the panel is in view; the rest show a photo. */}
            {service.video ? (
              <Video
                video={service.video}
                className="panel-img will-change-transform absolute inset-0 h-full w-full scale-[1.12] object-cover"
              />
            ) : (
              <Img
                image={service.image}
                alt=""
                sizes="(min-width: 1024px) 50vw, 85vw"
                className="panel-img will-change-transform absolute inset-0 h-full w-full scale-[1.12] object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)]"
              />
            )}
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(10_10_11/0.5),transparent_40%)]" />
          </TLink>
        </Tilt>
        <div className={`flex flex-col justify-end gap-6 ${stacked ? '' : 'lg:col-span-4'}`}>
          <p className={`max-w-[34ch] text-ivory/80 ${stacked ? '' : 'lg:t-lead'}`}>{service.summary}</p>
          <Facts service={service} />
          <div>
            <Button to={`/services/${service.slug}`} variant="ghost">
              {t.services.see}
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}

/*
  Every screen size: the section pins and the services pan sideways while a 3D bezel
  rolls along the bottom, its engraving following the service above it.
  Reduced motion: a native swipe rail, no pinning.
*/
export default function Services() {
  const { services } = useContent()
  const root = useRef(null)
  const track = useRef(null)
  const progress = useRef(0)
  // Which service the bezel is rolling under; the engraving follows it in the current language.
  const [roll, setRoll] = useState(0)
  const label = engraving(services[roll] ?? services[0])
  const [active, setActive] = useState(false)
  const reduced = useReducedMotion()
  // Pinned and panning on every screen size; reduced motion gets the swipe rail.
  const pan = !reduced

  useLayoutEffect(() => {
    if (!pan) return
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.service-panel')
      const distance = () => track.current.scrollWidth - window.innerWidth
      let panelOffsets = []
      let last = 0
      const measurePanels = () => {
        panelOffsets = panels.map((el) => ({
          left: el.offsetLeft,
          right: el.offsetLeft + el.offsetWidth,
        }))
      }
      measurePanels()

      const tween = gsap.to(track.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
          refreshPriority: 1,
          onRefresh: measurePanels,
          onToggle: (self) => setActive(self.isActive),
          onUpdate(self) {
            progress.current = self.progress
            // The bezel takes the engraving of whichever service it is rolling under.
            const stripH = window.innerHeight * 0.2
            const margin = stripH * ROLL_RADIUS * ROLL_MARGIN
            const bezelX = margin + (window.innerWidth - margin * 2) * self.progress
            const trackX = -distance() * self.progress
            let best = 0
            let bestD = Infinity
            for (let i = 0; i < panelOffsets.length; i++) {
              const pLeft = panelOffsets[i].left + trackX
              const pRight = panelOffsets[i].right + trackX
              const d = bezelX < pLeft ? pLeft - bezelX : bezelX > pRight ? bezelX - pRight : 0
              if (d < bestD) {
                bestD = d
                best = i
              }
            }
            if (best !== last) {
              last = best
              setRoll(best)
            }
          },
        },
      })

      panels.forEach((panel) => {
        gsap.fromTo(
          panel.querySelector('.panel-img'),
          { scale: 1.2 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: 'left right',
              end: 'center center',
              scrub: true,
            },
          },
        )
        gsap.fromTo(
          panel.querySelector('.panel-name'),
          { xPercent: 14, opacity: 0.15 },
          {
            xPercent: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: 'left 85%',
              end: 'left 25%',
              scrub: true,
            },
          },
        )
      })
    }, root)
    return () => ctx.revert()
  }, [pan])

  if (!pan) {
    return (
      <section id="services" className="py-24 md:py-32" aria-labelledby="services-title">
        <div className="shell">
          <Intro />
        </div>
        <div
          className="rail mt-14 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 md:scroll-px-8 md:px-8"
          data-lenis-prevent
        >
          {services.map((s, i) => (
            <div key={s.slug} className="w-[86vw] max-w-[560px] shrink-0 snap-start">
              <div className="h-[66vh] min-h-[540px]">
                <Panel service={s} index={i} stacked />
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section ref={root} id="services" className="relative z-[6] h-[100svh] overflow-hidden bg-ink" aria-labelledby="services-title">
      <div
        ref={track}
        className="flex h-full items-stretch gap-[6vw] pb-[14vh] pl-4 pr-[8vw] pt-[70px] will-change-transform md:pl-8 lg:gap-[5vw] lg:pb-[13vh] lg:pl-[max(3rem,calc((100vw-1440px)/2+3rem))] lg:pt-[72px]"
      >
        <div className="w-[86vw] shrink-0 sm:w-[60vw] lg:w-[min(32vw,480px)]">
          <Intro compact />
        </div>
        {services.map((s, i) => (
          <div key={s.slug} className="w-[86vw] shrink-0 md:w-[78vw] lg:w-[min(84vw,1400px)]">
            <Panel service={s} index={i} />
          </div>
        ))}
      </div>
      <div className={`pointer-events-none absolute inset-x-0 bottom-0 h-[20vh] transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true">
        <Suspense fallback={null}>
          <RollingScene progress={progress} label={label} active={active} />
        </Suspense>
      </div>
    </section>
  )
}
