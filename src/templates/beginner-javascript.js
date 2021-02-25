import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { IoLogoGithub } from 'react-icons/io';
import { Helmet } from 'react-helmet';
import H from '../components/mdxComponents/Headings';
import ContentNav from '../components/ContentNav';
import AsideTableOfContents from '../components/AsideTableOfContents';
import PostHeaderStyles from '../components/styles/PostHeaderStyles';
import EditDialogStyles from '../components/styles/EditDialogStyles';
import JavaScriptNotesStyles from '../components/styles/JavaScriptNotesStyles';
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
      fileAbsolutePath
      frontmatter {
        title
        slug
        date(formatString: "MMMM DD, YYYY")
        category
      }
      tableOfContents
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

  return (
    <JavaScriptNotesStyles>
      <div>
        <p>Replace with Beginner JS TOC</p>
      </div>
      <div>
        <PostHeaderStyles>
          <PostMetaTags post={post} />
          <H>{post.frontmatter.title}</H>
          <div className="postMeta">
            <time dateTime={post.frontmatter.date}>
              {post.frontmatter.date}
            </time>
            <span>{post.frontmatter.category.join(', ')}</span>
            <a rel="noopener noreferrer" target="_blank" href={editURL}>
              Edit Post <IoLogoGithub />
            </a>
          </div>
        </PostHeaderStyles>
        <MDXRenderer
          scope={{
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
        <Helmet>
          <title>
            {post.frontmatter.title} - Beginner JavaScript - Wes Bos
          </title>
        </Helmet>
      </div>
      <AsideTableOfContents tableOfContents={post.tableOfContents} />
    </JavaScriptNotesStyles>
  );
}

export default PostTemplate;
