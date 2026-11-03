import { getPosts } from '@/lib/getPosts';
import type { MDXResult } from '@/lib/types';

const SITE_URL = 'https://wesbos.com';

/**
 * Static routes, read from the page files at build time (the same glob Waku's router is built from,
 * so a new page shows up here without editing this list). Keys only: the modules are never loaded.
 * Skipped: dynamic `[param]` routes (posts, tips and notes are added from content below), `_`-prefixed
 * files (layouts, root, API routes, slices) and routes that aren't pages.
 */
const NOT_PAGES = new Set(['/404', '/og']);

const STATIC_PATHS = Object.keys(import.meta.glob('/src/pages/**/*.{tsx,ts}'))
  .map((file) =>
    file
      .replace(/^\/src\/pages/, '')
      .replace(/\.tsx?$/, '')
      .replace(/(^|\/)index$/, ''),
  )
  .map((path) => path || '/')
  .filter((path) => !path.split('/').some((segment) => segment.startsWith('_') || segment.includes('[')))
  .filter((path) => !NOT_PAGES.has(path))
  .toSorted();

type SitemapEntry = { path: string; lastmod?: string };

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toLastmod(date?: string) {
  if (!date) return undefined;
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString().slice(0, 10);
}

function newestDate(posts: MDXResult[]) {
  return posts.map((post) => toLastmod(post.frontmatter.date)).find(Boolean);
}

function toUrl({ path, lastmod }: SitemapEntry) {
  // The home page is the bare origin; everything else has no trailing slash since the site 301s those away
  const loc = path === '/' ? SITE_URL : `${SITE_URL}${encodeURI(path)}`;
  const lines = [`<loc>${escapeXml(loc)}</loc>`, ...(lastmod ? [`<lastmod>${lastmod}</lastmod>`] : [])];
  return `  <url>\n${lines.map((line) => `    ${line}`).join('\n')}\n  </url>`;
}

export async function GET() {
  const [{ posts: blogPosts }, { posts: tips }, { posts: notes }] = await Promise.all([
    getPosts({ type: 'blog', limit: -1 }),
    getPosts({ type: 'tip', limit: -1 }),
    getPosts({ type: 'javascript', limit: -1 }),
  ]);

  // getPosts sorts newest first, so the first dated post is the most recent
  const latestBlog = newestDate(blogPosts);
  const latestTip = newestDate(tips);
  const latest = [latestBlog, latestTip].filter(Boolean).toSorted().at(-1);
  const listingLastmod: Record<string, string | undefined> = { '/': latest, '/blog': latestBlog, '/tips': latestTip };

  const entries: SitemapEntry[] = [
    ...STATIC_PATHS.map((path) => ({ path, lastmod: listingLastmod[path] })),
    ...blogPosts.map((post) => ({ path: `/${post.frontmatter.slug}`, lastmod: toLastmod(post.frontmatter.date) })),
    ...tips.map((post) => ({ path: `/tip/${post.frontmatter.slug}`, lastmod: toLastmod(post.frontmatter.date) })),
    ...notes
      .toSorted(
        (a, b) =>
          a.frontmatter.sectionNumber - b.frontmatter.sectionNumber ||
          a.frontmatter.postNumber - b.frontmatter.postNumber,
      )
      .map((post) => ({ path: `/javascript/${post.frontmatter.slug}` })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(toUrl).join('\n')}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}

// Crawlers and validators often check with HEAD first
export const HEAD = GET;
