import type { Metadata } from "next";
import Link from "next/link";
import { SecondaryPageLayout } from "@/components/web3/SecondaryPageLayout";
import { blogPosts } from "./posts";

export const metadata: Metadata = {
  title: "Studio Blog & Insights | Huygen Studios",
  description: "Read technical articles from Huygen Studios on custom AI agents, Twilio voice integration, WebGL performance, and Meta's WhatsApp Cloud API setups.",
  alternates: { canonical: "/blog" },
};

export default function BlogCatalogPage() {
  return (
    <SecondaryPageLayout>
      <section className="chapter">
        <div className="shell">
          <div className="max-w-[800px] mb-16">
            <span className="text-[#93969e] text-xs font-mono tracking-widest uppercase block mb-4">06 // Technical Blog & Insights</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-6">Original research and tech breakdowns.</h1>
            <p className="text-lg md:text-xl text-[#b8bac1] leading-relaxed">
              We document our workflows, implementation patterns, and engineering insights directly from active studio client builds.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 border-t border-[rgba(255,255,255,0.18)] pt-12">
            {blogPosts.map((post) => (
              <article key={post.slug} className="border border-[rgba(255,255,255,0.1)] p-8 rounded-lg bg-[#0c0d10] hover:border-[rgba(74,121,255,0.4)] transition-all">
                <div className="flex justify-between items-center text-xs text-[#93969e] font-mono mb-4">
                  <span>{post.date}</span>
                  <span>{post.author}</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4 hover:text-[#4a79ff] transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-[#b8bac1] text-sm leading-relaxed mb-6">
                  {post.summary}
                </p>
                <Link href={`/blog/${post.slug}`} className="text-white text-sm font-semibold underline hover:text-[#4a79ff] transition-colors">
                  Read Article &rarr;
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SecondaryPageLayout>
  );
}
