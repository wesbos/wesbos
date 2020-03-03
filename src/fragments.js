import { graphql } from 'gatsby';

export const ImageFields = graphql`
  fragment ImageFields on File {
    publicURL
    id
    extension
    childImageSharp {
      fluid(maxWidth: 700) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`;
