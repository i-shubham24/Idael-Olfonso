import { InstagramLogo } from '@phosphor-icons/react'
import { useContent } from '../../lib/i18n'
import Img from '../../components/Img'
import Button from '../../components/Button'
import Title from '../../components/Title'

/*
  A running gallery in the Equinox pattern: photographs of Idael training
  drift slowly from right to left, in different sizes and at different
  heights, each with a small caption. It pauses while you point at it.
  The row is drawn twice so the loop never shows a seam.
*/
const SHAPES = [
  'w-[58vw] sm:w-[34vw] lg:w-[22vw] aspect-[3/4]',
  'w-[72vw] sm:w-[44vw] lg:w-[30vw] aspect-[4/3] mt-16 md:mt-24',
  'w-[50vw] sm:w-[28vw] lg:w-[18vw] aspect-[4/5] mt-6 md:mt-10',
]

export default function Gallery() {
  const { t, contact, wall } = useContent()
  const g = t.gallery
  const tiles = [...wall, ...wall]

  return (
    <section id="gallery" className="overflow-hidden py-28 md:py-40" aria-labelledby="gallery-title">
      <div className="shell flex flex-col items-center text-center">
        <Title id="gallery-title" kicker={g.kicker} align="center" className="t-display text-[clamp(3rem,6vw,6.25rem)]">
          {g.title}
        </Title>
        <p className="mt-6 max-w-[40ch] text-ivory/65">{g.intro(contact.followers)}</p>
        <div className="mt-8">
          <Button href={contact.instagram} target="_blank" variant="ghost">
            <InstagramLogo size={16} aria-hidden="true" /> {contact.instagramHandle}
          </Button>
        </div>
      </div>

      <div className="marquee mt-20 md:mt-28" aria-label={g.title}>
        {/* Spacing sits inside each item (not as a gap), so both halves are exactly equal and the loop is seamless. */}
        <ul className="marquee-track flex w-max items-start">
          {tiles.map((tile, i) => {
            // Shapes follow the position within one set, so the copy matches the original exactly.
            const n = i % wall.length
            const shape = tile.wide ? SHAPES[1] : SHAPES[n % 3 === 1 ? 2 : 0]
            return (
              <li key={i} className={`shrink-0 pr-5 md:pr-8 ${shape.split(' ').filter((c) => c.startsWith('mt-') || c.startsWith('md:mt-')).join(' ')}`} aria-hidden={i >= wall.length || undefined}>
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={i >= wall.length ? -1 : undefined}
                  className="group block"
                  aria-label={`${g.labels[tile.tag] ?? ''}, ${contact.instagramHandle}`}
                >
                  <div className={`relative overflow-hidden rounded-[2px] bg-graphite ${shape.split(' ').filter((c) => !c.includes('mt-')).join(' ')}`}>
                    <Img
                      image={tile.image}
                      alt=""
                      width={900}
                      sizes="(min-width: 1024px) 30vw, 70vw"
                      className="absolute inset-0 h-full w-full object-cover object-[50%_18%] transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                    />
                  </div>
                  <p className="t-label mt-4 text-ivory/60 transition-colors duration-300 group-hover:text-ivory">{g.labels[tile.tag]}</p>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
