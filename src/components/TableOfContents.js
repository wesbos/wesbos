import { Fragment, memo } from 'react';
import { useStaticQuery, graphql, Link, useScrollRestoration } from 'gatsby';
import { slug } from 'github-slugger';
import H from '@/components/mdxComponents/Headings';
import createSectionedFrontMatter from '../utils/createSectionedFrontmatter';

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
    <aside className={TOCAsideStyles} {...scrollRestoration}>
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
                              <Link
                                getProps={isActive}
                                to={`/javascript/${tocItem.slug}/#${slug(toc2ndItem.title, false)}`}
                                aria-current={toc2ndItem.url === `#${activeId}` ? 'location' : ''}
                              >
                                {toc2ndItem.title}
                              </Link>

                              {toc2ndItem?.items ? (
                                <ul>
                                  {toc2ndItem.items.map((toc3rdItem, thirdIndex) => (
                                    <li key={`${toc3rdItem.title}-${thirdIndex}`}>
                                      <Link
                                        getProps={isActive}
                                        to={`/javascript/${tocItem.slug}/#${slug(toc3rdItem.title, false)}`}
                                        aria-current={toc3rdItem.url === `#${activeId}` ? 'location' : ''}
                                      >
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
    </aside>
  );
}

export default memo(TableOfContents);
