export interface InstagramDimensions {
  height: number;
  width: number;
}

export interface SharingFrictionInfo {
  should_have_sharing_friction: boolean;
  bloks_app_url: string | null;
}

export interface DisplayResource {
  src: string;
  config_width: number;
  config_height: number;
}

export interface DashInfo {
  is_dash_eligible: boolean;
  video_dash_manifest: string | null;
  number_of_qualities: number;
}

export interface ClipsMusicAttributionInfo {
  artist_name: string;
  song_name: string;
  uses_original_audio: boolean;
  should_mute_audio: boolean;
  should_mute_audio_reason: string;
  audio_id: string;
}

export interface Owner {
  id: string;
  username: string;
}

export interface EdgeMediaToCaption {
  edges: Array<{
    node: {
      text: string;
    };
  }>;
}

export interface EdgeMediaPreviewLike {
  count: number;
  edges: Array<any>;
}

export interface XDTShortcodeMedia {
  __typename: string;
  __isXDTGraphMediaInterface: string;
  id: string;
  shortcode: string;
  thumbnail_src: string;
  dimensions: InstagramDimensions;
  gating_info: null;
  fact_check_overall_rating: null;
  fact_check_information: null;
  sensitivity_friction_info: null;
  sharing_friction_info: SharingFrictionInfo;
  media_overlay_info: null;
  media_preview: string;
  display_url: string;
  display_resources: DisplayResource[];
  accessibility_caption: null;
  dash_info: DashInfo;
  has_audio: boolean;
  video_url: string;
  video_view_count: number;
  video_play_count: number;
  encoding_status: null;
  is_published: boolean;
  product_type: string;
  title: string;
  video_duration: number;
  clips_music_attribution_info: ClipsMusicAttributionInfo;
  is_video: boolean;
  tracking_token: string;
  upcoming_event: null;
  edge_media_to_tagged_user: { edges: any[] };
  owner: Owner;
  edge_media_to_caption: EdgeMediaToCaption;
  can_see_insights_as_brand: boolean;
  caption_is_edited: boolean;
  has_ranked_comments: boolean;
  like_and_view_counts_disabled: boolean;
  edge_media_to_parent_comment: { edges: any[] };
  edge_media_to_hoisted_comment: { edges: any[] };
  edge_media_preview_comment: { edges: any[] };
  comments_disabled: boolean;
  commenting_disabled_for_viewer: boolean;
  taken_at_timestamp: number;
  edge_media_preview_like: EdgeMediaPreviewLike;
  edge_media_to_sponsor_user: { edges: any[] };
  is_affiliate: boolean;
  is_paid_partnership: boolean;
  location: null;
  nft_asset_info: null;
  viewer_has_liked: boolean;
  viewer_has_saved: boolean;
  viewer_has_saved_to_collection: boolean;
  viewer_in_photo_of_you: boolean;
  viewer_can_reshare: boolean;
  is_ad: boolean;
  edge_web_media_to_related_media: { edges: any[] };
  coauthor_producers: any[];
  pinned_for_users: any[];
}

export interface InstagramApiResponse {
  data: {
    xdt_shortcode_media: XDTShortcodeMedia;
  };
  extensions: {
    is_final: boolean;
  };
  status: string;
}
export type InstagramPost = InstagramApiResponse['data'];
