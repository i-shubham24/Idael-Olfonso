import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

/*
  Lighting rig. The reflections come from a tiny scene of glowing panels
  baked into an environment map on the spot (no HDR file to download),
  so the gold edges look right even offline at a client demo.
*/
function useStudioEnvironment(warm) {
  const gl = useThree((s) => s.gl)
  const scene = useThree((s) => s.scene)

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl)
    const env = new THREE.Scene()
    env.background = new THREE.Color('#0b0c0e')
    const geos = []
    const mats = []
    const panel = (geo, position, color, intensity) => {
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(color).multiplyScalar(intensity),
        side: THREE.DoubleSide,
        toneMapped: false,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(...position)
      mesh.lookAt(0, 0, 0)
      env.add(mesh)
      geos.push(geo)
      mats.push(mat)
    }
    panel(new THREE.PlaneGeometry(10, 1.5), [0, 4, 3], '#ffffff', 2.5)
    panel(new THREE.PlaneGeometry(8, 2), [-5, 0, 2], '#ffffff', 1.6)
    panel(new THREE.PlaneGeometry(8, 2), [5, -1, -2], warm, 1.2)
    panel(new THREE.RingGeometry(1.6, 2, 48), [0, 0, -6], '#ffffff', 1.4)
    panel(new THREE.PlaneGeometry(12, 6), [0, 1, 9], '#ffffff', 1.1)

    const target = pmrem.fromScene(env, 0.035)
    const previous = scene.environment
    scene.environment = target.texture

    return () => {
      scene.environment = previous
      target.dispose()
      pmrem.dispose()
      geos.forEach((g) => g.dispose())
      mats.forEach((m) => m.dispose())
    }
  }, [gl, scene, warm])
}

export default function Studio({ warm = '#ffd9b0' }) {
  useStudioEnvironment(warm)
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[-4, 5, 6]} intensity={2.4} />
      <directionalLight position={[5, 1.5, -4]} intensity={3.2} color={warm} />
      <directionalLight position={[0, -5, 3]} intensity={0.5} color="#d8d0c4" />
    </>
  )
}
