import React from 'react';
import { Link, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Img from '../components/Img';
import Layout from '../components/Layout';

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        images {
          ...ImageFields
        }
        videos
      }
      body
    }
  }
`;

export default function TipTemplate({ data: { mdx: tip } }) {
  console.log(tip);
  return (
    <Layout>
      <div>
        <MDXRenderer>{tip.body}</MDXRenderer>
        {tip.frontmatter.videos &&
          tip.frontmatter.videos.map(url => (
            <video src={url} autoPlay mute loop />
          ))}
        {tip.frontmatter.images &&
          tip.frontmatter.images.map(image => <Img image={image} />)}
      </div>
    </Layout>
  );
}
