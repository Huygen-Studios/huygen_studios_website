# AdSense Re-Review Checklist

> Last updated: 2026-07-09  
> AdSense Publisher ID: `ca-pub-1790543418739606`  
> Site: `https://www.huygenstudios.com`

Use this checklist before submitting or re-submitting the site for Google AdSense review.
Complete every item before requesting a re-review. Incomplete sites are rejected faster than they are reviewed.

---

## 1. Content Quality

### Minimum Article Threshold
AdSense requires substantial original content. Target **at least 12 published articles** before re-applying.

| # | Article Slug | Status | Word Count |
|---|---|---|---|
| 1 | `ai-voice-agent-missed-call-workflow` | ☐ Published in Marble | 1,500+ |
| 2 | `whatsapp-lead-qualification-flow` | ☐ Published in Marble | 1,500+ |
| 3 | `gohighlevel-automation-architecture` | ☐ Published in Marble | 1,500+ |
| 4 | `ai-receptionist-vs-human-receptionist` | ☐ Published in Marble | 1,500+ |
| 5 | `missed-call-recovery-system` | ☐ Published in Marble | 1,500+ |
| 6 | `cinematic-website-conversion-framework` | ☐ Published in Marble | 1,500+ |
| 7 | `crm-pipeline-for-local-service-businesses` | ☐ Published in Marble | 1,500+ |
| 8 | `ai-voice-agent-appointment-booking-script` | ☐ Published in Marble | 1,500+ |
| 9 | `seo-for-ai-search-business-websites` | ☐ Published in Marble | 1,500+ |
| 10 | `what-to-automate-first-in-a-small-business` | ☐ Published in Marble | 1,500+ |
| 11 | `website-redesign-checklist-for-service-businesses` | ☐ Published in Marble | 1,500+ |
| 12 | `automation-roi-calculator-for-small-businesses` | ☐ Published in Marble | 1,500+ |

### Article Quality Rules
- [ ] Each article is at least **1,200 words** of original writing
- [ ] No AI-generated filler paragraphs or keyword repetition
- [ ] Each article has: H1, at least 3 H2s, practical examples, and a conclusion
- [ ] No duplicate content between articles
- [ ] No scraped or copied content from other sites
- [ ] Internal links to relevant service pages included in each article

---

## 2. Core Page Completeness

### Required Pages
- [ ] `/` — Homepage: H1 present, meaningful copy, no blank sections
- [ ] `/about` — Who the studio is, what it does, how it operates
- [ ] `/services` — All 5 service categories with links to sub-pages
- [ ] `/services/ai-voice-agents` — Full service page with FAQ, CTA
- [ ] `/services/whatsapp-automation` — Full service page with FAQ, CTA
- [ ] `/services/ai-automation` — Full service page with FAQ, CTA
- [ ] `/services/cinematic-websites` — Full service page with FAQ, CTA
- [ ] `/services/gohighlevel-automation` — Full service page with FAQ, CTA
- [ ] `/pricing` — Clear pricing or engagement model
- [ ] `/faq` — At least 8 substantive questions answered
- [ ] `/contact` — Working contact method (email or form)
- [ ] `/blog` — Post list with at least 6 articles
- [ ] `/blog/[slug]` — Full article pages with author, date, reading time

### No Placeholder Text
- [ ] No "Lorem ipsum" or placeholder copy anywhere on the site
- [ ] No "Coming soon" sections on indexed pages
- [ ] No empty service cards, empty FAQs, or TBD sections
- [ ] All navigation links go to real, working pages

---

## 3. Legal & Policy Pages

- [ ] `/privacy-policy` — Comprehensive, includes data collection, cookies, third-party analytics
- [ ] `/terms` — Terms of service with jurisdiction, dispute resolution
- [ ] `/cookie-policy` — Types of cookies used, how to opt out
- [ ] Privacy Policy explicitly mentions Google AdSense / third-party advertising cookies
- [ ] Privacy Policy mentions Google Analytics if GA is enabled

---

## 4. Navigation & Footer Integrity

