import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { canvasDpr } from '../lib/gpu'
import Bezel from './Bezel'
import Studio from './Studio'
import Dust from './Dust'
import { ensureBezelFont } from './bezelTexture'

/* A single bezel that fills its box, turning slowly and leaning toward the pointer. */
function Spinner({ label, reduced, intro }) {
  const g = useRef()
  const spin = useRef(0)
  const pointer = useRef({ x: 0, y: 0 })
  const tilt = useRef({ x: 0, y: 0 })

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
    const i = intro.current
    const k = 1 - Math.exp(-dt * 3)
    tilt.current.x += (pointer.current.y - tilt.current.x) * k
    tilt.current.y += (pointer.current.x - tilt.current.y) * k
    if (!reduced) spin.current -= dt * (0.1 + (1 - i) * 2.2)
    g.current.rotation.set(0.12 + tilt.current.x * 0.25, -0.42 + tilt.current.y * 0.35, 0)
    g.current.scale.setScalar(1.55 * (0.4 + 0.6 * i))
    g.current.position.y = (1 - i) * -0.5
  })

  return <Bezel ref={g} label={label} spin={spin} />
}

export default function ShowcaseScene({ label, reduced, intro, active = true }) {
  useEffect(() => {
    ensureBezelFont()
  }, [])
  return (
    <Canvas
      style={{ pointerEvents: 'none' }}
      dpr={canvasDpr()}
      frameloop={!active ? 'never' : reduced ? 'demand' : 'always'}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.NeutralToneMapping }}
      camera={{ fov: 30, position: [0, 0, 7], near: 0.1, far: 40 }}
    >
      <Studio />
      <Spinner label={label} reduced={reduced} intro={intro} />
      <Dust count={reduced ? 50 : 130} spread={[7, 6, 6]} center={[0, 0, -1]} paused={{ current: reduced }} />
    </Canvas>
  )
}
