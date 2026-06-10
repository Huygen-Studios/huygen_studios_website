"use client";

import * as React from "react";
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  ArrowRight,
  Mic,
  MessageSquare,
  UserCheck,
  Globe,
  Settings,
  TrendingUp,
  Video,
} from "lucide-react";
import {
  SERVICES_SHOWCASE_ROW_COUNT,
  SERVICES_INNER,
  serviceRowRevealMultiplier,
} from "@/lib/servicesScrollReveal";

const SERVICES_STACK = [
  {
    label: "AI Voice Agents",
    icon: <Mic size={16} />,
    accent: "text-rose-400",
    ring: "ring-rose-500/25",
    iconBg: "bg-rose-500/15",
  },
  {
    label: "WhatsApp & Chat",
    icon: <MessageSquare size={16} />,
    accent: "text-emerald-400",
    ring: "ring-emerald-500/25",
    iconBg: "bg-emerald-500/15",
  },
  {
    label: "Lead Capture",
    icon: <UserCheck size={16} />,
    accent: "text-blue-400",
    ring: "ring-blue-500/25",
    iconBg: "bg-blue-500/15",
  },
  {
    label: "Web Services",
    icon: <Globe size={16} />,
    accent: "text-cyan-400",
    ring: "ring-cyan-500/25",
    iconBg: "bg-cyan-500/15",
  },
  {
    label: "Business Automation",
    icon: <Settings size={16} />,
    accent: "text-amber-400",
    ring: "ring-amber-500/25",
    iconBg: "bg-amber-500/15",
  },
  {
    label: "SEO & Growth",
    icon: <TrendingUp size={16} />,
    accent: "text-indigo-400",
    ring: "ring-indigo-500/25",
    iconBg: "bg-indigo-500/15",
  },
  {
    label: "Video Editing & Creative",
    icon: <Video size={16} />,
    accent: "text-orange-400",
    ring: "ring-orange-500/25",
    iconBg: "bg-orange-500/15",
  },
];

const TOTAL_CARDS = SERVICES_STACK.length;

if (TOTAL_CARDS !== SERVICES_SHOWCASE_ROW_COUNT) {
  console.warn(
    `[ServicesShowcase] SERVICES_STACK length ${SERVICES_STACK.length} differs from SERVICES_SHOWCASE_ROW_COUNT (${SERVICES_SHOWCASE_ROW_COUNT}); scroll/crystal timing will drift.`
  );
}

