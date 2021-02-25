import React, { memo, Fragment } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import H from './mdxComponents/Headings';
import createSectionedFrontMatter from '../utils/createSectionedFrontmatter';

const StyledTOC = styled.div`
  display: none;

  @media (min-width: 1600px) {
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 2rem;
    align-self: start;
    overflow-y: auto;
    height: calc(100vh - 55px);
  }
`;

const frontmatter = graphql`
  query Frontmatter {
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

function TableOfContents() {
  const data = useStaticQuery(frontmatter);

  return (
    <StyledTOC>
      <H as="h4">Table of Contents</H>
      {createSectionedFrontMatter(data.allMdx.nodes).map((section) => (
        <Fragment key={Object.keys(section)[0]}>
          <H as="h5">{Object.keys(section)[0]}</H>
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
    </StyledTOC>
  );
}

export default memo(TableOfContents);
