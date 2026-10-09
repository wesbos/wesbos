import { parseHTML } from 'linkedom';

export const CANONICAL_ORIGIN = 'https://wesbos.com';

export type SitemapUrl = {
  path: string;
  lastmod?: string;
};

export function buildSitemapXml(urls: SitemapUrl[]): string {
  const entries = urls
    .map(({ path, lastmod }) => {
      const canonicalUrl = `${CANONICAL_ORIGIN}${path}`;
      const lastModifiedTag = lastmod ? `<lastmod>${escapeXml(lastmod)}</lastmod>` : '';
      return `<url><loc>${escapeXml(canonicalUrl)}</loc>${lastModifiedTag}</url>`;
    })
    .join('');

  return (
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`
  );
}

export function htmlToMarkdown(html: string): string {
  const { document } = parseHTML(html);
  const title = document.querySelector('title')?.textContent?.trim();
  const bodyText = document.body?.textContent?.replace(/\s+/g, ' ').trim();

  const lines: string[] = [];
  if (title) {
    lines.push(`# ${title}`);
  }
  if (bodyText) {
    if (lines.length > 0) {
      lines.push('');
    }
    lines.push(bodyText);
  }

  return `${lines.join('\n')}\n`;
}

export function appendVary(headers: Headers, value: string): void {
  const current = headers.get('Vary');
  if (!current) {
    headers.set('Vary', value);
    return;
  }

  const values = current.split(',').map((item) => item.trim().toLowerCase());
  if (!values.includes(value.toLowerCase())) {
    headers.set('Vary', `${current}, ${value}`);
  }
}

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}
