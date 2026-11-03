import { availability, sessionTypes } from '../content/site'
import { clubDateParts, clubTimeToDate } from './ics'
import { addMinutes, toMinutes } from './time'

/*
  Booking engine for /book.

  Until Idael's live calendar is connected, availability is generated from
  the weekly windows in content/site.js, with some slots marked as taken so
  the calendar looks like a real week. To go live, set VITE_BOOKING_API to
  the booking backend (for example a serverless function in front of the
  Cal.com API): GET {api}/slots?type=&from=&to= and POST {api}/bookings.
*/
const API = import.meta.env.VITE_BOOKING_API

export const pad = (n) => String(n).padStart(2, '0')
export const dateKey = ({ y, m, d }) => `${y}-${pad(m)}-${pad(d)}`
export const parseKey = (key) => {
  const [y, m, d] = key.split('-').map(Number)
  return { y, m, d }
}

/** Monday = 0 for a calendar date. */
export const weekday = ({ y, m, d }) => (new Date(Date.UTC(y, m - 1, d)).getUTCDay() + 6) % 7
export const daysInMonth = (y, m) => new Date(Date.UTC(y, m, 0)).getUTCDate()
export const addDays = ({ y, m, d }, n) => {
  const t = new Date(Date.UTC(y, m - 1, d + n))
  return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() }
}

export function todayParts() {
  return clubDateParts(new Date())
}

export function typeById(id) {
  return sessionTypes.find((t) => t.id === id)
}

/** Small stable hash, so the demo calendar looks the same on every visit. */
function hash(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0) % 1000
}

/** Bookable start times for one session type on one date (demo availability). */
export function slotsOn(type, key, now = new Date()) {
  const parts = parseKey(key)
  const day = weekday(parts)
  const earliest = now.getTime() + availability.minNoticeHours * 3600000
  const out = []
  for (const w of availability.week.filter((x) => x.day === day)) {
    for (let t = toMinutes(w.from); t + type.duration <= toMinutes(w.to); t += availability.stepMinutes) {
      const time = addMinutes('00:00', t)
      const start = clubTimeToDate(parts, time)
      if (start.getTime() < earliest) continue
      // Demo only: roughly two in five slots are already taken.
      if (hash(`${key} ${time}`) < 400) continue
      out.push({ time, start: start.toISOString() })
    }
  }
  return out
}

/** Every bookable date in a range, with its slots. */
export async function getAvailability(typeId, fromKey, toKey) {
  const type = typeById(typeId)
  if (!type) return {}
  if (API) {
    const res = await fetch(`${API}/slots?type=${encodeURIComponent(typeId)}&from=${fromKey}&to=${toKey}`)
    if (!res.ok) throw new Error('Could not load availability')
    return res.json()
  }
  const out = {}
  let cur = parseKey(fromKey)
  const end = parseKey(toKey)
  while (dateKey(cur) <= dateKey(end)) {
    const key = dateKey(cur)
    // Demo only: about one weekday in seven is fully booked.
    if (hash(key) >= 140) {
      const slots = slotsOn(type, key)
      if (slots.length) out[key] = slots
    }
    cur = addDays(cur, 1)
  }
  // Feels like a real request.
  await new Promise((r) => setTimeout(r, 350))
  return out
}

/** Last date that can be booked. */
export function lastBookableKey() {
  return dateKey(addDays(todayParts(), availability.daysAhead))
}

export async function createBooking(payload) {
  if (API) {
    const res = await fetch(`${API}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.status === 409) return { ok: false, reason: 'taken' }
    if (!res.ok) return { ok: false, reason: 'error' }
    return { ok: true, ...(await res.json()) }
  }
  /*
    DEMO ONLY: nothing is sent anywhere. The request is accepted after a short
    pause so the full flow, confirmation and calendar file can be shown.
  */
  await new Promise((r) => setTimeout(r, 900))
  return { ok: true, demo: true }
}
