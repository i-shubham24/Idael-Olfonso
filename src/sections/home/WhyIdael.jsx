import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'motion/react'
import { useContent } from '../../lib/i18n'
import { useReducedMotion } from '../../lib/media'
import Img from '../../components/Img'
import RollingNumber from '../../components/RollingNumber'
import Reveal from '../../components/Reveal'

const ease = [0.16, 1, 0.3, 1]

/* A fact tile: the figure rolls up from zero the first time it scrolls into view. */
function Fact({ value, label, index }) {
  const ref = useRef(null)
  const seen = useInView(ref, { once: true, amount: 0.6 })
  const shown = seen ? value : value.replace(/\d/g, '0')
  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, ease, delay: (index % 2) * 0.08 }}
      className="group flex min-h-[220px] flex-col justify-between rounded-[2px] bg-onyx-2 p-6 transition-colors duration-500 hover:bg-graphite md:min-h-[240px] md:p-8"
    >
      {/* The serif sits on the wrapper so the digit columns keep a 1em line and never show the next digit. */}
      <p
        className="t-display text-[clamp(3.75rem,7vw,7rem)] text-ivory transition-colors duration-500 group-hover:text-gold-2"
        aria-label={value}
      >
        <RollingNumber value={shown} />
      </p>
      <p className="mt-6 max-w-[22ch] text-ivory/65">{label}</p>
    </motion.li>
  )
}

/*
  Why Idael: six short facts set as large figures, next to a tall portrait
  that drifts slower than the page. Graphics first, very little reading.
*/
export default function WhyIdael() {
  const { t, images, brand } = useContent()
  const reduced = useReducedMotion()
  const photo = useRef(null)
  const { scrollYProgress } = useScroll({ target: photo, offset: ['start end', 'end start'] })
  // Zoom out from the top edge instead of sliding, so his head always stays in frame.
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1.14, 1])

  return (
    <section id="why" className="shell py-28 md:py-44" aria-labelledby="why-title">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal as="h2" id="why-title" className="t-h2 text-[clamp(3rem,7vw,7.5rem)]">
          {t.why.title}
        </Reveal>
        <p className="t-lead max-w-[30ch] text-ivory/70">{t.why.intro}</p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-1.5 md:mt-20 lg:grid-cols-3">
        <div
          ref={photo}
          className="relative min-h-[420px] overflow-hidden rounded-[2px] bg-graphite lg:row-span-3 lg:min-h-0"
        >
          <motion.div className="absolute inset-0 origin-top" style={{ scale }}>
            {/* Idael himself, mid session. */}
            <Img
              image={images.why}
              alt={brand.name}
              sizes="(min-width: 1024px) 33vw, 92vw"
              className="h-full w-full object-cover object-[50%_6%]"
            />
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(10_10_11/0.7),transparent_45%)]" />
          <p className="absolute bottom-6 left-6 font-serif text-3xl">{brand.name}</p>
        </div>
        <ul className="grid grid-cols-2 gap-1.5 lg:col-span-2 lg:row-span-3">
          {t.why.facts.map((f, i) => (
            <Fact key={f.label} value={f.value} label={f.label} index={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}
