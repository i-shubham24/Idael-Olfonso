import { timeZone } from '../content/site'
import { currentLang } from './i18n'

const WEEKDAY_INDEX = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 }

/** Current day (0 = Monday) and minutes since midnight, in Idael's time zone. */
export function clubNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (t) => parts.find((p) => p.type === t)?.value
  const day = WEEKDAY_INDEX[get('weekday')] ?? 0
  const h = Number(get('hour'))
  const m = Number(get('minute'))
  return { day, minutes: h * 60 + m, label: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}` }
}

export function toMinutes(hhmm) {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

/** "06:00" -> "6:00", "18:30" -> "18:30" (Swiss 24 hour style). */
export function prettyTime(hhmm) {
  const [h, m] = hhmm.split(':').map(Number)
  return `${h}:${String(m).padStart(2, '0')}`
}

export function addMinutes(hhmm, mins) {
  const t = toMinutes(hhmm) + mins
  return `${String(Math.floor(t / 60) % 24).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`
}

const localeFor = (lang) => (lang === 'de' ? 'de-CH' : 'en-GB')

/** "Friday 30 October" or "Freitag, 30. Oktober", in the current language. */
export function formatDate(date, lang = currentLang()) {
  return new Intl.DateTimeFormat(localeFor(lang), { timeZone, weekday: 'long', day: 'numeric', month: 'long' }).format(
    date,
  )
}

/** "October 2026" or "Oktober 2026" for a calendar month. */
export function formatMonth({ y, m }, lang = currentLang()) {
  return new Intl.DateTimeFormat(localeFor(lang), { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(Date.UTC(y, m - 1, 1)),
  )
}

export function formatDateShort(date, lang = currentLang()) {
  return new Intl.DateTimeFormat(localeFor(lang), { timeZone, day: 'numeric', month: 'short' }).format(date)
}
