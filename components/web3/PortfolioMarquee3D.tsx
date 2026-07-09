"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { Canvas, useFrame } from "@react-three/fiber";
import { View } from "@react-three/drei";
import * as THREE from "three";

// ─── 3D SHAPES DEFINITIONS ───

// 1. AI workflow systems (Automation) - Orbiting Node Constellation with Flowing Packets
function NetworkShape({ isHovered, mousePos }: { isHovered: boolean; mousePos: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const satellitesRef = useRef<THREE.Mesh[]>([]);
  const packetRefs = useRef<THREE.Mesh[]>([]);

  const nodes = [
    { pos: new THREE.Vector3(0.68, 0.4, -0.2), color: "#7c4e9b" },
    { pos: new THREE.Vector3(-0.55, 0.6, 0.3), color: "#f63a39" },
    { pos: new THREE.Vector3(0.1, -0.75, 0.4), color: "#4a79ff" },
    { pos: new THREE.Vector3(-0.6, -0.45, -0.5), color: "#7c4e9b" },
    { pos: new THREE.Vector3(0.5, -0.35, -0.6), color: "#f63a39" },
  ];

  useFrame((state) => {
    if (!groupRef.current) return;
    const speed = isHovered ? 1.4 : 0.4;
    const time = state.clock.getElapsedTime();

    // Smooth tilt toward mouse
    const targetRotX = mousePos.y * 0.45;
    const targetRotY = mousePos.x * 0.45;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.1);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.1);
    groupRef.current.rotation.z += 0.003 * speed;

    // Pulse satellites on hover
    const pulse = Math.sin(time * 4.0) * 0.12 + 1.0;
    satellitesRef.current.forEach((sat) => {
      if (sat) {
        sat.scale.setScalar(THREE.MathUtils.lerp(sat.scale.x, isHovered ? pulse * 1.25 : 1.0, 0.1));
      }
    });

    // Animate data packets along the lines
    packetRefs.current.forEach((packet, i) => {
      if (!packet) return;
      const targetNode = nodes[i % nodes.length];
      const progress = ((time * 0.7) + (i * 0.2)) % 1.0;
      packet.position.copy(targetNode.pos).multiplyScalar(progress);
      packet.scale.setScalar(1.0 - progress);
    });
  });

  return (
    <group ref={groupRef} scale={0.68}>
      {/* Central glowing processor core */}
      <mesh>
        <sphereGeometry args={[0.26, 32, 32]} />
        <meshPhysicalMaterial
          color="#4a79ff"
          emissive="#4a79ff"
          emissiveIntensity={isHovered ? 2.0 : 0.8}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Outer orbital nodes & connections */}
      {nodes.map((node, i) => {
        const direction = node.pos.clone().normalize();
        const distance = node.pos.length();
        const midpoint = node.pos.clone().multiplyScalar(0.5);

        const up = new THREE.Vector3(0, 1, 0);
        const quaternion = new THREE.Quaternion().setFromUnitVectors(up, direction);

        return (
          <group key={i}>
            {/* Connection Rod */}
            <mesh position={midpoint} quaternion={quaternion}>
              <cylinderGeometry args={[0.012, 0.012, distance, 8]} />
              <meshStandardMaterial
                color="#676a72"
                metalness={0.9}
                roughness={0.2}
                transparent
                opacity={0.65}
              />
            </mesh>
            {/* Satellite */}
            <mesh
              position={node.pos}
              ref={(el) => {
                if (el) satellitesRef.current[i] = el;
              }}
            >
              <sphereGeometry args={[0.085, 16, 16]} />
              <meshStandardMaterial
                color={node.color}
                metalness={0.8}
                roughness={0.15}
              />
            </mesh>
          </group>
        );
      })}

      {/* Moving data packets */}
      {nodes.map((node, i) => (
        <mesh
          key={`packet-${i}`}
          ref={(el) => {
            if (el) packetRefs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  );
}

// 2. Product interfaces (UI/UX) - Layered Glass Dashboard
function GridShape({ isHovered, mousePos }: { isHovered: boolean; mousePos: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const barsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current || !barsRef.current) return;
    const time = state.clock.getElapsedTime();

    const baseRotX = Math.PI / 6;
    const baseRotY = -Math.PI / 5;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, baseRotX + mousePos.y * 0.35, 0.1);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, baseRotY + mousePos.x * 0.35, 0.1);

    // Pulse dashboard chart bars
    barsRef.current.children.forEach((bar, i) => {
      const scaleY = 1.0 + Math.sin(time * 3.5 + i * 0.6) * (isHovered ? 0.35 : 0.1);
      bar.scale.set(1, scaleY, 1);
    });
  });

  return (
    <group ref={groupRef} scale={0.8}>
      {/* Base Dashboard Interface Panel */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 0.02, 0.8]} />
        <meshPhysicalMaterial
          color="#111216"
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Floating Translucent Sidebar */}
      <mesh position={[-0.4, 0.015, 0]}>
        <boxGeometry args={[0.3, 0.02, 0.72]} />
        <meshPhysicalMaterial
          color="#4a79ff"
          roughness={0.1}
          metalness={0.1}
          transmission={0.45}
          thickness={0.1}
        />
      </mesh>

      {/* Floating Content Card */}
      <mesh position={[0.2, 0.015, -0.16]}>
        <boxGeometry args={[0.72, 0.02, 0.32]} />
        <meshPhysicalMaterial
          color="#fafafa"
          roughness={0.3}
          transmission={0.35}
          thickness={0.1}
        />
      </mesh>

      {/* 3D Cylinder Bar Chart */}
      <group ref={barsRef} position={[0.2, 0.025, 0.18]}>
        <mesh position={[-0.22, 0.08, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.16, 16]} />
          <meshStandardMaterial color="#f63a39" roughness={0.2} metalness={0.5} />
        </mesh>
        <mesh position={[-0.08, 0.12, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.24, 16]} />
          <meshStandardMaterial color="#7c4e9b" roughness={0.2} metalness={0.5} />
        </mesh>
        <mesh position={[0.06, 0.06, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.12, 16]} />
          <meshStandardMaterial color="#4a79ff" roughness={0.2} metalness={0.5} />
        </mesh>
        <mesh position={[0.2, 0.16, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.32, 16]} />
          <meshStandardMaterial color="#fafafa" roughness={0.2} metalness={0.5} />
        </mesh>
      </group>

      {/* Window Controls (Min, Max, Close dot markers) */}
      <mesh position={[-0.5, 0.03, -0.3]}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshBasicMaterial color="#f63a39" />
      </mesh>
      <mesh position={[-0.44, 0.03, -0.3]}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshBasicMaterial color="#7c4e9b" />
      </mesh>
      <mesh position={[-0.38, 0.03, -0.3]}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshBasicMaterial color="#4a79ff" />
      </mesh>
    </group>
  );
}

