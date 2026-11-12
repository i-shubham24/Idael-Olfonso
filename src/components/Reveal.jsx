import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../lib/media'

/**
 * A block that fades in and rises a few pixels the first time it scrolls into
 * view. The only entrance effect on the site, so everything moves the same way.
 */
export default function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const el = root.current
    if (!el) return
    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'expo.out',
        delay,
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      },
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [delay])

  return (
    <Tag ref={root} className={className} {...rest}>
      {children}
    </Tag>
  )
}
