import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { useContent } from '../../lib/i18n'
import { useReducedMotion } from '../../lib/media'
import { TLink } from '../../lib/transition'
import Video from '../../components/Video'

/*
  Hero in the Third Space pattern: Idael's film, one headline, one line.
  Nothing else; the name and the booking button live in the header.
  - the film settles in slowly and the headline rises line by line
  - as you scroll away, the film pulls back into a framed card and dims
*/
export default function Hero() {
  const { t, videos, about } = useContent()
  const h = t.hero
  const root = useRef(null)
  const reduced = useReducedMotion()
  const lines = h.headline.split('|')

  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .fromTo('.hero-film', { scale: 1.18 }, { scale: 1, duration: 3 }, 0)
        .fromTo('.hero-film', { opacity: 0 }, { opacity: 1, duration: 1.6, ease: 'power2.out' }, 0)
        .fromTo('.hero-line', { yPercent: 110 }, { yPercent: 0, duration: 1.4, stagger: 0.12 }, 0.3)
        .fromTo('.hero-in', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.1 }, 0.8)

      const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }
      gsap.fromTo(
        '.hero-frame',
        { clipPath: 'inset(0% 0% 0% 0% round 0px)' },
        { clipPath: 'inset(9% 5% 9% 5% round 6px)', ease: 'none', scrollTrigger: st },
      )
      gsap.to('.hero-shade', { opacity: 0.85, ease: 'none', scrollTrigger: { ...st } })
      gsap.to('.hero-copy', {
        yPercent: -30,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: '55% top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [reduced, h.headline])

  return (
    <section ref={root} className="relative h-[100svh] min-h-[600px] overflow-hidden bg-onyx" aria-labelledby="hero-title">
      <div className="hero-frame absolute inset-0 overflow-hidden will-change-[clip-path]">
        <div className="hero-film absolute inset-0">
          <Video
            video={videos.core}
            poster={about.gallery[0]}
            quality="1080p"
            grade="video-dark"
            className="h-full w-full object-cover object-[50%_15%]"
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(10_10_11/0.2),rgb(10_10_11/0.8))]" />
        <div className="hero-shade absolute inset-0 bg-onyx opacity-0" />
      </div>

      <div className="hero-copy shell relative z-10 flex h-full flex-col items-center justify-center pt-12 text-center">
        <h1 id="hero-title" className="t-display text-[clamp(3.25rem,8.4vw,9rem)]">
          {lines.map((line, i) => (
            <span key={i} className="-mb-[0.14em] block overflow-hidden pb-[0.2em]">
              <span className="hero-line block">{line}</span>
            </span>
          ))}
        </h1>
        <p className="hero-in t-lead mt-6 max-w-[38ch] text-ivory/80 md:mt-8">{h.subline}</p>
      </div>

      {/* A quiet line in the corner, like a caption on a print. */}
      <p className="hero-in t-label absolute bottom-10 right-4 z-10 hidden text-ivory/60 sm:block md:right-8 xl:right-12">{h.aside}</p>

      <TLink to="/#pains" className="hero-in absolute bottom-8 left-1/2 z-10 -translate-x-1/2 p-3" aria-label={h.scroll}>
        <span className="relative block h-12 w-px overflow-hidden bg-ivory/20">
          <span className="scroll-drop absolute inset-x-0 top-0 h-1/2 bg-ivory" />
        </span>
      </TLink>
    </section>
  )
}
