import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function FloatingPanels() {
  const groupRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.children.forEach((panel, i) => {
        panel.position.y += Math.sin(t * 1.5 + i) * 0.002
      })
    }
  })

  return (
    <group ref={groupRef}>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh 
          key={i}
          position={[-2.2 + i * 1.1, 0.1 + i * 0.08, -1.08 - i * 0.1]}
          rotation={[-0.15, 0.2 - i * 0.06, 0.06 - i * 0.03]}
          scale={[1, 0.75 + i * 0.1, 1]}
          castShadow
        >
          <boxGeometry args={[0.58, 0.1, 0.38]} />
          <meshStandardMaterial color="#f1ece3" roughness={0.48} metalness={0.08} />
        </mesh>
      ))}
    </group>
  )
}
