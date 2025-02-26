// https://github.com/honojs/hono/blob/main/src/middleware/cache/index.ts#L109-L112
import { getCloudflareContext } from '@/lib/hono';
import { getEnv } from '@/lib/waku';
import type { Middleware } from 'waku/config';
import { cache } from 'hono/cache';
import type { Context } from 'hono';

// XXX we would probably like to extend config.
const COOKIE_OPTS = {};

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
      // c.header('Cache-Control', 'max-age=3600, s-maxage=3600');
      cachedResponse.headers.forEach((value, key) => {
        c.header(key, value);
      });

      // Fix type issues by converting the text to a stream
      // const stream = new ReadableStream({
      //   start(controller) {
      //     controller.enqueue(new TextEncoder().encode(txt));
      //     controller.close();
      //   }
      // });

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
      // Cache Tag- TODO: Add a cache tag for the Worker version hash?
      // https://community.cloudflare.com/t/worker-version-as-environment-variable/359939
      ctx.res.headers['Cache-Tag'] = `site,commit-${import.meta.env.WAKU_GIT_COMMIT_HASH}`;

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

// const cacheMiddlewareXXX: Middleware = () => {
//   return async (ctx, next) => {
//     console.log('Cache:', globalThis.caches);
//     if(import.meta.env.MODE === 'development') {
//       return next(); // Skip cache in development
//     }

//     // SKip everything that isn't a GET request. I do this because I'm not sure how it will affect RSC Payloads, but I don't have any of those yet.
//     if(ctx.req.method !== 'GET') {
//       return next();
//     }

//     const pathname = ctx.req.url.pathname;

//     console.log('👉🏻', pathname);

//     ctx.res.headers ||= {};

//     ctx.res.headers['x-wes-was-here'] = new Date().toLocaleString();

//     const CACHE_TIME = 900;

//     // Cache RSC GET requests  - this is switching pages in Waku
//     if(pathname.startsWith('/RSC/R')) {
//       console.log(`Taggin ${pathname} as cacheable for ${CACHE_TIME} seconds`);
//       ctx.res.headers['Cache-Control'] = `s-max-age=${CACHE_TIME}`
//       return next();
//     }
//     // Cache the about adn contact pages as a test
//     if(pathname.startsWith('/about') || pathname.startsWith('/contact')) {
//       console.log(`Taggin ${pathname} as cacheable for ${CACHE_TIME} seconds`);
//       ctx.res.headers['Cache-Control'] = `s-max-age=${CACHE_TIME}`
//       return next();
//     }

//     if(pathname.startsWith('/assets')) {
//       // We can cache assets for a long time - forever really because their content doesn't change. The hash on the filename is changed.
//       // I don;t think I need this at all since the assets arent even showing up in the cloudflare logs??
//       ctx.res.headers['Cache-Control'] = `s-max-age=${CACHE_TIME}`
//       return next();
//     }

//     // Cache the favicon for a long time
//     if(pathname.startsWith('/favicon.png')) {
//       ctx.res.headers['Cache-Control'] = `max-age=${20000}, s-maxage=${20000}, stale-while-revalidate=${20000}`
//       return next();
//     }

//     return next();
//     // const cookies = cookie.parse(ctx.req.headers.cookie || '');
//     // ctx.data.count = Number(cookies.count) || 0;
//     // await next();
//     // ctx.res.headers ||= {};
//     // let origSetCookie = ctx.res.headers['set-cookie'] || ([] as string[]);
//     // if (typeof origSetCookie === 'string') {
//     //   origSetCookie = [origSetCookie];
//     // }
//     // ctx.res.headers['set-cookie'] = [
//     //   ...origSetCookie,
//     //   cookie.serialize('count', String(ctx.data.count), COOKIE_OPTS),
//     // ];
//   };
// };

