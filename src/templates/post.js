import React from 'react';
import { graphql } from "gatsby"
import { MDXProvider } from '@mdx-js/react';
import YouTube from "react-youtube"
import { IoLogoGithub } from "react-icons/io"
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
      parent {
        ... on File {
          absolutePath
        }
      }
      frontmatter {
        title
        slug
        date(formatString: "MMMM DD, YYYY")
        image {
          ...ImageFields
        }
        category
      }
    }
  }
`;
function PostTemplate({ data: { mdx: post }, pageContext, children }) {
  if (!post) {
    return <p>No Post Found? This should be a 404</p>;
  }
  const editURL = `https://github.com/wesbos/wesbos/tree/master/src/${
    post.fileAbsolutePath.split('/src/')[1]
  }`;

  return (
    <>
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
      <MDXProvider
        components={{
          YouTube,
        }}
      >
        {children}
      </MDXProvider>
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
    </>
  );
}

export default PostTemplate;
