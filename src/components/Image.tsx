import { Image as UnpicImage } from '@unpic/react';

interface ImageProps {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  className?: string;
}

export async function Image({ src, alt, width, height, className, ...props }: ImageProps) {
  return (
    <UnpicImage
      src={src}
      alt={alt}
      width={width as number}
      height={height as number}
      className={className}
      {...props}
      {...(import.meta.env.MODE !== 'development' && {
        cdn: 'cloudflare',
      })}
      loading="eager"
    />
  );
}
