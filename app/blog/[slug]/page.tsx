import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SecondaryPageLayout } from "@/components/web3/SecondaryPageLayout";
import { blogPosts } from "../posts";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | Huygen Studios Blog`,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }

  return (
    <SecondaryPageLayout>
      <article className="chapter">
        <div className="shell">
          <div className="mb-8">
            <Link href="/blog" className="text-sm font-mono text-[#93969e] hover:text-[#4a79ff] transition-colors">
              &larr; Back to Blog Catalog
            </Link>
          </div>

          <header className="max-w-[900px] mb-12">
            <div className="flex gap-4 items-center text-xs text-[#93969e] font-mono mb-4">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.author}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-white mb-6">
              {post.title}
            </h1>
            <p className="text-base md:text-lg text-[#b8bac1] leading-relaxed italic border-l-2 border-[#4a79ff] pl-4">
              {post.summary}
            </p>
          </header>

          <div 
            className="max-w-[850px] border-t border-[rgba(255,255,255,0.18)] pt-12 text-[#b8bac1] prose prose-invert leading-relaxed space-y-6 text-sm md:text-base"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

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
