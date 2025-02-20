"use server";

import type { InstagramApiResponse } from './instagramTypes';

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

export async function fetchInstagramDetailsFromApi({ postId }: { postId: string }): Promise<InstagramApiResponse['data'] | undefined> {
  // Fetch the page
  const response = await fetch("https://www.instagram.com/graphql/query", {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-CA,en;q=0.9",
      "cache-control": "no-cache",
      "content-type": "application/x-www-form-urlencoded",
      "x-fb-friendly-name": "PolarisPostActionLoadPostQueryQuery",
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
  const payload = await response.json() as InstagramApiResponse;
  if(!payload) return;
  return payload.data;
}
