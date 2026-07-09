import { BlogPost } from "./types";
import { localFallbackPosts } from "./local-posts";
import { getMarblePosts, getMarblePostBySlug } from "../marble/posts";

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
  const apiKey = process.env.MARBLE_API_KEY;
  if (!apiKey) {
    return localFallbackPosts.find((p) => p.slug === slug) || null;
  }

  try {
    const post = await getMarblePostBySlug(slug);
    if (post) return post;
    return localFallbackPosts.find((p) => p.slug === slug) || null;
  } catch (err) {
    console.warn(`Failed to retrieve post ${slug} from Marble CMS, falling back to local posts:`, err);
    return localFallbackPosts.find((p) => p.slug === slug) || null;
  }
}

export { localFallbackPosts };
