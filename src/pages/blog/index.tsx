import React from "react";
import { format } from "date-fns";
import { getPosts } from "@/lib/getPosts";
import H from "@/components/mdxComponents/Headings";
import Pagination from "@/components/Pagination";
import { PostGrid, PostGridItem, postMeta } from "@/styles/PostGrid.module.css";
import { Link } from "waku";

export default async function Blog({
  page,
}: {
  page: string;
}) {
  const currentPage = parseInt(page || "1");
  const { posts, total, pages } = await getPosts({
    page: currentPage,
  });
  return (
    <>
      <Pagination
        currentPage={currentPage}
        totalPages={pages}
        totalCount={total || 10}
        pathPrefix="/blog/"
      />
      <div className={PostGrid}>
        {posts.map((post) => (
          <div className={PostGridItem} key={`post-${post.frontmatter.slug}`}>
            {post.images?.[0] && (
              <img src={post.images[0]} alt={post.frontmatter.title} />
            )}
            <div>
              <H as="h3">
                <Link to={`/${post.frontmatter.slug}`}>
                  {post.frontmatter.title}
                </Link>
              </H>
              <div className={postMeta}>
                <time dateTime={post.frontmatter.date.toString()}>
                  {format(post.frontmatter.date, "MMMM d, yyyy")}
                </time>
                <ul className="categories">
                  {(post.frontmatter.category || []).map((cat) => (
                    <li key={cat}>{cat}</li>
                  ))}
                </ul>
              </div>
              <p>{post.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
       <Pagination
        currentPage={currentPage}
        totalPages={pages}
        totalCount={total}
        pathPrefix="/blog/"
      />
    </>
  );
}
