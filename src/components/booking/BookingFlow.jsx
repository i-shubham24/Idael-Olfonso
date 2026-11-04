import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CalendarPlus, CaretDown, CaretLeft, CaretRight, Check, WhatsappLogo } from '@phosphor-icons/react'
import { addMinutes, formatDate, formatMonth, prettyTime, toMinutes } from '../../lib/time'
import { buildIcs, downloadIcs } from '../../lib/ics'
import {
  createBooking,
  dateKey,
  daysInMonth,
  getAvailability,
  lastBookableKey,
  parseKey,
  todayParts,
  weekday,
} from '../../lib/booking'
import { useContent } from '../../lib/i18n'
import { useLenis, scrollToTarget } from '../../lib/scroll'
import { useReducedMotion } from '../../lib/media'
import Button from '../Button'
import Img from '../Img'
import Reveal from '../Reveal'

/*
  The booking flow, used on the home page (#book) and on /book.
  Three steps: appointment type, date and time, details. Only first
  appointments are booked here and nothing is paid online; everything
  else Idael agrees with the client in person.
*/

const ease = [0.16, 1, 0.3, 1]

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

const Index = () => (
  <svg width="7" height="6" viewBox="0 0 7 6" aria-hidden="true">
    <path d="M0 0 L7 0 L3.5 6 Z" fill="var(--color-gold)" />
  </svg>
)

/* step 1: appointment type */

