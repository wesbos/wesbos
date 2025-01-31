import ContentNav from '@/components/ContentNav';
import H from '@/components/mdxComponents/Headings';
import { getPostBySlug, getPosts, getSiblingPostsBySlug } from '@/lib/getPosts';
import { EditDialogStyles } from '@/styles/EditDialogStyles.module.css';
import { postMeta } from '@/styles/PostMeta.module.css';
import Image, { ImageProps } from 'next/image';
import { IoLogoGithub } from 'react-icons/io';

export default async function BlogPost({ params, children }: { params: { slug: string }, children: React.ReactNode }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const { prev, next } = await getSiblingPostsBySlug(slug, 'blog');
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
          <H>{post.frontmatter.title}</H>
          <div className={postMeta}>
            <time dateTime={post.frontmatter.date}>{post.frontmatter.date}</time>
            <span>{post.frontmatter.category.join(', ')}</span>
            <a rel="noopener noreferrer" target="_blank" href={editURL}>
              Edit Post <IoLogoGithub className="inline" />
            </a>
          </div>
        </div>
        <MDXContent />
        <div className={EditDialogStyles}>
          <p>Find an issue with this post? Think you could clarify, update or add something?</p>
          <p>All my posts are available to edit on Github. Any fix, little or small, is appreciated!</p>
          <p>
            <a target="_blank" href={editURL}>
              <IoLogoGithub /> Edit on Github
            </a>
          </p>
        </div>
        <ContentNav prev={prev} next={next} />
        {/* TODO <ContentNav pathPrefix={pageContext.pathPrefix} prev={pageContext.prev} next={pageContext.next} /> */}
      </>
    );

}
// This is what we need to pre-gen all the posts
export async function generateStaticParams() {
  const { posts } = await getPosts();
  return posts.map((post) => ({ slug: post.frontmatter.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return {
      title: 'Post not found',
    };
  }

  const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://wesbos.com'; // TODO: make this dynamic
  const url = `${baseUrl}/${post.frontmatter.slug}`;
  const image = post.images?.[0]?.src;
  const searchParams = new URLSearchParams();
  searchParams.set('title', post.frontmatter.title);
  searchParams.set('url', url);
  image ? searchParams.set('thumbnail', image) : null;
  const ogImage = `${baseUrl}/api/og-worker?${searchParams.toString()}`;

  return {
    title: `${post.frontmatter.title} - Wes Bos`,
    description: post.excerpt,
    canonical: url,
    openGraph: {
      type: 'article',
      title: post.frontmatter.title,
      url,
      authorName: 'Wes Bos',
      description: post.excerpt,
      siteName: 'Wes Bos',
      images: [{
        url: ogImage,
        width: 1200,
        height: 630,
      }],
      locale: 'en_CA',
      publishedTime: post.frontmatter.date ? new Date(post.frontmatter.date).toISOString() : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@wesbos',
      creator: '@wesbos',
      title: post.frontmatter.title,
      description: post.excerpt,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}
