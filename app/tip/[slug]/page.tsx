import { Tip } from "@/components/Tip";
import { getPostBySlug } from "@/lib/getPosts";

export default async function TipPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return <div>Post not found</div>;
  }
  return <div>
    <Tip tip={post} />
  </div>;
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
  const url = `${baseUrl}/tip/${post.frontmatter.slug}`;
  const image = post.images?.[0]?.src;
  const searchParams = new URLSearchParams();
  searchParams.set('title', post.excerpt);
  searchParams.set('url', url);
  image ? searchParams.set('thumbnail', image) : null;
  const ogImage = `${baseUrl}/api/og-worker?${searchParams.toString()}`;

  return {
    title: `${post.excerpt} - Wes Bos`,
    description: post.excerpt,
    canonical: url,
    openGraph: {
      type: 'article',
      url,
      authorName: 'Wes Bos',
      // these are the sme thing in a tip. Gotta figure this out?
      title: post.excerpt,
      description: post.excerpt,
      siteName: 'Wes Bos',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_CA',
      publishedTime: post.frontmatter.date ? new Date(post.frontmatter.date).toISOString() : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@wesbos',
      creator: '@wesbos',
      title: post.excerpt,
      description: post.excerpt,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}



