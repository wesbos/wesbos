import type { Hono } from 'hono';
import { type Config, defineConfig } from 'waku/config';
import { cache } from 'hono/cache'

export default defineConfig({
  ...(import.meta.env && !import.meta.env.PROD
    ? {
      unstable_honoEnhancer: ((createApp: (app: Hono) => Hono) => {
        const handlerPromise = import('./waku.cloudflare-dev-server').then(
          ({ cloudflareDevServer }) =>
            cloudflareDevServer({
              // Optional config settings for the Cloudflare dev server (wrangler proxy)
              // https://developers.cloudflare.com/workers/wrangler/api/#parameters-1
              persist: {
                path: '.wrangler/state/v3',
              },
            }),
        );
        return (appToCreate: Hono) => {
          const app = createApp(appToCreate);
          return {
            fetch: async (req: Request) => {
              const devHandler = await handlerPromise;
              return devHandler(req, app);
            },
          };
        };
      }) as Config['unstable_honoEnhancer'],
    }
    : {}),
  middleware: () => {
    // TODO: cache API via headers? https://github.com/dai-shi/waku/blob/main/examples/38_cookies/src/middleware/cookie.ts
    return [
      import('./src/lib/og/og'),
      import('waku/middleware/context'),
      import('waku/middleware/dev-server'),
      import('./waku.cloudflare-middleware'),
      import('./src/middleware/cache'),
      import('waku/middleware/handler'),
    ];
  },
});
