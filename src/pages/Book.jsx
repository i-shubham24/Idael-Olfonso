import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { CalendarPlus, CaretDown, CaretLeft, CaretRight, Check, WhatsappLogo } from '@phosphor-icons/react'
import { brand, contact, engagements, sessionTypes } from '../content/site'
import { DAYS_SHORT, addMinutes, formatDate, prettyTime, toMinutes } from '../lib/time'
import { buildIcs, downloadIcs } from '../lib/ics'
import {
  createBooking,
  dateKey,
  daysInMonth,
  getAvailability,
  lastBookableKey,
  parseKey,
  todayParts,
  typeById,
  weekday,
} from '../lib/booking'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { useLenis, scrollToTarget } from '../lib/scroll'
import Button from '../components/Button'

const ease = [0.16, 1, 0.3, 1]
const STEPS = ['Session', 'Date and time', 'About you']

function initialState(params) {
  let type = params.get('type')
  if (!sessionTypes.some((t) => t.id === type)) type = null
  const plan = engagements.find((e) => e.id === params.get('plan')) ?? null
  return { type, plan, step: type ? 1 : 0 }
}

/* small form parts */

function Field({ id, label, error, hint, children }) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="t-label text-stone">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-sm text-stone">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-sm text-[#e08a78]">
          {error}
        </p>
      )}
    </div>
  )
}

const inputCls = (error) =>
  `h-14 w-full rounded-[2px] px-4 text-ivory placeholder:text-stone/70 transition-colors ${
    error ? 'bg-[#2e1c18]' : 'bg-onyx-2 hover:bg-graphite focus:bg-graphite'
  }`

function OptionBlock({ id, name, value, checked, onChange, disabled, children, className = '' }) {
  return (
    <label
      className={`relative block cursor-pointer rounded-[2px] transition-[background-color,color] duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold ${
        disabled ? 'cursor-not-allowed opacity-30' : ''
      } ${checked ? 'bg-ivory text-ink' : 'bg-onyx-2 hover:bg-graphite'} ${className}`}
    >
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="sr-only"
      />
      {children}
    </label>
  )
}

/* steps */

function TypeStep({ value, onChange, onNext, plan }) {
  return (
    <fieldset>
      <legend className="t-h3 text-4xl md:text-5xl">Choose your session</legend>
      <p className="mt-4 text-ivory/70">
        New to Idael? Start with the consultation.
        {plan && <> You asked about {plan.name}; we will cover it on the call.</>}
      </p>
      <div className="mt-10 grid gap-1.5">
        {sessionTypes.map((t, i) => {
          const checked = value === t.id
          return (
            <OptionBlock
              key={t.id}
              name="type"
              value={t.id}
              checked={checked}
              onChange={() => onChange(t.id)}
              className="p-5 md:p-6"
            >
              <span className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                <span className="font-serif text-2xl md:text-3xl">{t.name}</span>
                {i === 0 && (
                  <span className={`t-label ${checked ? 'text-[#8a6d3f]' : 'text-gold'}`}>Start here</span>
                )}
                <span className={`t-label tabular ml-auto ${checked ? 'text-ink/60' : 'text-stone'}`}>
                  {t.duration} min · {t.format}
                </span>
              </span>
              <span className={`mt-2 block text-sm ${checked ? 'text-ink/70' : 'text-ivory/60'}`}>{t.note}</span>
            </OptionBlock>
          )
        })}
      </div>
      <div className="mt-10">
        <Button
          size="lg"
          onClick={onNext}
          disabled={!value}
          className="disabled:cursor-not-allowed disabled:opacity-40"
          magnetic={false}
        >
          Choose a time
        </Button>
      </div>
    </fieldset>
  )
}

const monthLabel = ({ y, m }) =>
  new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(Date.UTC(y, m - 1, 1)),
  )
const monthIndex = ({ y, m }) => y * 12 + (m - 1)
const fromIndex = (i) => ({ y: Math.floor(i / 12), m: (i % 12) + 1 })

