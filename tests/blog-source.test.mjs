import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const normalizeSource = readFileSync(new URL("../lib/blog/normalize.ts", import.meta.url), "utf8");
const catalogSource = readFileSync(new URL("../components/blog/BlogCatalog.tsx", import.meta.url), "utf8");
const cardSource = readFileSync(new URL("../components/blog/AnimatedBlogCard.tsx", import.meta.url), "utf8");
const textSource = readFileSync(new URL("../components/animations/AnimatedText.tsx", import.meta.url), "utf8");
const revealSource = readFileSync(new URL("../components/animations/AnimatedReveal.tsx", import.meta.url), "utf8");
const ctaSource = readFileSync(new URL("../components/animations/AnimatedCta.tsx", import.meta.url), "utf8");
const routeSource = readFileSync(new URL("../app/blog/[slug]/page.tsx", import.meta.url), "utf8");
const revalidateSource = readFileSync(new URL("../app/api/revalidate/route.ts", import.meta.url), "utf8");
const marblePostsSource = readFileSync(new URL("../lib/marble/posts.ts", import.meta.url), "utf8");
const secondaryLayoutSource = readFileSync(new URL("../components/web3/SecondaryPageLayout.tsx", import.meta.url), "utf8");

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
  assert.match(cardSource, /href=\{`\/blog\/\$\{encodeBlogSlug\(post\.slug\)\}`\}/);
  assert.match(cardSource, /data-animated-blog-card/);
});

test("newly published posts are not blocked by static params", () => {
  assert.match(routeSource, /export const dynamicParams = true/);
  assert.match(routeSource, /export const revalidate = 300/);
  assert.doesNotMatch(routeSource, /dynamicParams = false/);
  assert.doesNotMatch(routeSource, /generateStaticParams/);
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
  // sitemap is revalidated with "layout" scope for correct App Router cache invalidation
  assert.match(revalidateSource, /revalidatePath\("\/sitemap\.xml", "layout"\)/);
  assert.match(revalidateSource, /revalidateTag\("marble-posts", "max"\)/);
  assert.match(revalidateSource, /revalidatePath\(postPath\)/);
  assert.match(revalidateSource, /revalidateTag\(`marble-post:\$\{slug\}`, "max"\)/);
});

test("GSAP uses client-only scoped hooks for catalog entrance motion", () => {
  assert.match(catalogSource, /"use client"/);
  assert.match(catalogSource, /useGSAP/);
  assert.match(catalogSource, /scope: catalogRef/);
  assert.match(catalogSource, /gsap\.matchMedia/);
  assert.match(catalogSource, /revertOnUpdate: true/);
});

test("reduced motion keeps blog cards visible and links clickable", () => {
  assert.match(catalogSource, /prefers-reduced-motion: reduce/);
  assert.match(catalogSource, /gsap\.set\(cards, \{ opacity: 1/);
  assert.doesNotMatch(catalogSource, /preventDefault\(/);
});

test("text, card, and CTA animations use official useGSAP context patterns", () => {
  for (const source of [textSource, revealSource, cardSource, ctaSource]) {
    assert.match(source, /"use client"/);
    assert.match(source, /useGSAP/);
    assert.match(source, /gsap\.matchMedia/);
    assert.match(source, /prefers-reduced-motion: reduce/);
  }
  assert.match(cardSource, /contextSafe/);
  assert.match(ctaSource, /contextSafe/);
  assert.match(cardSource, /timeline\(\{\s*paused: true/);
  assert.match(ctaSource, /timeline\(\{\s*paused: true/);
  assert.match(textSource, /stagger: 0\.035/);
  assert.match(revealSource, /duration: 0\.7/);
});

test("detail lookup uses the list source of truth with a fresh fallback before 404", () => {
  assert.match(marblePostsSource, /getMarblePosts\(options: MarblePostsOptions = \{\}\)/);
  assert.match(marblePostsSource, /limit: "100"/);
  assert.match(marblePostsSource, /format: "html"/);
  assert.match(marblePostsSource, /status: "published"/);
  assert.match(marblePostsSource, /buildPostEndpoint/);
  assert.match(marblePostsSource, /\/posts\/\$\{encodeURIComponent\(slug\)\}\?\$\{params\.toString\(\)\}/);
  assert.match(marblePostsSource, /cache: "no-store"/);
  assert.match(marblePostsSource, /getFreshMarblePostByListLookup/);
  assert.match(marblePostsSource, /Marble direct post lookup failed; trying published posts list/);
  assert.match(marblePostsSource, /const listedPost = await getMarblePostByListLookup\(slug\)/);
  assert.match(marblePostsSource, /const freshListedPost = await getFreshMarblePostByListLookup\(slug\)/);
});

test("secondary pages mount roll-control hover and focus fallback", () => {
  assert.match(secondaryLayoutSource, /useEffect/);
  assert.match(secondaryLayoutSource, /rootRef/);
  assert.match(secondaryLayoutSource, /pointerover/);
  assert.match(secondaryLayoutSource, /focusin/);
  assert.match(secondaryLayoutSource, /classList\.add\("is-hovered"\)/);
  assert.match(secondaryLayoutSource, /removeEventListener\("pointerover"/);
  assert.match(secondaryLayoutSource, /removeEventListener\("focusout"/);
});