function TypeStep({ value, onChange, onNext }) {
  const { t, sessionTypes } = useContent()
  const b = t.booking
  return (
    <fieldset>
      <legend className="t-h3 text-4xl md:text-5xl">{b.typeTitle}</legend>
      <p className="mt-4 text-ivory/70">{b.typeHint}</p>
      <div className="mt-10 grid gap-1.5">
        {sessionTypes.map((type, i) => {
          const checked = value === type.id
          return (
            <OptionBlock
              key={type.id}
              name="type"
              value={type.id}
              checked={checked}
              onChange={() => onChange(type.id)}
              className="p-5 md:p-6"
            >
              <span className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                <span className="font-serif text-2xl md:text-3xl">{type.name}</span>
                {i === 0 && <span className={`t-label ${checked ? 'text-[#6e5631]' : 'text-gold'}`}>{b.startHere}</span>}
                <span className={`t-label tabular ml-auto ${checked ? 'text-ink/60' : 'text-stone'}`}>
                  {type.duration} {b.min} · {type.format}
                </span>
              </span>
              <span className={`mt-2 block text-sm ${checked ? 'text-ink/70' : 'text-ivory/60'}`}>{type.note}</span>
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
          {b.chooseTime}
        </Button>
      </div>
    </fieldset>
  )
}

/* step 2: calendar and time */

const monthIndex = ({ y, m }) => y * 12 + (m - 1)
const fromIndex = (i) => ({ y: Math.floor(i / 12), m: (i % 12) + 1 })

function Calendar({ month, setMonth, data, loading, value, onChange, today, last }) {
  const { t } = useContent()
  const b = t.booking
  const lead = weekday({ ...month, d: 1 })
  const n = daysInMonth(month.y, month.m)
  const minI = monthIndex(today)
  const maxI = monthIndex(last)
  const curI = monthIndex(month)
  const todayKey = dateKey(today)
  const cells = [...Array(lead).fill(null), ...Array.from({ length: n }, (_, i) => i + 1)]
  const label = formatMonth(month)

  return (
    <div className="rounded-[2px] bg-onyx-2 p-5 md:p-7">
      <div className="flex items-center justify-between">
        <p className="font-serif text-2xl md:text-3xl" aria-live="polite">
          {label}
        </p>
        <div className="flex gap-1.5">
          {[
            [-1, b.prevMonth, CaretLeft, curI <= minI],
            [1, b.nextMonth, CaretRight, curI >= maxI],
          ].map(([dir, aria, Icon, disabled]) => (
            <button
              key={aria}
              type="button"
              aria-label={aria}
              disabled={disabled}
              onClick={() => setMonth(fromIndex(curI + dir))}
              className="flex h-11 w-11 items-center justify-center rounded-[2px] bg-graphite transition-colors hover:bg-line disabled:cursor-not-allowed disabled:opacity-30"
            >
              <Icon size={16} aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6 grid grid-cols-7 gap-1 text-center" role="grid" aria-label={label}>
        {b.weekdays.map((d) => (
          <span key={d} className="t-label pb-2 text-[0.6rem] text-stone" role="columnheader">
            {d}
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
              aria-label={`${formatDate(new Date(`${key}T12:00:00Z`))}, ${count ? b.timesAvailable(count) : b.unavailable}`}
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
                <span className="absolute bottom-[12%]">
                  <Index />
                </span>
              )}
            </button>
          )
        })}
      </div>
      <p className="mt-5 flex items-center gap-2 text-sm text-stone">
        <Index />
        {loading ? b.checking : b.legend}
      </p>
    </div>
  )
}

const PART_ENDS = [12 * 60, 17 * 60, 24 * 60]

/*
  One simple dropdown for the start time, grouped into morning, afternoon and
  evening, drawn in the site's own colours (the browser's native list cannot be
  themed). Works with mouse, touch and keyboard: arrows, Home, End, Enter,
  Escape. All times are Swiss time.
*/
function TimeSelect({ slots, slot, setSlot, duration }) {
  const { t } = useContent()
  const b = t.booking
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const [up, setUp] = useState(false)
  const root = useRef(null)
  const button = useRef(null)
  const list = useRef(null)

  const groups = b.parts
    .map((label, i) => ({
      label,
      items: slots.filter((s) => {
        const m = toMinutes(s.time)
        return m < PART_ENDS[i] && m >= (i ? PART_ENDS[i - 1] : 0)
      }),
    }))
    .filter((g) => g.items.length)
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
    const lastI = flat.length - 1
    if (e.key === 'ArrowDown') setActive((a) => Math.min(lastI, a + 1))
    else if (e.key === 'ArrowUp') setActive((a) => Math.max(0, a - 1))
    else if (e.key === 'Home') setActive(0)
    else if (e.key === 'End') setActive(lastI)
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
        {b.startTime}
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
            {slot ? prettyTime(slot.time) : b.chooseTime}
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
                {groups.map((g, gi) => (
                  <div key={g.label} role="group" aria-labelledby={`time-group-${gi}`}>
                    <p id={`time-group-${gi}`} className="t-label px-3 pb-1.5 pt-3 text-gold">
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
                            {b.until} {prettyTime(addMinutes(s.time, duration))}
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

      <p className="mt-3 text-sm text-stone">{b.timesFree(slots.length)}</p>
      {slot && (
        <p className="mt-6 rounded-[2px] bg-onyx-2 px-5 py-4 text-ivory/85">
          <span className="tabular font-serif text-2xl text-ivory">
            {prettyTime(slot.time)} {b.until} {prettyTime(addMinutes(slot.time, duration))}
          </span>
          <span className="mt-1 block text-sm text-stone">{b.swissTime}</span>
        </p>
      )}
    </div>
  )
}

function TimeStep({ type, date, setDate, slot, setSlot, onBack, onNext, notice }) {
  const { t } = useContent()
  const b = t.booking
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
    getAvailability(type.id, dateKey(startI), dateKey(end))
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
  }, [type.id, month.y, month.m])

  const slots = (date && data[date]) || []

  return (
    <fieldset>
      <legend className="t-h3 text-4xl md:text-5xl">{b.timeTitle}</legend>
      <p className="mt-4 text-ivory/70">{b.timeIntro(type.name, type.duration)}</p>
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
          <p className="t-label text-stone">{date ? formatDate(new Date(`${date}T12:00:00Z`)) : b.chooseDay}</p>
          {error && <p className="mt-4 text-ivory/80">{b.loadError}</p>}
          {!loading && !error && Object.keys(data).length === 0 && (
            <p className="mt-4 text-ivory/80">{b.noneThisMonth}</p>
          )}
          {slots.length > 0 && <TimeSelect slots={slots} slot={slot} setSlot={setSlot} duration={type.duration} />}
        </div>
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button size="lg" variant="ghost" onClick={onBack} magnetic={false}>
          {b.back}
        </Button>
        <Button
          size="lg"
          onClick={onNext}
          disabled={!slot}
          className="disabled:cursor-not-allowed disabled:opacity-40"
          magnetic={false}
        >
          {b.addDetails}
        </Button>
      </div>
    </fieldset>
  )
}

/* step 3: details */

function validate(f, type, errors) {
  const e = {}
  if (f.name.trim().length < 2) e.name = errors.name
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = errors.email
  if (f.phone.replace(/\D/g, '').length < 7) e.phone = errors.phone
  if (type.places.length > 1 && !f.place) e.place = errors.place
  if (!f.consent) e.consent = errors.consent
  return e
}

function DetailsStep({ type, form, setForm, errors, onBack, onSubmit, submitting }) {
  const { t } = useContent()
  const b = t.booking
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })
  const described = (k, hint) => (errors[k] ? `${k}-error` : hint ? `${k}-hint` : undefined)
  return (
    <form noValidate onSubmit={onSubmit}>
      <h3 className="t-h3 text-4xl md:text-5xl">{b.detailsTitle}</h3>
      <p className="mt-4 text-ivory/70">{b.detailsNote}</p>
      <div className="mt-10 grid gap-7">
        <Field id="name" label={b.name} error={errors.name}>
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
          <Field id="email" label={b.email} error={errors.email}>
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
          <Field id="phone" label={b.phone} error={errors.phone} hint={b.phoneHint}>
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
        {type.places.length > 1 && (
          <fieldset aria-describedby={errors.place ? 'place-error' : undefined}>
            <legend className="t-label mb-3 text-stone">{b.where}</legend>
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {type.places.map((p, i) => (
                <OptionBlock
                  key={p.id}
                  id={`place-${i}`}
                  name="place"
                  value={p.id}
                  checked={form.place === p.id}
                  onChange={() => setForm({ ...form, place: p.id })}
                  className="flex h-14 items-center px-5"
                >
                  {p.label}
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
        <Field id="goals" label={b.goals} hint={b.goalsHint}>
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
        <Field id="referral" label={b.referral}>
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
            <span className="text-ivory/80">{b.consent}</span>
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
          {b.back}
        </Button>
        <Button size="lg" type="submit" disabled={submitting} magnetic={false} aria-live="polite">
          {submitting ? b.sending : type.confirm ? b.request : b.confirm}
        </Button>
      </div>
    </form>
  )
}

/* done */

/*
  The booking is in: a small bezel draws itself, its minute marks light up
  one by one and a check settles in the middle.
*/
const DIAL_TICKS = Array.from({ length: 24 }, (_, i) => i)

function ConfirmDial() {
  const reduced = useReducedMotion()
  const draw = (delay, duration = 1.2) =>
    reduced ? { initial: false } : { initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration, ease, delay } }
  return (
    <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90 md:h-28 md:w-28" aria-hidden="true">
      <motion.circle cx="50" cy="50" r="46" fill="none" stroke="var(--color-gold)" strokeWidth="1.2" {...draw(0.1, 1.4)} />
      {DIAL_TICKS.map((i) => {
        const a = (i / 24) * Math.PI * 2
        const major = i % 6 === 0
        const r1 = major ? 36 : 39
        return (
          <motion.line
            key={i}
            x1={50 + Math.cos(a) * r1}
            y1={50 + Math.sin(a) * r1}
            x2={50 + Math.cos(a) * 42}
            y2={50 + Math.sin(a) * 42}
            stroke="var(--color-ivory)"
            strokeOpacity={major ? 0.9 : 0.4}
            strokeWidth="1"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 + i * 0.035 }}
          />
        )
      })}
      <g transform="rotate(90 50 50)">
        <motion.path
          d="M35 51 L46 61 L66 40"
          fill="none"
          stroke="var(--color-gold-2)"
          strokeWidth="3"
          strokeLinecap="square"
          {...draw(1.2, 0.6)}
        />
      </g>
    </svg>
  )
}

function Done({ type, slot, form, onHome }) {
  const { t, brand } = useContent()
  const b = t.booking
  const start = new Date(slot.start)
  const where = type.places.find((p) => p.id === form.place)?.label ?? type.places[0].label
  const addToCalendar = () =>
    downloadIcs(
      `${type.id}-${brand.short.toLowerCase()}.ics`,
      buildIcs({
        title: b.icsTitle(type.name),
        start,
        minutes: type.duration,
        location: where,
        description: type.confirm ? b.icsRequested : b.icsConfirmed,
      }),
    )
  return (
    <div>
      <ConfirmDial />
      <p className="t-label mt-8 text-gold">{type.confirm ? b.received : b.confirmed}</p>
      <h3 className="t-h2 mt-6 text-[clamp(3rem,7vw,6.5rem)]">
        {b.thanks} <em className="text-gold-2">{form.name.split(' ')[0]}.</em>
      </h3>
      <p className="t-lead mt-6 max-w-[42ch] text-ivory/75">{type.confirm ? b.receivedText : b.confirmedText}</p>
      <dl className="mt-12 grid gap-1.5 sm:grid-cols-2">
        {[
          [b.summary.session, `${type.name}, ${type.duration} ${b.min}`],
          [b.summary.when, `${formatDate(start)}, ${prettyTime(slot.time)}`],
          [b.summary.where, where],
          [b.summary.status, type.confirm ? b.awaiting : b.confirmed],
        ].map(([k, v]) => (
          <div key={k} className="rounded-[2px] bg-onyx-2 px-5 py-4">
            <dt className="t-label text-stone">{k}</dt>
            <dd className="mt-2 font-serif text-2xl">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-12 flex flex-wrap gap-3">
        <Button size="lg" onClick={addToCalendar} magnetic={false}>
          <CalendarPlus size={18} aria-hidden="true" /> {b.addToCalendar}
        </Button>
        {onHome && (
          <Button size="lg" variant="ghost" to="/" magnetic={false}>
            {b.backHome}
          </Button>
        )}
      </div>
    </div>
  )
}

/* the whole flow */

export default function BookingFlow({ heading = 'h2', title, titleEm, intro, initialType = 'consultation', showHomeLink = false }) {
  const { t, contact, sessionTypes, about } = useContent()
  const b = t.booking
  const [step, setStep] = useState(1)
  const [dir, setDir] = useState(1)
  const [typeId, setTypeId] = useState(() =>
    sessionTypes.some((s) => s.id === initialType) ? initialType : sessionTypes[0].id,
  )
  const [date, setDate] = useState(null)
  const [slot, setSlot] = useState(null)
  const [notice, setNotice] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '', place: '', goals: '', referral: '', consent: false })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const top = useRef(null)
  const lenis = useLenis()
  const Heading = heading

  const type = sessionTypes.find((s) => s.id === typeId)

  const go = (n) => {
    setDir(n > step ? 1 : -1)
    setStep(n)
    requestAnimationFrame(() => scrollToTarget(lenis, top.current, { offset: -120 }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(form, type, b.errors)
    setErrors(errs)
    const first = Object.keys(errs)[0]
    if (first) {
      // Move focus to the first field that needs fixing.
      const target = { place: 'place-0' }[first] ?? first
      document.getElementById(target)?.focus()
      return
    }
    setSubmitting(true)
    const place = type.places.find((p) => p.id === form.place)?.label ?? type.places[0].label
    const result = await createBooking({ type: typeId, date, time: slot.time, start: slot.start, ...form, place })
    setSubmitting(false)
    if (!result.ok) {
      setNotice(result.reason === 'taken' ? b.taken : b.failed)
      setSlot(null)
      go(1)
      return
    }
    setDone(true)
    requestAnimationFrame(() => scrollToTarget(lenis, top.current, { offset: -120 }))
  }

  const waText = encodeURIComponent(
    b.whatsappText(type?.name, slot ? `${formatDate(new Date(slot.start))}, ${prettyTime(slot.time)}` : ''),
  )

  return (
    <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
      <aside className="lg:col-span-4">
        <div className="lg:sticky lg:top-32">
          <Reveal as={Heading} className="t-h2 text-[clamp(3.25rem,6vw,6rem)]">
            {title} <em className="text-gold-2">{titleEm}</em>
          </Reveal>
          <p className="t-lead mt-6 max-w-[34ch] text-ivory/70">{intro}</p>

          {!done && (
            <ol className="mt-12 grid gap-1" aria-label={b.steps.join(', ')}>
              {b.steps.map((label, i) => {
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
                            ? 'bg-onyx-2 text-ivory/55'
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

          {(type || slot) && !done && (
            <div className="mt-6 hidden rounded-[2px] bg-onyx-2 p-5 lg:block">
              {type && (
                <p className="font-serif text-2xl">
                  {type.name}{' '}
                  <span className="t-label tabular ml-2 text-stone">
                    {type.duration} {b.min}
                  </span>
                </p>
              )}
              {slot && (
                <p className="mt-2 text-sm text-ivory/70">
                  {formatDate(new Date(slot.start))}, {prettyTime(slot.time)} · {b.swissTime}
                </p>
              )}
            </div>
          )}

          {/* A face on the form: people book a person, not a service. */}
          <div className="mt-10 flex items-center gap-4">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-[2px] bg-graphite">
              <Img image={about.portrait} alt="" width={240} className="h-full w-full object-cover object-[50%_35%]" />
            </div>
            <p className="max-w-[24ch] text-sm text-ivory/75">{b.personal}</p>
          </div>

          <a
            href={`https://wa.me/${contact.whatsapp}?text=${waText}`}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-3 text-ivory/70 transition-colors hover:text-ivory"
          >
            <WhatsappLogo size={20} aria-hidden="true" /> {b.whatsapp}
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
            {done && slot ? (
              <Done type={type} slot={slot} form={form} onHome={showHomeLink} />
            ) : step === 0 ? (
              <TypeStep
                value={typeId}
                onChange={(v) => {
                  setTypeId(v)
                  setDate(null)
                  setSlot(null)
                  setForm((f) => ({ ...f, place: '' }))
                }}
                onNext={() => go(1)}
              />
            ) : step === 1 ? (
              <TimeStep
                key={typeId}
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
  )
}
