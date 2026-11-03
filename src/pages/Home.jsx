import Hero from '../sections/home/Hero'
import Trainer from '../sections/home/Trainer'
import Services from '../sections/home/Services'
import Method from '../sections/home/Method'
import Locations from '../sections/home/Locations'
import Testimonials from '../sections/home/Testimonials'
import Engagements from '../sections/home/Engagements'
import Faq from '../sections/home/Faq'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export default function Home() {
  useDocumentTitle()
  return (
    <>
      <Hero />
      <Trainer />
      <Services />
      <Method />
      <Locations />
      <Testimonials />
      <Engagements />
      <Faq />
    </>
  )
}
