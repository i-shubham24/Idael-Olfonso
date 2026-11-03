import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { about, brand, services } from '../../content/site'
import { prefersReducedMotion } from '../../lib/media'
import Img from '../../components/Img'
import Button from '../../components/Button'

const WORDS = services.map((s) => s.name)

/*
  Meet Idael: the portrait opens from the bottom edge as it scrolls in and
  drifts slower than the page; the credentials slide in one by one.
  A slow marquee of his session types closes the section.
*/
export default function Trainer() {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.tr-mask',
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.6,
          ease: 'expo.inOut',
          scrollTrigger: { trigger: '.tr-mask', start: 'top 80%', once: true },
        },
      )
      gsap.fromTo(
        '.tr-img',
        { yPercent: -8, scale: 1.15 },
        {
          yPercent: 8,
          scale: 1.05,
          ease: 'none',
          scrollTrigger: { trigger: '.tr-mask', start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
      gsap.from('.tr-item', {
        opacity: 0,
        x: -24,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.tr-list', start: 'top 85%', once: true },
      })
      // The marquee also drifts with the scroll, so it speeds up while you read.
      gsap.fromTo(
        '.tr-marquee',
        { xPercent: 0 },
        {
          xPercent: -12,
          ease: 'none',
          scrollTrigger: { trigger: '.tr-marquee', start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="trainer" className="overflow-hidden pt-28 md:pt-44" aria-labelledby="trainer-title">
      <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <figure className="lg:col-span-5">
          <div className="tr-mask relative aspect-[4/5] overflow-hidden rounded-[2px] bg-graphite">
            <Img
              image={about.portrait}
              alt={`Portrait of ${brand.name}`}
              width={1000}
              ratio={1.25}
              sizes="(min-width: 1024px) 40vw, 92vw"
              className="tr-img absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </figure>

        <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
          <h2 id="trainer-title" className="t-h2 text-[clamp(3rem,6vw,6.5rem)]">
            Meet Idael
          </h2>
          <p className="t-lead mt-8 max-w-[46ch] text-ivory/75">{about.intro}</p>
          <p className="mt-5 max-w-[50ch] text-ivory/60">{about.story[1]}</p>

          <ul className="tr-list mt-12 grid gap-1.5">
            {about.credentials.map((c) => (
              <li key={c.title} className="tr-item rounded-[2px] bg-onyx-2 px-6 py-5">
                <span className="block font-serif text-2xl">{c.title}</span>
                <span className="mt-1 block text-sm text-stone">{c.detail}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Button to="/about" variant="ghost" size="lg">
              Read his story
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-28 bg-onyx-2 py-8 md:mt-40 md:py-10" aria-hidden="true">
        <div className="tr-marquee">
          <div className="marquee-track flex w-max">
            {[0, 1].map((half) => (
              <div key={half} className="flex shrink-0 items-center">
                {Array.from({ length: 3 }, () => WORDS)
                  .flat()
                  .map((w, i) => (
                    <span key={`${half}-${i}`} className="flex items-center">
                      <span
                        className={`t-display whitespace-nowrap px-8 text-[clamp(3.5rem,8vw,8rem)] md:px-12 ${i % 2 ? 'italic text-gold-2' : 'text-ivory/90'}`}
                      >
                        {w}
                      </span>
                      <svg width="16" height="16" viewBox="0 0 16 16" className="shrink-0">
                        <path d="M3 2 L13 2 L8 12 Z" fill="var(--color-gold)" />
                      </svg>
                    </span>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
