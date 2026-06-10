"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useMotionValue,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { BouncingDots } from "@/components/ui/bouncing-dots";
import { ArrowRight } from "lucide-react";
const ProcessShowcase = dynamic(() => import("./ProcessShowcase").then(mod => mod.ProcessShowcase), { ssr: false });
import dynamic from "next/dynamic";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { StickyBottomMenu } from "@/components/StickyBottomMenu";

const ServicesShowcase = dynamic(() => import("./ServicesShowcase").then(mod => mod.ServicesShowcase), { ssr: false });
const PricingSection = dynamic(() => import("./PricingSection").then(mod => mod.PricingSection), { ssr: false });

const ServiceRevealFloaterCrystal = dynamic(() => import("./ServiceRevealFloaterCrystal").then(mod => mod.ServiceRevealFloaterCrystal), {
  ssr: false,
});
import { ShineHoverButton } from "@/components/ui/shine-hover";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
const FRAME_COUNT = 794;
const FRAME_PATH = "/huygen-sequence";

const getFrameSrc = (index: number) => {
  // Frames are 1-indexed: frame00001.jpg ... frame00794.jpg
  const padded = String(index + 1).padStart(5, "0");
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
    opacityRange: [0.0, 0.0, 0.06, 0.09],
  },
  {
    heading: "Systems that\nwake up.",
    body: "WhatsApp flows, lead qualification, reminders, booking, and follow-ups begin working as one connected engine.",
    position: "right",
    exitDirection: "down",
    opacityRange: [0.09, 0.1027, 0.1644, 0.175],
  },
  {
    eyebrow: "Built different.",
    heading: "Not an agency.\nAn operating system.",
    body: "Most agencies hand you deliverables. We hand you infrastructure — voice agents, automation pipelines, and web systems that run autonomously so your team focuses on growth, not operations.",
    position: "right",
    exitDirection: "right",
    opacityRange: [0.194, 0.2055, 0.2980, 0.312],
  },
  {
    eyebrow: "Our production-ready",
    heading: "WAV System",
    body: "",
    position: "three-columns",
    columns: [
      { heading: "Web.", body: "Conversion-focused cinematic pages." },
      { heading: "Automation.", body: "Internal workflows and integrations." },
      { heading: "Voice.", body: "AI-driven inbound & outbound agents." }
    ],
    opacityRange: [0.35, 0.38, 0.41, 0.43],
  },
  {
    heading: "Contact Us.",
    body: "",
    position: "center",
    opacityRange: [0.94, 0.945, 2.0, 2.0],
  },
];

