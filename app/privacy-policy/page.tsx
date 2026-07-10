import type { Metadata } from "next";
import { SecondaryPageLayout } from "@/components/web3/SecondaryPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | Huygen Studios",
  description: "Read the Privacy Policy of Huygen Studios to understand how we collect, use, and protect information about visitors to our website.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <SecondaryPageLayout>
      <section className="chapter">
        <div className="shell">
          <div className="max-w-[800px] mb-12">
            <span className="text-[#93969e] text-xs font-mono tracking-widest uppercase block mb-4">Last Updated: July 10, 2026</span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-none mb-6">Privacy Policy</h1>
            <p className="text-lg text-[#b8bac1] leading-relaxed">
              This policy explains what information Huygen Studios (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) collects when you visit{" "}
              <strong>www.huygenstudios.com</strong>, how we use it, and what your rights are.
            </p>
          </div>

          <div className="max-w-[900px] border-t border-[rgba(255,255,255,0.18)] pt-12 space-y-8 text-sm text-[#b8bac1] leading-relaxed">

            <div>
              <h2 className="text-xl font-bold text-white mb-3">1. Information We Collect</h2>
              <p className="mb-2">We may collect the following categories of information:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <strong>Contact Form Data:</strong> Name, email address, company name, and any message you submit via our contact form. This data is used solely to respond to your enquiry.
                </li>
                <li>
                  <strong>Usage Data (Analytics):</strong> When you visit this website, analytics tools may automatically collect your IP address (anonymised), browser type, operating system, referring URL, pages visited, and session duration. This data is collected in aggregate and is not linked to your personal identity.
                </li>
                <li>
                  <strong>Advertising Data:</strong> If Google AdSense is active on this website, Google may use cookies to serve ads based on your prior visits to this site and other sites on the internet. You can opt out of personalised advertising via{" "}
                  <a href="https://www.google.com/settings/ads" className="text-white underline hover:text-[#4a79ff] transition-colors" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">2. Cookies</h2>
              <p className="mb-2">
                This website may use the following types of cookies:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Essential Cookies:</strong> Required for the website to function correctly. These cannot be disabled.
                </li>
                <li>
                  <strong>Analytics Cookies (Google Analytics):</strong> If configured, we use Google Analytics to understand how visitors use this site. Google Analytics uses cookies to collect information such as how often users visit, what pages they visit, and what other sites they used prior to visiting. Google Analytics collects only the IP address assigned to you on the date you visit, not your name or other identifying information. We do not combine this data with other personal information. You may opt out by installing the{" "}
                  <a href="https://tools.google.com/dlpage/gaoptout" className="text-white underline hover:text-[#4a79ff] transition-colors" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.
                </li>
                <li>
                  <strong>Advertising Cookies (Google AdSense):</strong> If AdSense ads are displayed, Google and its partners may use cookies to serve ads based on your browsing history. You may control advertising personalisation via{" "}
                  <a href="https://www.google.com/settings/ads" className="text-white underline hover:text-[#4a79ff] transition-colors" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>{" "}
                  or opt out of network advertising via{" "}
                  <a href="https://optout.aboutads.info/" className="text-white underline hover:text-[#4a79ff] transition-colors" target="_blank" rel="noopener noreferrer">AboutAds</a>.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">3. How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>To respond to enquiries submitted via our contact form.</li>
                <li>To improve website performance, content, and user experience using aggregate analytics data.</li>
                <li>To display relevant advertising, where AdSense is active.</li>
                <li>We do not sell, rent, or share your personal data with third parties for marketing purposes.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">4. Data Retention</h2>
              <p>
                Contact form submissions are retained for as long as necessary to address your enquiry and for up to 12 months thereafter. Analytics data is retained in accordance with Google&apos;s data retention policies (typically 14 months). You may request deletion at any time by contacting us.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">5. Third-Party Services</h2>
              <p className="mb-2">This website integrates with the following third-party services, each governed by their own privacy policies:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <a href="https://policies.google.com/privacy" className="text-white underline hover:text-[#4a79ff] transition-colors" target="_blank" rel="noopener noreferrer">Google Analytics</a> — website analytics
                </li>
                <li>
                  <a href="https://policies.google.com/privacy" className="text-white underline hover:text-[#4a79ff] transition-colors" target="_blank" rel="noopener noreferrer">Google AdSense</a> — advertising
                </li>
                <li>
                  <a href="https://vercel.com/legal/privacy-policy" className="text-white underline hover:text-[#4a79ff] transition-colors" target="_blank" rel="noopener noreferrer">Vercel</a> — website hosting and infrastructure
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">6. Your Rights</h2>
              <p className="mb-2">
                Depending on your location, you may have the following rights regarding your personal data:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Right to access the data we hold about you.</li>
                <li>Right to correct inaccurate data.</li>
                <li>Right to request deletion of your data.</li>
                <li>Right to object to processing or to withdraw consent.</li>
                <li>Right to data portability.</li>
              </ul>
              <p className="mt-2">
                To exercise any of these rights, please contact us at the address below.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">7. International Transfers</h2>
              <p>
                This website is hosted on Vercel infrastructure which may store or process data in the United States. Google Analytics and AdSense also process data in the US. Where applicable, these transfers are governed by Standard Contractual Clauses or equivalent safeguards.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">8. Changes to This Policy</h2>
              <p>
                We may update this policy periodically. Changes will be posted on this page with an updated &quot;Last Updated&quot; date. Continued use of the website after changes constitutes acceptance of the updated policy.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">9. Contact</h2>
              <p>
                For questions, data access requests, or deletion requests, contact:<br />
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
