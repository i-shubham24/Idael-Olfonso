import { motion, useMotionValue, useSpring } from 'motion/react'
import { useFinePointer, useReducedMotion } from '../lib/media'

/**
 * Leans its content a few degrees toward the pointer, like a card held in the
 * hand. Mouse and trackpad only; touch and reduced motion keep it flat.
 */
export default function Tilt({ className = '', max = 4, children }) {
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const on = fine && !reduced
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 150, damping: 18 })
  const sry = useSpring(ry, { stiffness: 150, damping: 18 })

  const onMove = (e) => {
    if (!on) return
    const r = e.currentTarget.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2)
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2)
  }
  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <div className={`[perspective:1200px] ${className}`} onPointerMove={onMove} onPointerLeave={onLeave}>
      <motion.div className="h-full w-full" style={on ? { rotateX: srx, rotateY: sry } : undefined}>
        {children}
      </motion.div>
    </div>
  )
}
