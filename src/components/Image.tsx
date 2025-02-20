interface ImageProps {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  className?: string;
}

export function Image({ src, alt, width, height, className, ...props }: ImageProps) {
  return <img src={src} alt={alt} width={width} height={height} className={className} {...props} />;
}
