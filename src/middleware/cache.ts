import type { Middleware } from 'waku/config';

// XXX we would probably like to extend config.
const COOKIE_OPTS = {};

const cacheMiddleware: Middleware = () => {
  return async (ctx, next) => {
    console.log('🥛', ctx.req.url.pathname);
    ctx.res.headers ||= {};
    // Cache for both CDN and browser with stale-while-revalidate
    // ctx.res.headers['cache-control'] = 'public, max-age=20, s-maxage=20, stale-while-revalidate=200';
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
