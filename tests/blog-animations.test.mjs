import assert from "node:assert/strict";
import { test } from "node:test";
import { chromium } from "playwright";

const baseUrl = process.env.BLOG_TEST_URL || "http://127.0.0.1:3000";
const chromePath = process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function withPage(reducedMotion, callback) {
  const browser = await chromium.launch({ headless: true, executablePath: chromePath });
  const context = await browser.newContext({
    reducedMotion,
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));

  try {
    await callback(page, consoleErrors);
  } finally {
    await browser.close();
  }
}

async function transforms(locator) {
  return locator.evaluate((element) => {
    const get = (selector) => {
      const node = selector ? element.querySelector(selector) : element;
      if (!node) return null;
      const style = getComputedStyle(node);
      return { transform: style.transform, opacity: style.opacity };
    };

    return {
      root: get(null),
      visual: get(".blog-card-visual"),
      image: get(".blog-card-image"),
      title: get(".blog-card-title"),
      arrow: get(".blog-card-arrow"),
      border: get(".blog-card-border"),
    };
  });
}

function changed(before, after, key) {
  return before[key]?.transform !== after[key]?.transform || before[key]?.opacity !== after[key]?.opacity;
}

function isRestingTransform(value) {
  if (!value || value === "none") return true;
  const values = value.match(/matrix\(([^)]+)\)/)?.[1].split(",").map(Number);
  return Boolean(values && Math.abs(values[0] - 1) < 0.01 && Math.abs(values[1]) < 0.01 && Math.abs(values[2]) < 0.01 && Math.abs(values[3] - 1) < 0.01 && Math.abs(values[4]) < 0.5 && Math.abs(values[5]) < 0.5);
}

test("blog heading and supporting copy reveal visibly", { concurrency: false }, async () => {
  await withPage("no-preference", async (page, consoleErrors) => {
    await page.goto(`${baseUrl}/blog`, { waitUntil: "domcontentloaded" });
    const words = page.locator('h1[aria-label="Ideas on AI automation, voice agents, and digital growth"] span[aria-hidden="true"] > span > span');
    assert.equal(await words.count(), 9);
    let during;
    for (let attempt = 0; attempt < 16; attempt += 1) {
      await page.waitForTimeout(100);
      during = await words.first().evaluate((element) => ({
        transform: getComputedStyle(element).transform,
        opacity: getComputedStyle(element).opacity,
      }));
      if (!isRestingTransform(during.transform)) break;
    }
    await page.waitForTimeout(1400);
    const final = await words.first().evaluate((element) => ({
      transform: getComputedStyle(element).transform,
      opacity: getComputedStyle(element).opacity,
    }));
    assert.equal(isRestingTransform(during.transform), false);
    assert.equal(isRestingTransform(final.transform), true);
    assert.equal(final.opacity, "1");
    assert.equal(await page.locator(".blog-supporting-copy").isVisible(), true);
    assert.deepEqual(consoleErrors, []);
  });
});

