import { useEffect, useRef } from 'react'

/*
  Fine film grain over the whole page: it is what makes the black read as matte.
  The noise tile is drawn once to a small canvas and reused as a PNG,
  so the browser never re-runs a filter while you scroll.
*/
export default function Grain() {
  const ref = useRef(null)
  useEffect(() => {
    const c = document.createElement('canvas')
    c.width = c.height = 128
    const ctx = c.getContext('2d')
    const img = ctx.createImageData(128, 128)
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.random() * 255
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v
      img.data[i + 3] = Math.random() < 0.45 ? 255 : 0
    }
    ctx.putImageData(img, 0, 0)
    ref.current.style.backgroundImage = `url(${c.toDataURL('image/png')})`
  }, [])
  return <div ref={ref} className="grain" aria-hidden="true" />
}
