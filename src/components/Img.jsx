import { useEffect, useRef, useState } from 'react'
import { imgSrc, imgSrcSet } from '../lib/img'

/**
 * Photo with responsive sources. It stays invisible until the file has
 * arrived, then fades in softly, so nothing ever pops in half drawn.
 * Falls back to a quiet block if the file is missing.
 */
export default function Img({
  image,
  alt,
  sizes = '100vw',
  ratio,
  width = 1200,
  className = '',
  grade = true,
  eager = false,
  // High fetch priority only for the first images on screen; eager images further down load normally.
  priority = eager,
  // Off for photos whose visibility a parent controls (crossfades), so the two never fight.
  fade = true,
  ...rest
}) {
  const ref = useRef(null)
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // A cached file can finish before React attaches the handler.
  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth) setLoaded(true)
  }, [image])

  if (failed || !image) {
    return (
      <div
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
        className={`rings-pattern bg-graphite ${className}`}
        {...rest}
      />
    )
  }
  return (
    <img
      ref={ref}
      src={imgSrc(image, { w: width, h: ratio ? Math.round(width * ratio) : undefined })}
      srcSet={imgSrcSet(image, [480, 800, 1200, 1800], ratio)}
      sizes={sizes}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : undefined}
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
      data-loaded={loaded || undefined}
      className={`${fade ? 'fade-media' : ''} ${grade ? 'photo-grade' : ''} ${className}`}
      {...rest}
    />
  )
}
