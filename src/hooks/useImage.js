import { graphql, useStaticQuery } from 'gatsby';

// This is a hack because gatsby-image is weird can doesn't let you just display images

/**
 *
 * @param {string} path
 * @returns {string | undefined}
 */
export default function useImage() {
  /**
   * @returns string[]
   */
  const { images } = useStaticQuery(graphql`
    query {
      images: allFile(filter: { dir: { regex: "/assets/images/" } }) {
        edges {
          node {
            childImageSharp {
              fluid(maxWidth: 1000) {
                src
              }
            }
          }
        }
      }
    }
  `);
  return {
    getImagePath(fileName) {
      return images.edges
        .map((x) => x.node.childImageSharp.fluid.src)
        .find((path) => path.endsWith(fileName));
    },
  };
}
