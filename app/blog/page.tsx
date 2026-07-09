import type { Metadata } from "next";
import Link from "next/link";
import { SecondaryPageLayout } from "@/components/web3/SecondaryPageLayout";
import { getBlogPosts } from "@/lib/blog";
import { BlogPost } from "@/lib/blog/types";

export const metadata: Metadata = {
  title: "Studio Blog & Insights | Huygen Studios",
  description: "Read technical articles from Huygen Studios on custom AI agents, Twilio voice integration, WebGL performance, and Meta's WhatsApp Cloud API setups.",
  alternates: { canonical: "/blog" },
};

export default async function BlogCatalogPage() {
  let posts: BlogPost[] = [];
  try {
    posts = await getBlogPosts();
  } catch (error) {
    console.error("Failed to load blog posts for catalog:", error);
  }

  // Extract unique categories safely for catalog filter display
  const categories = Array.from(
    new Set(posts.map((p) => p?.category || "AI Automation"))
  ).filter(Boolean);

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

          {/* Categories display */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-12 pb-6 border-b border-[rgba(255,255,255,0.08)]">
              <span className="text-xs font-mono text-neutral-500 self-center mr-2">Categories:</span>
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-[rgba(255,255,255,0.05)] text-neutral-300 border border-[rgba(255,255,255,0.08)]"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 gap-12 border-t border-[rgba(255,255,255,0.18)] pt-12">
            {posts.map((post) => {
              const title = post?.title || "Untitled Article";
              const slug = post?.slug || "";
              const description = post?.description || "";
              const readingTime = post?.readingTime || "3 min read";
              const authorName = post?.author?.name || "Huygen Team";
              const category = post?.category || "AI Automation";

              // Date formatting with safety fallback
              let formattedDate = "Recent";
              try {
                if (post?.publishedAt) {
                  const d = new Date(post.publishedAt);
                  if (!isNaN(d.getTime())) {
                    formattedDate = d.toLocaleDateString("en-US", { 
                      month: "short", 
                      day: "numeric", 
                      year: "numeric" 
                    });
                  }
                }
              } catch {
                // Keep default
              }

              if (!slug) return null;

              return (
                <article key={slug} className="border border-[rgba(255,255,255,0.1)] p-8 rounded-lg bg-[#0c0d10] hover:border-[rgba(74,121,255,0.4)] transition-all">
                  <div className="flex justify-between items-center text-xs text-[#93969e] font-mono mb-4">
                    <div className="flex gap-2">
                      <span>{formattedDate}</span>
                      <span>•</span>
                      <span>{readingTime}</span>
                    </div>
                    <span>{authorName}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4 hover:text-[#4a79ff] transition-colors">
                    <Link href={`/blog/${slug}`}>{title}</Link>
                  </h2>
                  {description && (
                    <p className="text-[#b8bac1] text-sm leading-relaxed mb-6">
                      {description}
                    </p>
                  )}
                  <div className="flex justify-between items-center">
                    <Link href={`/blog/${slug}`} className="text-white text-sm font-semibold underline hover:text-[#4a79ff] transition-colors">
                      Read Article &rarr;
                    </Link>
                    <span className="text-xs font-mono bg-[rgba(74,121,255,0.1)] text-[#4a79ff] px-2 py-0.5 rounded border border-[rgba(74,121,255,0.2)]">
                      {category}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </SecondaryPageLayout>
  );
}
