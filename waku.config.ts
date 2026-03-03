import path from 'node:path';
import { cloudflare } from '@cloudflare/vite-plugin';
import mdx from '@mdx-js/rollup';
import rehypeExtractToc from '@stefanprobst/rehype-extract-toc';
import rehypeExtractTocMdx from '@stefanprobst/rehype-extract-toc/mdx';
import react from '@vitejs/plugin-react';
import rehypeExtractExcerpt from 'rehype-extract-excerpt';
import rehypeMdxImportMedia from 'rehype-mdx-import-media';
import rehypeMdxTitle from 'rehype-mdx-title';
import rehypeSlug from 'rehype-slug';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import type { Plugin } from 'vite';
import { defineConfig } from 'waku/config';
import rehypeHotTips from './src/lib/rehype-hot-tips';
import rehypeImageSize from './src/lib/rehype-image-size';
import rehypeWesbos from './src/lib/rehype-wesbos';
import { gitHashPlugin } from './vite-plugin-git-hash';
import { imgDimensions } from './vite-plugin-img-dimensions';

const isWakuDev = process.argv.includes('dev');

function excludeFromAllEnvironments(packages: string[]): Plugin {
  return {
    name: 'exclude-from-all-environments',
    configEnvironment(_name, env) {
      env.optimizeDeps ??= {};
      env.optimizeDeps.exclude ??= [];
      env.optimizeDeps.exclude.push(...packages);
    },
  };
}

export default defineConfig({
  // unstable_adapter: 'waku/adapters/cloudflare',
  vite: {
    environments: {
      rsc: {
        optimizeDeps: {
          noDiscovery: true,
          include: ['hono/tiny', 'react-icons/io', '@unpic/react', 'clsx', 'github-slugger'],
        },
      },
      ssr: {
        optimizeDeps: {
          include: ['waku > rsc-html-stream/server'],
        },
      },
    },
    plugins: [
      excludeFromAllEnvironments(['blake3-wasm', 'wrangler', 'miniflare', 'cloudflare:workers']),
      react({
        babel: {
          plugins: ['babel-plugin-react-compiler'],
        },
      }),
      // Waku dev's RSC environment does not support registerMissingImport yet.
      // Keep Cloudflare's Vite plugin out of `waku dev` and use wrangler proxy bindings there.
      !isWakuDev &&
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
          [rehypeExtractExcerpt],
          [rehypeSlug],
          [rehypeExtractToc, { name: 'toc' }],
          [rehypeExtractTocMdx, { name: 'toc' }],
          [rehypeWesbos],
          [rehypeMdxTitle],
          [rehypeHotTips],
        ],
      }),
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, 'src'),
        // Work around blake3-wasm package ESM entry importing a missing `./node.js`.
        'blake3-wasm': 'blake3-wasm/esm/browser/index.js',
        'blake3-wasm/esm/index.js': 'blake3-wasm/esm/browser/index.js',
      },
    },
    // optimizeDeps: {
    //   include: ['react/jsx-runtime'],
    // },
    // build: {
    //   target: 'esnext',
    //   rollupOptions: {
    //     external: ['blake3-wasm'],
    //   },
    // },
  },
});
