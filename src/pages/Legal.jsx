import { brand, contact } from '../content/site'
import { useDocumentTitle } from '../lib/useDocumentTitle'

/*
  PLACEHOLDER: structure only. Both texts must be completed with the client's
  legal entity details and reviewed before launch (Swiss nFADP and GDPR).
*/
const PAGES = {
  privacy: {
    title: 'Privacy',
    intro: `How ${brand.name} handles the personal information you share through this website.`,
    sections: [
      {
        h: 'What we collect',
        p: 'When you book, we collect your name, email address, phone number, the session you chose and anything you write in the booking form. We do not use advertising or tracking cookies.',
      },
      {
        h: 'Why we collect it',
        p: 'Only to arrange, confirm and remind you of your sessions, and to prepare your training. Health information you choose to share is used for your training plan and nothing else.',
      },
      {
        h: 'Who sees it',
        p: 'Idael Alfonso, and the booking and email services needed to run the calendar. Your information is never sold or shared for marketing.',
      },
      {
        h: 'Your rights',
        p: `You can ask to see, correct or delete your information at any time by writing to ${contact.email}.`,
      },
    ],
  },
  imprint: {
    title: 'Imprint',
    intro: 'Legal information for this website.',
    sections: [
      { h: 'Responsible for this website', p: `${brand.name}, ${contact.area}. Full legal address to be added.` },
      { h: 'Contact', p: `${contact.email} · ${contact.phone}` },
      {
        h: 'Liability',
        p: 'The content of this website is prepared with care. Training advice on this website does not replace an individual assessment.',
      },
    ],
  },
}

export default function Legal({ page }) {
  const data = PAGES[page]
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
      </dl>
    </section>
  )
}
