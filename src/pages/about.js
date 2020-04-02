import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import H from '../components/mdxComponents/Headings';

export default function AboutPage({ data }) {
  return <p>hey</p>;
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
