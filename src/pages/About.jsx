import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { useContent } from '../lib/i18n'
import { usePageReady } from '../lib/reveal'
import { prefersReducedMotion, useReducedMotion } from '../lib/media'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import Img from '../components/Img'
import Button from '../components/Button'
import Reveal from '../components/Reveal'

export default function About() {
  const { t, about, brand } = useContent()
  useDocumentTitle(about.title)
  const root = useRef(null)
  const ready = usePageReady()
  const reduced = useReducedMotion()
  const [first, last] = brand.name.split(' ')
  const storyWords = about.story[0].split(' ')

  // Entrance once the transition panel lifts.
  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      if (!ready) {
        gsap.set('.ab-word', { yPercent: 110 })
        gsap.set('.ab-fade', { opacity: 0, y: 24 })
        gsap.set('.ab-portrait', { clipPath: 'inset(100% 0% 0% 0%)' })
        return
      }
      gsap
        .timeline()
        .fromTo('.ab-word', { yPercent: 110 }, { yPercent: 0, duration: 1.3, ease: 'expo.out', stagger: 0.1 }, 0.05)
        .fromTo(
          '.ab-portrait',
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut' },
          0,
        )
        .fromTo(
          '.ab-fade',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.08 },
          0.4,
        )
    }, root)
    return () => ctx.revert()
  }, [ready, reduced])

  // Scroll moments: the opening line reads in word by word, photos drift at different speeds.
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ab-story-word',
        { opacity: 0.12 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: { trigger: '.ab-story', start: 'top 75%', end: 'bottom 45%', scrub: true },
        },
      )
      gsap.fromTo(
        '.ab-portrait-img',
        { yPercent: 0 },
        {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: { trigger: '.ab-portrait', start: 'top top', end: 'bottom top', scrub: true },
        },
      )
      // A slow zoom out anchored at the top edge, so Idael's head never leaves the frame.
      gsap.utils.toArray('.ab-gal').forEach((el, i) => {
        gsap.fromTo(
          el.querySelector('img, [role="img"]'),
          { scale: i % 2 ? 1.08 : 1.14 },
          {
            scale: 1,
            transformOrigin: '50% 0%',
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })
      gsap.from('.ab-principle', {
        opacity: 0,
        y: 30,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.ab-principles', start: 'top 80%', once: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={root}>
      <section
        className="shell grid min-h-[100svh] grid-cols-1 items-end gap-12 pb-16 pt-32 lg:grid-cols-12 lg:pt-36"
        aria-labelledby="about-title"
      >
        <div className="lg:col-span-7">
          <h1 id="about-title" className="t-display text-[clamp(4.5rem,12vw,13rem)]" aria-label={brand.name}>
            <span className="block overflow-hidden pb-[0.06em]" aria-hidden="true">
              <span className="ab-word inline-block">{first}</span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]" aria-hidden="true">
              <span className="ab-word inline-block italic text-gold-2">{last}</span>
            </span>
          </h1>
          <p className="ab-fade t-lead mt-8 max-w-[46ch] text-ivory/75">{about.intro}</p>
          <dl className="ab-fade mt-10 grid max-w-[560px] grid-cols-1 gap-1.5 sm:grid-cols-2">
            <div className="rounded-[2px] bg-onyx-2 px-5 py-4">
              <dt className="t-label text-stone">{about.based}</dt>
              <dd className="mt-2">{brand.area}</dd>
            </div>
            <div className="rounded-[2px] bg-onyx-2 px-5 py-4">
              <dt className="t-label text-stone">{about.languages}</dt>
              <dd className="mt-2">{about.languageList}</dd>
            </div>
          </dl>
        </div>
        <div className="lg:col-span-5">
          <div className="ab-portrait relative aspect-[4/5] overflow-hidden rounded-[2px] bg-graphite">
            <Img
              image={about.standing}
              alt={about.portraitAlt}
              eager
              width={1100}
              ratio={1.25}
              sizes="(min-width: 1024px) 40vw, 92vw"
              className="ab-portrait-img absolute inset-[-6%_0_auto] h-[112%] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="ab-story shell py-28 md:py-44" aria-label={about.title}>
        <p className="t-h1 max-w-[24ch] text-[clamp(2.25rem,4.8vw,5rem)] leading-[1.05]">
          {storyWords.map((w, i) => (
            <span key={i} className="ab-story-word word">
              {w}&nbsp;
            </span>
          ))}
        </p>
        <div className="mt-16 grid gap-10 md:grid-cols-12">
          {about.story.slice(1).map((p, i) => (
            <p key={i} className={`t-lead text-ivory/70 md:col-span-5 ${i === 0 ? 'md:col-start-2' : 'md:col-start-8'}`}>
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="shell grid grid-cols-1 gap-3 md:grid-cols-12" aria-label="Photographs">
        <figure className="ab-gal relative aspect-[4/5] overflow-hidden rounded-[2px] bg-graphite md:col-span-5">
          <Img
            image={about.gallery[0]}
            alt=""
            width={1000}
            sizes="(min-width: 768px) 40vw, 92vw"
            className="absolute inset-0 h-full w-full object-cover object-[50%_4%]"
          />
        </figure>
        <figure className="ab-gal relative aspect-[4/5] overflow-hidden rounded-[2px] bg-graphite md:col-span-6 md:col-start-7 md:mt-40">
          <Img
            image={about.gallery[1]}
            alt=""
            width={1000}
            sizes="(min-width: 768px) 50vw, 92vw"
            className="absolute inset-0 h-full w-full object-cover object-[50%_4%]"
          />
        </figure>
      </section>

      <section className="ab-principles shell py-28 md:py-44" aria-labelledby="principles-title">
        <Reveal as="h2" id="principles-title" className="t-h2 text-[clamp(3rem,6vw,6.5rem)]">
          {about.principlesTitle}
        </Reveal>
        <ol className="mt-16 grid gap-1.5 md:grid-cols-3">
          {about.principles.map((p) => (
            <li key={p.title} className="ab-principle rounded-[2px] bg-onyx-2 p-6 md:p-8">
              <h3 className="t-h3 text-3xl md:text-4xl">{p.title}</h3>
              <p className="mt-4 max-w-[36ch] text-ivory/70">{p.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="shell pb-28 md:pb-44" aria-labelledby="credentials-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal as="h2" id="credentials-title" className="t-h2 text-[clamp(2.75rem,5vw,5rem)]">
              {about.credentialsTitle}
            </Reveal>
          </div>
          <ul className="grid gap-1.5 lg:col-span-7">
            {t.trainer.credentials.map((c) => (
              <li key={c.title} className="flex flex-col gap-1 rounded-[2px] bg-onyx-2 px-6 py-5 md:flex-row md:items-baseline md:gap-8">
                <span className="font-serif text-2xl md:w-1/2">{c.title}</span>
                <span className="text-stone">{c.detail}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-16 flex flex-wrap gap-3">
          <Button to="/#book" size="lg">
            {about.cta}
          </Button>
          <Button to="/#services" variant="ghost" size="lg">
            {about.services}
          </Button>
        </div>
      </section>
    </div>
  )
}
