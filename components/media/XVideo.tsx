"use client";
import { MediaController, MediaControlBar, MediaTimeRange, MediaTimeDisplay, MediaVolumeRange, MediaPlayButton, MediaSeekBackwardButton, MediaSeekForwardButton, MediaMuteButton, MediaPlaybackRateButton } from 'media-chrome/react';
import 'hls-video-element';
import 'media-chrome/menu';
// import { MediaCaptionsMenu, MediaPlaybackRateMenu, MediaRenditionMenu, MediaSettingsMenu, MediaSettingsMenuButton, MediaSettingsMenuItem } from 'media-chrome/menu';
import HLSVideoElement from 'hls-video-element';
import { XVideoVariant } from '@/lib/twitter-fetcher';
import { MediaSettingsMenu, MediaSettingsMenuButton, MediaSettingsMenuItem, MediaCaptionsMenu, MediaPlaybackRateMenu, MediaRenditionMenu } from 'media-chrome/react/menu';
export function XVideoPlayer({ url, contentType, style }: { url: string; contentType: XVideoVariant['content_type']; style: React.CSSProperties }) {
  return (
    <div style={style}>
      <MediaController>
        {contentType === 'application/x-mpegURL' ? (
          <hls-video loop muted autoPlay src={url} slot="media" crossOrigin="anonymous" tabIndex={-1}></hls-video>
        ) : (
          <video loop muted autoPlay src={url} slot="media" crossOrigin="anonymous" tabIndex={-1}></video>
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
          <MediaPlayButton></MediaPlayButton>
          <MediaTimeRange></MediaTimeRange>
          <MediaTimeDisplay showDuration></MediaTimeDisplay>
          <MediaMuteButton></MediaMuteButton>
          <MediaVolumeRange></MediaVolumeRange>
          <MediaPlaybackRateButton></MediaPlaybackRateButton>
          <MediaSettingsMenuButton></MediaSettingsMenuButton>
        </MediaControlBar>
      </MediaController>
    </div>
  );
};
