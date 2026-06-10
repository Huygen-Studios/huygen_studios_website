"use client";

import { motion } from "framer-motion";
import { ShineHoverButton } from "@/components/ui/shine-hover";

type FinalCTAProps = {
  className?: string;
};

export function FinalCTA({ className }: FinalCTAProps) {
  return (
    <section
      id="contact"
      className={`relative py-32 md:py-44 overflow-hidden ${className || ""}`}
    >
      {/* Background radials */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#f63a39]/[0.04] blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-[#7c4e9b]/[0.05] blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        >
          <h2 className="text-3xl md:text-6xl font-semibold tracking-[-0.04em] text-white/90 leading-[1.05] mb-6">
            Ready to automate the work that slows you down?
          </h2>
          <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-xl mx-auto mb-10">
            Tell Huygen Studios where your operation leaks time. We&apos;ll map
            the system that fixes it.
          </p>

          {/* CTA */}
          <ShineHoverButton asChild className="rounded-full bg-gradient-to-r from-[#f63a39] to-[#7c4e9b] px-8 py-7 text-sm font-medium hover:shadow-lg hover:shadow-[#f63a39]/20">
            <a
              href="https://wa.me/919262102440?text=Hey%20Huygen%20Studios%2C%20I%20want%20to%20start%20a%20project!"
              target="_blank"
              rel="noopener noreferrer"
            >
              Start a project
            </a>
          </ShineHoverButton>

          {/* Contact metadata */}
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 text-[13px] text-white/70">
            <a
              href="mailto:hello@huygenstudios.com"
              className="hover:text-white/60 transition-colors"
            >
              hello@huygenstudios.com
            </a>
            <span className="hidden sm:inline text-white/10">|</span>
            <a
              href="https://huygenstudios.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/60 transition-colors"
            >
              huygenstudios.com
            </a>
            <span className="hidden sm:inline text-white/10">|</span>
            <a
              href="tel:9262102440"
              className="hover:text-white/60 transition-colors"
            >
              9262102440
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
