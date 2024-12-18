import { XMedia, XMediaEntity, XVideoVariant, XVideoVariantFile } from "@/lib/twitter-fetcher";
import { XVideoPlayer } from "./XVideo";
function findBestXMediaVariant(variants: XVideoVariant[]) {
  // First look for content_type "application/x-mpegURL".
  const xMpegUrl = variants.find(variant => variant.content_type === 'application/x-mpegURL');
  if (xMpegUrl) return xMpegUrl;
  // if not return the one with the highest bitrate.
  return variants
    .filter((v): v is XVideoVariantFile => v.content_type === 'video/mp4')
    .sort((a, b) => b.bitrate - a.bitrate)
    .at(0);
}

export function XMediaDisplay({ media }: { media: XMediaEntity[]}) {
  if(!media) {
    console.log(`No media foundd`, media);
    return null; // Some tips are just text
  }
  if (media.at(0)?.type === 'photo') {
    return <img src={media.at(0)?.media_url_https} />;
  }
  return <XMediaDisplayVideo media={media} />;
}

export function XMediaDisplayVideo({ media }: { media: XMediaEntity[]}) {
  const variants = media.at(0)?.video_info?.variants;
  if (!variants) return null; // No video variants
  const bestVariant = findBestXMediaVariant(variants);
  if (!bestVariant) return null; // No best variant
  return <XVideoPlayer url={bestVariant.url} contentType={bestVariant.content_type} />;
}
