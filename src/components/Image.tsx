import { Image as UnpicImage } from '@unpic/react';
import { getEnv } from '@/lib/waku';

interface ImageProps {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  className?: string;
}

export async function Image({ src, alt, width, height, className, ...props }: ImageProps) {
  const enableCdn = import.meta.env.MODE !== 'development' && getEnv('CF_IMAGE_CDN') === 'true';

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
