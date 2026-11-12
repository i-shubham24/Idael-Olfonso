import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { useContent } from '../../lib/i18n'
import { prefersReducedMotion } from '../../lib/media'
import Title from '../../components/Title'

/*
  How it works: five steps from the free call to the first review. As you
  scroll through, the steps light up one after another, so the page reads
  like the journey itself.
*/
export default function Method() {
  const { t } = useContent()
  const m = t.method
  const root = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.step',
        { opacity: 0.18 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.3,
          scrollTrigger: { trigger: '.steps', start: 'top 75%', end: 'bottom 50%', scrub: true },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="method" className="shell py-28 md:py-44" aria-labelledby="method-title">
      <Title id="method-title" kicker={m.kicker} align="center" className="t-display mx-auto max-w-[16ch] text-[clamp(3rem,5.4vw,5.75rem)]">
        {m.title}
      </Title>
      <ol className="steps mt-20 grid gap-12 sm:grid-cols-2 md:mt-28 lg:grid-cols-5 lg:gap-8">
        {m.items.map((s, i) => (
          <li key={s.title} className="step">
            <span className="t-display tabular block text-[clamp(3.5rem,5vw,5rem)] leading-none text-gold">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="t-h3 mt-6 text-[1.75rem]">{s.title}</h3>
            <p className="mt-3 max-w-[28ch] text-ivory/60">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
