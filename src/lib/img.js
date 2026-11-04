/**
 * Image source helper.
 * Accepts an Unsplash photo id ("photo-123-abc"), a full URL, or a /public path.
 */
export function imgSrc(image, { w = 1200, h, q = 70 } = {}) {
  if (!image) return ''
  if (image.startsWith('http') || image.startsWith('/')) return image
  const params = new URLSearchParams({ auto: 'format', fit: 'crop', w: String(w), q: String(q) })
  if (h) params.set('h', String(h))
  return `https://images.unsplash.com/${image}?${params.toString()}`
}

/**
 * Video source helper.
 * Accepts a Wix video id ("24a38b_..."), a full URL, or a /public path.
 * Wix ids come in 360p, 480p, 720p and 1080p.
 */
export function videoSrc(video, quality = '720p') {
  if (!video) return undefined
  if (video.startsWith('http') || video.startsWith('/')) return video
  return `https://video.wixstatic.com/video/${video}/${quality}/mp4/file.mp4`
}

export function imgSrcSet(image, widths = [480, 800, 1200, 1800], ratio) {
  if (!image || image.startsWith('http') || image.startsWith('/')) return undefined
  return widths.map((w) => `${imgSrc(image, { w, h: ratio ? Math.round(w * ratio) : undefined })} ${w}w`).join(', ')
}
