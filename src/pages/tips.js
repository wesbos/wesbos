import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import H from '../components/mdxComponents/Headings';

export default function TipsPage({ data: { allMdx: tips } }) {
  console.log(tips);
  return (
    <Layout>
      <H>🔥 There are {tips.totalCount} Hot Tips</H>
      <ul>
        <li>hey</li>
        {tips.edges.map(({ node: tip }) => (
          <li key={tip.frontmatter.slug}>
            <Link to={`/tip/${tip.frontmatter.slug}`}>
              {tip.frontmatter.slug}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
    allMdx(filter: { fields: { collection: { eq: "tip" } } }) {
      totalCount
      edges {
        node {
          frontmatter {
            slug
            images {
              childImageSharp {
                fluid(maxWidth: 700) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            videos
          }
          body
        }
      }
    }
  }
`;
