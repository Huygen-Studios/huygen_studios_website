# Homepage Hero Animation Browser Audit

This report details the audit of the homepage hero slide-up animations, focusing on rehydration flash (FOUC), clipping, and rendering inconsistencies between Google Chrome, Microsoft Edge, and Brave browsers.

## 1. Components Involved

* **Main Home Component:** [Web3Home.tsx](file:///g:/Huygen%20Studios/website/huygen_studios_website-main/components/web3/Web3Home.tsx) (Handles layout and GSAP timeline rendering)
* **Button/Link Wrapper Component:** [Button.tsx](file:///g:/Huygen%20Studios/website/huygen_studios_website-main/components/Button.tsx) (Handles text hover translation transitions)
* **Stylesheet:** [web3.css](file:///g:/Huygen%20Studios/website/huygen_studios_website-main/components/web3/web3.css) (Defines static sizes, overflows, and standard layout heights)

## 2. Current Animation Setup

* **Library:** GreenSock Animation Platform (GSAP) with `ScrollTrigger`.
* **Triggers:** Controlled via a React `useEffect` hook that registers `ScrollTrigger` and runs the intro timeline.
* **Target Elements:**
  * `.page` (overall container clip-path reveal)
  * `.hero-line span` (vertical translate-up offset for main H1 lines)
  * `.hero-summary, .hero-actions, .hero-index` (opacity and vertical offsets)

## 3. Root Cause Analysis

### A. The Reload Flicker / Flash of Un-animated Content (FOUC)
1. **Server Rendering (SSR):** Next.js pre-renders the page into static HTML. The hero text spans and description are sent to the client as fully visible and in their final layout positions.
2. **Initial Paint:** The browser receives the HTML and immediately paints the text. The user sees the fully styled page in its final state.
3. **Client JavaScript Load & Hydration:** After a brief delay (depending on network speed and script evaluation times), the client-side JavaScript loads, and React hydrates the page.
4. **GSAP Execution:** The `useEffect` hook runs, initiating the GSAP timelines. When GSAP compiles the `.fromTo()` call, it immediately applies inline styles setting the starting states:
   * `.hero-line span` -> `transform: translate3d(0, 110%, 0)` (hidden)
   * `.hero-summary` -> `opacity: 0; transform: translate3d(0, 22px, 0)` (hidden)
5. **Animation Start:** GSAP animates the properties back to their final positions.
* **Result:** The user sees the text, it disappears, and then it animates back in.

### B. Chrome vs. Edge and Brave Differences
* **Brave Shields (Ad/Tracker Blocker):** Brave Shields often defer or throttle non-critical script tags. Because GSAP and Lenis run in client scripts, Brave delays hydration, leaving the server-rendered visible text on screen for a much longer period (up to 1.5 seconds) before it suddenly disappears and animates.
* **Edge rendering priorities:** Microsoft Edge utilizes aggressive painting optimizations (Edge Sleeping Tabs / Startup Boost engines) that render and display the paint layer of raw HTML almost instantaneously before executing heavy script bundles. This exacerbates the visibility gap between the first paint and client JS execution.
* **Lack of CSS Safeguards:** Edge and Brave occasionally exhibit rendering artifacts or slight text clipping on elements wrapped in `overflow: hidden` during 3D hardware-accelerated transitions unless explicitly configured with standard CSS safeguards (like `backface-visibility: hidden` and `transform-style: preserve-3d`).

---

## 4. Recommended Code-Level Fixes

### 1. CSS-First Initial State
Apply initial hidden states using a CSS class `.js-enabled` attached to the `html` element. This class is added via a tiny inline script in the document `<head>` (blocking rendering before first paint):
* **Initial State CSS:**
  ```css
  html.js-enabled .hero-line span {
    transform: translateY(110%);
  }
  html.js-enabled .hero-summary,
  html.js-enabled .hero-actions,
  html.js-enabled .hero-index {
    opacity: 0;
    transform: translateY(22px);
  }
  ```
* **No-JS Fallback:** If JavaScript is disabled, the class is not added, and the browser displays the elements immediately without any transforms, ensuring crawlability and accessibility.

### 2. Isomorphic Layout Effect
Replace `useEffect` with `useIsomorphicLayoutEffect` (resolving to `useLayoutEffect` on the client) so that GSAP sets its starting values *before* the browser's paint cycle runs, avoiding any client-side layout shift.

### 3. Font and Layout Synchronization
Wrap the GSAP setup inside `document.fonts.ready` check to ensure the font metrics are stable before measuring line heights, preventing clipping on different browsers' font-rendering engines.

### 4. Hardware Acceleration Safeguards
Add `backface-visibility: hidden` and `transform-style: preserve-3d` to the animated spans to tell Chromium browsers to render the text on a separate GPU compositing layer, preventing text clipping and sub-pixel alignment shifts.
