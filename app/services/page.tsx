import type { Metadata } from "next";
import Link from "next/link";
import { SecondaryPageLayout } from "@/components/web3/SecondaryPageLayout";

export const metadata: Metadata = {
  title: "Our Services | Huygen Studios",
  description: "Explore our capabilities in custom AI agents, automated workflows, voice systems, brand production, and custom high-end web design.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <SecondaryPageLayout>
      <section className="chapter">
        <div className="shell">
          <div className="max-w-[800px] mb-16">
            <span className="text-[#93969e] text-xs font-mono tracking-widest uppercase block mb-4">02 // Services & Capabilities</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-6">Built for speed, accuracy, and conversion.</h1>
            <p className="text-lg md:text-xl text-[#b8bac1] leading-relaxed">
              We design and implement custom systems that remove operational delays, improve lead capturing, and deliver high-impact digital experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-[rgba(255,255,255,0.18)] pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">AI Automation & Call Systems</h2>
              <p className="text-[#b8bac1] leading-relaxed mb-6">
                We develop purpose-built AI agents to automate high-volume operations:
              </p>
              <ul className="list-disc list-inside text-[#b8bac1] space-y-2 mb-6">
                <li>Automated inbound & outbound voice calling qualification</li>
                <li>WhatsApp and CRM conversational sequence routing</li>
                <li>Custom data extraction and lead qualification scoring</li>
                <li>API integrations and automated webhook event triggers</li>
              </ul>
              <p className="text-[#b8bac1] leading-relaxed">
                All voice agent systems operate with strict latency limits, natural-sounding voice profiles, and structured fallback paths to live representatives.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4">UI/UX & Web Development</h2>
              <p className="text-[#b8bac1] leading-relaxed mb-6">
                We build premium, high-performance web products that communicate clearly and load instantly:
              </p>
              <ul className="list-disc list-inside text-[#b8bac1] space-y-2 mb-6">
                <li>Custom Next.js & React single page applications</li>
                <li>Responsive, semantic, accessible HTML/CSS execution</li>
                <li>High-end WebGL and 3D kinetic interaction layers</li>
                <li>Conversion funnel optimization and clean tracking integrations</li>
              </ul>
              <div className="flex gap-4 mt-8">
                <Link href="/pricing" className="text-white underline hover:text-[#4a79ff] transition-colors">
                  View Pricing Models
                </Link>
                <span className="text-neutral-600">•</span>
                <Link href="/contact" className="text-white underline hover:text-[#4a79ff] transition-colors">
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SecondaryPageLayout>
  );
}
