"use client";

import React from "react";
import { SiteNav } from "@/components/SiteNav";

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-hidden pb-32">
      <SiteNav />

      <section className="relative z-10 px-6 pt-40 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
          Cookie Policy
        </h1>
        <div className="prose prose-invert prose-lg max-w-none text-white/70">
          <p className="text-sm text-white/40 mb-12">Last updated: {new Date().toLocaleDateString()}</p>

          <p>
            This Cookie Policy explains how Huygen Studios ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our website at huygenstudios.com ("Website"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">What are cookies?</h2>
          <p>
            Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
          </p>
          <p>
            Cookies set by the website owner (in this case, Huygen Studios) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., like advertising, interactive content, and analytics).
          </p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">Why do we use cookies?</h2>
          <p>
            We use first- and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties. Third parties serve cookies through our Website for advertising, analytics, and other purposes.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">Types of cookies we use</h2>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Essential cookies:</strong> These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, such as access to secure areas.</li>
            <li><strong>Analytics and customization cookies:</strong> These cookies collect information that is used either in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are, or to help us customize our Website for you. We use tools like Google Analytics.</li>
            <li><strong>Advertising cookies:</strong> These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting advertisements that are based on your interests. This includes cookies used by Google AdSense to serve relevant ads or manage ad delivery.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">How can I control cookies?</h2>
          <p>
            You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager or by amending your web browser controls to accept or refuse cookies.
          </p>
          <p>
            If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted. As the means by which you can refuse cookies through your web browser controls vary from browser-to-browser, you should visit your browser's help menu for more information.
          </p>
          <p>
            In addition, most advertising networks offer you a way to opt out of targeted advertising. If you would like to find out more information, please visit <a href="http://www.aboutads.info/choices/" className="text-blue-400 hover:underline" target="_blank" rel="noreferrer">http://www.aboutads.info/choices/</a> or <a href="http://www.youronlinechoices.com" className="text-blue-400 hover:underline" target="_blank" rel="noreferrer">http://www.youronlinechoices.com</a>.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">Google AdSense and Consent Management</h2>
          <p>
            Our website implements Google AdSense and uses Google's Consent Management Platform (CMP) to comply with data privacy regulations (such as GDPR and CPRA). When you first visit our site from a regulated region, you will see a consent banner allowing you to manage your preferences regarding personalized advertising and cookies.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">How often will you update this Cookie Policy?</h2>
          <p>
            We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">Where can I get further information?</h2>
          <p>
            If you have any questions about our use of cookies or other technologies, please email us at: <a href="mailto:hello@huygenstudios.com" className="text-blue-400 hover:underline">hello@huygenstudios.com</a>
          </p>
        </div>
      </section>
    </main>
  );
}
