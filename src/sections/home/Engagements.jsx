import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check } from '@phosphor-icons/react'
import { currency, engagements, showFees } from '../../content/site'
import RollingNumber from '../../components/RollingNumber'
import Button from '../../components/Button'

const ease = [0.16, 1, 0.3, 1]

const fmt = (n) => new Intl.NumberFormat(currency.locale, { maximumFractionDigits: 0 }).format(n)

/* Square radio options, built on real radio inputs for keyboard and screen readers. */
function Choice({ name, options, value, onChange, legend, render }) {
  return (
    <fieldset>
      <legend className="t-label mb-4 text-stone">{legend}</legend>
      <div className="grid gap-1.5">
        {options.map((o) => {
          const checked = value === o.id
          return (
            <label
              key={o.id}
              className={`relative flex min-h-16 cursor-pointer items-center gap-5 rounded-[2px] px-5 py-4 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold ${
                checked ? 'text-ink' : 'bg-onyx-2 text-ivory/75 hover:bg-graphite hover:text-ivory'
              }`}
            >
              <input
                type="radio"
                name={name}
                value={o.id}
                checked={checked}
                onChange={() => onChange(o.id)}
                className="sr-only"
              />
              {checked && (
                <motion.span
                  layoutId={`${name}-marker`}
                  className="absolute inset-0 rounded-[2px] bg-ivory"
                  transition={{ type: 'spring', stiffness: 380, damping: 36 }}
                />
              )}
              <span className="relative font-serif text-2xl">{render(o, checked)}</span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

export default function Engagements() {
  const [id, setId] = useState(engagements.find((p) => p.featured)?.id ?? engagements[0].id)
  const plan = engagements.find((p) => p.id === id)

  return (
    <section id="engagements" className="shell py-28 md:py-44" aria-labelledby="engagements-title">
      <h2 id="engagements-title" className="t-h2 text-[clamp(3rem,7vw,7.5rem)]">
        Ways to work together
      </h2>
      <p className="t-lead mt-6 max-w-[46ch] text-ivory/70">
        Everyone starts with a free consultation. After that, choose the rhythm that suits your year. The details are
        agreed with you on the call.
      </p>

      <div className="mt-14 grid grid-cols-1 gap-10 md:mt-20 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Choice
            name="engagement"
            legend="How often would you like to train?"
            options={engagements.map((p) => ({ id: p.id, label: p.choice }))}
            value={id}
            onChange={setId}
            render={(o) => o.label}
          />
        </div>

        <motion.div
          layout
          transition={{ duration: 0.7, ease }}
          className="relative overflow-hidden rounded-[2px] bg-ivory p-7 text-ink md:p-12 lg:col-span-7"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease }}
            >
              <h3 className="t-h2 text-[clamp(2.5rem,4.8vw,4.5rem)]">{plan.name}</h3>
              <p className="mt-3 max-w-[42ch] text-ink/65">{plan.pitch}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 rounded-[2px] bg-ink/[0.05] px-5 py-6 md:px-6">
            {showFees ? (
              <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
                <p className="flex items-baseline gap-2">
                  <span className="t-label text-ink/55">From {currency.symbol}</span>
                  <RollingNumber value={fmt(plan.fee)} className="t-display text-[clamp(3.5rem,7vw,6.5rem)]" />
                </p>
                <p className="t-label pb-3 text-ink/55">{plan.unit}</p>
              </div>
            ) : (
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <p className="font-serif text-[clamp(2rem,3.4vw,3rem)] italic leading-none">Price on request</p>
                <p className="t-label text-ink/55">Discussed in your consultation</p>
              </div>
            )}
          </div>

          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            <AnimatePresence mode="popLayout" initial={false}>
              {plan.includes.map((item, i) => (
                <motion.li
                  key={`${plan.id}-${item}`}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.5, ease, delay: i * 0.05 }}
                  className="flex gap-3"
                >
                  <Check size={18} className="mt-1 shrink-0 text-[#8a6d3f]" aria-hidden="true" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <div className="mt-12 flex flex-wrap items-center gap-5">
            <Button to={`/book?type=consultation&plan=${plan.id}`} variant="ink" size="lg">
              Book a free consultation
            </Button>
            <p className="text-sm text-ink/60">The first call takes 20 minutes and costs nothing.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
