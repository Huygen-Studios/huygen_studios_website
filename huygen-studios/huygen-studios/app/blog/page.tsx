"use client";

import React from "react";
import { motion } from "framer-motion";
import { SiteNav } from "@/components/SiteNav";
import { StickyBottomMenu } from "@/components/StickyBottomMenu";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { blogArticles } from "@/lib/blog-data";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <SiteNav />

      {/* Subtle background glow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.05)_0%,transparent_70%)]" />
      </div>

      {/* Blog Listing Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "The Huygen Dispatch",
            "description": "Insights on AI automation, high-end web development, and the future of business operations.",
            "url": "https://huygenstudios.com/blog",
            "blogPost": blogArticles.map((article) => ({
              "@type": "BlogPosting",
              "headline": article.title,
              "description": article.excerpt,
              "url": `https://huygenstudios.com/blog/${article.slug}`,
              "datePublished": article.date,
              "author": {
                "@type": "Organization",
                "name": "Huygen Studios"
              }
            }))
          }),
        }}
      />

      <section className="relative z-10 px-6 pt-40 pb-24 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="mb-20 text-center md:text-left"
        >
          <p className="text-[11px] md:text-[12px] uppercase tracking-[0.25em] text-white/40 mb-4 font-medium">
            Intelligence & Insights
          </p>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.04em] text-white/90 mb-6 leading-[0.95]">
            The Huygen <br />
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Dispatch
            </span>
          </h1>
          <p className="text-lg text-white/50 max-w-xl leading-relaxed">
            Thoughts on building autonomous revenue engines, designing the future of the web, and scaling businesses with AI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogArticles.map((article, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group h-full"
            >
              <article className="h-full">
                <Link href={`/blog/${article.slug}`} className="flex flex-col h-full p-7 md:p-8 rounded-[32px] bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-violet-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:via-violet-500/5 group-hover:to-blue-500/0 transition-all duration-700 opacity-0 group-hover:opacity-100" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex-1">
                      <header>
                        <h2 className="text-xl md:text-2xl font-bold mb-4 text-white/90 group-hover:text-white transition-colors line-clamp-2">
                          {article.title}
                        </h2>
                      </header>
                      <p className="text-white/50 leading-relaxed mb-6 text-sm line-clamp-4">
                        {article.excerpt}
                      </p>
                    </div>
                    
                    <footer className="mt-auto pt-6 flex items-center gap-2 text-[12px] font-bold text-white/60 group-hover:text-blue-400 transition-colors uppercase tracking-widest">
                      <span>Read Article</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </footer>
                  </div>
                </Link>
              </article>
            </motion.div>
          ))}
        </div>
      </section>

      <StickyBottomMenu />
    </main>
  );
}
