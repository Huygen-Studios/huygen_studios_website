import type { BlogAuthor, BlogCategory, BlogCoverImage, BlogPost, BlogTag } from "./types";

type UnknownRecord = Record<string, unknown>;

export function normalizeBlogSlug(slug: unknown): string {
  if (typeof slug !== "string") return "";

  try {
    return decodeURIComponent(slug).trim().replace(/^\/+|\/+$/g, "");
  } catch {
    return slug.trim().replace(/^\/+|\/+$/g, "");
  }
}

export function encodeBlogSlug(slug: string): string {
  return normalizeBlogSlug(slug).split("/").map(encodeURIComponent).join("/");
}

export function isRecord(value: unknown): value is UnknownRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function asNullableDate(value: unknown): string | null {
  const date = asString(value);
  if (!date) return null;

  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? null : date;
}

function pickString(record: UnknownRecord, keys: string[]): string {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }

  return "";
}

function normalizeAuthor(value: unknown): BlogAuthor | null {
  if (typeof value === "string" && value.trim()) {
    return { name: value.trim() };
  }

  if (!isRecord(value)) return null;

  const name = pickString(value, ["name", "fullName", "title"]);
  if (!name) return null;

  const image = value.image;
  let avatarUrl: string | null = null;
  if (typeof image === "string") {
    avatarUrl = normalizeImageUrl(image);
  } else if (isRecord(image)) {
    avatarUrl = normalizeImageUrl(pickString(image, ["url", "src"]));
  }

  return {
    id: pickString(value, ["id"]) || undefined,
    name,
    avatarUrl,
    role: pickString(value, ["role"]) || undefined,
  };
}

function normalizeCategory(value: unknown): BlogCategory | null {
  if (typeof value === "string" && value.trim()) {
    return { name: value.trim() };
  }

  if (!isRecord(value)) return null;

  const name = pickString(value, ["name", "title", "slug"]);
  if (!name) return null;

  return {
    id: pickString(value, ["id"]) || undefined,
    name,
    slug: normalizeBlogSlug(value.slug) || undefined,
  };
}

function normalizeTag(value: unknown): BlogTag | null {
  if (typeof value === "string" && value.trim()) {
    return { name: value.trim() };
  }

  if (!isRecord(value)) return null;

  const name = pickString(value, ["name", "title", "slug"]);
  if (!name) return null;

  return {
    id: pickString(value, ["id"]) || undefined,
    name,
    slug: normalizeBlogSlug(value.slug) || undefined,
  };
}

export function normalizeImageUrl(value: unknown): string | null {
  const url = asString(value).trim();
  if (!url) return null;

  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
    return parsed.toString();
  } catch {
    return null;
  }
}

function normalizeCoverImage(post: UnknownRecord, title: string): BlogCoverImage | null {
  const imageCandidates = [
    post.coverImage,
    post.featuredImage,
    post.image,
    post.cover,
    post.thumbnail,
  ];

  for (const candidate of imageCandidates) {
    if (typeof candidate === "string") {
      const url = normalizeImageUrl(candidate);
      if (url) return { url, alt: title };
    }

    if (isRecord(candidate)) {
      const url = normalizeImageUrl(pickString(candidate, ["url", "src", "href"]));
      if (!url) continue;

      const widthValue = candidate.width;
      const heightValue = candidate.height;
      const width = typeof widthValue === "number" && widthValue > 0 ? widthValue : undefined;
      const height = typeof heightValue === "number" && heightValue > 0 ? heightValue : undefined;

      return {
        url,
        alt: pickString(candidate, ["alt", "altText", "title"]) || title,
        width,
        height,
      };
    }
  }

  return null;
}

function stringifyContent(value: unknown): string {
  if (typeof value === "string") return value;
  if (!isRecord(value)) return "";

  return (
    pickString(value, ["html", "contentHtml", "body", "markdown", "text", "value"]) ||
    ""
  );
}

function estimateReadingTime(contentHtml: string): string {
  const text = contentHtml.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const words = text ? text.split(" ").length : 0;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

export function normalizeCmsPost(rawPost: unknown): BlogPost | null {
  if (!isRecord(rawPost)) return null;

  const slug = normalizeBlogSlug(rawPost.slug);
  if (!slug) return null;

  const title = pickString(rawPost, ["title", "name", "headline"]) || "Untitled Article";
  const description = pickString(rawPost, ["description", "excerpt", "summary"]);
  const contentHtml = stringifyContent(
    rawPost.content ?? rawPost.contentHtml ?? rawPost.html ?? rawPost.body
  );
  const authors = (Array.isArray(rawPost.authors) ? rawPost.authors : [rawPost.author])
    .map(normalizeAuthor)
    .filter((author): author is BlogAuthor => Boolean(author));
  const tags = (Array.isArray(rawPost.tags) ? rawPost.tags : [])
    .map(normalizeTag)
    .filter((tag): tag is BlogTag => Boolean(tag));
  const publishedAt = asNullableDate(rawPost.publishedAt ?? rawPost.published_at ?? rawPost.createdAt);
  const updatedAt = asNullableDate(rawPost.updatedAt ?? rawPost.updated_at) ?? publishedAt;

  return {
    id: pickString(rawPost, ["id", "_id"]) || slug,
    slug,
    title,
    description,
    contentHtml,
    contentMarkdown: pickString(rawPost, ["contentMarkdown", "markdown"]) || undefined,
    publishedAt,
    updatedAt,
    category: normalizeCategory(rawPost.category),
    authors,
    tags,
    coverImage: normalizeCoverImage(rawPost, title),
    readingTime: estimateReadingTime(contentHtml || description || title),
    canonicalUrl: `https://www.huygenstudios.com/blog/${encodeBlogSlug(slug)}`,
  };
}

export function isPublishedCmsPost(rawPost: unknown): boolean {
  if (!isRecord(rawPost)) return false;
  const status = asString(rawPost.status).toLowerCase();
  return !status || status === "published";
}
