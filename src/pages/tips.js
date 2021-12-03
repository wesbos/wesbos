import React from 'react';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Helmet } from 'react-helmet';
import Img from '../components/Img';
import Layout from '../components/Layout';
import H from '../components/mdxComponents/Headings';
import TipStyles from '../components/styles/TipStyles';
import Pagination from '../components/Pagination';
import TipMeta from '../components/TipMeta';
import { PostMetaTags } from '../components/MetaTags';

export default function TipsPage({
  data: { allMdx: tips },
  pageContext,
  path,
}) {
  return (
    <>
      <Helmet>
        <title>{`Hot Tips — Page ${pageContext.currentPage}`}</title>
      </Helmet>
      <H>🔥 There are {tips.totalCount} Hot Tips</H>
      <p>
        Hot tips are spicy lil' nuggets related to web development and tooling
        that I share on{' '}
        <a href="https://twitter.com/wesbos">my twitter account</a>. I've logged
        them here to make them easier to find.
      </p>
      <Pagination
        currentPage={pageContext.currentPage}
        totalCount={tips.totalCount}
        pathPrefix="/tips/"
      />
      <div>
        {tips.edges.map(({ node: tip }, i) => (
          <TipStyles key={`${tip.frontmatter.slug}-${i}`}>
            <Link to={`/tip/${tip.frontmatter.slug}`}>
              {tip.frontmatter.videos &&
                tip.frontmatter.videos.map(url => (
                  <video src={url} key={url} autoPlay mute="true" loop />
                ))}
              {tip.frontmatter.images &&
                tip.frontmatter.images.map((image, i) => (
                  <Img image={image} key={`image${i}`} alt={tip.body} />
                ))}
            </Link>
            <div className="tipContent">
              <TipMeta tip={tip} />
              <MDXRenderer>{tip.body}</MDXRenderer>
            </div>
          </TipStyles>
        ))}
      </div>
      <PostMetaTags
        post={{
          frontmatter: {
            slug: path,
            title: `🔥 Hot Tips ${
              pageContext.currentPage ? `- Page ${pageContext.currentPage}` : ''
            }`,
          },
        }}
      />
    </>
  );
}

export const pageQuery = graphql`
  query Tips($skip: Int! = 0) {
    allMdx(
      filter: { fields: { collection: { eq: "tip" } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 10
      skip: $skip
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            slug
            date
            tweetURL
            images {
              ...ImageFields
            }
            videos
          }
          body
        }
      }
    }
  }
`;
