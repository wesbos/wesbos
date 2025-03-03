import { fetchSocialDetails } from '@/lib/socials/fetchers';

export type SocialLinkType = 'twitter' | 'instagram' | 'tiktok' | 'youtube' | 'linkedin' | 'threads' | 'bluesky';

export type SocialLink = {
  url: string;
  type: SocialLinkType;
  handle?: string | undefined;
  postId: string;
};

export type SocialLinkRecord = Record<SocialLinkType, SocialLink[]>;

const hostNames: Record<SocialLinkType, string[]> = {
  twitter: ['twitter.com', 'x.com'],
  instagram: ['instagram.com'],
  tiktok: ['tiktok.com'],
  youtube: ['youtube.com'],
  linkedin: ['linkedin.com'],
  threads: ['threads.net'],
  bluesky: ['bsky.app'],
};

export function isSocialLink(link: string, type?: SocialLinkType): boolean {
  if (!link) return false;
  const url = new URL(link);
  if (type) {
    return hostNames[type]?.includes(url.hostname);
  }
  return Object.values(hostNames).some((hostnames) => hostnames.includes(url.hostname));
}

export function parseSocialLink(link: string): SocialLink | undefined {
  if (!link) return;
  const url = new URL(link);
  const pathname = url.pathname;

  // Twitter/X handling
  if (url.hostname.includes('twitter.com') || url.hostname.includes('x.com')) {
    let [, handle, , postId] = pathname.split('/');
    postId = postId?.split('?')[0];
    if (!handle || !postId) return;
    return {
      url: link,
      type: 'twitter',
      handle,
      postId,
    };
  }

  // Instagram handling
  if (url.hostname.includes('instagram.com')) {
    const parts = pathname.split('/').filter(Boolean);
    const postId = parts[parts.length - 1];
    const handle = parts[0] !== 'p' ? parts[0] : undefined;
    if (!handle || !postId) return;
    return {
      url: link,
      type: 'instagram',
      handle,
      postId,
    };
  }

  // TikTok handling
  if (url.hostname.includes('tiktok.com')) {
    const parts = pathname.split('/');
    const handle = parts[1]?.replace('@', '');
    const postId = parts[3]?.split('?')[0];
    if (!handle || !postId) return;
    return {
      url: link,
      type: 'tiktok',
      handle,
      postId,
    };
  }

  // YouTube handling
  if (url.hostname.includes('youtube.com')) {
    const postId = pathname.split('/').pop();
    if (!postId) return;
    return {
      url: link,
      type: 'youtube',
      handle: undefined,
      postId,
    };
  }

  // LinkedIn handling
  if (url.hostname.includes('linkedin.com')) {
    let postId;
    if (pathname.includes('activity:')) {
      postId = pathname.match(/activity:(\d+)/)?.[1];
    } else {
      postId = pathname.match(/activity-(\d+)/)?.[1];
    }
    if (!postId) return;
    return {
      url: link,
      type: 'linkedin',
      handle: undefined,
      postId,
    };
  }

  // Threads handling
  if (url.hostname.includes('threads.net')) {
    const parts = pathname.split('/').filter(Boolean);
    const handle = parts?.[0]?.replace('@', '');
    const postId = parts?.[2]?.split('?')[0];
    if (!handle || !postId) return;
    return {
      url: link,
      type: 'threads',
      handle,
      postId,
    };
  }

  // bsky.app - example: https://bsky.app/profile/wesbos.com/post/3lbsenppiy22l
  if (url.hostname.includes('bsky.app')) {
    const [, , handle, , postId] = pathname.split('/');
    if (!handle || !postId) return;
    return {
      url: link,
      type: 'bluesky',
      handle,
      postId,
    };
  }

  // This link is not one we care about
  console.log(`Unsupported social media link: ${link}`);
  return;
}

export function parseSocialLinks(links: string[]): SocialLinkRecord {
  const parsedLinks = links.map((link) => parseSocialLink(link)).filter((link): link is SocialLink => !!link);
  return Object.groupBy(parsedLinks, (link) => link.type) as SocialLinkRecord;
}

async function populateSocialLink(link: SocialLink | SocialLink[]) {
  const firstLink = Array.isArray(link) ? link.at(0) : link;
  if (!firstLink) return;
  return {
    link: firstLink,
    details: await fetchSocialDetails(firstLink),
  };
}

export type PopulatedLink = Awaited<ReturnType<typeof populateSocialLink>>;

export async function populateSocialLinks(links: SocialLinkRecord) {
  const record = Object.entries(links) as [SocialLinkType, SocialLink[]][];
  const populatedLinks = await Promise.all(
    record.map(async ([type, links]) => {
      return [type, await populateSocialLink(links)] as const;
    }),
  );
  // filter any links that don't have details
  const populatedLinksFiltered = populatedLinks.filter((entry) => !!entry[1]?.details);
  const populatedLinksObject = Object.fromEntries(populatedLinksFiltered) as Record<SocialLinkType, PopulatedLink>;
  return populatedLinksObject;
}
