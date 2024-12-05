import createMDX from '@next/mdx';
import rehypeMdxImportMedia from 'rehype-mdx-import-media';


const withMDX = createMDX({
  options: {
    /* webpackExclude: /\.noimport\.json$/ */
    rehypePlugins: [[
      'rehype-mdx-import-media', {
        strict: true, throwOnError: true
      }
    ]],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // transpilePackages: ['next-mdx-remote'],
  experimental: {
    mdxRs: false /* Turned off as it doesnt work with rehype plugins */,
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
