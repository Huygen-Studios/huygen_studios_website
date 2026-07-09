import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const revalidateSecret = process.env.MARBLE_REVALIDATE_SECRET;
    if (!revalidateSecret) {
      return NextResponse.json(
        { error: "Revalidation secret is not configured on the server" },
        { status: 500 }
      );
    }

    // Authenticate via query param or header
    const { searchParams } = new URL(req.url);
    const paramSecret = searchParams.get("secret");
    const headerSecret = req.headers.get("x-revalidate-secret");

    if (paramSecret !== revalidateSecret && headerSecret !== revalidateSecret) {
      return NextResponse.json(
        { error: "Unauthorized access: Invalid revalidation secret" },
        { status: 401 }
      );
    }

    // Parse JSON payload to check for dynamic article slug updates
    let slug: string | undefined;
    try {
      const body = await req.json();
      slug = body?.slug || body?.post?.slug || body?.data?.slug;
    } catch {
      // Allow fallback if no body or malformed payload is sent
    }

    // Always revalidate the blog catalog list
    revalidatePath("/blog");
    revalidateTag("blog-list", "default");

    // Also revalidate the canonical sitemap route
    revalidatePath("/sitemap.xml");

    // Revalidate specific post page if slug is provided
    if (slug && typeof slug === "string") {
      revalidatePath(`/blog/${slug}`);
      revalidateTag(`blog-post-${slug}`, "default");
      return NextResponse.json({
        revalidated: true,
        revalidatedSlug: slug,
        timestamp: Date.now(),
      });
    }

    return NextResponse.json({
      revalidated: true,
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
    const revalidateSecret = process.env.MARBLE_REVALIDATE_SECRET;
    if (!revalidateSecret) {
      return NextResponse.json(
        { error: "Revalidation secret is not configured on the server" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(req.url);
    const secret = searchParams.get("secret");
    const slug = searchParams.get("slug");

    if (secret !== revalidateSecret) {
      return NextResponse.json(
        { error: "Unauthorized access: Invalid revalidation secret" },
        { status: 401 }
      );
    }

    revalidatePath("/blog");
    revalidateTag("blog-list", "default");
    revalidatePath("/sitemap.xml");

    if (slug) {
      revalidatePath(`/blog/${slug}`);
      revalidateTag(`blog-post-${slug}`, "default");
      return NextResponse.json({
        revalidated: true,
        revalidatedSlug: slug,
        method: "GET",
        timestamp: Date.now(),
      });
    }

    return NextResponse.json({
      revalidated: true,
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
