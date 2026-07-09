import type { Metadata } from "next";
import { SecondaryPageLayout } from "@/components/web3/SecondaryPageLayout";
import { getBlogPosts } from "@/lib/blog";
import { BlogPost } from "@/lib/blog/types";
import { BlogCatalog } from "@/components/blog/BlogCatalog";

export const metadata: Metadata = {
  title: "Studio Blog & Insights | Huygen Studios",
  description:
    "Read technical articles from Huygen Studios on custom AI agents, Twilio voice integration, WebGL performance, and Meta's WhatsApp Cloud API setups.",
  alternates: { canonical: "/blog" },
};

export default async function BlogCatalogPage() {
  let posts: BlogPost[] = [];
  try {
    posts = await getBlogPosts();
  } catch (error) {
    console.error("Failed to load blog posts for catalog:", error);
  }

  // Filter out any invalid posts without slugs
  const validPosts = posts.filter((p) => p && p.slug);

  return (
    <SecondaryPageLayout>
      <section className="chapter pt-24 md:pt-32">
        <div className="shell space-y-12">
          {/* Hero Section */}
          <div className="max-w-[800px] mb-12">
            <span className="text-blue-400 text-xs font-mono tracking-[0.2em] uppercase block mb-4">
              BLOG // ORIGINAL RESEARCH
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-none mb-6 font-sans">
              Ideas on AI automation, voice agents, and digital growth
            </h1>
            <p className="text-base md:text-lg text-[#b8bac1] leading-relaxed">
              Practical insights on AI systems, automation workflows, CRM & sales pipelines, cinematic web strategy, and technical implementations.
            </p>
          </div>

          {/* Dynamic Interactive Catalog */}
          <BlogCatalog posts={validPosts} />
        </div>
      </section>
    </SecondaryPageLayout>
  );
}
