import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const normalizeSource = readFileSync(new URL("../lib/blog/normalize.ts", import.meta.url), "utf8");
const catalogSource = readFileSync(new URL("../components/blog/BlogCatalog.tsx", import.meta.url), "utf8");
const routeSource = readFileSync(new URL("../app/blog/[slug]/page.tsx", import.meta.url), "utf8");
const revalidateSource = readFileSync(new URL("../app/api/revalidate/route.ts", import.meta.url), "utf8");

test("slug normalization decodes, trims, and removes wrapping slashes", () => {
  assert.match(normalizeSource, /decodeURIComponent\(slug\)/);
  assert.match(normalizeSource, /replace\(\/\^\\\/\+\|\\\/\+\$\/g/);
});

test("CMS normalization keeps canonical CMS slug and tolerates optional fields", () => {
  assert.match(normalizeSource, /export function normalizeCmsPost/);
  assert.match(normalizeSource, /if \(!slug\) return null/);
  assert.match(normalizeSource, /category: normalizeCategory/);
  assert.match(normalizeSource, /authors,/);
  assert.match(normalizeSource, /tags,/);
  assert.match(normalizeSource, /coverImage: normalizeCoverImage/);
  assert.match(normalizeSource, /publishedAt,/);
});

test("content and image normalization are defensive", () => {
  assert.match(normalizeSource, /function stringifyContent/);
  assert.match(normalizeSource, /normalizeImageUrl/);
  assert.match(normalizeSource, /new URL\(url\)/);
  assert.match(normalizeSource, /estimateReadingTime/);
});

test("blog card hrefs use encoded canonical slugs", () => {
  assert.match(catalogSource, /href=\{`\/blog\/\$\{encodeBlogSlug\(post\.slug\)\}`\}/);
  assert.match(catalogSource, /href=\{`\/blog\/\$\{encodeBlogSlug\(featuredPost\.slug\)\}`\}/);
});

test("newly published posts are not blocked by static params", () => {
  assert.match(routeSource, /export const dynamicParams = true/);
  assert.doesNotMatch(routeSource, /dynamicParams = false/);
});

test("detail route throws CMS errors instead of turning them into notFound", () => {
  assert.match(routeSource, /throw error/);
  assert.match(routeSource, /if \(!post\) \{\s+notFound\(\);/s);
});

test("metadata and detail rendering handle missing optional values", () => {
  assert.match(routeSource, /post\.authors\[0\]\?\.name \|\| "Huygen Team"/);
  assert.match(routeSource, /post\.coverImage\?\.url \|\| null/);
  assert.match(routeSource, /post\.category\?\.name \|\| "AI Automation"/);
  assert.match(routeSource, /post\.publishedAt \|\| undefined/);
});

test("revalidation clears index, sitemap, list tag, and targeted article data", () => {
  assert.match(revalidateSource, /revalidatePath\("\/blog"\)/);
  assert.match(revalidateSource, /revalidatePath\("\/sitemap\.xml"\)/);
  assert.match(revalidateSource, /revalidateTag\("marble-posts", "max"\)/);
  assert.match(revalidateSource, /revalidatePath\(postPath\)/);
  assert.match(revalidateSource, /revalidateTag\(`marble-post:\$\{slug\}`, "max"\)/);
});

test("GSAP initializes only in the client catalog and cleans up listeners", () => {
  assert.match(catalogSource, /"use client"/);
  assert.match(catalogSource, /useGSAP/);
  assert.match(catalogSource, /scope: catalogRef/);
  assert.match(catalogSource, /removeEventListener\("pointerenter"/);
  assert.match(catalogSource, /removeEventListener\("pointerleave"/);
});

test("reduced motion keeps blog cards visible and links clickable", () => {
  assert.match(catalogSource, /prefers-reduced-motion: reduce/);
  assert.match(catalogSource, /gsap\.set\(cards, \{ opacity: 1/);
  assert.match(catalogSource, /className="blog-card group/);
  assert.doesNotMatch(catalogSource, /preventDefault\(/);
});
