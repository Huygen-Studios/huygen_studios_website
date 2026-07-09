import type { Metadata } from "next";
import Link from "next/link";
import { SecondaryPageLayout } from "@/components/web3/SecondaryPageLayout";

export const metadata: Metadata = {
  title: "Our Services | Huygen Studios",
  description:
    "Explore Huygen Studios' full range of services: AI voice agents, WhatsApp automation, AI workflow automation, cinematic websites, and GoHighLevel CRM builds.",
  alternates: { canonical: "https://www.huygenstudios.com/services" },
  openGraph: {
    title: "Our Services | Huygen Studios",
    description:
      "Custom AI agents, automated workflows, voice systems, WhatsApp sequences, and cinematic web design — built for service businesses.",
    url: "https://www.huygenstudios.com/services",
    siteName: "Huygen Studios",
    type: "website",
  },
};

const services = [
  {
    slug: "ai-voice-agents",
    label: "AI Voice Agents",
    tagline: "Answer every call. Qualify every lead.",
    description:
      "Deploy always-on AI receptionists that handle inbound calls, qualify leads with structured conversations, and route prospects to your team — with human-like voice and zero wait time.",
    highlights: [
      "24/7 inbound call handling with no hold music",
      "Structured lead qualification using your criteria",
      "CRM sync and instant follow-up triggers",
      "Graceful handoff to live agents when needed",
    ],
  },
  {
    slug: "whatsapp-automation",
    label: "WhatsApp Automation",
    tagline: "Turn conversations into conversions.",
    description:
      "Build multi-step WhatsApp sequences that qualify leads, answer FAQs, book appointments, and nurture prospects — all without manual intervention.",
    highlights: [
      "Automated lead intake and qualification flows",
      "Appointment booking and reminder sequences",
      "FAQ bots with natural language understanding",
      "Integration with GoHighLevel, HubSpot, and custom CRMs",
    ],
  },
  {
    slug: "ai-automation",
    label: "AI Workflow Automation",
    tagline: "Remove the bottlenecks that cost you revenue.",
    description:
      "Design and implement end-to-end AI automation systems that eliminate repetitive tasks, reduce human error, and give your team back hours every week.",
    highlights: [
      "Custom workflow design and process mapping",
      "AI-powered data extraction and document processing",
      "Multi-platform API and webhook integrations",
      "Monitoring, error handling, and fallback logic",
    ],
  },
  {
    slug: "cinematic-websites",
    label: "Cinematic Websites",
    tagline: "A website that earns trust before you say a word.",
    description:
      "Premium, high-performance web experiences built with Next.js, GSAP, and WebGL — designed to convert visitors into clients and position your brand as the obvious choice.",
    highlights: [
      "Custom Next.js builds with sub-second load times",
      "Cinematic scroll animations and 3D motion layers",
      "Semantic HTML, accessibility, and Core Web Vitals compliance",
      "CMS integration, analytics, and conversion tracking",
    ],
  },
  {
    slug: "gohighlevel-automation",
    label: "GoHighLevel Automation",
    tagline: "Make your CRM work as hard as you do.",
    description:
      "Build, configure, and automate the full GoHighLevel stack — from pipelines and smart lists to complex multi-step automation workflows that run without manual input.",
    highlights: [
      "Custom pipeline architecture for your sales process",
      "Automated follow-up sequences via SMS, email, and voice",
      "Snapshot creation, sub-account setup, and team onboarding",
      "Reporting dashboards and conversion tracking",
    ],
  },
];

export default function ServicesPage() {
  return (
    <SecondaryPageLayout>
      <section className="chapter">
        <div className="shell">
          {/* Header */}
          <div className="max-w-[800px] mb-16">
            <span className="text-[#93969e] text-xs font-mono tracking-widest uppercase block mb-4">
              02 // Services &amp; Capabilities
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-6">
              Built for speed, accuracy, and conversion.
            </h1>
            <p className="text-lg md:text-xl text-[#b8bac1] leading-relaxed">
              We design and implement custom systems that remove operational
              delays, improve lead capturing, and deliver high-impact digital
              experiences. Every service is scoped, built, and delivered to
              production — no templates, no generic stacks.
            </p>
          </div>

          {/* Service Cards */}
          <div className="border-t border-[rgba(255,255,255,0.08)] pt-12 space-y-0">
            {services.map((service, idx) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group block border-b border-[rgba(255,255,255,0.08)] py-10 hover:bg-[rgba(255,255,255,0.02)] transition-colors -mx-4 px-4 md:-mx-8 md:px-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 md:gap-12 items-start">
                  {/* Index number */}
                  <span className="text-xs font-mono text-[#93969e] tracking-widest pt-1 w-8">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  {/* Content */}
                  <div>
                    <div className="flex items-baseline gap-4 mb-2 flex-wrap">
                      <h2 className="text-2xl md:text-3xl font-bold group-hover:text-[#4a79ff] transition-colors">
                        {service.label}
                      </h2>
                      <span className="text-[#93969e] text-sm font-mono">
                        — {service.tagline}
                      </span>
                    </div>
                    <p className="text-[#b8bac1] leading-relaxed mb-4 max-w-2xl">
                      {service.description}
                    </p>
                    <ul className="flex flex-wrap gap-x-6 gap-y-1">
                      {service.highlights.map((h) => (
                        <li
                          key={h}
                          className="text-sm text-[#93969e] font-mono before:content-['→'] before:mr-2"
                        >
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Arrow */}
                  <span className="text-[#93969e] group-hover:text-white group-hover:translate-x-1 transition-all text-xl hidden md:block pt-1">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="mt-20 pt-12 border-t border-[rgba(255,255,255,0.08)]">
            <div className="max-w-[600px]">
              <h2 className="text-3xl font-bold mb-4">
                Not sure which service fits your situation?
              </h2>
              <p className="text-[#b8bac1] leading-relaxed mb-8">
                Most projects combine two or more capabilities — for example, an
                AI voice agent paired with a GoHighLevel automation pipeline, or
                a cinematic website with WhatsApp follow-up sequences. Book a
                scoping call and we&apos;ll map the right stack to your goals.
              </p>
              <div className="flex gap-6 flex-wrap">
                <Link
                  href="/contact"
                  className="inline-block px-8 py-4 bg-white text-black font-semibold rounded hover:bg-[#4a79ff] hover:text-white transition-colors"
                >
                  Book a Scoping Call
                </Link>
                <Link
                  href="/pricing"
                  className="inline-block px-8 py-4 border border-[rgba(255,255,255,0.18)] text-white font-semibold rounded hover:border-white transition-colors"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SecondaryPageLayout>
  );
}
