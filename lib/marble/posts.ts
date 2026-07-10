import { BlogPost } from "../blog/types";
import { isPublishedCmsPost, normalizeBlogSlug, normalizeCmsPost } from "../blog/normalize";
import { MarbleApiError, marbleFetch } from "./client";

type UnknownRecord = Record<string, unknown>;
type MarblePagination = {
  currentPage?: number;
  totalPages?: number;
  nextPage?: number | null;
};

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

function extractPagination(response: unknown): MarblePagination | null {
  if (!isRecord(response) || !isRecord(response.pagination)) return null;
  return response.pagination;
}

function buildPostsEndpoint(page: number): string {
  const params = new URLSearchParams({
    limit: "100",
    page: String(page),
    order: "desc",
    format: "html",
    status: "published",
  });

  return `/posts?${params.toString()}`;
}

function buildPostEndpoint(slug: string): string {
  const params = new URLSearchParams({
    format: "html",
    status: "published",
  });

  return `/posts/${encodeURIComponent(slug)}?${params.toString()}`;
}

type MarblePostsOptions = {
  fresh?: boolean;
};

export async function getMarblePosts(options: MarblePostsOptions = {}): Promise<BlogPost[]> {
  const allRawPosts: unknown[] = [];
  let page = 1;
  let totalPages = 1;

  do {
    const endpoint = buildPostsEndpoint(page);
    const response = await marbleFetch<unknown>(endpoint, {
      ...(options.fresh
        ? { cache: "no-store" }
        : { next: { revalidate: 300, tags: ["marble-posts"] } }),
    });

    allRawPosts.push(...extractPostArray(response));

    const pagination = extractPagination(response);
    totalPages = Math.min(Math.max(pagination?.totalPages ?? page, page), 20);
    page = (pagination?.nextPage && pagination.nextPage > page)
      ? pagination.nextPage
      : page + 1;
  } while (page <= totalPages);

  const posts = allRawPosts
    .filter(isPublishedCmsPost)
    .map(normalizeCmsPost)
    .filter((post): post is BlogPost => Boolean(post));

  if (posts.length === 0) {
    console.warn("Marble CMS posts response produced no normalized published posts", {
      requestedFreshData: Boolean(options.fresh),
    });
  }

  return posts;
}

async function getMarblePostByDirectEndpoint(slug: string): Promise<BlogPost | null> {
  try {
    const response = await marbleFetch<unknown>(buildPostEndpoint(slug), {
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

  let directError: unknown = null;
  try {
    const directPost = await getMarblePostByDirectEndpoint(slug);
    if (directPost) return directPost;
  } catch (error) {
    directError = error;
    console.warn("Marble direct post lookup failed; trying published posts list", {
      slug,
      error: error instanceof MarbleApiError
        ? { status: error.status, statusText: error.statusText }
        : error instanceof Error
          ? { name: error.name, message: error.message }
          : { name: "UnknownError" },
    });
  }

  const listedPost = await getMarblePostByListLookup(slug);
  if (listedPost) return listedPost;

  const freshListedPost = await getFreshMarblePostByListLookup(slug);
  if (freshListedPost) return freshListedPost;

  if (directError) throw directError;
  return null;
}
