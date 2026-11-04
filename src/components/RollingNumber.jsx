/*
  Odometer style number: each digit is a column of 0 to 9 that slides to
  its value, so a price change reads as the numbers rolling over.
*/
const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

export default function RollingNumber({ value, className = '' }) {
  const chars = [...value]
  return (
    <span className={`tabular inline-flex overflow-hidden leading-none ${className}`} aria-label={value}>
      {chars.map((ch, i) => {
        const key = `${chars.length - i}`
        if (!/\d/.test(ch)) {
          return (
            <span key={key + ch} aria-hidden="true" className="inline-block">
              {/* A plain space would collapse inside the flex row ("2 in 1" would read "2in1"). */}
              {ch === ' ' ? ' ' : ch}
            </span>
          )
        }
        const d = Number(ch)
        return (
          <span key={key} aria-hidden="true" className="relative inline-block h-[1em] overflow-hidden">
            <span
              className="flex flex-col transition-transform duration-700 ease-[var(--ease-out-expo)]"
              style={{ transform: `translateY(${-d * 10}%)`, transitionDelay: `${i * 30}ms` }}
            >
              {DIGITS.map((n) => (
                <span key={n} className="block h-[1em]">
                  {n}
                </span>
              ))}
            </span>
          </span>
        )
      })}
    </span>
  )
}
