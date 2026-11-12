import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { useContent } from '../../lib/i18n'
import { prefersReducedMotion } from '../../lib/media'
import Img from '../../components/Img'
import Button from '../../components/Button'
import Title from '../../components/Title'
import Reveal from '../../components/Reveal'

/*
  Who Idael is, in the Remedy Place founder pattern: words on one side, a tall
  black and white portrait running off the edge of the screen on the other.
  The portrait uncovers from the bottom as it arrives and settles as you scroll.
*/
export default function Meet() {
  const { t, about } = useContent()
  const m = t.trainer
  const root = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.meet-frame',
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.6,
          ease: 'expo.inOut',
          scrollTrigger: { trigger: '.meet-frame', start: 'top 80%', once: true },
        },
      )
      gsap.fromTo(
        '.meet-img',
        { scale: 1.25, transformOrigin: '50% 0%' },
        {
          scale: 1,
          transformOrigin: '50% 0%',
          ease: 'none',
          scrollTrigger: { trigger: '.meet-frame', start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="idael" className="relative overflow-hidden pb-28 pt-12 md:pb-44" aria-labelledby="meet-title">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-0">
        <div className="shell lg:order-1 lg:max-w-none lg:pr-20 xl:pl-[max(3rem,calc((100vw-1440px)/2+3rem))]">
          <Title id="meet-title" kicker={m.kicker} className="t-display text-[clamp(3rem,6vw,6rem)]">
            {m.title}
          </Title>
          <Reveal>
            <p className="t-lead mt-8 max-w-[42ch] text-ivory/75">{m.intro}</p>
          </Reveal>

          <Reveal>
            <ul className="mt-12 grid gap-5">
              {m.credentials.map((c) => (
                <li key={c.title}>
                  <p className="text-ivory">{c.title}</p>
                  <p className="mt-1 text-sm text-ivory/50">{c.detail}</p>
                </li>
              ))}
            </ul>
            <div className="mt-12">
              <Button to="/about" variant="ghost">
                {m.cta}
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="relative px-4 md:px-8 lg:order-2 lg:px-0">
          <div className="meet-frame relative aspect-[4/5] overflow-hidden rounded-[2px] bg-graphite lg:aspect-auto lg:h-[min(92vh,980px)] lg:rounded-none">
            <Img
              image={about.standing}
              alt={about.portraitAlt}
              width={1200}
              sizes="(min-width: 1024px) 50vw, 92vw"
              className="meet-img absolute inset-0 h-full w-full object-cover object-[50%_8%]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
