import React from 'react'
import { Link, graphql } from 'gatsby'
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import Layout from '../components/Layout'
import { withMDXScope } from "gatsby-mdx/context";
import YouTube from 'react-youtube';
import Img from '../components/Img';

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
      excerpt
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        image
      }
      code {
        body
      }
    }
  }
`

function PostTemplate({ data: { mdx: post }, scope }) {
  if (!post) {
    return <p>No Post Found? This should be a 404</p>
  }
  // TODO  layouts should use mdx layouts,
  return <Layout>
    <Link to="/blog">← Back to Posts</Link>
    <hr />

    <Img src={post.frontmatter.image} alt={post.frontmatter.title} />
    <hr />
    <h2>{post.frontmatter.title}</h2>

    <MDXRenderer scope={{
      YouTube,
      ...scope
    }}>{post.code.body}</MDXRenderer>
  </Layout>
}


export default withMDXScope(PostTemplate);
