import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import { SecondaryPageLayout } from "@/components/web3/SecondaryPageLayout";
import { encodeBlogSlug, getBlogPosts, getBlogPostBySlug, normalizeBlogSlug } from "@/lib/blog";
import { BlogPost } from "@/lib/blog/types";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;
export const revalidate = 300;

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = normalizeBlogSlug(rawSlug);
  try {
    const post = await getBlogPostBySlug(slug);
    if (!post) return {};

    const title = post.title || "Untitled Article";
    const description = post.description || "";
    const publishedTime = post.publishedAt || undefined;
    const modifiedTime = post.updatedAt || publishedTime;
    const authorName = post.authors[0]?.name || "Huygen Team";

    // Handle OpenGraph image safely
    const coverImageUrl = post.coverImage?.url || null;
    const ogImages = coverImageUrl ? [{ url: coverImageUrl }] : [];
    const canonicalSlug = encodeBlogSlug(post.slug || slug);

    return {
      title: `${title} | Huygen Studios Blog`,
      description,
      alternates: { canonical: `/blog/${canonicalSlug}` },
      openGraph: {
        title: `${title} | Huygen Studios Blog`,
        description,
        url: `https://www.huygenstudios.com/blog/${canonicalSlug}`,
        type: "article",
        publishedTime,
        modifiedTime,
        authors: [authorName],
        images: ogImages,
      },
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(`Failed to generate metadata for blog slug ${slug}:`, error);
    }
    return {};
  }
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug: rawSlug } = await params;
  const slug = normalizeBlogSlug(rawSlug);
  
  let post: BlogPost | null = null;
  try {
    post = await getBlogPostBySlug(slug);
  } catch (error) {
    console.error("Error loading blog post page", {
      slug,
      error,
    });
    throw error;
  }

  if (!post) {
    notFound();
  }

  // Get all posts to find related ones safely
  let relatedPosts: BlogPost[] = [];
  try {
    const allPosts = await getBlogPosts();
    relatedPosts = allPosts
      .filter((p) => p && p.slug && p.slug !== slug)
      .slice(0, 2);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Failed to load related posts:", error);
    }
  }

  // Compile and sanitize content HTML server-side safely
  let rawContentHtml = "";
  if (post.contentHtml) {
    rawContentHtml = post.contentHtml;
  } else if (post.contentMarkdown) {
    rawContentHtml = String(marked.parse(post.contentMarkdown));
  }

  // Clean raw HTML to demote h1 to h2
  const cleanedHtml = rawContentHtml
    ? rawContentHtml
        .replace(/<h1\b([^>]*)>/gi, "<h2$1>")
        .replace(/<\/h1>/gi, "</h2>")
    : "";

  const sanitizedContentHtml = DOMPurify.sanitize(cleanedHtml, {
    FORBID_TAGS: ["script", "iframe", "object", "embed"],
    FORBID_ATTR: ["onerror", "onload", "onclick", "onmouseover", "style"],
  }).replace(
    /<a\s+([^>]*href=["']https?:\/\/(?![^"']*huygenstudios\.com)[^>]+)>/gi,
    (match) => match.includes(" rel=") ? match : match.replace("<a ", '<a rel="noopener noreferrer" ')
  );

  // JSON-LD structured data for article indexation
  const authorName = post.authors[0]?.name || "Huygen Team";
  const title = post.title || "Untitled Article";
  const description = post.description || "";
  const publishedAt = post.publishedAt || undefined;
  const updatedAt = post.updatedAt || publishedAt;
  const canonicalSlug = encodeBlogSlug(post.slug || slug);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "datePublished": publishedAt,
    "dateModified": updatedAt,
    "author": {
      "@type": "Person",
      "name": authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": "Huygen Studios",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.huygenstudios.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.huygenstudios.com/blog/${canonicalSlug}`
    }
  };

  // Safe date parsing
  let formattedDate = "";
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
  } catch {
    // Ignore invalid date
  }

  // Safe image url
  const coverImage = post.coverImage;
  const categoryName = post.category?.name || "AI Automation";

  return (
    <SecondaryPageLayout>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="chapter">
        <div className="shell">
          <div className="mb-8">
            <Link href="/blog" className="text-sm font-mono text-[#93969e] hover:text-[#4a79ff] transition-colors">
              &larr; Back to Blog Catalog
            </Link>
          </div>

          <header className="max-w-[900px] mb-12">
            <div className="flex gap-4 items-center text-xs text-[#93969e] font-mono mb-4">
              {formattedDate && (
                <>
                  <span>{formattedDate}</span>
                  <span>•</span>
                </>
              )}
              {post.readingTime && (
                <>
                  <span>{post.readingTime}</span>
                  <span>•</span>
                </>
              )}
              <span>Category: {categoryName}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-white mb-6">
              {title}
            </h1>
            {description && (
              <p className="text-base md:text-lg text-[#b8bac1] leading-relaxed italic border-l-2 border-[#4a79ff] pl-4">
                {description}
              </p>
            )}
          </header>

          {/* Render Cover Image safely if present */}
          {coverImage && (
            <div className="max-w-[850px] mb-12 rounded-lg overflow-hidden border border-[rgba(255,255,255,0.1)] aspect-[16/9] relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coverImage.url}
                alt={coverImage.alt || title}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          )}

          {/* Article content container with sanitization output */}
          <div 
            className="max-w-[850px] border-t border-[rgba(255,255,255,0.18)] pt-12 text-[#b8bac1] prose prose-invert leading-relaxed space-y-6 text-sm md:text-base"
            dangerouslySetInnerHTML={{ __html: sanitizedContentHtml }}
          />

          {/* Related Posts Section */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-12 border-t border-[rgba(255,255,255,0.08)]">
              <h2 className="text-2xl font-bold text-white mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedPosts.map((related) => (
                  <div key={related.slug} className="border border-[rgba(255,255,255,0.06)] p-6 rounded bg-[#0c0d10] hover:border-[rgba(74,121,255,0.25)] transition-all">
                    <span className="text-xs font-mono text-[#93969e] block mb-2">{related.category?.name || "AI Automation"}</span>
                    <h3 className="text-lg font-bold text-white mb-3 hover:text-[#4a79ff] transition-colors">
                      <Link href={`/blog/${encodeBlogSlug(related.slug)}`}>{related.title || "Untitled Article"}</Link>
                    </h3>
                    {related.description && (
                      <p className="text-[#b8bac1] text-xs leading-relaxed mb-4 line-clamp-2">
                        {related.description}
                      </p>
                    )}
                    <Link href={`/blog/${encodeBlogSlug(related.slug)}`} className="text-white text-xs underline hover:text-[#4a79ff] transition-colors">
                      Read More &rarr;
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 pt-8 border-t border-[rgba(255,255,255,0.08)] flex justify-between items-center">
            <Link href="/blog" className="text-sm font-mono text-[#93969e] hover:text-[#4a79ff] transition-colors">
              &larr; Back to Blog
            </Link>
            <Link href="/contact" className="text-sm font-semibold underline hover:text-[#4a79ff] transition-colors">
              Discuss Automation Build &rarr;
            </Link>
          </div>
        </div>
      </article>
    </SecondaryPageLayout>
  );
}
