import * as Sentry from "@sentry/cloudflare";

const errorReportingMiddleware: Middleware = (
  options: MiddlewareOptions,
): ((ctx: HandlerContext, next: () => Promise<void>) => Promise<void>) => {
  options.unstable_onError.add((err: unknown, ctx: HandlerContext, origin: 'handler' | 'rsc' | 'html'): void => {
    console.log(Sentry.captureException(err));
    console.error(err);
  });
  return async (_ctx: HandlerContext, next: () => Promise<void>): Promise<void> => {
    await next();
  };
};

export default errorReportingMiddleware;
