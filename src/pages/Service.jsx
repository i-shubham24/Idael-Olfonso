import { Suspense, lazy, useLayoutEffect, useRef } from 'react'
import { useParams } from 'react-router'
import gsap from 'gsap'
import { Check } from '@phosphor-icons/react'
import { useContent } from '../lib/i18n'
import { usePageReady } from '../lib/reveal'
import { prefersReducedMotion, useReducedMotion } from '../lib/media'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { useInView } from '../lib/useInView'
import { useFitText } from '../lib/useFitText'
import { TLink } from '../lib/transition'
import Button from '../components/Button'
import Img from '../components/Img'
import Video from '../components/Video'
import NotFound from './NotFound'
import Reveal from '../components/Reveal'

const ShowcaseScene = lazy(() => import('../three/ShowcaseScene'))

function SessionTimeline({ service }) {
  const { t } = useContent()
  const sp = t.servicePage
  const main = service.session.reduce((best, s, i, arr) => (s.minutes > arr[best].minutes ? i : best), 0)
  let start = 0
  return (
    <ol className="flex flex-col gap-1.5 md:flex-row">
      {service.session.map((s, i) => {
        const from = start
        start += s.minutes
        const isMain = i === main
        return (
          <li
            key={s.name}
            className={`seg flex min-h-[calc(var(--m)*7px)] origin-left flex-col justify-between gap-6 rounded-[2px] p-5 md:min-h-[240px] md:basis-0 ${
              isMain ? 'bg-gold text-ink' : i % 2 ? 'bg-graphite' : 'bg-onyx-2'
            }`}
            style={{ '--m': s.minutes, flexGrow: s.minutes }}
          >
            <span className="t-label tabular opacity-70">
              {sp.range(from, start)}
            </span>
            <span>
              <span className="t-h3 block text-2xl md:text-3xl">{s.name}</span>
              <span className="tabular mt-1 block text-sm opacity-75">
                {s.minutes} {sp.minutes}
              </span>
            </span>
          </li>
        )
      })}
    </ol>
  )
}

export default function Service() {
  const { services, t } = useContent()
  const { slug } = useParams()
  const service = services.find((s) => s.slug === slug)
  useDocumentTitle(service?.name ?? t.notFound.title)
  if (!service) return <NotFound />
  return <ServiceView key={service.slug} service={service} />
}

