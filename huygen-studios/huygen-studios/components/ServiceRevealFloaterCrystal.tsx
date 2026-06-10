"use client";

import * as THREE from "three";
import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { motion, MotionValue, useMotionValue, useMotionValueEvent, useSpring, useTransform } from "framer-motion";
import {
  SERVICES_INNER,
  SERVICES_SHOWCASE_ROW_COUNT,
  serviceScrollPhase,
} from "@/lib/servicesScrollReveal";

// useGLTF.preload("/Violet_Crystal.glb");

const SIZE = 320; // Much larger crystal
const GAP = 0; 


function CrystalGlow() {
  const count = 30; // More particles for the large hub
  const meshRef = React.useRef<THREE.InstancedMesh>(null);
  const dummy = React.useMemo(() => new THREE.Object3D(), []);
  const seeds = React.useMemo(() => 
    Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 1.5,
      y: (Math.random() - 0.5) * 1.5,
      z: (Math.random() - 0.5) * 1.5,
      speed: 0.5 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
    })), [count]
  );

  useFrame(() => {
    if (!meshRef.current) return;
    const t = performance.now() / 1000;
    seeds.forEach((s, i) => {
      dummy.position.set(
        s.x + Math.sin(t * s.speed + s.phase) * 0.2,
        s.y + Math.cos(t * s.speed * 0.7 + s.phase) * 0.2,
        s.z + Math.sin(t * s.speed * 0.5) * 0.15
      );
      const scale = 0.015 + Math.sin(t * s.speed + s.phase) * 0.008;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#c8a8ff" transparent opacity={0.6} />
    </instancedMesh>
  );
}

// ── Drag state shared between CrystalGem and the Canvas wrapper ──
function VioletCrystalGem() {
  const { scene } = useGLTF("/Violet_Crystal_draco.glb", true);
  const model = React.useMemo(() => scene.clone(true), [scene]);

  React.useEffect(() => {
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.set(-center.x, -center.y, -center.z);
  }, [model]);

  const groupRef = React.useRef<THREE.Group>(null);

  // Drag rotation state
  const isDragging = React.useRef(false);
  const prevPointer = React.useRef({ x: 0, y: 0 });
  const dragRotX = React.useRef(0);
  const dragRotY = React.useRef(0);
  const idleAngle = React.useRef(0);

  // Pointer event handlers on the DOM canvas (via onPointerDown on the div wrapper)
  // We expose these via a ref so the wrapper can attach them
  const onCanvasPointerDown = React.useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    prevPointer.current = { x: e.clientX, y: e.clientY };
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    document.body.style.cursor = "grabbing";
    e.stopPropagation();
  }, []);

  const onCanvasPointerMove = React.useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const dx = e.clientX - prevPointer.current.x;
    const dy = e.clientY - prevPointer.current.y;
    prevPointer.current = { x: e.clientX, y: e.clientY };
    dragRotY.current += dx * 0.01;
    dragRotX.current += dy * 0.01;
    dragRotX.current = THREE.MathUtils.clamp(dragRotX.current, -1.2, 1.2);
    e.stopPropagation();
  }, []);

  const onCanvasPointerUp = React.useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = false;
    (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
    document.body.style.cursor = "grab";
    e.stopPropagation();
  }, []);

  const onCanvasPointerEnter = React.useCallback(() => {
    if (!isDragging.current) document.body.style.cursor = "grab";
  }, []);

  const onCanvasPointerLeave = React.useCallback(() => {
    if (!isDragging.current) document.body.style.cursor = "auto";
  }, []);

  // Expose handlers via the groupRef's userData so the parent can attach to the div
  React.useEffect(() => {
    if (groupRef.current) {
      groupRef.current.userData.handlers = {
        onPointerDown: onCanvasPointerDown,
        onPointerMove: onCanvasPointerMove,
        onPointerUp: onCanvasPointerUp,
        onPointerEnter: onCanvasPointerEnter,
        onPointerLeave: onCanvasPointerLeave,
      };
    }
  });

  useFrame((state, delta) => {
    const g = groupRef.current;
    if (!g) return;
    const t = performance.now() / 1000;
    // Spring-back drag rotation toward zero when not dragging
    if (!isDragging.current) {
      dragRotX.current = THREE.MathUtils.lerp(dragRotX.current, 0, 3 * delta);
      dragRotY.current = THREE.MathUtils.lerp(dragRotY.current, 0, 3 * delta);
    }

    // Idle auto-rotation (slow, continuous)
    idleAngle.current += delta * 0.75;

    g.rotation.x = dragRotX.current + Math.sin(t * 1.2) * 0.12;
    g.rotation.y = idleAngle.current + dragRotY.current;
    g.rotation.z = Math.cos(t * 0.9) * 0.08;

    // Subtle scale pulse
    const s = 1.4 + Math.sin(t * 1.8) * 0.06;
    g.scale.set(s, s, s);
  });

  return (
    <group ref={groupRef}>
      <primitive object={model} raycast={() => undefined} />
    </group>
  );
}

