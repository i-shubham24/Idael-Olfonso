import * as THREE from 'three'

const SIZE = 1024
const INK = '#d9c49b'
const cache = new Map()

/** Text set around a full circle, spaced so it closes exactly on itself. */
function ringText(ctx, text, radius) {
  const chars = [...text]
  const widths = chars.map((ch) => ctx.measureText(ch).width)
  const total = widths.reduce((a, w) => a + w, 0)
  const spacing = (Math.PI * 2 * radius - total) / chars.length
  let a = 0
  chars.forEach((ch, i) => {
    const half = widths[i] / 2 / radius
    a += half
    ctx.save()
    ctx.rotate(a)
    ctx.fillText(ch, 0, -radius)
    ctx.restore()
    a += half + spacing / radius
  })
}

/**
 * Face artwork for the bezel: sixty minute marks with a gold index at the
 * top, and an engraved line running all the way around. Drawn once per label.
 */
function draw(label, canvas) {
  const ctx = canvas.getContext('2d')
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.clearRect(0, 0, SIZE, SIZE)
  const c = SIZE / 2
  // RingGeometry UVs map the square [-outer, outer], so 1 unit of bezel radius = c / 0.94 px here.
  const unit = c / 0.94

  ctx.translate(c, c)
  ctx.fillStyle = INK
  ctx.strokeStyle = INK
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  // Minute marks.
  for (let i = 0; i < 60; i++) {
    ctx.save()
    ctx.rotate((Math.PI * 2 * i) / 60)
    if (i === 0) {
      ctx.globalAlpha = 1
      ctx.beginPath()
      ctx.moveTo(-unit * 0.03, -unit * 0.925)
      ctx.lineTo(unit * 0.03, -unit * 0.925)
      ctx.lineTo(0, -unit * 0.86)
      ctx.closePath()
      ctx.fill()
    } else if (i % 5 === 0) {
      ctx.globalAlpha = 0.9
      ctx.fillRect(-unit * 0.0065, -unit * 0.925, unit * 0.013, unit * 0.07)
    } else {
      ctx.globalAlpha = 0.45
      ctx.fillRect(-unit * 0.003, -unit * 0.925, unit * 0.006, unit * 0.035)
    }
    ctx.restore()
  }

  // Fine guide rings either side of the engraving.
  ctx.globalAlpha = 0.28
  ctx.lineWidth = unit * 0.004
  ctx.beginPath()
  ctx.arc(0, 0, unit * 0.84, 0, Math.PI * 2)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(0, 0, unit * 0.715, 0, Math.PI * 2)
  ctx.stroke()

  // Engraving: repeat the label until it nearly fills the circle.
  ctx.globalAlpha = 0.82
  if ('fontStretch' in ctx) ctx.fontStretch = 'expanded'
  ctx.font = `500 ${Math.round(unit * 0.05)}px "Archivo Variable", "Archivo", sans-serif`
  const radius = unit * 0.775
  const circumference = Math.PI * 2 * radius
  const one = ctx.measureText(label).width * 1.35
  const repeats = Math.max(1, Math.floor(circumference / one))
  ringText(ctx, label.repeat(repeats), radius)
}

export function bezelTexture(label) {
  if (cache.has(label)) return cache.get(label)
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = SIZE
  draw(label, canvas)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  tex.needsUpdate = true
  cache.set(label, tex)
  return tex
}

let fontPromise
/** Make sure the engraving uses Archivo; redraw any faces drawn before it loaded. */
export function ensureBezelFont() {
  if (!fontPromise) {
    fontPromise = document.fonts
      .load('500 64px "Archivo Variable"')
      .catch(() => {})
      .then(() => {
        cache.forEach((tex, label) => {
          draw(label, tex.image)
          tex.needsUpdate = true
        })
      })
  }
  return fontPromise
}
