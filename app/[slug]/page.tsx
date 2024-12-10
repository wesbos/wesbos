import ContentNav from '@/components/ContentNav';
import mdxComponents from '@/components/mdxComponents';
import H from '@/components/mdxComponents/Headings';
import { getPostBySlug, getPosts, makePathDynamicallyImportable } from '@/lib/getPosts';
import { EditDialogStyles } from '@/styles/EditDialogStyles.module.css';
import { postMeta } from '@/styles/PostMeta.module.css';
import Image, { ImageProps } from 'next/image';
import { IoLogoGithub } from 'react-icons/io';

export default async function BlogPost({ params, children }: { params: { slug: string, section: string }, children: React.ReactNode }) {
  const { slug, section } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return <p>Post not found</p>;
  }
  const importPath = makePathDynamicallyImportable(post.frontmatter.filename);
  const importPathMade = `@/content/${importPath}.mdx`;
  console.log(importPath);
  const { default: MDXContent } = await import(/* webpackExclude: /\.mp4$/ */ `@/content/${importPath}.mdx`);


    const editURL = `https://github.com/wesbos/wesbos/tree/master/src/TODO`;

    return (
      <>
        {/* <Img image={post.frontmatter.image} alt={post.frontmatter.title} /> */}
        <div>
          {/* <PostMetaTags post={post} /> */}
          <H>{post.frontmatter.title}</H>
          <div className={postMeta}>
            <time dateTime={post.frontmatter.date}>{post.frontmatter.date}</time>
            <span>{post.frontmatter.category.join(', ')}</span>
            <a rel="noopener noreferrer" target="_blank" href={editURL}>
              Edit Post <IoLogoGithub className='inline' />
            </a>
          </div>
        </div>
              <MDXContent
        components={{
          img: (props) => {
            return <Image sizes="100vw" style={{ width: '100%', height: 'auto' }} {...(props as ImageProps)} />;
          },
          ...mdxComponents
        }}
      />
        <div className={EditDialogStyles}>
          <p>Find an issue with this post? Think you could clarify, update or add something?</p>
          <p>All my posts are available to edit on Github. Any fix, little or small, is appreciated!</p>
          <p>
            <a target="_blank" href={editURL}>
              <IoLogoGithub /> Edit on Github
            </a>
          </p>
        </div>
        {/* TODO <ContentNav pathPrefix={pageContext.pathPrefix} prev={pageContext.prev} next={pageContext.next} /> */}
      </>
    );

}
// This is what we need to pre-gen all the posts
export async function generateStaticParams() {
  const { posts } = await getPosts();
  return posts.map((post) => ({ slug: post.frontmatter.slug }));
}
