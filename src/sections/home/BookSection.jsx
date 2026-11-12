import { useContent } from '../../lib/i18n'
import BookingFlow from '../../components/booking/BookingFlow'

/* The booking calendar, right on the home page. Every booking button scrolls here. */
export default function BookSection() {
  const { t } = useContent()
  return (
    <section id="book" className="bg-onyx-2 py-24 md:py-36" aria-label={t.routes.book}>
      <div className="shell">
        <BookingFlow title={t.bookSection.title} intro={t.bookSection.intro} />
      </div>
    </section>
  )
}
