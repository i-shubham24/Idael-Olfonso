import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function dotTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.4, 'rgba(255,255,255,0.55)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 64, 64)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

/*
  Fine gold dust hanging in the air around the bezel. It drifts slowly and
  gives the fly-through real depth as the camera passes through it.
*/
export default function Dust({ count = 700, spread = [14, 9, 16], center = [0, 0, -2], paused, color = '#d9c49b' }) {
  const points = useRef()
  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const seeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = center[0] + (Math.random() - 0.5) * spread[0]
      positions[i * 3 + 1] = center[1] + (Math.random() - 0.5) * spread[1]
      positions[i * 3 + 2] = center[2] + (Math.random() - 0.5) * spread[2]
      seeds[i] = Math.random() * Math.PI * 2
    }
    return { positions, seeds }
  }, [count]) // eslint-disable-line react-hooks/exhaustive-deps
  const map = useMemo(dotTexture, [])

  useFrame((state, dt) => {
    if (paused?.current || !points.current) return
    const t = state.clock.elapsedTime
    points.current.rotation.y += dt * 0.018
    points.current.rotation.x = Math.sin(t * 0.15) * 0.04
    points.current.position.y = Math.cos(t * 0.25) * 0.12
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={map}
        size={0.024}
        sizeAttenuation
        transparent
        depthWrite={false}
        opacity={0.45}
        color={color}
      />
    </points>
  )
}
