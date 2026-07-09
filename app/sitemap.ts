import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.huygenstudios.com";

  // Core static pages
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
    "/creatives",
  ];

  const sitemapEntries: MetadataRoute.Sitemap = staticPages.map((page) => {
    let priority = 0.8;
    let changeFrequency: "daily" | "weekly" | "monthly" | "yearly" = "monthly";

    if (page === "") {
      priority = 1.0;
      changeFrequency = "daily";
    } else if (page === "/creatives" || page === "/blog" || page === "/services") {
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
    const postEntries = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
    return [...sitemapEntries, ...postEntries];
  } catch (error) {
    console.error("Failed to generate dynamic blog post entries for sitemap:", error);
    return sitemapEntries;
  }
}
