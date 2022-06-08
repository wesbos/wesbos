import React from 'react';
import { graphql } from "gatsby"
import Img from "../components/Img"
import ContentNav from '../components/ContentNav';
import H from '../components/mdxComponents/Headings';
import TipMeta from '../components/TipMeta';
import { Grid } from '../components/styles/Grid';
import { TipsMetaTags } from '../components/MetaTags';

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
        slug
        tweetURL
        date(formatString: "MMMM DD, YYYY")
        images {
          ...ImageFields
        }
        videos
      }
    }
  }
`;

export default function TipTemplate({
  data: { mdx: tip },
  children,
  pageContext,
}) {
  return (
    <>
      <div>
        <TipsMetaTags post={tip} />
        <Grid columns="auto 1fr">
          <H>Hot Tip</H>
          <TipMeta tip={tip} />
        </Grid>
        {children}
        {tip.frontmatter.videos &&
          tip.frontmatter.videos.map(url => (
            <video key={url} src={url} autoPlay mute loop />
          ))}
        {tip.frontmatter.images &&
          tip.frontmatter.images.map(image => (
            <Img key={image.id} image={image} alt={tip.body} />
          ))}
      </div>
      <ContentNav
        pathPrefix={pageContext.pathPrefix}
        prev={pageContext.prev}
        next={pageContext.next}
      />
    </>
  );
}
