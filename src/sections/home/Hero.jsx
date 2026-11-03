import { Suspense, lazy, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { brand, images } from '../../content/site'
import { usePageReady } from '../../lib/reveal'
import { useReducedMotion } from '../../lib/media'
import { useFitText } from '../../lib/useFitText'
import Button from '../../components/Button'
import Img from '../../components/Img'

const HeroScene = lazy(() => import('../../three/HeroScene'))

/*
  Hero + fly-through + manifesto, all inside one pinned section.
  0.00 to 0.30  copy leaves, the name parts, the bezel turns face-on in the middle
  0.30 to 0.60  camera flies through the bezel; the photo opens inside it
  0.60 to 1.00  the manifesto reads in, word by word
*/
export default function Hero() {
  const root = useRef(null)
  const reveal = useRef(null)
  const slot = useRef(null)
  const word = useRef(null)
  const layout = useRef({ cx: 0, cy: 0, d: 0, w: 1, h: 1 })
  const progress = useRef(0)
  const intro = useRef(0)
  const [active, setActive] = useState(true)
  const ready = usePageReady()
  const reduced = useReducedMotion()

  useFitText(word)

  // Where the DOM wants the bezel: the 3D scene reads this every frame.
  useLayoutEffect(() => {
    const measure = () => {
      const s = root.current.getBoundingClientRect()
      const r = slot.current.getBoundingClientRect()
      layout.current = {
        cx: r.left - s.left + r.width / 2,
        cy: r.top - s.top + r.height / 2,
        d: Math.min(r.width, r.height),
        w: s.width,
        h: s.height,
      }
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(root.current)
    ro.observe(slot.current)
    return () => ro.disconnect()
  }, [])

  // Pinned scroll timeline.
  useLayoutEffect(() => {
    if (reduced) {
      progress.current = 0
      return
    }
    const ctx = gsap.context(() => {
      const letters = gsap.utils.toArray('.wm-letter')
      const mid = (letters.length - 1) / 2
      const words = gsap.utils.toArray('.mf-word')

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * 3}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            progress.current = self.progress
          },
        },
      })
      tl.to('.hero-copy', { yPercent: -18, opacity: 0, duration: 0.2 }, 0)
      letters.forEach((el, i) => {
        tl.to(el, { xPercent: (i - mid) * 70, yPercent: 10, opacity: 0, duration: 0.36, ease: 'power1.in' }, 0)
      })
      tl.fromTo('.manifesto', { opacity: 0 }, { opacity: 1, duration: 0.05 }, 0.58)
      tl.fromTo(
        words,
        { opacity: 0.12 },
        { opacity: 1, duration: 0.02, stagger: (0.34 - 0.02) / Math.max(1, words.length) },
        0.62,
      )
      tl.set({}, {}, 1)

      // Only render WebGL while the hero section (including its pinned stretch) is on screen.
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * 3 + window.innerHeight}`,
        onToggle: (self) => setActive(self.isActive),
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  // Entrance, played when the loader or route panel lifts.
  useLayoutEffect(() => {
    if (reduced) {
      intro.current = 1
      return
    }
    const ctx = gsap.context(() => {
      if (!ready) {
        intro.current = 0
        gsap.set('.wm-inner', { yPercent: 105 })
        gsap.set('.h1-word', { yPercent: 110 })
        gsap.set('.hero-fade', { opacity: 0, y: 24 })
        return
      }
      gsap
        .timeline()
        .fromTo(intro, { current: 0 }, { current: 1, duration: 2, ease: 'expo.out' }, 0)
        .fromTo('.wm-inner', { yPercent: 105 }, { yPercent: 0, duration: 1.3, ease: 'expo.out', stagger: 0.07 }, 0.05)
        .fromTo('.h1-word', { yPercent: 110 }, { yPercent: 0, duration: 1.3, ease: 'expo.out', stagger: 0.06 }, 0.3)
        .fromTo(
          '.hero-fade',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.1 },
          0.6,
        )
    }, root)
    return () => ctx.revert()
  }, [ready, reduced])

  const headlineWords = [
    ...brand.headline.split(' ').map((w) => ({ w, em: false })),
    ...brand.headlineEm.split(' ').map((w) => ({ w, em: true })),
  ]
  const manifestoWords = brand.manifesto.split(' ')

  return (
    <>
      <section ref={root} className="relative h-[100svh] min-h-[560px] overflow-hidden" aria-labelledby="hero-title">
        {/* Faint concentric rings behind everything, like the dial under the bezel. */}
        <div className="rings-pattern absolute inset-0 opacity-60 [mask-image:radial-gradient(circle_at_72%_48%,black,transparent_55%)]" />

        {/* Name: sits behind the bezel, parts as you dive in. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 select-none" aria-hidden="true">
          <div className="shell">
            <div className="flex justify-center">
              <p
                ref={word}
                className="t-display flex translate-y-[16%] whitespace-nowrap leading-[0.9] text-ivory/95 [@media(max-height:780px)]:translate-y-[26%]"
              >
                {[...brand.name].map((ch, i) => (
                  <span key={i} className="wm-letter inline-block">
                    <span className="block overflow-hidden pb-[0.02em]">
                      <span className="wm-inner block">{ch === ' ' ? ' ' : ch}</span>
                    </span>
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>

        {/* The photo you see through the bezel, then full screen. */}
        <div
          ref={reveal}
          className="absolute inset-0 z-[1] will-change-[clip-path,opacity] [transform:translateZ(0)]"
          style={reduced ? { opacity: 0 } : { clipPath: 'circle(0px at 50% 50%)', opacity: 0 }}
        >
          <Img image={images.manifesto} alt="" eager className="h-full w-full object-cover object-[50%_40%]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(10_10_11/0.94),rgb(10_10_11/0.4)_55%,rgb(10_10_11/0.2))]" />
        </div>

        <Suspense fallback={null}>
          <div className="absolute inset-0 z-[2]">
            <HeroScene
              progress={progress}
              intro={intro}
              revealRef={reveal}
              layout={layout}
              active={active}
              reduced={reduced}
            />
          </div>
        </Suspense>

        <div className="shell relative z-10 grid h-full grid-cols-1 grid-rows-[auto_1fr] pb-[19vw] pt-[calc(68px+3.5vh)] lg:grid-cols-12 lg:grid-rows-1 lg:pb-[14vw] lg:pt-[calc(84px+5vh)]">
          <div className="hero-copy lg:col-span-7">
            <p className="hero-fade t-label text-gold">
              {brand.role} in {brand.region}
            </p>
            <h1 id="hero-title" className="t-h1 mt-6 text-[clamp(2.75rem,min(5.6vw,8.5vh),5.75rem)] md:mt-8">
              {headlineWords.map(({ w, em }, i) => (
                <span key={i}>
                  {/* The italic half always starts on its own line. */}
                  {em && !headlineWords[i - 1].em && <br />}
                  <span className="inline-block overflow-hidden pb-[0.1em] align-top">
                    <span className={`h1-word inline-block ${em ? 'italic text-gold-2' : ''}`}>{w}&nbsp;</span>
                  </span>
                </span>
              ))}
            </h1>
            <p className="hero-fade t-lead mt-5 max-w-[40ch] text-ivory/70 md:mt-7 lg:max-w-[48ch]">{brand.subline}</p>
            <div className="hero-fade mt-8 flex flex-wrap gap-3 md:mt-10">
              <Button to="/book?type=consultation" size="lg">
                Book a free consultation
              </Button>
              <Button to="/#method" variant="ghost" size="lg">
                How it works
              </Button>
            </div>
          </div>
          <div
            ref={slot}
            aria-hidden="true"
            className="min-h-[200px] lg:col-span-5 lg:col-start-8 lg:-mb-[12vw] lg:-mr-[3vw] lg:-mt-[2vh]"
          />
        </div>

        {/* Manifesto: revealed after the camera passes through the bezel. */}
        {!reduced && (
          <div className="manifesto pointer-events-none absolute inset-0 z-20 flex items-end opacity-0">
            <div className="shell pb-[14vh]">
                            <p className="t-h1 max-w-[22ch] text-[clamp(2rem,4.6vw,5rem)] leading-[1.02]">
                {manifestoWords.map((w, i) => (
                  <span key={i} className="mf-word word">
                    {w}&nbsp;
                  </span>
                ))}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Reduced motion: the manifesto as a plain section. */}
      {reduced && (
        <section className="relative">
          <Img
            image={images.manifesto}
            alt="A client training with a barbell, in black and white"
            className="h-[70vh] w-full object-cover"
          />
          <div className="shell py-16">
            <p className="t-h1 max-w-[22ch] text-[clamp(2rem,4.6vw,5rem)] leading-[1.02]">{brand.manifesto}</p>
          </div>
        </section>
      )}
    </>
  )
}
