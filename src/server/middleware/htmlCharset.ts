import type { MiddlewareHandler } from 'hono';

/**
 * Declares UTF-8 in the header of every HTML response. Waku sends a bare `text/html`, and its 404
 * shell has no <meta charset>, so browsers fall back to windows-1252 and render → as â†’.
 */
export function htmlCharsetMiddleware(): MiddlewareHandler {
  return async (c, next) => {
    await next();
    if (c.res.headers.get('Content-Type')?.trim().toLowerCase() === 'text/html') {
      c.header('Content-Type', 'text/html; charset=utf-8');
    }
  };
}
