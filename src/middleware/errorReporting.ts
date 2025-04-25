import * as Sentry from "@sentry/cloudflare";

const errorReportingMiddleware: Middleware = (
  options: MiddlewareOptions,
): ((ctx: HandlerContext, next: () => Promise<void>) => Promise<void>) => {
  options.unstable_onError.add((err: unknown, ctx: HandlerContext, origin: 'handler' | 'rsc' | 'html'): void => {
    console.log('Sent error to Sentry', Sentry.captureException(err));
    console.log('STACK TRACE:');
    console.error(err.stack);
    // capture it?
    const captured = Error.captureStackTrace(err);
    console.log('CAPTURED STACK TRACE:');
    console.error(captured);


  });
  return async (_ctx: HandlerContext, next: () => Promise<void>): Promise<void> => {
    await next();
  };
};

export default errorReportingMiddleware;
