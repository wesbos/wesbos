import mdxComponents from '@/components/mdxComponents';
import H from '@/components/mdxComponents/Headings';
import { getPostBySlug, getPosts } from '@/lib/getPosts';
import { EditDialogStyles } from '@/styles/EditDialogStyles.module.css';
import { postMeta } from '@/styles/PostMeta.module.css';
import Image, { ImageProps } from 'next/image';
import { IoLogoGithub } from 'react-icons/io';

export default async function BlogPost({ params, children }: { params: { slug: string }, children: React.ReactNode }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return <p>Post not found</p>;
  }
  const { default: MDXContent } = post;
  const editURL = `https://github.com/wesbos/wesbos/tree/master/src/TODO`;
  const image = post.images?.[0];

    return (
      <>
        {image && <Image src={image} alt={post.frontmatter.title} />}
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

// or Dynamic metadata
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return {
      title: 'Post not found',
    };
  }

  const url = `https://wesbos.com/${post.frontmatter.slug}`;
  /*
      <link rel="canonical" href={canonical} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@wesbos" />
      <meta name="twitter:creator" content="@wesbos" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={post.frontmatter.title} />
      <meta name="twitter:description" content={post.excerpt} />
      <meta name="twitter:image" content={ogImage} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={post.frontmatter.title} />
      <meta property="og:url" content={url} />
      <meta property="og:description" content={post.excerpt} />
      {post.frontmatter.date ? <meta property="article:published_time" content={new Date(post.frontmatter.date).toISOString()} /> : null}
      <meta property="og:site_name" content="Wes Bos" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_CA" />
      <title>{`${post.frontmatter.title} - Wes Bos`}</title>
  */
  return {

  }
}
