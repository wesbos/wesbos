"use server";
import { FetcherService, EResourceType, ITweetDetailsResponse } from 'rettiwt-api';

const fetcher = new FetcherService({ apiKey: process.env.TWITTER_API_KEY });

export async function fetchTweetDetailsFromApi({ postId }: { postId: string }) {
  // Fetching the details of the given user
  const postDetails = await fetcher
    .request<ITweetDetailsResponse>(EResourceType.TWEET_DETAILS, { id: postId })
    .catch((err) => {
      console.log(`Error fetching tweet details for ${postId}`, err.message);
    });
  const result = postDetails?.data?.tweetResult?.result;
  if (!result) {
    console.log(`No tweet details found for ${postId}`);
    return; // nothing to return
  }
  // Otherwise we slim it up to the essentials
  const { views, legacy  } = result;
  return {
    views,
    ...legacy,
  };
}

export interface XMediaEntity {
  display_url: string;
  expanded_url: string;
  id_str: string;
  indices: [number, number];
  media_key: string;
  media_url_https: string;
  type: string;
  url: string;
  additional_media_info: {
    monetizable: boolean;
  };
  ext_media_availability: {
    status: string;
  };
  sizes: {
    large: XMediaSize;
    medium: XMediaSize;
    small: XMediaSize;
    thumb: XMediaSize;
  };
  original_info: {
    height: number;
    width: number;
    focus_rects: any[];
  };
  video_info: {
    aspect_ratio: [number, number];
    duration_millis: number;
    variants: XVideoVariant[];
  };
}

interface XMediaSize {
  h: number;
  w: number;
  resize: string;
}

export interface XVideoVariantStream {
  content_type: "application/x-mpegURL";
  url: string;
}

export interface XVideoVariantFile {
  bitrate: number;
  content_type: "video/mp4";
  url: string;
}

export type XVideoVariant = XVideoVariantStream | XVideoVariantFile;

export type TweetDetails = NonNullable<Awaited<ReturnType<typeof fetchTweetDetailsFromApi>>>;

export type XMedia = XMediaEntity[];
