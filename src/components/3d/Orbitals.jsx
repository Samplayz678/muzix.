import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

function createIconTexture(type) {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')

  ctx.clearRect(0, 0, 128, 128)

  const gradient = ctx.createLinearGradient(0, 0, 128, 128)
  gradient.addColorStop(0, '#ef4444')
  gradient.addColorStop(1, '#fca5a5')

  ctx.strokeStyle = gradient
  ctx.fillStyle = gradient
  ctx.lineWidth = 10
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'

  ctx.shadowBlur = 12
  ctx.shadowColor = '#ef4444'

  if (type === 'discord') {
    ctx.beginPath()
    ctx.moveTo(34, 40); ctx.quadraticCurveTo(64, 30, 94, 40); ctx.lineTo(104, 80)
    ctx.quadraticCurveTo(64, 100, 24, 80); ctx.closePath(); ctx.stroke()
    ctx.shadowBlur = 0; ctx.beginPath(); ctx.arc(48, 60, 6, 0, Math.PI * 2); ctx.arc(80, 60, 6, 0, Math.PI * 2); ctx.fill()
  } else if (type === 'music') {
    ctx.beginPath(); ctx.moveTo(40, 90); ctx.arc(30, 90, 10, 0, Math.PI * 2)
    ctx.moveTo(40, 90); ctx.lineTo(40, 30); ctx.lineTo(80, 20); ctx.lineTo(80, 80)
    ctx.arc(70, 80, 10, 0, Math.PI * 2); ctx.stroke()
  } else if (type === 'audio') {
    ctx.beginPath(); ctx.moveTo(30, 45); ctx.lineTo(50, 45); ctx.lineTo(80, 25); ctx.lineTo(80, 103)
    ctx.lineTo(50, 83); ctx.lineTo(30, 83); ctx.closePath(); ctx.stroke()
    ctx.beginPath(); ctx.arc(80, 64, 20, -Math.PI / 3, Math.PI / 3); ctx.stroke()
    ctx.beginPath(); ctx.arc(80, 64, 35, -Math.PI / 3, Math.PI / 3); ctx.stroke()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

export default function Orbitals({ activeMode, palette }) {
  const groupRef = useRef()
  
  const iconTextures = useMemo(() => ({
    discord: createIconTexture('discord'),
    music: createIconTexture('music'),
    audio: createIconTexture('audio'),
  }), [])

  const orbitalConfigs = [
    { radius: 2.5, y: 0.74, angle: 0, texture: iconTextures.discord },
    { radius: 2.92, y: 1.08, angle: 2.1, texture: iconTextures.music },
    { radius: 2.32, y: 1.44, angle: 4.2, texture: iconTextures.audio },
    { radius: 2.75, y: 1.05, angle: 5.6, texture: iconTextures.music },
  ]

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const mode = palette[activeMode]

    groupRef.current.children.forEach((child, i) => {
      const config = orbitalConfigs[i]
      const angle = config.angle + t * (0.24 + config.radius * 0.035) * mode.speed
      child.position.set(
        Math.cos(angle) * config.radius,
        config.y + Math.sin(t * 1.1 + i) * 0.08,
        Math.sin(angle) * config.radius * 0.44
      )
    })
  })

  return (
    <group ref={groupRef}>
      {orbitalConfigs.map((config, i) => (
        <sprite key={i} scale={[0.48, 0.48, 1]}>
          <spriteMaterial map={config.texture} transparent />
        </sprite>
      ))}
    </group>
  )
}
