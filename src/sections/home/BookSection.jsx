import { useContent } from '../../lib/i18n'
import BookingFlow from '../../components/booking/BookingFlow'

/* The booking calendar, right on the home page. Every "book" button scrolls here. */
export default function BookSection() {
  const { t } = useContent()
  return (
    // The lighter tone fades in and out, so there is no hard edge against the sections around it.
    <section
      id="book"
      className="relative z-[5] bg-ink py-28 md:py-40"
      aria-label={t.routes.book}
    >
      <div className="shell">
        <BookingFlow title={t.bookSection.title} titleEm={t.bookSection.titleEm} intro={t.bookSection.intro} />
      </div>
    </section>
  )
}
