import { useLayoutEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocale } from '../lib/i18n'
import Hero from '../sections/home/Hero'
import Pains from '../sections/home/Pains'
import Meet from '../sections/home/Meet'
import Why from '../sections/home/Why'
import BookSection from '../sections/home/BookSection'
import Training from '../sections/home/Training'
import Method from '../sections/home/Method'
import Clients from '../sections/home/Clients'
import Places from '../sections/home/Places'
import Gallery from '../sections/home/Gallery'
import Faq from '../sections/home/Faq'
import { useDocumentTitle } from '../lib/useDocumentTitle'

/*
  The story the client asked for: the problems people have, who Idael is,
  why him, then the calendar. Everything after the calendar is for people
  who want to know more before they book.
*/
export default function Home() {
  useDocumentTitle()
  const { lang } = useLocale()

  useLayoutEffect(() => {
    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.sort()
      ScrollTrigger.refresh()
    })
    return () => cancelAnimationFrame(rafId)
  }, [lang])

  return (
    <>
      {/* The hero holds still while the next section slides up over it like a card. */}
      <div className="relative">
        <div className="sticky top-0 z-0">
          <Hero />
        </div>
        <div className="relative z-10">
          <Pains />
        </div>
      </div>
      <Meet />
      <Why />
      <BookSection />
      <Training />
      <Method />
      <Clients />
      <Places />
      <Gallery />
      <Faq />
    </>
  )
}
