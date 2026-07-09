# Marble CMS Integration Setup Guide

This guide explains how to connect and configure **Marble CMS** as the primary headless content provider for the Huygen Studios blog system.

---

## 1. Environment Configurations

To enable Marble CMS, configure the following environment variables inside your deployment provider (such as Vercel) or your local `.env.local` file:

```env
# Primary API Key from your Marble workspace settings (Read-only Public key starts with mpk_)
MARBLE_API_KEY=mpk_dhhscGR89vKUO9HJLh8Xf1TW

# Custom secure string secret used to validate webhook cache-invalidation payloads
MARBLE_REVALIDATE_SECRET=your_custom_secure_secret_string

# Canonical production site URL
NEXT_PUBLIC_SITE_URL=https://www.huygenstudios.com
```

*Note: If `MARBLE_API_KEY` is missing or not configured, the blog will gracefully fall back to displaying the local pre-written articles inside `lib/blog/local-posts.ts` without failing the build.*

---

## 2. Setting Up Your Marble Workspace

1. **Access Workspace:** Log into your dashboard at [Marble CMS](https://marblecms.com) using your workspace ID:
   `cmqktdnak000004l4uwn2j7m0`
2. **Configure API Key:**
   - Go to **Settings** > **API Keys**.
   - Create or retrieve your public API read key (`mpk_dhhscGR89vKUO9HJLh8Xf1TW`).
3. **Define Categories & Tags:**
   - Create a category matching the theme (e.g., `AI Automation` or `Web Development`).
   - Create appropriate tags (e.g., `Voice Agents`, `Next.js`).
4. **Publish Your First Post:**
   - Write your title, description, content body (HTML), slug, and author profile details.
   - Set status to **Published**.

---

## 3. Configuring Webhook Cache Revalidation

To ensure that newly published or modified articles are immediately visible on the website without waiting for the default cache cycle (3600 seconds) to expire, configure a publishing webhook in Marble CMS:

1. **Go to Webhooks:** In the Marble CMS sidebar, select **Settings** > **Webhooks**.
2. **Add Endpoint:** Click **Create Webhook** and input the revalidation endpoint:
   ```text
   https://www.huygenstudios.com/api/revalidate?secret=YOUR_MARBLE_REVALIDATE_SECRET
   ```
   *(Replace `YOUR_MARBLE_REVALIDATE_SECRET` with the exact string matches configured in Vercel's env variable).*
3. **Configure Events:** Set the trigger event to **Post Published** and **Post Updated**.
4. **Test Webhook:** Fire a test event. The endpoint will return `{ "revalidated": true, "timestamp": ... }` upon verification.

---

## 4. Production Verification Checks

- **Crawlability Check:** Visit `https://www.huygenstudios.com/robots.txt` and verify that the sitemap is linked.
- **Sitemap Sync Check:** Visit `https://www.huygenstudios.com/sitemap.xml` and ensure that both static routes and dynamic Marble CMS post slug routes are correctly listed.
- **Review Verification:** Inspect `/blog` to verify that posts load from the CMS cleanly and inherit the premium dark theme.
