import { useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { canvasDpr } from '../lib/gpu'
import Bezel, { FRONT_Z, HOLE_RADIUS } from './Bezel'
import Studio from './Studio'
import Dust from './Dust'
import { ensureBezelFont } from './bezelTexture'

// Scroll phases of the pinned hero (0..1 of the pin).
export const PHASE_CENTER = 0.3 // bezel turns face-on and moves to the middle
export const PHASE_THROUGH = 0.6 // camera has passed through the hole

const START_Z = 7.5
const CENTER_Z = 4.4
const END_Z = -1.4
const FOV = 32

const clamp01 = (v) => Math.min(1, Math.max(0, v))
const smooth = (v) => v * v * (3 - 2 * v)
const lerp = (a, b, t) => a + (b - a) * t
const v3 = new THREE.Vector3()

function Rig({ progress, intro, revealRef, layout, reduced }) {
  const { camera, size } = useThree()
  const bezel = useRef()
  const spin = useRef(0.4)
  const pointer = useRef({ x: 0, y: 0 })
  const tilt = useRef({ x: 0, y: 0 })
  const lastClip = useRef('')

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 1 / 20)
    const g = bezel.current
    if (!g) return
    const aspect = size.width / size.height
    const desktop = aspect > 1.05
    const p = progress.current
    const i = intro.current

    // The DOM reserves a slot for the bezel; convert that box to world units.
    const visH = 2 * START_Z * Math.tan(THREE.MathUtils.degToRad(FOV / 2))
    const visW = visH * aspect
    const px = visH / size.height
    const L = layout.current
    const hasSlot = L.d > 0
    const restScale = hasSlot ? (L.d / 2) * px * 0.8 : desktop ? visW * 0.16 : visW * 0.32
    const restX = hasSlot ? (L.cx - size.width / 2) * px : desktop ? visW * 0.2 : 0
    const restY = hasSlot ? -(L.cy - size.height / 2) * px : 0
    const centerScale = desktop ? 1.2 : Math.max(restScale, 0.62)

    const k = smooth(clamp01(p / PHASE_CENTER))
    const t = smooth(clamp01((p - PHASE_CENTER) / (PHASE_THROUGH - PHASE_CENTER)))

    // Pointer tilt, damped, fading out as the bezel centres.
    const ease = 1 - Math.exp(-dt * 3)
    tilt.current.x = lerp(tilt.current.x, desktop ? pointer.current.y : 0, ease)
    tilt.current.y = lerp(tilt.current.y, desktop ? pointer.current.x : 0, ease)

    const scale = Math.max(0.0001, lerp(restScale, centerScale, k) * (0.35 + 0.65 * i))
    g.scale.setScalar(scale)
    g.position.set(lerp(restX, 0, k), lerp(restY, 0, k) + (1 - i) * -0.6, 0)
    g.rotation.x = (0.16 + tilt.current.x * 0.22) * (1 - k)
    g.rotation.y = ((desktop ? -0.5 : -0.32) + tilt.current.y * 0.3) * (1 - k)

    // A slow turn, faster while it settles in and as the camera passes through.
    if (!reduced) spin.current -= dt * (0.08 + (1 - i) * 1.8 + t * 0.35)

    camera.position.z = p < PHASE_CENTER ? lerp(START_Z, CENTER_Z, k) : lerp(CENTER_Z, END_Z, t)
    camera.position.x = 0
    camera.position.y = 0

    // Open the photo layer exactly inside the projected opening of the bezel.
    const el = revealRef.current
    if (!el) return

    // If completely hidden at the top of the page, avoid writing DOM styles every frame
    if (k < 0.005) {
      if (lastClip.current !== 'idle') {
        el.style.clipPath = 'circle(0px at 50% 50%)'
        el.style.opacity = '0'
        lastClip.current = 'idle'
      }
      return
    }

    const frontZ = FRONT_Z * scale
    const d = camera.position.z - frontZ
    let clip
    let opacity = smooth(clamp01((k - 0.7) / 0.3))
    if (d <= 0.02) {
      clip = 'none'
      opacity = 1
    } else {
      const r = ((HOLE_RADIUS * scale) / d / Math.tan(THREE.MathUtils.degToRad(FOV / 2))) * (size.height / 2)
      v3.set(g.position.x, g.position.y, frontZ).project(camera)
      const cx = ((v3.x + 1) / 2) * size.width
      const cy = ((1 - v3.y) / 2) * size.height
      clip =
        r > Math.hypot(size.width, size.height)
          ? 'none'
          : `circle(${r.toFixed(1)}px at ${cx.toFixed(1)}px ${cy.toFixed(1)}px)`
    }
    if (clip !== lastClip.current) {
      el.style.clipPath = clip
      lastClip.current = clip
    }
    el.style.opacity = opacity.toFixed(3)
  })

  return <Bezel ref={bezel} spin={spin} />
}

export default function HeroScene({ progress, intro, revealRef, layout, active, reduced }) {
  useEffect(() => {
    ensureBezelFont()
  }, [])
  return (
    <Canvas
      className="!absolute inset-0"
      style={{ pointerEvents: 'none' }}
      dpr={canvasDpr()}
      frameloop={!active ? 'never' : reduced ? 'demand' : 'always'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', toneMapping: THREE.NeutralToneMapping }}
      camera={{ fov: FOV, position: [0, 0, START_Z], near: 0.03, far: 60 }}
    >
      <Studio />
      <Rig progress={progress} intro={intro} revealRef={revealRef} layout={layout} reduced={reduced} />
      <Dust count={reduced ? 80 : 260} spread={[14, 9, 12]} center={[0, 0, -3]} paused={{ current: reduced }} />
    </Canvas>
  )
}
