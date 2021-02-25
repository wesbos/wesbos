export default function createSectionedFrontMatter(nodes) {
  const sectionedFrontmatter = {};

  nodes.forEach((tocItem) => {
    const oldMatter = sectionedFrontmatter[tocItem.frontmatter.section] || [];

    sectionedFrontmatter[tocItem.frontmatter.section] = [
      ...oldMatter,
      {
        tocTitle: tocItem.frontmatter.tocTitle,
        slug: tocItem.frontmatter.slug,
      },
    ];
  });

  return [sectionedFrontmatter];
}
