import type { Metadata } from "next";
import Link from "next/link";
import { SecondaryPageLayout } from "@/components/web3/SecondaryPageLayout";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Huygen Studios",
  description: "Read detailed answers to 15 key FAQs regarding our custom AI automation systems, voice calling agents, WhatsApp integrations, web development, and support terms.",
  alternates: { canonical: "/faq" },
};

export default function FAQPage() {
  const categories = [
    {
      title: "AI Automation & Systems",
      items: [
        {
          q: "What is an outbound AI calling agent?",
          a: "It is a conversational voice system powered by custom large language models (LLMs) and text-to-speech engines. It qualifies inbound leads, confirms appointments, and triggers operational workflows automatically in real time, mirroring a natural conversation without human delays."
        },
        {
          q: "How does WhatsApp automation integrate with our business?",
          a: "We construct custom API routes connecting Meta's official WhatsApp Business Cloud API with your internal CRM. This allows agents to qualify leads, send custom confirmations, handle customer inquiries, and update system pipelines instantly."
        },
        {
          q: "Can the AI voice agent handle complex technical questions?",
          a: "Yes, by configuring retrieval-augmented generation (RAG) datasets, the agent only speaks from verified corporate materials, ensuring high-accuracy responses and strict compliance guidelines."
        },
        {
          q: "What fallback mechanisms exist if the AI fails or gets stuck?",
          a: "If the conversation exceeds uncertainty thresholds, the agent gracefully records a callback ticket, routes the conversation log to your active team, or initiates a warm transfer to a live representative."
        },
        {
          q: "Do you support custom database integrations?",
          a: "Yes. We integrate automations directly with standard SQL databases, custom corporate REST/GraphQL APIs, and enterprise CRM solutions like Salesforce, HubSpot, and Pipedrive."
        }
      ]
    },
    {
      title: "Web Development & Performance",
      items: [
        {
          q: "What is your primary web development tech stack?",
          a: "We build premium frontend applications using Next.js (App Router), React, TypeScript, and vanilla CSS for maximum speed and component flexibility. For interactive 3D WebGL experiences, we use React Three Fiber and Three.js."
        },
        {
          q: "How do you ensure fast load times and SEO crawlability?",
          a: "By leveraging Next.js static site generation (SSG), server-side rendering (SSR), and optimizing assets with modern format encoding. We implement metadata structures, robots.ts, and dynamic sitemaps out of the box."
        },
        {
          q: "Who owns the code once a project is finished?",
          a: "You do. We transfer complete source code, deployment setups, and asset files to your repository once project balances are settled. There are no vendor lock-in fees or ongoing software licenses."
        },
        {
          q: "Do you design custom design systems?",
          a: "Yes. For larger web builds, we implement custom, scalable Figma design systems and mirror them cleanly into Next.js React components using standardized design tokens."
        },
        {
          q: "What are your accessibility (a11y) standards?",
          a: "We design websites in compliance with WCAG 2.2 AA standards, ensuring keyboard navigation, semantic HTML tag hierarchy, appropriate aria labels, and solid color contrast ratios."
        }
      ]
    },
    {
      title: "Engagement & Support",
      items: [
        {
          q: "How are projects priced?",
          a: "We work on a fixed-scope project basis for major builds and structured pilots. For continuous maintenance, workflow updates, and asset production, we offer structured monthly retainers."
        },
        {
          q: "What is your typical delivery timeline?",
          a: "Validation pilots generally deliver in 2 to 4 weeks. High-fidelity custom web and automation builds typically range between 6 to 12 weeks depending on scale and integrations."
        },
        {
          q: "What is your service response SLA?",
          a: "We maintain a strict 24-to-48 hour response window for ongoing support and critical operational systems changes under our active retainer terms."
        },
        {
          q: "Where is my customer data stored?",
          a: "We host workflows in secure environments (Vercel, AWS) and ensure transit data is encrypted using SSL/TLS. We do not store your raw customer information on independent studio databases."
        },
        {
          q: "How do we get started?",
          a: "Get in touch via our contact form or by emailing hello@huygenstudios.com. We will arrange a focused call to discuss your current workflows and outline the next useful step."
        }
      ]
    }
  ];

  return (
    <SecondaryPageLayout>
      <section className="chapter">
        <div className="shell">
          <div className="max-w-[800px] mb-16">
            <span className="text-[#93969e] text-xs font-mono tracking-widest uppercase block mb-4">04 // FAQs & Help</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-6">Answers to core questions.</h1>
            <p className="text-lg md:text-xl text-[#b8bac1] leading-relaxed">
              Find detailed explanations regarding our system design, technical stack, delivery schedules, data protection, and pricing models.
            </p>
          </div>

          <div className="space-y-16 border-t border-[rgba(255,255,255,0.18)] pt-12">
            {categories.map((category) => (
              <div key={category.title} className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-[rgba(255,255,255,0.08)] pb-12 last:border-0 last:pb-0">
                <div>
                  <h2 className="text-2xl font-bold text-[#4a79ff] mb-4">{category.title}</h2>
                </div>
                <div className="md:col-span-2 space-y-8">
                  {category.items.map((item) => (
                    <div key={item.q}>
                      <h3 className="text-lg font-semibold mb-2 text-white">{item.q}</h3>
                      <p className="text-[#b8bac1] text-sm leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-[#b8bac1] text-sm mb-4">Have another question not answered here?</p>
            <Link href="/contact" className="text-white underline hover:text-[#4a79ff] transition-colors">
              Contact our builders
            </Link>
          </div>
        </div>
      </section>
    </SecondaryPageLayout>
  );
}
