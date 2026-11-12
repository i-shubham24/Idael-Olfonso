import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useContent } from '../../lib/i18n'
import { prefersReducedMotion } from '../../lib/media'
import Img from '../../components/Img'

/*
  The problems people bring to Idael, told as a short chapter.
  1. A two tone statement whose grey half brightens as you read it. The
     section slides up over the hero, which holds still behind it.
  2. On a desktop a photo frame holds still on the left while the problems
     scroll past on the right. The one in the middle of the screen is in
     focus, and the frame changes softly to its photo. Phones show each
     problem with its own photo.
*/
export default function Pains() {
  const { t, pains } = useContent()
  const p = t.pains
  const root = useRef(null)
  const [active, setActive] = useState(0)
  const wordsB = p.leadB.split(' ')
  const shown = p.featured.map((id) => pains.find((x) => x.id === id)).filter(Boolean)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.pain-block').forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => self.isActive && setActive(i),
        })
      })
      if (prefersReducedMotion()) return
      gsap.fromTo(
        '.lead-word',
        { opacity: 0.3 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: { trigger: '.lead', start: 'top 75%', end: 'bottom 40%', scrub: true },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [p.leadB])

  return (
    <section
      ref={root}
      id="pains"
      className="relative rounded-t-[14px] bg-onyx pb-28 pt-24 shadow-[0_-40px_80px_rgb(0_0_0/0.55)] md:pb-40 md:pt-32"
      aria-labelledby="pains-title"
    >
      {/* A two tone statement: the first half bright, the second half brightening as you read. */}
      <div className="shell text-center">
        <div>
          <h2 id="pains-title" className="lead t-display text-[clamp(2.25rem,min(5.4vw,4.75rem),4.75rem)] leading-[1.04]">
            {/* Two lines on larger screens, always. */}
            <span className="block md:whitespace-nowrap">{p.leadA}</span>
            <span className="block md:whitespace-nowrap">
              {wordsB.map((w, i) => (
                <span key={i} className="lead-word word">
                  {w}&nbsp;
                </span>
              ))}
            </span>
          </h2>
          <p className="t-label mt-10 text-stone">{p.title}</p>
        </div>
      </div>

      <div className="shell mt-20 grid gap-16 md:mt-28 lg:grid-cols-12 lg:gap-12">
        {/* The frame that holds still (desktop). */}
        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-[max(7rem,calc(50svh-19rem))]">
            <div className="relative aspect-[4/5] max-h-[38rem] overflow-hidden rounded-[2px] bg-graphite">
              {shown.map((item, i) => (
                <Img
                  key={item.id}
                  image={item.image}
                  alt=""
                  width={900}
                  sizes="40vw"
                  eager
                  priority={false}
                  fade={false}
                  className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1400ms] ease-[var(--ease-out-expo)] ${
                    active === i ? 'scale-100 opacity-100' : 'scale-[1.06] opacity-0'
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(10_10_11/0.55),transparent_45%)]" />
              <p className="t-label tabular absolute bottom-5 left-5 text-ivory/80" aria-hidden="true">
                {String(active + 1).padStart(2, '0')} / {String(shown.length).padStart(2, '0')}
              </p>
            </div>
          </div>
        </div>

        {/* The problems, one per screen height on a desktop. */}
        <ol className="grid gap-20 lg:col-span-6 lg:col-start-7 lg:gap-0">
          {shown.map((item, i) => (
            <li
              key={item.id}
              className={`pain-block flex flex-col justify-center transition-opacity duration-700 ease-[var(--ease-out-expo)] lg:min-h-[70svh] ${
                active === i ? 'lg:opacity-100' : 'lg:opacity-25'
              }`}
            >
              <div className="relative mb-8 aspect-[16/10] overflow-hidden rounded-[2px] bg-graphite lg:hidden">
                <Img image={item.image} alt="" width={900} className="absolute inset-0 h-full w-full object-cover" />
              </div>
              <span className="t-label tabular text-stone">{String(i + 1).padStart(2, '0')}</span>
              <p className="t-h2 mt-5 text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.05]">{item.problem}</p>
              <div className="mt-8 max-w-[38ch]">
                <p className="t-label text-gold">{p.answerLabel}</p>
                <p className="t-lead mt-3 text-ivory/75">{item.answer}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
