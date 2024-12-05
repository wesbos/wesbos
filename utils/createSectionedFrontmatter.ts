import { Frontmatter, JavaScriptFrontmatter, MDXResult } from '@/lib/types';

export function parseNumberFromTitle(section: string) {
  const maybeSection = section.split(' - ').at(0);
  if(!maybeSection) return;
  const maybeSectionNumber = parseInt(maybeSection, 10);
  if(isNaN(maybeSectionNumber)) return;
  return maybeSectionNumber;
}
export default function createSectionedFrontMatter(nodes: MDXResult[]) {
  // Sort them by the post number
  const sortedPosts = nodes.sort((a, b) => a.frontmatter.postNumber - b.frontmatter.postNumber);
  // Group by the section
  const grouped = Object.groupBy(sortedPosts, post => post.frontmatter.section);
  return Object.entries(grouped);

  // nodes.forEach((tocItem) => {
  //   const oldMatter = sectionedFrontmatter[tocItem.frontmatter.section] || [];
  //   sectionedFrontmatter[tocItem.frontmatter.section] = [
  //     ...oldMatter,
  //     {
  //       section: parseNumberFromTitle(tocItem.frontmatter.section),
  //       tocTitle: tocItem.frontmatter.tocTitle,
  //       slug: tocItem.frontmatter.slug,
  //       tocChild: tocItem?.tableOfContents?.items,
  //     },
  //   ];
  // });
  // // Sort by the section
  // const toc = Object.entries(sectionedFrontmatter);
  // return toc;
}
