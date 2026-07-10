import assert from "node:assert/strict";
import { test } from "node:test";

const {
  encodeBlogSlug,
  normalizeBlogSlug,
  normalizeCmsPost,
} = await import("../lib/blog/normalize.ts");

test("normalizeBlogSlug decodes, trims, and removes wrapping slashes", () => {
  assert.equal(
    normalizeBlogSlug(" /motion-design-conversion-speed-optimization/ "),
    "motion-design-conversion-speed-optimization"
  );
  assert.equal(normalizeBlogSlug("motion%20design"), "motion design");
});

test("encodeBlogSlug encodes path segments once", () => {
  assert.equal(encodeBlogSlug("motion design"), "motion%20design");
  assert.equal(encodeBlogSlug("already%20encoded"), "already%20encoded");
});

test("normalizeCmsPost handles complete Marble-style data", () => {
  const post = normalizeCmsPost({
    id: "post_123",
    slug: "motion-design-conversion-speed-optimization",
    status: "published",
    title: "Motion Design and AI Integration: Optimizing Conversion Without Sacrificing Performance",
    description: "Learn how to balance high-end motion design with site speed.",
    content: "<h1>Intro</h1><p>Article body with enough semantic HTML.</p>",
    publishedAt: "2026-07-10T00:00:00.000Z",
    updatedAt: "2026-07-10T01:00:00.000Z",
    category: { id: "cat_1", name: "Cinematic Websites", slug: "cinematic-websites" },
    authors: [{ id: "author_1", name: "Huygen Studios", image: { url: "https://cdn.example.com/a.png" } }],
    tags: [{ id: "tag_1", name: "Featured", slug: "featured" }],
    coverImage: { url: "https://cdn.example.com/cover.jpg", alt: "Motion design cover", width: 1200, height: 675 },
  });

  assert.equal(post.slug, "motion-design-conversion-speed-optimization");
  assert.equal(post.title, "Motion Design and AI Integration: Optimizing Conversion Without Sacrificing Performance");
  assert.equal(post.category.name, "Cinematic Websites");
  assert.equal(post.authors[0].name, "Huygen Studios");
  assert.equal(post.tags[0].name, "Featured");
  assert.equal(post.coverImage.url, "https://cdn.example.com/cover.jpg");
});

test("normalizeCmsPost handles missing optional fields without crashing", () => {
  const post = normalizeCmsPost({
    slug: "/motion-design-conversion-speed-optimization/",
    title: "Motion Design and AI Integration",
    content: null,
    publishedAt: null,
    updatedAt: "not-a-date",
    category: null,
    authors: null,
    tags: null,
    coverImage: "",
  });

  assert.equal(post.slug, "motion-design-conversion-speed-optimization");
  assert.equal(post.contentHtml, "");
  assert.equal(post.publishedAt, null);
  assert.equal(post.updatedAt, null);
  assert.equal(post.category, null);
  assert.deepEqual(post.authors, []);
  assert.deepEqual(post.tags, []);
  assert.equal(post.coverImage, null);
});

test("normalizeCmsPost returns null for absent posts or absent slugs", () => {
  assert.equal(normalizeCmsPost(null), null);
  assert.equal(normalizeCmsPost({ title: "No slug" }), null);
});
