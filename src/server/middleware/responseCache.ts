import type { MiddlewareHandler } from 'hono';

const CACHE_NAME = 'my-app';

function isRscPath(pathname: string): boolean {
  return pathname.includes('/RSC/');
}

/**
 * Only plain successful pages are cached. Redirects (a stale 301 outlives a route change), 5xx
 * (a 502/503 blip would be served for an hour) and anything that sets a cookie go straight through.
 */
export function isCacheable(res: Response): boolean {
  return res.status === 200 && !res.headers.has('Set-Cookie') && res.body !== null;
}

/**
 * HTML is streamed, so a `<Suspense>` boundary that throws after the 200 has been sent still ends
 * up in a "successful" response. React marks it by writing a client-render instruction (`$RX`) into
 * the stream, which swaps in the error fallback. Don't cache those pages.
 */
export function hasErroredBoundary(html: string): boolean {
  return /\$RX[=(]/.test(html);
}

/**
 * Waku's build ID changes on every build, unlike the git hash, so rebuilding the same commit can't
 * serve cached HTML that points at chunks from the previous build.
 */
function cacheVersion(): string {
  const buildId = import.meta.env.WAKU_BUILD_ID;
  return typeof buildId === 'string' ? buildId : 'unknown';
}

/**
 * Cloudflare Cache API: cache full GET responses (skip RSC, errors, dev).
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

    const key = `${c.req.url}-${cacheVersion()}`;

    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(key);
    if (cachedResponse) {
      return cachedResponse;
    }

    await next();

    const res = c.res;
    if (!res || !isCacheable(res) || !res.body) {
      return;
    }

    const headers = new Headers(res.headers);
    headers.set('Cache-Control', 'max-age=60');
    headers.set('CDN-Cache-Control', 'max-age=3600');
    headers.set('x-wes-cached-this', new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));

    const [toClient, toStore] = res.body.tee();
    c.res = new Response(toClient, { status: res.status, statusText: res.statusText, headers });

    // Read the whole stream before storing it, so an HTML page whose Suspense content failed late is skipped
    const isHtml = headers.get('Content-Type')?.includes('text/html') ?? false;
    const store = async () => {
      const body = isHtml ? await new Response(toStore).text() : await new Response(toStore).arrayBuffer();
      if (typeof body === 'string' && hasErroredBoundary(body)) return;
      await cache.put(key, new Response(body, { status: res.status, statusText: res.statusText, headers }));
    };

    try {
      c.executionCtx.waitUntil(store());
    } catch {
      // No ExecutionContext (e.g. some local runs) — skip background cache write
    }
  };
}
