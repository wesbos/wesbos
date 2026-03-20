import type { MiddlewareHandler } from 'hono';

/**
 * Logs thrown errors that propagate as exceptions (same idea as `_middleware_old/errorReporting.ts`).
 * Many Waku/RSC failures become a Response with status 500 inside the framework; use Sentry on the
 * worker export for those.
 */
export function errorLoggingMiddleware(): MiddlewareHandler {
  return async (c, next) => {
    try {
      await next();
    } catch (err) {
      const url = c.req.url;
      console.error(`Error Happened on : ${url}`);
      if (err instanceof Error && err.stack) {
        console.error(err.stack);
      } else {
        console.error(err);
      }
      throw err;
    }
  };
}
