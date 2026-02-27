import { describe, expect, test } from 'vitest';
import { fetchBlueSkyDetailsFromApi } from './blueSkyFetcher';
import { fetchInstagramDetailsFromApi } from './instagramFetcher';
import { fetchLinkedInDetailsFromApi } from './linkedInFetcher';
import { fetchTiktokDetailsFromApi } from './tiktokFetcher';
import { fetchTweetDetailsFromApi } from './twitter-fetcher';

process.loadEnvFile();

describe('Twitter fetcher', () => {
  test('fetches a tweet with expected fields', async () => {
    const result = await fetchTweetDetailsFromApi({ postId: '1834242925401694490' });
    expect(result).toBeDefined();
    expect(result).toMatchObject({
      full_text: expect.any(String),
      created_at: expect.any(String),
      rest_id: '1834242925401694490',
      favorite_count: expect.any(Number),
      retweet_count: expect.any(Number),
      reply_count: expect.any(Number),
      bookmark_count: expect.any(Number),
      views: { count: expect.any(Number) },
    });
  });
});

describe('Instagram fetcher', () => {
  test('fetches a post with expected fields', async () => {
    const result = await fetchInstagramDetailsFromApi({ postId: 'DUi6MLoilQo' });
    expect(result).toBeDefined();
    expect(result?.xdt_shortcode_media).toBeDefined();
    const media = result?.xdt_shortcode_media;
    expect(media).toMatchObject({
      shortcode: 'DUi6MLoilQo',
      edge_media_preview_like: { count: expect.any(Number) },
      video_play_count: expect.any(Number),
      owner: { username: expect.any(String) },
    });
    expect(media?.edge_media_to_caption.edges.length).toBeGreaterThan(0);
  });
});

describe('TikTok fetcher', () => {
  test('fetches a video with expected fields', async () => {
    const result = await fetchTiktokDetailsFromApi({ postId: '7413769211039730950', handle: 'wesbos' });
    expect(result).toBeDefined();
    expect(result).toMatchObject({
      id: '7413769211039730950',
      desc: expect.any(String),
    });
    const stats = result?.statsV2 ?? result?.stats;
    expect(stats).toBeDefined();
    expect(Number(stats?.diggCount)).toEqual(expect.any(Number));
    expect(Number(stats?.shareCount)).toEqual(expect.any(Number));
    expect(Number(stats?.commentCount)).toEqual(expect.any(Number));
    expect(Number(stats?.playCount)).toEqual(expect.any(Number));
  });
});

describe('LinkedIn fetcher', () => {
  test('fetches a post with expected fields', async () => {
    const result = await fetchLinkedInDetailsFromApi({ postId: '7272663944106782720' });
    expect(result).toBeDefined();
    expect(result).toMatchObject({
      '@type': expect.any(String),
      description: expect.any(String),
      creator: expect.objectContaining({ name: expect.any(String) }),
      likeCount: expect.any(Number),
      commentCount: expect.any(Number),
    });
  });
});

describe('BlueSky fetcher', () => {
  test('fetches a post with expected fields', async () => {
    const result = await fetchBlueSkyDetailsFromApi({ postId: '3lbsenppiy22l' });
    expect(result).toBeDefined();
    expect(result).toMatchObject({
      uri: expect.stringContaining('3lbsenppiy22l'),
      author: expect.objectContaining({
        handle: 'wesbos.com',
        displayName: expect.any(String),
      }),
      likeCount: expect.any(Number),
      replyCount: expect.any(Number),
      repostCount: expect.any(Number),
      quoteCount: expect.any(Number),
    });
  });
});
