"use client";

import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import {
  MotionValue,
  motion,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";

type CrystalPose = {
  progress: number;
  x: number;
  y: number;
  scale: number;
  rotationZ: number;
  opacity: number;
};

type ModelPose = {
  scale: number;
};

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

const catmullRom = (
  previous: number,
  start: number,
  end: number,
  next: number,
  amount: number
) => {
  const amountSquared = amount * amount;
  const amountCubed = amountSquared * amount;

  return (
    0.5 *
    (2 * start +
      (-previous + end) * amount +
      (2 * previous - 5 * start + 4 * end - next) * amountSquared +
      (-previous + 3 * start - 3 * end + next) * amountCubed)
  );
};

const samplePose = (poses: CrystalPose[], progress: number): CrystalPose => {
  if (progress <= poses[0].progress) return poses[0];
  if (progress >= poses[poses.length - 1].progress) {
    return poses[poses.length - 1];
  }

  const segmentIndex = poses.findIndex(
    (pose, index) =>
      index < poses.length - 1 &&
      progress >= pose.progress &&
      progress <= poses[index + 1].progress
  );
  const index = Math.max(0, segmentIndex);
  const previous = poses[Math.max(0, index - 1)];
  const start = poses[index];
  const end = poses[index + 1];
  const next = poses[Math.min(poses.length - 1, index + 2)];
  const amount = clamp01(
    (progress - start.progress) / (end.progress - start.progress)
  );

  return {
    progress,
    x: catmullRom(previous.x, start.x, end.x, next.x, amount),
    y: catmullRom(previous.y, start.y, end.y, next.y, amount),
    scale: catmullRom(
      previous.scale,
      start.scale,
      end.scale,
      next.scale,
      amount
    ),
    rotationZ: catmullRom(
      previous.rotationZ,
      start.rotationZ,
      end.rotationZ,
      next.rotationZ,
      amount
    ),
    opacity: clamp01(
      catmullRom(
        previous.opacity,
        start.opacity,
        end.opacity,
        next.opacity,
        amount
      )
    ),
  };
};

export function ServiceRevealFloaterCrystal({
  scrollYProgress,
  sectionOpacity,
  servicesRange,
  processRange,
  pricingRange,
  onLoaded,
}: {
  anchorsRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
  scrollYProgress: MotionValue<number>;
  sectionOpacity: MotionValue<number>;
  servicesRange: [number, number, number, number];
  processRange: [number, number];
  pricingRange: [number, number];
  onLoaded?: () => void;
}) {
  const [mounted, setMounted] = React.useState(false);
  const left = useMotionValue(0);
  const top = useMotionValue(0);
  const opacity = useMotionValue(0);
  const size = useMotionValue(440);
  const rotation = useMotionValue(0);
  const modelPose = React.useRef<ModelPose>({ scale: 1 });

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const updatePose = React.useCallback(() => {
    if (typeof window === "undefined") return;

    const progress = scrollYProgress.get();
    const [
      servicesStart,
      servicesInnerStart,
      servicesInnerEnd,
      servicesEnd,
    ] = servicesRange;
    const [processStart, processEnd] = processRange;
    const [pricingStart, pricingEnd] = pricingRange;
    const processReveal = THREE.MathUtils.lerp(
      processStart,
      processEnd,
      0.12
    );
    const processFirstTurn = THREE.MathUtils.lerp(
      processStart,
      processEnd,
      0.36
    );
    const processSecondTurn = THREE.MathUtils.lerp(
      processStart,
      processEnd,
      0.68
    );
    const pricingArrive = THREE.MathUtils.lerp(
      pricingStart,
      pricingEnd,
      0.18
    );
    const pricingHold = THREE.MathUtils.lerp(
      pricingStart,
      pricingEnd,
      0.82
    );

    const poses: CrystalPose[] = [
      {
        progress: servicesStart,
        x: 0.5,
        y: 0.57,
        scale: 0.9,
        rotationZ: 0,
        opacity: 0,
      },
      {
        progress: servicesInnerStart,
        x: 0.5,
        y: 0.515,
        scale: 1,
        rotationZ: 0,
        opacity: 1,
      },
      {
        progress: servicesInnerEnd,
        x: 0.5,
        y: 0.49,
        scale: 1.04,
        rotationZ: THREE.MathUtils.degToRad(3),
        opacity: 1,
      },
      {
        progress: servicesEnd,
        x: 0.5,
        y: 0.54,
        scale: 1.02,
        rotationZ: THREE.MathUtils.degToRad(3),
        opacity: 0,
      },
      {
        progress: processStart,
        x: 0.64,
        y: 0.56,
        scale: 1.12,
        rotationZ: THREE.MathUtils.degToRad(5),
        opacity: 0,
      },
      {
        progress: processReveal,
        x: 0.76,
        y: 0.49,
        scale: 1.26,
        rotationZ: THREE.MathUtils.degToRad(7),
        opacity: 1,
      },
      {
        progress: processFirstTurn,
        x: 0.82,
        y: 0.4,
        scale: 1.38,
        rotationZ: THREE.MathUtils.degToRad(5),
        opacity: 1,
      },
      {
        progress: processSecondTurn,
        x: 0.7,
        y: 0.57,
        scale: 1.46,
        rotationZ: THREE.MathUtils.degToRad(-7),
        opacity: 1,
      },
      {
        progress: processEnd,
        x: 0.82,
        y: 0.43,
        scale: 1.5,
        rotationZ: THREE.MathUtils.degToRad(-14),
        opacity: 1,
      },
      {
        progress: pricingStart,
        x: 0.82,
        y: 0.43,
        scale: 1.5,
        rotationZ: THREE.MathUtils.degToRad(-14),
        opacity: 1,
      },
      {
        progress: pricingArrive,
        x: 0.38,
        y: 0.55,
        scale: 0.86,
        rotationZ: THREE.MathUtils.degToRad(-82),
        opacity: 0.92,
      },
      {
        progress: pricingHold,
        x: 0.36,
        y: 0.55,
        scale: 0.82,
        rotationZ: THREE.MathUtils.degToRad(-90),
        opacity: 0.82,
      },
      {
        progress: pricingEnd,
        x: 0.36,
        y: 0.56,
        scale: 0.78,
        rotationZ: THREE.MathUtils.degToRad(-90),
        opacity: 0,
      },
    ];

    if (progress < servicesStart || progress > pricingEnd) {
      opacity.set(0);
      return;
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const compact = viewportWidth < 1024;
    const crystalSize =
      viewportHeight < 760 ? 340 : viewportWidth < 1280 ? 400 : 480;
    const pose = samplePose(poses, progress);
    if (progress <= servicesInnerEnd) {
      pose.x = 0.5;
    }

    left.set(viewportWidth * pose.x - crystalSize / 2);
    top.set(viewportHeight * pose.y - crystalSize / 2);
    size.set(crystalSize);
    opacity.set(
      compact && progress >= processStart
        ? 0
        : pose.opacity
    );
    rotation.set(THREE.MathUtils.radToDeg(pose.rotationZ));
    modelPose.current.scale = pose.scale;
  }, [
    opacity,
    pricingRange,
    processRange,
    rotation,
    scrollYProgress,
    sectionOpacity,
    servicesRange,
    size,
    left,
    top,
  ]);

  useMotionValueEvent(scrollYProgress, "change", updatePose);
  useMotionValueEvent(sectionOpacity, "change", updatePose);

  React.useEffect(() => {
    updatePose();
    window.addEventListener("resize", updatePose);
    return () => window.removeEventListener("resize", updatePose);
  }, [updatePose]);

  if (!mounted) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute z-[8] overflow-visible"
      style={{
        left: 0,
        top: 0,
        x: left,
        y: top,
        rotate: rotation,
        width: size,
        height: size,
        opacity,
        willChange: "transform, opacity",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        dpr={[1, 1.25]}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
        }}
        performance={{ min: 0.75 }}
        style={{ width: "100%", height: "100%", pointerEvents: "none" }}
      >
        <React.Suspense fallback={null}>
          <ambientLight intensity={5} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={15}
            color="#ede0ff"
          />
          <pointLight
            position={[-3, -3, 2]}
            intensity={25}
            color="#b090ff"
            distance={10}
          />
          <AnimatedCrystal modelPose={modelPose} onLoaded={onLoaded} />
        </React.Suspense>
      </Canvas>
    </motion.div>
  );
}

function AnimatedCrystal({
  modelPose,
  onLoaded,
}: {
  modelPose: React.MutableRefObject<ModelPose>;
  onLoaded?: () => void;
}) {
  const { scene } = useGLTF("/Violet_Crystal_draco.glb", true);
  const model = React.useMemo(() => scene.clone(true), [scene]);
  const groupRef = React.useRef<THREE.Group>(null);
  const idleRotation = React.useRef(0);

  React.useEffect(() => {
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.set(-center.x, -center.y, -center.z);
    onLoaded?.();
  }, [model, onLoaded]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const frameDelta = Math.min(delta, 1 / 30);
    const damping = 1 - Math.exp(-10 * frameDelta);
    const elapsed = state.clock.elapsedTime;
    idleRotation.current += frameDelta * 0.22;

    group.rotation.x = THREE.MathUtils.lerp(
      group.rotation.x,
      Math.sin(elapsed * 0.65) * 0.035,
      damping
    );
    group.rotation.y = idleRotation.current;
    group.rotation.z = Math.cos(elapsed * 0.55) * 0.02;

    const targetScale = 1.1 * modelPose.current.scale;
    const nextScale = THREE.MathUtils.lerp(
      group.scale.x,
      targetScale,
      damping
    );
    group.scale.setScalar(nextScale);
  });

  return (
    <group ref={groupRef}>
      <primitive object={model} raycast={() => undefined} />
    </group>
  );
}

useGLTF.preload("/Violet_Crystal_draco.glb", true);
