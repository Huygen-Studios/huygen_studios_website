/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Compass } from "lucide-react";
import { BlogPost } from "@/lib/blog/types";

interface BlogCatalogProps {
  posts: BlogPost[];
}

function getPostCoverImage(post: any): string | null {
  if (!post) return null;
  return (
    (typeof post.coverImage === "string" ? post.coverImage : null) ||
    post.coverImage?.url ||
    post.coverImage?.src ||
    post.featuredImage?.url ||
    post.featuredImage?.src ||
    post.image?.url ||
    post.image?.src ||
    post.cover?.url ||
    post.cover?.src ||
    null
  );
}

// Visual category card gradients and styles
const categoryStyleMap: Record<string, { color: string; border: string; glow: string }> = {
  "AI Automation": {
    color: "from-blue-600/20 to-indigo-900/30",
    border: "group-hover:border-blue-500/30",
    glow: "bg-blue-500/10",
  },
  "AI Voice Agents": {
    color: "from-purple-600/20 to-pink-900/30",
    border: "group-hover:border-purple-500/30",
    glow: "bg-purple-500/10",
  },
  "WhatsApp Automation": {
    color: "from-emerald-600/20 to-teal-900/30",
    border: "group-hover:border-emerald-500/30",
    glow: "bg-emerald-500/10",
  },
  "CRM & Sales Systems": {
    color: "from-cyan-600/20 to-blue-900/30",
    border: "group-hover:border-cyan-500/30",
    glow: "bg-cyan-500/10",
  },
  "Cinematic Websites": {
    color: "from-rose-600/20 to-purple-900/30",
    border: "group-hover:border-rose-500/30",
    glow: "bg-rose-500/10",
  },
  "Business Strategy": {
    color: "from-amber-600/20 to-red-900/30",
    border: "group-hover:border-amber-500/30",
    glow: "bg-amber-500/10",
  },
  "Web Development": {
    color: "from-teal-600/20 to-blue-900/30",
    border: "group-hover:border-teal-500/30",
    glow: "bg-teal-500/10",
  },
};

// CURATED STATIC CATEGORIES FOR HEADER STRIP
const curatedCategories = [
  "All",
  "AI Automation",
  "AI Voice Agents",
  "WhatsApp Automation",
  "CRM & Sales Systems",
  "Cinematic Websites",
  "Business Strategy",
];

function makeThumbnailTitle(fullTitle: string): string {
  const words = fullTitle.split(/\s+/).filter((w) => w.length > 2);
  if (words.length <= 4) return fullTitle;
  return words.slice(0, 4).join(" ") + "...";
}

