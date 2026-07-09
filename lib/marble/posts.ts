/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlogPost } from "../blog/types";
import { marbleFetch } from "./client";
import { MarblePost } from "./types";

export function getPostCoverImage(post: any): string | null {
  if (!post) return null;
  return (
    post.coverImage?.url ||
    post.coverImage?.src ||
    post.featuredImage?.url ||
    post.featuredImage?.src ||
    post.image?.url ||
    post.image?.src ||
    post.cover?.url ||
    post.cover?.src ||
    (typeof post.coverImage === "string" ? post.coverImage : null)
  );
}

export async function getMarblePosts(): Promise<BlogPost[]> {
  try {
    const res = await marbleFetch<any>("/posts", {
      next: { revalidate: 60, tags: ["marble-posts"] },
    });

    // Handle standard "posts" key or "data" array in response
    const posts: MarblePost[] = res.posts || res.data || [];
    
    // Filter to only include published, valid posts with a slug
    const publishedPosts = posts.filter(
      (post) => post && post.status?.toLowerCase() === "published" && post.slug
    );
    
    return publishedPosts.map(mapMarblePostToBlogPost);
  } catch (err) {
    console.error("Error fetching posts from Marble CMS:", err);
    throw err;
  }
}

export async function getMarblePostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const res = await marbleFetch<any>(`/posts/${slug}`, {
      next: { revalidate: 60, tags: ["marble-posts", `marble-post-${slug}`] },
    });

    const post: MarblePost | null = res.post || res.data || null;
    if (post && post.status?.toLowerCase() === "published") {
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
  // Safe Title and Slug
  const title = post.title || "Untitled Article";
  const slug = post.slug || "";

  // Author mapping with safety checks
  const authorsList = Array.isArray(post.authors) ? post.authors : [];
  const primaryAuthor = authorsList.length > 0 ? authorsList[0] : null;
  const authorName = primaryAuthor?.name || "Huygen Team";
  const authorRole = primaryAuthor?.role || "Developer";
  
  let authorAvatar: string | undefined = undefined;
  if (primaryAuthor?.image) {
    if (typeof primaryAuthor.image === "string") {
      authorAvatar = primaryAuthor.image;
    } else if (typeof primaryAuthor.image === "object") {
      authorAvatar = (primaryAuthor.image as any).url || (primaryAuthor.image as any).src || undefined;
    }
  }

  // Category mapping
  const categoryName = post.category?.name || "AI Automation";

  // Tags mapping with safety checks
  const tagsList = Array.isArray(post.tags) 
    ? post.tags.map((t: any) => {
        if (!t) return "";
        if (typeof t === "string") return t;
        return t.name || t.slug || "";
      }).filter(Boolean)
    : [];

  // Content reading time calculation (rough estimate: 200 words per minute)
  const contentBody = post.content || "";
  const wordsCount = contentBody.split(/\s+/).length;
  const minutes = Math.max(1, Math.round(wordsCount / 200));
  const readingTime = `${minutes} min read`;

  // Safe Dates
  const publishedAt = post.publishedAt || new Date().toISOString();
  const updatedAt = post.updatedAt || publishedAt;

  // Safe cover image URL extraction using getPostCoverImage helper
  const coverImageUrl = getPostCoverImage(post) || undefined;

  return {
    id: post.id || Math.random().toString(36).substring(2, 9),
    slug,
    title,
    description: post.description || "",
    contentHtml: contentBody,
    coverImage: coverImageUrl,
    publishedAt,
    updatedAt,
    author: {
      name: authorName,
      role: authorRole,
      avatar: authorAvatar,
    },
    category: categoryName,
    tags: tagsList,
    readingTime,
    canonicalUrl: slug ? `https://www.huygenstudios.com/blog/${slug}` : undefined,
  };
}