function ServiceView({ service }) {
  const { services, t, brand } = useContent()
  const sp = t.servicePage
  const root = useRef(null)
  const stage = useRef(null)
  const nextTitle = useRef(null)
  const intro = useRef(0)
  const ready = usePageReady()
  const reduced = useReducedMotion()
  const idx = services.indexOf(service)
  const next = services[(idx + 1) % services.length]
  const stageVisible = useInView(stage)
  useFitText(nextTitle)

  // Entrance once the transition panel lifts.
  useLayoutEffect(() => {
    if (reduced) {
      intro.current = 1
      return
    }
    const ctx = gsap.context(() => {
      if (!ready) {
        intro.current = 0
        gsap.set('.pg-word', { yPercent: 110 })
        gsap.set('.pg-fade', { opacity: 0, y: 24 })
        return
      }
      gsap
        .timeline()
        .fromTo(intro, { current: 0 }, { current: 1, duration: 2, ease: 'expo.out' }, 0)
        .fromTo('.pg-word', { yPercent: 110 }, { yPercent: 0, duration: 1.3, ease: 'expo.out', stagger: 0.08 }, 0.05)
        .fromTo(
          '.pg-fade',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.08 },
          0.35,
        )
    }, root)
    return () => ctx.revert()
  }, [ready, reduced])

  // Scroll moments: image band parallax and the session blocks filling in order.
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pg-band-img',
        { yPercent: -8, scale: 1.08 },
        {
          yPercent: 8,
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.pg-band', start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
      gsap.from('.seg', {
        scaleX: window.innerWidth >= 768 ? 0 : 1,
        opacity: 0,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.pg-session', start: 'top 75%', once: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={root}>
      <section
        className="shell grid min-h-[100svh] grid-cols-1 items-center gap-8 pb-16 pt-28 lg:grid-cols-12 lg:pt-28"
        aria-labelledby="pg-title"
      >
        <div className="min-w-0 lg:col-span-7">
          <p className="pg-fade flex items-center gap-4">
            <TLink to="/#services" className="t-label text-stone transition-colors hover:text-ivory">
              {sp.all}
            </TLink>
            <span className="t-label text-stone" aria-hidden="true">
              /
            </span>
            <span className="t-label text-gold">{service.kicker}</span>
          </p>
          <h1 id="pg-title" className="t-display mt-8 text-[clamp(3.75rem,9vw,9.5rem)]" aria-label={service.name}>
            {service.name.split(' ').map((w, i) => (
              <span key={i} className="block overflow-hidden pb-[0.06em]" aria-hidden="true">
                <span className={`pg-word inline-block ${i > 0 ? 'italic text-gold-2' : ''}`}>{w}</span>
              </span>
            ))}
          </h1>
          <p className="pg-fade t-lead mt-8 max-w-[46ch] text-ivory/75">{service.description}</p>
          <dl className="pg-fade mt-10 grid max-w-[600px] grid-cols-1 gap-1.5 sm:grid-cols-3">
            {[
              [sp.session, `${service.duration} ${sp.minutes}`],
              [sp.format, service.format],
              [sp.where, service.where],
            ].map(([k, v]) => (
              <div key={k} className="rounded-[2px] bg-onyx-2 px-5 py-4">
                <dt className="t-label text-stone">{k}</dt>
                <dd className="mt-2 text-sm">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="pg-fade mt-10 flex flex-wrap gap-3">
            <Button to="/#book" size="lg">
              {sp.book}
            </Button>
            <Button to={`/services/${service.slug}#session`} variant="ghost" size="lg">
              {sp.plan}
            </Button>
          </div>
        </div>
        <div
          ref={stage}
          className="relative order-first aspect-square w-full max-w-[560px] justify-self-center lg:order-none lg:col-span-5 lg:max-w-none"
        >
          <Suspense fallback={null}>
            <ShowcaseScene
              label={`${service.duration} MIN  ·  ${service.name.toUpperCase()}  ·  `}
              reduced={reduced}
              intro={intro}
              active={stageVisible}
            />
          </Suspense>
        </div>
      </section>

      <div className="pg-band relative h-[60vh] overflow-hidden md:h-[84vh]">
        {service.video ? (
          <Video
            video={service.video}
            quality="1080p"
            className="pg-band-img absolute inset-[-10%_0] h-[120%] w-full object-cover"
          />
        ) : (
          <Img
            image={service.image}
            alt={`${service.name}, ${brand.name}`}
            className="pg-band-img absolute inset-[-10%_0] h-[120%] w-full object-cover"
          />
        )}
      </div>

      <section id="session" className="pg-session shell py-28 md:py-40" aria-labelledby="session-title">
        <Reveal as="h2" id="session-title" className="t-h2 max-w-[16ch] text-[clamp(3rem,6.5vw,7rem)]">
          {sp.planTitle(service.duration)}
        </Reveal>
        <p className="t-lead mt-6 max-w-[44ch] text-ivory/70">{sp.planIntro}</p>
        <div className="mt-14">
          <SessionTimeline service={service} />
        </div>
      </section>

      <section className="shell grid gap-14 pb-28 md:grid-cols-2 md:pb-40" aria-label={sp.suitsYou}>
        <div>
          <Reveal as="h2" className="t-h3 text-4xl md:text-5xl">{sp.suitsYou}</Reveal>
          <ul className="mt-8 grid gap-1.5">
            {service.forWho.map((f) => (
              <li key={f} className="t-lead flex gap-4 rounded-[2px] bg-onyx-2 px-5 py-4">
                <Check size={20} className="mt-1 shrink-0 text-gold" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid content-start gap-10">
          <div>
            <Reveal as="h2" className="t-h3 text-4xl md:text-5xl">{sp.where}</Reveal>
            <p className="t-lead mt-4 text-ivory/75">{service.where}</p>
          </div>
          <div>
            <Reveal as="h2" className="t-h3 text-4xl md:text-5xl">{sp.start}</Reveal>
            <p className="t-lead mt-4 text-ivory/75">{sp.startText}</p>
            <div className="mt-8">
              <Button to="/#book" variant="ghost">
                {sp.book}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <TLink
        to={`/services/${next.slug}`}
        className="group block overflow-hidden bg-onyx-2 transition-colors duration-500 hover:bg-graphite"
        data-cursor={t.cursor.next}
      >
        <div className="shell flex flex-col gap-4 py-16 md:py-24">
          <span className="t-label text-stone">{sp.next}</span>
          <span className="block overflow-hidden">
            <span
              ref={nextTitle}
              className="t-display inline-block whitespace-nowrap pb-[0.08em] transition-transform duration-1000 ease-[var(--ease-out-expo)] group-hover:translate-x-4"
            >
              {next.name}
            </span>
          </span>
          <span className="t-label text-gold">
            {next.duration} minutes · {next.kicker}
          </span>
        </div>
      </TLink>
    </div>
  )
}
