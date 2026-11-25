import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowDown, ArrowRight } from '@phosphor-icons/react'
import { useContent } from '../lib/i18n'
import { prefersReducedMotion } from '../lib/media'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import Img from '../components/Img'
import { TLink } from '../lib/transition'
import Reveal from '../components/Reveal'
import Title from '../components/Title'

/*
  Idael's story, laid out like a magazine profile:
  1. The name set large, the portrait overlapping it, a few facts in a ruled row.
  2. The story in short numbered chapters, with photos set off the grid.
  3. Training and experience on a dark photo band, mid page.
  4. How he works, as ruled rows; the footer band carries the booking button.
*/
export default function About() {
  const { t, about, brand, contact } = useContent()
  useDocumentTitle(about.title)
  const root = useRef(null)
  const [first, last] = splitName(brand.name)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .fromTo('.ab-frame', { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut' }, 0.1)
        .fromTo('.ab-portrait', { scale: 1.25 }, { scale: 1, duration: 2.2 }, 0.1)
        .fromTo('.ab-in', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.08 }, 0.5)

      // Hero portrait: the photo slides inside its frame while the frame itself
      // rises a little faster than the page, so the picture has depth.
      const hero = { trigger: '.ab-hero', start: 'top top', end: 'bottom top', scrub: true }
      gsap.fromTo('.ab-par', { yPercent: -4 }, { yPercent: 14, ease: 'none', scrollTrigger: hero })
      gsap.to('.ab-figure', { yPercent: -10, ease: 'none', scrollTrigger: hero })
      gsap.to('.ab-name', { yPercent: 18, ease: 'none', scrollTrigger: hero })

      // Photos in the story drift at slightly different speeds as you scroll.
      gsap.utils.toArray('.ab-drift').forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: Number(el.dataset.from ?? 8) },
          { yPercent: Number(el.dataset.to ?? -8), ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } },
        )
      })
    }, root)
    return () => ctx.revert()
  }, [])

  // The band's fixed photo is a full-screen layer; only paint it while the band is on screen.
  useEffect(() => {
    const band = root.current?.querySelector('.ab-band')
    const layer = band?.querySelector('.ab-band-layer')
    if (!band || !layer) return
    const io = new IntersectionObserver(([e]) => {
      layer.style.visibility = e.isIntersecting ? 'visible' : 'hidden'
    }, { rootMargin: '25% 0px' })
    io.observe(band)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={root}>
      {/* 1. Name and portrait */}
      <section className="ab-hero shell relative pb-20 pt-28 md:pb-28 lg:pt-36" aria-labelledby="about-title">
        <p className="ab-in t-label text-stone">{about.kicker}</p>

        <div className="relative mt-8 grid grid-cols-1 lg:grid-cols-12">
          <h1
            id="about-title"
            className="ab-name t-display relative z-10 text-[clamp(4rem,12.5vw,13rem)] leading-[0.86] lg:col-span-12"
          >
            <span className="ab-in block">{first}</span>
            <span className="ab-in block lg:pl-[18%]">{last}</span>
          </h1>

          {/* Portrait tucked under the second line on large screens. */}
          <figure className="ab-figure relative mt-10 lg:absolute lg:right-0 lg:top-[-2rem] lg:mt-0 lg:w-[34%]">
            <div className="ab-frame relative aspect-[4/5] overflow-hidden rounded-[2px] bg-graphite">
              <div className="ab-par absolute inset-x-0 -top-[12%] h-[124%]">
                <Img
                  image={about.standing}
                  alt={about.portraitAlt}
                  eager
                  width={1100}
                  sizes="(min-width: 1024px) 34vw, 92vw"
                  className="ab-portrait absolute inset-0 h-full w-full object-cover object-[50%_6%]"
                />
              </div>
            </div>
            <figcaption className="ab-in t-label mt-3 text-stone">{about.captions[0]}</figcaption>
          </figure>
        </div>

        <div className="mt-14 grid gap-12 lg:mt-24 lg:grid-cols-12">
          <p className="ab-in t-lead max-w-[40ch] text-ivory/80 lg:col-span-5">{about.intro}</p>
        </div>

        <dl className="ab-in mt-14 grid grid-cols-2 border-t border-line md:grid-cols-4 lg:mt-20">
          <Fact label={about.based} value={brand.area} />
          <Fact label={about.languages} value={about.languageList} />
          <Fact label={about.followersLabel} value={contact.followers} big />
          <div className="flex items-end border-l border-line py-6 pl-5 md:pl-6">
            <a href="#story" className="t-label inline-flex items-center gap-2 text-ivory/70 transition-colors hover:text-ivory">
              <ArrowDown size={14} aria-hidden="true" /> {about.scroll}
            </a>
          </div>
        </dl>
      </section>

      {/* 2. The story, in chapters */}
      <section id="story" className="shell scroll-mt-24 py-20 md:py-32" aria-label={about.title}>
        <Reveal className="text-center">
          <p className="t-label text-stone">
            <span className="tabular mr-3 text-gold">01</span>
            {about.chapters[0]}
          </p>
          <p className="t-h1 mx-auto mt-8 max-w-[36ch] text-[clamp(2.1rem,4.2vw,4rem)] leading-[1.1]">{about.story[0]}</p>
        </Reveal>

        <div className="mt-20 grid gap-16 md:mt-28 lg:grid-cols-12 lg:gap-10">
          {/* Photos set off the grid, the smaller one lower and overlapping. */}
          <div className="relative lg:col-span-6">
            <figure className="ab-drift relative w-[78%]" data-from="6" data-to="-6">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[2px] bg-graphite">
                <Img image={about.gallery[0]} alt="" width={900} sizes="(min-width: 1024px) 36vw, 70vw" className="absolute inset-0 h-full w-full object-cover object-[50%_10%]" />
              </div>
              <figcaption className="t-label mt-3 max-w-[44%] text-stone lg:max-w-none">{about.captions[1]}</figcaption>
            </figure>
            <figure className="ab-drift relative -mt-24 ml-auto w-[52%] md:-mt-40" data-from="18" data-to="-14">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-graphite outline outline-8 outline-onyx">
                <Img image={about.gallery[1]} alt="" width={700} sizes="(min-width: 1024px) 24vw, 48vw" className="absolute inset-0 h-full w-full object-cover object-[50%_10%]" />
              </div>
              <figcaption className="t-label mt-3 text-right text-stone">{about.captions[2]}</figcaption>
            </figure>
          </div>

          <ol className="grid content-start gap-16 lg:col-span-6 lg:col-start-7 lg:pt-10">
            {about.story.slice(1).map((p, i) => (
              <Reveal as="li" key={i} delay={i * 0.06} className="grid grid-cols-[3.5rem_1fr] gap-x-4 border-t border-line pt-8 md:grid-cols-[4.5rem_1fr]">
                <span className="t-label tabular text-gold">{String(i + 2).padStart(2, '0')}</span>
                <div>
                  <h2 className="t-h2 text-[clamp(2.25rem,3.4vw,3.25rem)]">{about.chapters[i + 1]}</h2>
                  <p className="t-lead mt-5 max-w-[40ch] text-[clamp(1.2rem,1.5vw,1.5rem)] text-ivory/75">{p}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 3. Training and experience, on a dark photo band */}
      {/* A window onto a photo that stays put: the photo is fixed to the screen and
          clip-path crops it to this section, so the pages above and below slide over it.
          (Works on iOS too, unlike background-attachment: fixed.) The photo runs past the
          bottom of the screen and sits on its own layer, so a late repaint while scrolling
          never shows an empty strip. */}
      <section
        className="ab-band on-dark relative flex min-h-[100svh] items-center bg-onyx py-28 [clip-path:inset(0)] md:py-40"
        aria-labelledby="credentials-title"
      >
        <div className="ab-band-layer pointer-events-none fixed inset-x-0 top-0 h-[115lvh] will-change-transform [transform:translateZ(0)]" aria-hidden="true">
          <Img image="/media/okyfit/idael-laugh.jpg" alt="" width={1800} sizes="100vw" className="absolute inset-0 h-full w-full object-cover object-[60%_27%]" />
          <div className="absolute inset-0 bg-[rgb(10_10_11/0.72)] lg:bg-[linear-gradient(to_right,rgb(10_10_11/0.94),rgb(10_10_11/0.8)_45%,rgb(10_10_11/0.42))]" />
        </div>
        <div className="shell relative grid w-full gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Title id="credentials-title" className="t-display text-[clamp(2.75rem,5vw,5rem)]">
              {about.credentialsTitle}
            </Title>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <ul>
            {t.trainer.credentials.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 0.08} className="grid grid-cols-[3rem_1fr] gap-x-4 border-t border-white/15 py-7">
                <span className="t-label tabular text-gold">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <p className="t-h3 text-[1.75rem]">{c.title}</p>
                  <p className="mt-1 text-ivory/70">{c.detail}</p>
                </div>
              </Reveal>
            ))}
            </ul>
            {/* Booking lives in the footer band at the end of the page. */}
            <TLink
              to="/#training"
              className="t-label mt-10 inline-flex items-center gap-3 border-b border-white/30 pb-2 text-ivory transition-colors hover:border-gold hover:text-gold"
            >
              {about.services} <ArrowRight size={14} aria-hidden="true" />
            </TLink>
          </div>
        </div>
      </section>

      {/* 4. How he works */}
      <section className="shell py-20 md:py-32" aria-labelledby="principles-title">
        <Title id="principles-title" className="t-display text-[clamp(2.75rem,5.5vw,5.5rem)]">
          {about.principlesTitle}
        </Title>
        <ol className="mt-14 border-b border-line md:mt-20">
          {about.principles.map((p, i) => (
            <Reveal
              as="li"
              key={p.title}
              delay={i * 0.06}
              className="group grid gap-3 border-t border-line py-8 transition-colors duration-500 md:grid-cols-12 md:items-baseline md:gap-6 md:py-10"
            >
              <span className="t-label tabular text-stone md:col-span-1">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="t-h2 text-[clamp(2rem,3.6vw,3.25rem)] transition-transform duration-700 ease-[var(--ease-out-expo)] md:col-span-6 md:group-hover:translate-x-3">
                {p.title}
              </h3>
              <p className="max-w-[36ch] text-ivory/70 md:col-span-4 md:col-start-9">{p.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>

    </div>
  )
}

function Fact({ label, value, big = false }) {
  return (
    <div className="border-l border-line py-6 pl-5 first:border-l-0 first:pl-0 md:pl-6 max-md:[&:nth-child(3)]:border-l-0 max-md:[&:nth-child(3)]:pl-0">
      <dt className="t-label text-stone">{label}</dt>
      <dd className={big ? 't-display tabular mt-3 text-[2.75rem] leading-none' : 'mt-3 text-[1.05rem]'}>{value}</dd>
    </div>
  )
}

// "Idael Alfonso" -> ["Idael", "Alfonso"]; a single word stays on one line.
function splitName(name) {
  const i = name.indexOf(' ')
  return i === -1 ? [name, ''] : [name.slice(0, i), name.slice(i + 1)]
}
