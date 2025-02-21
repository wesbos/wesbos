"use server";
import { desc } from 'drizzle-orm';
import { eq } from 'drizzle-orm';
import { getDb } from '@/db/db';
import { Post, postsTable } from '@/db/schema';
import { SocialLink, SocialLinkType } from '@/utils/parseSocialLinks';
import { fetchTweetDetailsFromApi } from './twitter-fetcher';
import { fetchLinkedInDetailsFromApi } from './linkedInFetcher';
import { fetchBlueSkyDetailsFromApi } from './blueSkyFetcher';
import { fetchInstagramDetailsFromApi } from './instagramFetcher';
import { fetchTiktokDetailsFromApi } from './tiktokFetcher';

const fetchers: Record<SocialLinkType, (link: SocialLink) => Promise<Post['postData'] | undefined>> = {
  twitter: fetchTweetDetailsFromApi,
  instagram: fetchInstagramDetailsFromApi,
  tiktok: fetchTiktokDetailsFromApi,
  youtube: () => Promise.resolve(undefined),
  threads: () => Promise.resolve(undefined),
  linkedin: fetchLinkedInDetailsFromApi,
  bluesky: fetchBlueSkyDetailsFromApi,
};

export async function fetchSocialDetails(link: SocialLink) {
  const fetcher = fetchers[link.type];
  if (!fetcher) {
    console.error(`${link.type}: No fetcher found`);
    return;
  }
  // console.log(`Fetching social details for ${link.type} / ${link.postId}`);
  const db = await getDb();
  if (!db) {
    console.error('No DB found');
    return;
  }
  const query = {
    where: eq(postsTable.postId, link.postId),
    orderBy: desc(postsTable.createdAt),
  }
  const result = await db.query.postsTable.findFirst(query);
  if (result) {
    // console.log(`${link.type}: Found in the DB`);
    return result;
  }
  console.log(`${link.type}: Not found in the DB, fetching from the API`);
  const freshResult = await fetcher(link);
  if (!freshResult) {
    console.warn(`${link.type}: No result from the API`);
    return;
  }
  const returnedFreshResult = await db.insert(postsTable).values({
    type: link.type,
    url: link.url,
    postId: link.postId,
    postData: freshResult,
  }).returning();
  return returnedFreshResult[0];
}
