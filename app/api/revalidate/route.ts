import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { encodeBlogSlug, normalizeBlogSlug } from "@/lib/blog/normalize";

function authenticate(req: NextRequest): boolean {
  const revalidateSecret = process.env.MARBLE_REVALIDATE_SECRET;
  if (!revalidateSecret) return false;

  const { searchParams } = new URL(req.url);
  const paramSecret = searchParams.get("secret");
  const headerSecret = req.headers.get("x-revalidate-secret");

  return paramSecret === revalidateSecret || headerSecret === revalidateSecret;
}

function applyBlogRevalidation(slug: string | null, customPaths: string[] | null) {
  const normalizedSlug = normalizeBlogSlug(slug);
  const paths = customPaths && customPaths.length > 0 ? customPaths : ["/blog", "/sitemap.xml"];
  const tags = ["marble-posts"];

  // Revalidate tags
  revalidateTag("marble-posts", "max");
  if (normalizedSlug) {
    revalidateTag(`marble-post:${normalizedSlug}`, "max");
    tags.push(`marble-post:${normalizedSlug}`);
  }

  // Revalidate paths
  for (const path of paths) {
    revalidatePath(path);
  }

  // Ensure targeted slug path is also explicitly revalidated
  if (normalizedSlug) {
    const postPath = `/blog/${encodeBlogSlug(normalizedSlug)}`;
    if (!paths.includes(postPath)) {
      revalidatePath(postPath);
      paths.push(postPath);
    }
  }

  return { slug: normalizedSlug || null, paths, tags };
}

async function readRevalidationParams(req: NextRequest): Promise<{ slug: string | null; paths: string[] | null }> {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  
  let paths: string[] | null = null;
  const queryPaths = searchParams.get("paths");
  if (queryPaths) {
    try {
      const parsed = JSON.parse(queryPaths);
      if (Array.isArray(parsed)) paths = parsed.map(String);
    } catch {}
  }

  if (req.method === "POST") {
    try {
      const body = await req.json();
      return {
        slug: slug || body?.slug || body?.post?.slug || body?.data?.slug || body?.entry?.slug || null,
        paths: paths || (Array.isArray(body?.paths) ? body.paths.map(String) : null)
      };
    } catch {}
  }

  return { slug, paths };
}

function missingSecretResponse() {
  return NextResponse.json(
    { error: "Revalidation secret is not configured on the server" },
    { status: 500 }
  );
}

function unauthorizedResponse() {
  return NextResponse.json(
    { error: "Unauthorized access: Invalid revalidation secret" },
    { status: 401 }
  );
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.MARBLE_REVALIDATE_SECRET) return missingSecretResponse();
    if (!authenticate(req)) return unauthorizedResponse();

    const { slug, paths } = await readRevalidationParams(req);
    const result = applyBlogRevalidation(slug, paths);

    return NextResponse.json({
      revalidated: true,
      revalidatedSlug: result.slug,
      paths: result.paths,
      tags: result.tags,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("Error during manual cache revalidation:", error);
    return NextResponse.json(
      { error: "Internal server error occurred during cache refresh" },
      { status: 500 }
    );
  }
}

// Support GET requests for easy browser-based testing/integration checks
export async function GET(req: NextRequest) {
  try {
    if (!process.env.MARBLE_REVALIDATE_SECRET) return missingSecretResponse();
    if (!authenticate(req)) return unauthorizedResponse();

    const { slug, paths } = await readRevalidationParams(req);
    const result = applyBlogRevalidation(slug, paths);

    return NextResponse.json({
      revalidated: true,
      revalidatedSlug: result.slug,
      paths: result.paths,
      tags: result.tags,
      method: "GET",
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("Error during GET cache revalidation:", error);
    return NextResponse.json(
      { error: "Internal server error occurred during cache refresh" },
      { status: 500 }
    );
  }
}
