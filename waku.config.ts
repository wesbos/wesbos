import path from 'node:path';
import mdx from '@mdx-js/rollup';
import rehypeExtractToc from '@stefanprobst/rehype-extract-toc';
import rehypeExtractTocMdx from '@stefanprobst/rehype-extract-toc/mdx';
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
  unstable_adapter: 'waku/adapters/cloudflare',
  vite: {
    plugins: [
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
      },
    },
    optimizeDeps: {
      include: ['react/jsx-runtime'],
    },
    build: {
      target: 'esnext',
      rollupOptions: {
        external: ['blake3-wasm'],
      },
    },
  },
});
