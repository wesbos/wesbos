import fg from 'fast-glob';
import { readFile, readdir } from 'fs/promises';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeInferDescriptionMeta from 'rehype-infer-description-meta';
import rehypeMdxImportMedia from 'rehype-mdx-import-media'
import { MDXRemoteProps, MDXRemoteSerializeResult, compileMDX } from 'next-mdx-remote/rsc';
import { slug } from 'github-slugger';
import { type Plugin } from 'unified';
// import { type Root } from 'mdast';
import { visit } from 'unist-util-visit';
// import { toString } from 'mdast-util-to-string';
import path from 'path';
import rehypeShiki from '@shikijs/rehype';
import { ContentType, Frontmatter } from './types';
import { parseNumberFromTitle } from '@/utils/createSectionedFrontmatter';

// const gatsbyConfig = {
//   resolve: 'gatsby-plugin-mdx',
//     options: {
//     mdxOptions: {
//       remarkPlugins: [
//         [
//           remarkPlugin,
//           {
//             theme: `Cobalt2`,
//             extensions: [`theme-cobalt2`],
//           },
//         ],
//       ],
//         },
//     gatsbyRemarkPlugins: [
//       // `gatsby-remark-embedder`,
//       `gatsby-remark-copy-linked-files`,
//       // {
//       //   resolve: 'gatsby-remark-vscode',
//       //   options: {
//       //     theme: `Cobalt2`,
//       //     extensions: [`theme-cobalt2`],
//       //   },
//       // },
//       {
//         resolve: 'gatsby-remark-images',
//         options: {
//           maxWidth: 1500,
//           linkImagesToOriginal: false,
//           withWebp: true,
//         },
//       },
//       {
//         resolve: `gatsby-remark-autolink-headers`,
//         options: {
//           maintainCase: false,
//           icon: `<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`,
//           offsetY: `100`,
//           className: `hash-anchor`,
//         },
//       },
//     ],
//       },
// },

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
    rehypePlugins: [
      [rehypeMdxImportMedia]

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

// https://github.com/hashicorp/next-mdx-remote/issues/395
const remarkTocHeadings: Plugin<[{ exportRef: HeadingTocItem[] }], Root> = function (options, ...what) {
  // console.log({ options });
  return (tree) =>
    visit(tree, 'heading', (node, index, parent) => {
      const textContent = toString(node);
      const parentType = parent?.type;
      options.exportRef.push({
        value: textContent,
        url: `#${slug(textContent)}`,
        depth: node.depth,
        parent: parentType,
      });
    });
};

const PER_PAGE = 10;
type PostFilterArgs = {
  page?: number;
  skip?: number;
  limit?: number;
  type?: ContentType
}

let cachedPosts: MDXRemoteSerializeResult<undefined, Frontmatter>[] = [];
async function parsePosts() {
  if(cachedPosts.length) {
    return cachedPosts;
  }
  // Read the posts from the file system
  const mdxPosts = await fg(['./content/**/*.mdx']);
  console.log(`Found ${mdxPosts.length} posts`);
  // Read the posts from the file system using fs/promises
  const data = await Promise.all(mdxPosts.map(async (post) => readFile(post, 'utf-8'))).catch((err) => {
    console.log(`Error reading posts from the file system`);
    console.error(err);
  });

  if (!data) {
    throw new Error('No Content Found?!?');
  }

  const toc = [];
  // parse the frontmatter from the posts
  const parsed = await Promise.all(data.map((post: string) => serialize<undefined, Frontmatter>(post, nextMdxOptions)));

  // attach raw source to the parsed mdx
  parsed.forEach((post, index) => {
    post.rawSource = data[index];
  });


  const posts = parsed
    // Add slug if one doesn't exist
    .map((post, index) => {
      const fPath = mdxPosts[index];
      const filename = path.basename(fPath, path.extname(fPath));
      if (!post.frontmatter.slug) {
        post.frontmatter.slug = slug(filename);
      }
      post.frontmatter.filename = fPath;
      post.frontmatter.folder = path.dirname(fPath);
      if(post.frontmatter.image) {
        post.frontmatter.imagePath = `/${path.join(path.dirname(fPath), post.frontmatter.image) }`;
      }

      return post;
    })
    .map((post) => {
      // Also tag each one with a post type based on its folder
      if(post.frontmatter.filename.startsWith('./content/tips')) {
        post.frontmatter.type = 'tip';
      } else if(post.frontmatter.filename.startsWith('./content/javascript')) {
        post.frontmatter.type = 'javascript';
        const sectionNumber = parseNumberFromTitle(post.frontmatter.section);
        const postNumber = parseNumberFromTitle(post.frontmatter.tocTitle);
        post.frontmatter.sectionNumber = sectionNumber;
        post.frontmatter.postNumber = postNumber;
        // JS Notes need their section and content number attached to them
      } else {
        post.frontmatter.type = 'blog';
      }
      return post;
    })
    // Attach the
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
  // cache them
  cachedPosts = posts;
  return posts;
}

export function makePathDynamicallyImportable(filePath: string) {
  // Due to the waay dybamic imports work in webpack, we need to make sure the path is statically analyzable, so we need to make sure the path is a string literal. This function removes the `content/` prefix and the `.mdx` suffix from the file path
  const prefix = 'content/';
  const suffix = '.mdx';
  const filePathWithoutPrefix = filePath.replace(prefix, '');
  const filePathWithoutSuffix = filePathWithoutPrefix.replace(suffix, '');
  return filePathWithoutSuffix;
}

export async function getPostBySlug(slug: string) {
  const posts = await parsePosts();
  return posts.find((post) => post.frontmatter.slug === slug);
}

export async function getPosts({ page = 1, skip = 0, type = 'blog', limit = PER_PAGE }: PostFilterArgs = {}) {
  const posts = (await parsePosts()).filter((post) => post.frontmatter.type === type);
  // Return the posts for this page
  const start = (page - 1) * limit;
  const end = start + limit;

  console.log(`Returning posts for page ${page} from ${start} to ${end}`);
  const postsForPage = posts.slice(start, end);

  const returnedPosts =  {
    posts: postsForPage,
    total: posts.length,
    pages: Math.ceil(posts.length / PER_PAGE),
  };
  return returnedPosts;
}

getPosts();
