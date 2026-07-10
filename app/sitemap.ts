import type { MetadataRoute } from "next";
import { encodeBlogSlug, getBlogPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.huygenstudios.com";

  // Core static pages (removed /creatives)
  const staticPages = [
    "",
    "/about",
    "/services",
    "/services/ai-voice-agents",
    "/services/whatsapp-automation",
    "/services/ai-automation",
    "/services/cinematic-websites",
    "/services/gohighlevel-automation",
    "/pricing",
    "/blog",
    "/faq",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/cookie-policy",
  ];

  const sitemapEntries: MetadataRoute.Sitemap = staticPages.map((page) => {
    let priority = 0.8;
    let changeFrequency: "daily" | "weekly" | "monthly" | "yearly" = "monthly";

    if (page === "") {
      priority = 1.0;
      changeFrequency = "daily";
    } else if (page === "/blog" || page === "/services") {
      priority = 0.9;
      changeFrequency = "weekly";
    } else if (page.startsWith("/services/")) {
      priority = 0.85;
      changeFrequency = "monthly";
    }

    return {
      url: `${baseUrl}${page}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    };
  });

  // Dynamic blog post paths fetched from the unified data layer
  try {
    const posts = await getBlogPosts();
    const apiKey = process.env.MARBLE_API_KEY;

    // Filter out posts that don't have a valid slug.
    // Also, if MARBLE_API_KEY is configured, exclude any fallback local posts from the production sitemap.
    const filteredPosts = posts.filter((post) => {
      if (!post || !post.slug) return false;
      if (apiKey && post.id?.startsWith("local-post-")) {
        return false;
      }
      return true;
    });

    const postEntries = filteredPosts.map((post) => {
      // Determine lastModified date, fallback to current Date if invalid
      let lastMod = new Date();
      if (post.updatedAt) {
        const d = new Date(post.updatedAt);
        if (!isNaN(d.getTime())) {
          lastMod = d;
        }
      } else if (post.publishedAt) {
        const d = new Date(post.publishedAt);
        if (!isNaN(d.getTime())) {
          lastMod = d;
        }
      }

      return {
        url: `${baseUrl}/blog/${encodeBlogSlug(post.slug)}`,
        lastModified: lastMod,
        changeFrequency: "monthly" as const,
        priority: 0.75,
      };
    });

    return [...sitemapEntries, ...postEntries];
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Failed to generate dynamic blog post entries for sitemap:", error);
    }
    return sitemapEntries;
  }
}
