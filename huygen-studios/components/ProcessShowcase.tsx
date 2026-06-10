"use client";

import * as React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { ArrowDown, Search, PenTool, Rocket, BarChart3, Activity } from "lucide-react";
import { ShineHoverButton } from "@/components/ui/shine-hover";

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Audit the workflow",
    description: "Identify leaks and manual bottlenecks in your existing operations.",
    icon: <Search size={24} />,
    color: "text-violet-400",
    glow: "shadow-violet-500/40",
    border: "group-hover:border-violet-500/50",
  },
  {
    step: "02",
    title: "Design the system",
    description: "Map the custom automation architecture that connects your tools.",
    icon: <PenTool size={24} />,
    color: "text-blue-400",
    glow: "shadow-blue-500/40",
    border: "group-hover:border-blue-500/50",
  },
  {
    step: "03",
    title: "Build the automation",
    description: "Deploy robust AI agents and high-velocity automation pipelines.",
    icon: <Rocket size={24} />,
    color: "text-emerald-400",
    glow: "shadow-emerald-500/40",
    border: "group-hover:border-emerald-500/50",
  },
  {
    step: "04",
    title: "Launch & optimize",
    description: "Go live with deep monitoring and scale based on real-world data.",
    icon: <BarChart3 size={24} />,
    color: "text-amber-400",
    glow: "shadow-amber-500/40",
    border: "group-hover:border-amber-500/50",
  },
];

export function ProcessShowcase({ 
  opacity, 
  y, 
  scrollYProgress,
  range,
}: { 
  opacity: MotionValue<number>, 
  y: MotionValue<number>,
  scrollYProgress: MotionValue<number>,
  range: [number, number],
}) {
  const [stepsStart, stepsEnd] = range;
  const stepDuration = (stepsEnd - stepsStart) / PROCESS_STEPS.length;
  const lineProgress = useTransform(
    scrollYProgress,
    [stepsStart, stepsEnd],
    [0, 1]
  );

  const innerScrollY = useTransform(scrollYProgress, (pos) => {
    const p = Math.max(
      0,
      Math.min(1, (pos - stepsStart) / (stepsEnd - stepsStart))
    );
    const maxScroll = -360;
    return p * maxScroll;
  });

  return (
    <motion.div 
      style={{ opacity, y }}
      className="absolute inset-0 z-10 flex items-start pt-[100px] md:pt-[120px] pointer-events-none"
    >
      <div className="w-full h-full max-w-7xl mx-auto px-8 md:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side: Flowchart */}
        <motion.div 
          style={{ y: innerScrollY }}
          className="flex flex-col justify-start pointer-events-none pb-32"
        >
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="mb-16"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-[#7c4e9b]/20 border border-[#7c4e9b]/30">
                  <Activity size={20} className="text-[#c8a8ff]" />
                </div>
                <span className="text-xs uppercase tracking-[0.5em] text-[#c8a8ff] font-bold">The Implementation Engine</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6 leading-[0.9]">
                From bottleneck<br/><span className="text-white/70">to launch.</span>
              </h2>
            </motion.div>

            {/* Flow Nodes */}
            <div className="space-y-8 relative">
              {/* Background Connector Line */}
              <div className="absolute left-[31px] top-8 bottom-8 w-[2px] bg-white/5" />
              
              {/* Animated Foreground Line */}
              <motion.div 
                className="absolute left-[31px] top-8 w-[2px] bg-gradient-to-b from-violet-500 via-blue-500 to-emerald-500 origin-top z-0"
                style={{ height: useTransform(lineProgress, [0, 1], ["0%", "92%"]) }}
              />

              {PROCESS_STEPS.map((step, i) => {
                const stepStart = stepsStart + i * stepDuration;
                const stepComplete = stepStart + stepDuration * 0.72;
                const fadeInStart = Math.max(
                  stepsStart,
                  stepStart - stepDuration * 0.2
                );
                
                // Cumulative opacity: starts dark (0.15) and stays bright (1.0)
                const stepOpacity = useTransform(
                  scrollYProgress,
                  [fadeInStart, stepComplete, 1],
                  [0.15, 1, 1]
                );

                const stepScale = useTransform(
                  scrollYProgress,
                  [fadeInStart, stepComplete, stepComplete + stepDuration * 0.3],
                  [0.95, 1.08, 1]
                );

                return (
                  <motion.div
                    key={step.step}
                    style={{ opacity: stepOpacity, scale: stepScale }}
                    className="group relative flex items-center gap-10 pointer-events-auto"
                  >
                    {/* Node Circle */}
                    <div className={`
                      relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center 
                      bg-black border border-white/10 shadow-2xl transition-all duration-500
                      ${step.border} group-hover:bg-[#050505]
                    `}>
                      <div className={`${step.color} transition-transform duration-500 group-hover:scale-110`}>
                        {step.icon}
                      </div>
                      
                      {/* Glow effect when active */}
                      <motion.div 
                        className={`absolute inset-0 rounded-2xl ring-2 ring-current opacity-0 ${step.color} ${step.glow}`}
                        style={{ opacity: useTransform(stepOpacity, [0.3, 1], [0, 0.3]) }}
                      />
                    </div>

                    {/* Node Content */}
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                         <span className={`text-xs font-mono font-bold tracking-widest ${step.color}`}>STEP {step.step}</span>
                         <div className="h-px w-8 bg-white/10" />
                      </div>
                      <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
                        {step.title}
                      </h3>
                      <p className="text-base text-white/70 leading-relaxed font-light max-w-sm">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-16 pt-10 border-t border-white/5"
            >
              <ShineHoverButton asChild variant="outline" className="group rounded-full bg-transparent border-white/20 text-xs uppercase tracking-[0.2em] text-white/80 hover:text-white pointer-events-auto h-12 px-6">
                <a href="mailto:hello@huygenstudios.com">
                  Schedule your systems audit <ArrowDown className="-rotate-90 group-hover:translate-x-2 transition-transform ml-2" size={14} />
                </a>
              </ShineHoverButton>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side: Reserved for the Crystal */}
        <div className="hidden lg:block h-full w-full" />
      </div>
    </motion.div>
  );
}