- [ ] All header nav links resolve to real pages (no 404s)
- [ ] Footer legal links work: Privacy Policy, Terms, Cookie Policy
- [ ] Footer contact email is valid (`hello@huygenstudios.com`)
- [ ] No broken internal links across homepage, blog, and service pages
- [ ] `/creatives` is either noindexed or has substantial crawlable content

---

## 5. Crawlability & Indexation

### robots.txt
- [ ] `https://www.huygenstudios.com/robots.txt` is accessible
- [ ] No `Disallow: /` blocking Googlebot
- [ ] `Sitemap: https://www.huygenstudios.com/sitemap.xml` is present
- [ ] `/ads.txt` is not blocked

### sitemap.xml
- [ ] `https://www.huygenstudios.com/sitemap.xml` is accessible and valid XML
- [ ] All core pages listed with correct `<loc>` URLs
- [ ] All published blog posts listed
- [ ] `<lastmod>` dates are accurate

### ads.txt
- [ ] `https://www.huygenstudios.com/ads.txt` is accessible (HTTP 200)
- [ ] Contains exactly: `google.com, pub-1790543418739606, DIRECT, f08c47fec0942fa0`
- [ ] No extra lines that could conflict

### Google Search Console
- [ ] Site is verified in Google Search Console
- [ ] Sitemap submitted and indexed without errors
- [ ] At least the homepage, /about, /services, /blog, /contact are indexed
- [ ] No manual actions or security issues reported

---

## 6. AdSense Technical Requirements

- [ ] `<meta name="google-adsense-account" content="ca-pub-1790543418739606">` is in `<head>` (set in `app/layout.tsx`)
- [ ] AdSense auto-ads script is either:
  - Added via the AdSense dashboard (recommended for auto-ads), or
  - Manually placed via `<Script>` tag in `app/layout.tsx` with `strategy="afterInteractive"`
- [ ] Site loads over HTTPS with a valid SSL certificate
- [ ] No mixed-content HTTP resources on HTTPS pages

---

## 7. Mobile UX

- [ ] Homepage is readable and functional on 375px viewport
- [ ] Blog articles are readable on mobile with appropriate font size (minimum 16px body)
- [ ] Navigation is accessible on mobile (mobile menu works)
- [ ] No horizontal scroll on any core page
- [ ] Tap targets (buttons, links) are at least 44×44px
- [ ] CTA buttons visible above the fold on mobile

---

## 8. Content & Ethics Rules

These are hard requirements — violation leads to rejection or account termination:

- [ ] No fake client logos or testimonials
- [ ] No invented revenue figures, case study metrics, or "guaranteed results" claims
- [ ] No adult content, gambling, drug references, or hate speech anywhere on the site
- [ ] No scraped, AI-generated spam content
- [ ] No content designed to game AdSense (thin pages, fake traffic loops)
- [ ] All blog articles are useful, original, and written for humans not bots

---

## 9. Final Pre-Submission Checklist

Run through this immediately before clicking "Submit for Review":

```
[ ] npm run build — passes with 0 errors
[ ] All 12+ articles published in Marble CMS
[ ] robots.txt, sitemap.xml, ads.txt all return HTTP 200
[ ] Homepage, /about, /services, /blog all indexed in Search Console
[ ] No 404 errors in Vercel deployment logs
[ ] Privacy Policy mentions Google advertising cookies
[ ] Mobile UX tested in Chrome DevTools (iPhone SE, Pixel 5)
[ ] PageSpeed score for / >= 75 on mobile
[ ] No broken links (use a tool like Screaming Frog or broken-link-checker)
[ ] /creatives is noindexed (confirmed via view-source)
```

---

## 10. Post-Approval

Once AdSense approves the account:

- [ ] Enable auto-ads from the AdSense dashboard (recommended)
- [ ] If placing manual ad units: add them to blog post templates only — not legal pages
- [ ] Do NOT place ads on `/privacy-policy`, `/terms`, `/cookie-policy`
- [ ] Monitor AdSense dashboard for invalid traffic warnings in first 30 days
- [ ] Update Cookie Policy to reflect live ad serving
