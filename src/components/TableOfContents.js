import React, { Fragment, memo } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { slug } from 'github-slugger';
import styled from 'styled-components';
import H from './mdxComponents/Headings';
import createSectionedFrontMatter from '../utils/createSectionedFrontmatter';

const StyledTOC = styled.aside`
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
    margin: 1.5rem 0;
  }
  ol,
  ul {
    padding-left: 3rem;
  }

  a {
    padding: 5px 0;
    display: inline-block;
  }

  .videoNumber {
    font-size: 1rem;
    background: #f3f3f3;
    padding: 2px 5px;
    border-radius: 3px;
    margin-left: 5px;
    /* position: absolute; */
    /* left: 0; */
    /* transform: translateX(-160%); */
    font-feature-settings: 'tnum';
    font-variant-numeric: tabular-nums;
  }

  & > ul {
    padding-left: 20px;
    font-size: 1.2rem;
    border-left: 2px solid var(--yellow);
    /* Level 1 */
    list-style: none;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin-top: 0;
    padding-left: 1rem;
    padding-top: 0;
    font-weight: 700;
    margin-left: 1rem;
    margin-bottom: 5rem;
    & > li {
      margin-bottom: 1rem;
    }
    & > li > a {
      display: block;
      &:before {
        --size: 10px;
        height: var(--size);
        width: var(--size);
        background: white;
        display: block;
        border: 1px solid var(--yellow);
        border-radius: 50%;
        z-index: 1;
        content: '';
        bottom: 0;
        position: relative;
        transform: translateX(-16px) translateY(15px);
      }
    }
    ol {
      padding-left: 0;
      margin-left: 3px;
      & > li {
        /* padding-bottom: 1rem; */
        list-style: none;
        a {
          display: block;
          &:before {
            content: '#';
            display: inline-block;
            color: var(--yellow);
            margin-right: 0.5rem;
            position: relative;
            height: auto;
            transform: none;
            background: none;
            width: auto;
            bottom: auto;
            font-weight: 600;
          }
        }
      }
      ul {
        padding-left: 1.5rem;
        list-style: none;
        a {
          padding: 2px 0;
        }
      }
    }
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
      {createToc().map(([moduleName, moduleChildren]) => (
        <Fragment key={moduleName}>
          <H as="h5">Module {moduleName}</H>
          <ul>
            {moduleChildren.map((tocItem, i) => {
              const [videoNumber, ...videoTitleParts] = tocItem.tocTitle.split(
                ' - '
              );
              const videoTitle = videoTitleParts.join(' - ');
              return (
                <Fragment key={`${tocItem.tocTitle}-${i}`}>
                  <li>
                    <Link to={`/javascript/${tocItem.slug}`}>
                      {videoTitle}
                      <span className="videoNumber">Part {videoNumber}</span>
                    </Link>

                    {tocItem.tocChild ? (
                      <ol>
                        {tocItem.tocChild.map((toc2ndItem, secondIndex) => (
                          <Fragment key={`${toc2ndItem.title}-${secondIndex}`}>
                            <li>
                              <Link
                                to={`/javascript/${tocItem.slug}/#${slug(
                                  toc2ndItem.title,
                                  true
                                )}`}
                              >
                                {toc2ndItem.title}
                              </Link>

                              {toc2ndItem?.items ? (
                                <ul>
                                  {toc2ndItem.items.map(
                                    (toc3rdItem, thirdIndex) => (
                                      <li
                                        key={`${toc3rdItem.title}-${thirdIndex}`}
                                      >
                                        <Link
                                          to={`/javascript/${
                                            tocItem.slug
                                          }/#${slug(toc3rdItem.title, true)}`}
                                        >
                                          {toc3rdItem.title}
                                        </Link>
                                      </li>
                                    )
                                  )}
                                </ul>
                              ) : null}
                            </li>
                          </Fragment>
                        ))}
                      </ol>
                    ) : null}
                  </li>
                </Fragment>
              );
            })}
          </ul>
        </Fragment>
      ))}
    </StyledTOC>
  );
}

export default memo(TableOfContents);
