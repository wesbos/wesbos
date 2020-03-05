import React from 'react';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import formatDistance from 'date-fns/formatDistance';
import { IoIosLink, IoLogoTwitter } from 'react-icons/io';
import Img from '../components/Img';
import Layout from '../components/Layout';
import H from '../components/mdxComponents/Headings';
import TipStyles from '../components/styles/TipStyles';
import Pagination from '../components/Pagination';

export default function TipsPage({ data: { allMdx: tips }, pageContext }) {
  return (
    <Layout>
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
                  <video src={url} autoPlay mute loop />
                ))}
              {tip.frontmatter.images &&
                tip.frontmatter.images.map(image => <Img image={image} />)}
            </Link>
            <div className="tipContent">
              <MDXRenderer>{tip.body}</MDXRenderer>
              <div className="tipMeta">
                <Link
                  to={`/tip/${tip.frontmatter.slug}`}
                  title="View Tip Details"
                >
                  <IoIosLink /> Deets
                </Link>
                <Link
                  to={`/tip/${tip.frontmatter.slug}`}
                  title="View Tip Details"
                >
                  <time dateTime={tip.frontmatter.date}>
                    {formatDistance(
                      new Date(tip.frontmatter.date),
                      new Date(),
                      {
                        addSuffix: true,
                      }
                    )}
                  </time>
                </Link>
                <a
                  href={tip.frontmatter.tweetURL}
                  title="Link to original tweet"
                >
                  <IoLogoTwitter class="twitter" /> Tweet
                </a>
              </div>
            </div>
          </TipStyles>
        ))}
      </div>
    </Layout>
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
