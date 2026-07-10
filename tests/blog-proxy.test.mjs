import test from "node:test";
import assert from "node:assert/strict";
import { getSafeCoverImageUrl, isIpAddress, isHostnameAllowed, isValidRevalidationPath } from "../lib/blog/cover-image.ts";

test("getSafeCoverImageUrl helper tests", () => {
  assert.equal(getSafeCoverImageUrl(null), "/images/blog/default-cover.svg");
  assert.equal(getSafeCoverImageUrl(""), "/images/blog/default-cover.svg");
  assert.equal(getSafeCoverImageUrl("invalid-url"), "/images/blog/default-cover.svg");
  assert.equal(getSafeCoverImageUrl("https://images.unsplash.com/photo-123"), "https://images.unsplash.com/photo-123");
  assert.equal(getSafeCoverImageUrl({ url: "https://images.pexels.com/photo-456" }), "https://images.pexels.com/photo-456");
  assert.equal(getSafeCoverImageUrl({ src: "https://cdn.pixabay.com/photo-789" }), "https://cdn.pixabay.com/photo-789");
  assert.equal(getSafeCoverImageUrl({ href: "https://upload.wikimedia.org/photo-012" }), "https://upload.wikimedia.org/photo-012");
  assert.equal(getSafeCoverImageUrl({ url: null }), "/images/blog/default-cover.svg");
});

test("isIpAddress helper tests", () => {
  assert.equal(isIpAddress("127.0.0.1"), true);
  assert.equal(isIpAddress("::1"), true);
  assert.equal(isIpAddress("images.unsplash.com"), false);
  assert.equal(isIpAddress("localhost"), false);
});

test("isHostnameAllowed helper tests", () => {
  assert.equal(isHostnameAllowed("images.pexels.com"), true);
  assert.equal(isHostnameAllowed("images.unsplash.com"), false);
  assert.equal(isHostnameAllowed("pexels.com"), false);
  assert.equal(isHostnameAllowed("google.com"), false);
});

test("isValidRevalidationPath helper tests", () => {
  assert.equal(isValidRevalidationPath("/blog"), true);
  assert.equal(isValidRevalidationPath("/blog/"), true);
  assert.equal(isValidRevalidationPath("/blog/some-slug"), true);
  assert.equal(isValidRevalidationPath("/sitemap.xml"), true);
  assert.equal(isValidRevalidationPath("/"), false);
  assert.equal(isValidRevalidationPath("/about"), false);
  assert.equal(isValidRevalidationPath("/api/revalidate"), false);
});
