import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { method } from '../../content/site'
import { useIsDesktop } from '../../lib/media'
import RollingNumber from '../../components/RollingNumber'

/*
  How it works: on desktop a large step number stays in view and rolls over
  like a watch date as each step crosses the middle of the screen.
  On phones it is a plain numbered list.
*/
export default function Method() {
  const root = useRef(null)
  const [active, setActive] = useState(0)
  const desktop = useIsDesktop()

  useLayoutEffect(() => {
    if (!desktop) return
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
  }, [desktop])

  return (
    <section ref={root} id="method" className="shell py-28 md:py-44" aria-labelledby="method-title">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 id="method-title" className="t-h2 text-[clamp(3rem,6vw,6.5rem)]">
            How it works
          </h2>
        </div>
        <p className="t-lead max-w-[38ch] self-end text-ivory/70 lg:col-span-4 lg:col-start-9">
          From the first call to the review after six weeks, you always know what comes next.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-10 md:mt-24 lg:grid-cols-12">
        {desktop && (
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

        <ol className="md-list grid gap-1.5 lg:col-span-6 lg:col-start-7 lg:gap-0">
          {method.map((m, i) => (
            <li
              key={m.title}
              className={`md-step rounded-[2px] bg-onyx-2 p-6 transition-opacity duration-700 lg:flex lg:min-h-[44vh] lg:flex-col lg:justify-center lg:bg-transparent lg:p-0 ${
                desktop && active !== i ? 'opacity-25' : 'opacity-100'
              }`}
            >
              <span className="t-label tabular text-gold">Step 0{i + 1}</span>
              <h3 className="t-h3 mt-4 text-[clamp(2.25rem,3.6vw,3.75rem)]">{m.title}</h3>
              <p className="t-lead mt-4 max-w-[40ch] text-ivory/70">{m.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
