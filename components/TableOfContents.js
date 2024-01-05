import React, { Fragment, memo } from 'react';
import { useStaticQuery, graphql, Link, useScrollRestoration } from 'gatsby';
import { slug } from 'github-slugger';
import styled from 'styled-components';
import H from '@/components/mdxComponents/Headings';
import createSectionedFrontMatter from '../lib/utils/createSectionedFrontmatter';

const StyledTOC = styled.aside`
  position: sticky;
  height: 100vh;
  top: 0;
  overflow: auto;
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
    scrollbar-color: var(--yellow) var(--light);
  }
  &::-webkit-scrollbar-track {
    background: var(--light);
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--yellow);
    border-radius: 6px;
    border: 3px solid var(--light);
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
    padding: 5px;
    border-radius: 5px;
    display: inline;
    background: transparent;
    transition: background 0.05s;
    &[aria-current='location'] {
      font-weight: 900;
      background: var(--yellow);
      padding-left: 10px;
      padding-right: 10px;
      &:before {
        color: black;
      }
    }
    &.currentSection {
    }
    &.currentPage {
      /* background: red; */
    }
    &.currentModule {
      /* background: green; */
    }
  }

  .videoNumber {
    font-size: 1rem;
    background: #f3f3f3;
    padding: 2px 5px;
    border-radius: 3px;
    margin-left: 5px;
    font-feature-settings: 'tnum';
    font-variant-numeric: tabular-nums;
  }

  & > ul {
    font-size: 1.2rem;
    /* border-left: 2px solid var(--yellow); */
    /* Level 1 */
    list-style: none;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin-top: 0;
    padding-left: 0rem;
    padding-top: 0;
    font-weight: 700;
    margin-bottom: 5rem;
    padding-left: 2px;
    & > li {
      margin-left: 3px;
      padding-left: 10px;
      border-left: 2px solid var(--lightGrey);
      padding-bottom: 1rem;
      &.currentPage {
        border-color: var(--dark);
      }
      &:hover {
        border-color: var(--yellow);
      }
    }
    & > li > a {
      display: inline-block;
      transform: translateY(-12px);
      /* Page Circle */
      &:before {
        --size: 10px;
        height: var(--size);
        width: var(--size);
        background: white;
        border: 1px solid var(--yellow);
        border-radius: 50%;
        z-index: 1;
        content: '';
        position: relative;
        transform: translateX(-21px) translateY(-12px);
        display: inline-block;
        position: absolute;
      }
    }
    ol {
      padding-left: 5px;
      margin-top: -15px;
      & > li {
        list-style: none;
        a {
          display: inline-block;
          padding: 5px 0;
          &:before {
            content: '#';
            display: inline-block;
            color: var(--yellow);
            z-index: 2;
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
    allMdx(filter: { fields: { collection: { eq: "javascript" } } }, sort: { frontmatter: { tocTitle: ASC } }) {
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

function isActive({ href, location }) {
  const [, , module, pageName] = href.split('/');
  const { hash, pathname } = location;
  const currentUrl = `${pathname}${hash}`;
  const classNames = [];
  // is this the current module?
  if (pathname.includes(module)) classNames.push('currentModule');
  // is this the current page?
  if (pathname.includes(pageName)) classNames.push('currentPage');
  // is this the current section?
  if (currentUrl === href) classNames.push('currentSection');

  return { className: classNames.join(' ') };
}

function TableOfContents({ activeId, currentPage }) {
  const {
    allMdx: { nodes },
  } = useStaticQuery(frontmatter);

  const scrollRestoration = useScrollRestoration(`toc`);

  const toc = Object.entries(createSectionedFrontMatter(nodes));
  return (
    <StyledTOC {...scrollRestoration}>
      {toc.map(([moduleName, moduleChildren]) => (
        <Fragment key={moduleName}>
          <H as="h5">Module {moduleName}</H>
          <ul>
            {moduleChildren.map((tocItem, i) => {
              const [videoNumber, ...videoTitleParts] = tocItem.tocTitle.split(' - ');
              const videoTitle = videoTitleParts.join(' - ');
              return (
                <Fragment key={`${tocItem.tocTitle}-${i}`}>
                  <li className={currentPage === `/${tocItem.slug}/` ? 'currentPage' : ''}>
                    <Link getProps={isActive} to={`/javascript/${tocItem.slug}`}>
                      {videoTitle}
                      <span className="videoNumber">Part {videoNumber}</span>
                    </Link>

                    {tocItem.tocChild ? (
                      <ol>
                        {tocItem.tocChild.map((toc2ndItem, secondIndex) => (
                          <Fragment key={`${toc2ndItem.title}-${secondIndex}`}>
                            <li>
                              <Link getProps={isActive} to={`/javascript/${tocItem.slug}/#${slug(toc2ndItem.title, false)}`} aria-current={toc2ndItem.url === `#${activeId}` ? 'location' : ''}>
                                {toc2ndItem.title}
                              </Link>

                              {toc2ndItem?.items ? (
                                <ul>
                                  {toc2ndItem.items.map((toc3rdItem, thirdIndex) => (
                                    <li key={`${toc3rdItem.title}-${thirdIndex}`}>
                                      <Link getProps={isActive} to={`/javascript/${tocItem.slug}/#${slug(toc3rdItem.title, false)}`} aria-current={toc3rdItem.url === `#${activeId}` ? 'location' : ''}>
                                        {toc3rdItem.title}
                                      </Link>
                                    </li>
                                  ))}
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
