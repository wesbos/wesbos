"use server";
import { parseHTML } from 'linkedom/worker';

interface LinkedInImageObject {
  url: string;
  '@type': 'ImageObject';
}

interface LinkedInCreatorInteractionStatistic {
  '@type': 'InteractionCounter';
  interactionType: string;
  userInteractionCount: number;
}

interface LinkedInCreator {
  name: string;
  image: LinkedInImageObject;
  url: string;
  '@type': 'Person';
  interactionStatistic: LinkedInCreatorInteractionStatistic;
}

interface LinkedInCaption {
  '@type': 'MediaObject';
  contentUrl: string;
  description: string;
  encodingFormat: string;
  name: string;
}

interface LinkedInInteractionStatistic {
  '@type': 'InteractionCounter';
  interactionType: string;
  userInteractionCount: number;
}

export interface LinkedInPost {
  '@context': string;
  '@type': string;
  '@id': string;
  datePublished: string;
  caption: LinkedInCaption;
  commentCount: number;
  contentUrl: string;
  creator: LinkedInCreator;
  duration: string;
  embedUrl: string;
  height: number;
  width: number;
  interactionStatistic: LinkedInInteractionStatistic[];
  isFamilyFriendly: boolean;
  keywords: string;
  name: string;
  thumbnailUrl: string;
  uploadDate: string;
  description: string;
  likeCount: number;
  [key: string]: any; // for dynamic properties added by the interaction stats
}

function makeLinkedInUrl(postId: string) {
  return `https://www.linkedin.com/feed/update/urn:li:activity:${postId}`;
}

export async function fetchLinkedInDetailsFromApi({ postId }: { postId: string }): Promise<LinkedInPost | undefined> {
  const url = makeLinkedInUrl(postId);
  const response = await fetch(url).then(res => res.text()).catch(console.error);
  if(!response) {
    console.error('LinkedIn: No response from the API');
    return;
  }
  const dom = parseHTML(response);
  const data = dom.window.document.querySelector('script[type="application/ld+json"]')?.textContent;
  if(!data) return;
  const payload = JSON.parse(data) as LinkedInPost;
  // remove a few keys as its a pretty large payload
  // delete payload.caption;
  delete payload.transcript;
  delete payload.comment;
  delete payload.potentialAction;
  // Bring the interaction stats to the top level
  (payload.interactionStatistic)?.forEach((stat: LinkedInInteractionStatistic) => {
    const statKey = stat?.interactionType?.replace(/(http|https):\/\/schema.org\//i, '').toLowerCase().replace('action', 'Count');
    payload[statKey] = stat?.userInteractionCount;
  });
  return payload;
}
