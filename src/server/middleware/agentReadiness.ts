import type { MiddlewareHandler } from 'hono';
import { getPosts } from '@/lib/getPosts';
import { appendVary, buildSitemapXml, htmlToMarkdown, type SitemapUrl } from '../agentReadiness';

const HOMEPAGE_LINK_HEADER = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</docs/api>; rel="service-doc"',
  '</.well-known/agent-skills/index.json>; rel="describedby"',
].join(', ');

const STATIC_PATHS = [
  '/',
  '/about',
  '/blog',
  '/contact',
  '/courses',
  '/docs/api',
  '/javascript',
  '/privacy',
  '/speaking-and-training',
  '/terms',
  '/tips',
] as const;

const API_CATALOG = {
  linkset: [
    {
      anchor: 'https://wesbos.com',
      'service-desc': [{ href: 'https://wesbos.com/openapi.json', type: 'application/openapi+json' }],
      'service-doc': [{ href: 'https://wesbos.com/docs/api', type: 'text/html' }],
      status: [{ href: 'https://wesbos.com/healthz', type: 'application/json' }],
    },
  ],
};

const OPENID_CONFIGURATION = {
  issuer: 'https://wesbos.com',
  authorization_endpoint: 'https://wesbos.com/oauth/authorize',
  token_endpoint: 'https://wesbos.com/oauth/token',
  jwks_uri: 'https://wesbos.com/.well-known/jwks.json',
  grant_types_supported: ['authorization_code', 'client_credentials', 'refresh_token'],
  response_types_supported: ['code'],
  subject_types_supported: ['public'],
  id_token_signing_alg_values_supported: ['RS256'],
};

const OAUTH_PROTECTED_RESOURCE = {
  resource: 'https://wesbos.com',
  authorization_servers: ['https://wesbos.com'],
  scopes_supported: ['read:content'],
};

export function agentReadinessMiddleware(): MiddlewareHandler {
  return async (c, next) => {
    if (c.req.method === 'GET') {
      const url = new URL(c.req.url);
      if (url.pathname === '/sitemap.xml') {
        const sitemapXml = await createSitemapXml();
        return new Response(sitemapXml, {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'max-age=600',
          },
        });
      }

      if (url.pathname === '/healthz') {
        return new Response(JSON.stringify({ status: 'ok' }), {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'no-store',
          },
        });
      }

      if (url.pathname === '/.well-known/api-catalog') {
        return new Response(JSON.stringify(API_CATALOG), {
          headers: {
            'Content-Type': 'application/linkset+json; charset=utf-8',
            'Cache-Control': 'max-age=3600',
          },
        });
      }

      if (url.pathname === '/.well-known/openid-configuration') {
        return new Response(JSON.stringify(OPENID_CONFIGURATION), {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'max-age=3600',
          },
        });
      }

      if (url.pathname === '/.well-known/oauth-protected-resource') {
        return new Response(JSON.stringify(OAUTH_PROTECTED_RESOURCE), {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'max-age=3600',
          },
        });
      }
    }

    await next();

    const requestUrl = new URL(c.req.url);
    if (c.req.method === 'GET' && requestUrl.pathname === '/') {
      c.res.headers.append('Link', HOMEPAGE_LINK_HEADER);
    }

    const accept = c.req.header('accept')?.toLowerCase() ?? '';
    if (!accept.includes('text/markdown')) {
      return;
    }

    if (!c.res.headers.get('Content-Type')?.toLowerCase().includes('text/html')) {
      return;
    }

    const html = await c.res.text();
    const markdown = htmlToMarkdown(html);
    const headers = new Headers(c.res.headers);
    headers.set('Content-Type', 'text/markdown; charset=utf-8');
    headers.set('x-markdown-tokens', String(countTokens(markdown)));
    appendVary(headers, 'Accept');
    c.res = new Response(markdown, {
      status: c.res.status,
      statusText: c.res.statusText,
      headers,
    });
  };
}

async function createSitemapXml(): Promise<string> {
  const urls: SitemapUrl[] = STATIC_PATHS.map((path) => ({ path }));

  const { pages: blogPages, posts: blogPosts } = await getPosts({ type: 'blog', limit: Number.MAX_SAFE_INTEGER });
  urls.push(
    ...blogPosts.map((post) => ({ path: `/${post.frontmatter.slug}`, lastmod: toDateOnly(post.frontmatter.date) })),
  );
  urls.push(...paginate('/blog', blogPages));

  const { pages: tipPages, posts: tipPosts } = await getPosts({ type: 'tip', limit: Number.MAX_SAFE_INTEGER });
  urls.push(
    ...tipPosts.map((post) => ({ path: `/tip/${post.frontmatter.slug}`, lastmod: toDateOnly(post.frontmatter.date) })),
  );
  urls.push(...paginate('/tips', tipPages));

  const { posts: javascriptPosts } = await getPosts({ type: 'javascript', limit: Number.MAX_SAFE_INTEGER });
  urls.push(
    ...javascriptPosts.map((post) => ({
      path: `/javascript/${post.frontmatter.slug}`,
      lastmod: toDateOnly(post.frontmatter.date),
    })),
  );

  return buildSitemapXml(deduplicateUrls(urls));
}

function paginate(basePath: '/blog' | '/tips', totalPages: number): SitemapUrl[] {
  if (totalPages <= 1) {
    return [];
  }

  const urls: SitemapUrl[] = [];
  for (let page = 2; page <= totalPages; page += 1) {
    urls.push({ path: `${basePath}/${page}` });
  }
  return urls;
}

function deduplicateUrls(urls: SitemapUrl[]): SitemapUrl[] {
  const byPath = new Map<string, SitemapUrl>();
  for (const url of urls) {
    byPath.set(url.path, url);
  }
  return [...byPath.values()].toSorted((a, b) => a.path.localeCompare(b.path));
}

function toDateOnly(value: unknown): string | undefined {
  if (!value) {
    return undefined;
  }

  const date = new Date(value as string | number | Date);
  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date.toISOString().slice(0, 10);
}

function countTokens(markdown: string): number {
  return markdown.trim().split(/\s+/).filter(Boolean).length;
}
