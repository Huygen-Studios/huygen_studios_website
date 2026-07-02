"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { BouncingDots } from "@/components/ui/bouncing-dots";
import { ArrowRight } from "lucide-react";
const ProcessShowcase = dynamic(() => import("./ProcessShowcase").then(mod => mod.ProcessShowcase), { ssr: false });
import dynamic from "next/dynamic";
import { SiteNav } from "@/components/SiteNav";
import { StickyBottomMenu } from "@/components/StickyBottomMenu";

const ServicesShowcase = dynamic(() => import("./ServicesShowcase").then(mod => mod.ServicesShowcase), { ssr: false });
const PricingSection = dynamic(() => import("./PricingSection").then(mod => mod.PricingSection), { ssr: false });

const ServiceRevealFloaterCrystal = dynamic(() => import("./ServiceRevealFloaterCrystal").then(mod => mod.ServiceRevealFloaterCrystal), {
  ssr: false,
});
import { ShineHoverButton } from "@/components/ui/shine-hover";

/*
 * Full 794-frame sequence:
 * 1-10:    Black → crystal emerging
 * 10-100:  Crystal grows, purple glow
 * 100-200: Crystal full-size, rotating with particles
 * 200-330: Crystal transforms → 3 crystals (bronze/silver/gold)
 * 330-500: Dark transition
 * 500-630: Moon approach
 * 630-750: Moon + asteroids → Earth
 * 750-794: Earth close-up with city lights
 */
const SOURCE_MAX_FRAME = 794;
const SKIPPED_SOURCE_RANGES = [{ start: 249, end: 329 }, { start: 651, end: 730 }] as const;
const SKIPPED_FRAME_COUNT = SKIPPED_SOURCE_RANGES.reduce(
  (total, range) => total + range.end - range.start + 1,
  0
);
const LOGICAL_MAX_FRAME = SOURCE_MAX_FRAME - SKIPPED_FRAME_COUNT;
const PX_PER_FRAME = 10;
const SCROLL_DISTANCE = (LOGICAL_MAX_FRAME - 1) * PX_PER_FRAME;
const FRAME_STEP = 12;
const MAX_TARGET_AHEAD = 24;
const MAX_FRAME_SPEED = 8;
const WHEEL_THROTTLE_MS = 45;
const FRAME_PATH = "/huygen-sequence";
const PRELOAD_BEHIND = 30;
const PRELOAD_AHEAD = 90;
const PRIORITY_RANGE = 120;
const MAX_CONCURRENT_LOADS = 6;
const MAX_DECODED_FRAMES = 360;
const DEBUG_SEQUENCE = false;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const sourceToLogicalFrame = (sourceFrame: number) => {
  const clampedSource = clamp(Math.round(sourceFrame), 1, SOURCE_MAX_FRAME);
  let skippedBefore = 0;

  for (const range of SKIPPED_SOURCE_RANGES) {
    if (clampedSource > range.end) {
      skippedBefore += range.end - range.start + 1;
    } else if (clampedSource >= range.start) {
      return range.start - 1 - skippedBefore;
    }
  }

  return clampedSource - skippedBefore;
};

const logicalToSourceFrame = (logicalFrame: number) => {
  const clampedLogical = clamp(Math.round(logicalFrame), 1, LOGICAL_MAX_FRAME);
  let sourceFrame = clampedLogical;

  for (const range of SKIPPED_SOURCE_RANGES) {
    const logicalRangeStart = range.start -
      SKIPPED_SOURCE_RANGES
        .filter((candidate) => candidate.end < range.start)
        .reduce(
          (total, candidate) =>
            total + candidate.end - candidate.start + 1,
          0
        );
    if (clampedLogical >= logicalRangeStart) {
      sourceFrame += range.end - range.start + 1;
    }
  }

  return clamp(sourceFrame, 1, SOURCE_MAX_FRAME);
};

const sourceFrameToProgress = (sourceFrame: number) =>
  (sourceToLogicalFrame(sourceFrame) - 1) / (LOGICAL_MAX_FRAME - 1);

const computeLinearOpacity = (
  value: number,
  [inStart, inEnd, outStart, outEnd]: [number, number, number, number]
) => {
  if (value < inStart || value > outEnd) return 0;
  if (value >= inEnd && value <= outStart) return 1;
  if (value >= inStart && value < inEnd) {
    return (value - inStart) / (inEnd - inStart);
  }
  if (value > outStart && value <= outEnd) {
    return 1 - (value - outStart) / (outEnd - outStart);
  }
  return 0;
};

const SERVICES_RANGE = {
  start: 320,
  innerStart: 336,
  innerEnd: 500,
  end: 555,
} as const;
const PROCESS_RANGE = {
  start: 566,
  fadeInEnd: 572,
  stepsStart: 574,
  stepsEnd: 618,
  fadeOutStart: 621,
  end: 626,
} as const;
const PRICING_RANGE = {
  start: 627,
  fadeInEnd: 638,
  fadeOutStart: 780,
  end: 790,
} as const;

const getFrameSrc = (sourceIndex: number) => {
  // Frames are 1-indexed: frame00001.jpg ... frame00794.jpg
  const padded = String(sourceIndex + 1).padStart(5, "0");
  return `${FRAME_PATH}/frame${padded}.webp`;
};

type StoryBeat = {
  heading: string;
  body: string;
  cta?: { label: string; href: string };
  secondary?: string;
  eyebrow?: string;
  position: "center" | "left" | "right" | "three-columns";
  columns?: { heading: string; body: string }[];
  /** Exit slide direction — overrides default slide-up exit */
  exitDirection?: "up" | "down" | "right" | "left";
  /** [fadeIn-start, fadeIn-end, fadeOut-start, fadeOut-end] as scroll-progress 0–1 */
  opacityRange: [number, number, number, number];
};

