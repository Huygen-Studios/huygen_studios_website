"use client";

import React from "react";
import { motion } from "framer-motion";
import { SiteNav } from "@/components/SiteNav";
import { StickyBottomMenu } from "@/components/StickyBottomMenu";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-hidden">
      <SiteNav />

      {/* Background elements */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.04)_0%,transparent_70%)]" />
        <div className="absolute top-[50%] left-1/4 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.03)_0%,transparent_70%)]" />
      </div>

      <section className="relative z-10 px-6 pt-40 pb-24 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="mb-20 text-center"
        >
          <p className="text-[11px] md:text-[12px] uppercase tracking-[0.25em] text-white/40 mb-6 font-medium">
            Who We Are
          </p>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.04em] text-white/90 mb-8 leading-[0.95]">
            Architecting the <br />
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Future of Business
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            Huygen Studios is a premium digital agency specializing in intelligent AI automation, voice agents, and cinematic web experiences. We don&apos;t just build software; we build autonomous revenue engines.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl font-bold tracking-tight mb-6">Our Mission</h2>
            <p className="text-white/60 leading-relaxed text-lg">
              We believe that operations should be invisible and growth should be inevitable. Our mission is to democratize elite-level AI infrastructure, bringing enterprise-grade automation and breathtaking web design to ambitious companies ready to scale without hiring huge teams.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl font-bold tracking-tight mb-6">Our Approach</h2>
            <p className="text-white/60 leading-relaxed text-lg">
              We operate at the bleeding edge of technology. By combining rigorous engineering with an obsession for design, we create solutions that are not only highly functional but viscerally stunning. Every project we undertake is an exercise in pushing boundaries.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="p-12 md:p-16 rounded-[40px] bg-white/[0.02] border border-white/10 backdrop-blur-md relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-violet-500/5" />
          <h2 className="text-3xl font-bold tracking-tight mb-6 relative z-10 text-center">Ready to automate your growth?</h2>
          <div className="flex justify-center relative z-10">
            <a
              href="/contact"
              className="px-8 py-4 bg-white text-black text-sm font-bold uppercase tracking-wider rounded-full hover:bg-white/90 transition-all hover:scale-105 active:scale-95"
            >
              Start a Project
            </a>
          </div>
        </motion.div>
      </section>

      <StickyBottomMenu />
    </main>
  );
}
