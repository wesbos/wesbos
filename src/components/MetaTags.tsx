import { slugToTitle } from '@/utils/slugToTitle';
import { getPostBySlug } from '@/lib/getPosts';
import type { PageProps } from 'waku/router';
const baseUrl = import.meta.env.DEV ? 'http://localhost:3000' : 'https://rsc.wesbos.com';

type MetaProps = PageProps<string> & {
  section?: string;
  slug?: string;
  description?: string;
  title?: string;
};

export async function MetaTags({ path, query, section, slug, description, title: titleProp }: MetaProps) {
  let displaySlug = path; // Default to the sanme things, EG /about, /tips
  // if the route has a [section] and/or [slug] in it, we need to parse out that slug from the pathname. EG /javascript/[section]/[slug]
  if (path.startsWith('/javascript/')) {
    // grab the last two items in the pathname
    displaySlug = `${section}/${slug}`;
  } else if (slug?.startsWith('/tip/')) {
    displaySlug = `${slug}`;
  }
  // Remove stargin / from the start of the slug if it exists
  displaySlug = displaySlug.startsWith('/') ? displaySlug.slice(1) : displaySlug;
  const post = await getPostBySlug(displaySlug);
  // First we try to see if we can get a piece fo content for this page
  // If we can't, we just return the default meta
  const pageSlug = post?.frontmatter?.slug || path;
  const title = titleProp || post?.frontmatter?.title || slugToTitle(pageSlug);
  const url = `${baseUrl}${path}`;
  const image = post?.images?.[0];
  const searchParams = new URLSearchParams();
  searchParams.set('title', title);
  searchParams.set('url', url);
  image ? searchParams.set('thumbnail', image) : null;
  const ogImage = `${baseUrl}/og.jpg?${searchParams.toString()}`;
  description = description || post?.excerpt || '';
  return (
    <>
      <title>{`${title ? `${title} - ` : ''}Wes Bos`}</title>
      <meta name="description" content={description} />
      {/* Open Graph */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Wes Bos" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_CA" />
      {post?.frontmatter?.date && (
        <meta property="article:published_time" content={new Date(post.frontmatter.date).toISOString()} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@wesbos" />
      <meta name="twitter:creator" content="@wesbos" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical */}
      <link rel="canonical" href={url} />

      {/* Favicon */}
      <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="shortcut icon" href="/favicon.png" type="image/png" />
      <meta name="theme-color" content="#ffc600" />
    </>
  );
}

// export async function generateMetadata({ params }: { params: { slug: string } }, state: Record<string, any>): Promise<Metadata> {

//   const description = post?.excerpt || '';
//   return {
//     title: {
//       template: '%s - Wes Bos',
//       default: title,
//     },
//     description,
//     openGraph: {
//       type: 'article',
//       title,
//       url,
//       description,
//       siteName: 'Wes Bos',
//       images: [
//         {
//           url: ogImage,
//           width: 1200,
//           height: 630,
//         },
//       ],
//       locale: 'en_CA',
//       publishedTime: post?.frontmatter?.date ? new Date(post.frontmatter.date).toISOString() : undefined,
//     },
//     twitter: {
//       card: 'summary_large_image',
//       site: '@wesbos',
//       creator: '@wesbos',
//       title,
//       description,
//       images: [ogImage],
//     },
//     alternates: {
//       canonical: url,
//     },
//   };
// }
