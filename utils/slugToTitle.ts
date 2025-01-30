export function slugToTitle(slug: string): string {
  // Remove leading and trailing slashes
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '');

  // Handle empty string
  if (!cleanSlug) return '';

  // Special case for tip/ prefix
  if (cleanSlug.startsWith('tip/')) {
    const tipPart = cleanSlug.replace('tip/', '');
    return `Tip: ${formatSlugPart(tipPart)}`;
  }

  return formatSlugPart(cleanSlug);
}

function formatSlugPart(part: string): string {
  return part
    // Replace hyphens with spaces
    .replace(/-/g, ' ')
    // Capitalize first letter of each word
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
