import { codeToHtml } from 'shiki';
import { cobalt2 } from '@/lib/assets/cobalt2';

function getLanguageFromClassName(className: string) {
  if (!className) return 'text';
  return className.replace('language-', '');
}

export async function HighlightedCode({ children, ...props }: { children: React.ReactNode; className: string }) {
  // const highlighter = await getHighlighter({
  //   themes: [cobalt2],
  // });
  // The way we differentiate between inline `code` and code blocks, is we check if the <pre> has a <code> inside of it.
  if (typeof children === 'string') {
    return <code {...props} />;
  }

  if (children?.type === 'code') {
    // Other wise we highlight the code!
    const className = children.props.className || '';
    const lang = getLanguageFromClassName(className);
    // TODO: Add custom theme
    console.log(codeToHtml);
    console.log(children.props.children);
    const html = await codeToHtml(children.props.children, {
      lang: 'javascript',
      theme: 'aurora-x',
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
