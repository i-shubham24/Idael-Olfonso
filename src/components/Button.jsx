import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { TLink } from '../lib/transition'
import { useFinePointer, useReducedMotion } from '../lib/media'

const VARIANTS = {
  ivory: 'bg-ivory text-ink hover:bg-white',
  ghost: 'bg-graphite text-ivory hover:bg-line',
  gold: 'bg-gold text-ink hover:bg-gold-2',
  ink: 'bg-ink text-ivory hover:bg-black',
}

const SIZES = {
  md: 'min-h-12 px-6 py-2.5 text-[0.6875rem] sm:px-7',
  lg: 'min-h-14 px-6 py-3 text-[0.72rem] sm:px-9 md:min-h-[3.75rem] md:px-11',
  xl: 'min-h-16 px-7 py-4 text-[0.78rem] sm:px-10 md:min-h-20 md:px-14 md:text-[0.82rem]',
}

/*
  Square button with tracked capitals. On a mouse it leans gently toward the
  pointer (magnetic) so the primary action feels physical; on touch it just presses down.
*/
export default function Button({
  to,
  href,
  variant = 'ivory',
  size = 'md',
  magnetic = true,
  full = false,
  className = '',
  style,
  children,
  ...rest
}) {
  const ref = useRef(null)
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const active = magnetic && fine && !reduced
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.6 })
  const hx = useTransform(sx, (v) => v * 0.5)
  const hy = useTransform(sy, (v) => v * 0.5)

  const rectRef = useRef(null)
  const onMove = (e) => {
    if (!active || !ref.current) return
    if (!rectRef.current) {
      rectRef.current = ref.current.getBoundingClientRect()
    }
    const r = rectRef.current
    x.set((e.clientX - (r.left + r.width / 2)) * 0.2)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3)
  }
  const onLeave = () => {
    rectRef.current = null
    x.set(0)
    y.set(0)
  }

  const cls = `group relative inline-flex select-none items-center justify-center gap-3 whitespace-normal rounded-[2px] text-center font-medium uppercase leading-snug tracking-[0.2em] sm:whitespace-nowrap sm:tracking-[0.24em] [font-stretch:112%] transition-[background-color,color] duration-300 active:scale-[0.98] ${VARIANTS[variant]} ${SIZES[size]} ${full ? 'w-full' : ''} ${className}`
  const inner = (
    <motion.span className="relative z-10 inline-flex items-center gap-3" style={active ? { x: sx, y: sy } : undefined}>
      {children}
    </motion.span>
  )

  const wrapProps = {
    ref,
    onPointerMove: onMove,
    onPointerLeave: onLeave,
    className: full ? 'flex w-full' : 'inline-flex',
  }

  let el
  if (to) {
    el = (
      <TLink to={to} className={cls} style={style} {...rest}>
        {inner}
      </TLink>
    )
  } else if (href) {
    const rel = rest.target === '_blank' && !rest.rel ? 'noopener noreferrer' : rest.rel
    el = (
      <a href={href} className={cls} style={style} {...rest} rel={rel}>
        {inner}
      </a>
    )
  } else {
    el = (
      <button type="button" className={cls} style={style} {...rest}>
        {inner}
      </button>
    )
  }

  // The shell follows the pointer at half the strength of the label, which gives the press some depth.
  return (
    <motion.span {...wrapProps} style={active ? { x: hx, y: hy } : undefined}>
      {el}
    </motion.span>
  )
}
