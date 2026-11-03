import { timeZone } from '../content/site'

/** Offset (ms) between UTC and the Swiss wall clock at a given instant. */
function tzOffset(utcMs) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(new Date(utcMs))
  const g = (t) => Number(parts.find((p) => p.type === t).value)
  const asUtc = Date.UTC(g('year'), g('month') - 1, g('day'), g('hour'), g('minute'), g('second'))
  return asUtc - utcMs
}

/** Swiss calendar date (y, m, d) for an instant. */
export function clubDateParts(date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date)
  const g = (t) => Number(parts.find((p) => p.type === t).value)
  return { y: g('year'), m: g('month'), d: g('day') }
}

/** UTC Date for a wall-clock time (hh:mm) on a Swiss calendar date. */
export function clubTimeToDate({ y, m, d }, hhmm) {
  const [h, mi] = hhmm.split(':').map(Number)
  const guess = Date.UTC(y, m - 1, d, h, mi)
  return new Date(guess - tzOffset(guess))
}

const stamp = (date) =>
  date
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '')
const esc = (s) =>
  String(s)
    .replace(/[\\;,]/g, (c) => `\\${c}`)
    .replace(/\n/g, '\\n')

export function buildIcs({ title, start, minutes, location, description }) {
  const end = new Date(start.getTime() + minutes * 60000)
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Idael Alfonso//Private training//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@idaelalfonso`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${esc(title)}`,
    `LOCATION:${esc(location)}`,
    `DESCRIPTION:${esc(description)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

export function downloadIcs(filename, content) {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
