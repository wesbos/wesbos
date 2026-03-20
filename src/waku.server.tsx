import * as Sentry from '@sentry/cloudflare';
import { fsRouter } from 'waku';
import adapter from 'waku/adapters/cloudflare';
import { cloudflareMiddlewareFns } from './server/middleware';

const pages = import.meta.glob('./**/*.{tsx,ts}', { base: './pages' });

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

// Waku's build step needs `build` from the adapter return value; only the Worker's
// `defaultExport` should be wrapped with Sentry (same pattern as `xxx-old-waku.hono-enhancer.ts`).
export default {
  ...server,
  defaultExport: Sentry.withSentry(
    (_env: Env) => ({
      dsn: 'https://dd98dd6ca4df23ad958966a5384321e2@o28940.ingest.us.sentry.io/4508735015026688',
      tracesSampleRate: 1.0,
    }),
    server.defaultExport as Parameters<typeof Sentry.withSentry<Env>>[1],
  ),
};
