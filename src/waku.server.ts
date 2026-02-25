import * as Sentry from '@sentry/cloudflare';
import cloudflareAdapter from 'waku/adapters/cloudflare';
import { fsRouter } from 'waku/router/server';

const pages = import.meta.glob('/src/pages/**/*.{tsx,ts,mdx}', { base: '/src/pages' });

const baseEntry = cloudflareAdapter(fsRouter(pages));

const sentryConfig = () => ({
  dsn: 'https://dd98dd6ca4df23ad958966a5384321e2@o28940.ingest.us.sentry.io/4508735015026688',
  tracesSampleRate: 1.0,
  integrations: [Sentry.honoIntegration()],
});

const sentryWrappedEntry = Sentry.withSentry(sentryConfig, {
  fetch: baseEntry.fetch,
} as ExportedHandler);

// Development: Use wrangler's getPlatformProxy for local D1/KV/R2 access
const getDevProxy = async () => {
  const { getPlatformProxy } = await import('wrangler');
  const { WebSocketPair } = await import('miniflare');
  Object.assign(globalThis, { WebSocketPair });
  return getPlatformProxy({ persist: { path: '.wrangler/state/v3' } });
};

let devProxyPromise: ReturnType<typeof getDevProxy> | null = null;

const wrappedFetch = async (request: Request, env: unknown, ctx: ExecutionContext) => {
  // In development, inject wrangler proxy env/ctx for local bindings
  if (import.meta.env?.DEV) {
    if (!devProxyPromise) {
      devProxyPromise = getDevProxy();
    }
    const proxy = await devProxyPromise;
    Object.assign(request, { cf: proxy.cf });
    Object.assign(globalThis, {
      caches: proxy.caches,
      __waku_dev_proxy__: proxy, // Store proxy for getCloudflareContext to access
    });
    return baseEntry.fetch(request, proxy.env, proxy.ctx);
  }

  // In production, wrap with Sentry
  return sentryWrappedEntry.fetch(request, env, ctx);
};

export default {
  ...baseEntry,
  fetch: wrappedFetch,
};
