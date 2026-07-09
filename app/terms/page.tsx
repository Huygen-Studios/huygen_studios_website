import type { Metadata } from "next";
import { SecondaryPageLayout } from "@/components/web3/SecondaryPageLayout";

export const metadata: Metadata = {
  title: "Terms of Service | Huygen Studios",
  description: "Read the Terms of Service of Huygen Studios. Understand project scoping, source code ownership, intellectual property rights, and support terms.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <SecondaryPageLayout>
      <section className="chapter">
        <div className="shell">
          <div className="max-w-[800px] mb-12">
            <span className="text-[#93969e] text-xs font-mono tracking-widest uppercase block mb-4">Last Updated: July 9, 2026</span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-none mb-6">Terms of Service</h1>
            <p className="text-lg text-[#b8bac1] leading-relaxed">
              These terms outline the delivery framework, client responsibilities, and intellectual property transfers that govern engagements with Huygen Studios.
            </p>
          </div>

          <div className="max-w-[900px] border-t border-[rgba(255,255,255,0.18)] pt-12 space-y-8 text-sm text-[#b8bac1] leading-relaxed">
            <div>
              <h2 className="text-xl font-bold text-white mb-3">1. Scope and Delivery</h2>
              <p>
                Each project begins with a structured scoping phase defining technical criteria, functional requirements, and milestones. Scope adjustments requested after confirmation will be estimated separately as distinct project additions.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">2. Code Ownership & Intellectual Property</h2>
              <p>
                Upon complete settlement of agreed project payments, Huygen Studios transfers full source code ownership, design layouts, and deployment files to the client. All third-party library licenses, API fees, or hosting charges remain the client&apos;s responsibility.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">3. Client Responsibilities</h2>
              <p>
                To maintain project velocity, the client agrees to provide timely feedback, asset files, and secure API credentials. Huygen Studios is not responsible for delays caused by third-party api outages or missing client inputs.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">4. Support & Maintenance Terms</h2>
              <p>
                Standard project builds include a 30-day warranty window for bug remediation (fixing deviations from the agreed scope). Continued adjustments, monitoring, and database updates after this window require an active studio support retainer.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">5. Termination and Inquiries</h2>
              <p>
                Either party may terminate an active engagement in accordance with the terms defined in the primary service agreement. For questions or to initiate a service dispute, contact:
                <br />
                <a href="mailto:hello@huygenstudios.com" className="text-white underline hover:text-[#4a79ff] transition-colors">
                  hello@huygenstudios.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </SecondaryPageLayout>
  );
}
