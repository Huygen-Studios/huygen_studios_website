"use client";

import React from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { SiteNav } from "@/components/SiteNav";
import { StickyBottomMenu } from "@/components/StickyBottomMenu";
import { blogArticles } from "@/lib/blog-data";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const article = blogArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <SiteNav />

      {/* Subtle background glow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]" />
      </div>

      {/* Blog Post Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": article.title,
            "description": article.excerpt,
            "articleBody": article.content.replace(/<[^>]*>?/gm, ''), // Strip HTML for schema
            "datePublished": article.date,
            "url": `https://huygenstudios.com/blog/${article.slug}`,
            "author": {
              "@type": "Organization",
              "name": "Huygen Studios"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Huygen Studios",
              "logo": {
                "@type": "ImageObject",
                "url": "https://huygenstudios.com/logo.png" 
              }
            }
          }),
        }}
      />

      <article className="relative z-10 px-6 pt-40 pb-24 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-white/40 hover:text-white transition-colors uppercase tracking-widest mb-12 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Dispatch</span>
          </Link>

          <header>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-[-0.04em] text-white/90 mb-12 leading-[1.1]">
              {article.title}
            </h1>
          </header>

          <div 
            className="prose prose-invert prose-p:text-white/60 prose-p:leading-relaxed prose-p:text-lg prose-headings:text-white/90 prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="mt-20 pt-12 border-t border-white/10">
            <h3 className="text-xl font-semibold mb-6">Ready to scale with AI?</h3>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              <span>Book a Strategy Call</span>
            </Link>
          </div>
        </motion.div>
      </article>

      <StickyBottomMenu />
    </main>
  );
}
