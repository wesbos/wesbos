// https://github.com/honojs/hono/blob/main/src/middleware/cache/index.ts#L109-L112
import type { Middleware } from 'waku/config';
import type { Context } from 'hono';


const cacheMiddleware: Middleware = () => {
  return async function cache(ctx, next) {
    const c = ctx.data.__hono_context as Context; // This is the Hono context
    let key = `${c.req.url.toString()}-${import.meta.env.WAKU_GIT_COMMIT_HASH}`;
    const cacheName = 'my-app';
    const cache = await caches.open(cacheName);
    console.log(`👉🏻 cache key`, key, cache);

    // Try to get from cache
    const cachedResponse = await cache.match(key);
    if (cachedResponse) {
      console.log('👉🏻 cache hit', cachedResponse);
      // https://github.com/honojs/hono/blob/main/src/middleware/cache/index.ts#L109-L112
      // Use the Hono context to set the response
      // This avoids the type issues with ctx.res
      cachedResponse.headers.forEach((value, key) => {
        c.header(key, value);
      });

      ctx.res.body = cachedResponse.body;
      ctx.res.status = cachedResponse.status;

      // Convert Headers to a Record<string, string | string[]>
      const headers: Record<string, string | string[]> = {};
      cachedResponse.headers.forEach((value, key) => {
        headers[key] = value;
      });
      ctx.res.headers = headers;
      return;
    }

    // No cache hit, continue with the request
    await next();

    // After the response is generated, cache it
    if (ctx.res.body) {
      // Set cache control header
      ctx.res.headers = ctx.res.headers || {};
      // TODO add a browser TTL header, Ideally very short. Or a cache key with the latest commit hash?
      ctx.res.headers['Cache-Control'] = 'max-age=60'; // 60 seconds for client
      ctx.res.headers['CDN-Cache-Control'] = 'max-age=3600'; // 1 hour for CDN
      ctx.res.headers['x-wes-cached-this'] = new Date().toLocaleString('en-US', {
        timeZone: 'America/New_York'
      });

      // Create a proper response object for caching
      // Convert headers to a proper Headers object
      const responseHeaders = new Headers();
      if (ctx.res.headers) {
        Object.entries(ctx.res.headers).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach(v => responseHeaders.append(key, v));
          } else if (value !== undefined) {
            responseHeaders.set(key, value);
          }
        });
      }

      // Clone the stream before using it for caching
      let responseBodyToCache: ReadableStream | string = '';

      if (ctx.res.body instanceof ReadableStream) {
        // Clone the stream so we can use it in two places
        const [stream1, stream2] = ctx.res.body.tee();

        // Use one stream for the response to the client
        ctx.res.body = stream1;

        // Use the other stream for caching
        responseBodyToCache = stream2;
      } else {
        // If it's not a stream, we can use it directly
        responseBodyToCache = ctx.res.body;
      }

      // Create a response to cache
      const responseToCache = new Response(responseBodyToCache, {
        status: ctx.res.status || 200,
        headers: responseHeaders,
      });

      console.log('👉🏻 caching response', key);

      // Use waitUntil to ensure the cache operation completes
      // even if the response is already sent
      c.executionCtx.waitUntil(cache.put(key, responseToCache));
    }
  };
};

export default cacheMiddleware;
