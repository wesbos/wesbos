"use client";
import { MediaController, MediaControlBar, MediaTimeRange, MediaTimeDisplay, MediaVolumeRange, MediaPlayButton, MediaMuteButton, MediaPlaybackRateButton } from 'media-chrome/react';
// import HLSVideoElement from 'hls-video-element/react';
import { XVideoVariant } from '@/lib/socials/twitter-fetcher';
import { MediaSettingsMenu, MediaSettingsMenuButton, MediaSettingsMenuItem, MediaRenditionMenu } from 'media-chrome/react/menu';
export function XVideoPlayer({ url, contentType, style }: { url: string; contentType: XVideoVariant['content_type']; style: React.CSSProperties }) {
  return (
    <div style={style}>
      <MediaController>
        {contentType === 'application/x-mpegURL' ? (
          <div>
            {/* <p>HLS Video temporarily disabled because its too large for cloudflare workers</p> */}
            {/*<HLSVideoElement onErrorCapture={(err) => {
            console.log('error playing hls video', err);
          }} loop muted autoPlay src={url} slot="media" crossOrigin="anonymous" tabIndex={-1}></HLSVideoElement> */}
          </div>
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
