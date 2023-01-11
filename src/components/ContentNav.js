import React from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Link } from 'gatsby';
import styled from 'styled-components';

const ContentNavStyles = styled.div`
  --borderColor: var(--lightGrey);
  --borderColor: black;
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
  grid-template-rows: auto auto;
  border: 1.5px solid var(--borderColor);
  border-radius: 1rem;
  margin: 4rem 0;
  a {
    display: grid;
    grid-template-rows: auto 1fr;
    &:only-child {
      grid-column: 1 / -1;
      text-align: right;
    }
    &:nth-child(2) {
      text-align: right;
      border-left: 1.5px solid var(--borderColor);
    }
    text-decoration: none;
  }
  p {
    margin: 0;
  }
  strong {
    text-decoration: underline;
    text-decoration-color: var(--yellow);
    border-bottom: 1.5px solid var(--borderColor);
  }

  p,
  strong {
    padding: 1rem 3rem;
  }
`;

export default function ContentNav({ prev, next, pathPrefix }) {
  return (
    <ContentNavStyles>
      {prev && (
        <Link to={`${pathPrefix}${prev.node.fields.slug}`}>
          <strong>← Prev</strong>
          {prev.node.frontmatter ? <p>{prev.node.frontmatter.title}</p> : <p>{prev.node.body}</p>}
        </Link>
      )}
      {next && (
        <Link to={`${pathPrefix}${next.node.fields.slug}`}>
          <strong>Next →</strong>
          {next.node.frontmatter ? <p>{next.node.frontmatter.title}</p> : <p>{next.node.body}</p>}
        </Link>
      )}
    </ContentNavStyles>
  );
}
