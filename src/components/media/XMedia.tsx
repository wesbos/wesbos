import type { XMediaEntity, XVideoVariant } from '@/lib/socials/twitter-fetcher';
import { XVideoPlayer } from './XVideo';

function findBestVariant(variants: XVideoVariant[]) {
  const hls = variants.find((v) => v.content_type === 'application/x-mpegURL');
  if (hls) return hls;
  return variants
    .filter((v): v is Extract<XVideoVariant, { content_type: 'video/mp4' }> => v.content_type === 'video/mp4')
    .sort((a, b) => b.bitrate - a.bitrate)
    .at(0);
}

export function XMediaDisplay({ media }: { media: XMediaEntity[] }) {
  if (!media) return null;
  const first = media.at(0);
  if (!first) return null;

  if (first.type === 'photo') {
    const aspectRatio = `${first.original_info?.width} / ${first.original_info?.height}`;
    return <img src={first.media_url_https} alt="" style={{ aspectRatio }} />;
  }

  return <XMediaDisplayVideo media={first} />;
}

function XMediaDisplayVideo({ media }: { media: XMediaEntity }) {
  const video = media.video_info;
  if (!video?.variants) return null;
  const best = findBestVariant(video.variants);
  if (!best) return null;
  const aspectRatio = video.aspect_ratio;

  return (
    <XVideoPlayer
      url={best.url}
      isHLS={best.content_type === 'application/x-mpegURL'}
      style={{ aspectRatio: `${aspectRatio[0]}/${aspectRatio[1]}`, width: '100%' }}
    />
  );
}
