"use server";

export async function fetchBlueSkyDetailsFromApi({ postId }: { postId: string }) {
  const did = `did:plc:etdjdgnly5tz5l5xdd4jq76d`;
  let uri = `at://${did}/app.bsky.feed.post/${postId}`;
  console.log(uri);
  const response = await fetch(`https://public.api.bsky.app/xrpc/app.bsky.feed.getPosts?uris=${uri}`);
  const data = await response.json();
  if(!data.posts) return;
  return data.posts.at(0);
}
