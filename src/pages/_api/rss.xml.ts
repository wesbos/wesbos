import { getPosts } from '@/lib/getPosts';

const SITE_URL = 'https://wesbos.com';
const MAX_ITEMS = 50;

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
  const { posts } = await getPosts({ type: 'blog', limit: MAX_ITEMS });
  const dated = posts.filter((post) => post.frontmatter.date);

  const items = dated.map((post) => {
    const { title, slug, date, category } = post.frontmatter;
    const url = `${SITE_URL}/${slug}`;
    const lines = [
      `<title>${escapeXml(title)}</title>`,
      `<link>${url}</link>`,
      `<guid isPermaLink="true">${url}</guid>`,
      `<pubDate>${new Date(date).toUTCString()}</pubDate>`,
      ...(category || []).map((cat) => `<category>${escapeXml(cat)}</category>`),
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
