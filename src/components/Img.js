import React from 'react';
import Img from 'gatsby-image';
import { StaticQuery, graphql } from 'gatsby';

function renderImage({ file }) {
  return <Img fluid={file.childImageSharp.fluid} />
}

const MyImg = function (props) {
  const query = graphql`
      query {
      file(relativePath: { eq: "wes-and-scott.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    `
  return <StaticQuery
    query={query}
    render={renderImage}
  />
}

export default MyImg;
