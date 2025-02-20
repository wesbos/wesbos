import { bundledLanguages, createHighlighter, ThemeInput, loadWasm, Highlighter } from 'shiki';
import { isValidElement, ReactElement } from 'react';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { cobalt2 } from '@/lib/assets/cobalt2';

// Declare the type for our global highlighter
declare global {
  var __highlighter: Highlighter | null;
}

// Initialize if it doesn't exist
globalThis.__highlighter = globalThis.__highlighter || null;

export async function createHighlighterSingleton() {
  // If we already have an instance, return it
  if (globalThis.__highlighter) {
    console.log('🎨 Reusing existing highlighter instance');
    return globalThis.__highlighter;
  }

  console.log('🆕 Creating new highlighter instance...');
  try {
    // import wasm as assets
    await loadWasm(fetch('https://unpkg.com/shiki/dist/onig.wasm'));

    globalThis.__highlighter = await createHighlighter({
      themes: [cobalt2 as unknown as ThemeInput],
      langs: Object.keys(bundledLanguages),
    });

    console.log('✅ Highlighter instance created successfully');
    return globalThis.__highlighter;
  } catch (error) {
    console.error('❌ Error creating highlighter instance:', error);
    throw error;
  }
}

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

    const highlighter = await createHighlighterSingleton();
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
