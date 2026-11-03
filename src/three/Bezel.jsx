import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { brand } from '../content/site'
import { bezelTexture } from './bezelTexture'

/*
  A watch bezel: a matte black ceramic ring between two polished gold edges,
  with minute marks and an engraving on both faces. Radius 1 = outer edge.
  The axle runs along +Z, so it faces the camera by default.
*/

// Open centre: the hero camera flies through it.
export const HOLE_RADIUS = 0.6
// Front face of the gold lip, in bezel units.
export const FRONT_Z = 0.1

// Cross-sections (radius, thickness), drawn around the ring.
const BODY = [
  [0.69, 0.078],
  [0.95, 0.078],
  [0.95, -0.078],
  [0.69, -0.078],
  [0.69, 0.078],
]

const RIM = [
  [0.945, 0.094],
  [0.972, 0.1],
  [0.992, 0.088],
  [1.0, 0.06],
  [1.0, -0.06],
  [0.992, -0.088],
  [0.972, -0.1],
  [0.945, -0.094],
  [0.945, 0.094],
]

const LIP = [
  [HOLE_RADIUS, 0.07],
  [0.622, 0.094],
  [0.695, 0.094],
  [0.695, -0.094],
  [0.622, -0.094],
  [HOLE_RADIUS, -0.07],
  [HOLE_RADIUS, 0.07],
]

function lathe(points, segments = 96) {
  return new THREE.LatheGeometry(
    points.map(([r, y]) => new THREE.Vector2(r, y)),
    segments,
  )
}

const GOLD = { color: '#c9a86a', metalness: 1, roughness: 0.24, envMapIntensity: 1.5 }

export default function Bezel({ label = brand.engraving, spin = 0, ...props }) {
  const bodyGeo = useMemo(() => lathe(BODY), [])
  const rimGeo = useMemo(() => lathe(RIM), [])
  const lipGeo = useMemo(() => lathe(LIP), [])
  const faceGeo = useMemo(() => new THREE.RingGeometry(0.7, 0.94, 96, 1), [])

  const faceMats = useRef([])
  const spinGroup = useRef()

  // Swap the engraving when the label changes (the rolling bezel follows the service in view).
  useEffect(() => {
    const tex = bezelTexture(label)
    faceMats.current.forEach((m) => {
      if (!m) return
      m.map = tex
      m.needsUpdate = true
    })
  }, [label])

  useFrame(() => {
    if (spinGroup.current && typeof spin === 'object' && spin !== null) {
      spinGroup.current.rotation.z = spin.current
    }
  })

  const faceTex = useMemo(() => bezelTexture(label), []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <group {...props}>
      <group ref={spinGroup} rotation={[0, 0, typeof spin === 'number' ? spin : 0]}>
        {/* Lathe geometry spins around Y, so tip it to make the axle point at the camera. */}
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={bodyGeo}>
            <meshStandardMaterial color="#0b0b0c" roughness={0.62} metalness={0.15} envMapIntensity={0.45} />
          </mesh>
          <mesh geometry={rimGeo}>
            <meshStandardMaterial {...GOLD} />
          </mesh>
          <mesh geometry={lipGeo}>
            <meshStandardMaterial {...GOLD} />
          </mesh>
          {/* Engraved faces sit a hair above the ceramic. */}
          <mesh geometry={faceGeo} position={[0, 0.0795, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <meshStandardMaterial
              ref={(m) => (faceMats.current[0] = m)}
              map={faceTex}
              transparent
              depthWrite={false}
              roughness={0.35}
              metalness={0.4}
              polygonOffset
              polygonOffsetFactor={-2}
            />
          </mesh>
          <mesh geometry={faceGeo} position={[0, -0.0795, 0]} rotation={[Math.PI / 2, 0, Math.PI]}>
            <meshStandardMaterial
              ref={(m) => (faceMats.current[1] = m)}
              map={faceTex}
              transparent
              depthWrite={false}
              roughness={0.35}
              metalness={0.4}
              polygonOffset
              polygonOffsetFactor={-2}
            />
          </mesh>
        </group>
      </group>
    </group>
  )
}
