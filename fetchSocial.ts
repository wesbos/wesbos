import { parseSocialLink, type SocialLinkType } from './src/utils/parseSocialLinks';
import { fetchTiktokDetailsFromApi } from './src/lib/socials/tiktokFetcher';
import { fetchInstagramDetailsFromApi } from './src/lib/socials/instagramFetcher';
import { fetchLinkedInDetailsFromApi } from './src/lib/socials/linkedInFetcher';
import { fetchBlueSkyDetailsFromApi } from './src/lib/socials/blueSkyFetcher';
import { fetchTweetDetailsFromApi } from './src/lib/socials/twitter-fetcher';

const url = process.argv[2];
if (!url) {
  console.error('Usage: npx tsx --esm fetchSocial.ts <url>');
  process.exit(1);
}

const link = parseSocialLink(url);
if (!link) {
  console.error(`Could not parse social link: ${url}`);
  process.exit(1);
}

const fetchers: Partial<Record<SocialLinkType, (link: { postId: string; handle?: string }) => Promise<unknown>>> = {
  tiktok: fetchTiktokDetailsFromApi,
  twitter: fetchTweetDetailsFromApi,
  instagram: fetchInstagramDetailsFromApi,
  linkedin: fetchLinkedInDetailsFromApi,
  bluesky: fetchBlueSkyDetailsFromApi,
};

const fetcher = fetchers[link.type];
if (!fetcher) {
  console.error(`No fetcher for type: ${link.type} (supported: ${Object.keys(fetchers).join(', ')})`);
  process.exit(1);
}

console.error(`Fetching ${link.type} post ${link.postId}...`);
const result = await fetcher({ postId: link.postId, handle: link.handle });
if (!result) {
  console.error('No data returned');
  process.exit(1);
}
console.log(JSON.stringify(result, null, 2));