// COMPONENT: Visual image or designed text placeholder
function BlogVisual({ post, className = "aspect-[16/10]" }: { post: BlogPost; className?: string }) {
  const imageUrl = getPostCoverImage(post);
  const title = post.title || "Untitled article";
  const category = post.category || "AI Automation";

  if (imageUrl) {
    return (
      <div className={`relative overflow-hidden rounded-2xl group border border-white/5 ${className}`}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    );
  }

  // Generate visual placeholder based on a simple name/length hash
  const hash = (title.length + category.length) % 5;
  const gradients = [
    "from-blue-950 via-indigo-950 to-black",
    "from-purple-950 via-slate-950 to-black",
    "from-cyan-950 via-emerald-950 to-black",
    "from-rose-950 via-purple-950 to-black",
    "from-violet-950 via-fuchsia-950 to-black",
  ];
  const selectGradient = gradients[hash];

  // Accent glow configuration
  const glows = [
    { bg1: "bg-cyan-500/10", bg2: "bg-purple-500/10" },
    { bg1: "bg-purple-500/10", bg2: "bg-pink-500/10" },
    { bg1: "bg-blue-500/10", bg2: "bg-teal-500/10" },
    { bg1: "bg-rose-500/10", bg2: "bg-violet-500/10" },
    { bg1: "bg-emerald-500/10", bg2: "bg-indigo-500/10" },
  ];
  const selectGlow = glows[hash];

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${selectGradient} p-6 border border-white/5 flex flex-col justify-between ${className}`}>
      {/* Ambient background glows */}
      <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full ${selectGlow.bg1} blur-2xl`} />
      <div className={`absolute -bottom-12 -left-12 h-36 w-36 rounded-full ${selectGlow.bg2} blur-2xl`} />
      
      {/* Subtle editor wireframe overlay grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10 flex h-full flex-col justify-between gap-6">
        <div className="flex justify-between items-start">
          <span className="w-fit rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[9px] font-mono tracking-wider uppercase text-white/80 backdrop-blur-sm">
            {category}
          </span>
          <span className="text-[9px] font-mono text-white/30 tracking-widest uppercase">
            Insight
          </span>
        </div>
        
        <h3 className="max-w-[95%] text-xl md:text-2xl font-bold leading-snug text-white tracking-tight group-hover:text-blue-400 transition-colors duration-300">
          {makeThumbnailTitle(title)}
        </h3>
        
        <div className="flex justify-between items-center pt-2 border-t border-white/5">
          <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-white/30">
            Huygen Studios
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

// COMPONENT: Primary card grid layout item
function BlogCard({ post }: { post: BlogPost }) {
  const title = post.title || "Untitled article";
  const description = post.description || "";
  const slug = post.slug;
  const category = post.category || "AI Automation";
  const readingTime = post.readingTime || "3 min read";

  let formattedDate = "Recent";
  try {
    if (post.publishedAt) {
      const d = new Date(post.publishedAt);
      if (!isNaN(d.getTime())) {
        formattedDate = d.toLocaleDateString("en-US", { 
          month: "short", 
          day: "numeric", 
          year: "numeric" 
        });
      }
    }
  } catch {}

  return (
    <Link href={`/blog/${slug}`} className="group flex flex-col gap-4 text-left">
      <BlogVisual post={post} className="aspect-[16/10] w-full" />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 text-xs font-mono text-[#93969e]">
          <span className="text-blue-400 font-bold">{category}</span>
          <span>•</span>
          <span>{formattedDate}</span>
          <span>•</span>
          <span>{readingTime}</span>
        </div>
        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors leading-snug">
          {title}
        </h3>
        {description && (
          <p className="text-[#b8bac1] text-sm leading-relaxed line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}

// COMPONENT: Compact horizontal card listing for featured column
function CompactBlogCard({ post }: { post: BlogPost }) {
  const title = post.title || "Untitled article";
  const slug = post.slug;
  const category = post.category || "AI Automation";
  const readingTime = post.readingTime || "3 min read";

  let formattedDate = "Recent";
  try {
    if (post.publishedAt) {
      const d = new Date(post.publishedAt);
      if (!isNaN(d.getTime())) {
        formattedDate = d.toLocaleDateString("en-US", { 
          month: "short", 
          day: "numeric", 
          year: "numeric" 
        });
      }
    }
  } catch {}

  return (
    <Link href={`/blog/${slug}`} className="group flex gap-4 text-left items-start pb-4 border-b border-white/5 last:border-0 last:pb-0">
      <BlogVisual post={post} className="w-24 h-16 md:w-32 md:h-20 flex-shrink-0" />
      <div className="flex flex-col gap-1 justify-center min-w-0">
        <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wider">{category}</span>
        <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug font-sans">
          {title}
        </h4>
        <div className="flex items-center gap-2 text-[10px] font-mono text-[#93969e]">
          <span>{formattedDate}</span>
          <span>•</span>
          <span>{readingTime}</span>
        </div>
      </div>
    </Link>
  );
}

export function BlogCatalog({ posts }: BlogCatalogProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter posts dynamically
  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return posts;
    return posts.filter(
      (p) => p.category?.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [posts, activeCategory]);

  // Extract featured posts: posts containing 'featured' tag or the newest 3 posts
  const { featuredPost, secondaryFeatured } = useMemo(() => {
    if (posts.length === 0) return { featuredPost: null, secondaryFeatured: [] };

    // Find any post containing a 'featured' tag or fallback to latest
    const featured = posts.find((p) => p.tags?.some((t) => t.toLowerCase() === "featured")) || posts[0];
    const others = posts.filter((p) => p.id !== featured.id).slice(0, 2);

    return {
      featuredPost: featured,
      secondaryFeatured: others,
    };
  }, [posts]);

  // Dynamic date rendering helper for large featured card
  const getFormattedDate = (dateStr?: string) => {
    if (!dateStr) return "Recent";
    try {
      const d = new Date(dateStr);
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
      }
    } catch {}
    return "Recent";
  };

  return (
    <div className="space-y-16">
      {/* Category selector strip */}
      <div className="border-y border-white/5 py-8">
        <div className="flex items-center gap-2 mb-6 text-neutral-400 text-xs font-mono tracking-widest uppercase">
          <Compass size={14} className="text-blue-400" />
          <span>Explore by Category</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {curatedCategories.map((cat) => {
            const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
            const config = categoryStyleMap[cat] || {
              color: "from-neutral-800 to-neutral-900/60",
              border: "group-hover:border-neutral-500/20",
              glow: "bg-neutral-500/5",
            };

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative overflow-hidden rounded-2xl p-4 text-left border transition-all duration-300 h-24 group flex flex-col justify-between ${
                  isActive
                    ? "border-blue-500 bg-white/5 ring-1 ring-blue-500"
                    : "border-white/5 bg-neutral-950/40 hover:border-white/10 hover:bg-neutral-900/30"
                }`}
              >
                {/* Decorative glow blob */}
                <div className={`absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-gradient-to-br ${config.color} opacity-40 blur-lg group-hover:scale-125 transition-transform duration-500`} />
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/30">Select</span>
                <h4 className="text-xs md:text-sm font-bold text-white relative z-10 transition-colors group-hover:text-blue-400">
                  {cat}
                </h4>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Section — Only shown when category is 'All' */}
      {activeCategory === "All" && featuredPost && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h2 className="text-xs font-mono text-[#93969e] tracking-widest uppercase">Featured Insights</h2>
            <span className="h-px bg-white/10 flex-grow mx-4 hidden md:block" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Main large featured card */}
            <div className="lg:col-span-2 flex">
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group flex flex-col gap-6 p-6 rounded-3xl border border-white/5 bg-neutral-950/20 hover:border-blue-500/30 hover:bg-neutral-900/10 transition-all w-full justify-between"
              >
                <BlogVisual post={featuredPost} className="aspect-[16/9] w-full" />
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#93969e]">
                    <span className="px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 font-bold uppercase tracking-wider text-[10px]">
                      {featuredPost.category}
                    </span>
                    <span>•</span>
                    <span>{getFormattedDate(featuredPost.publishedAt)}</span>
                    <span>•</span>
                    <span>{featuredPost.readingTime}</span>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight group-hover:text-blue-400 transition-colors font-sans">
                    {featuredPost.title}
                  </h3>
                  {featuredPost.description && (
                    <p className="text-[#b8bac1] text-sm md:text-base leading-relaxed">
                      {featuredPost.description}
                    </p>
                  )}
                  <div className="flex items-center text-sm text-white font-bold group-hover:text-blue-400 transition-colors pt-2">
                    Read Article <ArrowUpRight size={16} className="ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            </div>

            {/* Stack of secondary featured cards */}
            <div className="flex flex-col justify-between gap-6 p-6 rounded-3xl border border-white/5 bg-neutral-950/20">
              <div className="space-y-6">
                <span className="text-[10px] font-mono tracking-wider text-[#93969e] uppercase block pb-3 border-b border-white/5">
                  Trending Research
                </span>
                <div className="flex flex-col gap-6">
                  {secondaryFeatured.map((post) => (
                    <CompactBlogCard key={post.slug} post={post} />
                  ))}
                </div>
              </div>
              <div className="pt-6 border-t border-white/5">
                <p className="text-[11px] font-mono text-neutral-500 leading-normal">
                  Huygen Studios original research is sourced directly from developer sandboxes and live builds.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Dynamic/Recent Grid */}
      <section className="space-y-8">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <h2 className="text-xs font-mono text-[#93969e] tracking-widest uppercase">
            {activeCategory === "All" ? "All Technical Articles" : `${activeCategory} Articles`}
          </h2>
          <span className="text-xs font-mono text-neutral-500">
            {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
          </span>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl bg-neutral-950/10">
            <span className="text-neutral-500 block mb-4 text-sm font-mono">No articles found in this category.</span>
            <button
              onClick={() => setActiveCategory("All")}
              className="px-4 py-2 text-xs font-mono border border-white/10 rounded-full text-white hover:bg-white/5 transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
