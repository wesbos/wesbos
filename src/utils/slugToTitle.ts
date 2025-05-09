export function slugToTitle(slug: string): string {
  if (!slug) return '';
  // Remove leading and trailing slashes
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '');

  // Handle empty string
  if (!cleanSlug) return '';

  // Check if the slug ends with a page number pattern (e.g., /2)
  const pageNumberMatch = cleanSlug.match(/\/(\d+)$/);
  let pageNumber: string | null = null;
  let slugWithoutPageNumber = cleanSlug;

  if (pageNumberMatch?.[1]) {
    pageNumber = pageNumberMatch[1];
    slugWithoutPageNumber = cleanSlug.replace(/\/\d+$/, '');
  }

  // Special case for tip/ prefix
  if (slugWithoutPageNumber.startsWith('tip/')) {
    const tipPart = slugWithoutPageNumber.replace('tip/', '');
    const title = `Tip: ${formatSlugPart(tipPart)}`;
    return pageNumber ? `${title} - Page ${pageNumber}` : title;
  }

  const title = formatSlugPart(slugWithoutPageNumber);
  return pageNumber ? `${title} - Page ${pageNumber}` : title;
}

function formatSlugPart(part: string): string {
  return (
    part
      // Replace hyphens with spaces
      .replace(/-/g, ' ')
      // Capitalize first letter of each word
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  );
}
