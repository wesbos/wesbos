import path from 'node:path';
import { cloudflare } from '@cloudflare/vite-plugin';
import mdx from '@mdx-js/rollup';
import babel from '@rolldown/plugin-babel';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import rehypeExtractToc from '@stefanprobst/rehype-extract-toc';
import rehypeExtractTocMdx from '@stefanprobst/rehype-extract-toc/mdx';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import rehypeMdxImportMedia from 'rehype-mdx-import-media';
import rehypeMdxTitle from 'rehype-mdx-title';
import rehypeSlug from 'rehype-slug';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { defineConfig } from 'waku/config';
import rehypeExcerpt from './src/lib/rehype-excerpt';
import rehypeHotTips from './src/lib/rehype-hot-tips';
import rehypeImageSize from './src/lib/rehype-image-size';
import rehypeWesbos from './src/lib/rehype-wesbos';
import { getSentryRelease, gitHashPlugin } from './vite-plugin-git-hash';
import { imgDimensions } from './vite-plugin-img-dimensions';

// Cloudflare image resizing (/cdn-cgi/image) only works on the wesbos.com zone. Every Workers Build is served
// there: production on wesbos.com, Previews on <branch>.preview.wesbos.com (their workers.dev URLs will show
// broken images). Dev and local builds serve original images. Set IMAGE_CDN=true|false to override.
const imageCdn = process.env.IMAGE_CDN ?? String(Boolean(process.env.WORKERS_CI_BRANCH));

export default defineConfig({
  vite: {
    define: {
      'import.meta.env.IMAGE_CDN': JSON.stringify(imageCdn),
    },
    environments: {
      client: {
        // Sentry needs these, but they shouldn't be public. They're deleted after upload.
        build: { sourcemap: process.env.SENTRY_AUTH_TOKEN ? 'hidden' : false },
      },
      rsc: {
        optimizeDeps: {
          // noDiscovery: true,
          entries: ['./src/pages/**/*.{tsx,ts,mdx}'],
          include: ['hono/tiny'],
        },
      },
      ssr: {
        optimizeDeps: {
          entries: ['./src/pages/**/*.{tsx,ts,mdx}'],
          include: ['waku > rsc-html-stream/server'],
        },
      },
    },
    plugins: [
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      cloudflare({
        viteEnvironment: { name: 'rsc', childEnvironments: ['ssr'] },
        inspectorPort: false,
      }),
      gitHashPlugin(),
      imgDimensions(),
      mdx({
        providerImportSource: '@/components/mdxComponents/index',
        remarkPlugins: [[remarkFrontmatter], [remarkMdxFrontmatter]],
        rehypePlugins: [
          [rehypeImageSize],
          [
            rehypeMdxImportMedia,
            {
              strict: true,
              throwOnError: true,
            },
          ],
          [rehypeExcerpt],
          [rehypeSlug],
          [rehypeExtractToc, { name: 'toc' }],
          [rehypeExtractTocMdx, { name: 'toc' }],
          [rehypeWesbos],
          [rehypeMdxTitle],
          [rehypeHotTips],
        ],
      }),
      // Without a token, as in local builds, this does nothing
      sentryVitePlugin({
        org: 'bostype-inc',
        project: 'wesbos-com',
        authToken: process.env.SENTRY_AUTH_TOKEN,
        disable: !process.env.SENTRY_AUTH_TOKEN,
        telemetry: false,
        release: { name: getSentryRelease() },
        sourcemaps: { filesToDeleteAfterUpload: ['./dist/public/**/*.map'] },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, 'src'),
        // Work around blake3-wasm package ESM entry importing a missing `./node.js`.
        'blake3-wasm': 'blake3-wasm/esm/browser/index.js',
        'blake3-wasm/esm/index.js': 'blake3-wasm/esm/browser/index.js',
      },
      dedupe: ['react', 'react-dom'],
    },
  },
});
