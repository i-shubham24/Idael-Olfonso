import { useDocumentTitle } from '../lib/useDocumentTitle'
import Button from '../components/Button'

export default function NotFound() {
  useDocumentTitle('Page not found')
  return (
    <section className="shell flex min-h-[90svh] flex-col justify-center pb-24 pt-32" aria-labelledby="nf-title">
      <h1 id="nf-title" className="t-display text-[clamp(4rem,11vw,11rem)]">
        Page not found
      </h1>
      <p className="t-lead mt-8 max-w-[40ch] text-ivory/70">
        This page does not exist, or the link is out of date.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button to="/" size="lg">
          Back to the home page
        </Button>
        <Button to="/book" variant="ghost" size="lg">
          Book a session
        </Button>
      </div>
    </section>
  )
}
