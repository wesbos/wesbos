"use server";
import { desc, eq } from 'drizzle-orm';
import { getDb } from '@/db/db';
import { postsTable } from '@/db/schema';

export async function fetchInstagramDetails(postId: string) {
  console.log('Instagram: Checking the DB first');
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
  const freshResult = await fetchInstagramDetailsFromApi({ postId });
  if(!freshResult) return; // The API returned nothing or was rate limited
  const returnedFreshResult = await db.insert(postsTable).values({
    type: 'instagram',
    url: `https://instagram.com/p/${postId}`,
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

export async function fetchInstagramDetailsFromApi({ postId }: { postId: string }) {
  // Fetch the page
  const response = await fetch("https://www.instagram.com/graphql/query", {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-CA,en;q=0.9",
      "cache-control": "no-cache",
      "content-type": "application/x-www-form-urlencoded",
      // "pragma": "no-cache",
      // "priority": "u=1, i",
      // "sec-ch-prefers-color-scheme": "light",
      // "sec-ch-ua": "\"Microsoft Edge\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
      // "sec-ch-ua-full-version-list": "\"Microsoft Edge\";v=\"131.0.2903.99\", \"Chromium\";v=\"131.0.6778.140\", \"Not_A Brand\";v=\"24.0.0.0\"",
      // "sec-ch-ua-mobile": "?0",
      // "sec-ch-ua-model": "\"\"",
      // "sec-ch-ua-platform": "\"macOS\"",
      // "sec-ch-ua-platform-version": "\"15.1.1\"",
      // "sec-fetch-dest": "empty",
      // "sec-fetch-mode": "cors",
      // "sec-fetch-site": "same-origin",
      // "x-asbd-id": "129477",
      // "x-bloks-version-id": "8ecbdca0bb1041c4b02312aa25073150305028c9b6346da6fa811443494f2ab8",
      // "x-csrftoken": "V0sU9JmfnbKqxQC79_-7-M",
      "x-fb-friendly-name": "PolarisPostActionLoadPostQueryQuery",
      // "x-fb-lsd": "AVqqtCUqtNs",
      // "x-ig-app-id": "936619743392459",
      // "cookie": "csrftoken=V0sU9JmfnbKqxQC79_-7-M; datr=ho1kZ4tDXJfaV1DkD7goM2vA; ig_did=F3960A55-9BD8-4278-8E76-896101B2B30D; mid=Z2SNhgAEAAEyVviLCyiPIyDEdMNs; ig_nrcb=1; ps_l=1; ps_n=1; wd=1272x948",
      "Referer": "https://www.instagram.com/p/DDh_vjgqdU8/",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body":  new URLSearchParams({
      "av": "0",
      "__d": "www",
      "__user": "0",
      "__a": "1",
      "__req": "c",
      "__hs": "20076.HYP:instagram_web_pkg.2.1.0.0.0",
      "dpr": "2",
      "__ccg": "EXCELLENT",
      "__rev": "1019001996",
      "__s": "l4ecyo:ev2wan:nx4z6h",
      "__hsi": "7450235771873577639",
      "__dyn": "7xeUjG1mxu1syUbFp41twpUnwgU7SbzEdF8aUco2qwJw5ux609vCwjE1EE2Cw8G11wBz81s8hwGxu786a3a1YwBgao6C0Mo2swtUd8-U2zxe2GewGw9a361qw8Xxm16wa-0nK3qazo7u3C2u2J0bS1LwTwKG1pg2fwxyo6O1FwlEcUed6goK2O4UrAwCAxW1oCz84u2G0CpWy9rDyo",
      "__csr": "g9QuDkvZ4llICiXDApaVQTu-mLAK-8ybgDKFaqXCiyAmhuUKWGaAVp4Gya-ny9A8HgZoS8G8ChahRA-J5UCUCdxe5pHGF8yu9_BDy9USt3GQjLDAz4miF6QaHokDAAzUgCLJ2aQm5u78ggK9xEm00k9y1Ew6-wIw5wg4y1uwXWw8Guu3q1Twko8U4V0hQu5o0pTwea0G9nwlU0lDBVho3Zgy44326zegAWx5913a3qp90bu2VBB8aFa1lfDgGhG2q7Fkdw_G1rxq349yFo5irwj84uVna0zQ0xE2Xwp1cV3008h60a5w1bu",
      "__comet_req": "7",
      "lsd": "AVqqtCUqtNs",
      "jazoest": "21067",
      "__spin_r": "1019001996",
      "__spin_b": "trunk",
      "__spin_t": "1734643190",
      "fb_api_caller_class": "RelayModern",
      "fb_api_req_friendly_name": "PolarisPostActionLoadPostQueryQuery",
      "variables": JSON.stringify({
        "shortcode": postId,
        "fetch_tagged_user_count": null,
        "hoisted_comment_id": null,
        "hoisted_reply_id": null
      }),
      "server_timestamps": "true",
      "doc_id": "8845758582119845"
    }),
    "method": "POST"
  });
  // Get the HTML
  const payload = await response.json();
  if(!payload) return;
  return payload.data;
}
