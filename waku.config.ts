import type { Hono } from 'hono';
import { type Config, defineConfig } from 'waku/config';
import { cache } from 'hono/cache'
import { withSentry } from '@/middleware/sentry';

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
          // If you add routes before createApp, they are run before Waku. This could be handy for adding routing or middleware that isn't part of Waku.
          appToCreate.use('/wes', async (c, next) => {
            return new Response('Hello Wes');
          });
          appToCreate.onError((err, c) => {
            console.log(`Error Caught in Waku Config`);
            return c.text('Soemthing went wronggggggg', 500);
          });
          const app = createApp(withSentry(appToCreate));

          return {
            fetch: async (req: Request) => {
              const devHandler = await handlerPromise;
              console.log(app.routes);
              return devHandler(req, app);
            },
          };
        };
      }) as Config['unstable_honoEnhancer'],
    }
    : {
      // Production config
      unstable_honoEnhancer: ((createApp: (app: Hono) => Hono) => {
        return (appToCreate: Hono) => {
          appToCreate.use('/wes', async (c, next) => {
            return new Response('Hello Wes from production');
          });
          const app = withSentry(createApp(appToCreate));
          return {
            fetch: async (req: Request) => {
              return app.fetch(req);
            },
          };
        };
      }) as Config['unstable_honoEnhancer'],
    }),
  middleware: () => {
    return [
      import('./src/middleware/og'),
      import('waku/middleware/context'),
      import('waku/middleware/dev-server'),
      import('./waku.cloudflare-middleware'),
      import('./src/middleware/cache'),
      import('waku/middleware/handler'),

    ];
  },

});
