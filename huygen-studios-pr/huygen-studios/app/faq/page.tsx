"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteNav } from "@/components/SiteNav";
import { StickyBottomMenu } from "@/components/StickyBottomMenu";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What exactly is an AI Voice Agent?",
    answer: "An AI Voice Agent is a highly intelligent, 24/7 autonomous caller that handles inbound customer service, appointment bookings, and outbound lead qualification. It speaks naturally, understands context, and updates your CRM in real-time."
  },
  {
    question: "How much does a cinematic website cost?",
    answer: "Our web projects are custom-tailored to the complexity and scale of the design. Typically, our cinematic web experiences range depending on features like 3D WebGL rendering, custom animations, and backend integration. Please contact us for a detailed quote."
  },
  {
    question: "Do you integrate with my existing CRM?",
    answer: "Yes, we integrate seamlessly with Hubspot, Salesforce, GoHighLevel, Pipedrive, and custom backends via webhooks to ensure your data flows perfectly into your existing ecosystem."
  },
  {
    question: "How long does implementation take?",
    answer: "Standard deployments take between 2 to 4 weeks depending on the complexity of the flows and the integrations required. Custom enterprise builds may take longer."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <SiteNav />

      {/* Subtle background glow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.06)_0%,transparent_70%)]" />
      </div>

      <section className="relative z-10 px-6 pt-40 pb-24 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <p className="text-[11px] md:text-[12px] uppercase tracking-[0.25em] text-white/40 mb-4 font-medium">
            Support & Info
          </p>
          <h1 className="text-5xl md:text-6xl font-semibold tracking-[-0.04em] text-white/90 mb-6 leading-[0.95]">
            Frequently Asked <br />
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h1>
          <p className="text-sm md:text-base text-white/50 max-w-lg mx-auto">
            Everything you need to know about our services, process, and billing.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`border rounded-2xl overflow-hidden transition-colors ${
                  isOpen ? "bg-white/[0.05] border-white/20" : "bg-white/[0.02] border-white/10 hover:border-white/20"
                }`}
              >
                <button
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="text-lg font-medium text-white/90">{faq.question}</span>
                  <ChevronDown
                    className={`text-white/50 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    size={20}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-5 text-white/60 leading-relaxed text-sm md:text-base border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      <StickyBottomMenu />
    </main>
  );
}
