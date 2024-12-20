"use server";
import { desc, eq } from 'drizzle-orm';
import { getDb } from '@/db/db';
import { postsTable } from '@/db/schema';
import { parseHTML } from 'linkedom';

function makeLinkedInUrl(postId: string) {
  https://www.linkedin.com/feed/update/urn:li:ugcPost:7270496199080570881
  return `https://www.linkedin.com/feed/update/urn:li:activity:${postId}`;
}

export async function fetchLinkedInDetails(postId: string) {
  console.log('LinkedIn: Checking the DB first');
  const db = await getDb();
  const result = await db.query.postsTable.findFirst({
    where: eq(postsTable.postId, postId),
    orderBy: desc(postsTable.createdAt),
  });
  if (result) {
    console.log('LinkedIn: Found in the DB');
    return result;
  }
  console.log('LinkedIn: Not found in the DB, fetching from the API');
  const freshResult = await fetchLinkedInDetailsFromApi({ postId });
  if(!freshResult) {
    console.error('LinkedIn: No result from the API');
    return;
  }
  const returnedFreshResult = await db.insert(postsTable).values({
    type: 'linkedin',
    url: makeLinkedInUrl(postId),
    postId,
    postData: freshResult,
  }).returning();
  return returnedFreshResult[0];
}

export async function fetchLinkedInDetailsFromApi({ postId }: { postId: string }) {
  const url = makeLinkedInUrl(postId);
  console.log('LinkedIn: Fetching from', url);
  const response = await fetch(url).then(res => res.text()).catch(console.error);
  if(!response) {
    console.error('LinkedIn: No response from the API');
    return;
  }
  const dom = parseHTML(response);
  const data = dom.window.document.querySelector('script[type="application/ld+json"]')?.textContent;
  if(!data) return;
  const payload = JSON.parse(data);
  // remove a few keys as its a pretty large payload
  // delete payload.caption;
  delete payload.transcript;
  delete payload.comment;
  delete payload.potentialAction;
  // Bring the interaction stats to the top level
  payload.interactionStatistic.forEach(stat => {
    const statKey = stat.interactionType.replace(/(http|https):\/\/schema.org\//i, '').toLowerCase().replace('action', 'Count');
    payload[statKey] = stat.userInteractionCount;
  });
  console.log(payload);
  return payload;
}
