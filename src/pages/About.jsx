import { useContent } from '../lib/i18n'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import Img from '../components/Img'
import Button from '../components/Button'
import Reveal from '../components/Reveal'

/* Idael's story: portrait, a few honest lines, how he works, his training. */
export default function About() {
  const { t, about, brand } = useContent()
  useDocumentTitle(about.title)

  return (
    <>
      <section className="shell grid min-h-[100svh] grid-cols-1 items-center gap-12 pb-20 pt-28 lg:grid-cols-12 lg:pt-32" aria-labelledby="about-title">
        <Reveal className="lg:col-span-6">
          <h1 id="about-title" className="t-display text-[clamp(3.5rem,8vw,7.5rem)]">
            {brand.name}
          </h1>
          <p className="t-lead mt-8 max-w-[44ch] text-ivory/75">{about.intro}</p>
          <dl className="mt-10 grid max-w-[520px] grid-cols-2 gap-8">
            <div>
              <dt className="t-label text-stone">{about.based}</dt>
              <dd className="mt-2">{brand.area}</dd>
            </div>
            <div>
              <dt className="t-label text-stone">{about.languages}</dt>
              <dd className="mt-2">{about.languageList}</dd>
            </div>
          </dl>
        </Reveal>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-graphite lg:col-span-5 lg:col-start-8">
          <Img
            image={about.standing}
            alt={about.portraitAlt}
            eager
            width={1100}
            sizes="(min-width: 1024px) 40vw, 92vw"
            className="absolute inset-0 h-full w-full object-cover object-[50%_6%]"
          />
        </div>
      </section>

      <section className="shell py-24 md:py-36" aria-label={about.title}>
        <Reveal as="p" className="t-h1 mx-auto max-w-[26ch] text-center text-[clamp(2rem,4vw,3.75rem)] leading-[1.12]">
          {about.story[0]}
        </Reveal>
        <div className="mx-auto mt-14 grid max-w-[1000px] gap-8 md:grid-cols-2 md:gap-14">
          {about.story.slice(1).map((p, i) => (
            <Reveal as="p" key={i} delay={i * 0.1} className="t-lead text-ivory/70">
              {p}
            </Reveal>
          ))}
        </div>
      </section>

      <section className="shell grid grid-cols-1 gap-4 md:grid-cols-2" aria-label="Photographs">
        {about.gallery.map((src, i) => (
          <Reveal key={src} delay={i * 0.1} className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-graphite">
            <Img
              image={src}
              alt=""
              width={1000}
              sizes="(min-width: 768px) 50vw, 92vw"
              className="absolute inset-0 h-full w-full object-cover object-[50%_6%]"
            />
          </Reveal>
        ))}
      </section>

      <section className="shell py-24 md:py-36" aria-labelledby="principles-title">
        <Reveal>
          <h2 id="principles-title" className="t-h2 text-center text-[clamp(2.75rem,5vw,4.75rem)]">
            {about.principlesTitle}
          </h2>
        </Reveal>
        <ol className="mt-14 grid gap-12 text-center md:grid-cols-3 md:gap-10">
          {about.principles.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.1}>
              <h3 className="t-h3 text-3xl">{p.title}</h3>
              <p className="mx-auto mt-3 max-w-[32ch] text-ivory/65">{p.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="shell pb-24 md:pb-36" aria-labelledby="credentials-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 id="credentials-title" className="t-h2 text-[clamp(2.5rem,4.5vw,4rem)]">
              {about.credentialsTitle}
            </h2>
          </Reveal>
          <ul className="grid gap-6 lg:col-span-6 lg:col-start-7">
            {t.trainer.credentials.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 0.08}>
                <p className="t-h3 text-2xl">{c.title}</p>
                <p className="mt-1 text-ivory/60">{c.detail}</p>
              </Reveal>
            ))}
          </ul>
        </div>
        <div className="mt-16 flex flex-wrap gap-3">
          <Button to="/#book" size="lg">
            {t.hero.cta}
          </Button>
          <Button to="/#training" variant="ghost" size="lg">
            {about.services}
          </Button>
        </div>
      </section>
    </>
  )
}
