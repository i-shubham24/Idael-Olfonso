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
      gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * (n - 0.4)}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
          refreshPriority: 2,
          onUpdate(self) {
            const i = Math.min(n - 1, Math.floor(self.progress * n))
            if (i !== last) {
              last = i
              setActive(i)
            }
          },
        },
      })
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
      <div className="shell flex h-full flex-col gap-5 pb-[4svh] pt-[calc(72px+2svh)] lg:grid lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-[6vh] lg:pt-[calc(84px+4vh)]">
        <p className="t-label text-gold lg:hidden" aria-hidden="true">
          {t.pains.title}
        </p>
        {/* Photos: each new one wipes up over the last. */}
        <div className="relative min-h-0 flex-1 overflow-hidden rounded-[2px] bg-graphite lg:col-span-7 lg:h-full lg:max-h-[78vh] lg:flex-none">
          {pains.map((p, i) => (
            <div
              key={p.id}
              className="absolute inset-0 transition-[clip-path] duration-[1300ms] ease-[var(--ease-in-out-expo)]"
              style={{ clipPath: i <= active ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)' }}
            >
              <Img
                image={p.image}
                alt=""
                // Hidden behind the wipe, lazy images would never load before they are revealed.
                eager
                priority={false}
                sizes="(min-width: 1024px) 58vw, 100vw"
                className={`h-full w-full object-cover transition-transform duration-[2200ms] ease-[var(--ease-out-expo)] ${
                  i === active ? 'scale-100' : 'scale-[1.12]'
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

        <div className="flex shrink-0 flex-col lg:col-span-5 lg:h-full lg:max-h-[78vh] lg:justify-between">
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
    </section>
  )
}
