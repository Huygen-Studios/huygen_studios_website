"use client";

import * as React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { ShineHoverButton } from "@/components/ui/shine-hover";

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

export function PricingSection({
  opacity,
  y,
  sp,
  range,
}: {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  sp: MotionValue<number>;
  range: [number, number];
}) {
  const [rangeStart, rangeEnd] = range;
  const rangeLength = rangeEnd - rangeStart;
  const fadeOutStart = rangeEnd - rangeLength * 0.22;
  const card1OpRange = [
    rangeStart,
    rangeStart + rangeLength * 0.28,
    fadeOutStart,
    rangeEnd,
  ];
  const card2OpRange = [
    rangeStart + rangeLength * 0.1,
    rangeStart + rangeLength * 0.38,
    fadeOutStart,
    rangeEnd,
  ];
  const card3OpRange = [
    rangeStart + rangeLength * 0.2,
    rangeStart + rangeLength * 0.48,
    fadeOutStart,
    rangeEnd,
  ];

  const card1Op = useTransform(sp, card1OpRange, [0, 1, 1, 0]);
  const card1Y = useTransform(sp, card1OpRange, [40, 0, 0, -40]);

  const card2Op = useTransform(sp, card2OpRange, [0, 1, 1, 0]);
  const card2Y = useTransform(sp, card2OpRange, [40, 0, 0, -40]);

  const card3Op = useTransform(sp, card3OpRange, [0, 1, 1, 0]);
  const card3Y = useTransform(sp, card3OpRange, [40, 0, 0, -40]);

  const getCardMotionStyle = (index: number) => {
    if (index === 0) return { opacity: card1Op, y: card1Y };
    if (index === 1) return { opacity: card2Op, y: card2Y };
    return { opacity: card3Op, y: card3Y };
  };

  return (
    <motion.div 
      style={{ opacity, y }}
      className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
    >
      <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center pointer-events-none">
        
        {/* Left Side: Heading Text at Top */}
        <div className="lg:col-span-5 flex flex-col justify-start h-full lg:pb-48">
          <p className="text-[11px] md:text-[12px] uppercase tracking-[0.25em] text-white/70 mb-4 font-medium pointer-events-none">
            Packages
          </p>
          <h2 className="text-4xl md:text-[56px] font-semibold tracking-[-0.06em] text-white/90 mb-6 leading-[0.95]" style={{ textShadow: "0 2px 40px rgba(0,0,0,0.8)" }}>
            Clear Fixed Pricing
          </h2>
          <p className="text-sm md:text-base text-white/70 max-w-sm pointer-events-none">
            Don&apos;t have much budget right now?{" "}
            <a href="/services" className="text-blue-400 hover:text-blue-300 underline underline-offset-4 decoration-blue-400/30 pointer-events-auto transition-colors">
              Explore our individual services.
            </a>
          </p>
        </div>

        {/* Right Side: Pricing Cards */}
        <div className="lg:col-span-7 relative flex h-auto w-full flex-row gap-4 overflow-x-auto pb-4 pointer-events-auto snap-x snap-mandatory scroll-smooth lg:grid lg:grid-cols-3 lg:overflow-visible lg:snap-none">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              style={getCardMotionStyle(idx)}
              className={`relative rounded-2xl p-6 border pointer-events-auto flex flex-col min-w-[78vw] lg:min-w-0 snap-center ${
                plan.popular
                  ? "bg-gradient-to-br from-[#1a1a24] to-black border-blue-500/50 shadow-[0_0_40px_-15px_rgba(59,130,246,0.3)] z-20 scale-[1.02]"
                  : "bg-white/5 border-white/10 backdrop-blur-md z-10 hover:opacity-100 transition-opacity"
              }`}
            >
              <div className="mb-4">
                <h3 className="text-[16px] font-semibold text-white/90 mb-1">{plan.name}</h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-xl font-bold text-white">{plan.price}</span>
                  <span className="text-[10px] text-white/70 ml-1">/fixed</span>
                </div>
                <p className="text-[11px] text-white/60 h-10 leading-tight">{plan.description}</p>
              </div>

              <ShineHoverButton 
                asChild
                className={`w-full mb-6 py-5 rounded-xl text-xs font-bold uppercase tracking-wider ${
                  plan.popular
                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_4px_14px_rgba(59,130,246,0.3)]"
                    : "bg-white/10 hover:bg-white/20 text-white"
                }`}
              >
                <a
                  href={`https://wa.me/919262102440?text=${encodeURIComponent(`Hey Huygen Studios, I am looking for the ${plan.name} pack.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {plan.buttonText}
                </a>
              </ShineHoverButton>

              <div className="space-y-3 pt-4 border-t border-white/10 mt-auto">
                <ul className="space-y-2.5">
                  {plan.includes.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <span className="h-1 w-1 mt-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                      <span className="text-[11px] text-white/70 leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </motion.div>
  );
}
