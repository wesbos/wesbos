import React from 'react';
import { format } from 'date-fns';
import { readdir } from 'fs/promises';
import Link from 'next/link';
import Image from 'next/image';
import PostGrid, { PostGridItem } from '@/lib/assets/styles/PostGrid';
import { getPosts } from '@/lib/getPosts';
import H from '@/components/mdxComponents/Headings';

export default async function Blog() {
  const posts = await getPosts();
  return (
    <PostGrid>
      <h2>Blog</h2>
      {posts.map((post) => (
        <PostGridItem key={`post-${post.frontmatter.slug}`}>
          {/* <div>{post.frontmatter.image && <Image fill src={`/${post.frontmatter.image}`} />}</div> */}
          <div>
            <H as="h3">
              <Link href={post.frontmatter.slug}>{post.frontmatter.title}</Link>
            </H>
            <div className="postMeta">
              <time dateTime={post.frontmatter.date.toString()}>{format(post.frontmatter.date, 'MMMM d, yyyy')}</time>
              <ul className="categories">
                {post.frontmatter.category.map((cat) => (
                  <li key={cat}>{cat}</li>
                ))}
              </ul>
            </div>
            <p>TODO EXCERPT</p>
          </div>
        </PostGridItem>
      ))}
    </PostGrid>
  );
}

function BlogOld({ data, pageContext, location }) {
  if (!data) return <p>Shooooot! No Post found!</p>;
  return (
    <>
      {/* TODO <Pagination currentPage={pageContext.currentPage} totalCount={data.allMdx.totalCount} pathPrefix="/blog/" />
      <PostMetaTags
        post={{
          fields: {
            slug: location.pathname, // TODO: TEST
          },
          frontmatter: {
            slug: location.pathname,
            title: `Blog ${pageContext.currentPage ? `- Page ${pageContext.currentPage}` : ''}`,
          },
        }}
      /> */}
      <PostGrid>
        {data.allMdx &&
          data.allMdx.edges.map(({ node: post }) => {
            const hasImage = !!post.frontmatter.image;
            return (
              <PostGridItem key={post.id} hasImage={hasImage}>
                {post.frontmatter.image && post.frontmatter.image.childImageSharp && (
                  <div>
                    {hasImage && (
                      <Link href={post.fields.slug}>
                        <Img image={post.frontmatter.image} />
                      </Link>
                    )}
                    <div className="postMeta">
                      <time dateTime={post.frontmatter.date}>{format(new Date(post.frontmatter.date), 'MMMM d, yyyy')}</time>
                      <ul className="categories">
                        {post.frontmatter.category.map((cat) => (
                          <li key={cat}>{cat}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                <div>
                  <H as="h3">
                    <Link href={post.fields.slug}>{post.frontmatter.title}</Link>
                  </H>
                  <p>{post.excerpt}</p>
                </div>
              </PostGridItem>
            );
          })}
      </PostGrid>
      {/* <Pagination currentPage={pageContext.currentPage} totalCount={data.allMdx.totalCount} pathPrefix="/blog/" /> */}
    </>
  );
}

// export const pageQuery = graphql`
//   query blogPosts($skip: Int! = 0) {
//     site {
//       siteMetadata {
//         title
//         description
//       }
//     }
//     allMdx(filter: { fields: { collection: { eq: "post" } } }, sort: { frontmatter: { date: DESC } }, limit: 10, skip: $skip) {
//       totalCount
//       edges {
//         node {
//           id
//           excerpt
//           fields {
//             collection
//             slug
//           }
//           frontmatter {
//             title
//             date
//             slug
//             category
//             image {
//               ...ImageFields
//             }
//           }
//         }
//       }
//     }
//   }
// `;
