import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.huygenstudios.com";

  // Core static pages
  const staticPages = [
    "",
    "/about",
    "/services",
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
    // Sane defaults for priority
    let priority = 0.8;
    let changeFrequency: "daily" | "weekly" | "monthly" | "yearly" = "monthly";

    if (page === "") {
      priority = 1.0;
      changeFrequency = "daily";
    } else if (page === "/creatives" || page === "/blog" || page === "/services") {
      priority = 0.9;
      changeFrequency = "weekly";
    }

    return {
      url: `${baseUrl}${page}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    };
  });

  // Future-proofing placeholder for Marble CMS posts integration
  // To integrate, uncomment the following block and configure your fetch:
  /*
  try {
    const response = await fetch("https://api.marblecms.com/v1/posts", {
      headers: { Authorization: `Bearer ${process.env.MARBLE_API_KEY}` },
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    if (response.ok) {
      const { data: posts } = await response.json();
      const postEntries = posts.map((post: { slug: string; updatedAt: string }) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }));
      return [...sitemapEntries, ...postEntries];
    }
  } catch (error) {
    console.error("Failed to fetch Marble CMS posts for sitemap:", error);
  }
  */

  return sitemapEntries;
}
