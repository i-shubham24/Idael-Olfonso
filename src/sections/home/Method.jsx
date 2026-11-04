import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useContent } from '../../lib/i18n'
import { useIsDesktop, useReducedMotion } from '../../lib/media'
import RollingNumber from '../../components/RollingNumber'
import Reveal from '../../components/Reveal'

/*
  How it works: a large step number stays in view and rolls over like a
  watch date as each step crosses the middle of the screen. On desktop it
  sits in a column beside the steps; on phones and tablets it rides along in
  a sticky bar above them. Reduced motion gets a plain numbered list.
*/
export default function Method() {
  const { t } = useContent()
  const method = t.method.items
  const root = useRef(null)
  const [active, setActive] = useState(0)
  const desktop = useIsDesktop()
  const reduced = useReducedMotion()
  const track = !reduced

  useLayoutEffect(() => {
    if (!track) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.md-step').forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => self.isActive && setActive(i),
        })
      })
    }, root)
    return () => ctx.revert()
  }, [track, desktop])

  return (
    <section ref={root} id="method" className="shell py-28 md:py-44" aria-labelledby="method-title">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal as="h2" id="method-title" className="t-h2 text-[clamp(3rem,6vw,6.5rem)]">
            {t.method.title}
          </Reveal>
        </div>
        <p className="t-lead max-w-[38ch] self-end text-ivory/70 lg:col-span-4 lg:col-start-9">{t.method.intro}</p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-10 md:mt-24 lg:grid-cols-12">
        {track && desktop && (
          <div className="lg:col-span-5">
            <div className="sticky top-[22vh]">
              <p className="t-display flex items-end gap-4 text-[clamp(8rem,15vw,15rem)]" aria-hidden="true">
                <RollingNumber value={`0${active + 1}`} />
                <span className="t-label mb-[0.25em] text-stone">/ 0{method.length}</span>
              </p>
              <p className="mt-6 font-serif text-3xl italic text-gold-2" aria-live="polite">
                {method[active].title}
              </p>
            </div>
          </div>
        )}

        <div className="lg:col-span-6 lg:col-start-7">
          {track && !desktop && (
            // Phones and tablets: the number rides along at the top while the steps scroll under it.
            <div
              className="sticky top-0 z-10 -mx-4 flex items-end gap-4 bg-onyx/90 px-4 pb-4 pt-5 backdrop-blur-md md:-mx-8 md:px-8"
              aria-hidden="true"
            >
              <p className="t-display text-[clamp(4.5rem,16vw,7rem)]">
                <RollingNumber value={`0${active + 1}`} />
              </p>
              <div className="pb-[0.6em]">
                <p className="t-label tabular text-stone">/ 0{method.length}</p>
                <p className="mt-1 font-serif text-2xl italic text-gold-2">{method[active].title}</p>
              </div>
            </div>
          )}

          <ol className="md-list grid">
            {method.map((m, i) => (
              <li
                key={m.title}
                className={`md-step flex flex-col justify-center py-10 transition-opacity duration-700 ${
                  track ? 'min-h-[42svh] lg:min-h-[44vh] lg:py-0' : ''
                } ${track && active !== i ? 'opacity-25' : 'opacity-100'}`}
              >
                <span className="t-label tabular text-gold">
                  {t.method.step} 0{i + 1}
                </span>
                <h3 className="t-h3 mt-4 text-[clamp(2.25rem,3.6vw,3.75rem)]">{m.title}</h3>
                <p className="t-lead mt-4 max-w-[40ch] text-ivory/70">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
