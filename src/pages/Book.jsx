import { useSearchParams } from 'react-router'
import { useContent } from '../lib/i18n'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import BookingFlow from '../components/booking/BookingFlow'

/* /book: the same booking flow as on the home page, for direct links. */
export default function Book() {
  const { t } = useContent()
  const [params] = useSearchParams()
  useDocumentTitle(t.routes.book)
  return (
    <div className="shell pb-28 pt-32 md:pb-40 md:pt-44">
      <BookingFlow
        heading="h1"
        title={t.booking.pageTitle}
        titleEm={t.booking.pageTitleEm}
        intro={t.booking.pageIntro}
        initialType={params.get('type') ?? 'consultation'}
        showHomeLink
      />
    </div>
  )
}
