import { graphql } from 'gatsby';
import React, { Fragment } from 'react';

import H from '../components/mdxComponents/Headings';
import { PostMetaTags } from '../components/MetaTags';
import createSectionedFrontMatter from '../utils/createSectionedFrontmatter';

export default function JavaScriptPage({ data: { allMdx: javascript }, path }) {
  return (
    <>
      <H>Beginner JavaScript Notes</H>
      <p>
        This is a resource for the Beginner JavaScript course that contains
        notes and extra tidbits.
      </p>
      <H as="h2">Table of Contents</H>
      <div>
        {createSectionedFrontMatter(javascript.nodes).map((section) => (
          <Fragment key={Object.keys(section)[0]}>
            <H as="h3">{Object.keys(section)[0]}</H>
            <ul>
              {Object.values(section)[0].map((tocItem) => (
                <li key={tocItem.tocTitle}>
                  <a href={`/beginner-javascript-notes/${tocItem.slug}`}>
                    {tocItem.tocTitle}
                  </a>
                </li>
              ))}
            </ul>
          </Fragment>
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
          section
        }
      }
    }
  }
`;
