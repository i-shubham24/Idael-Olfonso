import { useContent } from '../../lib/i18n'
import Counter from '../../components/Counter'
import Title from '../../components/Title'
import Reveal from '../../components/Reveal'

/*
  Why Idael, in the Equinox "118 clubs" pattern: very large numbers, a short
  line under each. The heading stays put on the left while the facts scroll
  past on the right; the numbers count up as they arrive.
*/
export default function Why() {
  const { t } = useContent()
  const w = t.why

  return (
    <section id="why" className="shell py-28 md:py-44" aria-labelledby="why-title">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-36">
            <Title id="why-title" kicker={w.kicker} className="t-display text-[clamp(3rem,5.4vw,5.75rem)]">
              {w.title}
            </Title>
          </div>
        </div>
        <ul className="grid gap-x-12 gap-y-16 sm:grid-cols-2 lg:col-span-7 lg:col-start-6 lg:gap-y-24">
          {w.facts.map((f, i) => (
            <Reveal as="li" key={f.label} delay={(i % 2) * 0.1}>
              <Counter value={f.value} className="t-display block text-[clamp(4.5rem,8vw,8rem)] leading-none text-ivory" />
              <p className="mt-5 max-w-[30ch] text-ivory/60">{f.label}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
