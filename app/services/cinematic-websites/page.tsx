import { Metadata } from "next";
import Link from "next/link";
import { SecondaryPageLayout } from "@/components/web3/SecondaryPageLayout";

export const metadata: Metadata = {
  title: "Cinematic Web Design & WebGL Development | Huygen Studios",
  description: "Create premium user experiences using custom React Three Fiber 3D canvases, GSAP scroll timelines, and optimized Next.js frameworks.",
  alternates: {
    canonical: "https://www.huygenstudios.com/services/cinematic-websites",
  },
};

export default function CinematicWebsitesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Cinematic Web Design & WebGL Development",
    "provider": {
      "@type": "Organization",
      "name": "Huygen Studios",
      "url": "https://www.huygenstudios.com",
    },
    "description": "Custom Next.js frontend development using WebGL canvas, Three.js mesh optimizations, and GSAP scroll animations.",
    "areaServed": "Worldwide",
    "category": "Web Development",
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
            Cinematic Websites & WebGL Development
          </h1>
          <p className="text-xl text-zinc-300 leading-relaxed">
            Stand out in crowded markets. We build premium, animation-rich websites using Three.js and GSAP without sacrificing page load speeds.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Who This Service Is For</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            Designed for high-ticket B2B agencies, venture capital groups, luxury brands, and product design labs looking to make a strong visual impression and build brand trust.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Core Problems Solved</h2>
          <ul className="list-disc pl-6 text-zinc-300 space-y-2 leading-relaxed">
            <li><strong>Low Brand Differentiation:</strong> Replaces standard grid landing pages with custom, interactive 3D experiences.</li>
            <li><strong>Slow Animation Speeds:</strong> Replaces slow, CPU-heavy animations with hardware-accelerated WebGL rendering.</li>
            <li><strong>Poor Page Performance:</strong> Optimizes 3D asset delivery to ensure fast load times and low layout shift (CLS).</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Key Deliverables</h2>
          <ul className="list-disc pl-6 text-zinc-300 space-y-2 leading-relaxed">
            <li><strong>Hardware-Accelerated 3D Canvases:</strong> Interactive 3D backgrounds built in React Three Fiber.</li>
            <li><strong>Optimized 3D Mesh Assets:</strong> Lightweight, compressed mesh models loadable on mobile connections.</li>
            <li><strong>Coordinated Scroll Timelines:</strong> Responsive GSAP scroll animations scoped to prevent layout shifts.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Implementation Process</h2>
          <ol className="list-decimal pl-6 text-zinc-300 space-y-3 leading-relaxed">
            <li><strong>Interactive Storyboarding (Week 1):</strong> Design layout wireframes, plan scroll interactions, and define visual themes.</li>
            <li><strong>WebGL Prototyping (Week 2):</strong> Build 3D models, configure shaders, and set up the lighting canvas.</li>
            <li><strong>GSAP Integration & DOM Layout (Week 3):</strong> Build responsive HTML sections and link scroll animations to the WebGL background.</li>
            <li><strong>Performance Optimization & Launch (Week 4):</strong> Compress 3D assets, resolve layout shifts, and deploy to Vercel production.</li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Supported Integrations & Tools</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            We build using modern frontend tools: **Next.js**, **React Three Fiber**, **Three.js**, **GSAP (GreenSock)**, **Tailwind CSS**, and host on **Vercel**.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Timeline Expectations</h2>
          <p className="text-zinc-300 leading-relaxed">
            A custom cinematic website redesign takes **4 to 6 weeks** from design mapping to launch.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Operational Risks & Limitations</h2>
          <p className="text-zinc-300 leading-relaxed">
            Complex 3D graphics can impact performance on older mobile devices or slow networks. We optimize all WebGL layouts using level-of-detail (LOD) checks, compressed assets, and simple 2D CSS fallbacks for older devices.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Do 3D websites load slowly?</h3>
              <p className="text-zinc-300 leading-relaxed">
                Not if built correctly. We use Draco compression to reduce 3D asset sizes, implement lazy loading, and use hardware-accelerated shaders to keep page speeds fast.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Are the animations mobile-responsive?</h3>
              <p className="text-zinc-300 leading-relaxed">
                Yes. We design layouts specifically for mobile viewports, adjusting 3D camera angles and scaling down animation complexity to ensure smooth rendering on phones.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12 p-6 rounded-lg bg-zinc-900 border border-zinc-800">
          <h2 className="text-2xl font-bold text-white mb-4">Related Insights</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            Learn more about cinematic web design in our technical blog:
          </p>
          <ul className="space-y-2">
            <li>
              <Link href="/blog/optimizing-nextjs-webgl-threejs-performance" className="text-cyan-400 hover:underline">
                &rarr; Optimizing Next.js WebGL and Three.js Performance
              </Link>
            </li>
            <li>
              <Link href="/blog/cinematic-website-conversion-framework" className="text-cyan-400 hover:underline">
                &rarr; The Cinematic Website Conversion Framework
              </Link>
            </li>
            <li>
              <Link href="/blog/website-redesign-checklist-for-service-businesses" className="text-cyan-400 hover:underline">
                &rarr; The Website Redesign Checklist for Service Businesses
              </Link>
            </li>
          </ul>
        </section>

        <section className="text-center pt-8 border-t border-zinc-800">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to upgrade your web presence?</h2>
          <p className="text-zinc-300 mb-6">
            Consult our developers to plan your cinematic website redesign.
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