/** One small GLB crystal, fixed viewport position — follows whichever row anchor is active. */
export function ServiceRevealFloaterCrystal({
  anchorsRef,
  scrollYProgress,
  sectionOpacity,
  onLoaded,
}: {
  anchorsRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
  scrollYProgress: MotionValue<number>;
  sectionOpacity: MotionValue<number>;
  onLoaded?: () => void;
}) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const xValue = useSpring(0, { stiffness: 100, damping: 25 });
  const yValue = useSpring(0, { stiffness: 100, damping: 25 });
  const opacityValue = useSpring(0, { stiffness: 100, damping: 25 });
  const scaleValue = useSpring(1, { stiffness: 100, damping: 25 });
  const rotationZValue = useSpring(0, { stiffness: 100, damping: 25 });
  const sizeValue = useMotionValue(SIZE);

  const targetPoseRef = React.useRef<{ top: number; left: number; opacity: number; size: number; scaleMultiplier: number; rotationZ: number } | null>(null);
  const lastRepaintTimeRef = React.useRef(0);

  // Drag handlers refs
  const isDragging = React.useRef(false);
  const prevPointer = React.useRef({ x: 0, y: 0 });
  const dragState = React.useRef({ rotX: 0, rotY: 0, isDragging: false, scaleMultiplier: 1.0, rotationZ: 0 });

  const repaint = React.useCallback(() => {
    // Throttle: don't compute more than once per frame
    const time = performance.now();
    if (time - lastRepaintTimeRef.current < 16) return;
    lastRepaintTimeRef.current = time;

    const sp = scrollYProgress.get();
    const opBase = sectionOpacity.get();
    const total = SERVICES_SHOWCASE_ROW_COUNT;
    
    // Quick exit
    if (sp < SERVICES_INNER.start || sp > 0.935 || opBase < 0.02) {
      targetPoseRef.current = targetPoseRef.current ? { ...targetPoseRef.current, opacity: 0 } : null;
      return;
    }

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const isMobile = vw < 768;
    const isShort = vh < 850;
    const crystalSize = isShort ? 340 : (isMobile ? 280 : 480);

    let x = vw / 2 - crystalSize / 2;
    let y = vh * 0.52 - crystalSize / 2;
    let currentOpacity = Math.min(1, Math.max(0, opBase));
    let scaleMultiplier = 1.0;
    let rotationZ = 0;

    if (sp >= 0.78) {
      const slideProgress = Math.min(1, (sp - 0.78) / 0.05);
      const ease = slideProgress * slideProgress * (3 - 2 * slideProgress);
      const prevX = vw * 0.75 - crystalSize / 2;
      const targetLeftX = vw * 0.22 - crystalSize / 2;
      x = prevX + (targetLeftX - prevX) * ease;
      const prevY = vh * 0.50 - crystalSize / 2;
      const targetY = vh * 0.65 - crystalSize / 2;
      y = prevY + (targetY - prevY) * ease;
      scaleMultiplier = 1.6 + (ease * -0.2); 
      rotationZ = ease * (Math.PI / 2.2); 
    } else if (sp >= 0.61) {
      const slideProgress = Math.min(1, (sp - 0.61) / 0.11);
      const ease = slideProgress * slideProgress * (3 - 2 * slideProgress);
      const centerX = vw / 2 - crystalSize / 2;
      const rightX = vw * 0.75 - crystalSize / 2;
      x = centerX + (rightX - centerX) * ease;
      const targetY = vh * 0.50 - crystalSize / 2;
      y = y + (targetY - y) * ease;
      scaleMultiplier = 1.0 + (ease * 0.6);
      rotationZ = 0;
    } else {
      const rawPhase = serviceScrollPhase(sp, total);
      const phase = Math.min(total, rawPhase * 1.1);
      x = vw / 2 - crystalSize / 2;
      y = vh * 0.52 - crystalSize / 2;
    }
    
    targetPoseRef.current = {
      left: x,
      top: y,
      opacity: currentOpacity,
      size: crystalSize,
      scaleMultiplier: scaleMultiplier,
      rotationZ,
    };
  }, [anchorsRef, scrollYProgress, sectionOpacity]);


  // Update springs whenever target pose changes
  const updateSprings = React.useCallback(() => {
    repaint();
    const target = targetPoseRef.current;
    if (target) {
      xValue.set(target.left);
      yValue.set(target.top);
      opacityValue.set(target.opacity);
      scaleValue.set(target.scaleMultiplier);
      rotationZValue.set(target.rotationZ);
      sizeValue.set(target.size);
      
      dragState.current.scaleMultiplier = target.scaleMultiplier;
      dragState.current.rotationZ = target.rotationZ;
    }
  }, [repaint, xValue, yValue, opacityValue, scaleValue, rotationZValue, sizeValue]);

  const [shouldRenderCanvas, setShouldRenderCanvas] = React.useState(false);
  
  React.useEffect(() => {
    const unsubscribe = opacityValue.on("change", (v) => {
      setShouldRenderCanvas(prev => {
        const visible = v > 0.001;
        return visible !== prev ? visible : prev;
      });
    });
    return unsubscribe;
  }, [opacityValue]);

  useMotionValueEvent(scrollYProgress, "change", updateSprings);
  useMotionValueEvent(sectionOpacity, "change", updateSprings);

  React.useEffect(() => {
    updateSprings();
    window.addEventListener("resize", updateSprings);
    return () => window.removeEventListener("resize", updateSprings);
  }, [updateSprings]);


  const handlePointerDown = React.useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    dragState.current.isDragging = true;
    prevPointer.current = { x: e.clientX, y: e.clientY };
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    document.body.style.cursor = "grabbing";
    e.stopPropagation();
  }, []);

  const handlePointerMove = React.useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const dx = e.clientX - prevPointer.current.x;
    const dy = e.clientY - prevPointer.current.y;
    prevPointer.current = { x: e.clientX, y: e.clientY };
    dragState.current.rotY += dx * 0.01;
    dragState.current.rotX = THREE.MathUtils.clamp(
      dragState.current.rotX + dy * 0.01,
      -1.2, 1.2
    );
    e.stopPropagation();
  }, []);

  const handlePointerUp = React.useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = false;
    dragState.current.isDragging = false;
    (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
    document.body.style.cursor = "grab";
    e.stopPropagation();
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      style={{
        position: "absolute",
        width: sizeValue,
        height: sizeValue,
        left: xValue,
        top: yValue,
        opacity: opacityValue,
        zIndex: 150,
        overflow: "visible",
        cursor: "grab",
      }}
      aria-hidden
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerEnter={() => { document.body.style.cursor = "grab"; }}
      onPointerLeave={() => { if (!isDragging.current) document.body.style.cursor = "auto"; }}
    >
      {shouldRenderCanvas && (
        <Canvas
        key="service-reveal-mini-crystal"
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          zIndex: 1,
          // Prevent canvas from swallowing pointer capture — handled by wrapper div
          pointerEvents: "none",
        }}
        dpr={1.5}
      >
        <React.Suspense fallback={null}>
          <ambientLight intensity={5} />
          <directionalLight position={[5, 5, 5]} intensity={15} color="#ede0ff" />
          <pointLight position={[-3, -3, 2]} intensity={25} color="#b090ff" distance={10} />
          <InteractiveCrystalGem dragState={dragState} onLoaded={onLoaded} />
        </React.Suspense>
      </Canvas>
      )}
    </motion.div>
  );
}

