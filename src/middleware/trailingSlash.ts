import type { Middleware } from 'waku/config';

const removeTrailingSlash: Middleware = () => {
  return async function redirect(ctx, next) {
    if (
      ctx.req.url.pathname.endsWith('/') && // Only redirect if the pathname ends with a slash
      ctx.req.url.pathname !== '/' && // Don't redirect the root path
      ctx.req.method === 'GET' // Only redirect GET requests
    ) {
      ctx.res.status = 301;
      ctx.res.headers = {
        Location: `${ctx.req.url.pathname.slice(0, -1)}`,
      };
      return;
    }
    await next();
  };
};

export default removeTrailingSlash;
