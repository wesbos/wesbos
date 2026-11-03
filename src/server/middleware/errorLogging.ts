import * as Sentry from '@sentry/cloudflare';
import type { MiddlewareHandler } from 'hono';

/**
 * Reports server failures to Sentry. Hono catches errors thrown by later middleware and returns a
 * 500, so they show up on `c.error` rather than as an exception here.
 */
export function errorLoggingMiddleware(): MiddlewareHandler {
  return async (c, next) => {
    await next();
    const { status } = c.res;
    if (status < 500) return;
    const { method } = c.req;
    const { pathname } = new URL(c.req.url);
    Sentry.withScope((scope) => {
      scope.setTags({ 'http.method': method, 'http.status_code': status, path: pathname });
      if (c.error) {
        Sentry.captureException(c.error);
      } else {
        scope.setFingerprint(['server-5xx', String(status), method]);
        Sentry.captureMessage(`${status} response to ${method} request`, 'error');
      }
    });
  };
}
