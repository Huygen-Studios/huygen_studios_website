import { Metadata } from "next";
import Link from "next/link";
import { SecondaryPageLayout } from "@/components/web3/SecondaryPageLayout";

export const metadata: Metadata = {
  title: "GoHighLevel API Integration & CRM Workflows | Huygen Studios",
  description: "Structure custom GoHighLevel CRM workflows, manage OAuth token refreshes, and build secure lead routing databases.",
  alternates: {
    canonical: "https://www.huygenstudios.com/services/gohighlevel-automation",
  },
};

export default function GoHighLevelAutomationPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "GoHighLevel API Integration & CRM Workflows",
    "provider": {
      "@type": "Organization",
      "name": "Huygen Studios",
      "url": "https://www.huygenstudios.com",
    },
    "description": "Custom integration of GoHighLevel workflows, webhook routers, OAuth authentication tokens, and lead databases.",
    "areaServed": "Worldwide",
    "category": "CRM & Integrations",
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
            GoHighLevel Automation & CRM Integration
          </h1>
          <p className="text-xl text-zinc-300 leading-relaxed">
            Connect GoHighLevel to your broader API ecosystem. We build custom OAuth middleware, webhook routers, and relational database integrations to scale your CRM.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Who This Service Is For</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            Designed for mid-market businesses, marketing agencies, and professional services networks that manage high-volume lead pipelines and require advanced routing rules beyond GHL&apos;s built-in visual editor.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Core Problems Solved</h2>
          <ul className="list-disc pl-6 text-zinc-300 space-y-2 leading-relaxed">
            <li><strong>Fragile Workflow Builders:</strong> Replaces complex, nested visual workflows with clean, testable external API code.</li>
            <li><strong>OAuth Token Failures:</strong> Automates GHL&apos;s 24-hour token refresh flow to prevent API failures.</li>
            <li><strong>Lead Attribution Loss:</strong> Capture and sync UTM tracking parameters directly to GHL contact records.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Key Deliverables</h2>
          <ul className="list-disc pl-6 text-zinc-300 space-y-2 leading-relaxed">
            <li><strong>Secure Webhook Receivers:</strong> API endpoints that validate GHL workflow payloads.</li>
            <li><strong>OAuth Token Manager:</strong> Background task runners that refresh access tokens automatically.</li>
            <li><strong>Relational DB Syncs:</strong> Relational schemas that sync GHL contact fields to your internal databases.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Implementation Process</h2>
          <ol className="list-decimal pl-6 text-zinc-300 space-y-3 leading-relaxed">
            <li><strong>Field Mapping & Audit (Week 1):</strong> Inventory custom fields, sub-accounts, and design the API structure.</li>
            <li><strong>OAuth Middleware Setup (Week 2):</strong> Build token refresh cron jobs and database tables.</li>
            <li><strong>Webhook & Routing Integration (Week 3):</strong> Build verification endpoints, map fields, and connect CRM triggers.</li>
            <li><strong>Testing & Deployment (Week 4):</strong> Test lead routing scenarios, confirm token refreshing, and launch.</li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Supported Integrations & Tools</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            We work with GHL developer tools: **GoHighLevel API v2**, **LeadConnector**, **PostgreSQL**, **Redis**, **Supabase**, and custom Next.js serverless routes.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Timeline Expectations</h2>
          <p className="text-zinc-300 leading-relaxed">
            Custom GHL integrations and database syncs are typically deployed within **3 to 4 weeks**.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Operational Risks & Limitations</h2>
          <p className="text-zinc-300 leading-relaxed">
            Hardcoding custom field IDs inside your code will lead to errors if you deploy the system across multiple sub-accounts. Our integrations query GHL&apos;s Custom Fields API dynamically to retrieve IDs by key name, ensuring stability.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">How do you handle API token refreshing?</h3>
              <p className="text-zinc-300 leading-relaxed">
                We build an automated cron job that runs every 12 hours. It requests a fresh GHL access token and updates the database, ensuring API connections remain active.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Can we sync GHL to other CRMs?</h3>
              <p className="text-zinc-300 leading-relaxed">
                Yes. We build custom middleware that handles bidirectional synchronization between GHL and platforms like HubSpot, ActiveCampaign, or internal databases.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12 p-6 rounded-lg bg-zinc-900 border border-zinc-800">
          <h2 className="text-2xl font-bold text-white mb-4">Related Insights</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            Read more about CRM architecture in our technical blog:
          </p>
          <ul className="space-y-2">
            <li>
              <Link href="/blog/gohighlevel-automation-architecture" className="text-cyan-400 hover:underline">
                &rarr; Enterprise GoHighLevel Automation Architecture & CRM Integration
              </Link>
            </li>
            <li>
              <Link href="/blog/crm-pipeline-for-local-service-businesses" className="text-cyan-400 hover:underline">
                &rarr; Designing a CRM Pipeline for Local Service Businesses
              </Link>
            </li>
          </ul>
        </section>

        <section className="text-center pt-8 border-t border-zinc-800">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to automate your GHL workflow?</h2>
          <p className="text-zinc-300 mb-6">
            Consult our developers to map your GoHighLevel integration.
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
