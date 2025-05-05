import { defineConfig } from 'waku/config';

export default defineConfig({
  unstable_honoEnhancer: './waku.hono-enhancer',
  middleware: [
    './src/middleware/og',
    './src/middleware/trailingSlash',
    './src/middleware/errorReporting',
    'waku/middleware/context',
    'waku/middleware/dev-server',
    './waku.cloudflare-middleware',
    './src/middleware/cache',
    'waku/middleware/handler',
  ],
});
