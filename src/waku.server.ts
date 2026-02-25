import * as Sentry from '@sentry/cloudflare';
import { fsRouter } from 'waku';
import adapter from 'waku/adapters/cloudflare';

const baseEntry = adapter(fsRouter(import.meta.glob('./pages/**/*.{tsx,ts,mdx}')));

const sentryConfig = () => ({
  dsn: 'https://dd98dd6ca4df23ad958966a5384321e2@o28940.ingest.us.sentry.io/4508735015026688',
  tracesSampleRate: 1.0,
  integrations: [Sentry.honoIntegration()],
});

const wrappedFetch = async (request: Request, env: unknown, ctx: ExecutionContext) => {
  return Sentry.withSentry(sentryConfig, {
    fetch: baseEntry.fetch,
  } as ExportedHandler).fetch(request, env, ctx);
};

export default {
  ...baseEntry,
  fetch: wrappedFetch,
};
