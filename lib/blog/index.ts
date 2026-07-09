/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlogPost } from "./types";
import { localFallbackPosts } from "./local-posts";

export async function getBlogPosts(): Promise<BlogPost[]> {
  const apiKey = process.env.MARBLE_API_KEY;
  if (!apiKey) {
    return localFallbackPosts;
  }

  try {
    const res = await fetch("https://api.marblecms.com/v1/posts", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) {
      console.warn("Marble CMS returned non-ok status, falling back to local posts.");
      return localFallbackPosts;
    }

    const json = await res.json();
    if (json && Array.isArray(json.data)) {
      return json.data.map((item: any) => normalizeMarblePost(item));
    }

    return localFallbackPosts;
  } catch (err) {
    console.error("Failed to fetch posts from Marble CMS:", err);
    return localFallbackPosts;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const apiKey = process.env.MARBLE_API_KEY;
  if (!apiKey) {
    return localFallbackPosts.find((p) => p.slug === slug) || null;
  }

  try {
    const res = await fetch(`https://api.marblecms.com/v1/posts/slug/${slug}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return localFallbackPosts.find((p) => p.slug === slug) || null;
    }

    const json = await res.json();
    if (json && json.data) {
      return normalizeMarblePost(json.data);
    }

    return localFallbackPosts.find((p) => p.slug === slug) || null;
  } catch (err) {
    console.error(`Failed to fetch post by slug ${slug} from Marble CMS:`, err);
    return localFallbackPosts.find((p) => p.slug === slug) || null;
  }
}

function normalizeMarblePost(data: any): BlogPost {
  return {
    id: data.id || String(data._id || Math.random()),
    slug: data.slug || "",
    title: data.title || "",
    description: data.description || data.summary || "",
    contentHtml: data.contentHtml,
    contentMarkdown: data.contentMarkdown || data.content || "",
    coverImage: data.coverImage || data.featuredImage || undefined,
    publishedAt: data.publishedAt || data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt || data.updatedAt || new Date().toISOString(),
    author: {
      name: data.author?.name || "Huygen Team",
      avatar: data.author?.avatar || undefined,
      role: data.author?.role || "Developer"
    },
    category: data.category?.name || data.category || "AI Automation",
    tags: Array.isArray(data.tags) ? data.tags : [],
    readingTime: data.readingTime || "5 min read",
    canonicalUrl: data.canonicalUrl || undefined
  };
}
export { localFallbackPosts };
