import fg from 'fast-glob';
import { readFile, readdir } from 'fs/promises';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeInferDescriptionMeta from 'rehype-infer-description-meta';
import { compileMDX } from 'next-mdx-remote/rsc';
import { slug } from 'github-slugger';

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

import { type Plugin } from 'unified';
import { type Root } from 'mdast';
import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';
import path from 'path';
import { Frontmatter } from './types';

type HeadingTocItem = {
  value: string;
  url: string;
  depth: number;
  parent?: string;
  level?: number[];
};

export const nextMdxOptions = {
  parseFrontmatter: true,
  mdxOptions: {
    rehypePlugins: [
      [
        rehypeInferDescriptionMeta({
          truncateSize: 100,
          inferDescriptionHast: true,
        }),
      ],
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

export async function getPosts() {
  // Read the posts from the file system
  const mdxPosts = await fg('./posts/**/*.mdx');
  // Read the posts from the file system using fs/promises
  const data = await Promise.all(mdxPosts.map(async (post) => readFile(post, 'utf-8'))).catch((err) => {
    console.log(`Error reading posts from the file system`);
    console.error(err);
  });

  if (!data) {
    throw new Error('No Content Found?!?');
  }

  const toc = [];

  const xxx = await compileMDX({
    source: data[1],
    options: {
      parseFrontmatter: true,
      scope: { toc: [] },
      mdxOptions: {
        remarkPlugins: [[remarkTocHeadings, { exportRef: toc }]],
        rehypePlugins: [
          rehypeInferDescriptionMeta({
            inferDescriptionHast: true,
          }),
        ],
        format: 'mdx',
      },
    },
    // scope: {},
    // mdxOptions: {
    //   rehypePlugins: [rehypeInferDescriptionMeta()],
    // },
  });
  // console.log({ toc }, xxx);
  // parse the frontmatter from the posts
  const parsed = await Promise.all(data.map((post: string) => serialize<undefined, Frontmatter>(post, nextMdxOptions)));

  // attach raw source to the parsed mdx
  parsed.forEach((post, index) => {
    post.rawSource = data[index];
  });

  // console.log(parsed.at(1));

  // Sort by date
  const posts = parsed
    // Add slug if one doesn't exist
    .map((post, index) => {
      const fPath = mdxPosts[index];
      const filename = path.basename(fPath, path.extname(fPath));
      if (!post.frontmatter.slug) {
        post.frontmatter.slug = slug(filename);
      }
      return post;
    })
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
  return posts;
}

getPosts();
