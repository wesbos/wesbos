import { graphql, Link } from 'gatsby';
import React, { Fragment } from 'react';

import H from '../components/mdxComponents/Headings';
import { PostMetaTags } from '../components/MetaTags';
import createSectionedFrontMatter from '../utils/createSectionedFrontmatter';

export default function JavaScriptPage({ data: { allMdx: javascript }, path }) {
  function createToc() {
    return Object.entries(createSectionedFrontMatter(javascript.nodes));
  }
  /* prettier-ignore */
  return (
    <>
      <H>JavaScript Notes &amp; Reference</H>
      <p>Hey! Welcome to my Beginner JavaScript Notes + Reference.</p>
      <p>
        These notes are a free resource, based on my <a href="https://BeginnerJavaScript.com"> Beginner JavaScript Video course </a>. They can be used as a stand alone guide, along with the videos or a quick reference for all the different parts of JavaScript like or the <a href="/javascript/02-functions/different-ways-to-declare-functions"> different ways to declare a function</a>.
      </p>
      <p>
        The code written in these notes is available in the <a href="https://github.com/wesbos/beginner-javascript"> Beginner JavaScript repo</a> on github.
      </p>
      <p>
        Did I miss something? Think you could add a better example? Find a spelling mistake? All the notes are open source and and edits are greatly appreciated!
      </p>
      <H as="h2">Table of Contents</H>
      <div>
        {createToc().map((section) => (
          <Fragment key={section[0]}>
            <H as="h3">{section[0]}</H>
            <ul>
              {section[1].map((tocItem) => (
                <li key={tocItem.tocTitle}>
                  <Link to={`/javascript/${tocItem.slug}`}>{tocItem.tocTitle}</Link>
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
