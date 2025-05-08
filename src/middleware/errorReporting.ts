import * as Sentry from "@sentry/cloudflare";
import type { Middleware } from "waku/config";

const errorReportingMiddleware: Middleware = (
  options: MiddlewareOptions,
): ((ctx: HandlerContext, next: () => Promise<void>) => Promise<void>) => {
  options.unstable_onError.add((err: unknown, ctx: HandlerContext, origin: 'handler' | 'rsc' | 'html'): void => {
    console.log('Sent error to Sentry', Sentry.captureException(err));
    console.log('STACK TRACE:');

    console.error(err.stack);
    // console.log(`Context`, ctx);
    // console.log(`Origin`, origin);
  });
  return async (_ctx: HandlerContext, next: () => Promise<void>): Promise<void> => {
    await next();
  };
};

export default errorReportingMiddleware;
