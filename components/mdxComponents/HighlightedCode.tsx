// import { codeToHtml } from 'shiki';
import { bundledLanguages, createHighlighter } from 'shiki';

import { cobalt2 } from '@/lib/assets/cobalt2';

const highlighter = await createHighlighter({
  themes: [cobalt2],
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

  if (children?.type === 'code') {
    // Other wise we highlight the code!
    const className = children.props.className || '';
    const lang = getLanguageFromClassName(className);
    // TODO: Add custom theme
    // console.log(codeToHtml);
    // console.log(children.props.children);
    const html = await highlighter.codeToHtml(children.props.children, {
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
}
