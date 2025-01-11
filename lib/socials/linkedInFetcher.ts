"use server";
import { parseHTML } from 'linkedom/worker';

function makeLinkedInUrl(postId: string) {
  return `https://www.linkedin.com/feed/update/urn:li:activity:${postId}`;
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
