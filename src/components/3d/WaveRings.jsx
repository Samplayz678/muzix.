import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function WaveRings({ activeMode, palette }) {
  const groupRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const mode = palette[activeMode]

    if (groupRef.current) {
      groupRef.current.children.forEach((ring, i) => {
        ring.rotation.z += 0.0025 * mode.speed * (i + 1)
        ring.scale.x = 1 + Math.sin(t * mode.speed + i) * 0.025
        ring.scale.y = 1 + Math.cos(t * mode.speed + i) * 0.025
      })
    }
  })

  return (
    <group ref={groupRef}>
      {[0, 1, 2].map((i) => (
        <mesh 
          key={i} 
          position={[0, 0.04 + i * 0.18, 0]}
          rotation={[Math.PI / 2.35, 0.1 + i * 0.25, -0.16 + i * 0.18]}
          scale={[1, 1, 0.36]}
        >
          <torusGeometry args={[2.05 + i * 0.42, 0.012, 10, 160]} />
          <meshBasicMaterial 
            color={i % 2 !== 0 ? "#171411" : "#ef4444"} 
            transparent 
            opacity={i % 2 !== 0 ? 0.32 : 0.42} 
            depthWrite={false} 
          />
        </mesh>
      ))}
    </group>
  )
}
