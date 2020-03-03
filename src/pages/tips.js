import React from 'react';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import formatDistance from 'date-fns/formatDistance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Img from '../components/Img';
import Layout from '../components/Layout';
import H from '../components/mdxComponents/Headings';
import TipStyles from '../components/styles/TipStyles';

export default function TipsPage({ data: { allMdx: tips } }) {
  console.log(tips);
  return (
    <Layout>
      <H>🔥 There are {tips.totalCount} Hot Tips</H>
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
                <Link to={`/tip/${tip.frontmatter.slug}`}>
                  <FontAwesomeIcon icon="link" />
                  View Tip →
                </Link>
                <time>
                  {formatDistance(new Date(tip.frontmatter.date), new Date(), {
                    addSuffix: true,
                  })}
                </time>
                Original Tweet
              </div>
            </div>
          </TipStyles>
        ))}
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
    allMdx(
      filter: { fields: { collection: { eq: "tip" } } }
      sort: { fields: [frontmatter___date], order: DESC }
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
