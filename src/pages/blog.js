import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout';

const Dump = props => (
  <div
    style={{
      fontSize: 20,
      border: '1px solid #efefef',
      padding: 10,
      background: 'white',
    }}
  >
    {Object.entries(props).map(([key, val]) => (
      <pre key={key}>
        <strong style={{ color: 'white', background: 'red' }}>{key} </strong>
        {JSON.stringify(val, '', ' ')}
      </pre>
    ))}
  </div>
);

const Blog = function ({ data }) {
  if (!data) return <p>Shooooot! No data found!</p>
  return (<Layout>
    <h2>Welcome to my blog!</h2>
    <Link to="/">Home</Link>
    {data.allMdx && data.allMdx.edges.map(({ node: post }) => <li key={post.id}>
      <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
    </li>)}
  </Layout>)
}

export default Blog;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMdx(
      filter: { fields: { collection: { eq: "post"}}}
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          excerpt
          fields {
            collection
            slug
          }
          frontmatter {
            title
            date
          }
        }
      }
    }
  }
`
