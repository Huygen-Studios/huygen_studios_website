import { Metadata } from "next";
import Link from "next/link";
import { SecondaryPageLayout } from "@/components/web3/SecondaryPageLayout";

export const metadata: Metadata = {
  title: "AI Automation & Operations Optimization | Huygen Studios",
  description: "Automate repetitive data entries, sync communication channels, and design ROI-driven operational pipelines using custom API workflows.",
  alternates: {
    canonical: "https://www.huygenstudios.com/services/ai-automation",
  },
};

export default function AIAutomationPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI Automation & Operations Optimization Development",
    "provider": {
      "@type": "Organization",
      "name": "Huygen Studios",
      "url": "https://www.huygenstudios.com",
    },
    "description": "Custom development of business automations, CRM synchronizations, data pipeline routing, and API integrations.",
    "areaServed": "Worldwide",
    "category": "AI Automation",
  };

  return (
    <SecondaryPageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <header className="mb-12">
          <Link
            href="/services"
            className="text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors duration-200"
          >
            &larr; Back to Services
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mt-4 mb-6">
            AI Automation & Operations Optimization
          </h1>
          <p className="text-xl text-zinc-300 leading-relaxed">
            Eliminate manual data entry errors. Connect your core business applications into a single, automated, and secure data pipeline.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Who This Service Is For</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            Designed for professional service firms, mid-market ecommerce brands, and operations managers who spend hours copying contact records, routing booking slots, or verifying document files manually.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Core Problems Solved</h2>
          <ul className="list-disc pl-6 text-zinc-300 space-y-2 leading-relaxed">
            <li><strong>Manual Transcription Errors:</strong> Automates data entry between web forms, email receipts, and CRM platforms.</li>
            <li><strong>Slow Lead Response Times:</strong> Dispatches instant confirmations and alerts to sales teams on new inbound inquiries.</li>
            <li><strong>Fragmented Tech Stacks:</strong> Connects disparate software tools (e.g. Stripe, Slack, HubSpot, Twilio) into a single flow.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Key Deliverables</h2>
          <ul className="list-disc pl-6 text-zinc-300 space-y-2 leading-relaxed">
            <li><strong>Custom API Workflows:</strong> Custom Node.js/Next.js API routes built for high-volume lead routing.</li>
            <li><strong>Database Synchronization Rules:</strong> Relational schemas and index configurations to query lead status dynamically.</li>
            <li><strong>Automated Notification Systems:</strong> Slack and email notification webhooks to alert team members when actions are required.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Implementation Process</h2>
          <ol className="list-decimal pl-6 text-zinc-300 space-y-3 leading-relaxed">
            <li><strong>Operational Audit (Week 1):</strong> Audit manual workflows and map out data requirements.</li>
            <li><strong>Database Scaffolding (Week 2):</strong> Build tracking queues, configure schema fields, and establish API authentication.</li>
            <li><strong>Flow Integration (Week 3):</strong> Link CRM webhooks, set up Slack/email alerts, and construct data mapping rules.</li>
            <li><strong>Error Monitoring Setup (Week 4):</strong> Integrate error tracking dashboards and launch.</li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Supported Integrations & Tools</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            We work with all modern APIs: **Zapier**, **Make**, **HubSpot API**, **Stripe API**, **ActiveCampaign**, **Slack Webhooks**, **PostgreSQL**, and **Supabase**.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Timeline Expectations</h2>
          <p className="text-zinc-300 leading-relaxed">
            Custom automation pipelines are typically deployed within **2 to 3 weeks** depending on the complexity of your tech stack.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Operational Risks & Limitations</h2>
          <p className="text-zinc-300 leading-relaxed">
            Automating a broken manual workflow will only result in errors occurring faster. We conduct an operational audit prior to implementation to ensure your data rules are defined and structured.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Can we use no-code tools like Zapier?</h3>
              <p className="text-zinc-300 leading-relaxed">
                Yes. We build using Zapier or Make for simple triggers, while reserving custom serverless routes for complex routing rules and high-volume data pipelines.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">How do we track errors in automated flows?</h3>
              <p className="text-zinc-300 leading-relaxed">
                We set up automated Slack alert webhooks and database retry logs that trigger instantly if an API call fails, allowing your team to identify and resolve issues quickly.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12 p-6 rounded-lg bg-zinc-900 border border-zinc-800">
          <h2 className="text-2xl font-bold text-white mb-4">Related Insights</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            Learn more about operations optimization in our technical blog:
          </p>
          <ul className="space-y-2">
            <li>
              <Link href="/blog/what-to-automate-first-in-a-small-business" className="text-cyan-400 hover:underline">
                &rarr; What to Automate First in a Small Business: An ROI-Driven Framework
              </Link>
            </li>
            <li>
              <Link href="/blog/automation-agency-tech-stack-guide" className="text-cyan-400 hover:underline">
                &rarr; The Automation Agency Tech Stack: A Guide to Enterprise Integration
              </Link>
            </li>
          </ul>
        </section>

        <section className="text-center pt-8 border-t border-zinc-800">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to automate your operations?</h2>
          <p className="text-zinc-300 mb-6">
            Consult our developers to scope your automation pipeline.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-white text-black font-semibold rounded hover:bg-zinc-200 transition-colors duration-200"
          >
            Contact Builders &rarr;
          </Link>
        </section>
      </div>
    </SecondaryPageLayout>
  );
}
