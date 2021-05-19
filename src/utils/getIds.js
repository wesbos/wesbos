// from: https://nickymeuleman.netlify.app/blog/table-of-contents
// flattens the gatsby TOC to get all the Ids for a post
export function getIds(items) {
  if (!items) return [];
  return items.reduce((acc, item) => {
    if (item.url) {
      // url has a # as first character, remove it to get the raw CSS-id
      acc.push(item.url.slice(1));
    }
    if (item.items) {
      acc.push(...getIds(item.items));
    }
    return acc;
  }, []);
}
