import fg from 'fast-glob';
import { readFile } from 'fs/promises';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeMdxImportMedia from 'rehype-mdx-import-media';
import { MDXRemoteProps } from 'next-mdx-remote/rsc';
import { slug } from 'github-slugger';
import path from 'path';
import rehypeSlug from 'rehype-slug';
import { ContentType, Frontmatter, MDXResult } from './types';
import { parseNumberFromTitle } from '@/utils/createSectionedFrontmatter';
import { mdxToc, tocAttacher } from './rehype-toc';
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
// Add this near the top of the file, before the first usage
declare global {
  var cachedPosts: MDXResult[];
}

type HeadingTocItem = {
  value: string;
  url: string;
  depth: number;
  parent?: string;
  level?: number[];
};

export const nextMdxOptions: MDXRemoteProps['options'] = {
  parseFrontmatter: true,
  mdxOptions: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [
      [rehypeMdxImportMedia],
      [rehypeSlug],
      [tocAttacher, { name: 'toc' }],
      [mdxToc, { name: 'toc' }],
      // [
      //   rehypeInferDescriptionMeta({
      //     truncateSize: 100,
      //     inferDescriptionHast: true,
      //   }),
      // ],
      // [rehypeShiki, { theme: 'ayu-dark' }],
    ],
  },
};


const PER_PAGE = 10;
type PostFilterArgs = {
  page?: number;
  skip?: number;
  limit?: number;
  type?: ContentType;
};

// globalThis.cachedPosts = [] as MDXResult[];

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
  if (post.frontmatter.filename.startsWith('./content/tips')) {
    post.frontmatter.type = 'tip';
  } else if (post.frontmatter.filename.startsWith('./content/javascript')) {
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
  // if (globalThis.cachedPosts?.length) {
  //   console.log('🔍 Returning cached posts...');
  //   return globalThis.cachedPosts;
  // }
  console.log('🔍 Not cached, parsing posts...');
  // Get a list of all the mdx files in the content folder
  const mdxPosts = await fg(['./content/**/*.mdx']);
  // Read the posts from the file system using fs/promises
  // const data = await Promise.all(mdxPosts.map(async (post) => readFile(post, 'utf-8'))).catch((err) => {
  //   console.log(`Error reading posts from the file system`);
  //   console.error(err);
  // });

  const importPromises = mdxPosts.map((post) => import(`../content/${makePathDynamicallyImportable(post)}.mdx`))

  const imported = await Promise.all(importPromises).catch((err) => {
    console.log(`Error reading posts from the file system`);
    // console.error(err);
    console.log("------------------------------------------------")
    throw Error('ERror dynmaically importing posts');
  });

  if(!imported) {
    throw new Error('No Content Found?!?');
  }
  console.log(`Going to parse ${imported.length} posts`);
  console.dir(imported, { depth: null });
  const posts = imported
    .map(parseContent)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
    // // Add slug if one doesn't exist
    // .map((post, index) => {
    //   const fPath = mdxPosts[index];
    //   const filename = path.basename(fPath, path.extname(fPath));
    //   if (!post.frontmatter.slug) {
    //     post.frontmatter.slug = slug(filename);
    //   }
    //   post.frontmatter.filename = fPath;
    //   post.frontmatter.folder = path.dirname(fPath);
    //   if (post.frontmatter.image) {
    //     post.frontmatter.imagePath = `/${path.join(path.dirname(fPath), post.frontmatter.image)}`;
    //   }
    //   return post;
    // })
    // .map((post) => {
    //   // Also tag each one with a post type based on its folder
    //   if (post.frontmatter.filename.startsWith('./content/tips')) {
    //     post.frontmatter.type = 'tip';
    //   } else if (post.frontmatter.filename.startsWith('./content/javascript')) {
    //     post.frontmatter.type = 'javascript';
    //     const sectionNumber = parseNumberFromTitle(post.frontmatter.section || '');
    //     const postNumber = parseNumberFromTitle(post.frontmatter.tocTitle || '');
    //     post.frontmatter.sectionNumber = sectionNumber;
    //     post.frontmatter.postNumber = postNumber;
    //     // JS Notes need their section and content number attached to them
    //   } else {
    //     post.frontmatter.type = 'blog';
    //   }
    //   return post;
    // })
    // Attach the
  // cache them
  console.log(`📝 Caching ${posts.length} pieces of content...`);
  globalThis.cachedPosts = posts;
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
  const posts = (await parsePosts()).filter((post) => post.frontmatter.type === type);
  // Return the posts for this page
  const start = (page - 1) * limit;
  const end = start + limit;

  console.log(`Returning posts for page ${page} from ${start} to ${end}`);
  const postsForPage = posts.slice(start, end);

  const returnedPosts = {
    posts: postsForPage,
    total: posts.length,
    pages: Math.ceil(posts.length / PER_PAGE),
  };
  return returnedPosts;
}
