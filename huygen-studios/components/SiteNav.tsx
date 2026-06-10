"use client";

import { useState, useEffect } from "react";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, Settings } from "lucide-react";
import Link from "next/link";
import { ShineHoverButton } from "@/components/ui/shine-hover";

interface SubMenuItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  subItems?: SubMenuItem[];
}

const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "Agency",
    href: "/about",
    subItems: [
      {
        title: "About Us",
        description: "Who we are and our mission.",
        icon: <Settings size={18} className="text-white/70" />,
        href: "/about",
      },
      {
        title: "Our Process",
        description: "How we build systems that scale.",
        icon: <Settings size={18} className="text-white/70" />,
        href: "/#strategy",
      },
      {
        title: "FAQ",
        description: "Frequently asked questions.",
        icon: <Settings size={18} className="text-white/70" />,
        href: "/faq",
      }
    ]
  },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-6 left-1/2 -translate-x-1/2 z-50",
          "flex items-center justify-between gap-4",
          "px-6 py-3 rounded-full",
          "transition-all duration-500 ease-out",
          "w-[calc(100%-2rem)] max-w-6xl",
          scrolled
            ? "bg-[#0a0a0a]/70 backdrop-blur-2xl border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_20px_40px_-10px_rgba(0,0,0,0.5)]"
            : "bg-transparent border border-transparent"
        )}
      >
        {/* Wordmark & Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 shrink-0"
          aria-label="Huygen Studios home"
        >
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-active:scale-95 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.2)]">
            <span className="text-[#050505] text-sm font-bold tracking-tighter translate-y-[1px]">
              H
            </span>
          </div>
          <span className="text-white/90 text-sm font-bold tracking-tight uppercase hidden sm:inline opacity-80 group-hover:opacity-100 transition-opacity">
            Huygen Studios
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <div 
              key={link.label}
              className="relative group/nav"
              onMouseEnter={() => setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={link.href}
                className="flex items-center gap-1.5 px-4 py-2 text-[12px] uppercase tracking-wider font-semibold text-white/70 hover:text-white transition-all duration-300 rounded-full hover:bg-white/[0.03] active:scale-95"
              >
                {link.label}
                {link.subItems && (
                  <ChevronDown size={12} className={cn("transition-transform duration-300 opacity-50 group-hover/nav:opacity-100", activeDropdown === link.label ? "rotate-180" : "rotate-0")} />
                )}
              </Link>
              
              {/* Dropdown Menu */}
              {link.subItems && (
                <AnimatePresence>
                  {activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-72"
                    >
                      <div className="bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/[0.08] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] rounded-2xl p-2 flex flex-col overflow-hidden">
                        {link.subItems.map((sub, idx) => (
                          <Link
                            key={idx}
                            href={sub.href}
                            className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-colors active:scale-[0.98]"
                          >
                            <div className="mt-0.5 w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0 border border-white/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] group-hover/item:bg-white/[0.08] transition-colors">
                              {sub.icon}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[13px] font-bold text-white/90 group-hover/item:text-white tracking-tight">
                                {sub.title}
                              </span>
                              <span className="text-[12px] text-white/70 leading-snug mt-0.5">
                                {sub.description}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <ShineHoverButton asChild className="hidden sm:inline-flex rounded-full text-[12px] uppercase tracking-wider font-bold">
            <a
              href="https://wa.me/919262102440?text=Hey%20Huygen%20Studios%2C%20I%20want%20to%20start%20a%20project!"
              target="_blank"
              rel="noopener noreferrer"
            >
              Start Project
            </a>
          </ShineHoverButton>
          <button
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors active:scale-95 bg-white/5 border border-white/10 rounded-full"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={16} strokeWidth={2} /> : <Menu size={16} strokeWidth={2} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-24 left-4 right-4 z-50 md:hidden"
          >
            <div className="bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_20px_40px_-10px_rgba(0,0,0,0.5)] rounded-3xl p-3 flex flex-col gap-1 max-h-[80vh] overflow-y-auto">
              {NAV_LINKS.map((link) => (
                <div key={link.label} className="flex flex-col">
                  <Link
                    href={link.href}
                    onClick={() => !link.subItems && setMobileOpen(false)}
                    className="px-5 py-4 text-sm font-semibold uppercase tracking-wider text-white/60 hover:text-white hover:bg-white/[0.03] active:bg-white/[0.06] rounded-2xl transition-all active:scale-[0.98] flex items-center justify-between"
                  >
                    {link.label}
                    {link.subItems && <ChevronDown size={14} className="opacity-50" />}
                  </Link>
                  {link.subItems && (
                    <div className="flex flex-col gap-1 pl-4 pr-2 pb-2 border-l border-white/[0.08] ml-6 mb-2">
                       {link.subItems.map((sub, idx) => (
                         <Link
                           key={idx}
                           href={sub.href}
                           onClick={() => setMobileOpen(false)}
                           className="flex flex-col py-2 px-3 rounded-xl hover:bg-white/[0.03] active:scale-[0.98] transition-all"
                         >
                           <span className="text-[13px] font-bold text-white/80 tracking-tight">{sub.title}</span>
                           <span className="text-[11px] text-white/70 leading-snug break-words">{sub.description}</span>
                         </Link>
                       ))}
                    </div>
                  )}
                </div>
              ))}
              <ShineHoverButton asChild className="mt-2 w-full rounded-2xl py-6 text-sm font-bold uppercase tracking-wider text-center">
                <a
                  href="https://wa.me/919262102440?text=Hey%20Huygen%20Studios%2C%20I%20want%20to%20start%20a%20project!"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                >
                  Start Project
                </a>
              </ShineHoverButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
