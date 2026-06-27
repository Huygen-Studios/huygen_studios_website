"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Home } from "lucide-react";
import { PROJECTS } from "@/lib/creatives/projects-data";
import '../creatives.css';

export default function CreativesWorkPage() {
  // Disable scroll restoration and force top scroll on load
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }, [])

  return (
    <main className="min-h-screen bg-black text-white w-screen overflow-x-hidden relative font-sans">
      
      {/* Background Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]" />
      </div>

      {/* Navigation matching creatives page */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="navbar absolute !top-0 w-full z-50 !justify-center"
      >
        <div className="nav-links">
          <Link href="/creatives/work">Work</Link>
          <Link href="/creatives">Services</Link>
          <Link href="/creatives/blogs">Blogs</Link>
          <Link href="/creatives">Contact</Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="w-full relative z-10 px-6 pt-[25vh] pb-24 flex flex-col items-center justify-center min-h-[50vh]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-[6rem] font-medium tracking-tighter text-white mb-6 leading-[0.9]">
            Selected
            <br />
            <span className="text-white/40 italic">Works</span>
          </h1>
        </motion.div>
      </section>

      {/* Projects Grid */}
      <section className="w-full relative z-10 px-6 pb-40 flex justify-center">
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: (idx % 2) * 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="group h-full"
            >
              <article className="h-full">
                <div className="flex flex-col h-full relative p-8 md:p-10 rounded-[2rem] bg-white/[0.01] border border-white/[0.05] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-500 overflow-hidden cursor-default">
                  
                  {/* Subtle color glow based on project color */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${project.color}, transparent 70%)` }}
                  />
                  
                  <div className="relative z-10 flex flex-col h-full items-center text-center">
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <span className="text-[11px] uppercase tracking-[0.2em] text-white/40 font-medium">
                        {project.client}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span className="text-[11px] uppercase tracking-[0.2em] text-white/40 font-medium">
                        {project.year}
                      </span>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center">
                      <header>
                        <h2 className="text-2xl md:text-3xl font-medium mb-4 text-white/90 group-hover:text-white transition-colors leading-tight">
                          {project.title}
                        </h2>
                      </header>
                      <p className="text-white/50 leading-relaxed mb-8 text-sm md:text-base">
                        {project.desc}
                      </p>
                    </div>
                    
                    <footer className="mt-auto flex flex-wrap justify-center gap-2 border-t border-white/[0.05] pt-6 group-hover:border-white/10 transition-colors w-full">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-full border border-white/10 text-[10px] uppercase tracking-widest text-white/40 group-hover:border-white/20 group-hover:text-white/60 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </footer>
                  </div>
                </div>
              </article>
            </motion.div>
          ))}
          </div>
        </div>
      </section>
      
      {/* Footer Area */}
      <div className="w-full border-t border-white/[0.05] py-12 flex justify-center">
        <Link href="/creatives" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm uppercase tracking-widest group">
          <Home suppressHydrationWarning size={14} />
          <span>Back to Creatives</span>
        </Link>
      </div>

    </main>
  );
}
