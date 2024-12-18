import { desc, eq } from 'drizzle-orm';
import { getDb } from '@/db/db';
import { postsTable } from '@/db/schema';
import { FetcherService, EResourceType, ITweetDetailsResponse } from 'rettiwt-api';

const fetcher = new FetcherService({ apiKey: process.env.TWITTER_API_KEY });

export async function fetchTweetDetails(tweetId: string) {
  // console.log('Checking the DB first');
  const db = await getDb();
  const result = await db.query.postsTable.findFirst({
    where: eq(postsTable.postId, tweetId),
    orderBy: desc(postsTable.createdAt),
  });
  if (result) {
    // console.log('Found in the DB');
    return result;
  }
  // console.log('Not found in the DB, fetching from the API');
  const freshResult = await fetchTweetDetailsFromApi(tweetId);
  if(!freshResult) return; // The API returned nothing or was rate limited
  const returnedFreshResult = await db.insert(postsTable).values({
    type: 'tweet',
    url: `https://twitter.com/i/web/status/${tweetId}`,
    postId: tweetId,
    postData: freshResult,
  }).returning();
  return returnedFreshResult[0];
}

export async function fetchTweetDetailsFromApi(tweetId: string) {
  // Fetching the details of the given user
  const postDetails = await fetcher
    .request<ITweetDetailsResponse>(EResourceType.TWEET_DETAILS, { id: tweetId })
    .catch((err) => {
      console.log(`Error fetching tweet details for ${tweetId}`, err.message);
    });
  const result = postDetails?.data?.tweetResult?.result;
  if (!result) {
    console.log(`No tweet details found for ${tweetId}`);
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
