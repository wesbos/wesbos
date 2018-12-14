import * as React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import Cobalt2 from '../../assets/cobalt2'

import Pre from "./pre";

/** Removes the last token from a code example if it's empty. */
function cleanTokens(tokens) {
  const tokensLength = tokens.length;
  if (tokensLength === 0) {
    return tokens;
  }
  const lastToken = tokens[tokensLength - 1];
  if (lastToken.length === 1 && lastToken[0].empty) {
    return tokens.slice(0, tokensLength - 1);
  }
  return tokens;
}

/* eslint-disable react/jsx-key */
const CodeBlock = ({ children: exampleCode, ...props }) => {
  console.log(props);
  return (
    <Highlight
      {...defaultProps}
      code={exampleCode}
      language={props.className.split('-')[1]}
      theme={undefined}
    >
      {({ className, tokens, getLineProps, getTokenProps }) => (

        <Cobalt2 className={className} p={3}>
          {cleanTokens(tokens).map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </Cobalt2>
      )}
    </Highlight>
  );

};

export default CodeBlock;