function Calendar({ month, setMonth, data, loading, value, onChange, today, last }) {
  const lead = weekday({ ...month, d: 1 })
  const n = daysInMonth(month.y, month.m)
  const minI = monthIndex(today)
  const maxI = monthIndex(last)
  const curI = monthIndex(month)
  const todayKey = dateKey(today)
  const cells = [...Array(lead).fill(null), ...Array.from({ length: n }, (_, i) => i + 1)]

  return (
    <div className="rounded-[2px] bg-onyx-2 p-5 md:p-7">
      <div className="flex items-center justify-between">
        <p className="font-serif text-2xl md:text-3xl" aria-live="polite">
          {monthLabel(month)}
        </p>
        <div className="flex gap-1.5">
          {[
            [-1, 'Previous month', CaretLeft, curI <= minI],
            [1, 'Next month', CaretRight, curI >= maxI],
          ].map(([dir, label, Icon, disabled]) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              disabled={disabled}
              onClick={() => setMonth(fromIndex(curI + dir))}
              className="flex h-11 w-11 items-center justify-center rounded-[2px] bg-graphite transition-colors hover:bg-line disabled:cursor-not-allowed disabled:opacity-30"
            >
              <Icon size={16} aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6 grid grid-cols-7 gap-1 text-center" role="grid" aria-label={monthLabel(month)}>
        {DAYS_SHORT.map((d) => (
          <span key={d} className="t-label pb-2 text-[0.6rem] text-stone" role="columnheader">
            {d.slice(0, 2)}
          </span>
        ))}
        {cells.map((d, i) => {
          if (!d) return <span key={`e${i}`} />
          const key = dateKey({ ...month, d })
          const count = data[key]?.length ?? 0
          const selected = value === key
          const disabled = loading || count === 0
          return (
            <button
              key={key}
              type="button"
              disabled={disabled}
              onClick={() => onChange(key)}
              aria-pressed={selected}
              aria-label={`${formatDate(new Date(`${key}T12:00:00Z`))}${count ? `, ${count} times available` : ', unavailable'}`}
              className={`relative flex aspect-square items-center justify-center rounded-[2px] font-serif text-lg transition-[background-color,color] duration-300 md:text-xl ${
                selected
                  ? 'bg-ivory text-ink'
                  : disabled
                    ? 'cursor-not-allowed text-ivory/20'
                    : 'bg-graphite text-ivory hover:bg-line'
              }`}
            >
              <span className="tabular">{d}</span>
              {key === todayKey && (
                <svg width="7" height="6" viewBox="0 0 7 6" className="absolute bottom-[12%]" aria-hidden="true">
                  <path d="M0 0 L7 0 L3.5 6 Z" fill="var(--color-gold)" />
                </svg>
              )}
            </button>
          )
        })}
      </div>
      <p className="mt-5 flex items-center gap-2 text-sm text-stone">
        <svg width="7" height="6" viewBox="0 0 7 6" aria-hidden="true">
          <path d="M0 0 L7 0 L3.5 6 Z" fill="var(--color-gold)" />
        </svg>
        {loading ? 'Checking availability' : 'Marks today. Faded days are fully booked.'}
      </p>
    </div>
  )
}

const PARTS = [
  { label: 'Morning', until: 12 * 60 },
  { label: 'Afternoon', until: 17 * 60 },
  { label: 'Evening', until: 24 * 60 },
]

/*
  One simple dropdown for the start time, grouped into morning, afternoon and
  evening, drawn in the site's own colours (the browser's native list cannot be
  themed). Works with mouse, touch and keyboard: arrows, Home, End, Enter,
  Escape. All times are Swiss time.
*/
function TimeSelect({ slots, slot, setSlot, duration }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const [up, setUp] = useState(false)
  const root = useRef(null)
  const button = useRef(null)
  const list = useRef(null)

  const groups = PARTS.map((p, i) => ({
    label: p.label,
    items: slots.filter((s) => {
      const m = toMinutes(s.time)
      return m < p.until && m >= (i ? PARTS[i - 1].until : 0)
    }),
  })).filter((g) => g.items.length)
  const flat = groups.flatMap((g) => g.items)
  const selected = slot ? flat.findIndex((s) => s.start === slot.start) : -1

  // Close when clicking anywhere else.
  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (!root.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [open])

  // On open, start from the chosen time and move focus into the list.
  useEffect(() => {
    if (!open) return
    setActive(selected >= 0 ? selected : 0)
    requestAnimationFrame(() => list.current?.focus({ preventScroll: true }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // Keep the highlighted time inside the visible part of the list.
  useEffect(() => {
    const l = list.current
    const el = l?.querySelector(`[data-i="${active}"]`)
    if (!el) return
    if (el.offsetTop < l.scrollTop) l.scrollTop = el.offsetTop - 36
    else if (el.offsetTop + el.offsetHeight > l.scrollTop + l.clientHeight)
      l.scrollTop = el.offsetTop + el.offsetHeight - l.clientHeight + 8
  }, [active, open])

  // Open upward when there is not enough room below the field.
  const toggle = (next) => {
    if (next) {
      const r = button.current.getBoundingClientRect()
      const below = window.innerHeight - r.bottom
      setUp(below < 360 && r.top > below)
    }
    setOpen(next)
  }

  const choose = (i) => {
    setSlot(flat[i])
    setOpen(false)
    button.current?.focus()
  }

  const onButtonKey = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      toggle(true)
    }
  }

  const onListKey = (e) => {
    const last = flat.length - 1
    if (e.key === 'ArrowDown') setActive((a) => Math.min(last, a + 1))
    else if (e.key === 'ArrowUp') setActive((a) => Math.max(0, a - 1))
    else if (e.key === 'Home') setActive(0)
    else if (e.key === 'End') setActive(last)
    else if (e.key === 'Enter' || e.key === ' ') active >= 0 && choose(active)
    else if (e.key === 'Escape') {
      setOpen(false)
      button.current?.focus()
    } else if (e.key === 'Tab') setOpen(false)
    else return
    if (e.key !== 'Tab') e.preventDefault()
  }

  return (
    <div ref={root} className="relative mt-4">
      <span id="time-label" className="t-label text-stone">
        Start time
      </span>
      <div className="relative mt-2">
        <button
          ref={button}
          id="time"
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby="time-label time"
          onClick={() => toggle(!open)}
          onKeyDown={onButtonKey}
          className={`flex h-16 w-full items-center justify-between gap-4 rounded-[2px] px-5 text-left transition-colors duration-300 ${
            open ? 'bg-graphite' : 'bg-onyx-2 hover:bg-graphite'
          }`}
        >
          <span className={`tabular font-serif text-2xl ${slot ? 'text-ivory' : 'text-stone'}`}>
            {slot ? prettyTime(slot.time) : 'Choose a time'}
          </span>
          <CaretDown
            size={18}
            className={`shrink-0 text-gold transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: up ? 8 : -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: up ? 8 : -8, transition: { duration: 0.15 } }}
              transition={{ duration: 0.3, ease }}
              className={`absolute inset-x-0 z-30 overflow-hidden rounded-[2px] bg-graphite p-2 shadow-[0_28px_60px_rgb(0_0_0/0.6)] ${
                up ? 'bottom-[calc(100%+6px)]' : 'top-[calc(100%+6px)]'
              }`}
            >
              <div
                ref={list}
                role="listbox"
                tabIndex={-1}
                aria-labelledby="time-label"
                aria-activedescendant={active >= 0 ? `time-opt-${active}` : undefined}
                onKeyDown={onListKey}
                data-lenis-prevent
                className="time-list relative max-h-[320px] overflow-y-auto pb-8 outline-none"
              >
                {groups.map((g) => (
                  <div key={g.label} role="group" aria-labelledby={`time-group-${g.label}`}>
                    <p id={`time-group-${g.label}`} className="t-label px-3 pb-1.5 pt-3 text-gold">
                      {g.label}
                    </p>
                    {g.items.map((s) => {
                      const i = flat.indexOf(s)
                      const isSelected = i === selected
                      const isActive = i === active
                      return (
                        <div
                          key={s.start}
                          id={`time-opt-${i}`}
                          data-i={i}
                          role="option"
                          aria-selected={isSelected}
                          onPointerEnter={() => setActive(i)}
                          onClick={() => choose(i)}
                          className={`flex cursor-pointer items-baseline justify-between gap-4 rounded-[2px] px-3 py-2.5 transition-colors duration-200 ${
                            isSelected ? 'bg-gold text-ink' : isActive ? 'bg-line text-gold-2' : 'text-ivory'
                          }`}
                        >
                          <span className="tabular font-serif text-xl">{prettyTime(s.time)}</span>
                          <span className={`t-label tabular ${isSelected ? 'text-ink/60' : 'text-stone'}`}>
                            until {prettyTime(addMinutes(s.time, duration))}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
              {/* Soft fade at the bottom hints that the list scrolls. */}
              <div
                className="pointer-events-none absolute inset-x-2 bottom-2 h-10 bg-[linear-gradient(to_top,var(--color-graphite),transparent)]"
                aria-hidden="true"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="mt-3 text-sm text-stone">
        {slots.length} {slots.length === 1 ? 'time' : 'times'} free on this day
      </p>
      {slot && (
        <p className="mt-6 rounded-[2px] bg-onyx-2 px-5 py-4 text-ivory/85">
          <span className="tabular font-serif text-2xl text-ivory">
            {prettyTime(slot.time)} to {prettyTime(addMinutes(slot.time, duration))}
          </span>
          <span className="mt-1 block text-sm text-stone">Swiss time</span>
        </p>
      )}
    </div>
  )
}

function TimeStep({ type, date, setDate, slot, setSlot, onBack, onNext, notice }) {
  const t = typeById(type)
  const today = useMemo(() => todayParts(), [])
  const last = useMemo(() => parseKey(lastBookableKey()), [])
  const [month, setMonth] = useState(() => (date ? parseKey(date) : today))
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let live = true
    setLoading(true)
    setError(false)
    const startI = monthIndex(month) === monthIndex(today) ? today : { ...month, d: 1 }
    const endD = { ...month, d: daysInMonth(month.y, month.m) }
    const end = dateKey(endD) > dateKey(last) ? last : endD
    getAvailability(type, dateKey(startI), dateKey(end))
      .then((res) => {
        if (!live) return
        setData(res)
        setLoading(false)
        // Open the first free day of the month unless a day in it is already chosen.
        const keys = Object.keys(res).sort()
        if (!date || !res[date]) {
          setDate(keys[0] ?? null)
          setSlot(null)
        }
      })
      .catch(() => {
        if (!live) return
        setError(true)
        setLoading(false)
      })
    return () => {
      live = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, month.y, month.m])

  const slots = (date && data[date]) || []

  return (
    <fieldset>
      <legend className="t-h3 text-4xl md:text-5xl">Choose a date and time</legend>
      <p className="mt-4 text-ivory/70">
        {t?.name}, {t?.duration} minutes. All times are Swiss time.
      </p>
      {notice && <p className="mt-4 rounded-[2px] bg-[#3a2620] px-5 py-4 text-ivory">{notice}</p>}
      <div className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <Calendar
          month={month}
          setMonth={setMonth}
          data={data}
          loading={loading}
          value={date}
          onChange={(k) => {
            setDate(k)
            setSlot(null)
          }}
          today={today}
          last={last}
        />
        <div>
          <p className="t-label text-stone">
            {date ? formatDate(new Date(`${date}T12:00:00Z`)) : 'Choose a day'}
          </p>
          {error && (
            <p className="mt-4 text-ivory/80">
              Availability could not be loaded. Please try again, or message Idael on WhatsApp.
            </p>
          )}
          {!loading && !error && Object.keys(data).length === 0 && (
            <p className="mt-4 text-ivory/80">No times left this month. Try the next month, or message Idael directly.</p>
          )}
          {slots.length > 0 && <TimeSelect slots={slots} slot={slot} setSlot={setSlot} duration={t?.duration ?? 60} />}
        </div>
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button size="lg" variant="ghost" onClick={onBack} magnetic={false}>
          Back
        </Button>
        <Button
          size="lg"
          onClick={onNext}
          disabled={!slot}
          className="disabled:cursor-not-allowed disabled:opacity-40"
          magnetic={false}
        >
          Add your details
        </Button>
      </div>
    </fieldset>
  )
}

function validate(f, t) {
  const e = {}
  if (f.name.trim().length < 2) e.name = 'Enter your full name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Enter an email address like name@example.com.'
  if (f.phone.replace(/\D/g, '').length < 7) e.phone = 'Enter a phone number with the country code, like +41.'
  if (t?.places.length > 1 && !f.place) e.place = 'Choose where you would like to meet.'
  if (!f.consent) e.consent = 'Tick this so Idael can confirm your session.'
  return e
}

function DetailsStep({ type, form, setForm, errors, onBack, onSubmit, submitting }) {
  const t = typeById(type)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })
  const described = (k, hint) => (errors[k] ? `${k}-error` : hint ? `${k}-hint` : undefined)
  return (
    <form noValidate onSubmit={onSubmit}>
      <h2 className="t-h3 text-4xl md:text-5xl">About you</h2>
      <p className="mt-4 text-ivory/70">Only Idael sees these details.</p>
      <div className="mt-10 grid gap-7">
        <Field id="name" label="Full name" error={errors.name}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={set('name')}
            aria-invalid={!!errors.name}
            aria-describedby={described('name')}
            className={inputCls(errors.name)}
          />
        </Field>
        <div className="grid gap-7 md:grid-cols-2">
          <Field id="email" label="Email" error={errors.email}>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={set('email')}
              aria-invalid={!!errors.email}
              aria-describedby={described('email')}
              className={inputCls(errors.email)}
            />
          </Field>
          <Field id="phone" label="Phone" error={errors.phone} hint="For a reminder the day before.">
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+41"
              value={form.phone}
              onChange={set('phone')}
              aria-invalid={!!errors.phone}
              aria-describedby={described('phone', true)}
              className={inputCls(errors.phone)}
            />
          </Field>
        </div>
        {t?.places.length > 1 && (
          <fieldset aria-describedby={errors.place ? 'place-error' : undefined}>
            <legend className="t-label mb-3 text-stone">Where would you like to meet?</legend>
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {t.places.map((p, i) => (
                <OptionBlock
                  key={p}
                  id={`place-${i}`}
                  name="place"
                  value={p}
                  checked={form.place === p}
                  onChange={() => setForm({ ...form, place: p })}
                  className="flex h-14 items-center px-5"
                >
                  {p}
                </OptionBlock>
              ))}
            </div>
            {errors.place && (
              <p id="place-error" className="mt-2 text-sm text-[#e08a78]">
                {errors.place}
              </p>
            )}
          </fieldset>
        )}
        <Field id="goals" label="What would you like to achieve? (optional)" hint="Goals, injuries, or anything Idael should know.">
          <textarea
            id="goals"
            name="goals"
            rows={3}
            value={form.goals}
            onChange={set('goals')}
            aria-describedby="goals-hint"
            className={`${inputCls(false)} h-auto resize-none py-3`}
          />
        </Field>
        <Field id="referral" label="Referred by (optional)">
          <input id="referral" name="referral" value={form.referral} onChange={set('referral')} className={inputCls(false)} />
        </Field>
        <div>
          <label className="flex cursor-pointer items-start gap-3">
            <input
              id="consent"
              type="checkbox"
              checked={form.consent}
              onChange={set('consent')}
              className="peer sr-only"
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? 'consent-error' : undefined}
            />
            <span
              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-[2px] transition-colors peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold ${form.consent ? 'bg-ivory text-ink' : errors.consent ? 'bg-[#4a2a22]' : 'bg-graphite'}`}
              aria-hidden="true"
            >
              {form.consent && <Check size={14} weight="bold" />}
            </span>
            <span className="text-ivory/80">Idael may contact me about this session by email, phone or WhatsApp.</span>
          </label>
          {errors.consent && (
            <p id="consent-error" className="mt-2 text-sm text-[#e08a78]">
              {errors.consent}
            </p>
          )}
        </div>
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button size="lg" variant="ghost" onClick={onBack} magnetic={false}>
          Back
        </Button>
        <Button size="lg" type="submit" disabled={submitting} magnetic={false} aria-live="polite">
          {submitting ? 'Sending your request' : t?.confirm ? 'Request this time' : 'Confirm my consultation'}
        </Button>
      </div>
    </form>
  )
}

function Done({ type, slot, form }) {
  const t = typeById(type)
  const start = new Date(slot.start)
  const where = form.place || t.places[0]
  const addToCalendar = () =>
    downloadIcs(
      `${t.id}-${brand.short.toLowerCase()}.ics`,
      buildIcs({
        title: `${t.name} with ${brand.name}`,
        start,
        minutes: t.duration,
        location: where,
        description: t.confirm ? 'Requested. Idael will confirm personally.' : 'Confirmed.',
      }),
    )
  return (
    <div>
      <p className="t-label text-gold">{t.confirm ? 'Request received' : 'Confirmed'}</p>
      <h2 className="t-h2 mt-6 text-[clamp(3rem,7vw,6.5rem)]">
        Thank you, <em className="text-gold-2">{form.name.split(' ')[0]}.</em>
      </h2>
      <p className="t-lead mt-6 max-w-[42ch] text-ivory/75">
        {t.confirm
          ? 'Idael will confirm the time himself, usually within a few hours. You will get an email as soon as he has.'
          : 'Your consultation is booked. You will get an email with the details and a reminder the day before.'}
      </p>
      <dl className="mt-12 grid gap-1.5 sm:grid-cols-2">
        {[
          ['Session', `${t.name}, ${t.duration} minutes`],
          ['When', `${formatDate(start)}, ${prettyTime(slot.time)} Swiss time`],
          ['Where', where],
          ['Status', t.confirm ? 'Awaiting confirmation' : 'Confirmed'],
        ].map(([k, v]) => (
          <div key={k} className="rounded-[2px] bg-onyx-2 px-5 py-4">
            <dt className="t-label text-stone">{k}</dt>
            <dd className="mt-2 font-serif text-2xl">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-12 flex flex-wrap gap-3">
        <Button size="lg" onClick={addToCalendar} magnetic={false}>
          <CalendarPlus size={18} aria-hidden="true" /> Add to calendar
        </Button>
        <Button size="lg" variant="ghost" to="/" magnetic={false}>
          Back to the home page
        </Button>
      </div>
    </div>
  )
}

/* page */

export default function Book() {
  useDocumentTitle('Book')
  const [params] = useSearchParams()
  const init = useMemo(() => initialState(params), []) // eslint-disable-line react-hooks/exhaustive-deps
  const [step, setStep] = useState(init.step)
  const [dir, setDir] = useState(1)
  const [type, setType] = useState(init.type)
  const [date, setDate] = useState(null)
  const [slot, setSlot] = useState(null)
  const [notice, setNotice] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '', place: '', goals: '', referral: '', consent: false })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const top = useRef(null)
  const lenis = useLenis()

  const t = typeById(type)

  const go = (n) => {
    setDir(n > step ? 1 : -1)
    setStep(n)
    requestAnimationFrame(() => scrollToTarget(lenis, top.current, { offset: -120 }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(form, t)
    setErrors(errs)
    const first = Object.keys(errs)[0]
    if (first) {
      // Move focus to the first field that needs fixing.
      const target = { place: 'place-0' }[first] ?? first
      document.getElementById(target)?.focus()
      return
    }
    setSubmitting(true)
    const result = await createBooking({ type, date, time: slot.time, start: slot.start, ...form })
    setSubmitting(false)
    if (!result.ok) {
      setNotice(
        result.reason === 'taken'
          ? 'That time was just taken. Please choose another one.'
          : 'Something went wrong sending your request. Please try again, or message Idael on WhatsApp.',
      )
      setSlot(null)
      go(1)
      return
    }
    setDone(true)
    requestAnimationFrame(() => scrollToTarget(lenis, top.current, { offset: -120 }))
  }

  const waText = encodeURIComponent(
    `Hello Idael, I would like to book${t ? ` a ${t.name.toLowerCase()}` : ' a session'}${slot ? ` on ${formatDate(new Date(slot.start))} at ${prettyTime(slot.time)}` : ''}.`,
  )

  return (
    <div className="shell pb-28 pt-32 md:pb-40 md:pt-44">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <h1 className="t-h2 text-[clamp(3.25rem,6vw,6rem)]">
              Book a <em className="text-gold-2">session</em>
            </h1>
            <p className="t-lead mt-6 max-w-[34ch] text-ivory/70">
              Pick a session and a time, then add your details. It takes about two minutes.
            </p>

            {!done && (
              <ol className="mt-12 grid gap-1" aria-label="Booking progress">
                {STEPS.map((label, i) => {
                  const state = i < step ? 'done' : i === step ? 'current' : 'next'
                  const canGo = i < step
                  return (
                    <li key={label}>
                      <button
                        type="button"
                        disabled={!canGo}
                        onClick={() => canGo && go(i)}
                        aria-current={state === 'current' ? 'step' : undefined}
                        className={`flex w-full items-center gap-4 rounded-[2px] px-4 py-3.5 text-left transition-colors ${
                          state === 'current'
                            ? 'bg-graphite text-ivory'
                            : state === 'next'
                              ? 'bg-onyx-2 text-ivory/35'
                              : 'bg-onyx-2 text-ivory'
                        } ${canGo ? 'hover:text-gold-2' : ''}`}
                      >
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-[2px] text-[0.65rem] ${
                            state === 'current' ? 'bg-gold text-ink' : state === 'done' ? 'bg-line text-gold' : 'bg-graphite'
                          }`}
                        >
                          {state === 'done' ? <Check size={12} aria-hidden="true" /> : i + 1}
                        </span>
                        <span className="t-label">{label}</span>
                      </button>
                    </li>
                  )
                })}
              </ol>
            )}

            {(t || slot) && !done && (
              <div className="mt-6 hidden rounded-[2px] bg-onyx-2 p-5 lg:block">
                {t && (
                  <p className="font-serif text-2xl">
                    {t.name} <span className="t-label tabular ml-2 text-stone">{t.duration} min</span>
                  </p>
                )}
                {slot && (
                  <p className="mt-2 text-sm text-ivory/70">
                    {formatDate(new Date(slot.start))}, {prettyTime(slot.time)} Swiss time
                  </p>
                )}
              </div>
            )}

            <a
              href={`https://wa.me/${contact.whatsapp}?text=${waText}`}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center gap-3 text-ivory/70 transition-colors hover:text-ivory"
            >
              <WhatsappLogo size={20} aria-hidden="true" /> Prefer to speak directly? Message Idael
            </a>
          </div>
        </aside>

        <div ref={top} className="min-w-0 lg:col-span-7 lg:col-start-6">
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.div
              key={done ? 'done' : step}
              custom={dir}
              variants={{
                enter: (d) => ({ opacity: 0, x: d * 40 }),
                center: { opacity: 1, x: 0 },
                exit: (d) => ({ opacity: 0, x: d * -40 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease }}
            >
              {done && t && slot ? (
                <Done type={type} slot={slot} form={form} />
              ) : step === 0 ? (
                <TypeStep
                  value={type}
                  plan={init.plan}
                  onChange={(v) => {
                    setType(v)
                    setDate(null)
                    setSlot(null)
                    setForm((f) => ({ ...f, place: '' }))
                  }}
                  onNext={() => go(1)}
                />
              ) : step === 1 ? (
                <TimeStep
                  type={type}
                  date={date}
                  setDate={setDate}
                  slot={slot}
                  setSlot={(s) => {
                    setSlot(s)
                    setNotice('')
                  }}
                  notice={notice}
                  onBack={() => go(0)}
                  onNext={() => go(2)}
                />
              ) : (
                <DetailsStep
                  type={type}
                  form={form}
                  setForm={setForm}
                  errors={errors}
                  onBack={() => go(1)}
                  onSubmit={onSubmit}
                  submitting={submitting}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
