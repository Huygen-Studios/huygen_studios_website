"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { ShineHoverButton } from "@/components/ui/shine-hover";

export function StickyBottomMenu() {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center p-1.5 bg-[#151515]/95 backdrop-blur-xl border border-white/[0.08] rounded-2xl shadow-2xl">
      <a
        href="#clients"
        className="px-5 py-2.5 text-[13px] tracking-wide font-medium text-white/80 hover:text-white transition-colors border border-white/10 hover:border-white/20 rounded-xl hover:bg-white/5 whitespace-nowrap"
      >
        Our Clients
      </a>
      <a
        href="https://www.huygenstudios.com/services"
        className="px-5 py-2.5 text-[13px] tracking-wide font-medium text-white/80 hover:text-white transition-colors border border-white/10 hover:border-white/20 rounded-xl hover:bg-white/5 mx-1.5 whitespace-nowrap"
      >
        All Services
      </a>
      <ShineHoverButton asChild className="rounded-xl p-0 border-0 h-auto">
        <a
          href="tel:+919262102440"
          className="group px-6 py-2.5 text-[13px] tracking-wide font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all rounded-xl flex items-center gap-1.5 whitespace-nowrap shadow-[0_0_20px_rgba(37,99,235,0.4)]"
        >
          <span>Call Us</span>
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </a>
      </ShineHoverButton>
    </div>
  );
}
