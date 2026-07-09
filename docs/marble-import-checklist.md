# Marble CMS Content Import Checklist

Follow this workflow to copy and publish your Markdown article drafts inside the **Marble CMS** workspace.

---

## 1. Access Your Workspace

1. Log into your dashboard at [Marble CMS](https://marblecms.com) using your workspace identifier:
   `cmqktdnak000004l4uwn2j7m0`
2. Navigate to the **Posts** section in the main sidebar.

---

## 2. Creating a New Post

For each draft file inside `content/marble-import/`, follow these steps:

1. **Click "New Post":** Located at the top right of the posts catalog screen.
2. **Set the Title:** Paste the `title` defined in the frontmatter of your Markdown file.
3. **Configure the URL Slug:**
   - Go to **Post Settings** (gear icon).
   - Enter the exact `slug` from the draft frontmatter (e.g. `ai-voice-agent-missed-call-workflow`).
4. **Copy the Excerpt/Description:**
   - Copy the `description` field and paste it into the **Excerpt / Meta Description** field in settings.
5. **Paste Content Body:**
   - Select the main text editor area.
   - Switch the editor mode to **Markdown** (or paste direct Markdown text).
   - Paste the article body (everything below the frontmatter `---` separator).
6. **Set Category and Tags:**
   - In settings, select the correct **Category** matching the frontmatter metadata. If it doesn't exist, create it (e.g. `AI Automation` or `Web Development`).
   - Add the specified **Tags** to help organize your content.
7. **Assign Author:**
   - Assign the appropriate author profile (e.g. your representative or the default team author).

---

## 3. Webhook Cache Revalidation Verify

Before clicking publish, make sure the on-demand revalidation webhook is configured:

- **Verification URL:**
  ```text
  https://www.huygenstudios.com/api/revalidate?secret=YOUR_MARBLE_REVALIDATE_SECRET
  ```
- **Events Selected:** `Post Published` and `Post Updated`.

---

## 4. Publishing & Final Verification

1. **Publish Post:** Toggle the status from **Draft** to **Published** and click **Save**.
2. **Check the Webhook:** Verify that the webhook triggered successfully. The revalidation route should return a success payload:
   ```json
   { "revalidated": true, "revalidatedSlug": "...", "timestamp": 1783612581 }
   ```
3. **Inspect the Site:** Visit the live URL to verify that the page renders correctly with the custom styles and layout:
   `https://www.huygenstudios.com/blog/YOUR_POST_SLUG`
