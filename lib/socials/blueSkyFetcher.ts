"use server";
import { desc, eq } from 'drizzle-orm';
import { getDb } from '@/db/db';
import { postsTable } from '@/db/schema';

export async function fetchBlueSkyDetails(postId: string) {
  console.log('BlueSky: Checking the DB first');
  const db = await getDb();
  const result = await db.query.postsTable.findFirst({
    where: eq(postsTable.postId, postId),
    orderBy: desc(postsTable.createdAt),
  });
  if (result) {
    console.log('BlueSky: Found in the DB');
    return result;
  }
  console.log('BlueSky: Not found in the DB, fetching from the API');
  const freshResult = await fetchBlueSkyDetailsFromApi({ postId  });
  if(!freshResult) return;
  const returnedFreshResult = await db.insert(postsTable).values({
    type: 'bluesky',
    url: `https://bsky.app/profile/wesbos.com/post/${postId}`,
    postId: postId,
    postData: freshResult,
  }).returning();
  return returnedFreshResult[0];
}

export async function fetchBlueSkyDetailsFromApi({ postId }: { postId: string }) {
  const did = `did:plc:etdjdgnly5tz5l5xdd4jq76d`;
  let uri = `at://${did}/app.bsky.feed.post/${postId}`;
  console.log(uri);
  const response = await fetch(`https://public.api.bsky.app/xrpc/app.bsky.feed.getPosts?uris=${uri}`);
  const data = await response.json();
  if(!data.posts) return;
  return data.posts.at(0);
}
