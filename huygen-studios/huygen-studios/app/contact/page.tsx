"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteNav } from "@/components/SiteNav";
import { ShineHoverButton } from "@/components/ui/shine-hover";
import { StickyBottomMenu } from "@/components/StickyBottomMenu";
import { Check, Send, User, Building2, Phone, Mail, MessageSquare, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

const services = [
  "AI Voice Agents",
  "Web & Creative",
  "Business Automation",
  "Lead Capture & CRM",
  "SEO & Growth",
  "Video & Content",
];

export default function ContactPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      full_name: formData.get("full_name"),
      organisation: formData.get("organisation"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      services: selectedServices,
      description: formData.get("description"),
    };

    try {
      const { error: supabaseError } = await supabase
        .from("leads")
        .insert([data]);

      if (supabaseError) throw supabaseError;

      setIsSubmitted(true);
    } catch (err: any) {
      console.error("Submission error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <SiteNav />

      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]" />
      </div>

      <section className="relative z-10 px-6 pt-32 pb-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="text-center mb-16"
          >
            <p className="text-[11px] md:text-[12px] uppercase tracking-[0.25em] text-white/40 mb-4 font-medium">
              Get in touch
            </p>
            <h1 className="text-5xl md:text-6xl font-semibold tracking-[-0.06em] text-white/90 mb-6 leading-[0.95]">
              Let&apos;s build your <br /> <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">operating layer.</span>
            </h1>
            <p className="text-sm md:text-base text-white/50 max-w-lg mx-auto">
              Fill out the form below and we&apos;ll get back to you within 24 hours to discuss your project.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="contact-form"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/[0.03] border border-white/10 backdrop-blur-xl p-8 md:p-12 rounded-[32px] shadow-2xl"
              >
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-blue-400 transition-colors" />
                    <input
                      required
                      name="full_name"
                      type="text"
                      placeholder="John Doe"
                      className="w-full bg-white/[0.05] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all placeholder:text-white/20"
                    />
                  </div>
                </div>

                {/* Organisation Name */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Organisation</label>
                  <div className="relative group">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-blue-400 transition-colors" />
                    <input
                      required
                      name="organisation"
                      type="text"
                      placeholder="Company Inc."
                      className="w-full bg-white/[0.05] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all placeholder:text-white/20"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Phone Number</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-blue-400 transition-colors" />
                    <input
                      required
                      name="phone"
                      type="tel"
                      placeholder="+91 00000 00000"
                      className="w-full bg-white/[0.05] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all placeholder:text-white/20"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-blue-400 transition-colors" />
                    <input
                      required
                      name="email"
                      type="email"
                      placeholder="john@company.com"
                      className="w-full bg-white/[0.05] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all placeholder:text-white/20"
                    />
                  </div>
                </div>

                {/* Services */}
                <div className="md:col-span-2 space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">What can we help you with?</label>
                  <div className="flex flex-wrap gap-3">
                    {services.map((service) => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => toggleService(service)}
                        className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all border ${
                          selectedServices.includes(service)
                            ? "bg-blue-600 border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                            : "bg-white/[0.05] border-white/10 text-white/60 hover:border-white/20 hover:bg-white/[0.08]"
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Project Details</label>
                  <div className="relative group">
                    <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-white/20 group-focus-within:text-blue-400 transition-colors" />
                    <textarea
                      required
                      name="description"
                      placeholder="Tell us about your project, goals, and any specific requirements..."
                      rows={4}
                      className="w-full bg-white/[0.05] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all placeholder:text-white/20 resize-none"
                    />
                  </div>
                </div>

                {error && (
                  <div className="md:col-span-2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-2xl text-xs text-center">
                    {error}
                  </div>
                )}

                <div className="md:col-span-2 pt-4">
                  <ShineHoverButton 
                    disabled={isSubmitting}
                    type="submit" 
                    className="w-full py-7 rounded-2xl bg-blue-600 hover:bg-blue-500 text-sm font-bold uppercase tracking-widest text-white shadow-[0_4px_20px_rgba(59,130,246,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <span>Sending...</span>
                          <Loader2 size={16} className="animate-spin" />
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send size={16} />
                        </>
                      )}
                    </div>
                  </ShineHoverButton>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success-message"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/[0.03] border border-white/10 backdrop-blur-xl p-12 rounded-[32px] text-center flex flex-col items-center shadow-2xl"
              >
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(59,130,246,0.5)]">
                  <Check size={40} className="text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Message Sent!</h2>
                <p className="text-white/50 mb-8 max-w-md">
                  Thank you for reaching out. We&apos;ve received your project details and will be in touch shortly.
                </p>
                <ShineHoverButton asChild className="px-10 py-4 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/10">
                  <a href="/">Back to Home</a>
                </ShineHoverButton>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      <StickyBottomMenu />
    </main>
  );
}
