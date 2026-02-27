---
name: tip
description: Create a new Hot Tip for wesbos.com
---

# tip

## When to use

When the user asks to create a new tip or edit an existing one. Tips are short-form Hot Tips originally posted to social media (X/Twitter, LinkedIn, TikTok, Instagram, Threads, Bluesky, YouTube Shorts, Reddit, Facebook). The input may be as little as a single social media link.

## Creating a new tip

### 1. Gather the content

- The user will provide the tip text and/or a link to a social media post. They may also accompany a description and/or some code samples.
- **Use `fetchSocial.ts`** to pull post data from a social media URL. It reuses the project's fetchers (`src/lib/socials/`) without needing the app's DB or Cloudflare worker. Run it with:
  ```
  pnpm fetch-social <url>
  ```
  It outputs JSON to stdout (status messages go to stderr). Supports: tiktok, twitter (needs `X_BEARER_TOKEN` env var), linkedin, instagram, bluesky. Key fields vary by platform — look for `desc`/`full_text`/`headline` for the post text and `createTime`/`createdAt`/`datePublished` for the date.
- If `fetchSocial.ts` returns no data (some platforms block server-side fetches for certain posts), fall back to the **browser MCP**: navigate to the URL, wait for load, snapshot/screenshot to read the content.
- Tips are short — typically a few lines of text, sometimes with code snippets, screenshots, or video.
- The tip body usually starts with a 🔥 emoji.

### 2. Create the file

New tips should be **standalone `.mdx` files** in `src/content/tips/`:

```
src/content/tips/<slug>.mdx
```

If the tip has local image or video assets, create a **folder** instead:

```
src/content/tips/<slug>/
  <slug>.mdx
  image1.webp
  video.mp4
```

Use kebab-case for the slug. Keep it concise and descriptive.

### 3. Frontmatter format

```yaml
---
tags:
  - js
  - css
date: 2024-11-29T15:44:16.000Z
slug: my-tip-slug
links:
  - https://x.com/wesbos/status/123456
  - https://www.linkedin.com/posts/wesbos_...
  - https://www.tiktok.com/@wesbos/video/123456
  - https://www.instagram.com/reel/ABC123/
  - https://www.threads.com/@wesbos/post/ABC123
  - https://bsky.app/profile/wesbos.com/post/abc123
  - https://www.youtube.com/shorts/abc123
---
```

**Required fields:**
- `tags` — array of lowercase tags. Common tags: `css`, `js`, `tools`, `html`, `npm`, `vscode`, `git`, `react`, `ts`, `frameworks`, `ai`, `http`
- `date` — ISO 8601 format. Use the original post date if available, otherwise the current date
- `slug` — kebab-case, must match the filename (without `.mdx`)

**Optional fields:**
- `links` — array of URLs where the tip was posted on social media

### 4. Find social media links

Search the web for the tip across these platforms (use the user's handles):

| Platform   | Handle / Profile URL                              |
|------------|---------------------------------------------------|
| X/Twitter  | `https://x.com/wesbos`                            |
| LinkedIn   | `https://www.linkedin.com/in/wesbos`              |
| TikTok     | `https://www.tiktok.com/@wesbos`                  |
| Instagram  | `https://www.instagram.com/wesbos`                |
| Threads    | `https://www.threads.com/@wesbos`                 |
| Bluesky    | `https://bsky.app/profile/wesbos.com`             |
| YouTube    | `https://www.youtube.com/@WesBos` (Shorts)        |
| Reddit     | `https://www.reddit.com/user/wesbos`              |
| Facebook   | `https://www.facebook.com/wesbos.developer`       |

Search strategy: take a distinctive phrase from the tip and search for it along with `site:x.com wesbos`, `site:linkedin.com wesbos`, etc. Add every URL found to the `links` array. Note that very recent posts (within a few days) may not be indexed by search engines yet — inform the user so they can add links later.

The supported social link types in the codebase are defined in `src/utils/parseSocialLinks.ts`: twitter, instagram, tiktok, youtube, linkedin, threads, bluesky. Links to other platforms (reddit, facebook) can still be included but won't get rich embeds.

### 5. Body content

- Keep it short and punchy — these are social media posts, not blog articles
- Code snippets use fenced code blocks with language tags. Do not include code unless you are provided with it.
- DO NOT HALLUCINATE CODE
- Reference images by filename only: `![alt text](image.webp)`
- No title frontmatter needed — the first line of body text serves as the title

### 6. After creating or editing a tip

- **Run `pnpm content-index`** — this regenerates `src/content/index.ts`. The tip won't appear on the site without this.
- Unless already running, start the dev server with `pnpm dev`
