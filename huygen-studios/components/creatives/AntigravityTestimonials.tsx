"use client"
import React, { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

const TESTIMONIALS = [
  "Mind-blowing visuals and top-tier execution.",
  "They transformed our digital presence completely.",
  "An absolute pleasure to work with from start to finish.",
  "The attention to detail is unmatched in the industry.",
  "Innovative, dynamic, and incredibly professional.",
  "Our new website feels like a true work of art.",
  "Responsive, fast, and visually stunning results.",
  "They pushed the boundaries of what we thought possible."
]

function Orb() {
  const innerRef = useRef<THREE.Mesh>(null)
  const outerRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (innerRef.current && outerRef.current) {
      innerRef.current.rotation.y = clock.elapsedTime * 0.2
      innerRef.current.rotation.x = clock.elapsedTime * 0.1
      // pulse scale slightly
      const scale = 1 + Math.sin(clock.elapsedTime * 2) * 0.05
      innerRef.current.scale.set(scale, scale, scale)
      
      const outerScale = 1.2 + Math.sin(clock.elapsedTime * 2) * 0.08
      outerRef.current.scale.set(outerScale, outerScale, outerScale)
    }
  })

  return (
    <group>
      <mesh ref={innerRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial 
          color="#88ccff" 
          emissive="#2288ff" 
          emissiveIntensity={2} 
        />
      </mesh>
      {/* Fake Glow using Additive Blending */}
      <mesh ref={outerRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshBasicMaterial 
          color="#44aaff" 
          transparent={true}
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

function Fragment({ 
  index, 
  text, 
  targetPosition, 
  targetRotation, 
  isAssembled,
  isHoveredGlobal
}: { 
  index: number, 
  text: string, 
  targetPosition: THREE.Vector3, 
  targetRotation: THREE.Euler, 
  isAssembled: boolean,
  isHoveredGlobal: boolean
}) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  
  // Random base offsets for antigravity drift
  const randomOffset = useMemo(() => new THREE.Vector3(
    (Math.random() - 0.5) * 15,
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 15
  ), [])
  
  const randomRotationRate = useMemo(() => new THREE.Vector3(
    (Math.random() - 0.5) * 0.5,
    (Math.random() - 0.5) * 0.5,
    (Math.random() - 0.5) * 0.5
  ), [])

  const phase = useMemo(() => Math.random() * Math.PI * 2, [])
  const isHighlighted = isAssembled && hovered

  useFrame(({ clock }) => {
    if (!groupRef.current) return

    const t = clock.elapsedTime

    if (isAssembled) {
      // Magnetic pull together
      const highlightZOffset = isHighlighted ? 1 : 0
      // We push the highlighted item outward slightly based on its rotation
      const actualTargetPos = targetPosition.clone().add(
        new THREE.Vector3(0, 0, highlightZOffset).applyEuler(targetRotation)
      )

      groupRef.current.position.lerp(actualTargetPos, 0.05)
      
      const targetQuat = new THREE.Quaternion().setFromEuler(targetRotation)
      groupRef.current.quaternion.slerp(targetQuat, 0.05)
    } else {
      // Zero gravity drift
      const driftPos = new THREE.Vector3(
        randomOffset.x + Math.sin(t * 0.2 + phase) * 2,
        randomOffset.y + Math.cos(t * 0.3 + phase) * 2,
        randomOffset.z + Math.sin(t * 0.1 + phase) * 2
      )
      
      groupRef.current.position.lerp(driftPos, 0.02)
      
      // Drift rotation
      const driftRot = new THREE.Euler(
        t * randomRotationRate.x,
        t * randomRotationRate.y,
        t * randomRotationRate.z
      )
      const driftQuat = new THREE.Quaternion().setFromEuler(driftRot)
      groupRef.current.quaternion.slerp(driftQuat, 0.02)
    }
  })

  return (
    <group 
      ref={groupRef}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
      onPointerOut={() => setHovered(false)}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[4.2, 1.4, 0.2]} />
        <meshStandardMaterial 
          color={isHighlighted ? "#5a6b7d" : "#3a4552"} 
          roughness={0.8} 
          metalness={0.2} 
          emissive={isHighlighted ? "#2a4b6d" : "#000000"}
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Testimonial text placed on the outer surface (+Z is outward because of targetRotation) */}
      <Html
        transform
        position={[0, 0, 0.11]} 
        rotation={[0, 0, 0]}
        scale={0.1}
        style={{
          color: isHighlighted ? "#ffffff" : "#cccccc",
          width: '380px',
          textAlign: 'center',
          fontSize: '25px',
          pointerEvents: 'none',
          fontFamily: 'sans-serif'
        }}
      >
        {text}
      </Html>
    </group>
  )
}

function Scene({ isHoveredGlobal }: { isHoveredGlobal: boolean }) {
  const groupRef = useRef<THREE.Group>(null)

  const fragments = useMemo(() => {
    const arr = []
    const count = TESTIMONIALS.length
    const radius = 6.5
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2
      
      // Place around the circle in XZ plane
      const targetPos = new THREE.Vector3(
        Math.sin(theta) * radius,
        0,
        Math.cos(theta) * radius
      )
      
      // Rotate to face outward. 
      // If position is [sin(theta)*R, 0, cos(theta)*R], 
      // normal vector is [sin(theta), 0, cos(theta)].
      // We want +Z of the fragment to face this normal vector.
      const targetRot = new THREE.Euler(0, theta, 0)
      
      arr.push({
        text: TESTIMONIALS[i],
        targetPosition: targetPos,
        targetRotation: targetRot
      })
    }
    return arr
  }, [])

  useFrame(({ clock }) => {
    if (groupRef.current && isHoveredGlobal) {
       // Slowly rotate the entire assembled ring
       groupRef.current.rotation.y = clock.elapsedTime * 0.05
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      
      <Orb />
      
      <group ref={groupRef}>
        {fragments.map((frag, idx) => (
          <Fragment 
            key={idx}
            index={idx}
            text={frag.text}
            targetPosition={frag.targetPosition}
            targetRotation={frag.targetRotation}
            isAssembled={isHoveredGlobal}
            isHoveredGlobal={isHoveredGlobal}
          />
        ))}
      </group>
      
      {/* Background hazy fog */}
      <color attach="background" args={['#1a2430']} />
      <fog attach="fog" args={['#1a2430', 8, 30]} />
      
      <Sparkles count={200} scale={20} size={2} color="#88ccff" opacity={0.2} speed={0.5} />
    </>
  )
}

export default function AntigravityTestimonials() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="relative w-full h-screen cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ touchAction: 'none' }}
    >
      {/* Overlay UI */}
      <div className="absolute top-[10%] w-full text-center z-10 pointer-events-none transition-opacity duration-1000"
           style={{ opacity: isHovered ? 0.2 : 1 }}>
        <h2 className="text-5xl font-bold text-white tracking-widest uppercase mix-blend-overlay">
          Client Feedback
        </h2>
        <p className="text-white/50 mt-4 text-lg font-medium tracking-wide">
          [ Hover or touch to assemble fragments ]
        </p>
      </div>

      <Canvas 
        camera={{ position: [0, 2, 16], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <Scene isHoveredGlobal={isHovered} />
      </Canvas>
    </div>
  )
}