export function HuygenScroll() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const dprRef = useRef(1);

  useEffect(() => {
    dprRef.current = Math.min(window.devicePixelRatio || 1, 1.5);
    const handleResize = () => {
      dprRef.current = Math.min(window.devicePixelRatio || 1, 1.5);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [mountServices, setMountServices] = useState(false);
  const [mountProcess, setMountProcess] = useState(false);
  const [mountPricing, setMountPricing] = useState(false);

  useEffect(() => {
    setModelLoaded(false); 
  }, []);

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


  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Mount heavy components strictly when user scrolls near them
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Use functional state updates to avoid missing dependencies
      setMountServices(prev => !prev && latest > 0.35 ? true : prev);
      setMountProcess(prev => !prev && latest > 0.55 ? true : prev);
      setMountPricing(prev => !prev && latest > 0.70 ? true : prev);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  // Preload all images
  useEffect(() => {
    let loadedCount = 0;
    const images: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(
      null
    );

    const onLoadRest = () => {
      loadedCount++;
      setProgress((loadedCount / FRAME_COUNT) * 100);
    };

    let maxLoadedIndex = 0;
    
    const preloadRange = (start: number, end: number) => {
      const actualEnd = Math.min(end, FRAME_COUNT);
      if (start >= actualEnd || start <= maxLoadedIndex) return;
      
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const batchSize = isMobile ? 4 : 10;
      let currentIndex = Math.max(start, maxLoadedIndex + 1);

      const loadNextBatch = () => {
        const batchEnd = Math.min(currentIndex + batchSize, actualEnd);
        for (let i = currentIndex; i < batchEnd; i++) {
          if (images[i]) continue;
          const img = new Image();
          img.src = getFrameSrc(i);
          img.onload = onLoadRest;
          img.onerror = onLoadRest;
          images[i] = img;
        }
        maxLoadedIndex = Math.max(maxLoadedIndex, batchEnd - 1);
        currentIndex = batchEnd;
        if (currentIndex < actualEnd) {
          if ('requestIdleCallback' in window) {
            (window as any).requestIdleCallback(() => loadNextBatch());
          } else {
            setTimeout(loadNextBatch, 5);
          }
        }
      };
      loadNextBatch();
    };

    // Preload first 50 frames aggressively to ensure smooth start
    const handleScroll = () => {
      preloadRange(1, 50);
      window.removeEventListener("scroll", handleScroll);
    };

    // Store it on ref so the GSAP update handler can trigger it dynamically
    (containerRef as any).currentPreloader = preloadRange;

    // Prioritize first frame with high fetch priority
    const firstImg = new Image();
    (firstImg as any).fetchPriority = "high";
    firstImg.src = getFrameSrc(0);
    firstImg.onload = () => {
      images[0] = firstImg;
      drawFrame(0);
      setProgress(100);
      setAssetsLoaded(true);
      window.addEventListener("scroll", handleScroll, { passive: true });
    };
    firstImg.onerror = () => {
      setProgress(100);
      setAssetsLoaded(true);
      window.addEventListener("scroll", handleScroll, { passive: true });
    };

    imagesRef.current = images;

    return () => {
      imagesRef.current = [];
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Draw frame to canvas
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[frameIndex];

    if (!canvas || !ctx || !img || !img.complete || img.naturalWidth === 0)
      return;

    // Use cached DPR to avoid reading window.devicePixelRatio on every frame
    const dpr = dprRef.current;
    const { innerWidth: w, innerHeight: h } = window;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
    }

    // Fill background removed because images are opaque JPEGs and cover the canvas,
    // saving GPU fill rate.

    // Draw image with cover-fit (fills entire viewport)
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = w / h;

    let drawW: number, drawH: number, drawX: number, drawY: number;

    if (imgRatio > canvasRatio) {
      // Image is wider than viewport — fit by height, crop sides
      drawH = h;
      drawW = h * imgRatio;
      drawX = (w - drawW) / 2;
      drawY = 0;
    } else {
      // Image is taller — fit by width, crop top/bottom
      drawW = w;
      drawH = w / imgRatio;
      drawX = 0;
      drawY = (h - drawH) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  // Handle resize
  useEffect(() => {
    const handleResize = () => drawFrame(currentFrameRef.current);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  // New Sections specific motion values
  const servicesOpacity = useMotionValue(0);
  const servicesY = useMotionValue(30);
  const processOpacity = useMotionValue(0);
  const processY = useMotionValue(30);
  const pricingOpacity = useMotionValue(0);
  const pricingY = useMotionValue(30);

  // Combine opacities for the persistent crystal
  const combinedCrystalOpacity = useMotionValue(0);
  const rowAnchorsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Static motion values for mobile
  const staticOpacity1 = useMotionValue(1);
  const staticY0 = useMotionValue(0);

  // Blackout range: freeze on a pure-black frame from the Services section through
  // the end of Pricing, so the moon/earth sequence only resumes at Contact Us.
  // Range: 0.44 (services starts) → 0.935 (just before Contact Us at 0.94)
  const BLACKOUT_START = 0.44; // Frame ~350 — services section begins
  const BLACKOUT_END   = 0.935; // Frame 711 — moon resumes at Contact Us
  const BLACK_FRAME_INDEX = 329; // Frame 330 (pure black, ~33 KB)

  // GSAP ScrollTrigger — smooth frame scrubbing (replaces instant frame-draw)
  useGSAP(() => {
    const updateHandler = (progress: number) => {
      let nextFrame = Math.min(
        FRAME_COUNT - 1,
        Math.floor(progress * (FRAME_COUNT - 1))
      );
      // Blackout override: force black frame during services/process/pricing
      if (progress >= BLACKOUT_START && progress <= BLACKOUT_END) {
        nextFrame = BLACK_FRAME_INDEX;
      }
      if (nextFrame !== currentFrameRef.current) {
        currentFrameRef.current = nextFrame;
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => drawFrame(nextFrame));
        
        // Trigger lazy loading of the next frames (less aggressive on mobile)
        const preloader = (containerRef as any).currentPreloader;
        if (preloader) {
          const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
          const lookahead = isMobile ? 30 : 100;
          preloader(nextFrame, nextFrame + lookahead);
        }
      }
    };

    const throttle = (func: Function, limit: number) => {
      let lastCall = 0;
      return (...args: any[]) => {
        const now = performance.now();
        if (now - lastCall < limit) return;
        lastCall = now;
        return func(...args);
      };
    };

    const throttledUpdate = throttle(updateHandler, 16);

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.2, // 1.2s smooth catchup for buttery frame interpolation
      onUpdate: (self) => throttledUpdate(self.progress),
    });
    return () => st.kill();
  }, { scope: containerRef, dependencies: [loading, drawFrame] });

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

    // Helper for computing linear opacity
    const computeLinearOpacity = (val: number, [inStart, inEnd, outStart, outEnd]: [number, number, number, number]) => {
      if (val < inStart || val > outEnd) return 0;
      if (val >= inEnd && val <= outStart) return 1;
      if (val >= inStart && val < inEnd) return (val - inStart) / (inEnd - inStart);
      if (val > outStart && val <= outEnd) return 1 - (val - outStart) / (outEnd - outStart);
      return 0;
    };

    // Calculate ServicesShowcase (extended for slower one-by-one reveal and pause frame)
    const sOp = computeLinearOpacity(latest, [0.44, 0.46, 0.60, 0.61]);
    servicesOpacity.set(sOp);
    servicesY.set(30 * (1 - sOp));

    // Calculate ProcessShowcase (Extended for dwell time)
    const prOp = computeLinearOpacity(latest, [0.61, 0.62, 0.76, 0.78]);
    processOpacity.set(prOp);
    processY.set(30 * (1 - prOp));

    // Calculate PricingSection (Shifted accordingly)
    const pOp = computeLinearOpacity(latest, [0.78, 0.80, 0.92, 0.935]);
    pricingOpacity.set(pOp);
    
    // Make the pricing Y slide UP on entry AND exit instead of down
    if (latest < 0.86) {
      pricingY.set(30 * (1 - pOp)); // Entry: slide up from +30px to 0
    } else {
      pricingY.set(-30 * (1 - pOp)); // Exit: slide up from 0 to -30px
    }

    // Update combined crystal opacity (visible during services AND process AND pricing)
    combinedCrystalOpacity.set(Math.max(sOp, prOp, pOp));

  });

  // Calculate canvas opacity to fade out blackout dynamically over the final beat sequence
  const canvasOpacity = useMotionValue(1);
  const canvasFilter = useMotionValue("brightness(1)");
  
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    
    // Between BLACKOUT_END and the Earth fade-in start: canvas stays at full opacity
    // showing the natural frame (which is still near-black). We just pre-dim it.
    if (latest >= 0.9364) {
      if (latest < 0.9466) {
        // Non-linear fade-in of the Earth background (frame 743→751)
        const t = (latest - 0.9364) / (0.9466 - 0.9364);
        canvasOpacity.set(Math.pow(t, 1.5));
        canvasFilter.set("brightness(0.34)");
      } else {
        // Earth fully visible — stay dark so text stays readable
        canvasOpacity.set(1);
        canvasFilter.set("brightness(0.34)");
      }
    } else if (latest >= BLACKOUT_START && latest <= BLACKOUT_END) {
      // Inside blackout zone — native black frame, no filter needed
      canvasOpacity.set(1);
      canvasFilter.set("brightness(1)");
    } else if (latest > BLACKOUT_END && latest < 0.9364) {
      // Tiny gap (0.935→0.9364): hold black, begin dimming in anticipation
      canvasOpacity.set(0);
      canvasFilter.set("brightness(0.34)");
    } else {
      // Everything before blackout — normal full brightness
      canvasOpacity.set(1);
      canvasFilter.set("brightness(1)");
    }
  });

  const beatOpacities = allBeatMotionValues;
  const beatYValues = allBeatYValues;

  // Draw first frame when loaded
  useEffect(() => {
    if (!loading) {
      requestAnimationFrame(() => drawFrame(0));
    }
  }, [loading, drawFrame]);

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
    <section
      ref={containerRef}
      id="scrollytelling"
      className="relative h-[1500vh] bg-[#050505]"
    >
      {!loading && <SiteNav />}
      {/* Anchor targets for navigation mapping to scroll percent */}
      <div id="systems" className="absolute w-full h-[1px]" style={{ top: "15%" }} />
      <div id="voice" className="absolute w-full h-[1px]" style={{ top: "38%" }} />
      <div id="web" className="absolute w-full h-[1px]" style={{ top: "46%" }} />
      <div id="strategy" className="absolute w-full h-[1px]" style={{ top: "63%" }} />
      <div id="pricing" className="absolute w-full h-[1px]" style={{ top: "86%" }} />
      <div id="contact" className="absolute w-full h-[1px]" style={{ top: "90%" }} />

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ opacity: canvasOpacity, filter: canvasFilter }}
        >
          {/* LCP Optimization: Native image that loads instantly before JS hydrates the canvas */}
          <img
            src={getFrameSrc(0)}
            alt=""
            className="absolute inset-0 w-full h-full object-cover z-[-1]"
            // @ts-ignore
            fetchPriority="high"
            decoding="async"
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover"
            aria-label="Huygen Studios service system animation"
          />
        </motion.div>



        {mountServices && (
          <>
            {typeof window !== "undefined" && window.innerWidth >= 768 && (
              <ServiceRevealFloaterCrystal
                anchorsRef={rowAnchorsRef}
                scrollYProgress={scrollYProgress}
                sectionOpacity={combinedCrystalOpacity}
                onLoaded={() => setModelLoaded(true)}
              />
            )}
            <ServicesShowcase
              opacity={servicesOpacity}
              y={servicesY}
              scrollYProgress={scrollYProgress}
              rowAnchorsRef={rowAnchorsRef}
            />
          </>
        )}
        
        {mountProcess && (
          <ProcessShowcase 
            opacity={processOpacity} 
            y={processY} 
            scrollYProgress={scrollYProgress}
          />
        )}

        {mountPricing && (
          <PricingSection opacity={pricingOpacity} y={pricingY} sp={scrollYProgress} />
        )}

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
  );
}