function ServiceRevealRow({
  service,
  index,
  total,
  masterOpacity,
  scrollYProgress,
  setRowEl,
}: {
  service: (typeof SERVICES_STACK)[number];
  index: number;
  total: number;
  masterOpacity: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
  setRowEl: (el: HTMLDivElement | null) => void;
}) {
  const rawOpacity = useTransform(
    [masterOpacity, scrollYProgress],
    ([op, sp]) => {
      if (typeof op !== "number" || typeof sp !== "number") return 0;
      return (op as number) * serviceRowRevealMultiplier(sp as number, index, total);
    }
  );
  
  const springOpacity = useSpring(rawOpacity, { 
    stiffness: 80, 
    damping: 24,
    restDelta: 0.001 
  });

  const [mounted, setMounted] = React.useState(false);
  const [responsiveCardWidth, setResponsiveCardWidth] = React.useState("200px");
  const [orbitalPos, setOrbitalPos] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    setMounted(true);
    
    // 360 / 7 = 51.428 degrees spacing. Start at top (-90 degrees).
    const angleDegrees = (index * (360 / TOTAL_CARDS)) - 90;
    const angleRads = (angleDegrees * Math.PI) / 180;

    const updateDimensions = () => {
      const vw = window.innerWidth;
      const isMobile = vw < 768;
      
      const cardW = isMobile ? Math.min(140, vw * 0.35) : 180;
      setResponsiveCardWidth(`${cardW}px`);

      const radiusX = isMobile ? Math.min(vw * 0.35, 120) : 240;
      const radiusY = isMobile ? 160 : 200;
      
      const xOffset = isMobile ? 0 : 50;

      setOrbitalPos({
        x: Math.cos(angleRads) * radiusX + xOffset,
        y: Math.sin(angleRads) * radiusY
      });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [index]);

  const yRevealOffset = useTransform(springOpacity, [0, 1], [40, 0]);

  if (!mounted) return null;

  return (
    <div 
      ref={setRowEl}
      className="absolute top-1/2 left-1/2 z-[200]"
      style={{
        transform: `translate(-50%, -50%) translate(${orbitalPos.x}px, ${orbitalPos.y}px)`,
        willChange: "transform"
      }}
    >
      <motion.div style={{ y: yRevealOffset }}>
        <motion.div
          style={{ 
            opacity: springOpacity,
          }}
          className="relative flex items-center justify-center pointer-events-none"
          animate={{ y: [0, -10, 0] }}
          transition={{ 
            duration: 4 + (index % 3), 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: index * 0.2
          }}
        >
        <button
          type="button"
          onClick={() => {
            window.location.href = "/services";
          }}
          style={{ 
            width: responsiveCardWidth,
            willChange: "opacity" 
          }}
          className={[
            "group relative text-left rounded-xl overflow-hidden transition-colors duration-300",
            "border border-white/[0.15]",
            "bg-black/60 backdrop-blur-xl",
            "shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4)]",
            "pointer-events-auto cursor-pointer hover:border-white/[0.35] hover:bg-black/70",
            "hover:scale-[1.03] active:scale-[0.98]",
          ].join(" ")}
        >
          <div className="relative flex items-center gap-3 px-3 py-2">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${service.iconBg} ${service.accent} transition-transform duration-200 group-hover:scale-105`}
            >
              {React.cloneElement(service.icon as React.ReactElement<{ size?: number }>, { size: 14 })}
            </div>
            <div className="flex flex-col overflow-hidden">
              <h3 className="font-bold tracking-tight text-white transition-colors whitespace-normal leading-tight text-[11px]">
              {service.label}
            </h3>
          </div>
        </div>
    </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function ServicesShowcase({
  opacity,
  y,
  scrollYProgress,
  rowAnchorsRef,
}: {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
  rowAnchorsRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
}) {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = opacity.on("change", (latest) => {
      setIsVisible(prev => {
        const visible = latest > 0.01;
        return visible !== prev ? visible : prev;
      });
    });
    return unsubscribe;
  }, [opacity]);

  const sectionSpring = useSpring(opacity, { stiffness: 60, damping: 20 });
  const sectionY = useTransform(sectionSpring, [0, 1], [40, 0]);
  const glowOpacity = useTransform(sectionSpring, [0.5, 1], [0, 1]);

  return (
    <motion.div
      style={{ opacity: sectionSpring, y, visibility: isVisible ? "visible" : "hidden" }}
      className="absolute inset-0 z-[100] flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 pointer-events-none pt-[100px] md:pt-[120px] pb-8 overflow-hidden h-full"
    >
      <div className="mx-auto w-full max-w-[1600px] px-8 md:px-16 pointer-events-none flex flex-col h-full relative">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 pointer-events-none text-center lg:text-left shrink-0 mb-4">
          <motion.div 
            style={{ y: sectionY }}
            className="flex-shrink-0 max-w-xl mx-auto lg:mx-0"
          >
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[#f63a39] mb-1 font-semibold">
              The Ecosystem
            </p>
            <h2
              className="text-2xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-2 leading-[0.9] drop-shadow-2xl"
            >
              Drop-in
              <br />
              <span className="text-white/70">systems.</span>
            </h2>
            <p className="hidden md:block text-xs md:text-sm text-white/70 leading-relaxed max-w-xs mx-auto lg:mx-0 font-medium">
              A 7-stage architectural reveal of autonomous business infrastructure.
            </p>
          </motion.div>
        </div>

        <motion.div 
          style={{ y: sectionY, opacity: sectionSpring }}
          className="absolute top-16 right-8 md:right-16 lg:right-20"
        >
          <a
            href="/services"
            className="pointer-events-auto group inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-2xl text-[11px] md:text-sm text-white/90 hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 transition-all shadow-[0_15px_35px_-10px_rgba(0,0,0,0.5)]"
          >
            Explore 50+ Services
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
              <ArrowRight
                size={10}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </div>
          </a>
        </motion.div>

        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            style={{ opacity: glowOpacity }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,78,155,0.15),transparent_60%)] pointer-events-none" 
          />

          {SERVICES_STACK.map((service, i) => {
            return (
              <ServiceRevealRow
                key={service.label}
                service={service}
                index={i}
                total={SERVICES_STACK.length}
                masterOpacity={opacity}
                scrollYProgress={scrollYProgress}
                setRowEl={(el) => {
                  rowAnchorsRef.current[i] = el;
                }}
              />
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
