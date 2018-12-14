import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import Bio from '../components/Bio'
import Layout from '../components/Layout'
import { rhythm, scale } from '../utils/typography'
import { isFunction } from 'util';
import { withMDXScope } from "gatsby-mdx/context";
import YouTube from 'react-youtube';
import Img from '../components/Img';
// class BlogPostTemplate extends React.Component {
//   render() {
//     const post = this.props.data.markdownRemark
//     const siteTitle = get(this.props, 'data.site.siteMetadata.title')
//     const siteDescription = post.excerpt
//     const { previous, next } = this.props.pageContext

//     return (
//       <Layout location={this.props.location} title={siteTitle}>
//         <Helmet
//           htmlAttributes={{ lang: 'en' }}
//           meta={[{ name: 'description', content: siteDescription }]}
//           title={`${post.frontmatter.title} | ${siteTitle}`}
//         />
//         <h1>{post.frontmatter.title}</h1>
//         <p
//           style={{
//             ...scale(-1 / 5),
//             display: 'block',
//             marginBottom: rhythm(1),
//             marginTop: rhythm(-1),
//           }}
//         >
//           {post.frontmatter.date}
//         </p>
//         <div dangerouslySetInnerHTML={{ __html: post.html }} />
//         <hr
//           style={{
//             marginBottom: rhythm(1),
//           }}
//         />
//         <Bio />

//         <ul
//           style={{
//             display: 'flex',
//             flexWrap: 'wrap',
//             justifyContent: 'space-between',
//             listStyle: 'none',
//             padding: 0,
//           }}
//         >
//           <li>
//             {
//               previous &&
//               <Link to={previous.fields.slug} rel="prev">
//                 ← {previous.frontmatter.title}
//               </Link>
//             }
//           </li>
//           <li>
//             {
//               next &&
//               <Link to={next.fields.slug} rel="next">
//                 {next.frontmatter.title} →
//               </Link>
//             }
//           </li>
//         </ul>
//       </Layout>
//     )
//   }
// }

// export default BlogPostTemplate

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
  console.log(scope);
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
