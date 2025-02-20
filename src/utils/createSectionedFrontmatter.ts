import { Frontmatter, JavaScriptFrontmatter, MDXResult } from '@/lib/types';

export function parseNumberFromTitle(section: string) {
  const maybeSection = section.split(' - ').at(0);
  if (!maybeSection) return;
  const maybeSectionNumber = parseInt(maybeSection, 10);
  if (Number.isNaN(maybeSectionNumber)) return;
  return maybeSectionNumber;
}
export default function createSectionedFrontMatter(nodes: MDXResult<JavaScriptFrontmatter>[]) {
  // Sort them by the post number
  const sortedPosts = nodes.sort((a, b) => a.frontmatter.postNumber - b.frontmatter.postNumber);
  // Group by the section
  const grouped = Object.groupBy(sortedPosts, (post) => post.frontmatter.section);
  return Object.entries(grouped);
}