/*
 * BEAT LAYOUT — mapped to the 794-frame visual arc:
 *
 * Beat 0 (Branding):   frames 1–130  = progress 0.00–0.16
 *   Crystal is small/centered. Branding text in center, well above/below crystal.
 *
 * Beat 1 (Systems):    frames 100–230 = progress 0.12–0.29
 *   Crystal is fully grown with particles. Text on RIGHT to avoid center crystal.
 *
 * Beat 2 (Modules):    frames 200–350 = progress 0.25–0.44
 *   Three crystals spread horizontally. Text on RIGHT.
 *
 * Beat 3 (Transition): frames 450–600 = progress 0.56–0.75
 *   Dark/moon approach. Center text.
 *
 * Beat 4 (Final CTA):  frames 700–794 = progress 0.88–1.0
 *   Earth with city lights. Center text.
 */
const STORY_BEATS: StoryBeat[] = [
  // ... earlier beats remain the same
  {
    eyebrow: "Automation with imagination.",
    heading: "Huygen Studios",
    body: "AI systems, voice agents, and cinematic web experiences built to remove business bottlenecks.",
    position: "center",
    opacityRange: [0, 0, sourceFrameToProgress(48), sourceFrameToProgress(72)],
  },
  {
    heading: "Systems that\nwake up.",
    body: "WhatsApp flows, lead qualification, reminders, booking, and follow-ups begin working as one connected engine.",
    position: "right",
    exitDirection: "down",
    opacityRange: [
      sourceFrameToProgress(72),
      sourceFrameToProgress(82),
      sourceFrameToProgress(131),
      sourceFrameToProgress(139),
    ],
  },
  {
    eyebrow: "Built different.",
    heading: "Not an agency.\nAn operating system.",
    body: "Most agencies hand you deliverables. We hand you infrastructure — voice agents, automation pipelines, and web systems that run autonomously so your team focuses on growth, not operations.",
    position: "right",
    exitDirection: "right",
    opacityRange: [
      sourceFrameToProgress(154),
      sourceFrameToProgress(163),
      sourceFrameToProgress(237),
      sourceFrameToProgress(248),
    ],
  }
];

