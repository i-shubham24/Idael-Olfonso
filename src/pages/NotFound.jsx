import { useContent } from '../lib/i18n'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import Button from '../components/Button'

export default function NotFound() {
  const { t } = useContent()
  useDocumentTitle(t.notFound.title)
  return (
    <section className="shell flex min-h-[90svh] flex-col justify-center pb-24 pt-32" aria-labelledby="nf-title">
      <h1 id="nf-title" className="t-display text-[clamp(4rem,11vw,11rem)]">
        {t.notFound.title}
      </h1>
      <p className="t-lead mt-8 max-w-[40ch] text-ivory/70">{t.notFound.text}</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button to="/" size="lg">
          {t.notFound.home}
        </Button>
        <Button to="/#book" variant="ghost" size="lg">
          {t.notFound.book}
        </Button>
      </div>
    </section>
  )
}
