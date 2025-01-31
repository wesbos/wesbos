import '@/components/styles/index.css';
import React from 'react';
import { Metadata } from 'next';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import { operatorMono, radnika } from '@/lib/assets/fonts/Fonts';
import { LayoutStyles } from '@/styles/LayoutStyles.module.css';
import { ContentStyles } from '@/styles/ContentStyles.module.css';
import { getPostBySlug } from '@/lib/getPosts';
import { baseUrl } from '@/lib/meta';
import { headers } from 'next/headers';
import { slugToTitle } from '@/utils/slugToTitle';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  // TODO if (pageContext.layout === 'thumbnail') return children;
  return (
    <html lang="en" className={`${radnika.variable} ${operatorMono.variable}`}>
      <meta name="theme-color" content="#ffc600" />
      <body>
        <div
          className={LayoutStyles}
          /* className={ TODO We need the current page `
          ${location.pathname === '/' ? 'welcome' : null}
          ${pageContext.layoutClasses}`  } */
        >
          <Nav />
          <div className={ContentStyles} /* className={ TODO: pageContext.layoutClasses } */>{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}

// export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
export async function generateMetadata({ params }: { params: { slug: string } }, state: Record<string, any>): Promise<Metadata> {
  // AWful hack to get the url pathname from the state. I'm pretty sure this disabled SSG for the entire website but it is not possible to get the current URL inside of generateMetadata.
  // dumb. https://github.com/vercel/next.js/discussions/50189
  const res = Object.getOwnPropertySymbols(state || {}).map((p) => (state as any)[p]);
  const pathname = res.find((state) => state?.hasOwnProperty('url'))?.url?.pathname;
  const route = res.find((state) => state?.hasOwnProperty('route')).route;
  let slug = pathname; // Default to the sanme things, EG /about, /tips
  // if the route has a [section] and/or [slug] in it, we need to parse out that slug from the pathname. EG /javascript/[section]/[slug]
  if (route?.includes('[section]') && route?.includes('[slug]')) {
    // grab the last two items in the pathname
    slug = pathname?.split('/').slice(-2).join('/');
  } else if (route?.includes('[slug]')) {
    slug = pathname?.split('/').pop();
  }

  const post = await getPostBySlug(slug);
  // First we try to see if we can get a piece fo content for this page
  // If we can't, we just return the default meta
  const pageSlug = post?.frontmatter?.slug || slug;
  const title = post?.frontmatter?.title || slugToTitle(pageSlug);
  const url = `${baseUrl}${pathname}`;
  const image = post?.images?.[0]?.src;
  const searchParams = new URLSearchParams();
  searchParams.set('title', title);
  searchParams.set('url', url);
  image ? searchParams.set('thumbnail', image) : null;
  const ogImage = `${baseUrl}/api/og-worker?${searchParams.toString()}`;

  const description = post?.excerpt || '';
  return {
    title: {
      template: '%s - Wes Bos',
      default: title,
    },
    description,
    openGraph: {
      type: 'article',
      title,
      url,
      description,
      siteName: 'Wes Bos',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_CA',
      publishedTime: post?.frontmatter?.date ? new Date(post.frontmatter.date).toISOString() : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@wesbos',
      creator: '@wesbos',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}
