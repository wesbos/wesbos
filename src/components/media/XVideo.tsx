'use client';

const MEDIA_CHROME_CDN = 'https://cdn.jsdelivr.net/npm/media-chrome@4.16.1/dist/iife/index.js';
const HLS_VIDEO_CDN = 'https://cdn.jsdelivr.net/npm/hls-video-element@1.5.10/+esm';

function buildSrcdoc(url: string, isHLS: boolean) {
  const videoTag = isHLS
    ? `<hls-video slot="media" loop muted playsinline preload="metadata" src="${url}"></hls-video>`
    : `<video slot="media" loop muted playsinline preload="metadata" src="${url}"></video>`;

  const hlsScript = isHLS
    ? `<script type="module" src="${HLS_VIDEO_CDN}"></` + 'script>'
    : '';

  return `<!DOCTYPE html>
<html><head>
<style>
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 100%; height: 100%; overflow: hidden; background: black; }
  media-controller { width: 100%; height: 100%; }
  video, hls-video { width: 100%; height: 100%; object-fit: cover; }
</style>
<script src="${MEDIA_CHROME_CDN}"></` + `script>
${hlsScript}
</head>
<body>
  <media-controller>
    ${videoTag}
    <media-control-bar>
      <media-play-button></media-play-button>
      <media-time-range></media-time-range>
      <media-time-display show-duration></media-time-display>
      <media-mute-button></media-mute-button>
      <media-volume-range></media-volume-range>
      <media-playback-rate-button></media-playback-rate-button>
    </media-control-bar>
  </media-controller>
</body></html>`;
}

export function XVideoPlayer({ url, isHLS = false, style }: { url: string; isHLS?: boolean; style?: React.CSSProperties }) {
  return (
    <iframe
      srcDoc={buildSrcdoc(url, isHLS)}
      sandbox="allow-scripts"
      style={{ border: 'none', ...style }}
      title="Video player"
    />
  );
}
