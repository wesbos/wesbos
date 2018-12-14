import React from "react";
// import Heading from "../heading";
import Text from "./text";
import Code from "./code";
import CodeBlock from "./codeBlock";
import Pre from "./pre";

/* eslint-disable react/display-name*/
// TODO: This sohuld be a custom heading?
export default {
  h1: props => <h1 {...props} />,
  h2: props => <h2 {...props} />,
  h3: props => <h3 {...props} />,
  h4: props => <h4 {...props} />,
  h5: props => <h5 {...props} />,
  h6: props => <h6 {...props} />,
  p: props => <Text {...props} />,
  pre: Pre,
  code: CodeBlock,
  inlineCode: props => <Code {...props} />,
  // TODO add `a`
  // TODO add `img`
  // TODO add `blockquote`
  // TODO add `ul`
  // TODO add `li`
  // TODO add `table`
};
