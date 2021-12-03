import { graphql } from 'gatsby';

export const ImageFields = graphql`fragment ImageFields on File {
  publicURL
  id
  extension
  childImageSharp {
    gatsbyImageData(width: 700, layout: CONSTRAINED)
  }
}
`;
