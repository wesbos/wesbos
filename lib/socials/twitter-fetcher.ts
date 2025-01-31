"use server";
import { Rettiwt, FetcherService, EResourceType, ITweetDetailsResponse, IUserTweetsResponse } from 'rettiwt-api';
import { getCloudflareContext } from '@opennextjs/cloudflare';

const fetcher = new FetcherService({ apiKey: process.env.TWITTER_API_KEY });
const rettiwt = new Rettiwt({ apiKey: process.env.TWITTER_API_KEY });

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

function formatTimeline(response: IUserTweetsResponse) {
  const tweets = [];
  console.log(response.data.user.result);
  // Types are wrong - Its' timeline.timeline
  type Instructions = typeof response.data.user.result.timeline_v2.timeline.instructions & {
    entry?: Entry;
  };
  type Entry = IUserTweetsResponse['data']['user']['result']['timeline_v2']['timeline']['instructions'][number]['entries'][number];
  // @ts-ignore
  const instructions = response.data.user.result.timeline.timeline.instructions as Instructions[];

  for (const instruction of instructions) {
    // Handle both single entry and multiple entries
    const entries = (instruction.entry ? [instruction.entry] : instruction.entries || [] )as Entry[];

    for (const entry of entries) {
      if (entry?.content?.itemContent?.tweet_results?.result?.legacy) {
        tweets.push(entry.content.itemContent.tweet_results.result);
      }
    }
  }

  return tweets;
}

const SHOULD_CACHE_TWEETS = true;

type Tweet = ReturnType<typeof formatTimeline>[number] & {
  views: {
    count: number;
  };
};

export async function fetchLatestTweets(): Promise<Tweet[]> {

  const kv = getCloudflareContext().env.OG;
  // check if the tweets are in the KV cache
  if (SHOULD_CACHE_TWEETS) {
    const cachedTweets = await kv.get<Tweet[]>('tweets', 'json');
    if (cachedTweets) {
      console.log('returning cached tweets');
      return cachedTweets;
    }
  }
  console.log('FETCHing fresh tweets');
  // const tweets = await rettiwt.user.timeline('815246', 10);
  const tweets = await fetcher.request<IUserTweetsResponse>(EResourceType.USER_TIMELINE, { id: '815246', count: 10 });
  const formattedTweets = formatTimeline(tweets);
  console.log(formattedTweets);
  // stick the tweets in the KV cache for 15 minutes
  if (SHOULD_CACHE_TWEETS) {
    await kv.put('tweets', JSON.stringify(formattedTweets), { expirationTtl: 60 * 15 });
  }
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
