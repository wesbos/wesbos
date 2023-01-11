import styled from 'styled-components';

/* http://prismjs.com/download.html?themes=prism&languages=markup+css+clike+javascript&plugins=show-language+highlight-keywords */
/**
 * Cobalt2 theme for JavaScript, CSS, HTML, Markdown, JSON, YAML, and SCSS
 * @author wesbos
 * Works best when "Show Language" and "Highlight Keywords" plugins are included
 */

const cobalt2 = styled.div`
  background: #223545;
  padding: 2rem;
  font-family: 'Operator Mono', 'Inconsolata', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  font-size: 2rem;
  border-top: 5px solid #ffc600;
  color: white;
  line-height: 1.5;
  [class*='language-'] {
    color: #f8f8f2;
    text-shadow: 0 1px rgba(0, 0, 0, 0.3);
    font-family: 'Operator Mono', 'Inconsolata', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    direction: ltr;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.35;

    -moz-tab-size: 2;
    -o-tab-size: 2;
    tab-size: 2;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  /* Code blocks */
  [class*='language-'] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
    border-radius: 0;
    border: 0;
  }

  /* Inline code */
  [class*='language-'] {
    padding: 0.1em;
    border-radius: 0.3em;
    white-space: normal;
  }

  /* Language before */
  .prism-show-language {
    background: #1f4662;
    border-top: 2px solid #ffc600;
    text-align: right;
    padding: 5px;
    color: white;
    font-size: 11px;
  }
  .prism-show-language + pre {
    margin-top: 0;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #0088ff;
  }

  .token.comment,
  .token.italic {
    font-style: italic;
  }

  .token.punctuation {
    color: #ffc600;
  }

  .namespace {
    opacity: 0.7;
  }

  .token.property,
  .token.tag,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: #f92672;
  }

  .token.boolean,
  .token.number {
    color: #ff628c;
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: #3ad900;
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string,
  .token.variable {
    color: #f8f8f2;
  }

  .token.atrule,
  .token.attr-value {
    color: #ffc600;
  }

  .token.keyword.keyword-function {
    color: #ffa5f3;
    background: #1d3c52;
    padding: 4px 2px;
  }

  .token.keyword {
    color: #ff9d00;
  }

  .token.operator {
    color: #ff9d00;
  }

  .token.function {
    color: #ffc600;
  }

  .token.keyword.keyword-const,
  .token.keyword.keyword-var,
  .token.keyword.keyword-let {
    color: #ffc600;
  }

  .token.regex,
  .token.important {
    color: #fd971f;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }

  .token.entity {
    cursor: help;
  }

  .token.plain {
    color: white;
  }

  /* CSS requires Prism: CSS, CSS-Extras */

  code.language-css,
  .token.hexcode,
  .language-css .token.boolean,
  .language-css .token.number {
    color: #edf080;
  }

  .language-css .token.selector {
    color: #9effff;
  }

  .language-css .token.class,
  .language-css .token.selector .token.class,
  .language-css .token.attribute {
    color: #3ad900;
  }

  .language-css .token.property {
    color: #9df39f;
  }

  .token.pseudo-class {
    color: #ff9a1a;
  }

  /* HTML Markup */

  .language-markup .token.tag,
  .token.doctype {
    color: #9effff;
  }

  .language-markup .attr-name {
    color: #ffc600;
    font-style: italic;
  }
  .language-markup .attr-value {
    color: #3ad900;
  }

  /* Markdown */

  .language-markdown .title {
    background: #000;
    color: #fdc500;
  }

  .language-markdown .url {
    color: #3ad900;
  }

  .language-markdown .list.punctuation {
    color: #ff9a1a;
  }

  /* JSON */

  .language-json .property {
    color: #3ad900;
  }

  .language-json .operator {
    color: #f8f8f2;
  }

  /* YAML */

  code.language-yaml {
    color: #3ad900;
  }

  .language-yaml .boolean {
    color: #f85b79;
  }

  /* SCSS */

  code.language-scss {
    color: #e68885;
  }

  .language-scss .property {
    color: #80ffbb;
  }

  .language-scss .keyword {
    color: #ff9a1a;
  }

  .language-scss .token.variable {
    color: #ccc;
  }

  .language-scss .hexcode {
    color: #f85b79;
  }

  .language-scss .function {
    color: #fff;
  }
`;

cobalt2.displayName = 'Cobalt2';

export default cobalt2;
