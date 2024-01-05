import React from 'react';
import { Helmet } from 'react-helmet';
import { pathJoin } from '../lib/utils/path-join';

function getBaseURL() {
  const url = process.env.GATSBY_URL;
  if (!url || url === 'undefined') {
    // seriously
    return `http://localhost:8888`;
  }
  return url;
}

const baseURL = getBaseURL();

export function PostMetaTags({ post }) {
  // TODO: We should be using post.fields.slug, but in some pages it's passed in as "frontmatter". It should be fixed
  const slug = post.fields?.slug || post.frontmatter?.slug;
  if (!slug) {
    console.log('No slug found for post', { post });
    throw new Error('No slug found for post', { post });
  }
  const canonical = pathJoin('https://wesbos.com', slug);
  const url = pathJoin(baseURL, slug);
  const thumbnailData = {
    title: post.frontmatter.title,
    url,
    thumbnail: post.frontmatter.image?.publicURL,
  };
  /* eslint no-unused-vars: ["error", { "destructuredArrayIgnorePattern": "^_" }] */
  const thumbnailQuery = new URLSearchParams(Object.fromEntries(Object.entries(thumbnailData).filter(([_key, val]) => val !== undefined))).toString();

  const ogImage = `${baseURL}/.netlify/functions/ogimage?${thumbnailQuery}`;
  return (
    <Helmet>
      <meta name="generator" content="Wes Bos on Gatsby!" />
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
    </Helmet>
  );
}

export function TipsMetaTags({ post }) {
  const slug = post.fields?.slug || post.frontmatter?.slug;
  const canonical = pathJoin('https://wesbos.com/tip/', slug);
  const url = pathJoin(baseURL, '/tip/', slug);
  const thumbnailData = {
    title: post.excerpt,
    url,
    thumbnail: post.frontmatter.images?.[0]?.publicURL,
    cache: 'busta',
  };
  /* eslint no-unused-vars: ["error", { "destructuredArrayIgnorePattern": "^_" }] */
  const thumbnailQuery = new URLSearchParams(Object.fromEntries(Object.entries(thumbnailData).filter(([_key, val]) => val !== undefined))).toString();

  const ogImage = `${baseURL}/.netlify/functions/ogimage?${thumbnailQuery}`;
  return (
    <Helmet>
      <link rel="canonical" href={canonical} />
      <meta name="generator" content="Wes Bos on Gatsby!" />
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
      <meta property="article:published_time" content={new Date(post.frontmatter.date).toISOString()} />
      <meta property="og:site_name" content="Wes Bos" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_CA" />
      <title>{`${post.frontmatter.title} - Wes Bos`}</title>
    </Helmet>
  );
}
