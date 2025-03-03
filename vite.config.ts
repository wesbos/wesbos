import { defineConfig } from 'vite';
import mdx from '@mdx-js/rollup';
import path from 'node:path';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypeMdxImportMedia from 'rehype-mdx-import-media';
import rehypeExtractExcerpt from 'rehype-extract-excerpt';
import rehypeSlug from 'rehype-slug';
import rehypeExtractToc from '@stefanprobst/rehype-extract-toc';
import rehypeExtractTocMdx from '@stefanprobst/rehype-extract-toc/mdx';
import rehypeWesbos from './src/lib/rehype-wesbos';
import rehypeMdxTitle from 'rehype-mdx-title';
import rehypeHotTips from './src/lib/rehype-hot-tips';
import rehypeImageSize from './src/lib/rehype-image-size';
import { imgDimensions } from './vite-plugin-img-dimensions';
import { gitHashPlugin } from './vite-plugin-git-hash';

// TODO: https://github.com/dai-shi/waku/issues/421
export default defineConfig({
  plugins: [
    // wasm(),
    // cloudflare(),
    // topLevelAwait(),
    // wasmModuleWorkers(),
    // cloudflareWasm(),
    // openimg(),
    gitHashPlugin(),
    imgDimensions(),
    mdx({
      // A custom useMDXComponents function is required to be able to use the MDXProvider with server components. This is also how Next.js does it.
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
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    include: ['react/jsx-runtime'],
  },
  build: {
    target: 'esnext',
  },
});
