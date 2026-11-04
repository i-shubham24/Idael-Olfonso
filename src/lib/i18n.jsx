import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as site from '../content/site'
import de from '../content/copy/de'
import en from '../content/copy/en'

/*
  Two languages: German for the Swiss audience, English for everyone else.
  First visit: German when the browser asks for German, otherwise English.
  After that the visitor's own choice is remembered.
*/
const COPY = { de, en }
export const LANGS = ['de', 'en']
const KEY = 'ia-lang'

let current = 'de'
/** Language for code outside React (route transition labels, calendar files). */
export const currentLang = () => current

function initialLang() {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved && COPY[saved]) return saved
  } catch {
    /* storage blocked */
  }
  const asked = (navigator.languages?.length ? navigator.languages : [navigator.language || '']).join(',')
  return /(^|,)de\b/i.test(asked) ? 'de' : 'en'
}

/** Shared data merged with the words of one language. */
export function buildContent(lang) {
  const t = COPY[lang]
  return {
    lang,
    t,
    brand: { ...site.brand, ...t.brand },
    contact: site.contact,
    images: site.images,
    videos: site.videos,
    about: { ...site.about, ...t.aboutPage },
    pains: site.pains.map((p) => ({ ...p, ...t.pains.items[p.id] })),
    services: site.services.map((s) => {
      const words = t.services.items[s.slug]
      return {
        ...s,
        ...words,
        video: s.video ? site.videos[s.video] : null,
        session: s.session.map((minutes, i) => ({ minutes, name: words.session[i] })),
      }
    }),
    zones: site.locations.map((z) => ({ ...z, ...t.locations.zones[z.id] })),
    sessionTypes: site.sessionTypes.map((s) => ({
      ...s,
      ...t.booking.types[s.id],
      places: s.places.map((id) => ({ id, label: t.booking.places[id] })),
    })),
  }
}

const LocaleCtx = createContext({ lang: 'de', setLang: () => {}, content: buildContent('de') })

export function LocaleProvider({ children }) {
  const [lang, setLangState] = useState(initialLang)
  current = lang
  const content = useMemo(() => buildContent(lang), [lang])

  const setLang = (next) => {
    if (!COPY[next]) return
    try {
      localStorage.setItem(KEY, next)
    } catch {
      /* storage blocked */
    }
    setLangState(next)
  }

  useEffect(() => {
    document.documentElement.lang = lang
    document.querySelector('meta[name="description"]')?.setAttribute('content', COPY[lang].meta.description)
    // Text length changes move every scroll trigger; measure again once the new words are in.
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [lang])

  return <LocaleCtx.Provider value={{ lang, setLang, content }}>{children}</LocaleCtx.Provider>
}

export function useLocale() {
  const { lang, setLang } = useContext(LocaleCtx)
  return { lang, setLang }
}

/** Everything a component needs to render in the current language. */
export function useContent() {
  return useContext(LocaleCtx).content
}
