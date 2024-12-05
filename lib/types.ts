import { MDXRemoteSerializeResult } from 'next-mdx-remote/rsc';

export type ContentType = 'blog' | 'tip' | 'javascript'; // Blog post, hot tip, beginner javascript note

export type MDXResult = MDXRemoteSerializeResult<undefined, Frontmatter>
export type Frontmatter = {
  title: string;
  slug: string;
  image: string;
  category: string[];
  date: Date;
  id: number;
  filename: string;
  type: ContentType;
  folder: string;
};

export type JavaScriptFrontmatter = Frontmatter & {
  tocTitle: string;
  title:  string;
  slug: string;
  section:  string;
  sectionNumber: number;
  postNumber: number;
}
