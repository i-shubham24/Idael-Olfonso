import { useState } from 'react'
import { imgSrc, imgSrcSet } from '../lib/img'

/**
 * Photo with responsive sources and a graceful fallback block if the file
 * is missing (useful while swapping in the client's own photos).
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
  ...rest
}) {
  const [failed, setFailed] = useState(false)
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
      src={imgSrc(image, { w: width, h: ratio ? Math.round(width * ratio) : undefined })}
      srcSet={imgSrcSet(image, [480, 800, 1200, 1800], ratio)}
      sizes={sizes}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : undefined}
      onError={() => setFailed(true)}
      className={`${grade ? 'photo-grade' : ''} ${className}`}
      {...rest}
    />
  )
}
