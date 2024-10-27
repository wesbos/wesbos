// import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getPosts, mdxOptions, nextMdxOptions } from '@/lib/getPosts';
import mdxComponents from '@/components/mdxComponents';
import rehypeMdxImportMedia from 'rehype-mdx-import-media';

import { compile, evaluate, run } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import remarkGfm from 'remark-gfm';
import Image, { ImageProps } from 'next/image';

export default async function JavaScriptNotesPage({ params }: { params: { slug: string, section: string } }) {
  const post = await getPostBySlug(`${params.section}/${params.slug}`);
  if(!post) {
    return (
      <p>
        Post not found for <code>{params.slug}</code>
      </p>
    );
  }
  console.log(post);
  const filePath = `${post.frontmatter.filename.replace('./', '')}`;
  console.log('importing', filePath);
  // Webpack Dynamic Imports makes a module of everything in `../..` - which was my project root!
  // const { default: MDXContent } = await import(`../../${filePath}`);
  // Tell webpack about the folder where I am dynamically pulling from, fixed it:
  const { default: MDXContent } = await import(`../../../../content/${filePath}`);
  // const COM = import(`../../posts/${post.frontmatter.filename}`);
  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div>
      <p>{filePath}</p>
      <h2>{post.frontmatter.title}</h2>
      <MDXContent
        components={{
          img: (props) => {
            return <Image sizes="100vw" style={{ width: '100%', height: 'auto' }} {...(props as ImageProps)} />;
          },
        }}
      />
    </div>
  );
}
// This is what we need to pre-gen all the posts
// export async function generateStaticParams() {
//   const { posts } = await getPosts();
//   return posts.map((post) => ({ slug: post.frontmatter.slug }));
// }
