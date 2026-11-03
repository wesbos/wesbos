/**
 * Cloudflare Image Transformations (https://developers.cloudflare.com/images/transform-images/transform-via-url/).
 *
 * `/cdn-cgi/image/` only exists on the wesbos.com zone, so this is switched on for production builds only
 * (Workers Builds on `master`). Local dev, local builds and preview deployments serve the original file.
 * Set `IMAGE_CDN=true` or `IMAGE_CDN=false` when running Vite to override that, e.g. to inspect the srcset locally.
 */
export const imageCdnEnabled = import.meta.env.IMAGE_CDN === 'true';

/**
 * Widths we ask Cloudflare for. The content column is at most 760px wide, so 1536 covers it on 2x screens,
 * and the smaller steps cover phones (a 375px wide phone at 3x needs ~945px).
 */
export const IMAGE_WIDTHS = [320, 480, 640, 768, 1024, 1280, 1536];

/** Max width of the main content column: `.ContentStyles` is 800px with 2rem (20px) of padding on each side. */
export const CONTENT_WIDTH = 760;
/** Horizontal space around the content column on small screens: 20px of padding + the 10px html border on each side. */
const CONTENT_GUTTER = 60;

export const DEFAULT_QUALITY = 75;

const normalizeSrc = (src: string) => (src.startsWith('/') ? src.slice(1) : src);

/** Only same-origin raster images can be resized. SVGs don't need it, and GIFs may be animated. */
export function canTransform(src: string) {
  return imageCdnEnabled && src.startsWith('/') && !src.startsWith('//') && !/\.(svg|gif)(\?|$)/i.test(src);
}

export default function cloudflareLoader({
  src,
  width,
  quality = DEFAULT_QUALITY,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  // format=auto serves AVIF or WebP to browsers that accept them, and falls back to the original format
  return `/cdn-cgi/image/width=${width},quality=${quality},format=auto/${normalizeSrc(src)}`;
}

/** Widths for an image, never larger than the original and never more than needed to fill `slotWidth` at 2x. */
export function getImageWidths(intrinsicWidth: number | undefined, slotWidth: number) {
  const maxWidth = Math.min(intrinsicWidth ?? Number.POSITIVE_INFINITY, slotWidth * 2);
  const widths = IMAGE_WIDTHS.filter((w) => w < maxWidth);
  // Top out with the first candidate that covers 2x, or the original width when that's smaller
  const top = Math.min(IMAGE_WIDTHS.find((w) => w >= maxWidth) ?? maxWidth, intrinsicWidth ?? Number.POSITIVE_INFINITY);
  if (Number.isFinite(top)) widths.push(top);
  return widths;
}

/** The image fills the content column, or its own width when it's narrower than that. */
export function getImageSizes(slotWidth: number) {
  return `(min-width: ${slotWidth + CONTENT_GUTTER}px) ${slotWidth}px, calc(100vw - ${CONTENT_GUTTER}px)`;
}
