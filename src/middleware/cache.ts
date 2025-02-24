import type { Middleware } from 'waku/config';

// XXX we would probably like to extend config.
const COOKIE_OPTS = {};

const cacheMiddleware: Middleware = () => {
  return async (ctx, next) => {
    if(import.meta.env.MODE === 'development') {
      return next(); // Skip cache in development
    }
    const pathname = ctx.req.url.pathname;

    console.log('👉🏻', pathname);

    ctx.res.headers ||= {};

    if(pathname.startsWith('/assets')) {
      // We can cache assets for a long time - forever really because their content doesn't change. The hash on the filename is changed.
      // Cache for both CDN and browser with stale-while-revalidate
      ctx.res.headers['cache-control'] = 'public, max-age=5, s-maxage=5, stale-while-revalidate=15'
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
