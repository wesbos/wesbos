import { defineConfig } from 'vite';
import mdx from '@mdx-js/rollup';
import path from 'path';
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
import topLevelAwait from "vite-plugin-top-level-await";
import wasmModuleWorkers from './vite-plugin-wasm-module-workers'
import { cloudflareWasm }  from './vite-plugin-cloudflare-wasm'
import { unstable_getBuildOptions } from 'waku/server';

function ProcessExitPlugin() {
  return {
    name: 'ProcessExitPlugin',

    // catch the end of a build with errors
    buildEnd(error?: Error) {
      if (error) {
        console.error('Build failed:', error)
        process.exit(1)
      } else {
        const phase = unstable_getBuildOptions().unstable_phase;
        console.log('Build succeeded: ', phase)
      }
    },

    // catch the end of a build without errors
    closeBundle() {
      const phase = unstable_getBuildOptions().unstable_phase;
      if (phase === 'buildDeploy') {
        // console.log(`This never exits for some reason. Exiting...`);
        // process.exit(0)
      }
    },
  }
}

// TODO: https://github.com/dai-shi/waku/issues/421
export default defineConfig({
  plugins: [
    // wasm(),
    // cloudflare(),
    // topLevelAwait(),
    // wasmModuleWorkers(),
    // cloudflareWasm(),
    ProcessExitPlugin(),
    mdx({
      // A custom useMDXComponents function is required to be able to use the MDXProvider with server components. This is also how Next.js does it.
      providerImportSource: "@/components/mdxComponents/index",
      remarkPlugins: [[remarkFrontmatter], [remarkMdxFrontmatter]],
      rehypePlugins: [
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
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
  },
  optimizeDeps: {
    include: ["react/jsx-runtime"],
  },
  build: {
    target: 'esnext'
  }
});
