"use client";

import React from "react";
import { SiteNav } from "@/components/SiteNav";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-hidden pb-32">
      <SiteNav />

      <section className="relative z-10 px-6 pt-40 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
          Terms of Service
        </h1>
        <div className="prose prose-invert prose-lg max-w-none text-white/70">
          <p className="text-sm text-white/40 mb-12">Last updated: {new Date().toLocaleDateString()}</p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">1. Agreement to Terms</h2>
          <p>
            These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Huygen Studios ("we", "us", or "our"), concerning your access to and use of the huygenstudios.com website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
          </p>
          <p>
            By accessing the site, you agree that you have read, understood, and agree to be bound by all of these Terms of Service. If you do not agree with all of these Terms of Service, then you are expressly prohibited from using the site and our services and you must discontinue use immediately.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">2. Services</h2>
          <p>
            Huygen Studios provides premium AI automation systems, voice agents, WhatsApp automations, and cinematic web experiences. The specific details, deliverables, timelines, and costs of these services will be outlined in separate, individual service agreements, statements of work, or proposals provided to clients.
          </p>
          <p>
            We reserve the right to modify, suspend, or discontinue any aspect of our services at any time, including the availability of any feature, database, or content without prior notice or liability.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">3. Intellectual Property Rights</h2>
          <p>
            Unless otherwise indicated, the Site and our services are our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us.
          </p>
          <p>
            Client deliverables and bespoke software components developed specifically for a client will be subject to the intellectual property transfer terms defined in the specific service agreement signed by both parties.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">4. User Representations</h2>
          <p>
            By using the Site or our services, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Service.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">5. Prohibited Activities</h2>
          <p>
            You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">6. Third-Party Content and Services</h2>
          <p>
            Our AI solutions and automation systems frequently rely on third-party APIs, LLMs (Large Language Models), hosting providers, and communication platforms (e.g., WhatsApp, OpenAI, Twilio). We are not liable for any downtime, policy changes, data breaches, or service interruptions originating from these third-party services.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">7. Limitation of Liability</h2>
          <p>
            In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site or our services.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">8. Governing Law</h2>
          <p>
            These Terms shall be governed by and defined following the laws of India. Huygen Studios and yourself irrevocably consent that the courts of India shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">9. Contact Us</h2>
          <p>
            In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
          </p>
          <p className="mt-4">
            Huygen Studios<br />
            Email: <a href="mailto:hello@huygenstudios.com" className="text-blue-400 hover:underline">hello@huygenstudios.com</a>
          </p>
        </div>
      </section>
    </main>
  );
}