export function HuygenScroll({
  reducedMotion = false,
}: {
  reducedMotion?: boolean;
}) {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameCounterRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const pendingFramesRef = useRef(new Set<number>());
  const preloadWindowRef = useRef<(center: number) => void>(() => {});
  const requestFrameRef = useRef<(index: number, highPriority?: boolean) => void>(
    () => {}
  );
  const currentFrameRef = useRef(1);
  const targetFrameRef = useRef(1);
  const displayedFrameRef = useRef(0);
  const lastRequestedFrameRef = useRef(0);
  const controllerRafRef = useRef<number | null>(null);
  const lastWheelAtRef = useRef(0);
  const isSyncingScrollRef = useRef(false);
  const resizeRafRef = useRef<number>(0);
  const loadedFrameCountRef = useRef(0);
  const scrollProgressRef = useRef(0);
  const debugFrameHistoryRef = useRef<number[]>([]);
  const drawFailureRef = useRef("none");
  const dprRef = useRef(1);

  useEffect(() => {
    const updateDpr = () => {
      const maxDpr =
        window.innerWidth < 1400 || window.innerHeight < 800 ? 1.25 : 1.5;
      dprRef.current = Math.min(window.devicePixelRatio || 1, maxDpr);
    };
    updateDpr();
    const handleResize = () => {
      updateDpr();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const scrollYProgress = useMotionValue(0);

  // Final loading handler
  useEffect(() => {
    if (assetsLoaded && displayProgress >= 99) {
      // Very short delay to ensure display reaches 100 before unmounting
      setTimeout(() => {
        setLoading(false);
      }, 50);
    }
  }, [assetsLoaded, displayProgress]);


  const realProgressRef = useRef(0);
  const displayProgressRef = useRef(0);

  // Smoothly interpolate the display progress towards the real progress
  useEffect(() => {
    realProgressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    if (!loading) return;

    let animationFrameId: number;
    const update = () => {
      const diff = realProgressRef.current - displayProgressRef.current;
      if (Math.abs(diff) > 0.1) {
        displayProgressRef.current += diff * 0.15; // 3x faster interpolation
        setDisplayProgress(displayProgressRef.current);
      } else if (displayProgressRef.current !== realProgressRef.current) {
        displayProgressRef.current = realProgressRef.current;
        setDisplayProgress(displayProgressRef.current);
      }
      animationFrameId = requestAnimationFrame(update);
    };
    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, [loading]);


  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[frameIndex];

    if (!canvas) {
      drawFailureRef.current = "canvas";
      return false;
    }
    if (!ctx) {
      drawFailureRef.current = "context";
      return false;
    }
    if (!img) {
      drawFailureRef.current = "image";
      return false;
    }
    if (!img.complete || img.naturalWidth === 0) {
      drawFailureRef.current = "decode";
      return false;
    }
    drawFailureRef.current = "none";

    const dpr = dprRef.current;
    const { innerWidth: w, innerHeight: h } = window;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = w / h;
    let drawW: number;
    let drawH: number;
    let drawX: number;
    let drawY: number;

    if (imgRatio > canvasRatio) {
      drawH = h;
      drawW = h * imgRatio;
      drawX = (w - drawW) / 2;
      drawY = 0;
    } else {
      drawW = w;
      drawH = w / imgRatio;
      drawX = 0;
      drawY = (h - drawH) / 2;
    }

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    return true;
  }, []);

  const updateDebugOverlay = useCallback((sourceIndex: number) => {
    if (!frameCounterRef.current) return;
    if (
      debugFrameHistoryRef.current.at(-1) !== sourceIndex
    ) {
      debugFrameHistoryRef.current.push(sourceIndex);
      if (debugFrameHistoryRef.current.length > 120) {
        debugFrameHistoryRef.current.shift();
      }
      frameCounterRef.current.dataset.frameHistory =
        debugFrameHistoryRef.current.join(",");
    }
    frameCounterRef.current.textContent =
      `LOGICAL ${String(Math.round(currentFrameRef.current)).padStart(5, "0")} / ${LOGICAL_MAX_FRAME}` +
      ` | TARGET ${String(Math.round(targetFrameRef.current)).padStart(5, "0")} / ${LOGICAL_MAX_FRAME}` +
      ` | SOURCE ${String(sourceIndex + 1).padStart(5, "0")} / ${SOURCE_MAX_FRAME}` +
      ` | PX_PER_FRAME ${PX_PER_FRAME}` +
      ` | SCROLL_DISTANCE ${SCROLL_DISTANCE}px` +
      ` | PROGRESS ${(scrollProgressRef.current * 100).toFixed(1)}%` +
      ` | LOADED ${loadedFrameCountRef.current}` +
      ` | CACHE ${imagesRef.current.filter(Boolean).length}` +
      ` | RAF ${controllerRafRef.current !== null ? "on" : "off"}` +
      ` | DRAW ${drawFailureRef.current}` +
      ` | SKIP SOURCE 651-730`;
  }, []);

  // Keep only a small decoded window around the current frame.
  useEffect(() => {
    let disposed = false;
    const images: (HTMLImageElement | null)[] = new Array(SOURCE_MAX_FRAME).fill(null);
    const pendingFrames = pendingFramesRef.current;
    const loadQueue: { index: number; highPriority: boolean }[] = [];
    const loadingImages = new Map<number, HTMLImageElement>();
    let activeLoads = 0;
    imagesRef.current = images;
    loadedFrameCountRef.current = 0;

    const pumpQueue = () => {
      while (
        !disposed &&
        activeLoads < MAX_CONCURRENT_LOADS &&
        loadQueue.length > 0
      ) {
        const queued = loadQueue.shift();
        if (!queued) break;
        const { index, highPriority } = queued;
        activeLoads += 1;

        const image = document.createElement("img");
        image.decoding = "async";
        image.fetchPriority = highPriority ? "high" : "auto";
        image.alt = "";
        image.setAttribute("aria-hidden", "true");
        image.style.display = "none";
        loadingImages.set(index, image);
        document.body.appendChild(image);
        let settled = false;

        const completeLoad = () => {
          if (settled) return false;
          settled = true;
          activeLoads = Math.max(0, activeLoads - 1);
          pendingFrames.delete(index);
          loadingImages.delete(index);
          image.remove();
          pumpQueue();
          return true;
        };

        const finish = () => {
          if (disposed || !completeLoad()) return;
          images[index] = image;
          loadedFrameCountRef.current += 1;
          if (index === 0) {
            drawFrame(0);
            updateDebugOverlay(0);
            setProgress(100);
            setDisplayProgress(100);
            setAssetsLoaded(true);
            setLoading(false);
        }
        const desiredSourceIndex =
          logicalToSourceFrame(currentFrameRef.current) - 1;
        if (index === desiredSourceIndex) {
          drawFrame(index);
          displayedFrameRef.current = index;
          updateDebugOverlay(index);
        }
        };

        const fail = () => {
          if (!completeLoad()) return;
          if (index === 0) {
            setProgress(100);
            setDisplayProgress(100);
            setAssetsLoaded(true);
            setLoading(false);
          }
        };

        image.onload = finish;
        image.onerror = fail;
        image.src = getFrameSrc(index);
      }
    };

    const loadFrame = (
      index: number,
      highPriority = false,
      deferPump = false
    ) => {
      if (disposed || index < 0 || index >= SOURCE_MAX_FRAME || images[index]) {
        return;
      }

      if (pendingFrames.has(index)) {
        if (highPriority) {
          const queuedIndex = loadQueue.findIndex(
            (queued) => queued.index === index
          );
          if (queuedIndex > 0) {
            const [queued] = loadQueue.splice(queuedIndex, 1);
            queued.highPriority = true;
            loadQueue.unshift(queued);
          }
        }
        return;
      }

      pendingFrames.add(index);
      const queuedFrame = { index, highPriority };
      if (highPriority) {
        loadQueue.unshift(queuedFrame);
      } else {
        loadQueue.push(queuedFrame);
      }
      if (!deferPump) pumpQueue();
    };
    requestFrameRef.current = loadFrame;

    preloadWindowRef.current = (center: number) => {
      const target = logicalToSourceFrame(targetFrameRef.current) - 1;
      const direction =
        target === center
          ? center >= lastRequestedFrameRef.current
            ? 1
            : -1
          : target > center
            ? 1
            : -1;
      lastRequestedFrameRef.current = target;
      const behind = direction > 0 ? PRELOAD_BEHIND : PRELOAD_AHEAD;
      const ahead = direction > 0 ? PRELOAD_AHEAD : PRELOAD_BEHIND;
      const start = Math.max(0, center - behind);
      const end = Math.min(SOURCE_MAX_FRAME - 1, center + ahead);
      const priorityEnd =
        direction > 0
          ? Math.min(SOURCE_MAX_FRAME - 1, center + PRIORITY_RANGE, target)
          : Math.max(0, center - PRIORITY_RANGE, target);
      const keepStart = Math.min(start, priorityEnd);
      const keepEnd = Math.max(end, priorityEnd);

      for (let queueIndex = loadQueue.length - 1; queueIndex >= 0; queueIndex -= 1) {
        const queuedFrame = loadQueue[queueIndex];
        if (queuedFrame.index < keepStart || queuedFrame.index > keepEnd) {
          loadQueue.splice(queueIndex, 1);
          pendingFrames.delete(queuedFrame.index);
        }
      }

      const priorityFrames: number[] = [];
      for (
        let frame = center + direction;
        direction > 0 ? frame <= priorityEnd : frame >= priorityEnd;
        frame += direction
      ) {
        priorityFrames.push(frame);
      }
      for (let index = priorityFrames.length - 1; index >= 0; index -= 1) {
        loadFrame(priorityFrames[index], true, true);
      }
      pumpQueue();

      loadFrame(center, true);
      for (let offset = 1; offset <= Math.max(behind, ahead); offset += 1) {
        if (center + offset <= end) loadFrame(center + offset);
        if (center - offset >= start) loadFrame(center - offset);
      }

      if (loadedFrameCountRef.current > MAX_DECODED_FRAMES) {
        for (
          let index = 1;
          index < SOURCE_MAX_FRAME &&
          loadedFrameCountRef.current > MAX_DECODED_FRAMES;
          index += 1
        ) {
          if (
            images[index] &&
            (index < keepStart - PRELOAD_BEHIND ||
              index > keepEnd + PRELOAD_BEHIND)
          ) {
            images[index] = null;
            loadedFrameCountRef.current -= 1;
          }
        }
      }
    };

    loadFrame(0, true);
    for (let index = 1; index <= 59; index += 1) {
      loadFrame(index, index < 12);
    }

    return () => {
      disposed = true;
      pendingFrames.clear();
      loadQueue.length = 0;
      loadingImages.forEach((image) => image.remove());
      loadingImages.clear();
      preloadWindowRef.current = () => {};
      requestFrameRef.current = () => {};
      imagesRef.current = [];
    };
  }, [drawFrame, updateDebugOverlay]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      cancelAnimationFrame(resizeRafRef.current);
      resizeRafRef.current = requestAnimationFrame(() => {
        if (containerRef.current) {
          containerRef.current.style.height =
            `${SCROLL_DISTANCE + window.innerHeight}px`;
        }
        drawFrame(displayedFrameRef.current);
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(resizeRafRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [drawFrame]);

  // Manual opacity motion values — avoids useTransform clamp/extrapolation issues
  // NOTE: STORY_BEATS now has 6 entries (added beat 1.5 at index 2)
  const beat0Opacity = useMotionValue(1);
  const beat1Opacity = useMotionValue(0);
  const beat15Opacity = useMotionValue(0); // Agency highlight beat
  const beat2Opacity = useMotionValue(0);
  const beat3Opacity = useMotionValue(0);
  const beat4Opacity = useMotionValue(0);

  const allBeatMotionValues = [beat0Opacity, beat1Opacity, beat15Opacity, beat2Opacity, beat3Opacity, beat4Opacity];

  // Y transform for standard up-entry / up-exit beats
  const beat0Y = useMotionValue(0);
  const beat1Y = useMotionValue(0); // Managed manually with directional exit
  const beat15Y = useMotionValue(0); // Static — beat 1.5 slides on X axis
  const beat2Y = useMotionValue(30);
  const beat3Y = useMotionValue(30);
  const beat4Y = useMotionValue(30);

  const allBeatYValues = [beat0Y, beat1Y, beat15Y, beat2Y, beat3Y, beat4Y];

  // Directional exit motion values
  const beat1ExitY = useMotionValue(0);   // Beat 1 slides DOWN on exit
  const beat15ExitX = useMotionValue(0);  // Beat 1.5 slides RIGHT on exit

  // Beat 2 (three-columns) specific staggered motion values
  const beat2HeadingOpacity = useMotionValue(0);
  const beat2HeadingY = useMotionValue(30);
  const beat2Col0Opacity = useMotionValue(0);
  const beat2Col0Y = useMotionValue(30);
  const beat2Col1Opacity = useMotionValue(0);
  const beat2Col1Y = useMotionValue(30);
  const beat2Col2Opacity = useMotionValue(0);
  const beat2Col2Y = useMotionValue(30);

  const servicesOpacity = useTransform(scrollYProgress, (latest) =>
    computeLinearOpacity(latest, [
      sourceFrameToProgress(SERVICES_RANGE.start),
      sourceFrameToProgress(SERVICES_RANGE.innerStart),
      sourceFrameToProgress(SERVICES_RANGE.innerEnd),
      sourceFrameToProgress(SERVICES_RANGE.end),
    ])
  );
  const servicesY = useTransform(servicesOpacity, (opacity) => 30 * (1 - opacity));
  const processOpacity = useTransform(scrollYProgress, (latest) =>
    computeLinearOpacity(latest, [
      sourceFrameToProgress(PROCESS_RANGE.start),
      sourceFrameToProgress(PROCESS_RANGE.fadeInEnd),
      sourceFrameToProgress(PROCESS_RANGE.fadeOutStart),
      sourceFrameToProgress(PROCESS_RANGE.end),
    ])
  );
  const processY = useTransform(processOpacity, (opacity) => 30 * (1 - opacity));
  const pricingOpacity = useTransform(scrollYProgress, (latest) =>
    computeLinearOpacity(latest, [
      sourceFrameToProgress(PRICING_RANGE.start),
      sourceFrameToProgress(PRICING_RANGE.fadeInEnd),
      sourceFrameToProgress(PRICING_RANGE.fadeOutStart),
      sourceFrameToProgress(PRICING_RANGE.end),
    ])
  );
  const pricingY = useTransform(
    [scrollYProgress, pricingOpacity],
    ([latest, opacity]) =>
      (latest as number) < sourceFrameToProgress(PRICING_RANGE.fadeOutStart)
        ? 30 * (1 - (opacity as number))
        : -30 * (1 - (opacity as number))
  );
  const combinedCrystalOpacity = useTransform(
    [servicesOpacity, processOpacity, pricingOpacity],
    ([services, process, pricing]) =>
      Math.max(services as number, process as number, pricing as number)
  );
  const rowAnchorsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (loading || reducedMotion) return;

    const getContainerTop = () =>
      window.scrollY +
      (containerRef.current?.getBoundingClientRect().top ?? 0);

    const setTargetFromScroll = () => {
      if (isSyncingScrollRef.current) return;
      const logicalFrame = clamp(
        (window.scrollY - getContainerTop()) / PX_PER_FRAME + 1,
        1,
        LOGICAL_MAX_FRAME
      );
      currentFrameRef.current = logicalFrame;
      targetFrameRef.current = logicalFrame;
    };

    const handleWheel = (event: WheelEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const insideFrameScene =
        rect.top <= 0 &&
        rect.bottom >= window.innerHeight &&
        ((event.deltaY > 0 && targetFrameRef.current < LOGICAL_MAX_FRAME) ||
          (event.deltaY < 0 && targetFrameRef.current > 1));

      if (!insideFrameScene) return;
      event.preventDefault();

      const now = window.performance.now();
      if (now - lastWheelAtRef.current < WHEEL_THROTTLE_MS) return;
      lastWheelAtRef.current = now;

      const direction = Math.sign(event.deltaY);
      if (direction === 0) return;

      const current = currentFrameRef.current;
      const targetBefore = targetFrameRef.current;
      targetFrameRef.current = clamp(
        current + direction * FRAME_STEP,
        Math.max(1, current - MAX_TARGET_AHEAD),
        Math.min(LOGICAL_MAX_FRAME, current + MAX_TARGET_AHEAD)
      );

      if (DEBUG_SEQUENCE) {
        console.debug("[HuygenScroll:wheel]", {
          deltaY: event.deltaY,
          currentFrameBefore: current,
          targetFrameBefore: targetBefore,
          targetFrameAfter: targetFrameRef.current,
          displayedSourceFrame: displayedFrameRef.current + 1,
          scrollTop: window.scrollY,
          logicalFrame: Math.round(current),
          sourceFrame: logicalToSourceFrame(current),
        });
      }
    };

    const tick = () => {
      const current = currentFrameRef.current;
      const target = targetFrameRef.current;
      const difference = target - current;
      const nextCurrent =
        Math.abs(difference) < 0.1
          ? target
          : current +
            clamp(difference * 0.18, -MAX_FRAME_SPEED, MAX_FRAME_SPEED);

      currentFrameRef.current = clamp(nextCurrent, 1, LOGICAL_MAX_FRAME);
      const progress =
        (currentFrameRef.current - 1) / (LOGICAL_MAX_FRAME - 1);
      scrollProgressRef.current = progress;
      scrollYProgress.set(progress);

      const sourceIndex =
        logicalToSourceFrame(currentFrameRef.current) - 1;
      if (sourceIndex !== displayedFrameRef.current) {
        if (drawFrame(sourceIndex)) {
          displayedFrameRef.current = sourceIndex;
        } else {
          requestFrameRef.current(sourceIndex, true);
        }
        preloadWindowRef.current(sourceIndex);
      }

      const containerTop = getContainerTop();
      const sceneEnd = containerTop + SCROLL_DISTANCE;
      const desiredScrollTop =
        containerTop + (currentFrameRef.current - 1) * PX_PER_FRAME;
      const insideScrollRange =
        window.scrollY >= containerTop && window.scrollY <= sceneEnd;
      if (
        insideScrollRange &&
        Math.abs(window.scrollY - desiredScrollTop) > 0.5
      ) {
        isSyncingScrollRef.current = true;
        window.scrollTo(0, desiredScrollTop);
        requestAnimationFrame(() => {
          isSyncingScrollRef.current = false;
        });
      }

      updateDebugOverlay(displayedFrameRef.current);
      controllerRafRef.current = requestAnimationFrame(tick);
    };

    setTargetFromScroll();
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", setTargetFromScroll, { passive: true });
    controllerRafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", setTargetFromScroll);
      if (controllerRafRef.current !== null) {
        cancelAnimationFrame(controllerRafRef.current);
        controllerRafRef.current = null;
      }
    };
  }, [
    loading,
    reducedMotion,
    drawFrame,
    scrollYProgress,
    updateDebugOverlay,
  ]);

  // Beat opacity + section handler (frame drawing handled by GSAP above)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {

    // 2. Beat opacity computation
    STORY_BEATS.forEach((beat, i) => {
      const [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd] = beat.opacityRange;
      let opacity = 0;

      if (latest >= fadeInStart && latest <= fadeInEnd) {
        opacity = fadeInEnd === fadeInStart ? 1 : (latest - fadeInStart) / (fadeInEnd - fadeInStart);
      } else if (latest > fadeInEnd && latest < fadeOutStart) {
        opacity = 1;
      } else if (latest >= fadeOutStart && latest <= fadeOutEnd) {
        opacity = fadeOutEnd === fadeOutStart ? 0 : 1 - (latest - fadeOutStart) / (fadeOutEnd - fadeOutStart);
      }
      opacity = Math.max(0, Math.min(1, opacity));

      // --- Beat 1: slide UP on entry, slide DOWN on exit ---
      if (i === 1) {
        const isInFadeIn = latest >= fadeInStart && latest <= fadeInEnd;
        const isInFadeOut = latest >= fadeOutStart && latest <= fadeOutEnd;
        const entryProgress = isInFadeIn ? opacity : 1; // 0→1 on entry
        const exitProgress  = isInFadeOut ? (1 - opacity) : (latest > fadeOutEnd ? 1 : 0); // 0→1 on exit
        // Entry: slides up from +30px; Exit: slides down to +40px
        beat1Y.set(30 * (1 - entryProgress) + 40 * exitProgress);
        beat1ExitY.set(0); // not used separately, baked into beat1Y
      }

      // --- Beat 1.5 (index 2): slide UP on entry, slide RIGHT on exit ---
      if (i === 2) {
        const isInFadeIn = latest >= fadeInStart && latest <= fadeInEnd;
        const isInFadeOut = latest >= fadeOutStart && latest <= fadeOutEnd;
        const entryProgress = isInFadeIn ? opacity : 1;
        const exitProgress  = isInFadeOut ? (1 - opacity) : (latest > fadeOutEnd ? 1 : 0);
        // Entry: slides up from +30px; Exit: slides right to +120px
        beat15Y.set(30 * (1 - entryProgress));
        beat15ExitX.set(120 * exitProgress);
      }

      if (beat.position === "three-columns") {
        const mapOpacity = (val: number, start: number, end: number) => {
          if (val <= start) return 0;
          if (val >= end) return 1;
          return (val - start) / (end - start);
        };

        const hOp = mapOpacity(opacity, 0, 0.4);
        beat2HeadingOpacity.set(hOp);
        beat2HeadingY.set(30 * (1 - hOp));

        const c0Op = mapOpacity(opacity, 0.2, 0.6);
        beat2Col0Opacity.set(c0Op);
        beat2Col0Y.set(30 * (1 - c0Op));

        const c1Op = mapOpacity(opacity, 0.4, 0.8);
        beat2Col1Opacity.set(c1Op);
        beat2Col1Y.set(30 * (1 - c1Op));

        const c2Op = mapOpacity(opacity, 0.6, 1.0);
        beat2Col2Opacity.set(c2Op);
        beat2Col2Y.set(30 * (1 - c2Op));
      }

      allBeatMotionValues[i].set(opacity);
      // Only write default Y for beats without custom directional handling
      if (i !== 1 && i !== 2) {
        allBeatYValues[i].set(30 * (1 - opacity));
      }
    });

  });

  const canvasOpacity = useMotionValue(1);
  const canvasFilter = useMotionValue("brightness(1)");
  
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    canvasOpacity.set(1);
    if (
      latest >= sourceFrameToProgress(PRICING_RANGE.start) &&
      latest <= sourceFrameToProgress(PRICING_RANGE.end)
    ) {
      canvasFilter.set("brightness(0.2)");
    } else {
      canvasFilter.set("brightness(1)");
    }
  });

  const beatOpacities = allBeatMotionValues;
  const beatYValues = allBeatYValues;

  // Draw first frame when loaded
  useEffect(() => {
    if (!loading) {
      requestAnimationFrame(() => {
        const containerTop =
          window.scrollY +
          (containerRef.current?.getBoundingClientRect().top ?? 0);
        const logicalFrame = clamp(
          (window.scrollY - containerTop) / PX_PER_FRAME + 1,
          1,
          LOGICAL_MAX_FRAME
        );
        const progress =
          (logicalFrame - 1) / (LOGICAL_MAX_FRAME - 1);
        const sourceIndex = logicalToSourceFrame(logicalFrame) - 1;

        currentFrameRef.current = logicalFrame;
        targetFrameRef.current = logicalFrame;
        scrollProgressRef.current = progress;
        scrollYProgress.set(progress);
        requestFrameRef.current(sourceIndex, true);
        preloadWindowRef.current(sourceIndex);

        if (drawFrame(sourceIndex)) {
          displayedFrameRef.current = sourceIndex;
        }
        updateDebugOverlay(displayedFrameRef.current);
      });
    }
  }, [
    loading,
    drawFrame,
    scrollYProgress,
    updateDebugOverlay,
  ]);

  const getPositionClasses = (position: string) => {
    switch (position) {
      case "left":
        return "items-start text-left pl-8 md:pl-16 lg:pl-24";
      case "right":
        return "items-end text-right pr-8 md:pr-16 lg:pr-24";
      default:
        return "items-center text-center";
    }
  };


  return (
    <>
      <section
        ref={containerRef}
        id="scrollytelling"
        className="relative bg-[#050505]"
        style={{ height: `calc(${SCROLL_DISTANCE}px + 100vh)` }}
      >
      {!loading && <SiteNav />}
      {DEBUG_SEQUENCE && (
        <div
          ref={frameCounterRef}
          className="fixed left-1/2 top-3 z-[250] hidden -translate-x-1/2 rounded-full border border-white/15 bg-black/70 px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] text-white/80 shadow-lg backdrop-blur-md md:block"
        >
          LOGICAL 00001 / {LOGICAL_MAX_FRAME} | TARGET 00001 / {LOGICAL_MAX_FRAME} |
          SOURCE 00001 / {SOURCE_MAX_FRAME} |
          PX_PER_FRAME {PX_PER_FRAME} | SCROLL_DISTANCE {SCROLL_DISTANCE}px |
          SKIP SOURCE 651-730
        </div>
      )}
      {/* Anchor targets for navigation mapping to scroll percent */}
      <div id="systems" className="absolute h-px w-full" style={{ top: `${sourceToLogicalFrame(120) * PX_PER_FRAME}px` }} />
      <div id="voice" className="absolute h-px w-full" style={{ top: `${sourceToLogicalFrame(280) * PX_PER_FRAME}px` }} />
      <div id="web" className="absolute h-px w-full" style={{ top: `${sourceToLogicalFrame(330) * PX_PER_FRAME}px` }} />
      <div id="strategy" className="absolute h-px w-full" style={{ top: `${sourceToLogicalFrame(PROCESS_RANGE.start) * PX_PER_FRAME}px` }} />
      <div id="pricing" className="absolute h-px w-full" style={{ top: `${sourceToLogicalFrame(PRICING_RANGE.start) * PX_PER_FRAME}px` }} />

      <div className="sticky top-0 z-0 h-screen w-full overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ opacity: canvasOpacity, filter: canvasFilter }}
        >
          {/* LCP Optimization: Native image that loads instantly before JS hydrates the canvas */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getFrameSrc(reducedMotion ? 179 : 0)}
            alt=""
            className="absolute inset-0 w-full h-full object-cover z-[-1]"
            fetchPriority="high"
            decoding="async"
          />
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full object-cover ${
              reducedMotion ? "hidden" : ""
            }`}
            aria-label="Huygen Studios service system animation"
          />
        </motion.div>



        <>
            <ServiceRevealFloaterCrystal
              anchorsRef={rowAnchorsRef}
              scrollYProgress={scrollYProgress}
              sectionOpacity={combinedCrystalOpacity}
              servicesRange={[
                sourceFrameToProgress(SERVICES_RANGE.start),
                sourceFrameToProgress(SERVICES_RANGE.innerStart),
                sourceFrameToProgress(SERVICES_RANGE.innerEnd),
                sourceFrameToProgress(SERVICES_RANGE.end),
              ]}
              processRange={[
                sourceFrameToProgress(PROCESS_RANGE.start),
                sourceFrameToProgress(PROCESS_RANGE.end),
              ]}
              pricingRange={[
                sourceFrameToProgress(PRICING_RANGE.start),
                sourceFrameToProgress(PRICING_RANGE.end),
              ]}
            />
            <ServicesShowcase
              opacity={servicesOpacity}
              y={servicesY}
              scrollYProgress={scrollYProgress}
              rowAnchorsRef={rowAnchorsRef}
              innerRange={[
                sourceFrameToProgress(SERVICES_RANGE.innerStart),
                sourceFrameToProgress(SERVICES_RANGE.innerEnd),
              ]}
            />
        </>
        
        <ProcessShowcase
            opacity={processOpacity} 
            y={processY} 
            scrollYProgress={scrollYProgress}
            range={[
              sourceFrameToProgress(PROCESS_RANGE.stepsStart),
              sourceFrameToProgress(PROCESS_RANGE.stepsEnd),
            ]}
        />

        <PricingSection
            opacity={pricingOpacity}
            y={pricingY}
            sp={scrollYProgress}
            range={[
              sourceFrameToProgress(PRICING_RANGE.start),
              sourceFrameToProgress(PRICING_RANGE.end),
            ]}
        />

        {/* Story beat overlays */}
        {STORY_BEATS.map((beat, i) => {
          // Resolve the motion style for each beat based on its exit direction
          const getMotionStyle = () => {
            if (beat.position === "three-columns") return {};
            if (i === 1) {
              // Beat 1: Y already has both entry (up) and exit (down) baked in
              return { opacity: beatOpacities[i], y: beat1Y };
            }
            if (i === 2) {
              // Beat 1.5: slides up on entry, slides RIGHT on exit
              return { opacity: beatOpacities[i], y: beat15Y, x: beat15ExitX };
            }
            return { opacity: beatOpacities[i], y: beatYValues[i] };
          };

          return (
          <motion.div
            key={beat.heading + i}
            style={getMotionStyle()}
            className={`absolute inset-0 z-10 flex flex-col px-6 pointer-events-none pt-20 ${
              beat.position === "three-columns" ? "justify-center md:justify-end pb-12 md:pb-24" : `justify-center ${getPositionClasses(beat.position)}`
            }`}
          >
            {beat.position === "three-columns" ? (
              <div className="w-full flex flex-col items-center">
                <motion.div 
                  className="w-full text-center mb-12 md:mb-16"
                  style={{ opacity: beat2HeadingOpacity, y: beat2HeadingY }}
                >
                  {beat.eyebrow && (
                    <p className="text-[11px] md:text-xs uppercase tracking-[0.25em] text-white/70 mb-4 font-medium">
                      {beat.eyebrow}
                    </p>
                  )}
                  <h2
                    className="text-4xl md:text-7xl font-semibold tracking-[-0.06em] text-white/90 mb-4 md:mb-6 leading-[0.95]"
                    style={{ textShadow: "0 2px 40px rgba(0,0,0,0.8), 0 0 80px rgba(0,0,0,0.6)" }}
                  >
                    {beat.heading}
                  </h2>
                </motion.div>
                <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  {beat.columns?.map((col, idx) => {
                    const colOp = idx === 0 ? beat2Col0Opacity : idx === 1 ? beat2Col1Opacity : beat2Col2Opacity;
                    const colY = idx === 0 ? beat2Col0Y : idx === 1 ? beat2Col1Y : beat2Col2Y;
                    return (
                      <motion.div key={col.heading} className="flex flex-col items-center" style={{ opacity: colOp, y: colY }}>
                         <h3 className="text-2xl md:text-4xl font-semibold tracking-[-0.04em] text-white/90 mb-3" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}>{col.heading}</h3>
                         <p className="text-sm md:text-base text-white/60 max-w-xs" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.9)" }}>{col.body}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className={`max-w-xl ${beat.position === "center" ? "mx-auto" : ""}`}>
                {beat.eyebrow && (
                  <p className="text-[11px] md:text-xs uppercase tracking-[0.25em] text-white/70 mb-4 font-medium">
                    {beat.eyebrow}
                  </p>
                )}
                <h2
                  className="text-4xl md:text-7xl font-semibold tracking-[-0.06em] text-white/90 mb-4 md:mb-6 leading-[0.95] whitespace-pre-line"
                  style={{
                    textShadow: "0 2px 40px rgba(0,0,0,0.8), 0 0 80px rgba(0,0,0,0.6)",
                  }}
                >
                  {beat.heading}
                </h2>
                <p
                  className={`text-sm md:text-lg text-white/60 leading-relaxed ${
                    beat.position === "center"
                      ? "max-w-md mx-auto"
                      : beat.position === "right"
                      ? "max-w-md ml-auto"
                      : "max-w-md"
                  }`}
                  style={{
                    textShadow: "0 2px 20px rgba(0,0,0,0.9)",
                  }}
                >
                  {beat.body}
                </p>
                
                {/* 4 Contact Buttons for Final Beats */}
                {(i === 4 || i === 5) && (
                  <div className="mt-10 flex flex-wrap gap-3 items-center justify-center pointer-events-auto">
                    {/* Phone CTA — Solid White */}
                    <ShineHoverButton asChild className="group rounded-2xl h-auto p-0 border-0">
                      <a
                        href="tel:+919262102440"
                        className="relative px-8 py-3.5 text-[14px] tracking-wide font-bold flex items-center gap-2.5 bg-blue-600 text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-[0_0_40px_rgba(37,99,235,0.3)]"
                      >
                        <span>Call Us</span>
                      </a>
                    </ShineHoverButton>

                    {/* WhatsApp */}
                    <ShineHoverButton asChild className="rounded-2xl h-auto p-0">
                      <a
                        href="https://wa.me/919262102440"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3.5 text-[14px] tracking-wide font-semibold flex items-center gap-2.5 bg-black/60 backdrop-blur-xl border border-white/20 text-white transition-all duration-300 hover:scale-[1.03] hover:bg-white/10 active:scale-[0.98]"
                      >
                        WhatsApp
                      </a>
                    </ShineHoverButton>

                    {/* Email Us */}
                    <ShineHoverButton asChild className="rounded-2xl h-auto p-0">
                      <a
                        href="mailto:hello@huygenstudios.com"
                        className="px-8 py-3.5 text-[14px] tracking-wide font-semibold flex items-center gap-2.5 bg-black/60 backdrop-blur-xl border border-white/20 text-white transition-all duration-300 hover:scale-[1.03] hover:bg-white/10 active:scale-[0.98]"
                      >
                        Email Us
                      </a>
                    </ShineHoverButton>

                    {/* Fill form — Button */}
                    <ShineHoverButton asChild className="rounded-2xl h-auto p-0">
                      <a
                        href="/contact"
                        className="px-8 py-3.5 text-[14px] tracking-wide font-semibold flex items-center gap-2.5 bg-black/60 backdrop-blur-xl border border-white/20 text-white transition-all duration-300 hover:scale-[1.03] hover:bg-white/10 active:scale-[0.98]"
                      >
                        Fill the form
                      </a>
                    </ShineHoverButton>
                  </div>
                )}

                {beat.cta && i < 4 && (
                  <div className={`mt-8 flex flex-col sm:flex-row gap-4 pointer-events-auto ${
                    beat.position === "center" ? "items-center justify-center" : "items-start"
                  }`}>
                    <ShineHoverButton asChild className="rounded-full bg-gradient-to-r from-[#f63a39] to-[#7c4e9b] p-0 h-auto">
                      <a
                        href={beat.cta.href}
                        className="group px-7 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity flex items-center gap-2"
                      >
                        {beat.cta.label}
                        <ArrowRight
                          size={14}
                          className="group-hover:translate-x-0.5 transition-transform"
                        />
                      </a>
                    </ShineHoverButton>
                    {beat.secondary && (
                      <a
                        href={`mailto:${beat.secondary}`}
                        className="text-sm text-white/70 hover:text-white/70 transition-colors"
                      >
                        {beat.secondary}
                      </a>
                    )}
                  </div>
                )}
              </div>
            )}
          </motion.div>
          );
        })}

        {/* Scroll indicator on first beat */}
        <motion.div
          style={{ opacity: beat0Opacity, y: beatYValues[0] }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/70">
              Scroll
            </span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
          </div>
        </motion.div>

        {/* Loader */}
        <AnimatePresence>
          {loading && (
            <motion.div
              key="loader"
              className="absolute inset-0 z-[100] flex items-center justify-center bg-[#050505]"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <BouncingDots
                message={<span className="text-white/80">{`${Math.round(displayProgress)}%`}</span>}
                className="bg-white"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
        <StickyBottomMenu />
      </section>
      <section
        id="contact"
        className="relative z-20 h-[140vh] bg-[#050505]"
      >
        <div className="sticky top-0 flex h-screen items-center justify-center px-6 text-center">
          <div className="mx-auto max-w-xl">
            <h2
              className="mb-6 text-4xl font-semibold leading-[0.95] tracking-[-0.06em] text-white/90 md:text-7xl"
              style={{
                textShadow:
                  "0 2px 40px rgba(0,0,0,0.8), 0 0 80px rgba(0,0,0,0.6)",
              }}
            >
              Contact Us.
            </h2>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <ShineHoverButton asChild className="h-auto rounded-2xl border-0 p-0">
              <a
                href="tel:+919262102440"
                className="flex items-center gap-2.5 bg-blue-600 px-8 py-3.5 text-[14px] font-bold tracking-wide text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                Call Us
              </a>
            </ShineHoverButton>
            <ShineHoverButton asChild className="h-auto rounded-2xl p-0">
              <a
                href="https://wa.me/919262102440"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/20 bg-black/60 px-8 py-3.5 text-[14px] font-semibold tracking-wide text-white backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:bg-white/10 active:scale-[0.98]"
              >
                WhatsApp
              </a>
            </ShineHoverButton>
            <ShineHoverButton asChild className="h-auto rounded-2xl p-0">
              <a
                href="mailto:hello@huygenstudios.com"
                className="border border-white/20 bg-black/60 px-8 py-3.5 text-[14px] font-semibold tracking-wide text-white backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:bg-white/10 active:scale-[0.98]"
              >
                Email Us
              </a>
            </ShineHoverButton>
            <ShineHoverButton asChild className="h-auto rounded-2xl p-0">
              <a
                href="/contact"
                className="border border-white/20 bg-black/60 px-8 py-3.5 text-[14px] font-semibold tracking-wide text-white backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:bg-white/10 active:scale-[0.98]"
              >
                Fill the form
              </a>
            </ShineHoverButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