test("blog card hover changes visual, title, and border, then reverses and navigates", { concurrency: false }, async () => {
  await withPage("no-preference", async (page, consoleErrors) => {
    await page.goto(`${baseUrl}/blog`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);
    const card = page.locator("[data-animated-blog-card]").first();
    assert.equal(await page.locator("[data-animated-blog-card]").count() > 0, true);
    const before = await transforms(card);
    await card.hover();
    let hovered;
    let changedTargets = 0;
    for (let attempt = 0; attempt < 10; attempt += 1) {
      await page.waitForTimeout(150);
      hovered = await transforms(card);
      changedTargets = ["visual", "image", "title", "arrow", "border"].filter((key) => changed(before, hovered, key)).length;
      if (changedTargets >= 2) break;
    }
    assert.equal(changedTargets >= 2, true);
    await page.mouse.move(4, 4);
    await page.waitForTimeout(700);
    const after = await transforms(card);
    assert.equal(isRestingTransform(after.visual.transform), true);
    assert.equal(isRestingTransform(after.title.transform), true);
    await card.click();
    await page.waitForURL(/\/blog\/.+/);
    await page.waitForLoadState("domcontentloaded");
    assert.match(new URL(page.url()).pathname, /^\/blog\//);
    assert.equal(await page.locator("h1").count() > 0, true);
    assert.deepEqual(consoleErrors, []);
  });
});

test("CTA hover and keyboard focus move the root, fill, label, and arrow", { concurrency: false }, async () => {
  await withPage("no-preference", async (page, consoleErrors) => {
    await page.goto(`${baseUrl}/blog`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);
    const cta = page.locator(".animated-cta");
    const fill = cta.locator('span[aria-hidden="true"]');
    const label = cta.locator(".animated-cta-label");
    const arrow = cta.locator("svg");
    const before = await transforms(cta);
    await cta.hover();
    let hovered;
    let fillTransform = "matrix(0, 0, 0, 1, 0, 0)";
    for (let attempt = 0; attempt < 10; attempt += 1) {
      await page.waitForTimeout(150);
      hovered = await transforms(cta);
      fillTransform = await fill.evaluate((element) => getComputedStyle(element).transform);
      if (fillTransform !== "matrix(0, 0, 0, 1, 0, 0)" && hovered.root.transform !== before.root.transform) break;
    }
    assert.notEqual(fillTransform, "matrix(0, 0, 0, 1, 0, 0)");
    assert.notEqual((await label.evaluate((element) => getComputedStyle(element).transform)), before.root.transform);
    assert.notEqual((await arrow.evaluate((element) => getComputedStyle(element).transform)), before.arrow?.transform);
    assert.notEqual(hovered.root.transform, before.root.transform);
    await page.mouse.move(4, 4);
    await page.waitForTimeout(550);
    const after = await transforms(cta);
    assert.equal(isRestingTransform(after.root.transform), true);
    await cta.focus();
    await page.waitForTimeout(350);
    const focused = await transforms(cta);
    assert.notEqual(focused.root.transform, before.root.transform);
    assert.deepEqual(consoleErrors, []);
  });
});

test("reduced motion keeps content visible and links functional", { concurrency: false }, async () => {
  await withPage("reduce", async (page, consoleErrors) => {
    await page.goto(`${baseUrl}/blog`, { waitUntil: "networkidle" });
    const state = await page.locator("body").evaluate(() => ({
      headingOpacity: getComputedStyle(document.querySelector("h1")).opacity,
      hiddenWords: Array.from(document.querySelectorAll("h1[aria-label] span[aria-hidden='true'] > span > span")).filter((element) => getComputedStyle(element).opacity === "0").length,
      cards: Array.from(document.querySelectorAll("[data-animated-blog-card]")).filter((element) => getComputedStyle(element).opacity === "0").length,
      ctaPointerEvents: getComputedStyle(document.querySelector(".animated-cta")).pointerEvents,
    }));
    assert.equal(state.headingOpacity, "1");
    assert.equal(state.hiddenWords, 0);
    assert.equal(state.cards, 0);
    assert.equal(state.ctaPointerEvents, "auto");
    assert.deepEqual(consoleErrors, []);
  });
});

test("GSAP animations initialize again after client-side navigation", { concurrency: false }, async () => {
  await withPage("no-preference", async (page, consoleErrors) => {
    await page.goto(`${baseUrl}/blog`, { waitUntil: "networkidle" });
    await page.locator('header a[href="/services"]').click();
    await page.waitForURL(`${baseUrl}/services`);
    await page.locator('header a[href="/blog"]').click();
    await page.waitForURL(`${baseUrl}/blog`);
    await page.waitForTimeout(500);
    assert.equal(await page.locator("[data-animated-blog-card]").count() > 0, true);
    assert.equal(await page.locator("h1[aria-label]").count(), 1);
    assert.deepEqual(consoleErrors, []);
  });
});
