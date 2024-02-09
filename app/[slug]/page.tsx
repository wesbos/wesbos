import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPosts, mdxOptions, nextMdxOptions } from '@/lib/getPosts';
import mdxComponents from '@/components/mdxComponents';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const posts = await getPosts();
  const post = posts.find((p) => p.frontmatter.slug === params.slug);
  if (!post) {
    return <p>Post not found</p>;
  }
  return (
    <div>
      <h2>{post.frontmatter.title}</h2>
      <MDXRemote options={nextMdxOptions} source={post.rawSource} components={mdxComponents} />
    </div>
  );
}
// This is what we need to pre-gen all the posts
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.frontmatter.slug }));
}
