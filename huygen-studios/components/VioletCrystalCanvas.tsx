"use client";

import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { useGLTF, Environment, Center } from "@react-three/drei";
import { MotionValue } from "framer-motion";
import { useRef, useEffect, useCallback, useState } from "react";
import * as THREE from "three";
import {
  SERVICES_SHOWCASE_ROW_COUNT,
  computeZigzagCrystalX,
  zigzagCrystalXAtInnerEnd,
  CRYSTAL_ZIGZAG_HANDOFF,
} from "@/lib/servicesScrollReveal";

/* Scroll-linked crystal: zig-zags with each service reveal, then settles right for Process/Pricing.
 * Visibility envelope unchanged: ~0.43–0.68 on page progress. */

const LEFT_X = -5.0;
const RIGHT_X = 4.5;
const LEFT_SCALE = 1.3;
const RIGHT_SCALE = 1.6;

// ───────────────────── Crystal Model ─────────────────────
function CrystalModel({
  progress,
  serviceRowCount,
}: {
  progress: MotionValue<number>;
  serviceRowCount: number;
}) {
  const { scene } = useGLTF("/Violet_Crystal_draco.glb", true);
  const groupRef = useRef<THREE.Group>(null);

  // Slow idle auto-rotation
  const idleAngle = useRef(0);

  // ── Drag state (manual, directly on the mesh) ──
  const isDragging = useRef(false);
  const prevPointer = useRef({ x: 0, y: 0 });
  const dragRotation = useRef(new THREE.Euler(0, 0, 0));
  const [hovered, setHovered] = useState(false);

  // Ensure geometry is centered at origin once
  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const c = box.getCenter(new THREE.Vector3());
    scene.position.set(-c.x, -c.y, -c.z);
  }, [scene]);

  // ── Per-frame: position, scale, rotation ──
  useFrame((_, delta) => {
    const g = groupRef.current;
    if (!g) return;
    const p = progress.get();

    // ── 1. Compute target position & scale ──
    let targetX = LEFT_X;
    let targetScale = LEFT_SCALE;

    const n = Math.max(1, serviceRowCount);
    const zigEndX = zigzagCrystalXAtInnerEnd(n, LEFT_X, RIGHT_X);

    if (p < CRYSTAL_ZIGZAG_HANDOFF.start) {
      targetX = computeZigzagCrystalX(p, n, LEFT_X, RIGHT_X);
      targetScale = LEFT_SCALE;
    } else if (p < CRYSTAL_ZIGZAG_HANDOFF.end) {
      const raw = (p - CRYSTAL_ZIGZAG_HANDOFF.start) /
        (CRYSTAL_ZIGZAG_HANDOFF.end - CRYSTAL_ZIGZAG_HANDOFF.start);
      const t = raw * raw * (3 - 2 * raw);
      targetX = THREE.MathUtils.lerp(zigEndX, RIGHT_X, t);
      targetScale = THREE.MathUtils.lerp(LEFT_SCALE, RIGHT_SCALE, t);
    } else {
      targetX = RIGHT_X;
      targetScale = RIGHT_SCALE;
    }

    // ── 2. Visibility envelope ──
    if (p > 0.43 && p < 0.68) {
      let visibilityMult = 1;
      if (p < 0.45) visibilityMult = (p - 0.43) / 0.02;
      else if (p > 0.66) visibilityMult = (0.68 - p) / 0.02;
      visibilityMult = THREE.MathUtils.clamp(visibilityMult, 0, 1);

      const finalScale = visibilityMult * targetScale;

      // Smooth interpolation (heavy-feeling, 60fps safe)
      g.position.x = THREE.MathUtils.lerp(g.position.x, targetX, 6 * delta);
      g.position.y = THREE.MathUtils.lerp(g.position.y, 0, 6 * delta);
      g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, finalScale, 6 * delta));

      g.visible = finalScale > 0.01;
    } else {
      g.visible = false;
      return; // skip rotation math
    }

    // ── 3. Rotation ──
    // Idle rotation (slow continuous spin)
    idleAngle.current += delta * 0.3;

    // Spring-back drag rotation toward zero
    if (!isDragging.current) {
      dragRotation.current.x = THREE.MathUtils.lerp(dragRotation.current.x, 0, 4 * delta);
      dragRotation.current.y = THREE.MathUtils.lerp(dragRotation.current.y, 0, 4 * delta);
    }

    g.rotation.set(
      dragRotation.current.x + Math.sin(idleAngle.current * 0.4) * 0.08,
      idleAngle.current + dragRotation.current.y,
      0
    );
  });

  // ── Pointer handlers (bound to the mesh via R3F raycast) ──
  const onPointerDown = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    isDragging.current = true;
    const pe = (e as unknown as { nativeEvent: PointerEvent }).nativeEvent;
    prevPointer.current = { x: pe.clientX, y: pe.clientY };

    // Capture pointer on the canvas DOM element
    const target = pe.target;
    if (target instanceof HTMLElement) {
      target.setPointerCapture(pe.pointerId);
    }
    document.body.style.cursor = "grabbing";
  }, []);

  const onPointerMove = useCallback((e: ThreeEvent<PointerEvent>) => {
    if (!isDragging.current) return;
    e.stopPropagation();
    const pe = (e as unknown as { nativeEvent: PointerEvent }).nativeEvent;
    const dx = pe.clientX - prevPointer.current.x;
    const dy = pe.clientY - prevPointer.current.y;
    prevPointer.current = { x: pe.clientX, y: pe.clientY };

    dragRotation.current.y += dx * 0.008;
    dragRotation.current.x += dy * 0.008;
    // Clamp vertical drag so crystal doesn't flip
    dragRotation.current.x = THREE.MathUtils.clamp(dragRotation.current.x, -1, 1);
  }, []);

  const onPointerUp = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    isDragging.current = false;
    const pe = (e as unknown as { nativeEvent: PointerEvent }).nativeEvent;
    const target = pe.target;
    if (target instanceof HTMLElement && target.hasPointerCapture(pe.pointerId)) {
      target.releasePointerCapture(pe.pointerId);
    }
    document.body.style.cursor = hovered ? "grab" : "auto";
  }, [hovered]);

  const onPointerOver = useCallback(() => {
    setHovered(true);
    if (!isDragging.current) document.body.style.cursor = "grab";
  }, []);

  const onPointerOut = useCallback(() => {
    setHovered(false);
    if (!isDragging.current) document.body.style.cursor = "auto";
  }, []);

  // Cleanup cursor
  useEffect(() => () => { document.body.style.cursor = "auto"; }, []);

  return (
    <group ref={groupRef} position={[LEFT_X, 0, 0]} visible={false}>
      <Center>
        <primitive
          object={scene}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerOver={onPointerOver}
          onPointerOut={onPointerOut}
        />
      </Center>
    </group>
  );
}

