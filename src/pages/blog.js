import React from 'react';
import { Link, graphql } from 'gatsby';
import format from 'date-fns/format';
import Img from '../components/Img';
import PostGrid, { PostGridItem } from '../styles/PostGrid';
import H from '../components/mdxComponents/Headings';
import Pagination from '../components/Pagination';
import { PostMetaTags } from '../components/MetaTags';

const Blog = function({ data, pageContext, path }) {
  if (!data) return <p>Shooooot! No Post found!</p>;
  return (
    <>
      <Pagination
        currentPage={pageContext.currentPage}
        totalCount={data.allMdx.totalCount}
        pathPrefix="/blog/"
      />
      <PostMetaTags
        post={{
          frontmatter: {
            slug: path,
            title: `Blog ${
              pageContext.currentPage ? `- Page ${pageContext.currentPage}` : ''
            }`,
          },
        }}
      />
      <PostGrid>
        {data.allMdx &&
          data.allMdx.edges.map(function({ node: post }) {
            return (
              <PostGridItem key={post.id}>
                {post.frontmatter.image &&
                  post.frontmatter.image.childImageSharp && (
                    <div>
                      <Link to={post.fields.slug}>
                        <Img image={post.frontmatter.image} />
                      </Link>
                      <div className="postMeta">
                        <time dateTime={post.frontmatter.date}>
                          {format(
                            new Date(post.frontmatter.date),
                            'MMMM d, yyyy'
                          )}
                        </time>
                        <ul className="categories">
                          {post.frontmatter.category.map(cat => (
                            <li key={cat}>{cat}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                <div>
                  <H as="h3">
                    <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
                  </H>
                  <p>{post.excerpt}</p>
                </div>
              </PostGridItem>
            );
          })}
      </PostGrid>
    </>
  );
};

export default Blog;

export const pageQuery = graphql`
  query blogPosts($skip: Int! = 0) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMdx(
      filter: { fields: { collection: { eq: "post" } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 10
      skip: $skip
    ) {
      totalCount
      edges {
        node {
          id
          excerpt
          fields {
            collection
            slug
          }
          frontmatter {
            title
            date
            category
            image {
              ...ImageFields
            }
          }
        }
      }
    }
  }
`;
