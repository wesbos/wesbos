import { fetchLatestTweets, searchTweets } from './src/lib/socials/twitter-fetcher';
import { fetchLatestBlueSkyPosts } from './src/lib/socials/blueSkyFetcher';

type Platform = 'twitter' | 'bluesky' | 'all';

interface PostSummary {
  platform: string;
  id: string;
  url: string;
  text: string;
  date: string;
}

function tweetToSummary(tweet: { rest_id: string; full_text: string; created_at: string }): PostSummary {
  return {
    platform: 'twitter',
    id: tweet.rest_id,
    url: `https://x.com/wesbos/status/${tweet.rest_id}`,
    text: tweet.full_text,
    date: tweet.created_at,
  };
}

function bskyToSummary(post: { uri: string; record: { text: string; createdAt: string } }): PostSummary {
  const postId = post.uri.split('/').pop() ?? '';
  return {
    platform: 'bluesky',
    id: postId,
    url: `https://bsky.app/profile/wesbos.com/post/${postId}`,
    text: post.record.text,
    date: post.record.createdAt,
  };
}

async function fetchAll(platform: Platform, query?: string): Promise<PostSummary[]> {
  const results: PostSummary[] = [];

  if (platform === 'twitter' || platform === 'all') {
    try {
      const tweets = query ? await searchTweets(query) : await fetchLatestTweets();
      results.push(...tweets.map(tweetToSummary));
    } catch (err) {
      console.error('Twitter error:', (err as Error).message);
    }
  }

  if (platform === 'bluesky' || platform === 'all') {
    try {
      const posts = await fetchLatestBlueSkyPosts();
      results.push(...posts.map(bskyToSummary));
    } catch (err) {
      console.error('BlueSky error:', (err as Error).message);
    }
  }

  results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return results;
}

const args = process.argv.slice(2);
const platformArg = args[0] as Platform | undefined;
const query = args.slice(1).join(' ') || undefined;
const platform = platformArg && ['twitter', 'bluesky', 'all'].includes(platformArg) ? platformArg : 'all';

if (platformArg && !['twitter', 'bluesky', 'all'].includes(platformArg)) {
  console.error('Usage: pnpm list-posts [twitter|bluesky|all] [search query]');
  console.error('\nPlatforms with feed listing support: twitter, bluesky');
  console.error('Instagram, TikTok, LinkedIn require browser — use fetch-social with a direct URL.');
  process.exit(1);
}

const posts = await fetchAll(platform, query);

if (!posts.length) {
  console.error('No posts found');
  process.exit(1);
}

console.log(JSON.stringify(posts, null, 2));
