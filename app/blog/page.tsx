import React from 'react';
import { format } from 'date-fns';
import Link from 'next/link';
import { getPosts } from '@/lib/getPosts';
import H from '@/components/mdxComponents/Headings';
import Pagination from '@/components/Pagination';
import { PostGrid, PostGridItem } from '@/styles/PostGrid.module.css';

export default async function Blog({ params }: { params: { pageNumber: string } }) {
  const paramz = await params;
  const currentPage = parseInt(paramz.pageNumber, 10) || 1;
  const { posts, total, pages } = await getPosts({
    page: currentPage
  });
  return (
    <>
      <Pagination currentPage={currentPage} totalPages={pages} totalCount={total} pathPrefix="/blog/" />
      <div className={PostGrid}>
        {posts.map((post) => (
          <div className={PostGridItem} key={`post-${post.frontmatter.slug}`}>
            {/* <div>{post.frontmatter.image && <Image fill src={`${post.frontmatter.imagePath}`} />}</div> */}
            <div>
              <H as="h3">
                <pre style={{
                  fontSize: 12
                }}>{JSON.stringify(post.frontmatter, null, ' ')}</pre>
                <Link href={`/${post.frontmatter.slug}`}>{post.frontmatter.title}</Link>
              </H>
              <div className="postMeta">
                <time dateTime={post.frontmatter.date.toString()}>{format(post.frontmatter.date, 'MMMM d, yyyy')}</time>
                <ul className="categories">
                  {(post.frontmatter.category || []).map((cat) => (
                    <li key={cat}>{cat}</li>
                  ))}
                </ul>
              </div>
              <p>TODO EXCERPT</p>
            </div>
          </div>
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={pages} totalCount={total} pathPrefix="/blog/" />
    </>
  );
}
