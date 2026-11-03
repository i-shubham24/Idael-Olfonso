/** The IA monogram inside a fine bezel ring. Inherits the text color. */
export default function Monogram({ size = 36, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={`shrink-0 ${className}`} aria-hidden="true">
      <circle cx="20" cy="20" r="19.25" fill="none" stroke="currentColor" strokeOpacity=".35" strokeWidth="1" />
      <circle cx="20" cy="20" r="16" fill="none" stroke="var(--color-gold)" strokeWidth="0.75" />
      <path d="M20 1.5 L21.4 4.2 L18.6 4.2 Z" fill="var(--color-gold)" />
      <text
        x="20"
        y="25.2"
        textAnchor="middle"
        fill="currentColor"
        style={{ font: '400 14px var(--font-serif)', letterSpacing: '-0.02em' }}
      >
        IA
      </text>
    </svg>
  )
}
