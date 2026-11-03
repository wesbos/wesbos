import type { MDXComponents } from 'mdx/types';
import { Image } from '../Image';
import { Code } from './code';
import H from './Headings';
import { HighlightedCode } from './HighlightedCode';

/* eslint-disable */
const mdxComponents: MDXComponents = {
  // Image works out srcset and sizes from the width and height that rehype-image-size adds
  img: async (props) => <Image style={{ width: '100%', height: 'auto' }} {...props} />,
  h1: (props) => <H as="h1" {...props} />,
  h2: (props) => <H as="h2" {...props} />,
  h3: (props) => <H as="h3" {...props} />,
  h4: (props) => <H as="h4" {...props} />,
  h5: (props) => <H as="h5" {...props} />,
  h6: (props) => <H as="h6" {...props} />,
  inlineCode: (props) => <Code {...props} />,
  pre: async (props) => <HighlightedCode {...props} />,
  // TODO add `a`
  // TODO add `img`
  // TODO add `ul`
  // TODO add `li`
};

export default mdxComponents;

export async function useMDXComponents(components: MDXComponents): Promise<MDXComponents> {
  return {
    ...components,
    ...mdxComponents,
  };
}
