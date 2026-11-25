import { useState } from 'react'
import { useContent } from '../../lib/i18n'
import Img from '../../components/Img'
import Title from '../../components/Title'
import Reveal from '../../components/Reveal'

/*
  Where you train, as tall picture panels (Remedy Place location cards):
  a small label over a large name. On a desktop the panel you point at opens
  wide and the others narrow; on phones they stack.
*/
export default function Places() {
  const { t, zones } = useContent()
  const l = t.locations
  const shown = l.featured.map((id) => zones.find((z) => z.id === id)).filter(Boolean)
  const [open, setOpen] = useState(0)

  return (
    <section id="places" className="pb-28 md:pb-44" aria-labelledby="places-title">
      <div className="shell flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Title id="places-title" kicker={l.kicker} className="t-display text-[clamp(3rem,6vw,6.25rem)]">
          {l.title}
        </Title>
        <Reveal as="p" className="max-w-[34ch] text-ivory/65 md:text-right">
          {l.intro}
        </Reveal>
      </div>

      <Reveal className="shell mt-14 md:mt-20">
        <ul className="flex flex-col gap-3 lg:h-[72vh] lg:min-h-[520px] lg:flex-row">
          {shown.map((z, i) => {
            const isOpen = open === i
            return (
              <li
                key={z.id}
                onPointerEnter={() => setOpen(i)}
                onFocus={() => setOpen(i)}
                tabIndex={0}
                className={`group relative aspect-[4/3] overflow-hidden rounded-[2px] bg-graphite outline-none transition-[flex-grow] duration-[1100ms] ease-[var(--ease-out-expo)] sm:aspect-[16/9] lg:aspect-auto lg:basis-0 ${
                  isOpen ? 'lg:grow-[3.2]' : 'lg:grow'
                }`}
              >
                <Img
                  image={z.image}
                  alt=""
                  width={1200}
                  sizes="(min-width: 1024px) 50vw, 92vw"
                  className={`absolute inset-0 h-full w-full object-cover transition-[transform,opacity] duration-1000 ease-[var(--ease-out-expo)] ${
                    isOpen ? 'scale-100 lg:opacity-100' : 'scale-110 lg:opacity-55'
                  }`}
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(10_10_11/0.88)_0%,rgb(10_10_11/0.45)_50%,transparent_100%)]" />

                {/* Collapsed on desktop: Architectural tilted vertical text pinned to the left edge, 10% larger */}
                <div
                  className={`pointer-events-none absolute bottom-8 left-5 md:left-6 hidden lg:block transition-all duration-500 ${
                    isOpen ? 'opacity-0 invisible' : 'opacity-100 visible delay-100'
                  }`}
                  aria-hidden={isOpen}
                >
                  <div className="flex items-center gap-4 [writing-mode:vertical-rl] rotate-180">
                    <span className="t-label tabular text-[#baff00] font-semibold tracking-wider text-[0.82rem]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-serif text-[1.62rem] tracking-wider text-white whitespace-nowrap">
                      {z.name}
                    </span>
                  </div>
                </div>

                {/* Expanded state on desktop & standard view on mobile/tablet */}
                <div
                  className={`absolute inset-x-0 bottom-0 p-5 md:p-7 text-white transition-all duration-500 ${
                    isOpen ? 'lg:opacity-100 lg:visible lg:delay-150' : 'lg:opacity-0 lg:invisible lg:pointer-events-none'
                  }`}
                >
                  <p className="t-label tabular text-[#baff00] font-semibold">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="t-display mt-2 whitespace-nowrap text-white text-[clamp(2rem,3vw,3.25rem)]">{z.name}</h3>
                  <p
                    className={`mt-2 max-w-[32ch] text-sm text-white/85 transition-opacity duration-500 ${
                      isOpen ? 'opacity-100 delay-200' : 'opacity-0'
                    }`}
                  >
                    {z.detail}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </Reveal>
    </section>
  )
}
