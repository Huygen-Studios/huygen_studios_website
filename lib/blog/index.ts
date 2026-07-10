import { BlogPost } from "./types";
import { localFallbackPosts } from "./local-posts";
import { getMarblePosts, getMarblePostBySlug } from "../marble/posts";
import { normalizeBlogSlug } from "./normalize";

export async function getBlogPosts(): Promise<BlogPost[]> {
  const apiKey = process.env.MARBLE_API_KEY;
  if (!apiKey) {
    return localFallbackPosts;
  }

  try {
    return await getMarblePosts();
  } catch (err) {
    console.warn("Failed to retrieve posts from Marble CMS, falling back to local posts:", err);
    return localFallbackPosts;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const normalizedSlug = normalizeBlogSlug(slug);
  if (!normalizedSlug) return null;

  const apiKey = process.env.MARBLE_API_KEY;
  if (!apiKey) {
    return localFallbackPosts.find((p) => p.slug === normalizedSlug) || null;
  }

  const post = await getMarblePostBySlug(normalizedSlug);
  if (post) return post;

  return localFallbackPosts.find((p) => p.slug === normalizedSlug) || null;
}

export { localFallbackPosts };
export { encodeBlogSlug, normalizeBlogSlug, normalizeCmsPost } from "./normalize";
