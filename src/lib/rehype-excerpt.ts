import { EXIT, SKIP, visit } from 'unist-util-visit';

/**
 * Sets `vfile.data.excerpt` to the text of the first paragraph that actually has text in it.
 *
 * This replaces rehype-extract-excerpt, which always took the very first <p>. When a post starts with an image,
 * that <p> only wraps the <img>, so the excerpt came out empty (wesbos/wesbos#424). Output matches that plugin
 * otherwise: same field name, 140 character limit, word boundaries and `...` ellipsis.
 */

type Node = {
  type: string;
  tagName?: string;
  name?: string | null;
  value?: unknown;
  children?: Node[];
};

interface Options {
  name?: string;
  maxLength?: number;
  ellipsis?: string;
}

/** Elements that never hold excerpt text: media, embeds, captions, headings and code */
const SKIPPED_ELEMENTS = new Set([
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'figure',
  'figcaption',
  'picture',
  'img',
  'video',
  'audio',
  'iframe',
  'embed',
  'object',
  'svg',
  'pre',
  'code',
]);

/** Same as hast-util-to-string, which rehype-extract-excerpt used */
function toText(node: Node): string {
  if (node.children) return node.children.map(toText).join('');
  return typeof node.value === 'string' ? node.value : '';
}

function truncate(text: string, maxLength: number, ellipsis: string) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, text.lastIndexOf(' ', maxLength - 1))}${ellipsis}`;
}

export function rehypeExcerpt({ name = 'excerpt', maxLength = 140, ellipsis = '...' }: Options = {}) {
  return (tree: Node, vfile: { data: Record<string, unknown> }) => {
    let excerpt: string | undefined;
    visit(tree, (node: Node) => {
      // Markdown and HTML elements are `element`, MDX JSX like <img /> or <figure> are `mdxJsx*Element`
      const tag = node.type === 'element' ? node.tagName : node.type.startsWith('mdxJsx') ? node.name : undefined;
      if (!tag) return;
      if (SKIPPED_ELEMENTS.has(tag)) return SKIP;
      // Like rehype-extract-excerpt, only markdown paragraphs count, not JSX <p> tags
      if (tag !== 'p' || node.type !== 'element') return;
      const text = toText(node);
      // A paragraph that only wraps an image or embed
      if (!text.trim()) return SKIP;
      excerpt = truncate(text, maxLength, ellipsis);
      return EXIT;
    });
    vfile.data[name] = excerpt;
  };
}

export default rehypeExcerpt;
