import type { XMediaEntity } from '@/lib/socials/twitter-fetcher';

export function XMediaDisplay({ media, tweetUrl }: { media: XMediaEntity[]; tweetUrl?: string | undefined }) {
  if (!media) return null;
  const first = media.at(0);
  if (!first) return null;

  if (first.type === 'photo') {
    const aspectRatio = `${first.original_info?.width} / ${first.original_info?.height}`;
    return <img src={first.media_url_https} alt="" style={{ aspectRatio }} />;
  }

  if (!tweetUrl) return null;
  return <XMediaDisplayVideo media={first} tweetUrl={tweetUrl} />;
}

function XMediaDisplayVideo({ media, tweetUrl }: { media: XMediaEntity; tweetUrl: string }) {
  const preview = media.media_url_https;
  if (!preview) return null;
  const aspectRatio = media.video_info?.aspect_ratio;
  const style = aspectRatio
    ? { aspectRatio: `${aspectRatio[0]}/${aspectRatio[1]}` }
    : undefined;

  return (
    <a
      href={tweetUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Play video on X"
      style={{ display: 'block', position: 'relative', ...style }}
    >
      <img
        src={preview}
        alt="Video thumbnail"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      <span
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.3)',
        }}
      >
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <circle cx="32" cy="32" r="32" fill="rgba(0,0,0,0.6)" />
          <path d="M26 20L46 32L26 44V20Z" fill="white" />
        </svg>
      </span>
    </a>
  );
}
