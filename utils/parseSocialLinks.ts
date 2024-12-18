export type SocialLinkType = 'twitter' | 'instagram' | 'tiktok' | 'youtube' | 'linkedin' | 'threads';

export type SocialLink = {
  url: string;
  type: SocialLinkType;
  handle?: string;
  postId: string;
};

const hostNames: Record<SocialLinkType, string[]> = {
  twitter: ['twitter.com', 'x.com'],
  instagram: ['instagram.com'],
  tiktok: ['tiktok.com'],
  youtube: ['youtube.com'],
  linkedin: ['linkedin.com'],
  threads: ['threads.net'],
};

export function isSocialLink(link: string, type?: SocialLinkType): boolean {
  if (!link) return false;
  const url = new URL(link);
  if (type) {
    return hostNames[type]?.includes(url.hostname);
  }
  return Object.values(hostNames).some(hostnames => hostnames.includes(url.hostname));
}

export function parseSocialLink(link: string): SocialLink | undefined {
  if (!link) return;
  const url = new URL(link);
  const pathname = url.pathname;

  // Twitter/X handling
  if (url.hostname.includes('twitter.com') || url.hostname.includes('x.com')) {
    const [, handle, , postId] = pathname.split('/');
    return {
      url: link,
      type: 'twitter',
      handle,
      postId: postId.split('?')[0],
    };
  }

  // Instagram handling
  if (url.hostname.includes('instagram.com')) {
    const parts = pathname.split('/').filter(Boolean);
    const postId = parts[parts.length - 1];
    const handle = parts[0] !== 'p' ? parts[0] : undefined;
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
    const handle = parts[1].replace('@', '');
    const postId = parts[3].split('?')[0];
    return {
      url: link,
      type: 'tiktok',
      handle,
      postId,
    };
  }

  // YouTube handling
  if (url.hostname.includes('youtube.com')) {
    const postId = pathname.split('/').pop()!;
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
    return {
      url: link,
      type: 'linkedin',
      handle: undefined,
      postId: postId!,
    };
  }

  // Threads handling
  if (url.hostname.includes('threads.net')) {
    const parts = pathname.split('/').filter(Boolean);
    const handle = parts[0].replace('@', '');
    const postId = parts[2].split('?')[0];
    return {
      url: link,
      type: 'threads',
      handle,
      postId,
    };
  }

  throw new Error('Unsupported social media link');
}
