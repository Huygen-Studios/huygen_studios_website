/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlogPost } from "../blog/types";
import { marbleFetch } from "./client";
import { MarblePost } from "./types";

export async function getMarblePosts(): Promise<BlogPost[]> {
  try {
    const res = await marbleFetch<any>("/posts", {
      next: { revalidate: 3600, tags: ["blog-list"] },
    });

    // Handle standard "posts" key or "data" array in response
    const posts: MarblePost[] = res.posts || res.data || [];
    return posts.map(mapMarblePostToBlogPost);
  } catch (err) {
    console.error("Error fetching posts from Marble CMS:", err);
    throw err;
  }
}

export async function getMarblePostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const res = await marbleFetch<any>(`/posts/${slug}`, {
      next: { revalidate: 3600, tags: [`blog-post-${slug}`] },
    });

    const post: MarblePost | null = res.post || res.data || null;
    if (post) {
      return mapMarblePostToBlogPost(post);
    }
    return null;
  } catch (err) {
    console.warn(`Error fetching post by slug ${slug} from Marble CMS, falling back to list lookup:`, err);
    try {
      const posts = await getMarblePosts();
      return posts.find((p) => p.slug === slug) || null;
    } catch {
      return null;
    }
  }
}

function mapMarblePostToBlogPost(post: MarblePost): BlogPost {
  // Author mapping
  const primaryAuthor = post.authors && post.authors.length > 0 ? post.authors[0] : null;
  const authorName = primaryAuthor?.name || "Huygen Team";
  const authorRole = primaryAuthor?.role || "Developer";
  const authorAvatar = primaryAuthor?.image || undefined;

  // Category mapping
  const categoryName = post.category?.name || "AI Automation";

  // Tags mapping
  const tagsList = post.tags ? post.tags.map((t: any) => t.name || t) : [];

  // Content reading time calculation (rough estimate: 200 words per minute)
  const contentBody = post.content || "";
  const wordsCount = contentBody.split(/\s+/).length;
  const minutes = Math.max(1, Math.round(wordsCount / 200));
  const readingTime = `${minutes} min read`;

  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    description: post.description || "",
    contentHtml: contentBody, // Marble CMS content is typically HTML
    coverImage: post.coverImage || undefined,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    author: {
      name: authorName,
      role: authorRole,
      avatar: authorAvatar,
    },
    category: categoryName,
    tags: tagsList,
    readingTime,
    canonicalUrl: `https://www.huygenstudios.com/blog/${post.slug}`,
  };
}
