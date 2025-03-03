'use server';
import TWIT from 'rettiwt-api';
import { getCloudflareContext } from '@/lib/hono';
import { getEnv } from '../waku';
const { EResourceType, FetcherService, ITweetDetailsResponse, IUserTweetsResponse } = TWIT;

const TWITTER_API_KEY = getEnv('TWITTER_API_KEY');
const fetcher = new FetcherService({ apiKey: TWITTER_API_KEY });

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
  const { views, legacy } = result;
  return {
    views,
    ...legacy,
  };
}

function formatTimeline(response: IUserTweetsResponse) {
  const tweets = [];
  // Types are wrong - Its' timeline.timeline
  type Instructions = typeof response.data.user.result.timeline_v2.timeline.instructions & {
    entry?: Entry;
  };
  type Entry =
    IUserTweetsResponse['data']['user']['result']['timeline_v2']['timeline']['instructions'][number]['entries'][number];
  // @ts-ignore
  const instructions = response.data.user.result.timeline.timeline.instructions as Instructions[];

  for (const instruction of instructions) {
    // Handle both single entry and multiple entries
    const entries = (instruction.entry ? [instruction.entry] : instruction.entries || []) as Entry[];

    for (const entry of entries) {
      if (entry?.content?.itemContent?.tweet_results?.result?.legacy) {
        tweets.push(entry.content.itemContent.tweet_results.result);
      }
    }
  }

  return tweets;
}

type Tweet = ReturnType<typeof formatTimeline>[number] & {
  views: {
    count: number;
  };
};

export async function fetchLatestTweets(): Promise<Tweet[]> {
  // const tweets = await rettiwt.user.timeline('815246', 10);
  const tweets = await fetcher.request<IUserTweetsResponse>(EResourceType.USER_TIMELINE, { id: '815246', count: 10 });
  const formattedTweets = formatTimeline(tweets);
  return formattedTweets as Tweet[];
}

export type XMediaEntity = Tweet['legacy']['entities']['media'] & {
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
};

interface XMediaSize {
  h: number;
  w: number;
  resize: string;
}

export interface XVideoVariantStream {
  content_type: 'application/x-mpegURL';
  url: string;
}

export interface XVideoVariantFile {
  bitrate: number;
  content_type: 'video/mp4';
  url: string;
}

export type XVideoVariant = XVideoVariantStream | XVideoVariantFile;

export type TweetDetails = NonNullable<Awaited<ReturnType<typeof fetchTweetDetailsFromApi>>>;

export type XMedia = XMediaEntity[];
