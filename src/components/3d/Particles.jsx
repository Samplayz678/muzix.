import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const seededRandom = (index) => {
  const value = Math.sin(index * 9283.37) * 10000
  return value - Math.floor(value)
}

// 1. Add scrollProgress to the props
export default function Particles({ count = 80, scrollProgress }) {
  const particlesRef = useRef()

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (seededRandom(i * 3) - 0.5) * 15
      positions[i * 3 + 1] = seededRandom(i * 3 + 1) * 8
      positions[i * 3 + 2] = (seededRandom(i * 3 + 2) - 0.5) * 15
    }
    return positions
  }, [count])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    // 2. Calculate scroll progress safely
    const p = scrollProgress ? scrollProgress.get() : 0
    const ease = Math.min(Math.max(p / 0.25, 0), 1)
    const smoothEase = ease * ease * (3 - 2 * ease)

    // 3. Create the dampener (1 at the top of page, 0 when scrolled down)
    const dampener = 1 - smoothEase

    if (particlesRef.current) {
      // Base rotation continues smoothly regardless of scroll
      particlesRef.current.rotation.y = t * 0.05

      // 4. Apply dampener to the interactive mouse parallax
      const targetX = -state.pointer.x * 2.0 * dampener

      // Optional: Drop the particles down out of view smoothly as you scroll
      const scrollOffsetY = smoothEase * -10

      const targetY = (Math.sin(t * 0.2) * 0.5) + (-state.pointer.y * 2.0 * dampener) + scrollOffsetY

      particlesRef.current.position.x = THREE.MathUtils.lerp(particlesRef.current.position.x, targetX, 0.05)
      particlesRef.current.position.y = THREE.MathUtils.lerp(particlesRef.current.position.y, targetY, 0.05)
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#fca5a5"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
