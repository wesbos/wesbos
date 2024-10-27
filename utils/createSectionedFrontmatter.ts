import { Frontmatter, JavaScriptFrontmatter } from '@/lib/types';

export default function createSectionedFrontMatter(nodes: JavaScriptFrontmatter[]) {
  const sectionedFrontmatter: Record<string, JavaScriptFrontmatter[]> = {};
  nodes.forEach((tocItem) => {
    const oldMatter = sectionedFrontmatter[tocItem.frontmatter.section] || [];
    sectionedFrontmatter[tocItem.frontmatter.section] = [
      ...oldMatter,
      {
        tocTitle: tocItem.frontmatter.tocTitle,
        slug: tocItem.frontmatter.slug,
        tocChild: tocItem?.tableOfContents?.items,
      },
    ];
  });

  return sectionedFrontmatter;
}
