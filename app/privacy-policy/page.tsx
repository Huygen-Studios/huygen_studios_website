import type { Metadata } from "next";
import { SecondaryPageLayout } from "@/components/web3/SecondaryPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | Huygen Studios",
  description: "Read the Privacy Policy of Huygen Studios to understand how we collect, process, and protect client database credentials and telemetry information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <SecondaryPageLayout>
      <section className="chapter">
        <div className="shell">
          <div className="max-w-[800px] mb-12">
            <span className="text-[#93969e] text-xs font-mono tracking-widest uppercase block mb-4">Last Updated: July 9, 2026</span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-none mb-6">Privacy Policy</h1>
            <p className="text-lg text-[#b8bac1] leading-relaxed">
              At Huygen Studios, we take the confidentiality of your business operations, database credentials, and customer lead logs extremely seriously.
            </p>
          </div>

          <div className="max-w-[900px] border-t border-[rgba(255,255,255,0.18)] pt-12 space-y-8 text-sm text-[#b8bac1] leading-relaxed">
            <div>
              <h2 className="text-xl font-bold text-white mb-3">1. Information We Collect</h2>
              <p className="mb-2">
                We only collect data that is essential for delivering our custom systems, including:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Contact info (name, business email hello@huygenstudios.com, organization detail).</li>
                <li>System credentials (temporary database keys, API endpoint endpoints, CRM webhooks) explicitly provided to facilitate integrations.</li>
                <li>Telemetry telemetry (performance event timings, conversational error status, LLM token response logs).</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">2. How We Use Information</h2>
              <p>
                We use collected information solely to build, monitor, harden, and optimize your custom AI calling agents, database connections, and web interfaces. We do not aggregate, sell, or license customer interaction logs to outside platforms or use them to train third-party open models.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">3. Data Security and Retention</h2>
              <p>
                All transit data processed by our custom webhooks is encrypted using TLS/SSL standards. Temporary integration keys are stored inside secure credential managers (e.g. AWS Secrets Manager, Vercel Environment Variables). We purge operational testing logs within 30 days of completing project delivery.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">4. Third-Party Integrations</h2>
              <p>
                Our AI automation builds connect to official third-party APIs (such as Meta&apos;s WhatsApp Cloud API, OpenAI API, Twilio, and CRM providers). Use of these services is subject to their respective privacy terms and agreements.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">5. Contact Information</h2>
              <p>
                For questions regarding data processing or to request credential removal, contact our data protection officer at:
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
