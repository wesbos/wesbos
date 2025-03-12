
import * as Sentry from "@sentry/cloudflare";
import type { Hono } from 'hono';
import { type Config, defineConfig } from 'waku/config';

const withSentry = (app: Hono) => Sentry.withSentry(
  (env) => ({
    dsn: "https://0641a5796d4140aa8dae677c521b1f65@o28940.ingest.us.sentry.io/126624",
  }),
  app
);

export default defineConfig({
  ...(import.meta.env && !import.meta.env.PROD
    ? {
      unstable_honoEnhancer: ((createApp: (app: Hono) => Hono) => {
        const handlerPromise = import('./waku.cloudflare-dev-server').then(({ cloudflareDevServer }) =>
          cloudflareDevServer({
            // Optional config settings for the Cloudflare dev server (wrangler proxy)
            // https://developers.cloudflare.com/workers/wrangler/api/#parameters-1
            persist: {
              path: '.wrangler/state/v3',
            },
          }),
        );
        return (appToCreate: Hono) => {
          // If you add routes before createApp, they are run before Waku. This could be handy for adding routing or middleware that isn't part of Waku.
          appToCreate.use('/wes', async (c, next) => {
            return new Response('Hello Wes');
          });
          const app = withSentry(createApp(appToCreate));

          return {
            fetch: async (req: Request) => {
              const devHandler = await handlerPromise;
              return devHandler(req, app);
            },
          };
        };
      }) as Config['unstable_honoEnhancer'],
    }
    : {
      unstable_honoEnhancer: ((createApp: (app: Hono) => Hono) => {
        return (appToCreate: Hono) => {
          const app = withSentry(createApp(appToCreate));
          app.use('/wes', async (c, next) => {
            return new Response('Hello Wes from production!');
          });
          return app;
        }
      }) as Config['unstable_honoEnhancer'],
    }),
  middleware: () => {
    return [
      import('./src/middleware/og'),
      import('./src/middleware/errorReporting'),
      import('waku/middleware/context'),
      import('waku/middleware/dev-server'),
      import('./waku.cloudflare-middleware'),
      import('./src/middleware/cache'),
      import('waku/middleware/handler'),
    ];
  },
});
