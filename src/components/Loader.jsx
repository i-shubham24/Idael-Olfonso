import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { brand } from '../content/site'
import { prefersReducedMotion } from '../lib/media'
import { revealStore } from '../lib/reveal'
import { useLenis } from '../lib/scroll'

const KEY = 'ia-loaded'
const R = 170
const CIRC = 2 * Math.PI * R

function shouldShow() {
  try {
    return !prefersReducedMotion() && !sessionStorage.getItem(KEY)
  } catch {
    return !prefersReducedMotion()
  }
}

/*
  First visit only: a bezel draws itself and its minute marks light up while
  the counter runs to sixty, then the cover lifts. Covers font and 3D load.
*/
export default function Loader() {
  const [show, setShow] = useState(shouldShow)
  const root = useRef(null)
  const min = useRef(null)
  const lenis = useLenis()

  useLayoutEffect(() => {
    if (!show) {
      revealStore.set(true)
      return
    }
    revealStore.set(false)
    lenis?.stop()
    document.documentElement.style.overflow = 'hidden'

    const counter = { v: 0 }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })
      tl.fromTo('[data-ring]', { strokeDashoffset: CIRC }, { strokeDashoffset: 0, duration: 1.8, ease: 'expo.inOut' })
      tl.from('[data-tick]', { opacity: 0, duration: 0.3, stagger: 0.022, ease: 'none' }, 0.25)
      tl.to(
        counter,
        {
          v: 60,
          duration: 1.75,
          ease: 'expo.inOut',
          onUpdate: () => {
            if (min.current) min.current.textContent = String(Math.round(counter.v)).padStart(2, '0')
          },
        },
        0,
      )
      tl.from('[data-name]', { opacity: 0, y: 12, duration: 0.9, ease: 'expo.out' }, 0.6)

      const ready = Promise.all([
        document.fonts?.ready ?? Promise.resolve(),
        new Promise((r) => tl.eventCallback('onComplete', r)),
      ])

      ready.then(() => {
        gsap
          .timeline({
            onComplete: () => {
              try {
                sessionStorage.setItem(KEY, '1')
              } catch {
                /* private mode */
              }
              document.documentElement.style.overflow = ''
              lenis?.start()
              setShow(false)
            },
          })
          .to('[data-dial]', { scale: 1.08, opacity: 0, duration: 0.6, ease: 'power2.in' })
          .add(() => revealStore.set(true), 0.45)
          .to(root.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1, ease: 'expo.inOut' }, 0.25)
      })
    }, root)

    return () => {
      ctx.revert()
      document.documentElement.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  if (!show) return null

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[95] flex flex-col items-center justify-center bg-onyx"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      role="status"
      aria-label={`Loading ${brand.name}`}
    >
      <div data-dial className="relative w-[min(70vw,340px)]">
        <svg viewBox="0 0 400 400" className="w-full -rotate-90" aria-hidden="true">
          <circle
            data-ring
            cx="200"
            cy="200"
            r={R}
            fill="none"
            stroke="var(--color-gold)"
            strokeWidth="1"
            strokeDasharray={CIRC}
          />
          {Array.from({ length: 60 }, (_, i) => {
            const a = (i / 60) * Math.PI * 2
            const major = i % 5 === 0
            const r1 = R - (major ? 22 : 12)
            const r2 = R - 4
            return (
              <line
                key={i}
                data-tick
                x1={200 + Math.cos(a) * r1}
                y1={200 + Math.sin(a) * r1}
                x2={200 + Math.cos(a) * r2}
                y2={200 + Math.sin(a) * r2}
                stroke="var(--color-ivory)"
                strokeOpacity={major ? 0.85 : 0.35}
                strokeWidth={major ? 1.5 : 1}
              />
            )
          })}
        </svg>
        <p className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <span ref={min} className="t-display tabular text-[clamp(4rem,14vw,7.5rem)]">
            00
          </span>
        </p>
      </div>
      <p data-name className="t-label mt-10 text-stone" aria-hidden="true">
        {brand.name} · {brand.role}
      </p>
    </div>
  )
}
