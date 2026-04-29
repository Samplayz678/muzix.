import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

export default function MuzixLogo({ activeMode = 'pulse', palette }) {
  const meshRef = useRef()
  
  const shape = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(-1.8, -1.28)
    s.lineTo(-1.8, 1.28)
    s.lineTo(-0.7, 1.28)
    s.lineTo(0, 0.2)
    s.lineTo(0.7, 1.28)
    s.lineTo(1.8, 1.28)
    s.lineTo(1.8, -1.28)
    s.lineTo(1.1, -1.28)
    s.lineTo(1.1, 0.4)
    s.lineTo(0, -0.6)
    s.lineTo(-1.1, 0.4)
    s.lineTo(-1.1, -1.28)
    s.closePath()
    return s
  }, [])

  const extrudeSettings = useMemo(() => ({
    depth: 0.85,
    bevelEnabled: true,
    bevelSize: 0.08,
    bevelThickness: 0.1,
    bevelSegments: 2,
    curveSegments: 4,
    steps: 1,
  }), [])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    const mode = palette[activeMode] || palette.pulse
    
    // Floating animation applied to the ENTIRE group
    meshRef.current.position.y = 1.42 + Math.sin(t * mode.speed) * 0.05
  })

  return (
    <group ref={meshRef} position={[0, 1.42, 0]} rotation={[-0.08, -0.24, 0.035]} scale={[0.98, 1.05, 0.98]}>
      {/* Main Base Logo */}
      <mesh castShadow receiveShadow>
        <extrudeGeometry args={[shape, extrudeSettings]} onUpdate={(geom) => geom.center()} />
        {/* Front/Back Faces */}
        <meshPhysicalMaterial 
          attach="material-0"
          color="#550000"
          metalness={0.9}
          roughness={0.15}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          emissive="#3a0000"
          emissiveIntensity={0.2}
          reflectivity={0.9}
        />
        {/* Side Extrusion Faces */}
        <meshStandardMaterial 
          attach="material-1"
          color="#2a1715"
          metalness={0.22}
          roughness={0.58}
        />
      </mesh>
      
      {/* Glossy Overlay/Inset */}
      <mesh position={[0, 0, 0.5]} scale={[0.91, 0.98, 0.88]}>
        <extrudeGeometry args={[shape, extrudeSettings]} onUpdate={(geom) => geom.center()} />
        <meshPhysicalMaterial 
          color="#220000"
          transmission={0.98}
          opacity={1}
          transparent
          metalness={0.2}
          roughness={0.05}
          ior={1.65}
          thickness={1.2}
          specularIntensity={1}
          specularColor="#ff8888"
        />
      </mesh>
    </group>
  )
}
