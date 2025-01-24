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

// import mdxComponents from '@/components/mdxComponents';

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

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const paramz = await params;
  const headersList = await headers(); // using headers opts out of dynamic renderings. MEH
  const slug = headersList.get('x-invoke-path');
  console.log('slug', slug);
  const post = await getPostBySlug(slug || paramz.slug);
  // First we try to see if we can get a piece fo content for this page
  // If we can't, we just return the default meta
  const pageSlug = post?.frontmatter?.slug || slug;
  const title = post?.frontmatter?.title || slug.replace(/-/g, ' ');
  const url = `${baseUrl}/${pageSlug}`;
  const image = post?.images?.[0]?.src;
  const searchParams = new URLSearchParams();
  searchParams.set('title', title);
  searchParams.set('url', url);
  image ? searchParams.set('thumbnail', image) : null;
  const ogImage = `${baseUrl}/api/og-worker?${searchParams.toString()}`;

  return {
    title: `${title} - Wes Bos`,
    description: post?.excerpt,
    canonical: url,
    openGraph: {
      type: 'article',
      title,
      url,
      authorName: 'Wes Bos',
      description: post?.excerpt,
      siteName: 'Wes Bos',
      images: [{
        url: ogImage,
        width: 1200,
        height: 630,
      }],
      locale: 'en_CA',
      publishedTime: post?.frontmatter?.date ? new Date(post.frontmatter.date).toISOString() : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@wesbos',
      creator: '@wesbos',
      title,
      description: post?.excerpt,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}