// ── Separate component so useFrame can access dragState ref directly ──
function InteractiveCrystalGem({
  dragState,
  onLoaded,
}: {
  dragState: React.MutableRefObject<{ rotX: number; rotY: number; isDragging: boolean; scaleMultiplier: number; rotationZ: number }>;
  onLoaded?: () => void;
}) {
  const { scene } = useGLTF("/Violet_Crystal_draco.glb", true);
  const model = React.useMemo(() => scene.clone(true), [scene]);

  React.useEffect(() => {
    if (scene && onLoaded) {
      onLoaded();
    }
  }, [scene, onLoaded]);

  React.useEffect(() => {
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.set(-center.x, -center.y, -center.z);
  }, [model]);

  const groupRef = React.useRef<THREE.Group>(null);
  const idleAngle = React.useRef(0);

  useFrame((state, delta) => {
    const g = groupRef.current;
    if (!g) return;
    const t = performance.now() / 1000;
    const ds = dragState.current;

    // Spring-back drag rotation toward zero when not dragging
    if (!ds.isDragging) {
      ds.rotX = THREE.MathUtils.lerp(ds.rotX, 0, 3 * delta);
      ds.rotY = THREE.MathUtils.lerp(ds.rotY, 0, 3 * delta);
    }

    // Idle auto-rotation (slows noticeably while dragging for responsiveness)
    const idleSpeed = ds.isDragging ? 0.1 : 0.75;
    idleAngle.current += delta * idleSpeed;

    g.rotation.x = ds.rotX + Math.sin(t * 1.2) * 0.12;
    g.rotation.y = idleAngle.current + ds.rotY;
    g.rotation.z = Math.cos(t * 0.9) * 0.08 - ds.rotationZ; // Apply horizontal rotation shift!

    // Subtle scale pulse combined with base scale
    const baseScale = ds.scaleMultiplier || 1.0;
    const pulse = Math.sin(t * 1.8) * 0.06;
    const s = (1.1 + pulse) * baseScale; // Reduced base scale from 1.4 to 1.1 to prevent frustum clipping
    g.scale.set(s, s, s);
  });

  return (
    <group ref={groupRef}>
      <primitive object={model} raycast={() => undefined} />
    </group>
  );
}
