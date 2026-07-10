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

function applyBlogRevalidation(rawSlug?: string | null) {
  const slug = normalizeBlogSlug(rawSlug);
  const paths = ["/blog", "/sitemap.xml"];
  const tags = ["marble-posts"];

  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
  revalidateTag("marble-posts", "max");

  if (slug) {
    const postPath = `/blog/${encodeBlogSlug(slug)}`;
    revalidatePath(postPath);
    revalidateTag(`marble-post:${slug}`, "max");
    paths.push(postPath);
    tags.push(`marble-post:${slug}`);
  }

  return { slug: slug || null, paths, tags };
}

async function readPostSlug(req: NextRequest): Promise<string | null> {
  const { searchParams } = new URL(req.url);
  const querySlug = searchParams.get("slug");
  if (querySlug) return querySlug;

  try {
    const body = await req.json();
    return body?.slug || body?.post?.slug || body?.data?.slug || body?.entry?.slug || null;
  } catch {
    return null;
  }
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

    const result = applyBlogRevalidation(await readPostSlug(req));

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

    const result = applyBlogRevalidation(await readPostSlug(req));
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
