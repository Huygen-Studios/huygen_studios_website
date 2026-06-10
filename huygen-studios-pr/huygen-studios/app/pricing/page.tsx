"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { SiteNav } from "@/components/SiteNav";
import { ShineHoverButton } from "@/components/ui/shine-hover";
import { StickyBottomMenu } from "@/components/StickyBottomMenu";

const plans = [
  {
    name: "Capture Launch",
    description: "Best for single-location clinics & solo operators with inbound enquiries.",
    price: "₹59,000",
    buttonText: "Start Project",
    popular: false,
    includes: [
      "1 AI voice receptionist",
      "1 WhatsApp intake flow",
      "1 booking/callback workflow",
      "Lead destination (CRM/Sheets)",
      "Missed-call recovery",
      "14-day post-launch support",
      "500 voice mins (month 1)",
    ],
  },
  {
    name: "Growth Engine",
    description: "Best for growth-stage clinics, real-estate teams, and SMBs.",
    price: "₹1,09,000",
    buttonText: "Start Project",
    popular: true,
    includes: [
      "Everything in Capture Launch",
      "Multi-step lead qualification",
      "Landing-page rebuild",
      "WhatsApp follow-up sequences",
      "CRM pipeline & automation",
      "Human handoff rules",
      "30-day optimization window",
      "2,000 voice mins (month 1)",
    ],
  },
  {
    name: "Revenue OS",
    description: "Best for multi-location clinics, high-volume service businesses.",
    price: "₹1,89,000",
    buttonText: "Start Project",
    popular: false,
    includes: [
      "Everything in Growth Engine",
      "Advanced voice routing",
      "Reactivation & no-show logic",
      "Advanced CRM schema",
      "Reporting dashboard",
      "Knowledge-base training",
      "45-day performance-tuning",
      "6,000 voice mins (month 1)",
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <SiteNav />

      {/* Subtle background glow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]" />
      </div>

      <section className="relative z-10 px-6 pt-32 pb-24">
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-16">

          {/* Top: Title block — centered */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col items-center text-center"
          >
            <p className="text-[11px] md:text-[12px] uppercase tracking-[0.25em] text-white/40 mb-4 font-medium">
              Packages
            </p>
            <h1
              className="text-5xl md:text-[64px] font-semibold tracking-[-0.06em] text-white/90 mb-6 leading-[0.95]"
              style={{ textShadow: "0 2px 40px rgba(0,0,0,0.8)" }}
            >
              Clear Fixed Pricing
            </h1>
            <p className="text-sm md:text-base text-white/50 max-w-md">
              Don&apos;t have much budget right now?{" "}
              <a
                href="/services"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-4 decoration-blue-400/30 transition-colors"
              >
                Explore our individual services.
              </a>
            </p>
          </motion.div>

          {/* Bottom: Cards row — bigger, full width */}
          <div className="flex flex-row overflow-x-auto md:overflow-visible md:grid md:grid-cols-3 gap-6 w-full snap-x snap-mandatory md:snap-none pb-4 md:pb-0">
            {plans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + idx * 0.12,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className={`relative rounded-2xl p-8 border flex flex-col min-w-[85vw] md:min-w-0 snap-center ${
                  plan.popular
                    ? "bg-gradient-to-br from-[#1a1a24] to-black border-blue-500/50 shadow-[0_0_60px_-15px_rgba(59,130,246,0.4)] z-20 scale-[1.02]"
                    : "bg-white/5 border-white/10 backdrop-blur-md z-10 transition-all hover:border-white/20 hover:bg-white/[0.07]"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-white/90 mb-2">{plan.name}</h2>
                  <div className="flex items-baseline mb-3">
                    <span className="text-3xl font-bold text-white">{plan.price}</span>
                    <span className="text-xs text-white/40 ml-1.5">/fixed</span>
                  </div>
                  <p className="text-[12px] text-white/60 leading-relaxed">{plan.description}</p>
                </div>

                <ShineHoverButton
                  asChild
                  className={`w-full mb-8 py-6 rounded-xl text-xs font-bold uppercase tracking-wider ${
                    plan.popular
                      ? "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_4px_20px_rgba(59,130,246,0.4)]"
                      : "bg-white/10 hover:bg-white/20 text-white"
                  }`}
                >
                  <a
                    href={`https://wa.me/919262102440?text=${encodeURIComponent(
                      `Hey Huygen Studios, I am looking for the ${plan.name} pack.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {plan.buttonText}
                  </a>
                </ShineHoverButton>

                <div className="pt-6 border-t border-white/10 mt-auto">
                  <ul className="space-y-3.5">
                    {plan.includes.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <span className="h-1.5 w-1.5 mt-[5px] bg-blue-500 rounded-full flex-shrink-0" />
                        <span className="text-[13px] text-white/70 leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
      <StickyBottomMenu />
    </main>
  );
}
