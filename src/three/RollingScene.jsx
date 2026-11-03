import { useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { canvasDpr } from '../lib/gpu'
import Bezel from './Bezel'
import Studio from './Studio'
import { ensureBezelFont } from './bezelTexture'
import { ROLL_MARGIN, ROLL_RADIUS } from './rollingConfig'

const FOV = 30
const Z = 10

/*
  The bezel rolls along the bottom of the services strip. Its rotation is
  exactly distance / radius, so it reads as rolling, not spinning.
  The engraving follows the service in view.
*/
function Roller({ progress, label }) {
  const { size } = useThree()
  const bezel = useRef()
  const spin = useRef(0)
  const x = useRef(null)

  useFrame((_, dt) => {
    const visH = 2 * Z * Math.tan(THREE.MathUtils.degToRad(FOV / 2))
    const visW = visH * (size.width / size.height)
    const r = visH * ROLL_RADIUS
    const margin = r * ROLL_MARGIN
    const targetX = -visW / 2 + margin + (visW - margin * 2) * progress.current
    if (x.current === null) x.current = targetX
    const prev = x.current
    x.current = THREE.MathUtils.lerp(x.current, targetX, 1 - Math.exp(-dt * 10))
    spin.current -= (x.current - prev) / r
    bezel.current.position.set(x.current, -visH / 2 + r + visH * 0.06, 0)
    bezel.current.scale.setScalar(r)
    bezel.current.rotation.set(0.08, -0.38, 0)
  })

  return <Bezel ref={bezel} label={label} spin={spin} />
}

export default function RollingScene({ progress, label, active }) {
  useEffect(() => {
    ensureBezelFont()
  }, [])
  return (
    <Canvas
      style={{ pointerEvents: 'none' }}
      dpr={canvasDpr()}
      frameloop={active ? 'always' : 'never'}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.NeutralToneMapping }}
      camera={{ fov: FOV, position: [0, 0, Z], near: 0.1, far: 40 }}
    >
      <Studio />
      <Roller progress={progress} label={label} />
    </Canvas>
  )
}
