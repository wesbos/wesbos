import { Image as UnpicImage } from "@unpic/react";

interface ImageProps {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  className?: string;
}

export async function Image({
  src,
  alt,
  width,
  height,
  className,
  ...props
}: ImageProps) {
  return (
    <UnpicImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      cdn="cloudflare"
      className={className}
      {...props}
      loading="eager"
    />
  );
}
