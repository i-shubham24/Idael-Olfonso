import { useEffect, useRef, useState } from 'react'
import { useMediaQuery, useReducedMotion } from '../lib/media'
import { videoSrc } from '../lib/img'

/**
 * Muted, looping background video that only plays while it is on screen
 * (and while `active` is true). Reduced motion shows the poster instead.
 * `video` is either a Wix video id ("24a38b_..."), a full URL or a /public path.
 */
export default function Video({
  video,
  poster,
  active = true,
  quality = '720p',
  loop = true,
  onEnded,
  className = '',
  grade = 'video-grade',
  ...rest
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const reduced = useReducedMotion()
  // Phones get a lighter file: 480p looks sharp on a small screen and loads much faster.
  const small = useMediaQuery('(max-width: 767px)')
  const q = small ? '480p' : quality

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (visible && active && !reduced) {
      const p = el.play()
      // Autoplay can be refused (power saving); the poster stays, nothing breaks.
      p?.catch?.(() => {})
    } else {
      el.pause()
    }
  }, [visible, active, reduced, video])

  return (
    <video
      ref={ref}
      src={videoSrc(video, q)}
      poster={poster}
      muted
      loop={loop}
      playsInline
      preload={reduced ? 'none' : 'metadata'}
      onEnded={onEnded}
      aria-hidden="true"
      className={`${grade} ${className}`}
      {...rest}
    />
  )
}
