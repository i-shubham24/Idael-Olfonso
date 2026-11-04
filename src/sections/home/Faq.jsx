import { useState } from 'react'
import { Plus } from '@phosphor-icons/react'
import { useContent } from '../../lib/i18n'
import Reveal from '../../components/Reveal'

export default function Faq() {
  const { t, contact } = useContent()
  const faqs = t.faq.items
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="shell py-28 md:py-44" aria-labelledby="faq-title">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal as="h2" id="faq-title" className="t-h2 text-[clamp(3rem,5vw,5.5rem)]">
            {t.faq.title}
          </Reveal>
          <p className="t-lead mt-6 max-w-[32ch] text-ivory/70">
            {t.faq.intro}{' '}
            <a
              href={`https://wa.me/${contact.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="text-ivory underline decoration-gold/50 underline-offset-4 hover:decoration-gold"
            >
              WhatsApp
            </a>
            .
          </p>
        </div>
        <ul className="grid gap-1.5 lg:col-span-7">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <li
                key={f.q}
                className={`rounded-[2px] transition-colors duration-500 ${isOpen ? 'bg-graphite' : 'bg-onyx-2 hover:bg-graphite/60'}`}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left md:px-7 md:py-6"
                  >
                    <span className="t-h3 text-2xl md:text-3xl">{f.q}</span>
                    <Plus
                      size={20}
                      aria-hidden="true"
                      className={`shrink-0 transition-[transform,color] duration-500 ${isOpen ? 'rotate-45 text-gold' : 'text-ivory/70'}`}
                    />
                  </button>
                </h3>
                <div
                  id={`faq-${i}`}
                  className={`grid transition-[grid-template-rows] duration-700 ease-[var(--ease-out-expo)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[58ch] px-5 pb-7 text-ivory/70 md:px-7">{f.a}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
