import type { Middleware } from 'waku/config';
import type { HandlerContext, MiddlewareOptions } from 'waku/lib/middleware/types';

const errorReportingMiddleware: Middleware = (
  options: MiddlewareOptions,
): ((ctx: HandlerContext, next: () => Promise<void>) => Promise<void>) => {
  options.unstable_onError.add((err: unknown, ctx: HandlerContext, origin: 'handler' | 'rsc' | 'html'): void => {
    const url = ctx.req.url;
    // if(err.message === 'Not Found') {
    //  console.log(`Error Reporting: Not Found`);
    //  return;
    // }
    console.log(`Error Happened on : ${url}`);
    // console.log('Sent error to Sentry', Sentry.captureException(err));
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
