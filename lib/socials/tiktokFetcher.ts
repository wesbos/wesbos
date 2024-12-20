"use server";
import { desc, eq } from 'drizzle-orm';
import { getDb } from '@/db/db';
import { postsTable } from '@/db/schema';
import { parseHTML } from 'linkedom';
import { TiktokDetails, TikTokResponse } from './tiktokFetcherTypes';

export async function fetchTiktokDetails(postId: string) {
  console.log('Tiktok: Checking the DB first');
  const db = await getDb();
  const result = await db.query.postsTable.findFirst({
    where: eq(postsTable.postId, postId),
    orderBy: desc(postsTable.createdAt),
  });
  if (result) {
    console.log('Tiktok: Found in the DB');
    return result;
  }
  console.log('Tiktok: Not found in the DB, fetching from the API');
  const freshResult = await fetchTiktokDetailsFromApi({ postId });
  if(!freshResult) return; // The API returned nothing or was rate limited
  const returnedFreshResult = await db.insert(postsTable).values({
    type: 'tiktok',
    url: `https://tiktok.com/@wesbos/video/${postId}`,
    postId: postId,
    postData: freshResult,
  }).returning();
  return returnedFreshResult[0];
}

const headers = {
  "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  "accept-language": "en-CA,en;q=0.9",
  "cache-control": "no-cache",
  "pragma": "no-cache",
  "priority": "u=0, i",
  "sec-ch-ua": "\"Microsoft Edge\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": "\"macOS\"",
  "sec-fetch-dest": "document",
  "sec-fetch-mode": "navigate",
  "sec-fetch-site": "same-origin",
  "sec-fetch-user": "?1",
  "upgrade-insecure-requests": "1"
}

function tryParseJson<T>(scriptContent: string): T | null {
  try {
    return JSON.parse(scriptContent) as T; // yolo
  } catch (error) {
    console.log(`Error parsing JSON: ${error}`);
    return null;
  }
}

export async function fetchTiktokDetailsFromApi({ postId, handle = 'wesbos' }: { postId: string, handle?: string }) {
  // Fetch the page
  const response = await fetch(`https://www.tiktok.com/@${handle}/video/${postId}`, { headers });
  // Get the HTML
  const html = await response.text();
  // convert to document with linkedom
  const dom = parseHTML(html);
  // Get the script with the video data
  const script = dom.document.querySelector('script#__UNIVERSAL_DATA_FOR_REHYDRATION__');
  if (!script) return;
  // Get the script content
  const scriptContent = script.textContent || '';
  // Parse the JSON
  const payload = tryParseJson<TikTokResponse>(scriptContent);
  // Access the Video info
  const videoInfo = payload?.__DEFAULT_SCOPE__?.['webapp.video-detail']?.itemInfo?.itemStruct;
  console.dir(videoInfo, { depth: null });
  return videoInfo;
}
