import { XMedia, XMediaEntity, XVideoVariant, XVideoVariantFile } from '@/lib/socials/twitter-fetcher';
import { XVideoPlayer } from './XVideo';
function findBestXMediaVariant(variants: XVideoVariant[]) {
  // First look for content_type "application/x-mpegURL".
  const xMpegUrl = variants.find((variant) => variant.content_type === 'application/x-mpegURL');
  if (xMpegUrl) return xMpegUrl;
  // if not return the one with the highest bitrate.
  return variants
    .filter((v): v is XVideoVariantFile => v.content_type === 'video/mp4')
    .sort((a, b) => b.bitrate - a.bitrate)
    .at(0);
}

export function XMediaDisplay({ media }: { media: XMediaEntity[] }) {
  if (!media) {
    console.log(`No media foundd`, media);
    return null; // Some tips are just text
  }
  // Calculate the aspect ratio of the media
  if (media.at(0)?.type === 'photo') {
    const photo = media.at(0);
    const aspectRatio = `${photo?.original_info?.width} / ${photo?.original_info?.height}`;
    return <img src={media.at(0)?.media_url_https} style={{ aspectRatio }} />;
  }
  return <XMediaDisplayVideo media={media} />;
}

export function XMediaDisplayVideo({ media }: { media: XMediaEntity[] }) {
  const video = media.at(0)?.video_info;
  const variants = video?.variants;
  if (!video || !variants) return null; // No video variants
  const bestVariant = findBestXMediaVariant(variants);
  if (!bestVariant) return null; // No best variant
  const aspectRatio = video.aspect_ratio;
  return (
    <XVideoPlayer
      style={{
        aspectRatio: `${aspectRatio[0]}/${aspectRatio[1]}`,
      }}
      url={bestVariant.url}
      contentType={bestVariant.content_type}
    />
  );
}