// 3. Campaign direction (Creative) - Camera Lens Aperture & Ring Blades
function ApertureShape({ isHovered, mousePos }: { isHovered: boolean; mousePos: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const bladesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current || !bladesRef.current) return;
    const time = state.clock.getElapsedTime();

    // Rotate and tilt toward pointer
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mousePos.y * 0.45, 0.1);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mousePos.x * 0.45, 0.1);

    // Open/Close aperture rotation on hover
    const targetApertureRot = isHovered ? Math.PI / 10 : 0;
    bladesRef.current.rotation.z = THREE.MathUtils.lerp(bladesRef.current.rotation.z, targetApertureRot, 0.1);
  });

  const bladeCount = 6;
  const blades = Array.from({ length: bladeCount }).map((_, i) => {
    const angle = (i / bladeCount) * Math.PI * 2;
    const r = 0.35;
    return {
      pos: [Math.cos(angle) * r, Math.sin(angle) * r, 0.02] as [number, number, number],
      rot: [0, 0, angle + Math.PI / 3] as [number, number, number]
    };
  });

  return (
    <group ref={groupRef}>
      {/* Outer Lens Barrel */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[0.54, 0.05, 16, 64]} />
        <meshStandardMaterial color="#111216" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Central Camera Glass Refracting Element */}
      <mesh position={[0, 0, -0.05]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshPhysicalMaterial
          color="#4a79ff"
          emissive="#7c4e9b"
          emissiveIntensity={isHovered ? 0.9 : 0.3}
          transmission={0.9}
          roughness={0.05}
          thickness={0.5}
          ior={1.6}
        />
      </mesh>

      {/* Overlapping Aperture Blades */}
      <group ref={bladesRef}>
        {blades.map((data, i) => (
          <mesh key={i} position={data.pos} rotation={data.rot}>
            <boxGeometry args={[0.32, 0.12, 0.01]} />
            <meshStandardMaterial
              color="#f63a39"
              metalness={0.8}
              roughness={0.3}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// 4. Motion systems (Motion) - Rotating Gyroscope Rings
function MotionShape({ isHovered, mousePos }: { isHovered: boolean; mousePos: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const speed = isHovered ? 2.5 : 0.8;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mousePos.y * 0.4, 0.1);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mousePos.x * 0.4, 0.1);

    if (ring1Ref.current) ring1Ref.current.rotation.x += 0.01 * speed;
    if (ring2Ref.current) ring2Ref.current.rotation.y += 0.014 * speed;
    if (ring3Ref.current) ring3Ref.current.rotation.z += 0.008 * speed;
  });

  return (
    <group ref={groupRef}>
      {/* Central Kinetic Core */}
      <mesh>
        <sphereGeometry args={[0.16, 32, 32]} />
        <meshPhysicalMaterial
          color="#ffffff"
          emissive="#4a79ff"
          emissiveIntensity={isHovered ? 2.5 : 1.0}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Ring 1 - Vertical Orbit */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[0.44, 0.022, 16, 64]} />
        <meshStandardMaterial color="#f63a39" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Ring 2 - Horizontal Orbit */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.48, 0.022, 16, 64]} />
        <meshStandardMaterial color="#7c4e9b" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Ring 3 - Tilted Orbit */}
      <mesh ref={ring3Ref} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[0.52, 0.022, 16, 64]} />
        <meshStandardMaterial color="#fafafa" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

