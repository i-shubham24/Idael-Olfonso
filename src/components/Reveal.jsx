import { motion } from 'motion/react'
import { useReducedMotion } from '../lib/media'

const ease = [0.16, 1, 0.3, 1]

/**
 * A heading (or any block) that rises out of an invisible mask the first time
 * it scrolls into view, like the hero headline. The padding keeps descenders
 * and italic overhangs from being clipped by the mask.
 */
export default function Reveal({ as: Tag = 'h2', className = '', delay = 0, children, ...rest }) {
  const reduced = useReducedMotion()
  return (
    <Tag className={`overflow-hidden pb-[0.14em] pr-[0.1em] ${className}`} {...rest}>
      <motion.span
        className="block"
        initial={reduced ? false : { y: '110%', rotate: 1.5 }}
        whileInView={{ y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.2, ease, delay }}
        style={{ transformOrigin: '0% 100%' }}
      >
        {children}
      </motion.span>
    </Tag>
  )
}
