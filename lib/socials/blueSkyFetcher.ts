"use server";

interface BlueSkyAuthor {
  did: string;
  handle: string;
  displayName: string;
  avatar: string;
  labels: string[];
  createdAt: string;
}

interface BlueSkyRecord {
  $type: string;
  createdAt: string;
  embed?: {
    $type: string;
    images: any[]; //not used dont care
  };
  facets: any[]; // not used dont care
  langs: string[];
  text: string;
}

export interface BlueSkyPost {
  uri: string;
  cid: string;
  author: BlueSkyAuthor;
  record: BlueSkyRecord;
  embed?: {
    $type: string;
    images: any[]; // not used dont care
  };
  replyCount: number;
  repostCount: number;
  likeCount: number;
  quoteCount: number;
  indexedAt: string;
  labels: string[];
}

interface BlueSkyResponse {
  posts: BlueSkyPost[];
}

export async function fetchBlueSkyDetailsFromApi({ postId }: { postId: string }) {
  const did = `did:plc:etdjdgnly5tz5l5xdd4jq76d`;
  let uri = `at://${did}/app.bsky.feed.post/${postId}`;
  console.log(uri);
  const response = await fetch(`https://public.api.bsky.app/xrpc/app.bsky.feed.getPosts?uris=${uri}`);
  const data = await response.json() as BlueSkyResponse;
  if(!data.posts) return;
  console.log(data.posts.at(0));
  return data.posts.at(0);
}
