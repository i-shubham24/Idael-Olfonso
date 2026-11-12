import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import { useContent } from '../../lib/i18n'
import { useReducedMotion } from '../../lib/media'
import Img from '../../components/Img'
import Title from '../../components/Title'
import Reveal from '../../components/Reveal'

const ease = [0.16, 1, 0.3, 1]
const STEP = 7000

/*
  Past clients, in the Remedy Place quote pattern: one large quote at a time
  with a small attribution, next to a real session photo. It moves on by
  itself; the small photos below show which one you are on and jump to it.
*/
export default function Clients() {
  const { t, clientPhotos } = useContent()
  const c = t.clients
  const items = c.items
  const reduced = useReducedMotion()
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (reduced || paused) return
    const id = setTimeout(() => setI((n) => (n + 1) % items.length), STEP)
    return () => clearTimeout(id)
  }, [i, paused, reduced, items.length])

  const go = (d) => setI((n) => (n + d + items.length) % items.length)
  const item = items[i]

  return (
    <section
      id="clients"
      className="py-28 md:py-44"
      aria-labelledby="clients-title"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="shell grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-graphite lg:col-span-5">
          <AnimatePresence initial={false}>
            <motion.div
              key={i}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease }}
            >
              <Img
                image={clientPhotos[i % clientPhotos.length]}
                alt=""
                width={900}
                eager
                priority={false}
                className="h-full w-full object-cover object-[50%_20%]"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Title id="clients-title" kicker={c.kicker} className="t-h2 text-[clamp(2.25rem,4vw,3.5rem)] text-ivory/60">
            {c.title}
          </Title>

          <div className="relative mt-10 min-h-[15rem] md:min-h-[17rem]" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.7, ease }}
              >
                <blockquote className="t-h1 text-[clamp(2rem,3.8vw,3.5rem)] leading-[1.12]">
                  “{item.quote}”
                </blockquote>
                <figcaption className="t-label mt-8 text-gold">
                  {item.who} · {item.place}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <Reveal className="mt-12 flex flex-wrap items-center gap-6">
            <div className="flex gap-2">
              {clientPhotos.slice(0, items.length).map((src, n) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setI(n)}
                  aria-label={`${n + 1} / ${items.length}`}
                  aria-current={n === i}
                  className={`relative h-16 w-12 overflow-hidden rounded-[2px] transition-[opacity,transform] duration-500 md:h-20 md:w-16 ${
                    n === i ? 'opacity-100' : 'opacity-35 hover:opacity-70'
                  }`}
                >
                  <Img image={src} alt="" width={160} className="h-full w-full object-cover object-[50%_20%]" />
                  {n === i && !reduced && (
                    <span
                      key={`${i}-${paused}`}
                      className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-gold"
                      style={{ animation: paused ? 'none' : `grow ${STEP}ms linear forwards` }}
                    />
                  )}
                </button>
              ))}
            </div>
            <div className="ml-auto flex gap-2">
              {[
                [-1, c.prev, ArrowLeft],
                [1, c.next, ArrowRight],
              ].map(([d, label, Icon]) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => go(d)}
                  aria-label={label}
                  className="flex h-12 w-12 items-center justify-center rounded-[2px] bg-ivory/[0.08] transition-colors hover:bg-ivory/[0.16]"
                >
                  <Icon size={18} aria-hidden="true" />
                </button>
              ))}
            </div>
            <p className="w-full text-sm text-ivory/45">{c.note}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
