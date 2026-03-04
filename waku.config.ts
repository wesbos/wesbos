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
import { defineConfig } from 'waku/config';
import rehypeHotTips from './src/lib/rehype-hot-tips';
import rehypeImageSize from './src/lib/rehype-image-size';
import rehypeWesbos from './src/lib/rehype-wesbos';
import { gitHashPlugin } from './vite-plugin-git-hash';
import { imgDimensions } from './vite-plugin-img-dimensions';

export default defineConfig({
  vite: {
    environments: {
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
      react({
        babel: {
          plugins: ['babel-plugin-react-compiler'],
        },
      }),
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
