import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { useFinePointer, useReducedMotion } from '../lib/media'

const INTERACTIVE = 'a, button, label, [role="button"], [role="option"], input, textarea, select'
const TICKS = Array.from({ length: 24 }, (_, i) => i)
const DARK_GOLD = '#8a6d3f'

/**
 * True when the surface under a point is light (ivory panels, ivory buttons,
 * selected options). Looks through everything stacked at that point and
 * takes the first solid background; photos and 3D count as dark.
 */
function lightAt(px, py) {
  for (const el of document.elementsFromPoint(px, py)) {
    if (el.tagName === 'IMG' || el.tagName === 'CANVAS' || el.tagName === 'VIDEO') return false
    const m = getComputedStyle(el).backgroundColor.match(/[\d.]+/g)
    if (!m) continue
    const [r, g, b, a = 1] = m.map(Number)
    if (a < 0.5) continue
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 > 0.55
  }
  return false
}

/*
  The cursor is a small bezel, like the one in the hero: minute marks around a
  ring with a gold index at the top. It turns as the mouse moves (sideways
  movement winds it like a crown), opens up over anything clickable, and over
  elements with data-cursor="Label" it shows that label in the middle.
  On light surfaces it turns black so it never disappears.
  Mouse and trackpad only; touch and reduced motion keep the native cursor.
*/
export default function Cursor() {
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const on = fine && !reduced
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 320, damping: 30, mass: 0.5 })
  const ry = useSpring(y, { stiffness: 320, damping: 30, mass: 0.5 })
  const turn = useMotionValue(0)
  const rotate = useSpring(turn, { stiffness: 90, damping: 20 })
  const [state, setState] = useState({ hover: false, label: '', hidden: true, down: false, light: false })
  const hidden = useRef(true)

  useEffect(() => {
    if (!on) return
    document.documentElement.classList.add('has-cursor')
    let last = ''
    let lastX = null
    let px = -100
    let py = -100
    let raf = 0

    // Read what is under the pointer at most once a frame (moving, scrolling, after a click).
    const update = () => {
      raf = 0
      if (hidden.current) return
      const t = document.elementFromPoint(px, py)
      const label = t?.closest('[data-cursor]')?.getAttribute('data-cursor') ?? ''
      const hover = !!t?.closest(INTERACTIVE)
      const light = lightAt(px, py)
      const key = `${hover}|${label}|${light}`
      if (key !== last) {
        last = key
        setState((s) => ({ ...s, hover, label, light, hidden: false }))
      }
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (lastX !== null) turn.set(turn.get() + (e.clientX - lastX) * 0.9)
      lastX = e.clientX
      px = e.clientX
      py = e.clientY
      if (hidden.current) {
        hidden.current = false
        last = ''
        setState((s) => ({ ...s, hidden: false }))
      }
      schedule()
    }
    const onLeave = () => {
      hidden.current = true
      lastX = null
      setState((s) => ({ ...s, hidden: true }))
    }
    const onDown = () => {
      turn.set(turn.get() + 90)
      setState((s) => ({ ...s, down: true }))
    }
    const onUp = () => {
      setState((s) => ({ ...s, down: false }))
      // A click can change what is underneath (a selected option turns ivory).
      setTimeout(schedule, 60)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', schedule, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    return () => {
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', schedule)
      document.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [on])

  if (!on) return null

  const { hover, label, light } = state
  const size = label ? 104 : hover ? 64 : 40
  // Ivory on dark surfaces, black on light ones; clickable things add gold.
  const ink = label || light ? 'var(--color-ink)' : 'var(--color-ivory)'
  const tick = hover && !label ? (light ? DARK_GOLD : 'var(--color-gold)') : ink
  const face = label
    ? 'rgba(236,232,224,0.95)'
    : light
      ? hover
        ? 'rgba(10,10,11,0.1)'
        : 'rgba(10,10,11,0.04)'
      : hover
        ? 'rgba(10,10,11,0.5)'
        : 'rgba(10,10,11,0.25)'

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      {/* Centre dot: follows the pointer exactly. */}
      <motion.div
        className="absolute left-0 top-0 h-[4px] w-[4px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ x, y }}
        initial={false}
        animate={{ opacity: state.hidden || label ? 0 : 1, backgroundColor: light ? '#0a0a0b' : '#ece8e0' }}
        transition={{ duration: 0.2 }}
      />
      {/* The bezel: trails slightly, turns with movement. */}
      <motion.div
        className="absolute left-0 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        style={{ x: rx, y: ry }}
        initial={false}
        animate={{ width: size, height: size, opacity: state.hidden ? 0 : 1, scale: state.down ? 0.85 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={false}
          animate={{ backgroundColor: face }}
          transition={{ duration: 0.3 }}
        />
        <motion.svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" style={{ rotate }}>
          <circle
            cx="50"
            cy="50"
            r="47"
            fill="none"
            stroke={label ? ink : tick}
            strokeOpacity={label ? 0.25 : light ? 0.6 : 0.4}
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            style={{ transition: 'stroke 0.3s' }}
          />
          {TICKS.map((i) => {
            if (i === 0) return null
            const major = i % 6 === 0
            return (
              <line
                key={i}
                x1="50"
                y1={major ? 5 : 6}
                x2="50"
                y2={major ? 16 : 11}
                stroke={tick}
                strokeOpacity={major ? 0.95 : light ? 0.7 : 0.5}
                strokeWidth={light ? 1.25 : 1}
                vectorEffect="non-scaling-stroke"
                transform={`rotate(${i * 15} 50 50)`}
                style={{ transition: 'stroke 0.3s' }}
              />
            )
          })}
          <path d="M45 4 L55 4 L50 13 Z" fill={light || label ? DARK_GOLD : 'var(--color-gold)'} />
        </motion.svg>
        {label && <span className="t-label relative text-[0.6rem] tracking-[0.2em] text-ink">{label}</span>}
      </motion.div>
    </div>
  )
}
