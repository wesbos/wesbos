import { getPosts } from '@/lib/getPosts';
import { slugToTitle } from '@/utils/slugToTitle';

const SITE_URL = 'https://wesbos.com';
const MAX_ITEMS = 200;

function escapeXml(value: string) {
  return (
    value
      // Control characters aren't legal in XML 1.0, even when escaped
      // biome-ignore lint/suspicious/noControlCharactersInRegex: stripping them is the point
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
  );
}

export async function GET() {
  const [{ posts: blogPosts }, { posts: tips }] = await Promise.all([
    getPosts({ type: 'blog', limit: MAX_ITEMS }),
    getPosts({ type: 'tip', limit: MAX_ITEMS }),
  ]);
  const dated = [...blogPosts, ...tips]
    .filter((post) => post.frontmatter.date)
    .toSorted((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
    .slice(0, MAX_ITEMS);

  const items = dated.map((post) => {
    const { slug, date, category, tags, type } = post.frontmatter;
    const isTip = type === 'tip';
    // Tips don't have a title in their frontmatter, so it comes from the slug
    const title = isTip ? slugToTitle(`tip/${slug}`) : post.frontmatter.title;
    const url = `${SITE_URL}/${isTip ? 'tip/' : ''}${slug}`;
    const lines = [
      `<title>${escapeXml(title)}</title>`,
      `<link>${url}</link>`,
      `<guid isPermaLink="true">${url}</guid>`,
      `<pubDate>${new Date(date).toUTCString()}</pubDate>`,
      // An empty `- ` list item in frontmatter parses as null
      ...(category || tags || []).filter(Boolean).map((cat) => `<category>${escapeXml(cat)}</category>`),
      ...(post.excerpt ? [`<description>${escapeXml(post.excerpt)}</description>`] : []),
    ];
    return `    <item>\n${lines.map((line) => `      ${line}`).join('\n')}\n    </item>`;
  });

  const latest = dated[0]?.frontmatter.date;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Wes Bos</title>
    <link>${SITE_URL}</link>
    <description>Web development tutorials and thoughts from Wes Bos</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />${
      latest ? `\n    <lastBuildDate>${new Date(latest).toUTCString()}</lastBuildDate>` : ''
    }
${items.join('\n')}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}

// Feed readers and validators often check with HEAD first
export const HEAD = GET;