// 5. Enterprise operations (Systems) - Server Cabinets with Blinking LEDs
function ServerClusterShape({ isHovered, mousePos }: { isHovered: boolean; mousePos: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ledMaterials = useRef<THREE.MeshBasicMaterial[]>([]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mousePos.y * 0.4, 0.1);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mousePos.x * 0.4, 0.1);

    if (ringRef.current) ringRef.current.rotation.z = -time * 0.5;

    // Blinking server lights
    ledMaterials.current.forEach((mat, idx) => {
      if (mat) {
        const offset = idx * 1.5;
        const stateFactor = Math.sin(time * 8.0 + offset) > 0.3 ? 1.0 : 0.15;
        mat.opacity = stateFactor;
      }
    });
  });

  const servers = [
    { pos: [-0.24, 0, -0.1], size: [0.18, 0.65, 0.22], color: "#111216" },
    { pos: [0, 0.06, 0.12], size: [0.18, 0.75, 0.22], color: "#1c1e24" },
    { pos: [0.24, -0.05, -0.1], size: [0.18, 0.55, 0.22], color: "#111216" }
  ];

  const leds = [
    // Server 1
    { pos: [-0.24, 0.18, 0.015], color: "#4a79ff" },
    { pos: [-0.24, 0.04, 0.015], color: "#7c4e9b" },
    { pos: [-0.24, -0.1, 0.015], color: "#fafafa" },
    // Server 2
    { pos: [0, 0.28, 0.235], color: "#f63a39" },
    { pos: [0, 0.12, 0.235], color: "#4a79ff" },
    { pos: [0, -0.04, 0.235], color: "#7c4e9b" },
    // Server 3
    { pos: [0.24, 0.12, 0.015], color: "#7c4e9b" },
    { pos: [0.24, -0.02, 0.015], color: "#fafafa" },
    { pos: [0.24, -0.16, 0.015], color: "#4a79ff" }
  ];

  return (
    <group ref={groupRef}>
      {/* Server Cabinets */}
      {servers.map((srv, i) => (
        <mesh key={`srv-${i}`} position={srv.pos as [number, number, number]}>
          <boxGeometry args={srv.size as [number, number, number]} />
          <meshPhysicalMaterial
            color={srv.color}
            roughness={0.2}
            metalness={0.9}
            clearcoat={0.5}
          />
        </mesh>
      ))}

      {/* Indicator LEDs */}
      {leds.map((led, i) => (
        <mesh key={`led-${i}`} position={led.pos as [number, number, number]}>
          <sphereGeometry args={[0.016, 8, 8]} />
          <meshBasicMaterial
            color={led.color}
            ref={(el) => {
              if (el) ledMaterials.current[i] = el as THREE.MeshBasicMaterial;
            }}
            transparent
          />
        </mesh>
      ))}

      {/* Encircling Base Security Ring */}
      <mesh ref={ringRef} position={[0, -0.28, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.52, 0.012, 8, 48]} />
        <meshStandardMaterial color="#4a79ff" emissive="#4a79ff" emissiveIntensity={isHovered ? 1.5 : 0.4} />
      </mesh>
    </group>
  );
}

