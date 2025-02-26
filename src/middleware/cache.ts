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
    let key = c.req.url.toString() + '2';
    const cacheName = 'my-app';
    const cache = await caches.open(cacheName);
    console.log(`👉🏻 cache key`, key, cache);

    // Try to get from cache
    const cachedResponse = await cache.match(key);
    if (cachedResponse) {
      console.log('👉🏻 cache hit', cachedResponse);

      // Clone the response so we can see the output
      const cloned = cachedResponse.clone();
      const txt = await cloned.text();
      console.log('👉🏻 cache hit text', txt);
      // https://github.com/honojs/hono/blob/main/src/middleware/cache/index.ts#L109-L112
      // Use the Hono context to set the response
      // This avoids the type issues with ctx.res
      c.header('Cache-Control', 'max-age=3600, s-maxage=3600');
      cachedResponse.headers.forEach((value, key) => {
        c.header(key, value);
      });
      c.status(cachedResponse.status);
      c.body(txt);
      return;
      // Use the text content directly to avoid ReadableStream issues



      return; // Early return without calling next()
    }

    // No cache hit, continue with the request
    await next();

    // After the response is generated, cache it
    if (ctx.res.body) {
      // Set cache control header
      ctx.res.headers = ctx.res.headers || {};
      ctx.res.headers['Cache-Control'] = 'max-age=3600';

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

      // Create a response to cache
      const responseToCache = new Response(ctx.res.body, {
        status: ctx.res.status || 200,
        headers: responseHeaders,
      });

      console.log('👉🏻 caching response', key);

      // Use waitUntil to ensure the cache operation completes
      // even if the response is already sent
      c.executionCtx.waitUntil(cache.put(key, responseToCache.clone()));
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

