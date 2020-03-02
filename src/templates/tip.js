import React from 'react';
import { Link, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import YouTube from 'react-youtube';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import Layout from '../components/Layout';
import H from '../components/mdxComponents/Headings';

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
          childImageSharp {
            fluid(maxWidth: 700) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        videos
        # image {
        #   id
        # }
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
          tip.frontmatter.images.map(image => (
            <Img fluid={image.childImageSharp.fluid} />
          ))}
      </div>
    </Layout>
  );
}
