import { useSearchParams } from 'react-router'
import { useContent } from '../lib/i18n'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import BookingFlow from '../components/booking/BookingFlow'
import Faq from '../sections/home/Faq'

/* /book: the same booking flow as on the home page, plus the questions people ask. */
export default function Book() {
  const { t } = useContent()
  const [params] = useSearchParams()
  useDocumentTitle(t.routes.book)
  return (
    <div className="bg-onyx-2">
      <div className="shell pb-24 pt-32 md:pb-32 md:pt-40">
        <BookingFlow
          heading="h1"
          title={t.booking.pageTitle}
          intro={t.booking.pageIntro}
          initialType={params.get('type') ?? 'consultation'}
          showHomeLink
        />
      </div>
      <Faq />
    </div>
  )
}
