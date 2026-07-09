import { Metadata } from "next";
import Link from "next/link";
import { SecondaryPageLayout } from "@/components/web3/SecondaryPageLayout";

export const metadata: Metadata = {
  title: "AI Voice Agents & Automated Call Assistants | Huygen Studios",
  description: "Deploy latency-optimized, natural conversational voice assistants integrated directly with your telephony carrier APIs and CRM pipelines.",
  alternates: {
    canonical: "https://www.huygenstudios.com/services/ai-voice-agents",
  },
};

export default function AIVoiceAgentsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI Voice Agents & Conversational Assistants Development",
    "provider": {
      "@type": "Organization",
      "name": "Huygen Studios",
      "url": "https://www.huygenstudios.com",
    },
    "description": "Custom development of low-latency, conversational voice agents using Twilio webhooks, ASR/TTS engines, and LLM integrations.",
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
            AI Voice Agents & Conversational Call Assistants
          </h1>
          <p className="text-xl text-zinc-300 leading-relaxed">
            Deploy latency-optimized, natural-sounding voice assistants that qualify prospects, manage dispatch sequences, and book calendar slots 24/7.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Who This Service Is For</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            Our custom voice systems are designed for high-volume customer service operations, including residential contracting offices, legal firms, logistics routing centers, and scaling sales departments that cannot afford missed inbound calls or delayed lead recovery.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Core Problems Solved</h2>
          <ul className="list-disc pl-6 text-zinc-300 space-y-2 leading-relaxed">
            <li><strong>Missed Call Loss:</strong> Recovers leads within 30 seconds by executing automated callback sequences.</li>
            <li><strong>Staff Availability Constraints:</strong> Manages front-desk routing and calendar booking outside business hours without human oversight.</li>
            <li><strong>High Operational Costs:</strong> Replaces expensive call center routing setups with cost-effective pay-per-minute consumables.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Key Deliverables</h2>
          <ul className="list-disc pl-6 text-zinc-300 space-y-2 leading-relaxed">
            <li><strong>Custom Voice Script Prompts:</strong> System prompts engineered for low reply latency and natural conversation flows.</li>
            <li><strong>Bidirectional Audio Streaming Routes:</strong> Webhook infrastructure connecting Twilio Media Streams to low-latency engines.</li>
            <li><strong>CRM Integration Hooks:</strong> Automated tool calling models that sync captured details directly with HubSpot, GoHighLevel, or custom database engines.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Implementation Process</h2>
          <ol className="list-decimal pl-6 text-zinc-300 space-y-3 leading-relaxed">
            <li><strong>Discovery & Prompt Mapping (Week 1):</strong> Map conversational routing rules, custom terminology, and system behaviors.</li>
            <li><strong>Telephony & Webhook Engineering (Week 2):</strong> Build and secure API routes to manage Media Streams.</li>
            <li><strong>LLM & TTS Calibration (Week 3):</strong> Integrate speech recognition (Deepgram) and text-to-speech (Cartesia/ElevenLabs) for sub-second responses.</li>
            <li><strong>Beta Routing Tests & Launch (Week 4):</strong> Execute call simulation reviews, test CRM syncing, and deploy live routes.</li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Supported Integrations & Tools</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            We build using industry-standard tools: **Twilio**, **Telnyx**, **Retell API**, **Vapi**, **Deepgram ASR**, **ElevenLabs**, **Cartesia**, **Google Calendar**, and **Cal.com**.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Timeline Expectations</h2>
          <p className="text-zinc-300 leading-relaxed">
            A standard custom AI voice pilot takes **3 to 4 weeks** from initial mapping to deployment.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Operational Risks & Limitations</h2>
          <p className="text-zinc-300 leading-relaxed">
            Conversational AI is not a complete replacement for human empathy. Voice agents can encounter difficulty when handling complex, unstructured disputes or callers with heavy background noise. Our architectures are engineered with direct fallback triggers to route calls to human representatives when needed.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">How fast do the voice agents respond?</h3>
              <p className="text-zinc-300 leading-relaxed">
                By utilizing persistent WebSocket connections and streaming generated tokens in real time, our assistants achieve a response latency of **800ms to 1.2 seconds**, matching natural conversation speeds.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Can they book appointments directly?</h3>
              <p className="text-zinc-300 leading-relaxed">
                Yes. The agents utilize tool calling configurations to query live availability from Cal.com or Google Calendar, offer open slots to callers, and book meetings dynamically.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12 p-6 rounded-lg bg-zinc-900 border border-zinc-800">
          <h2 className="text-2xl font-bold text-white mb-4">Related Insights</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            Learn more about conversational voice engineering in our technical blog:
          </p>
          <ul className="space-y-2">
            <li>
              <Link href="/blog/automating-enterprise-workflows-llm-voice-agents" className="text-cyan-400 hover:underline">
                &rarr; Automating Enterprise Workflows with LLM Voice Agents
              </Link>
            </li>
            <li>
              <Link href="/blog/ai-voice-agent-appointment-booking-script" className="text-cyan-400 hover:underline">
                &rarr; Structuring an AI Voice Agent Script for Appointment Booking
              </Link>
            </li>
            <li>
              <Link href="/blog/ai-voice-agent-missed-call-workflow" className="text-cyan-400 hover:underline">
                &rarr; Building an AI Voice Agent Missed-Call Recovery Workflow
              </Link>
            </li>
          </ul>
        </section>

        <section className="text-center pt-8 border-t border-zinc-800">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to automate your call operations?</h2>
          <p className="text-zinc-300 mb-6">
            Get in touch with our engineering team to scope your conversational voice pilot.
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
