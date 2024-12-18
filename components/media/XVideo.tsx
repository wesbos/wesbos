"use client";
import { MediaController, MediaControlBar, MediaTimeRange, MediaTimeDisplay, MediaVolumeRange, MediaPlayButton, MediaSeekBackwardButton, MediaSeekForwardButton, MediaMuteButton, MediaPlaybackRateButton } from 'media-chrome/react';
import 'hls-video-element';
import 'media-chrome/menu';
import { MediaCaptionsMenu, MediaPlaybackRateMenu, MediaRenditionMenu, MediaSettingsMenu, MediaSettingsMenuButton, MediaSettingsMenuItem } from 'media-chrome/menu';
import HLSVideoElement from 'hls-video-element';
import { XVideoVariant } from '@/lib/twitter-fetcher';

// https://stackoverflow.com/questions/61015445/using-web-components-within-preact-and-typescript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'hls-video': React.HTMLAttributes<HLSVideoElement>;
      'media-settings-menu': MediaSettingsMenu;
      'media-settings-menu-item': MediaSettingsMenuItem;
      'media-playback-rate-menu': MediaPlaybackRateMenu;
      'media-rendition-menu': MediaRenditionMenu;
      'media-captions-menu': MediaCaptionsMenu;
      'media-settings-menu-button': MediaSettingsMenuButton;
    }
  }
}

export function XVideoPlayer({ url, contentType }: { url: string; contentType: XVideoVariant['content_type'] }) {
  return (
    <div>
      <MediaController>
        {contentType === 'application/x-mpegURL' ? (
          <hls-video loop src={url} slot="media" crossOrigin="anonymous" tabIndex={-1}></hls-video>
        ) : (
          <video loop src={url} slot="media" crossOrigin="anonymous" tabIndex={-1}></video>
        )}
        <media-settings-menu hidden anchor="auto">
          <media-settings-menu-item>
            Quality
            <media-rendition-menu slot="submenu" hidden>
              <div slot="title">Quality</div>
            </media-rendition-menu>
          </media-settings-menu-item>
        </media-settings-menu>

        <MediaControlBar>
          <MediaPlayButton></MediaPlayButton>
          <MediaSeekBackwardButton></MediaSeekBackwardButton>
          <MediaSeekForwardButton></MediaSeekForwardButton>
          <MediaTimeRange></MediaTimeRange>
          <MediaTimeDisplay showDuration></MediaTimeDisplay>
          <MediaMuteButton></MediaMuteButton>
          <MediaVolumeRange></MediaVolumeRange>
          <MediaPlaybackRateButton></MediaPlaybackRateButton>
          <media-settings-menu-button></media-settings-menu-button>
        </MediaControlBar>
      </MediaController>
    </div>
  );
};
