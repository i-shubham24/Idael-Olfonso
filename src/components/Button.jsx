import { TLink } from '../lib/transition'

/*
  Two kinds of button, nothing more:
  gold  the one main action (booking), always worded the same
  ghost everything secondary
  `ivory` and `ink` exist for the light section and old call sites.
*/
const VARIANTS = {
  gold: 'bg-gold text-ink hover:bg-gold-2',
  ivory: 'bg-gold text-ink hover:bg-gold-2',
  ghost: 'bg-ivory/[0.08] text-ivory hover:bg-ivory/[0.16]',
  ink: 'bg-ink text-ivory hover:bg-graphite',
  'ghost-ink': 'bg-ink/[0.07] text-ink hover:bg-ink/[0.14]',
}

const SIZES = {
  sm: 'min-h-10 px-5 text-[0.66rem]',
  md: 'min-h-12 px-6 text-[0.7rem] sm:px-7',
  lg: 'min-h-14 px-7 text-[0.72rem] sm:px-9',
  xl: 'min-h-14 px-8 text-[0.74rem] sm:px-10',
}

export default function Button({
  to,
  href,
  variant = 'gold',
  size = 'md',
  // eslint-disable-next-line no-unused-vars
  magnetic,
  full = false,
  className = '',
  children,
  ...rest
}) {
  const cls = `inline-flex select-none items-center justify-center gap-3 rounded-[2px] text-center font-medium uppercase leading-snug tracking-[0.18em] [font-stretch:108%] transition-[background-color,color,box-shadow,transform] duration-500 ease-[var(--ease-out-expo)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 ${VARIANTS[variant] ?? VARIANTS.gold} ${SIZES[size]} ${full ? 'w-full' : ''} ${className}`

  if (to) {
    return (
      <TLink to={to} className={cls} {...rest}>
        {children}
      </TLink>
    )
  }
  if (href) {
    const rel = rest.target === '_blank' && !rest.rel ? 'noopener noreferrer' : rest.rel
    return (
      <a href={href} className={cls} {...rest} rel={rel}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  )
}
