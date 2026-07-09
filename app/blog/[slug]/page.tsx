import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import { SecondaryPageLayout } from "@/components/web3/SecondaryPageLayout";
import { getBlogPosts, getBlogPostBySlug } from "@/lib/blog";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Huygen Studios Blog`,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | Huygen Studios Blog`,
      description: post.description,
      url: `https://www.huygenstudios.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
    },
  };
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) {
    notFound();
  }

  // Get all posts to find related ones
  const allPosts = await getBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  // Compile and sanitize content HTML server-side
  let rawContentHtml = "";
  if (post.contentHtml) {
    rawContentHtml = post.contentHtml;
  } else if (post.contentMarkdown) {
    rawContentHtml = marked.parse(post.contentMarkdown) as string;
  }
  const sanitizedContentHtml = DOMPurify.sanitize(rawContentHtml);

  // JSON-LD structured data for article indexation
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt,
    "author": {
      "@type": "Person",
      "name": post.author.name
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
      "@id": `https://www.huygenstudios.com/blog/${post.slug}`
    }
  };

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
              <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
              <span>•</span>
              <span>{post.readingTime}</span>
              <span>•</span>
              <span>Category: {post.category}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-white mb-6">
              {post.title}
            </h1>
            <p className="text-base md:text-lg text-[#b8bac1] leading-relaxed italic border-l-2 border-[#4a79ff] pl-4">
              {post.description}
            </p>
          </header>

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
                    <span className="text-xs font-mono text-[#93969e] block mb-2">{related.category}</span>
                    <h3 className="text-lg font-bold text-white mb-3 hover:text-[#4a79ff] transition-colors">
                      <Link href={`/blog/${related.slug}`}>{related.title}</Link>
                    </h3>
                    <p className="text-[#b8bac1] text-xs leading-relaxed mb-4 line-clamp-2">
                      {related.description}
                    </p>
                    <Link href={`/blog/${related.slug}`} className="text-white text-xs underline hover:text-[#4a79ff] transition-colors">
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
