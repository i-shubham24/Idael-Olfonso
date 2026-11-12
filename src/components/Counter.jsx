import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../lib/media'

/**
 * A number that counts up from zero the first time it is seen.
 * Keeps any text around the number: "186K" counts 0 to 186 and keeps the K.
 */
export default function Counter({ value, className = '' }) {
  const ref = useRef(null)
  const match = /^(\D*)(\d+)(.*)$/.exec(value)

  useLayoutEffect(() => {
    if (!match || prefersReducedMotion()) return
    const [, pre, num, post] = match
    const el = ref.current
    const state = { v: 0 }
    el.textContent = `${pre}0${post}`
    const tween = gsap.to(state, {
      v: Number(num),
      duration: 1.8,
      ease: 'power3.out',
      onUpdate: () => {
        el.textContent = `${pre}${Math.round(state.v)}${post}`
      },
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
      el.textContent = value
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <span ref={ref} className={`tabular ${className}`}>
      {value}
    </span>
  )
}
