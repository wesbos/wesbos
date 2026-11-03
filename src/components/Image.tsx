import type { ComponentProps } from 'react';
import cloudflareLoader, { CONTENT_WIDTH, canTransform, getImageSizes, getImageWidths } from '@/lib/imageLoader';

type ImageProps = Omit<ComponentProps<'img'>, 'src' | 'alt' | 'width' | 'height'> & {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
};

const toNumber = (value?: string | number) => {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : undefined;
};

/**
 * Renders a responsive <img>. In production, local images get a small srcset of Cloudflare-resized
 * AVIF/WebP candidates plus a `sizes` that matches the content column, so the browser downloads roughly
 * what it displays instead of the multi-megabyte original.
 */
export async function Image({ src, alt, width, height, sizes, loading = 'eager', ...props }: ImageProps) {
  const intrinsicWidth = toNumber(width);
  const intrinsicHeight = toNumber(height);

  if (!canTransform(src)) {
    return <img src={src} alt={alt} width={intrinsicWidth} height={intrinsicHeight} loading={loading} {...props} />;
  }

  // The image displays at its own width, up to the width of the content column
  const slotWidth = Math.min(intrinsicWidth ?? CONTENT_WIDTH, CONTENT_WIDTH);
  const widths = getImageWidths(intrinsicWidth, slotWidth);
  const srcSet = widths.map((w) => `${cloudflareLoader({ src, width: w })} ${w}w`).join(', ');
  // Browsers without srcset support get the 1x size
  const fallbackWidth = widths.find((w) => w >= slotWidth) ?? widths.at(-1) ?? slotWidth;

  return (
    <img
      src={cloudflareLoader({ src, width: fallbackWidth })}
      srcSet={srcSet}
      sizes={sizes ?? getImageSizes(slotWidth)}
      alt={alt}
      width={intrinsicWidth}
      height={intrinsicHeight}
      loading={loading}
      decoding="async"
      {...props}
    />
  );
}
