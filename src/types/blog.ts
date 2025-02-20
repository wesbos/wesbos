import type { MDXContent } from 'mdx/types';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: MDXContent;
  excerpt: string;
  publishedAt: string;
  author: {
    name: string;
    avatar: string;
  };
  tags: string[];
}
