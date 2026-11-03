import * as Sentry from '@sentry/cloudflare';
import { fsRouter } from 'waku';
import adapter from 'waku/adapters/cloudflare';
import { sentryOptions } from './lib/sentry';
import { captureRenderErrors } from './server/captureRenderErrors';
import { cloudflareMiddlewareFns } from './server/middleware';

captureRenderErrors();

const pages = import.meta.glob('./pages/**/*.{tsx,ts}');

const server = adapter(fsRouter(pages), {
  middlewareFns: [...cloudflareMiddlewareFns],
  handlers: {
    // Define additional Cloudflare Workers handlers here
    // https://developers.cloudflare.com/workers/runtime-apis/handlers/
    // async queue(
    //   batch: MessageBatch,
    //   _env: Env,
    //   _ctx: ExecutionContext,
    // ): Promise<void> {
    //   for (const message of batch.messages) {
    //     console.log('Received', message);
    //   }
    // },
  } satisfies ExportedHandler<Env>,
});

const handler = server.defaultExport as ExportedHandler<Env> & {
  fetch: (request: Request, env: Env) => Response | Promise<Response>;
};

/**
 * Sentry shuts its client down when a non-streaming response returns, and it treats HTML as
 * non-streaming, so errors thrown later inside <Suspense> were dropped. It does wait for anything
 * passed to its `ctx.waitUntil`, so use that to hold the client open until the body finishes.
 */
function keepSentryOpenUntilStreamEnds(response: Response, ctx: ExecutionContext) {
  if (!response.body) return response;
  let finish = () => {};
  ctx.waitUntil(
    new Promise<void>((resolve) => {
      finish = resolve;
    }),
  );
  const body = response.body.pipeThrough(new TransformStream({ flush: () => finish(), cancel: () => finish() }));
  return new Response(body, response);
}

// Waku's build step needs `build` from the adapter return value; only the Worker's
// `defaultExport` should be wrapped with Sentry.
export default {
  ...server,
  defaultExport: Sentry.withSentry((_env: Env) => sentryOptions, {
    ...handler,
    async fetch(request, env, ctx) {
      return keepSentryOpenUntilStreamEnds(await handler.fetch(request, env), ctx);
    },
  } satisfies ExportedHandler<Env>),
};
