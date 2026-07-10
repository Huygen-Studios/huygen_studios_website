import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { isIpAddress, isHostnameAllowed } from "../../../../lib/blog/cover-image";

export const dynamic = "force-dynamic";

async function getFallbackResponse(isHead: boolean): Promise<NextResponse> {
  const headers: Record<string, string> = {
    "Content-Type": "image/svg+xml",
    "Cache-Control": "public, max-age=300, s-maxage=600",
    "X-Content-Type-Options": "nosniff",
    "Content-Security-Policy": "default-src 'none'; img-src 'self' data:; style-src 'unsafe-inline';",
    "Content-Disposition": "inline",
    "X-Huygen-Image-Source": "fallback",
  };

  if (isHead) {
    return new NextResponse(null, { status: 200, headers });
  }

  try {
    const fallbackPath = path.join(process.cwd(), "public", "images", "blog", "default-cover.svg");
    const buffer = fs.readFileSync(fallbackPath);
    return new NextResponse(buffer, { status: 200, headers });
  } catch {
    const minimalSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="100%" height="100%"><rect width="100%" height="100%" fill="#050505"/><text x="50%" y="50%" fill="#fff" font-family="sans-serif" font-size="24" text-anchor="middle">HUYGEN STUDIOS</text></svg>`;
    return new NextResponse(Buffer.from(minimalSvg), { status: 200, headers });
  }
}

async function handleRequest(req: NextRequest, isHead: boolean): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const src = searchParams.get("src");
  const slug = searchParams.get("slug") || "unknown-post";
  const provider = searchParams.get("provider") || "unknown";
  const photoId = searchParams.get("photoId") || "unknown";

  let host: string | null = null;

  try {
    if (!src) {
      throw new Error("Missing required query parameter: src");
    }

    const maxBytes = parseInt(process.env.BLOG_IMAGE_PROXY_MAX_BYTES || "8000000", 10);
    const timeoutMs = parseInt(process.env.BLOG_IMAGE_PROXY_TIMEOUT_MS || "10000", 10);

    let currentUrl = src;
    let redirectCount = 0;
    let response: Response | null = null;

    while (redirectCount <= 3) {
      const urlObj = new URL(currentUrl);
      if (urlObj.protocol !== "https:") {
        throw new Error("Only absolute https: URLs are permitted");
      }
      if (urlObj.username || urlObj.password) {
        throw new Error("URL cannot contain credentials");
      }
      
      const hostname = urlObj.hostname.toLowerCase();
      host = hostname;
      
      if (hostname === "localhost" || isIpAddress(hostname)) {
        throw new Error("Localhost and IP destinations are rejected");
      }
      
      if (!isHostnameAllowed(hostname)) {
        throw new Error(`Hostname ${hostname} is not allowed by proxy policy`);
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      try {
        response = await fetch(currentUrl, {
          method: isHead ? "HEAD" : "GET",
          headers: {
            "User-Agent": "HuygenBlogImageProxy/1.0",
          },
          redirect: "manual",
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timeoutId);
      }

      if ([301, 302, 303, 307, 308].includes(response.status)) {
        const location = response.headers.get("location");
        if (!location) {
          throw new Error("Redirect missing location header");
        }
        currentUrl = new URL(location, currentUrl).toString();
        redirectCount++;
        continue;
      }

      break;
    }

    if (redirectCount > 3) {
      throw new Error("Too many redirects (limit is 3)");
    }

    if (!response) {
      throw new Error("No response received from remote image server");
    }

    if (!response.ok) {
      throw new Error(`Remote image server responded with HTTP ${response.status}`);
    }

    const contentType = response.headers.get("content-type")?.toLowerCase() || "";
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
    if (!allowedMimeTypes.some(mime => contentType.startsWith(mime))) {
      throw new Error(`Forbidden MIME type: ${contentType}`);
    }

    const contentLenHeader = response.headers.get("content-length");
    if (contentLenHeader) {
      const contentLen = parseInt(contentLenHeader, 10);
      if (!isNaN(contentLen) && contentLen > maxBytes) {
        throw new Error(`Content length exceeds limit of ${maxBytes} bytes`);
      }
    }

    const headers: Record<string, string> = {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000",
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "default-src 'none'; img-src 'self' data:; style-src 'unsafe-inline';",
      "Content-Disposition": "inline",
      "X-Huygen-Image-Source": "pexels",
    };

    if (isHead) {
      return new NextResponse(null, { status: 200, headers });
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("Response body is not readable");
    }

    const chunks: Uint8Array[] = [];
    let totalBytes = 0;

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        if (value) {
          totalBytes += value.length;
          if (totalBytes > maxBytes) {
            reader.cancel();
            throw new Error(`Streamed content size exceeded limit of ${maxBytes} bytes`);
          }
          chunks.push(value);
        }
      }
    } finally {
      reader.releaseLock();
    }

    const combinedBuffer = Buffer.concat(chunks.map(c => Buffer.from(c)));
    return new NextResponse(combinedBuffer, { status: 200, headers });

  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    console.warn("Blog image proxy fallback served:", {
      reason: errorMsg,
      host: host || "unknown",
      slug,
      provider,
      photoId,
    });
    return getFallbackResponse(isHead);
  }
}

export async function GET(req: NextRequest) {
  return handleRequest(req, false);
}

export async function HEAD(req: NextRequest) {
  return handleRequest(req, true);
}
