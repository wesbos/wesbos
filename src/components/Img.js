/* eslint react/jsx-props-no-spreading: 0 */
/* eslint jsx-a11y/alt-text: 0 */
import React from 'react';
import { GatsbyImage } from "gatsby-plugin-image";

export default function WhyDoINeedToMakeThisComponent({ image, ...theRest }) {
  if (!image) {
    return null;
  }
  if (image.extension === 'gif') {
    return <img src={image.publicURL} {...theRest} />;
  }
  return <GatsbyImage image={image.childImageSharp.gatsbyImageData} {...theRest} />;
}
