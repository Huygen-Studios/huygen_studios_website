import type { Metadata } from "next";
import Link from "next/link";
import { SecondaryPageLayout } from "@/components/web3/SecondaryPageLayout";

export const metadata: Metadata = {
  title: "Contact the Builders | Huygen Studios",
  description: "Get in touch with Huygen Studios. Share your custom AI automation, WhatsApp API setup, or WebGL Next.js development requirements.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <SecondaryPageLayout>
      <section className="chapter">
        <div className="shell">
          <div className="max-w-[800px] mb-16">
            <span className="text-[#93969e] text-xs font-mono tracking-widest uppercase block mb-4">05 // Contact the Studio</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-6">Start the conversion.</h1>
            <p className="text-lg md:text-xl text-[#b8bac1] leading-relaxed">
              Have an operational bottleneck or a high-end web concept to build? Tell us what you want to improve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-[rgba(255,255,255,0.18)] pt-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">Direct Contact Channels</h2>
              <p className="text-[#b8bac1] leading-relaxed mb-6">
                You can reach our design and technology engineering teams directly at:
              </p>
              <div className="space-y-4 font-mono text-sm mb-8">
                <div>
                  <span className="text-neutral-500 block text-xs tracking-wider uppercase mb-1">Email Inquiry</span>
                  <a href="mailto:hello@huygenstudios.com" className="text-white hover:text-[#4a79ff] underline text-lg transition-colors">
                    hello@huygenstudios.com
                  </a>
                </div>
                <div>
                  <span className="text-neutral-500 block text-xs tracking-wider uppercase mb-1">Office Telephone</span>
                  <a href="tel:+919262102440" className="text-white hover:text-[#4a79ff] transition-colors">
                    +91-9262102440
                  </a>
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">Response SLA Expectations</h3>
              <p className="text-[#b8bac1] text-sm leading-relaxed">
                We respond to all qualified service inquiries within 24 to 48 business hours with the exact questions needed to scope your build.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Inquiry Guidance</h2>
              <p className="text-[#b8bac1] leading-relaxed mb-6">
                To help us prepare for our first meeting, please outline:
              </p>
              <ul className="list-decimal list-inside text-[#b8bac1] text-sm space-y-4 mb-8">
                <li>
                  <strong>The core bottleneck:</strong> What workflow, integration, or layout currently creates delay, leaks leads, or lacks visibility?
                </li>
                <li>
                  <strong>System details:</strong> What software tools (e.g. CRM, calling platforms) must the automation connect to?
                </li>
                <li>
                  <strong>Success criteria:</strong> What specific outcome will mark this project as successful?
                </li>
              </ul>
              <div className="flex gap-4">
                <Link href="/services" className="text-white underline hover:text-[#4a79ff] text-xs transition-colors">
                  Review Capabilities
                </Link>
                <span className="text-neutral-600">•</span>
                <Link href="/faq" className="text-white underline hover:text-[#4a79ff] text-xs transition-colors">
                  Frequently Asked Questions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SecondaryPageLayout>
  );
}
