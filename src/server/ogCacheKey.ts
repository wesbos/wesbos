const KV_KEY_LIMIT = 512;

/**
 * Uses the page URL as the KV key, which keeps existing cached images valid. Post images small
 * enough to be inlined as base64 can push the URL past KV's key limit, so those get hashed.
 */
export async function getOgCacheKey(pageUrl: string) {
  const bytes = new TextEncoder().encode(pageUrl);
  if (bytes.length <= KV_KEY_LIMIT) return pageUrl;
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  const hash = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
  return `sha256:${hash}`;
}
