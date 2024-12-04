import withMDX_ from '@next/mdx';
import rehypeMdxImportMedia from 'rehype-mdx-import-media';


const withMDX = withMDX_({
  options: {
    /* webpackExclude: /\.noimport\.json$/ */
    // rehypePlugins: [rehypeMdxImportMedia],
  }
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // transpilePackages: ['next-mdx-remote'],
  compiler: {
    styledComponents: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withMDX(nextConfig);
