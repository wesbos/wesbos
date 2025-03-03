import type { MDXContent } from 'mdx/types';
import type { StaticImageData } from 'next/image';

export type ContentType = 'blog' | 'tip' | 'javascript'; // Blog post, hot tip, beginner javascript note

export type MDXResult<T extends Frontmatter = Frontmatter> = {
  frontmatter: T;
  default: MDXContent;
  filePath: string;
  images: StaticImageData[];
  excerpt: string;
  toc: TableOfContentsHeading[];
};

// Base Frontmatter type with common fields
type BaseFrontmatter = {
  title: string;
  slug: string;
  image: string;
  imagePath: string;
  category: string[];
  date: string;
  id: number;
  filename: string;
  folder: string;
  tweetURL?: string;
  links?: string[];
};

// Type for blog and tip content
type RegularFrontmatter = BaseFrontmatter & {
  type: 'blog' | 'tip';
  tocTitle?: string;
  section?: string;
  sectionNumber?: number;
  postNumber?: number;
};

// Type for javascript content
export type JavaScriptFrontmatter = BaseFrontmatter & {
  type: 'javascript';
  tocTitle: string;
  section: string;
  sectionNumber: number;
  postNumber: number;
};

// Union type that enforces the correct shape based on the type field
export type Frontmatter = RegularFrontmatter | JavaScriptFrontmatter;

export type TableOfContentsHeading = {
  depth: number;
  id: string;
  value: string;
  children?: TableOfContentsHeading[];
};
