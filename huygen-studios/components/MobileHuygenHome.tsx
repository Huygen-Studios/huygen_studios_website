"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";

const services = [
  "AI voice agents",
  "WhatsApp and chat automation",
  "Lead capture systems",
  "Conversion-focused websites",
  "Business automation",
  "SEO and growth",
];

const process = [
  ["01", "Audit", "Find the manual work and missed opportunities."],
  ["02", "Design", "Map one connected system around your operation."],
  ["03", "Build", "Launch the agents, workflows, and web experience."],
  ["04", "Optimize", "Measure results and improve what matters."],
];

export function MobileHuygenHome() {
  return (
    <div className="overflow-x-clip bg-[#050505] text-white">
      <SiteNav />

      <section className="relative flex min-h-[92svh] items-end overflow-hidden px-5 pb-16 pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_28%,rgba(124,78,155,0.34),transparent_34%),radial-gradient(circle_at_20%_75%,rgba(246,58,57,0.16),transparent_30%),linear-gradient(180deg,#08070b_0%,#050505_74%)]" />
        <div className="absolute right-[-18%] top-[18%] h-72 w-72 rotate-12 rounded-[38%] border border-violet-300/15 bg-violet-500/10 shadow-[0_0_100px_rgba(124,78,155,0.22)]" />
        <div className="relative z-10 max-w-xl">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-200/80">
            Automation with imagination
          </p>
          <h1 className="text-[clamp(3.25rem,16vw,5.5rem)] font-semibold leading-[0.88] tracking-[-0.075em]">
            Systems that wake up.
          </h1>
          <p className="mt-7 max-w-md text-base leading-relaxed text-white/65">
            AI agents, automation, and cinematic web experiences built to
            remove business bottlenecks.
          </p>
          <div className="mt-9 flex flex-col gap-3 min-[420px]:flex-row">
            <a
              href="https://wa.me/919262102440?text=Hey%20Huygen%20Studios%2C%20I%20want%20to%20start%20a%20project!"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-black"
            >
              Start a project <ArrowRight size={16} />
            </a>
            <Link
              href="/services"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-6 text-sm font-semibold text-white"
            >
              Explore services
            </Link>
          </div>
        </div>
      </section>

      <section id="systems" className="px-5 py-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f63a39]">
          The ecosystem
        </p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.055em]">
          Drop-in systems.
        </h2>
        <div className="mt-10 grid gap-3">
          {services.map((service) => (
            <Link
              key={service}
              href="/services"
              className="flex min-h-16 items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] px-5 text-sm font-medium text-white/85"
            >
              <span>{service}</span>
              <ArrowRight size={15} className="text-white/40" />
            </Link>
          ))}
        </div>
      </section>

      <section id="strategy" className="border-y border-white/[0.06] px-5 py-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-300">
          The implementation engine
        </p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.055em]">
          From bottleneck to launch.
        </h2>
        <div className="mt-10 space-y-8">
          {process.map(([step, title, description]) => (
            <div key={step} className="flex gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-400/10 font-mono text-xs text-violet-200">
                {step}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/55">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="px-5 py-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-300">
          Clear fixed pricing
        </p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.055em]">
          Start with the system you need.
        </h2>
        <div className="mt-9 rounded-3xl border border-blue-400/25 bg-gradient-to-br from-blue-500/15 to-violet-500/5 p-6">
          <p className="text-sm font-semibold text-blue-200">Growth Engine</p>
          <p className="mt-3 text-3xl font-bold">₹1,09,000</p>
          <p className="mt-3 text-sm leading-relaxed text-white/55">
            Voice, WhatsApp, web, CRM, and follow-up automation for growing
            service businesses.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-white/70">
            {["AI voice receptionist", "Lead qualification", "CRM automation"].map(
              (feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <Check size={15} className="text-blue-300" />
                  {feature}
                </li>
              )
            )}
          </ul>
          <Link
            href="/pricing"
            className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-blue-600 px-5 text-sm font-bold"
          >
            View all packages
          </Link>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden px-5 pb-28 pt-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10">
          <Image
            src="/huygen-sequence/frame00794.webp"
            alt="Earth illuminated from space"
            fill
            sizes="(max-width: 767px) 100vw, 0px"
            loading="lazy"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55">
              Ready to transmit?
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em]">
              Build the system that runs without you.
            </h2>
            <a
              href="https://wa.me/919262102440"
              className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-black"
            >
              <MessageCircle size={16} /> Talk to Huygen
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