// ───────────────────── Ambient glow particles ─────────────────────
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function GlowParticles({
  progress,
  serviceRowCount,
}: {
  progress: MotionValue<number>;
  serviceRowCount: number;
}) {
  const count = 40;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useRef(new THREE.Object3D());
  const seeds = useRef<{ x: number; y: number; z: number; speed: number; phase: number }[]>([]);

  useEffect(() => {
    seeds.current = Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 8,
      y: (Math.random() - 0.5) * 5,
      z: (Math.random() - 0.5) * 4,
      speed: 0.2 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const p = progress.get();
    const visible = p > 0.43 && p < 0.68;
    meshRef.current.visible = visible;
    if (!visible) return;

    const n = Math.max(1, serviceRowCount);
    const zigEndX = zigzagCrystalXAtInnerEnd(n, LEFT_X, RIGHT_X);
    let crystalX = LEFT_X;
    if (p < CRYSTAL_ZIGZAG_HANDOFF.start) {
      crystalX = computeZigzagCrystalX(p, n, LEFT_X, RIGHT_X);
    } else if (p < CRYSTAL_ZIGZAG_HANDOFF.end) {
      const raw = (p - CRYSTAL_ZIGZAG_HANDOFF.start) /
        (CRYSTAL_ZIGZAG_HANDOFF.end - CRYSTAL_ZIGZAG_HANDOFF.start);
      const t = raw * raw * (3 - 2 * raw);
      crystalX = THREE.MathUtils.lerp(zigEndX, RIGHT_X, t);
    } else {
      crystalX = RIGHT_X;
    }

    const t = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const s = seeds.current[i];
      if (!s) continue;
      dummy.current.position.set(
        crystalX + s.x + Math.sin(t * s.speed + s.phase) * 0.6,
        s.y + Math.cos(t * s.speed * 0.7 + s.phase) * 0.4,
        s.z + Math.sin(t * s.speed * 0.5) * 0.3
      );
      const scale = 0.02 + Math.sin(t * s.speed + s.phase) * 0.01;
      dummy.current.scale.setScalar(scale);
      dummy.current.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.current.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#c8a8ff" transparent opacity={0.4} />
    </instancedMesh>
  );
}

// ───────────────────── Canvas wrapper ─────────────────────
export function VioletCrystalCanvas({
  scrollYProgress,
  serviceRowCount = SERVICES_SHOWCASE_ROW_COUNT,
}: {
  scrollYProgress: MotionValue<number>;
  serviceRowCount?: number;
}) {
  const nRows = Math.max(1, serviceRowCount);

  return (
    <div className="absolute inset-0 z-[5] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        style={{ width: "100%", height: "100%", pointerEvents: "auto" }}
        dpr={[1, 1.25]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        {/* Lighting — premium three-point setup */}
        <ambientLight intensity={2.5} />
        <directionalLight position={[5, 8, 5]} intensity={6} color="#c8a8ff" />
        <directionalLight position={[-5, -5, 5]} intensity={3} color="#ffffff" />
        <directionalLight position={[0, 0, -8]} intensity={2} color="#a67cff" />
        <pointLight position={[0, 2, 5]} intensity={4} color="#d8b4ff" distance={15} decay={2} />

        <Environment preset="studio" />

        <CrystalModel progress={scrollYProgress} serviceRowCount={nRows} />
      </Canvas>
    </div>
  );
}

// useGLTF.preload("/Violet_Crystal.glb");
