import { useLayoutEffect } from 'react'

/**
 * Sizes a single line of text so it exactly fills its parent's width
 * (if it stretches with a width variable, measured at its widest setting).
 * Only re-fits when the parent's width changes, never on height changes.
 */
export function useFitText(ref, { fill = 1, stretchVar = '--w' } = {}) {
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    let lastWidth = -1
    const fit = (force = false) => {
      const width = el.parentElement.clientWidth
      if (!width || (!force && width === lastWidth)) return
      lastWidth = width
      const prev = el.style.getPropertyValue(stretchVar)
      if (prev) el.style.setProperty(stretchVar, 125)
      const current = parseFloat(getComputedStyle(el).fontSize) || 100
      const next = Math.floor(current * (width / el.scrollWidth) * fill * 0.995)
      if (prev) el.style.setProperty(stretchVar, prev)
      if (Number.isFinite(next) && next > 0) el.style.fontSize = `${next}px`
    }
    fit(true)
    // A second pass settles any rounding from the first measurement.
    requestAnimationFrame(() => fit(true))
    const ro = new ResizeObserver(() => fit())
    ro.observe(el.parentElement)
    document.fonts?.ready.then(() => fit(true))
    return () => ro.disconnect()
  }, [ref, fill, stretchVar])
}
