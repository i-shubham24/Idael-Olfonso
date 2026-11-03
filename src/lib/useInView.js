import { useEffect, useState } from 'react'

/** True while the element is on screen (used to pause WebGL when scrolled away). */
export function useInView(ref, rootMargin = '0px') {
  const [inView, setInView] = useState(true)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, rootMargin])
  return inView
}
