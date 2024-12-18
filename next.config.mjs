import createMDX from '@next/mdx';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import path from 'path';
// ;
const withMDX = createMDX({
  options: {
    /* webpackExclude: /\.noimport\.json$/ */
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [
      [
        'rehype-mdx-import-media',
        {
          strict: true,
          throwOnError: true,
        },
      ],
      ['rehype-slug'],
      // [rehypeExtractToc, { name: 'toc' }],
      ['@stefanprobst/rehype-extract-toc', { name: 'toc' }],
      // [rehypeExtractTocMdx, { name: 'toc' }],
      ['@stefanprobst/rehype-extract-toc/mdx', { name: 'toc' }],
      // [rehypeWesBosMdx],
      // ['@/lib/rehype-wesbos.mjs'],
      [path.resolve(import.meta.dirname, './lib/rehype-wesbos.mjs')],
      [`rehype-mdx-title`],
      [path.resolve(import.meta.dirname, './lib/rehype-hot-tips.mjs')],
    ],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // transpilePackages: ['next-mdx-remote'],
  experimental: {
    mdxRs: false /* Turned off as it doesnt work with rehype plugins */,
    dynamicIO: false,
  },
  // compiler: {
  //   styledComponents: true,
  // },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withMDX(nextConfig);
