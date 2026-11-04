import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { AnimatePresence, motion } from 'motion/react'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { useContent } from '../../lib/i18n'
import { prefersReducedMotion } from '../../lib/media'
import Video from '../../components/Video'
import Reveal from '../../components/Reveal'

const ease = [0.16, 1, 0.3, 1]

/*
  Idael in motion: a full width frame that opens up from an inset card as it
  scrolls in, playing his clips one after the other. Click the frame or use
  the arrows to switch; the counter rolls with it.
*/
export default function Showreel() {
  const { t, videos } = useContent()
  const copy = t.showreel
  const clips = copy.clips.map((c) => ({ ...c, video: videos[c.id] }))
  const [index, setIndex] = useState(0)
  const root = useRef(null)
  const frame = useRef(null)

  const go = (dir) => setIndex((i) => (i + dir + clips.length) % clips.length)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        frame.current,
        { clipPath: 'inset(10% 7% 10% 7% round 4px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 0px)',
          ease: 'none',
          scrollTrigger: { trigger: frame.current, start: 'top bottom', end: 'top 15%', scrub: true },
        },
      )
      gsap.fromTo(
        '.sr-media',
        { scale: 1.2 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: frame.current, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [])

  const current = clips[index]

  return (
    <section ref={root} id="motion" className="pt-28 md:pt-40" aria-labelledby="motion-title">
      <div className="shell flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <Reveal as="h2" id="motion-title" className="t-h2 text-[clamp(3rem,7vw,7.5rem)]">
          {copy.title} <em className="text-gold-2">{copy.titleEm}</em>
        </Reveal>
        <p className="t-lead max-w-[30ch] text-ivory/70">{copy.intro}</p>
      </div>

      <div
        ref={frame}
        className="relative mt-12 h-[72svh] cursor-pointer overflow-hidden bg-graphite md:mt-16 md:h-[88svh]"
        onClick={() => go(1)}
        data-cursor={t.cursor.next}
      >
        <div className="sr-media absolute inset-0">
          {clips.map((c, i) => (
            <div
              key={c.id}
              className="absolute inset-0 transition-opacity duration-1000 ease-[var(--ease-out-expo)]"
              style={{ opacity: i === index ? 1 : 0 }}
            >
              <Video
                video={c.video}
                active={i === index}
                quality="1080p"
                loop={false}
                onEnded={() => i === index && go(1)}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgb(10_10_11/0.8),transparent_45%)]" />

        <div className="absolute inset-x-0 bottom-0">
          <div className="shell flex items-end justify-between gap-6 pb-8 md:pb-12">
            <div className="pointer-events-none">
              <p className="t-label tabular text-gold">
                0{index + 1} / 0{clips.length}
              </p>
              <div className="mt-3 overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={current.id}
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.6, ease }}
                    className="t-display pb-[0.08em] text-[clamp(2.75rem,6vw,6rem)]"
                  >
                    {current.label}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
            <div className="flex gap-1.5">
              {[
                [-1, copy.prev, CaretLeft],
                [1, copy.next, CaretRight],
              ].map(([dir, label, Icon]) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  onClick={(e) => {
                    e.stopPropagation()
                    go(dir)
                  }}
                  className={`flex h-14 w-14 items-center justify-center rounded-[2px] transition-colors ${
                    dir > 0 ? 'bg-ivory text-ink hover:bg-white' : 'bg-graphite/80 text-ivory hover:bg-line'
                  }`}
                >
                  <Icon size={18} aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
