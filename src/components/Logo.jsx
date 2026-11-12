/*
  Idael Alfonso's mark: the I stands upright as the first stroke of the A,
  with a gold dot above it like the dot of an i. Drawn as vector shapes (not
  typed letters), so it looks the same everywhere and stays sharp at any size.
  The letters take the current text colour; the dot is always gold.
*/
export function Monogram({ className = '', title }) {
  return (
    <svg
      viewBox="0 0 100 120"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <circle cx="27.35" cy="9" r="5.2" fill="var(--color-gold)" />
      <path fill="currentColor" d="M23.5 21h12.2L86 102h-14.4L60.8 84.6H31.2V102h-7.7zM31.2 78.6h25.9L31.2 37.2z" />
      <path fill="currentColor" d="M15 100.2h24.5v3.8H15zM60 100.2h33v3.8H60z" />
    </svg>
  )
}

/**
 * The full logo: monogram and name. `size` sets the name; the mark scales
 * with it. `name` can be hidden on very small screens with `nameClass`.
 */
export default function Logo({ name, className = '', markClass = 'h-[1.75em]', nameClass = '' }) {
  return (
    <span className={`inline-flex items-center gap-[0.7em] ${className}`}>
      <Monogram className={`w-auto shrink-0 -translate-y-[0.08em] ${markClass}`} />
      {/* The name takes its font, size and spacing from the surrounding link. */}
      {name && <span className={`whitespace-nowrap ${nameClass}`}>{name}</span>}
    </span>
  )
}
