import { slug } from 'github-slugger';
import path from 'node:path';
import type { ContentType, MDXResult, Frontmatter, JavaScriptFrontmatter } from './types';
import { parseNumberFromTitle } from '@/utils/createSectionedFrontmatter';
import * as mdxIndex from '../content/index';

const PER_PAGE = 10;

type PostFilterArgs<T extends ContentType = ContentType> = {
  page?: number;
  skip?: number;
  type?: T;
  limit?: number;
};

type TypeToFrontmatter<T extends ContentType> = T extends 'javascript'
  ? MDXResult<JavaScriptFrontmatter>
  : MDXResult<Frontmatter>;

type PostsReturn<T extends ContentType> = {
  posts: TypeToFrontmatter<T>[];
  total: number;
  pages: number;
};

/**
 * Validates the content of a post. Some frontmatter is missing, so we add it in after the fact.
 * Ideally this would be done as a Remark/rehype plugin, but its too complex to do that.
 * https://bsky.app/profile/remcohaszing.nl/post/3lcxmt7aez22t
 */
export function parseContent(post: MDXResult): MDXResult {
  const filename = path.basename(post.filePath, path.extname(post.filePath));
  if (!post.frontmatter.slug) {
    post.frontmatter.slug = slug(filename);
  }
  post.frontmatter.filename = post.filePath;
  post.frontmatter.folder = path.dirname(post.filePath);
  if (post.frontmatter.image) {
    post.frontmatter.imagePath = `/${path.join(path.dirname(post.filePath), post.frontmatter.image)}`;
  }
  // Also tag each one with a post type based on its folder
  if (post.frontmatter.filename.includes('content/tips/')) {
    post.frontmatter.type = 'tip';
  } else if (post.frontmatter.filename.includes('content/javascript/')) {
    post.frontmatter.type = 'javascript';
    // JS Notes need their section and content number attached to them
    const sectionNumber = parseNumberFromTitle(post.frontmatter.section || '');
    const postNumber = parseNumberFromTitle(post.frontmatter.tocTitle || '');
    post.frontmatter.sectionNumber = sectionNumber;
    post.frontmatter.postNumber = postNumber;
  } else {
    post.frontmatter.type = 'blog';
  }
  return post;
}

async function parsePosts(): Promise<MDXResult[]> {
  const posts = Object.values(mdxIndex)
    .map(parseContent)
    .toSorted((a, b) => {
      // If either post doesn't have a date, put it at the end
      if (!a.frontmatter?.date) return 1;
      if (!b.frontmatter?.date) return -1;
      // Otherwise sort by date descending
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
    });
  // (global as any)._postCache = posts;
  return posts;
}

export function makePathDynamicallyImportable(filePath: string) {
  // Due to the waay dybamic imports work in webpack, we need to make sure the path is statically analyzable, so we need to make sure the path is a string literal. This function removes the `content/` prefix and the `.mdx` suffix from the file path
  const prefix = './content/';
  const prefix2 = 'content/';
  const suffix = '.mdx';
  const filePathWithoutPrefix = filePath.replace(prefix, '').replace(prefix2, '');
  const filePathWithoutSuffix = filePathWithoutPrefix.replace(suffix, '');
  return filePathWithoutSuffix;
}

export async function getPostBySlug(postSlug: string) {
  const posts = await parsePosts();
  return posts.find((post) => post.frontmatter.slug === postSlug);
}

export async function getSiblingPostsBySlug(postSlug: string, type: ContentType) {
  const posts = (await parsePosts()).filter((post) => post.frontmatter.type === type);
  const postIndex = posts.findIndex((post) => post.frontmatter.slug === postSlug);
  if (postIndex === -1) {
    return { prev: undefined, next: undefined };
  }
  const prev = posts[postIndex - 1];
  const next = posts[postIndex + 1];
  return { prev, next };
}

export async function getPosts<T extends ContentType>(
  { page = 1, skip = 0, type = 'blog' as T, limit = PER_PAGE }: PostFilterArgs<T> = {} as PostFilterArgs<T>,
): Promise<PostsReturn<T>> {
  const allPosts = await parsePosts();
  const posts = allPosts.filter((post) => post.frontmatter.type === type);
  // Return the posts for this page
  const start = (page - 1) * limit;
  const end = limit === -1 ? undefined : start + limit;
  const postsForPage = posts.slice(start, end);

  return {
    posts: postsForPage as TypeToFrontmatter<T>[],
    total: posts.length,
    pages: Math.ceil(posts.length / limit),
  };
}
