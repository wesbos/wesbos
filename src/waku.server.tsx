import { fsRouter } from 'waku';
import adapter from 'waku/adapters/cloudflare';

const baseEntry = adapter(fsRouter(import.meta.glob('./**/*.{tsx,ts}', { base: './pages' })), {
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

type DevProxy = {
  env: Record<string, unknown>;
  cf: unknown;
  ctx: unknown;
  caches: unknown;
};

let devProxyPromise: Promise<DevProxy> | null = null;

async function getDevProxy(): Promise<DevProxy> {
  const { getPlatformProxy } = await import('wrangler');
  return (await getPlatformProxy({
    persist: { path: '.wrangler/state/v3' },
  })) as unknown as DevProxy;
}

export default {
  ...baseEntry,
  async fetch(request: Request, env: unknown, ctx: unknown) {
    if (import.meta.env.DEV) {
      if (!devProxyPromise) {
        devProxyPromise = getDevProxy();
      }
      const proxy = await devProxyPromise;
      Object.assign(globalThis, {
        __waku_dev_proxy__: proxy,
        caches: proxy.caches,
      });
      Object.assign(request, { cf: proxy.cf });
      return baseEntry.fetch(request, proxy.env as never, proxy.ctx as never);
    }
    return baseEntry.fetch(request, env, ctx);
  },
};
