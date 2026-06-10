"use client";

import React from "react";
import { motion } from "framer-motion";
import { SiteNav } from "@/components/SiteNav";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col">
      <SiteNav />

      {/* Background elements */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(244,63,94,0.05)_0%,transparent_70%)]" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          <h1 className="text-[150px] md:text-[200px] font-bold tracking-tighter leading-none bg-gradient-to-br from-white/20 to-white/5 bg-clip-text text-transparent select-none">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-white/90 tracking-tight">
            Signal Lost.
          </h2>
          <p className="text-white/50 max-w-md mx-auto mb-10 text-lg">
            The page you are looking for has drifted into the void or never existed in the first place.
          </p>
          
          <Link href="/" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            <ArrowLeft size={16} />
            <span>Return to Base</span>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
