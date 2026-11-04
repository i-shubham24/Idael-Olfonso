import { useContent } from '../lib/i18n'
import { useDocumentTitle } from '../lib/useDocumentTitle'

/*
  PLACEHOLDER: structure only. Both texts must be completed with the client's
  legal entity details and reviewed before launch (Swiss nFADP and GDPR).
*/
export default function Legal({ page }) {
  const { t, contact } = useContent()
  const data = t.legal[page]
  useDocumentTitle(data.title)
  return (
    <section className="shell pb-24 pt-36 md:pb-36 md:pt-48" aria-labelledby="legal-title">
      <h1 id="legal-title" className="t-display text-[clamp(4rem,10vw,9rem)]">
        {data.title}
      </h1>
      <p className="t-lead mt-8 max-w-[46ch] text-ivory/70">{data.intro}</p>
      <dl className="mt-16 grid max-w-[900px] gap-1.5">
        {data.sections.map((s) => (
          <div key={s.h} className="grid gap-3 rounded-[2px] bg-onyx-2 p-6 md:grid-cols-[1fr_2fr] md:gap-10 md:p-8">
            <dt className="font-serif text-2xl">{s.h}</dt>
            <dd className="text-ivory/70">{s.p}</dd>
          </div>
        ))}
        <div className="grid gap-3 rounded-[2px] bg-onyx-2 p-6 md:grid-cols-[1fr_2fr] md:gap-10 md:p-8">
          <dt className="font-serif text-2xl">{t.footer.contact}</dt>
          <dd className="text-ivory/70">
            {contact.email} · {contact.phone}
          </dd>
        </div>
      </dl>
    </section>
  )
}
