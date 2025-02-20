import {
  bundledLanguages,
  createHighlighter,
  createHighlighterCore,
  ThemeInput,
} from "shiki";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import { loadWasm } from "shiki/engine/oniguruma";
import { isValidElement, ReactElement } from "react";
// import SHIKI_WASM from "./onigasm.wasm";
// import SHIKI_WASM from "shiki/onig.wasm?module";
import { cobalt2 } from "@/lib/assets/cobalt2";
import javascript from "shiki/langs/javascript";
import typescript from "shiki/langs/typescript";
import bash from "shiki/langs/bash";
import html from "shiki/langs/html";
import css from "shiki/langs/css";
import yaml from "shiki/langs/yaml";
import json from "shiki/langs/json";
import php from "shiki/langs/php";
import xml from "shiki/langs/xml";
import vue from "shiki/langs/vue";
import scss from "shiki/langs/scss";
import cpp from "shiki/langs/cpp";
import jsx from "shiki/langs/jsx";
import tsx from "shiki/langs/tsx";

// const { default: shikiWasm } = await import(
//   /* @vite-ignore */ `${SHIKI_WASM}?module`
// );

// console.log(`SHIKI_WASM`, SHIKI_WASM);

// await loadWasm(SHIKI_WASM);



const highlighter = await createHighlighterCore({
  themes: [cobalt2 as unknown as ThemeInput],
  engine: createJavaScriptRegexEngine(),
  langs: [
    javascript,
    typescript,
    bash,
    html,
    css,
    yaml,
    json,
    php,
    xml,
    vue,
    scss,
    cpp,
    jsx,
    tsx,
  ],
});

function getLanguageFromClassName(className: string) {
  if (!className) return "text";
  return className.replace("language-", "");
}

export async function HighlightedCode({
  children,
  ...props
}: {
  children: React.ReactNode;
  className: string;
}) {
  // The way we differentiate between inline `code` and code blocks, is we check if the <pre> has a <code> inside of it.
  if (typeof children === "string") {
    return <code {...props} />;
  }

  // Other wise we highlight the code!
  if (isValidElement(children) && children.type === "code") {
    const codeElement = children as ReactElement<
      React.HTMLProps<HTMLPreElement>
    >;

    const className = codeElement.props.className || "";
    const lang = getLanguageFromClassName(className);
    const html = highlighter.codeToHtml(
      codeElement.props.children?.toString() || "",
      {
        lang: "javascript",
        theme: "Cobalt2",
      }
    );
    return (
      <div
        // The Rehype Remark unified plugin caused memory timeouts - too confusing. This is way easier YOLO
        data-language={className}
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    );
  }

  // To be safe, just return the children as is if we reach this point
  return children;
}
