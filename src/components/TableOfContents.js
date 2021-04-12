import React, { Fragment, memo } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { slug } from 'github-slugger';
import styled from 'styled-components';
import H from './mdxComponents/Headings';
import createSectionedFrontMatter from '../utils/createSectionedFrontmatter';

const StyledTOC = styled.aside`
  display: none;

  @media (min-width: 1600px) {
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 1rem;
    align-self: start;
    overflow-y: auto;
    height: calc(100vh - 20px);
    padding-right: 2rem;
  }

  /* Scrollbar Styles */
  &::-webkit-scrollbar {
    width: 12px;
  }
  & {
    scrollbar-width: thin;
    scrollbar-color: var(--yellow) var(--dark);
  }
  &::-webkit-scrollbar-track {
    background: var(--dark);
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--yellow);
    border-radius: 6px;
    border: 3px solid var(--dark);
  }

  h4 {
    margin: 1.8rem;
  }

  h5 {
    margin: 1.5rem;
  }

  li a::before {
    display: none;
  }

  li a {
    text-decoration: none;
  }

  li a:hover,
  li a:focus {
    text-decoration: underline;
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
        tableOfContents
      }
    }
  }
`;

function TableOfContents() {
  const {
    allMdx: { nodes },
  } = useStaticQuery(frontmatter);

  function createToc() {
    return Object.entries(createSectionedFrontMatter(nodes));
  }

  return (
    <StyledTOC>
      <H as="h4">Table of Contents</H>
      {createToc().map((section) => (
        <Fragment key={section[0]}>
          <H as="h5">{section[0]}</H>
          <ul>
            {section[1].map((tocItem) => (
              <Fragment key={tocItem.tocTitle}>
                <li>
                  <a href={`/javascript/${tocItem.slug}`}>{tocItem.tocTitle}</a>
                </li>
                {tocItem.tocChild ? (
                  <ol>
                    {tocItem.tocChild.map((toc2ndItem) => (
                      <Fragment key={toc2ndItem.title}>
                        <li>
                          <a
                            href={`/javascript/${tocItem.slug}/#${slug(
                              toc2ndItem.title,
                              true
                            )}`}
                          >
                            {toc2ndItem.title}
                          </a>
                        </li>
                        {toc2ndItem?.items ? (
                          <ul>
                            {toc2ndItem.items.map((toc3rdItem) => (
                              <li key={toc3rdItem.title}>
                                <a
                                  href={`/javascript/${tocItem.slug}/#${slug(
                                    toc3rdItem.title,
                                    true
                                  )}`}
                                >
                                  {toc3rdItem.title}
                                </a>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </Fragment>
                    ))}
                  </ol>
                ) : null}
              </Fragment>
            ))}
          </ul>
        </Fragment>
      ))}
    </StyledTOC>
  );
}

export default memo(TableOfContents);
