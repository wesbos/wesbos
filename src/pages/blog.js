import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout';
// import Helmet from 'react-helmet'

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


// import get from 'lodash/get'
// import Helmet from 'react-helmet'

// import Bio from '../components/Bio'
// import Layout from '../components/Layout'
// import { rhythm } from '../utils/typography'

// class BlogIndex extends React.Component {
//   render() {
//     const siteTitle = get(this, 'props.data.site.siteMetadata.title')
//     const siteDescription = get(
//       this,
//       'props.data.site.siteMetadata.description'
//     )
//     const posts = get(this, 'props.data.allMarkdownRemark.edges')

//     return (
//       <Layout location={this.props.location} title={siteTitle}>
//         <Helmet
//           htmlAttributes={{ lang: 'en' }}
//           meta={[{ name: 'description', content: siteDescription }]}
//           title={siteTitle}
//         />
//         <Bio />
//         {posts.map(({ node }) => {
//           const title = get(node, 'frontmatter.title') || node.fields.slug
//           return (
//             <div key={node.fields.slug}>
//               <h3
//                 style={{
//                   marginBottom: rhythm(1 / 4),
//                 }}
//               >
//                 <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
//                   {title}
//                 </Link>
//               </h3>
//               <small>{node.frontmatter.date}</small>
//               <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
//             </div>
//           )
//         })}
//       </Layout>
//     )
//   }
// }

// export default BlogIndex

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
