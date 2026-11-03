import type { MiddlewareHandler } from 'hono';

/** Old feed URLs that still get traffic. */
const FEED_PATHS = new Set(['/feed', '/home/feed', '/blog/feed']);

/**
 * 301 GET/HEAD old feed URLs → /rss.xml.
 * Matches with or without a trailing slash, so `/feed/` goes straight to /rss.xml in one hop
 * instead of first being trimmed to `/feed` by the trailing slash middleware.
 */
export function feedRedirectsMiddleware(): MiddlewareHandler {
  return async (c, next) => {
    const { method, path } = c.req;
    if (method === 'GET' || method === 'HEAD') {
      const trimmed = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
      if (FEED_PATHS.has(trimmed)) {
        return c.redirect('/rss.xml', 301);
      }
    }
    await next();
  };
}
