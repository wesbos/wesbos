import type { Middleware } from 'waku/config';

// XXX we would probably like to extend config.
const COOKIE_OPTS = {};

const cacheMiddleware: Middleware = () => {
  return async (ctx, next) => {
    if(import.meta.env.MODE === 'development') {
      return next(); // Skip cache in development
    }

    // SKip everything that isn't a GET request. I do this because I'm not sure how it will affect RSC Payloads, but I don't have any of those yet.
    if(ctx.req.method !== 'GET') {
      return next();
    }

    const pathname = ctx.req.url.pathname;

    console.log('👉🏻', pathname);

    ctx.res.headers ||= {};

    ctx.res.headers['x-wes-was-here'] = new Date().toLocaleString();

    const CACHE_TIME = 60;

    // Cache RSC GET requests  - this is switching pages in Waku
    if(pathname.startsWith('/RSC/R')) {
      console.log(`Taggin ${pathname} as cacheable for ${CACHE_TIME} seconds`);
      ctx.res.headers['CDN-Cache-Control'] = `public, max-age=${CACHE_TIME}, s-maxage=${CACHE_TIME}`
      return next();
    }
    // Cache the about adn contact pages as a test
    if(pathname.startsWith('/about') || pathname.startsWith('/contact')) {
      console.log(`Taggin ${pathname} as cacheable for ${CACHE_TIME} seconds`);
      ctx.res.headers['CDN-Cache-Control'] = `public, max-age=${CACHE_TIME}, s-maxage=${CACHE_TIME}`
      return next();
    }

    if(pathname.startsWith('/assets')) {
      // We can cache assets for a long time - forever really because their content doesn't change. The hash on the filename is changed.
      // I don;t think I need this at all since the assets arent even showing up in the cloudflare logs??
      ctx.res.headers['CDN-Cache-Control'] = `public, max-age=${CACHE_TIME}, s-maxage=${CACHE_TIME}`
      return next();
    }

    // Cache the favicon for a long time
    if(pathname.startsWith('/favicon.png')) {
      ctx.res.headers['CDN-Cache-Control'] = `max-age=${20000}, s-maxage=${20000}, stale-while-revalidate=${20000}`
      return next();
    }

    return next();
    // const cookies = cookie.parse(ctx.req.headers.cookie || '');
    // ctx.data.count = Number(cookies.count) || 0;
    // await next();
    // ctx.res.headers ||= {};
    // let origSetCookie = ctx.res.headers['set-cookie'] || ([] as string[]);
    // if (typeof origSetCookie === 'string') {
    //   origSetCookie = [origSetCookie];
    // }
    // ctx.res.headers['set-cookie'] = [
    //   ...origSetCookie,
    //   cookie.serialize('count', String(ctx.data.count), COOKIE_OPTS),
    // ];
  };
};

export default cacheMiddleware;
