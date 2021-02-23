import { graphql } from 'gatsby';
import React from 'react';
import H from '../components/mdxComponents/Headings';
import { PostMetaTags } from '../components/MetaTags';

export default function JavaScriptPage({ data: { allMdx: javascript }, path }) {
  return (
    <>
      <H>Beginner JavaScript</H>
      <p>
        This is a resource for the Beginner JavaScript course that contains
        notes and extra tidbits.
      </p>
      <H as="h2">Table of Contents</H>

      <div>
        {javascript.nodes.map((item) => (
          <a
            key={item.frontmatter.tocTitle}
            href={`/javascript/${item.frontmatter.slug}`}
          >
            <H as="h4">{item.frontmatter.tocTitle}</H>
          </a>
        ))}
      </div>

      <PostMetaTags
        post={{
          frontmatter: {
            slug: path,
            title: `Beginner JavaScript Notes`,
          },
        }}
      />
    </>
  );
}

export const pageQuery = graphql`
  query JavaScript {
    allMdx(
      filter: { fields: { collection: { eq: "javascript" } } }
      sort: { fields: frontmatter___tocTitle }
    ) {
      nodes {
        frontmatter {
          tocTitle
          slug
        }
      }
    }
  }
`;
