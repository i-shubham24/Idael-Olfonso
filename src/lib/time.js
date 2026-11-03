import { timeZone } from '../content/site'

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
export const DAYS_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

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

export function formatDate(date) {
  return new Intl.DateTimeFormat('en-GB', { timeZone, weekday: 'long', day: 'numeric', month: 'long' }).format(date)
}

export function formatDateShort(date) {
  return new Intl.DateTimeFormat('en-GB', { timeZone, day: 'numeric', month: 'short' }).format(date)
}
