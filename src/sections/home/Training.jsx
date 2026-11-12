import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ArrowUpRight } from '@phosphor-icons/react'
import { useContent } from '../../lib/i18n'
import { TLink } from '../../lib/transition'
import Img from '../../components/Img'
import Video from '../../components/Video'
import Title from '../../components/Title'

/*
  The ways to train, as an Equinox style gallery on warm stone (the one light
  section). On a desktop the section holds still and the gallery slides past
  as you scroll, each picture settling as it arrives, with a running count.
  Phones and tablets swipe through it instead.
*/
export default function Training() {
  const { t, services } = useContent()
  const s = t.services
  const root = useRef(null)
  const track = useRef(null)
  const [index, setIndex] = useState(0)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    // Arrival: the stone panel opens out of the dark page instead of cutting in.
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const st = { trigger: root.current, start: 'top bottom', end: 'top 15%', scrub: true }
      gsap.fromTo(
        root.current,
        { clipPath: 'inset(0% 5% 0% 5% round 10px)' },
        { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: st },
      )
      gsap.fromTo('.tr-dusk', { opacity: 1 }, { opacity: 0, ease: 'power1.in', scrollTrigger: { ...st } })
    })
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const distance = () => track.current.scrollWidth - window.innerWidth
      const tween = gsap.to(track.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => setIndex(Math.min(services.length - 1, Math.floor(self.progress * services.length))),
        },
      })
      gsap.utils.toArray('.tr-media').forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 1.25 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: el, containerAnimation: tween, start: 'left right', end: 'center center', scrub: true },
          },
        )
      })
    })
    return () => mm.revert()
  }, [services.length])

  return (
    <section
      ref={root}
      id="training"
      className="relative bg-sand text-ink lg:h-[100svh] lg:overflow-hidden"
      aria-labelledby="training-title"
    >
      {/* Dark veil that dissolves into the stone as the section arrives. */}
      <div className="tr-dusk pointer-events-none absolute inset-0 z-10 bg-onyx-2 opacity-0" aria-hidden="true" />
      <div
        ref={track}
        className="flex flex-col py-24 md:py-32 lg:h-full lg:w-max lg:flex-row lg:items-center lg:gap-[4vw] lg:pb-6 lg:pt-20 lg:pl-[max(3rem,calc((100vw-1440px)/2+3rem))] lg:pr-[10vw]"
      >
        <div className="shell lg:w-[30vw] lg:max-w-[460px] lg:shrink-0 lg:p-0">
          <Title id="training-title" kicker={s.kicker} kickerClass="text-ink/50" className="t-display text-[clamp(3rem,6vw,6.25rem)]">
            {s.title}
          </Title>
          <p className="mt-6 max-w-[36ch] text-ink/65">{s.intro}</p>
          <p className="t-label tabular mt-12 hidden text-ink/50 lg:block" aria-hidden="true">
            <span className="text-ink">{String(index + 1).padStart(2, '0')}</span> / {String(services.length).padStart(2, '0')}
          </p>
        </div>

        <ul className="rail mt-14 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 md:scroll-px-8 md:px-8 lg:mt-0 lg:gap-[3vw] lg:overflow-visible lg:p-0">
          {services.map((item, i) => (
            <li key={item.slug} className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[min(30vw,460px)]">
              <TLink to={`/services/${item.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[2px] bg-sand-2 lg:aspect-auto lg:h-[min(54vh,calc(100svh-320px))]">
                  <div className="tr-media absolute inset-0">
                    {item.video ? (
                      <Video video={item.video} poster={item.photo} className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]" />
                    ) : (
                      <Img
                        image={item.image}
                        alt=""
                        width={900}
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 78vw"
                        className="h-full w-full object-cover object-[50%_20%] transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                      />
                    )}
                  </div>
                  <span className="t-display tabular absolute left-5 top-4 text-[clamp(2.5rem,4vw,4rem)] text-ivory/90">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-ivory text-ink opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-5">
                  <p className="t-label text-ink/50">
                    {item.kicker} · {item.duration} min
                  </p>
                  <h3 className="t-h3 mt-2 text-[1.9rem] md:text-[2.2rem]">{item.name}</h3>
                  <p className="mt-2 max-w-[34ch] text-sm text-ink/65">{item.summary}</p>
                </div>
              </TLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
