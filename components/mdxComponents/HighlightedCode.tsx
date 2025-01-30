import { bundledLanguages, createHighlighter, ThemeInput } from 'shiki';
import { isValidElement, ReactElement } from 'react';

import { cobalt2 } from '@/lib/assets/cobalt2';

const highlighter = await createHighlighter({
  themes: [cobalt2 as unknown as ThemeInput],
  langs: Object.keys(bundledLanguages),
});

function getLanguageFromClassName(className: string) {
  if (!className) return 'text';
  return className.replace('language-', '');
}

export async function HighlightedCode({ children, ...props }: { children: React.ReactNode; className: string }) {
  // The way we differentiate between inline `code` and code blocks, is we check if the <pre> has a <code> inside of it.
  if (typeof children === 'string') {
    return <code {...props} />;
  }

  // Other wise we highlight the code!
  if (isValidElement(children) && children.type === 'code') {
    const codeElement = children as ReactElement<React.HTMLProps<HTMLPreElement>>;

    const className = codeElement.props.className || '';
    const lang = getLanguageFromClassName(className);
    const html = highlighter.codeToHtml(codeElement.props.children?.toString() || '', {
      lang: 'javascript',
      theme: 'Cobalt2',
    });
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
