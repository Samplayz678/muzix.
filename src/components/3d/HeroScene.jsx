import { Suspense, useState, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera, Float, ContactShadows, Environment, Text, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import * as THREE from 'three'
import Logo from './Logo'
import Island from './Island'
import Orbitals from './Orbitals'
import WaveRings from './WaveRings'
import FloatingPanels from './FloatingPanels'
import Particles from './Particles'

const PALETTE = {
  pulse: {
    main: new THREE.Color("#6b0000"),
    accent: new THREE.Color("#ff1a1a"),
    glow: new THREE.Color("#b30000"),
    foliage: new THREE.Color("#163016"),
    speed: 1.15,
    lift: 1,
  },
  bass: {
    main: new THREE.Color("#111111"),
    accent: new THREE.Color("#ef4444"),
    glow: new THREE.Color("#2f6df6"),
    foliage: new THREE.Color("#315b39"),
    speed: 1.75,
    lift: 1.35,
  },
  chill: {
    main: new THREE.Color("#e9e2d7"),
    accent: new THREE.Color("#2e7d68"),
    glow: new THREE.Color("#6fb6a6"),
    foliage: new THREE.Color("#5c7c45"),
    speed: 0.72,
    lift: 0.82,
  },
}

function SceneController({ scrollProgress, activeMode }) {
  const logoRef = useRef()
  const interactiveLogoRef = useRef()
  const baseRef = useRef()
  const textRef = useRef()

  const { viewport } = useThree()

  useFrame((state) => {
    const p = scrollProgress ? scrollProgress.get() : 0
    const ease = Math.min(Math.max(p / 0.25, 0), 1)
    const smoothEase = ease * ease * (3 - 2 * ease)

    // Calculate the IDEAL scroll targets
    const targetX = ((viewport.width / 2) - 1.5) / 0.72 - 1.95
    const targetY = ((viewport.height / 2) - 1.0) / 0.72 + 0.22

    const idealLogoX = THREE.MathUtils.lerp(0, targetX, smoothEase)
    const idealLogoY = THREE.MathUtils.lerp(0, targetY, smoothEase)
    const idealLogoScale = THREE.MathUtils.lerp(1, 0.35, smoothEase)

    const idealBaseY = THREE.MathUtils.lerp(0, -15, smoothEase)
    const idealBaseScale = THREE.MathUtils.lerp(1, 0.5, smoothEase)

    // Smoothly LERP the actual meshes to those ideal targets
    if (logoRef.current) {
      logoRef.current.position.x = THREE.MathUtils.lerp(logoRef.current.position.x, idealLogoX, 0.08)
      logoRef.current.position.y = THREE.MathUtils.lerp(logoRef.current.position.y, idealLogoY, 0.08)
      logoRef.current.scale.setScalar(THREE.MathUtils.lerp(logoRef.current.scale.x, idealLogoScale, 0.08))
    }

    // Text Animation Logic
    if (textRef.current) {
      const outlineP = THREE.MathUtils.clamp(smoothEase * 2, 0, 1)
      const fillP = THREE.MathUtils.clamp((smoothEase - 0.5) * 2, 0, 1)

      textRef.current.strokeOpacity = THREE.MathUtils.lerp(textRef.current.strokeOpacity || 0, outlineP, 0.08)
      textRef.current.fillOpacity = THREE.MathUtils.lerp(textRef.current.fillOpacity || 0, fillP, 0.08)

      const textTargetY = THREE.MathUtils.lerp(-1.2, -1.8, smoothEase)
      textRef.current.position.y = THREE.MathUtils.lerp(textRef.current.position.y, textTargetY, 0.08)
    }

    if (baseRef.current) {
      baseRef.current.position.y = THREE.MathUtils.lerp(baseRef.current.position.y, idealBaseY, 0.08)
      baseRef.current.scale.setScalar(THREE.MathUtils.lerp(baseRef.current.scale.x, idealBaseScale, 0.08))
    }

    // Interactive Mouse Animation
    if (interactiveLogoRef.current) {
      const dampener = 1 - smoothEase

      const targetRotX = -state.pointer.y * 0.3 * dampener
      const targetRotY = state.pointer.x * 0.3 * dampener
      const targetPosX = state.pointer.x * 0.5 * dampener
      const targetPosY = state.pointer.y * 0.5 * dampener

      // THE FIX: Use Quaternion Slerp to absolutely prevent 360-degree flipping
      const targetEuler = new THREE.Euler(targetRotX, targetRotY, 0)
      const targetQuat = new THREE.Quaternion().setFromEuler(targetEuler)
      interactiveLogoRef.current.quaternion.slerp(targetQuat, 0.08)

      // Position lerp stays the same
      interactiveLogoRef.current.position.x = THREE.MathUtils.lerp(interactiveLogoRef.current.position.x, targetPosX, 0.08)
      interactiveLogoRef.current.position.y = THREE.MathUtils.lerp(interactiveLogoRef.current.position.y, targetPosY, 0.08)
    }
  })

  return (
    <group position={[1.95, -0.22, 0]} scale={0.72}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <group ref={logoRef}>
          <group ref={interactiveLogoRef}>
            <Logo activeMode={activeMode} palette={PALETTE} />
          </group>

          <Text
            ref={textRef}
            position={[0, -1.8, 0]}
            fontSize={0.7}
            letterSpacing={0.3}
            fontWeight={600}
            color="#ffffff"
            strokeColor="#ffffff"
            strokeWidth={0.015}
            fillOpacity={0}
            strokeOpacity={0}
            anchorX="center"
            anchorY="middle"
          >
            M U Z I X
          </Text>

        </group>
        <group ref={baseRef}>
          <Island activeMode={activeMode} palette={PALETTE} />
          <Orbitals activeMode={activeMode} palette={PALETTE} />
          <WaveRings activeMode={activeMode} palette={PALETTE} />
          <FloatingPanels />
        </group>
      </Float>
    </group>
  )
}

export default function HeroScene({ scrollProgress }) {
  const [activeMode] = useState('pulse')

  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <Canvas
        shadows
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ pointerEvents: 'none' }}
        eventSource={typeof document !== 'undefined' ? document.body : undefined}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera
            makeDefault
            position={[0.18, 1.05, 8.55]}
            fov={34}
            near={0.1}
            far={100}
          />

          <ambientLight intensity={0.85} />
          <hemisphereLight intensity={1.8} color="#ffffff" groundColor="#111111" />
          <pointLight position={[-3.2, 2.4, 3.2]} intensity={50} color={PALETTE[activeMode].glow} />
          <pointLight position={[3.4, 1.2, 3.4]} intensity={25} color={PALETTE[activeMode].accent} />

          <directionalLight
            position={[4.5, 6, 5]}
            intensity={3}
            castShadow
            shadow-mapSize={[512, 512]}
          />

          <AdaptiveDpr pixelated />
          <AdaptiveEvents />

          <SceneController scrollProgress={scrollProgress} activeMode={activeMode} />

          <Particles count={100} scrollProgress={scrollProgress} />

          <ContactShadows
            position={[0, -1.62, 0]}
            opacity={0.4}
            scale={15}
            blur={2}
            far={4.5}
            frames={1}
            resolution={512}
          />
        </Suspense>

        <Suspense fallback={null}>
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  )
}