// 6. Growth infrastructure (Growth) - Ascending 3D Columns & Trendline Arrow
function GrowthShape({ isHovered, mousePos }: { isHovered: boolean; mousePos: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const pillarsRef = useRef<THREE.Group>(null);
  const arrowRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current || !pillarsRef.current) return;
    const time = state.clock.getElapsedTime();

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mousePos.y * 0.4, 0.1);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mousePos.x * 0.4, 0.1);

    // Pulse column heights from the bottom anchor (group pivot)
    pillarsRef.current.children.forEach((pillarGroup, i) => {
      const scaleY = 1.0 + Math.sin(time * 4.0 + i * 0.8) * (isHovered ? 0.22 : 0.06);
      pillarGroup.scale.set(1, scaleY, 1);
    });

    if (arrowRef.current) {
      arrowRef.current.position.y = Math.sin(time * 3.0) * 0.04;
    }
  });

  const columns = [
    { pos: [-0.3, -0.37, 0], h: 0.22, color: "#b8c4d5" },
    { pos: [-0.1, -0.37, 0], h: 0.38, color: "#7c4e9b" },
    { pos: [0.1, -0.37, 0], h: 0.54, color: "#4a79ff" },
    { pos: [0.3, -0.37, 0], h: 0.70, color: "#3b5bdb" }
  ];

  return (
    <group ref={groupRef} scale={0.92}>
      {/* Ascending Columns growing from bottom */}
      <group ref={pillarsRef}>
        {columns.map((col, i) => (
          <group key={`col-${i}`} position={col.pos as [number, number, number]}>
            <mesh position={[0, col.h / 2, 0]}>
              <boxGeometry args={[0.12, col.h, 0.12]} />
              <meshPhysicalMaterial
                color={col.color}
                roughness={0.15}
                metalness={0.8}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* Floating Growth Trend Indicator Line & Arrowhead (pointing UPwards to the right) */}
      <group ref={arrowRef} position={[-0.05, -0.05, 0.08]}>
        {/* Trendline cylinder angled upwards */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 8]}>
          <cylinderGeometry args={[0.015, 0.015, 0.8, 8]} />
          <meshBasicMaterial color="#f63a39" />
        </mesh>
        {/* Arrowhead */}
        <mesh position={[0.33, 0.14, 0]} rotation={[0, 0, Math.PI / 8 - Math.PI / 2]}>
          <coneGeometry args={[0.045, 0.12, 16]} />
          <meshBasicMaterial color="#f63a39" />
        </mesh>
      </group>

      {/* Base Grid Platform */}
      <mesh position={[0, -0.38, 0]}>
        <boxGeometry args={[0.9, 0.02, 0.4]} />
        <meshStandardMaterial color="#111216" roughness={0.4} metalness={0.6} />
      </mesh>
    </group>
  );
}

