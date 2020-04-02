import React from 'react';
import { Link, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import YouTube from 'react-youtube';
import Helmet from 'react-helmet';
import { IoLogoGithub } from 'react-icons/io';
import Layout from '../components/Layout';
import Img from '../components/Img';
import H from '../components/mdxComponents/Headings';
import ContentNav from '../components/ContentNav';
import PostHeaderStyles from '../components/styles/PostHeaderStyles';
import EditDialogStyles from '../components/styles/EditDialogStyles';
import { PostMetaTags } from '../components/MetaTags';

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
      fileAbsolutePath
      frontmatter {
        title
        slug
        date(formatString: "MMMM DD, YYYY")
        image {
          ...ImageFields
        }
        category
      }
      body
    }
  }
`;
function PostTemplate({ data: { mdx: post }, scope, pageContext }) {
  if (!post) {
    return <p>No Post Found? This should be a 404</p>;
  }
  const editURL = `https://github.com/wesbos/wesbos/tree/master/src/${
    post.fileAbsolutePath.split('/src/')[1]
  }`;

  // const thumbnailQuery = `?title=${post.frontmatter.title}&url=https://wesbos.com${pageContext.slug}&thumbnail=${post.frontmatter.image.publicURL}`;

  return (
    <>
      {/* <Layout title={`${post.frontmatter.title} - Wes Bos`}> */}
      {/* <img
          width="400"
          src={`http://localhost:8888/.netlify/functions/ogimage${thumbnailQuery}`}
          alt={post.title}
        /> */}

      <Img image={post.frontmatter.image} alt={post.frontmatter.title} />
      <PostHeaderStyles>
        <PostMetaTags post={post} />
        <H>{post.frontmatter.title}</H>
        <div className="postMeta">
          <time dateTime={post.frontmatter.date}>{post.frontmatter.date}</time>
          <span>{post.frontmatter.category.join(', ')}</span>
          <a rel="noopener noreferrer" target="_blank" href={editURL}>
            Edit Post <IoLogoGithub />
          </a>
        </div>
      </PostHeaderStyles>
      <MDXRenderer
        scope={{
          YouTube,
          ...scope,
        }}
      >
        {post.body}
      </MDXRenderer>
      <EditDialogStyles>
        <p>
          Find an issue with this post? Think you could clarify, update or add
          something?
        </p>
        <p>
          All my posts are available to edit on Github. Any fix, little or
          small, is appreciated!
        </p>
        <p>
          <a rel="noopener noreferrer" target="_blank" href={editURL}>
            <IoLogoGithub /> Edit on Github
          </a>
        </p>
      </EditDialogStyles>
      <ContentNav
        pathPrefix={pageContext.pathPrefix}
        prev={pageContext.prev}
        next={pageContext.next}
      />
      {/* </Layout> */}
    </>
  );
}

export default PostTemplate;
