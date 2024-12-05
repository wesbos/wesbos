// import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug } from '@/lib/getPosts';
import mdxComponents from '@/components/mdxComponents';
import Image, { ImageProps } from 'next/image';

export default async function JavaScriptNotesPage({ params }: { params: { slug: string; section: string } }) {
  const { slug, section } = await params;
  const post = await getPostBySlug(`${section}/${slug}`);
  if (!post) {
    return (
      <p>
        Post not found for <code>{slug}</code>
      </p>
    );
  }
  const filePath = `${post.frontmatter.filename.replace('./', '')}`;
  console.log('importing', filePath);
  // const { default: MDXContent } = await import(/* webpackExclude: /\.mp4$/ */ `@/content/${makePathDynamicallyImportable(filePath)}.mdx`);
  const { default: MDXContent } = await import(`@/content/javascript/01-the-basics/01-welcome/01-welcome.mdx`);
  console.log(MDXContent.toString());
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
            console.log(props);
            return <Image sizes="100vw" width="100" height="100" style={{ width: '100%', height: 'auto' }} {...(props as ImageProps)} />;
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
export const dynamicParams = false;