// ─── SHAPE ROUTER ───
function ShapeRenderer({ type, isHovered, mousePos }: { type: string; isHovered: boolean; mousePos: { x: number; y: number } }) {
  switch (type) {
    case "Automation":
      return <NetworkShape isHovered={isHovered} mousePos={mousePos} />;
    case "UI/UX":
      return <GridShape isHovered={isHovered} mousePos={mousePos} />;
    case "Creative":
      return <ApertureShape isHovered={isHovered} mousePos={mousePos} />;
    case "Motion":
      return <MotionShape isHovered={isHovered} mousePos={mousePos} />;
    case "Systems":
      return <ServerClusterShape isHovered={isHovered} mousePos={mousePos} />;
    case "Growth":
      return <GrowthShape isHovered={isHovered} mousePos={mousePos} />;
    default:
      return null;
  }
}

// ─── SCENE SETUP WRAPPER ───
function SceneWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[5, 8, 4]} intensity={1.3} />
      <pointLight position={[-4, -4, -4]} intensity={0.6} color="#7c4e9b" />
      <pointLight position={[4, 4, 4]} intensity={0.9} color="#f63a39" />
      {children}
    </>
  );
}

// ─── CARD COMPONENT ───
interface PortfolioCardProps {
  item: { title: string; type: string; image: string };
  index: number;
}

function PortfolioCard({ item, index }: PortfolioCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setMousePos({ x, y });
  };

  const handlePointerEnter = () => {
    setHovered(true);
  };

  const handlePointerLeave = () => {
    setHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <article
      ref={cardRef}
      className="portfolio-item"
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <div
        ref={viewRef}
        className="portfolio-circle"
        style={{
          transform: hovered ? "scale(1.08)" : "scale(1)",
          transition: "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
          cursor: "grab",
          touchAction: "none"
        }}
      >
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <View track={viewRef as any} className="w-full h-full pointer-events-none">
          <SceneWrapper>
            <ShapeRenderer type={item.type} isHovered={hovered} mousePos={mousePos} />
          </SceneWrapper>
        </View>
      </div>
      <div className="portfolio-caption">
        <span>{item.title}</span>
        <small>{item.type}</small>
      </div>
    </article>
  );
}

// ─── MAIN 3D SCENE CONTROLLER ───
interface PortfolioMarquee3DProps {
  portfolioItems: Array<{ title: string; type: string; image: string }>;
}

export default function PortfolioMarquee3D({ portfolioItems }: PortfolioMarquee3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!containerRef.current || !track.current) return;

    tween.current = gsap.to(track.current, {
      xPercent: -50,
      duration: 34,
      repeat: -1,
      ease: "none",
    });

    return () => {
      tween.current?.kill();
    };
  }, []);

  const pause = () => {
    if (!tween.current) return;
    const obj = { value: tween.current.timeScale() };
    gsap.to(obj, {
      value: 0,
      duration: 0.7,
      ease: "power2.out",
      overwrite: "auto",
      onUpdate: () => {
        tween.current?.timeScale(obj.value);
      }
    });
  };

  const resume = () => {
    if (!tween.current) return;
    const obj = { value: tween.current.timeScale() };
    gsap.to(obj, {
      value: 1,
      duration: 0.7,
      ease: "power2.inOut",
      overwrite: "auto",
      onUpdate: () => {
        tween.current?.timeScale(obj.value);
      }
    });
  };

  const repeatedItems = [...portfolioItems, ...portfolioItems];

  return (
    <div
      ref={containerRef}
      className="portfolio-viewport"
      onMouseEnter={pause}
      onMouseLeave={resume}
      style={{ position: "relative" }}
    >
      <div ref={track} className="portfolio-track">
        {repeatedItems.map((item, index) => (
          <PortfolioCard
            item={item}
            index={index}
            key={`${item.title}-${index}`}
          />
        ))}
      </div>

      {/* Global transparent WebGL canvas tracking all view portals */}
      <Canvas
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        eventSource={containerRef as any}
        camera={{ position: [0, 0, 1.8], fov: 45 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 10,
          pointerEvents: "none"
        }}
      >
        <View.Port />
      </Canvas>
    </div>
  );
}
