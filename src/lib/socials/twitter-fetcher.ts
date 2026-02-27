'use server';
import { getEnv } from '../waku';

const X_API_BASE = 'https://api.x.com/2';

const TWEET_FIELDS = [
  'created_at',
  'public_metrics',
  'entities',
  'attachments',
  'author_id',
  'referenced_tweets',
  'note_tweet',
].join(',');

const MEDIA_FIELDS = [
  'media_key',
  'type',
  'url',
  'preview_image_url',
  'width',
  'height',
  'alt_text',
  'variants',
  'duration_ms',
].join(',');

const USER_FIELDS = ['pinned_tweet_id'].join(',');

const EXPANSIONS = ['attachments.media_keys', 'author_id'].join(',');

async function xApiFetch(url: string) {
  const bearerToken = getEnv('X_BEARER_TOKEN');
  if (!bearerToken) throw new Error('X_BEARER_TOKEN is not set');
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${bearerToken}` },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`X API error ${res.status}: ${body}`);
  }
  return res.json();
}

interface XApiTweet {
  id: string;
  text: string;
  author_id?: string;
  created_at?: string;
  public_metrics?: {
    retweet_count: number;
    reply_count: number;
    like_count: number;
    quote_count: number;
    bookmark_count: number;
    impression_count: number;
  };
  entities?: {
    urls?: { start: number; end: number; url: string; expanded_url: string; display_url: string }[];
    mentions?: { start: number; end: number; username: string }[];
  };
  attachments?: {
    media_keys?: string[];
  };
  note_tweet?: {
    text: string;
    entities?: XApiTweet['entities'];
  };
  referenced_tweets?: { type: string; id: string }[];
}

interface XApiMedia {
  media_key: string;
  type: 'photo' | 'video' | 'animated_gif';
  url?: string;
  preview_image_url?: string;
  width?: number;
  height?: number;
  alt_text?: string;
  variants?: { bit_rate?: number; content_type: string; url: string }[];
  duration_ms?: number;
}

interface XApiUser {
  id: string;
  name: string;
  username: string;
  pinned_tweet_id?: string;
}

interface XApiResponse<T> {
  data: T;
  includes?: {
    media?: XApiMedia[];
    users?: XApiUser[];
  };
  meta?: {
    result_count: number;
    newest_id: string;
    oldest_id: string;
    next_token?: string;
  };
}

function mediaToLegacy(media: XApiMedia): XMediaEntity {
  const mediaUrl = media.type === 'photo' ? (media.url ?? '') : (media.preview_image_url ?? '');
  return {
    display_url: mediaUrl,
    expanded_url: mediaUrl,
    id_str: media.media_key,
    indices: [0, 0],
    media_key: media.media_key,
    media_url_https: mediaUrl,
    type: media.type === 'animated_gif' ? 'animated_gif' : media.type,
    url: mediaUrl,
    additional_media_info: { monetizable: false },
    ext_media_availability: { status: 'Available' },
    sizes: {
      large: { h: media.height ?? 0, w: media.width ?? 0, resize: 'fit' },
      medium: { h: media.height ?? 0, w: media.width ?? 0, resize: 'fit' },
      small: { h: media.height ?? 0, w: media.width ?? 0, resize: 'fit' },
      thumb: { h: 150, w: 150, resize: 'crop' },
    },
    original_info: {
      height: media.height ?? 0,
      width: media.width ?? 0,
      focus_rects: [],
    },
    video_info: {
      aspect_ratio: media.width && media.height ? [media.width, media.height] : [16, 9],
      duration_millis: media.duration_ms ?? 0,
      variants: (media.variants ?? []).map((v) => {
        if (v.content_type === 'application/x-mpegURL') {
          return { content_type: v.content_type as 'application/x-mpegURL', url: v.url };
        }
        return { bitrate: v.bit_rate ?? 0, content_type: v.content_type as 'video/mp4', url: v.url };
      }),
    },
  } as XMediaEntity;
}

function tweetToLegacy(tweet: XApiTweet, mediaList?: XApiMedia[]) {
  const metrics = tweet.public_metrics;
  const fullText = tweet.note_tweet?.text ?? tweet.text;
  const attachedMedia = tweet.attachments?.media_keys
    ?.map((key) => mediaList?.find((m) => m.media_key === key))
    .filter((m): m is XApiMedia => !!m)
    .map(mediaToLegacy);

  const entities: Record<string, unknown> = { ...tweet.entities };
  if (attachedMedia?.length) {
    entities.media = attachedMedia;
  }

  return {
    full_text: fullText,
    created_at: tweet.created_at ?? '',
    favorite_count: metrics?.like_count ?? 0,
    retweet_count: metrics?.retweet_count ?? 0,
    reply_count: metrics?.reply_count ?? 0,
    quote_count: metrics?.quote_count ?? 0,
    bookmark_count: metrics?.bookmark_count ?? 0,
    entities,
    extended_entities: attachedMedia?.length ? { media: attachedMedia } : undefined,
    views: { count: metrics?.impression_count ?? 0 },
    rest_id: tweet.id,
  };
}

export async function fetchTweetDetailsFromApi({ postId }: { postId: string }) {
  const params = new URLSearchParams({
    'tweet.fields': TWEET_FIELDS,
    'media.fields': MEDIA_FIELDS,
    expansions: EXPANSIONS,
  });
  const url = `${X_API_BASE}/tweets/${postId}?${params}`;
  const json = (await xApiFetch(url).catch((err) => {
    console.log(`Error fetching tweet details for ${postId}`, err.message);
    return null;
  })) as XApiResponse<XApiTweet> | null;

  if (!json?.data) {
    console.log(`No tweet details found for ${postId}`);
    return;
  }

  return tweetToLegacy(json.data, json.includes?.media);
}

type Tweet = ReturnType<typeof tweetToLegacy> & {
  core?: {
    user_results: {
      result: {
        legacy: {
          pinned_tweet_ids_str: string[];
        };
      };
    };
  };
};

export async function fetchLatestTweets(): Promise<Tweet[]> {
  const WESBOS_USER_ID = '815246';
  const params = new URLSearchParams({
    max_results: '10',
    exclude: 'retweets,replies',
    'tweet.fields': TWEET_FIELDS,
    'media.fields': MEDIA_FIELDS,
    'user.fields': USER_FIELDS,
    expansions: EXPANSIONS,
  });
  const url = `${X_API_BASE}/users/${WESBOS_USER_ID}/tweets?${params}`;
  const json = (await xApiFetch(url)) as XApiResponse<XApiTweet[]>;

  if (!json.data?.length) return [];

  const user = json.includes?.users?.find((u) => u.id === WESBOS_USER_ID);
  const pinnedId = user?.pinned_tweet_id;

  return json.data.map((tweet) => {
    const legacy = tweetToLegacy(tweet, json.includes?.media);
    return {
      ...legacy,
      core: {
        user_results: {
          result: {
            legacy: {
              pinned_tweet_ids_str: pinnedId ? [pinnedId] : [],
            },
          },
        },
      },
    };
  });
}

export type XMediaEntity = {
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
    focus_rects: unknown[];
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
