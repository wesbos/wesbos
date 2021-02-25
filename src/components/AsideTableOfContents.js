import React, { Fragment, memo } from 'react';
import { slug } from 'github-slugger';
import styled from 'styled-components';
import H from './mdxComponents/Headings';

const StyledAside = styled.aside`
  order: -1;

  @media (min-width: 1600px) {
    position: sticky;
    top: 2rem;
    align-self: start;
    order: 1;
  }
`;

function AsideTableOfContents({ tableOfContents }) {
  return (
    <StyledAside>
      <H as="h4">ON THIS PAGE</H>
      {Object.keys(tableOfContents).length !== 0 ? (
        <ul>
          {tableOfContents?.items?.map((toc1stItem) => (
            <Fragment key={toc1stItem.title}>
              <li key={toc1stItem.title}>
                <a href={`#${slug(toc1stItem.title, true)}`}>
                  {toc1stItem.title}
                </a>
              </li>
              {toc1stItem?.items?.length ? (
                <ul>
                  {toc1stItem.items.map((toc2ndItem) => (
                    <Fragment key={toc2ndItem.title}>
                      <li>
                        <a href={`#${slug(toc2ndItem.title, true)}`}>
                          {toc2ndItem.title}
                        </a>
                      </li>
                      {toc2ndItem?.items?.length ? (
                        <ul>
                          {toc2ndItem.items.map((toc3rdItem) => (
                            <li key={toc3rdItem.title}>
                              <a href={`#${slug(toc3rdItem.title, true)}`}>
                                {toc3rdItem.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </Fragment>
                  ))}
                </ul>
              ) : null}
            </Fragment>
          ))}
        </ul>
      ) : null}
    </StyledAside>
  );
}

export default memo(AsideTableOfContents);
