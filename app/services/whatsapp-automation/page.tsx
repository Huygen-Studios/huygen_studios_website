import { Metadata } from "next";
import Link from "next/link";
import { SecondaryPageLayout } from "@/components/web3/SecondaryPageLayout";

export const metadata: Metadata = {
  title: "WhatsApp API Automation & Lead Routing | Huygen Studios",
  description: "Automate prospect conversations, qualify customer leads, and integrate database routers using the official WhatsApp Business Cloud API.",
  alternates: {
    canonical: "https://www.huygenstudios.com/services/whatsapp-automation",
  },
};

export default function WhatsAppAutomationPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "WhatsApp Business Cloud API Automation Services",
    "provider": {
      "@type": "Organization",
      "name": "Huygen Studios",
      "url": "https://www.huygenstudios.com",
    },
    "description": "Custom development of conversational lead qualification flows, verified webhook authentication, and CRM sync using Meta's Cloud API.",
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
            WhatsApp Business API Automation
          </h1>
          <p className="text-xl text-zinc-300 leading-relaxed">
            Reach prospects on their preferred channel. Build secure, structured lead qualification systems using the official Meta WhatsApp Business Cloud API.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Who This Service Is For</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            Designed for scaling service agencies, international operations divisions, and B2C sales teams looking to replace slow email outreach with high-response conversational messaging.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Core Problems Solved</h2>
          <ul className="list-disc pl-6 text-zinc-300 space-y-2 leading-relaxed">
            <li><strong>Low Contact Rates:</strong> Achieves high response rates compared to standard email campaigns.</li>
            <li><strong>Manual Qualification Overhead:</strong> Automates conversational qualification trees, freeing sales teams to focus on warm leads.</li>
            <li><strong>Fragmented Communication:</strong> Keeps customer conversations synced directly to your CRM timeline.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Key Deliverables</h2>
          <ul className="list-disc pl-6 text-zinc-300 space-y-2 leading-relaxed">
            <li><strong>Verified Webhook Router:</strong> Next.js webhook routes with signature validation (`X-Hub-Signature-256`) to process messages securely.</li>
            <li><strong>Stateful Conversation Manager:</strong> Database systems that track conversation state, budget, and project details.</li>
            <li><strong>CRM Data Integrations:</strong> API sync routines connecting WhatsApp messages directly with HubSpot or custom databases.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Implementation Process</h2>
          <ol className="list-decimal pl-6 text-zinc-300 space-y-3 leading-relaxed">
            <li><strong>Account Verification (Week 1):</strong> Complete Meta Business Manager verification and set up WhatsApp developer credentials.</li>
            <li><strong>Flow Design & Logic Mapping (Week 2):</strong> Map conversational trees, question sequences, and state updates.</li>
            <li><strong>Webhook & API Development (Week 3):</strong> Build verification routes, connect to database queues, and establish CRM integrations.</li>
            <li><strong>Opt-in & Security Audit (Week 4):</strong> Test opt-out compliance (STOP/UNSUBSCRIBE), confirm data encryption, and launch the system.</li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Supported Integrations & Tools</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            We build using Meta&apos;s **WhatsApp Business Cloud API**, **Twilio SMS**, **Supabase**, **Redis**, **Whisper API** (for transcribing voice notes), and CRM APIs.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Timeline Expectations</h2>
          <p className="text-zinc-300 leading-relaxed">
            A standard WhatsApp lead qualification setup takes **3 weeks** from account verification to live launch.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Operational Risks & Limitations</h2>
          <p className="text-zinc-300 leading-relaxed">
            Meta enforces strict template approval guidelines and message category policies. Additionally, cold outreach messaging is prohibited on WhatsApp. Our architectures are designed to comply with Meta&apos;s developer terms and require explicit user opt-in before launching communication workflows.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Do we need a dedicated phone number?</h3>
              <p className="text-zinc-300 leading-relaxed">
                Yes. Meta requires a clean phone number that is not currently linked to a personal WhatsApp account. We assist you in acquiring and configuring a clean number via Twilio or virtual numbers.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Can users reply with voice notes?</h3>
              <p className="text-zinc-300 leading-relaxed">
                Yes. Our stateful conversation managers transcribe voice notes into text using Whisper API, allowing the system to process voice replies seamlessly.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12 p-6 rounded-lg bg-zinc-900 border border-zinc-800">
          <h2 className="text-2xl font-bold text-white mb-4">Related Insights</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            Read more about WhatsApp API integrations in our technical blog:
          </p>
          <ul className="space-y-2">
            <li>
              <Link href="/blog/secure-lead-qualification-whatsapp-cloud-api" className="text-cyan-400 hover:underline">
                &rarr; Secure Lead Qualification with the WhatsApp Cloud API
              </Link>
            </li>
            <li>
              <Link href="/blog/whatsapp-lead-qualification-flow" className="text-cyan-400 hover:underline">
                &rarr; Designing a WhatsApp Lead Qualification Flow with the Meta Cloud API
              </Link>
            </li>
          </ul>
        </section>

        <section className="text-center pt-8 border-t border-zinc-800">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to automate your WhatsApp messaging?</h2>
          <p className="text-zinc-300 mb-6">
            Schedule a technical consultation to plan your WhatsApp Business API integration.
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
