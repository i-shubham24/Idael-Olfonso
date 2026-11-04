import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { AnimatePresence, motion } from 'motion/react'
import { useContent } from '../../lib/i18n'
import { useReducedMotion } from '../../lib/media'
import Img from '../../components/Img'
import RollingNumber from '../../components/RollingNumber'

const ease = [0.16, 1, 0.3, 1]

const Index = ({ size = 10 }) => (
  <svg width={size} height={size * 0.86} viewBox="0 0 7 6" className="shrink-0" aria-hidden="true">
    <path d="M0 0 L7 0 L3.5 6 Z" fill="var(--color-gold)" />
  </svg>
)

/*
  The problems people bring to Idael. The section pins on every screen size:
  each problem gets one screen of scroll, its photo wipes up over the last one,
  the number rolls over and Idael's answer appears underneath in gold.
  Desktop puts photo and text side by side, phones and tablets stack them.
  With reduced motion it is a simple stack of cards.
*/
export default function PainPoints() {
  const { t, pains } = useContent()
  const root = useRef(null)
  const [active, setActive] = useState(0)
  const reduced = useReducedMotion()
  const pin = !reduced
  const n = pains.length

  useLayoutEffect(() => {
    if (!pin) return
    const ctx = gsap.context(() => {
      let last = 0
      // One natural touchpad glide is ~300px. Each point advances with one glide,
      // and a final glide on slide 06 scrolls cleanly off into the next section.
      const stepDist = Math.max(280, Math.min(360, Math.round(window.innerHeight * 0.35)))
      const totalSteps = n
      const snapPoints = Array.from({ length: totalSteps + 1 }, (_, k) => k / totalSteps)

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${stepDist * totalSteps}`,
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
          refreshPriority: 2,
          snap: {
            snapTo: snapPoints,
            duration: { min: 0.22, max: 0.42 },
            delay: 0.02,
            ease: 'power2.out',
          },
          onUpdate(self) {
            const i = Math.min(n - 1, Math.max(0, Math.floor(self.progress * totalSteps + 0.5)))
            if (i !== last) {
              last = i
              setActive(i)
            }
          },
        },
      })
      // Keep scroll cue visible throughout all 6 points, fading only as the section unpins
      tl.to('.pains-scroll', { opacity: 0, duration: 0.04, ease: 'none' }, 0.96)
    }, root)
    return () => ctx.revert()
  }, [pin, n])

  if (!pin) {
    return (
      <section id="pains" className="shell py-24 md:py-32" aria-labelledby="pains-title">
        <h2 id="pains-title" className="t-h2 text-[clamp(2.75rem,8vw,5rem)]">
          {t.pains.title}
        </h2>
        <ul className="mt-12 grid gap-3 md:grid-cols-2">
          {pains.map((p, i) => (
            <motion.li
              key={p.id}
              initial={reduced ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease }}
              className="overflow-hidden rounded-[2px] bg-onyx-2"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-graphite">
                <Img image={p.image} alt="" sizes="(min-width: 768px) 45vw, 92vw" className="h-full w-full object-cover" />
                <span className="t-display tabular absolute left-4 top-3 text-6xl text-ivory/90">0{i + 1}</span>
              </div>
              <div className="p-6">
                <p className="font-serif text-3xl leading-tight">{p.problem}</p>
                <p className="mt-4 flex items-baseline gap-3 font-serif text-xl italic text-gold-2">
                  <Index />
                  {p.answer}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </section>
    )
  }

  const current = pains[active]

  return (
    <section ref={root} id="pains" className="relative z-[2] h-[100svh] overflow-hidden bg-ink" aria-labelledby="pains-title">
      <div className="shell flex h-full flex-col gap-4 pb-3 pt-[70px] lg:grid lg:grid-cols-12 lg:items-stretch lg:gap-10 lg:pb-4 lg:pt-[76px]">
        <p className="t-label text-gold lg:hidden" aria-hidden="true">
          {t.pains.title}
        </p>
        {/* Photos: each new one wipes up over the last, stretching tall from upward. */}
        <div className="relative min-h-0 flex-1 overflow-hidden rounded-[2px] bg-graphite lg:col-span-7 lg:h-full lg:flex-none">
          {pains.map((p, i) => (
            <div
              key={p.id}
              className="absolute inset-0 transition-[clip-path] duration-[700ms] ease-[var(--ease-in-out-expo)]"
              style={{ clipPath: i <= active ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)' }}
            >
              <Img
                image={p.image}
                alt=""
                // Hidden behind the wipe, lazy images would never load before they are revealed.
                eager
                priority={false}
                sizes="(min-width: 1024px) 58vw, 100vw"
                className={`h-full w-full object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] ${
                  i === active ? 'scale-100' : 'scale-[1.08]'
                }`}
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(10_10_11/0.55),transparent_45%)]" />
            </div>
          ))}
          {/* Progress: one small block per problem. */}
          <div className="absolute bottom-4 left-4 flex gap-1.5 md:bottom-6 md:left-6" aria-hidden="true">
            {pains.map((p, i) => (
              <span
                key={p.id}
                className={`h-2.5 w-2.5 rounded-[1px] transition-colors duration-500 ${i <= active ? 'bg-gold' : 'bg-ivory/25'}`}
              />
            ))}
          </div>
        </div>

        <div className="flex shrink-0 flex-col justify-between py-1 lg:col-span-5 lg:h-full lg:py-3">
          <h2 id="pains-title" className="t-label hidden text-gold lg:block">
            {t.pains.title}
          </h2>

          <div>
            <p className="t-display flex items-end gap-3 text-[clamp(3.5rem,10vw,10rem)]" aria-hidden="true">
              <RollingNumber value={`0${active + 1}`} />
              <span className="t-label mb-[0.4em] text-stone">/ 0{n}</span>
            </p>
            <div className="relative mt-3 min-h-[8.5rem] md:min-h-[10rem] lg:mt-6 lg:min-h-[11rem]" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease }}
                >
                  <p className="t-h2 text-[clamp(1.75rem,3.6vw,3.75rem)]">{current.problem}</p>
                  <motion.p
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease, delay: 0.35 }}
                    className="mt-4 flex items-baseline gap-3 lg:mt-6"
                  >
                    <Index size={12} />
                    <span>
                      <span className="t-label block text-stone">{t.pains.answerLabel}</span>
                      <span className="mt-1 block font-serif text-xl italic text-gold-2 md:text-2xl">{current.answer}</span>
                    </span>
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* All six at a glance, for people who skim. */}
          <ul className="sr-only">
            {pains.map((p) => (
              <li key={p.id}>
                {p.problem} {p.answer}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Scroll hint on the right edge: kept until the end of this section. */}
      {!reduced && (
        <div
          className="pains-scroll pointer-events-none absolute right-3 top-1/2 z-20 -translate-y-1/2 md:right-5 xl:right-7"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-4">
            <span className="t-label text-[0.6rem] text-ivory/70 [writing-mode:vertical-rl]">{t.hero.scroll}</span>
            <span className="scroll-cue relative block h-12 w-3 overflow-hidden">
              <svg width="12" height="10" viewBox="0 0 7 6" className="absolute left-0 top-0">
                <path d="M0 0 L7 0 L3.5 6 Z" fill="var(--color-gold)" />
              </svg>
            </span>
          </div>
        </div>
      )}
    </section>
  )
}
