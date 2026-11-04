import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../lib/media'

/**
 * A heading (or any block) that rises out of an invisible mask the first time
 * it scrolls into view, like the hero headline. Uses GSAP ScrollTrigger so it
 * stays 100% synchronized with Lenis smooth scroll.
 */
export default function Reveal({ as: Tag = 'h2', className = '', delay = 0, children, ...rest }) {
  const root = useRef(null)
  const inner = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const el = inner.current
    const trigger = root.current
    if (!el || !trigger) return

    gsap.set(el, { yPercent: 110, rotate: 1.5, transformOrigin: '0% 100%' })
    const tween = gsap.to(el, {
      yPercent: 0,
      rotate: 0,
      duration: 1.1,
      ease: 'expo.out',
      delay,
      scrollTrigger: {
        trigger,
        start: 'top 98%',
        once: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [delay])

  return (
    <Tag ref={root} className={`overflow-hidden pb-[0.14em] pr-[0.1em] ${className}`} {...rest}>
      <span ref={inner} className="block">
        {children}
      </span>
    </Tag>
  )
}
