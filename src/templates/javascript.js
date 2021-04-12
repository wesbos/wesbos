import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { IoLogoGithub } from 'react-icons/io';
import { Helmet } from 'react-helmet';
import H from '../components/mdxComponents/Headings';
import ContentNav from '../components/ContentNav';
import PostHeaderStyles from '../components/styles/PostHeaderStyles';
import EditDialogStyles from '../components/styles/EditDialogStyles';
import JavaScriptNotesStyles from '../components/styles/JavaScriptNotesStyles';
import { PostMetaTags } from '../components/MetaTags';
import TableOfContents from '../components/TableOfContents';
import { getIds } from '../utils/getIds';
import { useActiveId } from '../hooks/useActiveId';

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
        category
      }
      body
      tableOfContents(maxDepth: 10)
    }
  }
`;

function JavaScriptNotesTemplate({ data: { mdx: post }, scope, pageContext }) {
  const activeId = useActiveId(getIds(post.tableOfContents.items));

  if (!post) {
    return <p>No Post Found? This should be a 404</p>;
  }

  const editURL = `https://github.com/wesbos/wesbos/tree/master/src/${
    post.fileAbsolutePath.split('/src/')[1]
  }`;

  return (
    <JavaScriptNotesStyles>
      <TableOfContents activeId={activeId} />
      <div>
        <PostHeaderStyles>
          <PostMetaTags post={post} />
          <H>{post.frontmatter.title}</H>
          <div className="postMeta">
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
    </JavaScriptNotesStyles>
  );
}

export default JavaScriptNotesTemplate;
