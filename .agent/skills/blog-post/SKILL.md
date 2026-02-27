---
name: blog-post
description: Create or edit a blog post for wesbos.com
---

# blog-post

## When to use

When the user asks to create a new blog post or edit an existing one.

## Creating a new post

### 1. Create the post directory and file

- Posts live in `src/content/posts/<post-folder-name>/`
- Each post gets its own directory containing the `.mdx` file and any image assets
- The MDX filename should match the directory name
- Use kebab-case for the directory name

### 2. Frontmatter format

```yaml
---
title: "Post Title"
slug: post-slug-kebab-case
category:
  - Category Name
date: YYYY-MM-DDTHH:MM:SS
image: featured-image-filename.png
---
```

- `title`: The post title. Wrap in quotes if it contains special characters like colons or exclamation marks
- `slug`: kebab-case URL slug
- `image`: filename only, no path prefix (the image lives in the same directory)
- `category`: an array. Pick from existing categories unless adding a new category makes snese:
  - CSS
  - JavaScript
  - NodeJS
  - HTML5
  - Workflow + Tooling
  - Business
  - Other
- `date`: ISO 8601 format. Use the current date/time

### 3. Images

- Place image files in the same directory as the `.mdx` file
- Reference by filename only: `![alt text](image-name.png)`
- User may supply images to use.
- User screenshots if not supplied are typically in `/Users/wesbos/Screenshots/` — filenames contain non-breaking spaces, so use globs (`*`) instead of quoted paths when copying. Rename files from their typical screenshot format to something meaningful - use AI to describe the image.
- Preferred format: `.webp`, but `.png` and `.jpg` also work

### 4. Writing style

Follow the **wes-bos-writing-style** skill (`.agent/skills/wes-bos-writing-style/SKILL.md`) for voice, tone, and structure.

### 5. After creating or editing a post

- **Always run `pnpm content-index`** — this regenerates `src/content/index.ts` with imports for all posts. The post won't show up on the site without this step.
- Unless specified or already running, start the local server with `pnpm dev`
