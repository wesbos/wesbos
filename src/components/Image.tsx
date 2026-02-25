import { Image as UnpicImage } from '@unpic/react';
import { getHonoContext } from '@/lib/hono';

interface ImageProps {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  className?: string;
}

function isProductionDomain(): boolean {
  try {
    const ctx = getHonoContext();
    if (!ctx) return false;
    const url = new URL(ctx.req.url);
    return url.hostname === 'wesbos.com' || url.hostname === 'www.wesbos.com';
  } catch {
    return false;
  }
}

export async function Image({ src, alt, width, height, className, ...props }: ImageProps) {
  const enableCdn = import.meta.env.MODE !== 'development' && isProductionDomain();

  return (
    <UnpicImage
      src={src}
      alt={alt}
      width={width as number}
      height={height as number}
      className={className}
      {...props}
      {...(enableCdn && {
        cdn: 'cloudflare',
      })}
      loading="eager"
    />
  );
}
