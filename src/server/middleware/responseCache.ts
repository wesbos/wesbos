import type { MiddlewareHandler } from 'hono';

const CACHE_NAME = 'my-app';

function isRscPath(pathname: string): boolean {
  return pathname.includes('/RSC/');
}

/**
 * Cloudflare Cache API: cache full GET responses (skip RSC, errors, dev).
 * Mirrors the previous Waku middleware in `_middleware_old/cache.ts`.
 */
export function responseCacheMiddleware(): MiddlewareHandler {
  return async (c, next) => {
    if (import.meta.env.DEV) {
      await next();
      return;
    }

    const url = new URL(c.req.url);
    if (c.req.method !== 'GET' || isRscPath(url.pathname)) {
      await next();
      return;
    }

    const hash =
      typeof import.meta.env.WAKU_GIT_COMMIT_HASH === 'string' ? import.meta.env.WAKU_GIT_COMMIT_HASH : 'unknown';
    const key = `${c.req.url}-${hash}`;

    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(key);
    if (cachedResponse) {
      return cachedResponse;
    }

    await next();

    const res = c.res;
    if (!res || res.status === 404 || res.status === 403 || res.status === 500) {
      return;
    }

    const body = res.body;
    if (!body) {
      return;
    }

    const headers = new Headers(res.headers);
    headers.set('Cache-Control', 'max-age=60');
    headers.set('CDN-Cache-Control', 'max-age=3600');
    headers.set('x-wes-cached-this', new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));

    const [toClient, toStore] = body.tee();
    c.res = new Response(toClient, { status: res.status, statusText: res.statusText, headers });

    const responseToCache = new Response(toStore, {
      status: res.status,
      statusText: res.statusText,
      headers,
    });

    try {
      const ctx = c.executionCtx;
      ctx.waitUntil(cache.put(key, responseToCache));
    } catch {
      // No ExecutionContext (e.g. some local runs) — skip background cache write
    }
  };
}
