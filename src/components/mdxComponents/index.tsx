import { MDXComponents } from "mdx/types";
import H from "./Headings";
// import Heading from "../heading";
// import Blockquote from './blockquote';
import { Code } from "./code";
import { HighlightedCode } from "./HighlightedCode";
import { Image } from "../Image";
/* eslint-disable */
const mdxComponents: MDXComponents = {
  // TODO: Figure out what sizes should be
  img: (props) => (
    <Image
      // sizes="100vw"
      // width="100"
      // height="100"
      style={{ width: "100%", height: "auto" }}
      {...props}
      // placeholder="empty"
    />
  ),
  h1: (props) => <H as="h1" {...props} />,
  h2: (props) => <H as="h2" {...props} />,
  h3: (props) => <H as="h3" {...props} />,
  h4: (props) => <H as="h4" {...props} />,
  h5: (props) => <H as="h5" {...props} />,
  h6: (props) => <H as="h6" {...props} />,
  inlineCode: (props) => <Code {...props} />,
  pre: HighlightedCode,
  // TODO add `a`
  // TODO add `img`
  // TODO add `ul`
  // TODO add `li`
};

export default mdxComponents;

export async function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...mdxComponents,
  };
}
