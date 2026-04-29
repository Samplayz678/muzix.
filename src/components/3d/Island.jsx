import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
// Import RoundedBox for premium, bevelled equalizer bars
import { RoundedBox } from '@react-three/drei'

export default function Island({ activeMode, palette }) {
  const barsRef = useRef([])

  const equalizerBars = useMemo(() => {
    const bars = []
    for (let i = 0; i < 16; i++) {
      bars.push({
        id: i,
        x: -1.6 + i * 0.22,
        colorType: i % 3
      })
    }
    return bars
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const mode = palette[activeMode]

    // Smooth, premium easing for the equalizer bars
    barsRef.current.forEach((bar, i) => {
      if (!bar) return
      const wave = Math.sin(t * (2.4 + mode.speed) + i * 0.74) * 0.5 + 0.5
      const height = 0.24 + wave * 0.86 * mode.lift

      // Use lerp for buttery smooth scaling
      bar.scale.y = THREE.MathUtils.lerp(bar.scale.y || 1, height, 0.15)
      bar.position.y = 0.72 + (bar.scale.y * 0.5) - 0.5
    })
  })

  return (
    <group position={[0, -1.25, 0]}>
      {/* 1. Base Plinth (Dark, heavy brushed metal/graphite) */}
      <mesh receiveShadow castShadow>
        <cylinderGeometry args={[2.65, 3.05, 0.62, 32]} />
        <meshPhysicalMaterial
          color="#0a0a0c"
          roughness={0.6}
          metalness={0.8}
          clearcoat={0.2}
        />
      </mesh>

      {/* 2. Top Surface */}
      <mesh position={[0, 0.36, 0]} receiveShadow>
        <cylinderGeometry args={[2.46, 2.58, 0.14, 32]} />
        <meshStandardMaterial
          color={palette[activeMode].foliage}
          roughness={1}
          metalness={0.1}
        />
      </mesh>

      {/* 3. Premium Equalizer Bars */}
      <group position={[0, 0, 1.1]}>
        {equalizerBars.map((bar, i) => (
          <mesh
            key={bar.id}
            ref={el => barsRef.current[i] = el}
            position={[bar.x, 0.72, 0]}
            castShadow
          >
            {/* RoundedBox adds soft, bevelled edges catching light perfectly */}
            <RoundedBox args={[0.12, 1, 0.12]} radius={0.03} smoothness={4}>
              <meshPhysicalMaterial
                color={bar.colorType === 0 ? palette[activeMode].main : bar.colorType === 1 ? "#111111" : palette[activeMode].accent}
                roughness={0.15}
                metalness={0.7}
                clearcoat={1.0}           // Adds a glossy outer shell (like acrylic)
                clearcoatRoughness={0.1}
              />
            </RoundedBox>
          </mesh>
        ))}
      </group>

      {/* 4. Decorative Spheres (Replacing low-poly rocks) */}
      <Decor />
    </group>
  )
}

function Decor() {
  const positions = [
    [-1.95, 0.55, 0.36, 1.2],
    [2.1, 0.52, -0.22, 0.9],
    [1.48, 0.49, 0.72, 0.68],
    [-0.7, 0.5, -0.92, 0.72],
  ]

  return (
    <>
      {positions.map((pos, i) => (
        <mesh key={i} position={[pos[0], pos[1], pos[2]]} scale={pos[3]} castShadow receiveShadow>
          <sphereGeometry args={[0.22, 16, 16]} />
          {/* Dark polished obsidian / chrome material */}
          <meshPhysicalMaterial
            color="#050505"
            roughness={0.05}
            metalness={0.95}
            clearcoat={1.0}
          />
        </mesh>
      ))}
    </>
  )
}