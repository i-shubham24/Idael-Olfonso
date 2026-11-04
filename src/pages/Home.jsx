import { useLayoutEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from '../sections/home/Hero'
import PainPoints from '../sections/home/PainPoints'
import Trainer from '../sections/home/Trainer'
import Showreel from '../sections/home/Showreel'
import WhyIdael from '../sections/home/WhyIdael'
import BookSection from '../sections/home/BookSection'
import Services from '../sections/home/Services'
import Method from '../sections/home/Method'
import Locations from '../sections/home/Locations'
import Testimonials from '../sections/home/Testimonials'
import Faq from '../sections/home/Faq'
import { useDocumentTitle } from '../lib/useDocumentTitle'

/*
  The order follows the client's brief: the problems people have, who Idael
  is, why him, then the calendar. Everything after that is for people who
  want to know more before they book.
*/
export default function Home() {
  useDocumentTitle()

  useLayoutEffect(() => {
    // Once all child sections have mounted and registered their ScrollTriggers,
    // sort them strictly by DOM order and refresh so that:
    // Hero (prio 3) -> PainPoints (prio 2) -> Services (prio 1)
    // and all intermediate sections have their pin spacers and trigger start/end
    // calculated in strictly sequential order without overlapping.
    ScrollTrigger.sort()
    ScrollTrigger.refresh()

    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.sort()
      ScrollTrigger.refresh()
    })
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <>
      <Hero />
      <PainPoints />
      <Trainer />
      <Showreel />
      <WhyIdael />
      <BookSection />
      <Services />
      <Method />
      <Locations />
      <Testimonials />
      <Faq />
    </>
  )
}
