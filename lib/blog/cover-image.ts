import net from "net";

export function isIpAddress(hostname: string): boolean {
  return net.isIP(hostname) !== 0;
}

export function isHostnameAllowed(hostname: string): boolean {
  const target = hostname.toLowerCase().trim();
  return target === "images.pexels.com";
}

export function isValidRevalidationPath(path: string): boolean {
  const clean = path.trim().replace(/\/$/, "");
  return clean === "/blog" || clean === "/sitemap.xml" || clean.startsWith("/blog/");
}

function normalizeImageUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const url = value.trim();
  if (!url) return null;

  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
    return parsed.toString();
  } catch {
    return null;
  }
}

export function getSafeCoverImageUrl(coverImage: unknown, defaultFallback = "/images/blog/default-cover.svg"): string {
  if (!coverImage) return defaultFallback;

  // If it's already a string URL
  if (typeof coverImage === "string") {
    const url = normalizeImageUrl(coverImage);
    return url || defaultFallback;
  }

  // If it's an object containing url, src, or href
  if (typeof coverImage === "object" && coverImage !== null) {
    const record = coverImage as Record<string, unknown>;
    const rawUrl = record.url || record.src || record.href;
    if (typeof rawUrl === "string") {
      const url = normalizeImageUrl(rawUrl);
      return url || defaultFallback;
    }
  }

  return defaultFallback;
}
