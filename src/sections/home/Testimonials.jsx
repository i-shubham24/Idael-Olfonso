import { useRef } from 'react'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import { useContent } from '../../lib/i18n'
import Reveal from '../../components/Reveal'

function QuoteCard({ item }) {
  return (
    <figure className="flex h-full flex-col rounded-[2px] bg-onyx-2 p-7 transition-colors duration-500 hover:bg-graphite md:p-10">
      <span className="font-serif text-[5rem] leading-[0.6] text-gold" aria-hidden="true">
        “
      </span>
      <blockquote className="mt-8 flex-1">
        <p className="font-serif text-[clamp(1.5rem,2.1vw,2rem)] font-light leading-[1.25]">{item.quote}</p>
      </blockquote>
      <figcaption className="mt-10">
        <p className="t-label text-ivory">
          {item.attribution}, {item.place}
        </p>
      </figcaption>
    </figure>
  )
}

/*
  Client words, names withheld. A native swipe rail (touch, trackpad,
  keyboard) with buttons, and click-and-drag for mouse users.
*/
export default function Testimonials() {
  const { t } = useContent()
  const copy = t.testimonials
  const rail = useRef(null)
  const drag = useRef(null)

  const step = (dir) => {
    const el = rail.current
    const card = el.querySelector('li')
    el.scrollBy({ left: dir * (card ? card.getBoundingClientRect().width + 16 : 400), behavior: 'smooth' })
  }

  const onDown = (e) => {
    if (e.pointerType !== 'mouse') return
    drag.current = { x: e.clientX, left: rail.current.scrollLeft, moved: false }
    rail.current.style.scrollSnapType = 'none'
  }
  const onMove = (e) => {
    if (!drag.current) return
    const dx = e.clientX - drag.current.x
    if (Math.abs(dx) > 4) drag.current.moved = true
    rail.current.scrollLeft = drag.current.left - dx
  }
  const onUp = () => {
    if (!drag.current) return
    drag.current = null
    rail.current.style.scrollSnapType = ''
  }

  return (
    <section id="testimonials" className="py-28 md:py-44" aria-labelledby="testimonials-title">
      <div className="shell flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal as="h2" id="testimonials-title" className="t-h2 text-[clamp(3rem,7vw,7.5rem)]">
            {copy.title}
          </Reveal>
          <p className="t-lead mt-6 max-w-[42ch] text-ivory/70">
            {copy.intro}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            className="flex h-14 w-14 items-center justify-center rounded-[2px] bg-graphite transition-colors hover:bg-line"
            aria-label={copy.prev}
          >
            <ArrowLeft size={20} weight="light" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            className="flex h-14 w-14 items-center justify-center rounded-[2px] bg-ivory text-ink transition-colors hover:bg-white"
            aria-label={copy.next}
          >
            <ArrowRight size={20} weight="light" aria-hidden="true" />
          </button>
        </div>
      </div>
      <ul
        ref={rail}
        className="rail mt-14 flex cursor-grab snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 md:scroll-px-8 xl:scroll-px-[max(3rem,calc((100vw-1440px)/2+3rem))] active:cursor-grabbing md:px-8 xl:px-[max(3rem,calc((100vw-1440px)/2+3rem))]"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        aria-label={copy.title}
        data-cursor={t.cursor.drag}
      >
        {copy.items.map((item) => (
          <li key={item.quote} className="w-[min(86vw,520px)] shrink-0 snap-start select-none">
            <QuoteCard item={item} />
          </li>
        ))}
      </ul>
    </section>
  )
}
