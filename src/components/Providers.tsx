'use client';
import { MDXProvider } from '@mdx-js/react';
import mdxComponents from './mdxComponents';
import type { ReactNode } from 'react';

export const Providers = ({ children }: { children: ReactNode }) => {
  return <MDXProvider components={mdxComponents}>{children}</MDXProvider>;
};
