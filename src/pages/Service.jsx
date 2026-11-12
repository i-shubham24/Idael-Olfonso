import { useLayoutEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, ArrowUpRight, Check } from '@phosphor-icons/react'
import { useContent } from '../lib/i18n'
import { prefersReducedMotion } from '../lib/media'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { TLink } from '../lib/transition'
import Button from '../components/Button'
import Img from '../components/Img'
import Video from '../components/Video'
import Title from '../components/Title'
import Counter from '../components/Counter'
import Reveal from '../components/Reveal'
import NotFound from './NotFound'

export default function Service() {
  const { services, t } = useContent()
  const { slug } = useParams()
  const service = services.find((s) => s.slug === slug)
  useDocumentTitle(service?.name ?? t.notFound.title)
  if (!service) return <NotFound />
  return <ServiceView key={service.slug} service={service} />
}

/*
  One training, told in five moves:
  1. A full screen photograph that opens out of a frame, the name rising.
  2. What it is, brightening word by word as you read.
  3. The facts as large type.
  4. The session itself: the screen holds while you scroll through the hour,
     block by block, with a running minute count.
  5. Who it suits, beside a photo that holds still; then the other trainings.
*/
function ServiceView({ service }) {
  const { services, t, brand } = useContent()
  const sp = t.servicePage
  const root = useRef(null)
  const others = services.filter((s) => s.slug !== service.slug)
  const words = service.description.split(' ')

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .fromTo('.sv-frame', { clipPath: 'inset(14% 10% 14% 10% round 8px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1.8, ease: 'expo.inOut' }, 0)
        .fromTo('.sv-img', { scale: 1.3 }, { scale: 1.08, duration: 2.4 }, 0)
        .fromTo('.sv-in', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.1 }, 1)

      gsap.to('.sv-img', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: '.sv-hero', start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.fromTo(
        '.sv-word',
        { opacity: 0.15 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: { trigger: '.sv-statement', start: 'top 80%', end: 'bottom 50%', scrub: true },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={root}>
      {/* 1. Hero */}
      <section className="sv-hero relative h-[100svh] min-h-[620px] overflow-hidden bg-onyx" aria-labelledby="pg-title">
        <div className="sv-frame absolute inset-0 overflow-hidden">
          <Img
            image={service.hero ?? service.image}
            alt={`${service.name}, ${brand.name}`}
            eager
            width={1800}
            className="sv-img h-full w-full object-cover"
            style={{ objectPosition: service.heroFocus ?? '50% 30%' }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-onyx),rgb(10_10_11/0.4)_55%,rgb(10_10_11/0.25))]" />
        </div>
        <div className="shell relative flex h-full flex-col justify-end pb-14 md:pb-20">
          <TLink to="/#training" className="sv-in t-label inline-flex items-center gap-2 self-start text-ivory/70 transition-colors hover:text-ivory">
            <ArrowLeft size={14} aria-hidden="true" /> {sp.all}
          </TLink>
          <div className="mt-8">
            <Title as="h1" id="pg-title" kicker={`${service.kicker} · ${service.duration} ${sp.minutes}`} kickerClass="text-gold" className="t-display text-[clamp(3.5rem,9vw,9.5rem)]">
              {service.name}
            </Title>
          </div>
          <div className="sv-in mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="t-lead max-w-[42ch] text-ivory/80">{service.summary}</p>
            <Button to="/#book" size="lg">
              {t.hero.cta}
            </Button>
          </div>
        </div>
      </section>

      {/* 2. What it is */}
      <section className="sv-statement shell py-28 md:py-44" aria-label={service.name}>
        <p className="t-h1 mx-auto max-w-[26ch] text-center text-[clamp(2rem,4vw,3.75rem)] leading-[1.12]">
          {words.map((w, i) => (
            <span key={i} className="sv-word word">
              {w}&nbsp;
            </span>
          ))}
        </p>
      </section>

      {/* 3. Facts */}
      <section className="shell pb-28 md:pb-40" aria-label={sp.session}>
        <dl className="grid gap-14 md:grid-cols-3 md:gap-10">
          <Reveal>
            <dt className="t-label text-stone">{sp.session}</dt>
            <dd className="mt-4 flex items-baseline gap-3">
              <Counter value={String(service.duration)} className="t-display text-[clamp(5rem,10vw,9rem)] leading-none" />
              <span className="t-h3 text-3xl text-ivory/60">{sp.minutes}</span>
            </dd>
          </Reveal>
          <Reveal delay={0.1}>
            <dt className="t-label text-stone">{sp.format}</dt>
            <dd className="t-h2 mt-4 text-[clamp(2rem,3.4vw,3rem)] leading-[1.05]">{service.format}</dd>
          </Reveal>
          <Reveal delay={0.2}>
            <dt className="t-label text-stone">{sp.where}</dt>
            <dd className="t-h2 mt-4 text-[clamp(2rem,3.4vw,3rem)] leading-[1.05]">{service.where}</dd>
          </Reveal>
        </dl>
      </section>

      {/* 4. The session, scrolled through */}
      <SessionScroll service={service} />

      {/* 5. Who it suits */}
      <section className="shell py-28 md:py-44" aria-labelledby="suits-title">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-graphite lg:sticky lg:top-28">
              {service.video ? (
                <Video video={service.video} poster={service.photo} quality="720p" className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <Img image={service.photo ?? service.image} alt="" width={1000} className="absolute inset-0 h-full w-full object-cover object-[50%_15%]" />
              )}
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-10">
            <Title id="suits-title" className="t-display text-[clamp(2.75rem,5vw,5rem)]">
              {sp.suitsYou}
            </Title>
            <ul className="mt-14 grid gap-10">
              {service.forWho.map((f, i) => (
                <Reveal as="li" key={f} delay={i * 0.08} className="flex gap-6">
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-ink">
                    <Check size={16} weight="bold" aria-hidden="true" />
                  </span>
                  <p className="t-h3 text-[1.6rem] leading-snug md:text-[2rem]">{f}</p>
                </Reveal>
              ))}
            </ul>
            <Reveal className="mt-16">
              <p className="max-w-[40ch] text-ivory/65">{sp.startText}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* More ways to train */}
      <section className="shell pb-28 md:pb-40" aria-labelledby="more-title">
        <Title id="more-title" kicker={sp.next} className="t-display text-[clamp(2.5rem,4.5vw,4.5rem)]">
          {sp.more}
        </Title>
        <ul className="mt-12 grid gap-4 sm:grid-cols-3 md:gap-6">
          {others.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={i * 0.08}>
              <TLink to={`/services/${s.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-graphite">
                  <Img
                    image={s.image}
                    alt=""
                    width={800}
                    className="absolute inset-0 h-full w-full object-cover object-[50%_20%] transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(10_10_11/0.8),transparent_55%)]" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-6">
                    <div>
                      <p className="t-label text-ivory/60">{s.kicker}</p>
                      <h3 className="t-h3 mt-2 text-[1.75rem] md:text-[2rem]">{s.name}</h3>
                    </div>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ivory text-ink transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:translate-x-1">
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </TLink>
            </Reveal>
          ))}
        </ul>
      </section>
    </div>
  )
}

/*
  The hour, block by block. The section is tall and its content stays on
  screen (CSS sticky) while you scroll; scrolling moves a gold fill along the
  session bar, counts the minutes and names the block you are in.
*/
function SessionScroll({ service }) {
  const { t } = useContent()
  const sp = t.servicePage
  const root = useRef(null)
  const fill = useRef(null)
  const minute = useRef(null)
  const [active, setActive] = useState(0)
  const total = service.session.reduce((n, s) => n + s.minutes, 0)
  const starts = service.session.reduce((acc, s, i) => [...acc, i ? acc[i - 1] + service.session[i - 1].minutes : 0], [])

  useLayoutEffect(() => {
    const st = ScrollTrigger.create({
      trigger: root.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const m = self.progress * total
        if (fill.current) fill.current.style.transform = `scaleX(${self.progress})`
        if (minute.current) minute.current.textContent = String(Math.round(m)).padStart(2, '0')
        let i = 0
        while (i < starts.length - 1 && m >= starts[i + 1]) i++
        setActive(i)
      },
    })
    return () => st.kill()
  }, [total, starts])

  const current = service.session[active]

  return (
    <section
      ref={root}
      id="session"
      className="relative bg-onyx-2"
      style={{ height: `${120 + service.session.length * 45}svh` }}
      aria-labelledby="session-title"
    >
      {/* Pinned just below the header (64px phones, 80px from tablets), so nothing slides under it. */}
      <div className="sticky top-16 flex h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden md:top-20 md:h-[calc(100svh-5rem)]">
        <div className="shell w-full">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Title id="session-title" kicker={sp.plan} className="t-display text-[clamp(2.25rem,3.6vw,3.75rem)]">
              {sp.planTitle(service.duration)}
            </Title>
            <p className="t-display tabular text-[clamp(2.75rem,5vw,5rem)] leading-none text-ivory/90" aria-hidden="true">
              <span ref={minute}>00</span>
              <span className="text-ivory/35"> / {total}</span>
            </p>
          </div>

          {/* The block you are in, large. */}
          <div className="relative mt-10 h-[clamp(6.5rem,min(13vw,22svh),11rem)] overflow-hidden md:mt-14">
            {service.session.map((s, i) => (
              <div
                key={s.name}
                className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)] ${
                  i === active ? 'translate-y-0 opacity-100' : i < active ? '-translate-y-10 opacity-0' : 'translate-y-10 opacity-0'
                }`}
              >
                <p className="t-label tabular text-gold">{sp.range(starts[i], starts[i] + s.minutes)}</p>
                <p className="t-display mt-3 pb-[0.15em] text-[clamp(3rem,min(8.5vw,15svh),7.5rem)] leading-none">{s.name}</p>
              </div>
            ))}
            <p className="sr-only" aria-live="polite">
              {current.name}
            </p>
          </div>

          {/* The bar: each block as long as its minutes; gold runs along it as you scroll. */}
          <div className="relative mt-8 md:mt-12">
            <ol className="flex gap-1.5">
              {service.session.map((s, i) => (
                <li key={s.name} className="min-w-0" style={{ flexGrow: s.minutes, flexBasis: 0 }}>
                  <span className={`block h-2 rounded-full transition-colors duration-500 ${i <= active ? 'bg-ivory/25' : 'bg-ivory/10'}`} />
                  <span
                    className={`mt-4 hidden truncate text-sm transition-colors duration-500 md:block ${
                      i === active ? 'text-ivory' : 'text-ivory/40'
                    }`}
                  >
                    {s.name}
                  </span>
                  <span className={`tabular mt-1 hidden text-xs md:block ${i === active ? 'text-gold' : 'text-ivory/30'}`}>
                    {s.minutes} {sp.minutes}
                  </span>
                </li>
              ))}
            </ol>
            <span
              ref={fill}
              className="pointer-events-none absolute left-0 top-0 h-2 w-full origin-left rounded-full bg-gold"
              style={{ transform: 'scaleX(0)' }}
              aria-hidden="true"
            />
          </div>
          <p className="mt-8 max-w-[48ch] text-ivory/55">{sp.planIntro}</p>
        </div>
      </div>
    </section>
  )
}
