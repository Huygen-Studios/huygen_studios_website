import { BlogPost } from "../blog/types";
import { isPublishedCmsPost, normalizeBlogSlug, normalizeCmsPost } from "../blog/normalize";
import { MarbleApiError, marbleFetch } from "./client";

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function extractPostArray(response: unknown): unknown[] {
  if (Array.isArray(response)) return response;
  if (!isRecord(response)) return [];

  const candidates = [response.posts, response.data, response.items, response.results];
  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate;
  }

  return [];
}

function extractSinglePost(response: unknown): unknown | null {
  if (!isRecord(response)) return null;
  return response.post ?? response.data ?? response.item ?? null;
}

type MarblePostsOptions = {
  fresh?: boolean;
};

export async function getMarblePosts(options: MarblePostsOptions = {}): Promise<BlogPost[]> {
  const response = await marbleFetch<unknown>("/posts", {
    ...(options.fresh
      ? { cache: "no-store" }
      : { next: { revalidate: 300, tags: ["marble-posts"] } }),
  });

  const posts = extractPostArray(response)
    .filter(isPublishedCmsPost)
    .map(normalizeCmsPost)
    .filter((post): post is BlogPost => Boolean(post));

  if (posts.length === 0) {
    console.warn("Marble CMS posts response produced no normalized published posts", {
      responseWasObject: isRecord(response),
    });
  }

  return posts;
}

async function getMarblePostByDirectEndpoint(slug: string): Promise<BlogPost | null> {
  try {
    const response = await marbleFetch<unknown>(`/posts/${encodeURIComponent(slug)}`, {
      next: { revalidate: 300, tags: ["marble-posts", `marble-post:${slug}`] },
    });

    const rawPost = extractSinglePost(response);
    if (!rawPost || !isPublishedCmsPost(rawPost)) return null;
    return normalizeCmsPost(rawPost);
  } catch (error) {
    if (error instanceof MarbleApiError && error.status === 404) return null;
    throw error;
  }
}

async function getMarblePostByListLookup(slug: string): Promise<BlogPost | null> {
  const posts = await getMarblePosts();
  return posts.find((post) => normalizeBlogSlug(post.slug) === slug) ?? null;
}

async function getFreshMarblePostByListLookup(slug: string): Promise<BlogPost | null> {
  const posts = await getMarblePosts({ fresh: true });
  return posts.find((post) => normalizeBlogSlug(post.slug) === slug) ?? null;
}

export async function getMarblePostBySlug(rawSlug: string): Promise<BlogPost | null> {
  const slug = normalizeBlogSlug(rawSlug);
  if (!slug) return null;

  // The catalog is sourced from /posts, so detail resolution starts from that same
  // source of truth. This keeps n8n-published posts reachable even when Marble's
  // per-slug endpoint lags or is unavailable for a newly created article.
  const listedPost = await getMarblePostByListLookup(slug);
  if (listedPost) return listedPost;

  const freshListedPost = await getFreshMarblePostByListLookup(slug);
  if (freshListedPost) return freshListedPost;

  return getMarblePostByDirectEndpoint(slug);
}
