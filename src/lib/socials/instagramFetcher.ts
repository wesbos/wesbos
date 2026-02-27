'use server';

import type { InstagramApiResponse } from './instagramTypes';

const IG_APP_ID = '936619743392459';

async function getLsdToken(): Promise<string> {
  const res = await fetch('https://www.instagram.com/web/__mid/', {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    },
  });
  const setCookies = res.headers.getSetCookie?.() ?? [];
  for (const cookie of setCookies) {
    const match = cookie.match(/lsd=([^;]+)/);
    if (match) return match[1];
  }
  return 'AVqbxe3J_YA';
}

export async function fetchInstagramDetailsFromApi({
  postId,
}: { postId: string }): Promise<InstagramApiResponse['data'] | undefined> {
  const lsd = await getLsdToken();
  const graphqlUrl = new URL('https://www.instagram.com/api/graphql');

  const response = await fetch(graphqlUrl, {
    method: 'POST',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-IG-App-ID': IG_APP_ID,
      'X-FB-LSD': lsd,
      'X-ASBD-ID': '129477',
      'Sec-Fetch-Site': 'same-origin',
    },
    body: new URLSearchParams({
      variables: JSON.stringify({ shortcode: postId }),
      doc_id: '10015901848480474',
      lsd,
    }),
  });

  try {
    const payload = (await response.json()) as InstagramApiResponse;
    if (!payload?.data) return;
    return payload.data;
  } catch (error) {
    console.error('Error fetching Instagram details', error);
    return;
  }
}
