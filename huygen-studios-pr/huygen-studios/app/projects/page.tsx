"use client";

import React from "react";
import { motion } from "framer-motion";
import { SiteNav } from "@/components/SiteNav";
import { StickyBottomMenu } from "@/components/StickyBottomMenu";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "Aura Medical Booking",
    category: "AI Voice Agents",
    description: "Deployed a 24/7 AI receptionist that handles inbound appointments, dramatically reducing missed calls and saving the clinic 40+ hours a week.",
    imageColor: "from-blue-500/20 to-indigo-500/20",
    tags: ["Voice AI", "GoHighLevel", "Healthcare"],
  },
  {
    title: "NexGen Real Estate",
    category: "Business Automation",
    description: "Built a fully autonomous WhatsApp lead qualification flow that connects to their CRM and instantly alerts agents of hot prospects.",
    imageColor: "from-emerald-500/20 to-teal-500/20",
    tags: ["WhatsApp API", "Make.com", "Real Estate"],
  },
  {
    title: "Stellar Cinematic Web",
    category: "Web & Creative",
    description: "Designed and engineered a breathtaking 3D WebGL experience for a luxury brand, resulting in a 300% increase in average session duration.",
    imageColor: "from-purple-500/20 to-pink-500/20",
    tags: ["Next.js", "Three.js", "GSAP"],
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <SiteNav />

      {/* Subtle background glow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[30%] left-[20%] w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.04)_0%,transparent_70%)]" />
      </div>

      <section className="relative z-10 px-6 pt-40 pb-24 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="mb-20"
        >
          <p className="text-[11px] md:text-[12px] uppercase tracking-[0.25em] text-white/40 mb-4 font-medium">
            Our Portfolio
          </p>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.04em] text-white/90 mb-6 leading-[0.95]">
            Featured <br />
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Case Studies
            </span>
          </h1>
          <p className="text-lg text-white/50 max-w-xl leading-relaxed">
            A selection of intelligent systems and cinematic web experiences built for forward-thinking brands.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className={`w-full aspect-[4/3] rounded-[32px] bg-gradient-to-br ${project.imageColor} border border-white/[0.05] mb-6 flex items-center justify-center overflow-hidden relative backdrop-blur-sm`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                {/* Placeholder graphic for project */}
                <div className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out">
                  <span className="text-white/30 text-sm font-medium tracking-widest uppercase">View</span>
                </div>
              </div>
              <div className="px-2">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white/90 group-hover:text-white transition-colors">{project.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[11px] text-white/40 border border-white/10 px-3 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-bold uppercase tracking-widest">
            <span>Start Your Project</span>
            <ArrowRight size={16} />
          </Link>
        </motion.div>

      </section>

      <StickyBottomMenu />
    </main>
  );
}
