import type { Metadata } from "next";
import Link from "next/link";
import { SecondaryPageLayout } from "@/components/web3/SecondaryPageLayout";

export const metadata: Metadata = {
  title: "About Us | Huygen Studios",
  description: "Huygen Studios is a premium technology and creative studio specializing in enterprise AI automation, voice systems, and cinematic web interfaces.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <SecondaryPageLayout>
      <section className="chapter">
        <div className="shell">
          <div className="max-w-[800px] mb-16">
            <span className="text-[#93969e] text-xs font-mono tracking-widest uppercase block mb-4">01 // About the Studio</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-6">Connected discipline. Elite execution.</h1>
            <p className="text-lg md:text-xl text-[#b8bac1] leading-relaxed">
              Huygen Studios combines AI automation, enterprise workflows, creative production, interface design, motion, and frontend engineering into one delivery practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-[rgba(255,255,255,0.18)] pt-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Operations & Service SLA</h2>
              <p className="text-[#b8bac1] leading-relaxed mb-6">
                We operate as a high-density, independent team. We do not use layers of account management or sales reps; clients work directly with the builders. This structure ensures that positioning, positioning systems, and code execution remain completely aligned.
              </p>
              <p className="text-[#b8bac1] leading-relaxed">
                For service inquiries and ongoing support builds, we maintain an active 24-to-48 hour response SLA to keep operational systems running smoothly.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">The Studio Philosophy</h2>
              <p className="text-[#b8bac1] leading-relaxed mb-6">
                Every project we ship is built around real, measurable outcomes. We avoid generic templates, bloated frameworks, and fake metrics. Instead, we write custom code, build secure integrations, and design premium interactions tailored to the unique operational constraints of our clients.
              </p>
              <div className="flex gap-4">
                <Link href="/services" className="text-white underline hover:text-[#4a79ff] transition-colors">
                  Explore Services
                </Link>
                <span className="text-neutral-600">•</span>
                <Link href="/contact" className="text-white underline hover:text-[#4a79ff] transition-colors">
                  Discuss a Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SecondaryPageLayout>
  );
}
