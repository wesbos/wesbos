import type { MiddlewareHandler } from 'hono';

/**
 * 301 GET /path/ → /path (root "/" unchanged).
 * Runs before RSC; pairs with Wrangler assets `html_handling` for static HTML.
 */
export function trailingSlashMiddleware(): MiddlewareHandler {
  return async (c, next) => {
    const url = new URL(c.req.url);
    if (url.pathname.endsWith('/') && url.pathname !== '/' && c.req.method === 'GET') {
      const target = url.pathname.slice(0, -1) || '/';
      return c.redirect(target, 301);
    }
    await next();
  };
}
