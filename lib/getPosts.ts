import fg from 'fast-glob';
import { slug } from 'github-slugger';
import path from 'path';
import { ContentType, MDXResult } from './types';
import { parseNumberFromTitle } from '@/utils/createSectionedFrontmatter';

const PER_PAGE = 10;
type PostFilterArgs = {
  page?: number;
  skip?: number;
  limit?: number;
  type?: ContentType;
};

/**
 * Validates the content of a post. Some frontmatter is missing, so we add it in after the fact.
 * Ideally this would be done as a Remark/rehype plugin, but its too complex to do that.
 * https://bsky.app/profile/remcohaszing.nl/post/3lcxmt7aez22t
 */
export function parseContent(post: MDXResult): Promise<MDXResult> {
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

const mdxPosts = await fg(['./content/**/*.mdx']);

let postCache: MDXResult[] = [];

async function parsePosts(): Promise<MDXResult[]> {
  if(postCache.length > 0) {
    console.log(`Returning ${postCache.length} posts from cache`);
    return postCache;
  }
  console.time('🕧 Importing posts');
  // Get a list of all the mdx files in the content folder
  const importPromises = mdxPosts.map((post) => import(`../content/${makePathDynamicallyImportable(post)}.mdx`));
  console.timeLog('🕧 Importing posts', `Importing ${importPromises.length} posts`);
  const imported = await Promise.all(importPromises).catch((err) => {
    console.log(`Error reading posts from the file system`);
    console.error(err);
  });
  console.timeEnd('🕧 Importing posts');

  if(!imported) {
    throw new Error('No Content Found?!?');
  }
  console.log(`Going to parse ${imported.length} posts`);
  const posts = imported
    .map(parseContent)
    .toSorted((a, b) => {
      // If either post doesn't have a date, put it at the end
      if (!a.frontmatter.date) return 1;
      if (!b.frontmatter.date) return -1;
      // Otherwise sort by date descending
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
    });
  postCache = posts;
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

export async function getPosts({ page = 1, skip = 0, type = 'blog', limit = PER_PAGE }: PostFilterArgs = {}) {
  const allPosts = await parsePosts();
  const posts = allPosts.filter((post) => post.frontmatter.type === type);
  // Return the posts for this page
  const start = (page - 1) * limit;
  const end = start + limit;
  const postsForPage = posts.slice(start, end);

  const returnedPosts = {
    posts: postsForPage,
    total: posts.length,
    pages: Math.ceil(posts.length / limit),
  };
  return returnedPosts;
}
