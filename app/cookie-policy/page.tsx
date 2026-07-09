import type { Metadata } from "next";
import { SecondaryPageLayout } from "@/components/web3/SecondaryPageLayout";

export const metadata: Metadata = {
  title: "Cookie Policy | Huygen Studios",
  description: "Read the Cookie Policy of Huygen Studios to understand how we use telemetry analytics and operational preference cookies.",
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <SecondaryPageLayout>
      <section className="chapter">
        <div className="shell">
          <div className="max-w-[800px] mb-12">
            <span className="text-[#93969e] text-xs font-mono tracking-widest uppercase block mb-4">Last Updated: July 9, 2026</span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-none mb-6">Cookie Policy</h1>
            <p className="text-lg text-[#b8bac1] leading-relaxed">
              This policy explains how Huygen Studios uses cookies and telemetry tools to improve performance, remember choices, and analyze traffic.
            </p>
          </div>

          <div className="max-w-[900px] border-t border-[rgba(255,255,255,0.18)] pt-12 space-y-8 text-sm text-[#b8bac1] leading-relaxed">
            <div>
              <h2 className="text-xl font-bold text-white mb-3">1. What Are Cookies?</h2>
              <p>
                Cookies are small text files stored on your browser or device by websites you visit. They allow sites to remember configurations, maintain user sessions, and gather performance telemetry data.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">2. How We Use Cookies</h2>
              <p className="mb-2">
                We use cookies for two primary purposes:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <strong>Essential Settings:</strong> To remember system preferences (such as dark mode preferences and active animation statuses).
                </li>
                <li>
                  <strong>Performance Telemetry:</strong> We integrate Google Analytics to analyze web traffic, device types, and page loading speeds. This helps us optimize performance across browsers.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">3. Managing and Opting Out</h2>
              <p>
                You can configure your web browser to block, remove, or alert you about cookies. Note that disabling essential configuration cookies may cause design elements or performance telemetry integrations to fall back to default layouts.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">4. Contact Us</h2>
              <p>
                For questions regarding our use of analytics cookies, contact:
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
