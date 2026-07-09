# Vercel Production Deployment Checklist

> Last updated: 2026-07-09  
> Project: Huygen Studios — `huygen_studios_website`  
> Canonical domain: `https://www.huygenstudios.com`

---

## 1. Vercel Project Settings

### Build & Output

These match `vercel.json` — Vercel reads them automatically. Confirm in **Project Settings → General**:

| Setting | Value |
|---|---|
| Framework Preset | **Next.js** |
| Install Command | `npm ci` |
| Build Command | `npm run build` |
| Output Directory | `.next` |
| Root Directory | *(leave blank — root of repo)* |
| Node.js Version | **20.x** (recommended for Next.js 16) |

---

## 2. Required Environment Variables

Add in **Project Settings → Environment Variables**. Scope to **Production** (and Preview/Development as needed).

### Critical — app behaves incorrectly without these

| Variable | Example Value | Scope | Notes |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://www.huygenstudios.com` | All | Used for canonical URL generation |
| `MARBLE_API_KEY` | `mb_live_xxxxxxxxxxxx` | Production | Server-only. Never use `NEXT_PUBLIC_`. Enables live Marble CMS blog posts. |
| `MARBLE_REVALIDATE_SECRET` | *(random 32-char string)* | Production | Validates `/api/revalidate` webhook calls from Marble CMS. |

### Analytics & SEO — optional but recommended

| Variable | Example Value | Scope | Notes |
|---|---|---|---|
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | Production | Google Analytics 4 Measurement ID. Leave blank to disable GA. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | `abc123def456...` | Production | From Google Search Console HTML tag verification. |

> **Security rule:** Variables starting with `NEXT_PUBLIC_` are embedded in the client bundle. Never put `MARBLE_API_KEY` or any secret under `NEXT_PUBLIC_`.

---

## 3. Domain Configuration

### Primary Domain

| Setting | Value |
|---|---|
| Primary domain | `www.huygenstudios.com` |
| Redirect | `huygenstudios.com` → `https://www.huygenstudios.com` (308 permanent) |

**Steps in Vercel:**
1. Go to **Project → Domains**
2. Add `www.huygenstudios.com` — set as **Primary**
3. Add `huygenstudios.com` — set to **Redirect to** `www.huygenstudios.com`

### DNS Records (set at registrar or DNS provider)

```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

> **Cloudflare users:** Set records to **DNS only** (grey cloud), not proxied, to avoid caching conflicts with Vercel's edge network.

### WWW Canonical Setup

Canonical URLs are hardcoded to `https://www.huygenstudios.com` in:
- `app/layout.tsx` → `metadataBase: new URL("https://www.huygenstudios.com")`
- Each page's `alternates.canonical`
- `app/sitemap.ts` → `const baseUrl = "https://www.huygenstudios.com"`

No additional code changes needed — Vercel's www redirect handles the non-www case.

---

## 4. Cache & Revalidation

| Route | Type | Strategy |
|---|---|---|
| `/` | Static | Rebuilt on each deployment |
| `/blog/[slug]` | SSG | `revalidate = 3600` in `lib/marble/posts.ts` |
| `/api/revalidate` | Dynamic (server) | Triggered by Marble CMS webhook |
| `/sitemap.xml` | Static | Rebuilt on each deployment |
| `/robots.txt` | Static | Rebuilt on each deployment |

### Marble CMS Webhook Setup

Once `MARBLE_API_KEY` is live, configure Marble's webhook:

```
URL:    https://www.huygenstudios.com/api/revalidate
Method: POST
Header: x-revalidate-secret: <your MARBLE_REVALIDATE_SECRET value>
Trigger: on post publish / update
```

---

## 5. Post-Deployment Verification URLs

After every production deployment, manually verify these:

### Core Pages
- [ ] `https://www.huygenstudios.com/` — Homepage loads, H1 visible, no blank flash
- [ ] `https://www.huygenstudios.com/about`
- [ ] `https://www.huygenstudios.com/services` — All 5 service cards link correctly
- [ ] `https://www.huygenstudios.com/services/ai-voice-agents`
- [ ] `https://www.huygenstudios.com/services/whatsapp-automation`
- [ ] `https://www.huygenstudios.com/services/ai-automation`
- [ ] `https://www.huygenstudios.com/services/cinematic-websites`
- [ ] `https://www.huygenstudios.com/services/gohighlevel-automation`
- [ ] `https://www.huygenstudios.com/pricing`
- [ ] `https://www.huygenstudios.com/faq`
- [ ] `https://www.huygenstudios.com/contact`
- [ ] `https://www.huygenstudios.com/blog`
- [ ] `https://www.huygenstudios.com/blog/ai-voice-agent-missed-call-workflow`

### Legal Pages
- [ ] `https://www.huygenstudios.com/privacy-policy`
- [ ] `https://www.huygenstudios.com/terms`
- [ ] `https://www.huygenstudios.com/cookie-policy`

### Crawlability Files
- [ ] `https://www.huygenstudios.com/robots.txt` — must contain `Sitemap:` line, no `Disallow: /`
- [ ] `https://www.huygenstudios.com/sitemap.xml` — must list all pages and blog slugs
- [ ] `https://www.huygenstudios.com/ads.txt` — must return: `google.com, pub-1790543418739606, DIRECT, f08c47fec0942fa0`

### Redirect Checks
- [ ] `http://huygenstudios.com/` → `https://www.huygenstudios.com/` (301)
- [ ] `https://huygenstudios.com/` → `https://www.huygenstudios.com/` (301)
- [ ] `/terms-of-service` → `/terms` (301)
- [ ] `/policy` → `/privacy-policy` (301)

### Meta & Structured Data
- [ ] View source of `/` — confirm `<h1>` text is in HTML (not blank)
- [ ] View source of `/creatives` — confirm `<meta name="robots" content="noindex, nofollow">`
- [ ] [Rich Results Test](https://search.google.com/test/rich-results) on `/` — Organization schema valid
- [ ] [Rich Results Test](https://search.google.com/test/rich-results) on any `/blog/[slug]` — BlogPosting schema valid

---

## 6. Performance Checks

Run [PageSpeed Insights](https://pagespeed.web.dev/) on:
- `https://www.huygenstudios.com/` — target LCP < 2.5s, CLS < 0.1
- `https://www.huygenstudios.com/blog/[slug]` — lightweight server component, should score 90+

---

## 7. Vercel CLI Reference

```bash
# Install Vercel CLI globally (once)
npm i -g vercel

# Link project (first time)
vercel link

# Deploy to production manually
vercel --prod

# Pull env vars for local testing
vercel env pull .env.local
```

> **Recommended:** Connect the GitHub repo to Vercel for automatic deployments on every `git push main`.
