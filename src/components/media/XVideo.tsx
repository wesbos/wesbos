'use client';
import type { XVideoVariant } from '@/lib/socials/twitter-fetcher';
import HLSVideoElement from 'hls-video-element/react';
import {
  MediaControlBar,
  MediaController,
  MediaMuteButton,
  MediaPlayButton,
  MediaPlaybackRateButton,
  MediaTimeDisplay,
  MediaTimeRange,
  MediaVolumeRange,
} from 'media-chrome/react';
import {
  MediaRenditionMenu,
  MediaSettingsMenu,
  MediaSettingsMenuButton,
  MediaSettingsMenuItem,
} from 'media-chrome/react/menu';
export function XVideoPlayer({
  url,
  contentType,
  style,
}: {
  url: string;
  contentType: XVideoVariant['content_type'];
  style: React.CSSProperties;
}) {
  return (
    <div style={style}>
      <MediaController>
        {contentType === 'application/x-mpegURL' ? (
          <HLSVideoElement
            onErrorCapture={(err) => {
              console.log('error playing hls video', err);
            }}
            loop
            muted
            autoplay
            playsInline
            src={url}
            slot="media"
            crossOrigin="anonymous"
            tabIndex={-1}
          />
        ) : (
          <video loop muted autoPlay playsInline src={url} slot="media" crossOrigin="anonymous" tabIndex={-1} />
        )}
        <MediaSettingsMenu hidden anchor="auto">
          <MediaSettingsMenuItem>
            Quality
            <MediaRenditionMenu slot="submenu" hidden>
              <div slot="title">Quality</div>
            </MediaRenditionMenu>
          </MediaSettingsMenuItem>
        </MediaSettingsMenu>

        <MediaControlBar>
          <MediaPlayButton />
          <MediaTimeRange />
          <MediaTimeDisplay showDuration />
          <MediaMuteButton />
          <MediaVolumeRange />
          <MediaPlaybackRateButton />
          <MediaSettingsMenuButton />
        </MediaControlBar>
      </MediaController>
    </div>
  );
}
