"use client";

import React from "react";
import { SiteNav } from "@/components/SiteNav";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-hidden pb-32">
      <SiteNav />

      <section className="relative z-10 px-6 pt-40 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
          Privacy Policy
        </h1>
        <div className="prose prose-invert prose-lg max-w-none text-white/70">
          <p className="text-sm text-white/40 mb-12">Last updated: {new Date().toLocaleDateString()}</p>
          
          <p>
            At Huygen Studios ("we", "our", or "us"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (huygenstudios.com) or use our AI automation and web services.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">1. Information We Collect</h2>
          <p>
            We may collect information about you in a variety of ways. The information we may collect includes:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, and telephone number, that you voluntarily give to us when choosing to participate in various activities related to our services.</li>
            <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
            <li><strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">2. Use of Your Information</h2>
          <p>
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Provide, operate, and maintain our AI automation and web services.</li>
            <li>Improve, personalize, and expand our offerings.</li>
            <li>Understand and analyze how you use our website and services.</li>
            <li>Develop new products, services, features, and functionality.</li>
            <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes.</li>
            <li>Process your transactions and manage your account.</li>
            <li>Find and prevent fraud.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">3. Disclosure of Your Information</h2>
          <p>
            We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others.</li>
            <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</li>
            <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">4. Third-Party Websites</h2>
          <p>
            The Site may contain links to third-party websites and applications of interest, including advertisements and external services, that are not affiliated with us. Once you have used these links to leave the Site, any information you provide to these third parties is not covered by this Privacy Policy.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">5. Advertising & Analytics</h2>
          <p>
            We may use third-party advertising companies to serve ads when you visit the Site. These companies may use information about your visits to the Site and other websites that are contained in web cookies in order to provide advertisements about goods and services of interest to you.
          </p>
          <p>
            We may also partner with selected third-party vendors, such as Google Analytics, to allow tracking technologies and remarketing services on the Site through the use of first-party cookies and third-party cookies. By accessing the Site, you consent to the collection and use of your information by these third-party vendors.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">6. Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">7. Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us at:
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
