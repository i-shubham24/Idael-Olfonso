import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../lib/media'

/**
 * Section heading in the Equinox pattern: the letters rise out of a mask one
 * after another the first time it scrolls into view. Words stay whole, so it
 * wraps like normal text. An optional small label sits above it.
 */
export default function Title({ as: Tag = 'h2', kicker, kickerClass = 'text-stone', className = '', id, children, align = 'left' }) {
  const root = useRef(null)
  const text = String(children)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ch',
        { yPercent: 105 },
        {
          yPercent: 0,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.018,
          scrollTrigger: { trigger: root.current, start: 'top 88%', once: true },
        },
      )
      gsap.fromTo(
        '.kick',
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 88%', once: true },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [text])

  return (
    <div ref={root} className={align === 'center' ? 'text-center' : ''}>
      {kicker && <p className={`kick t-label mb-5 ${kickerClass}`}>{kicker}</p>}
      <Tag id={id} className={className} aria-label={text}>
        {text.split(' ').map((word, wi, words) => (
          <span key={wi} className="-mb-[0.1em] inline-block overflow-hidden pb-[0.18em] align-top" aria-hidden="true">
            {[...word].map((c, ci) => (
              <span key={ci} className="ch inline-block">
                {c}
              </span>
            ))}
            {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        ))}
      </Tag>
    </div>
  )
}
