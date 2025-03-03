import { socialVideoStats } from '@/styles/SocialVideoStats.module.css';
import { formatNumber } from '@/utils/formatNumber';
import { findInObject } from '@/utils/objectWalker';
import type { SocialLinkType, PopulatedLink } from '@/utils/parseSocialLinks';
import {
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaTwitter,
  FaYoutube,
  FaBluesky,
  FaThreads,
  FaHeart,
  FaBookmark,
  FaRetweet,
  FaComment,
  FaChartSimple,
  FaPlay,
  FaQuoteLeft,
  FaShare,
} from 'react-icons/fa6';
type NestedSelector = string | [string, string];

const socialLookup: Record<SocialLinkType, NestedSelector[]> = {
  twitter: ['favorite_count', 'retweet_count', 'reply_count', 'bookmark_count', ['views', 'count']],
  tiktok: ['diggCount', 'shareCount', 'commentCount', 'playCount'],
  instagram: [['edge_media_preview_like', 'count'], ['edge_media_preview_comment', 'count'], 'video_play_count'],
  bluesky: ['likeCount', 'replyCount', 'repostCount', 'quoteCount'],
  linkedin: ['likeCount', 'commentCount'],
  youtube: ['TODO'],
  threads: ['TODO'],
};

const iconLookup = {
  twitter: FaTwitter,
  tiktok: FaTiktok,
  instagram: FaInstagram,
  bluesky: FaBluesky,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
  threads: FaThreads,
};

const actionLookup = {
  like: {
    icon: FaHeart,
    label: 'like',
    matches: ['like', 'favorite', 'digg'],
  },
  bookmark: {
    icon: FaBookmark,
    label: 'bookmark',
    matches: ['bookmark', 'save'],
  },
  repost: {
    icon: FaRetweet,
    label: 'repost',
    matches: ['repost', 'share', 'retweet'],
  },
  comment: {
    icon: FaComment,
    label: 'comment',
    matches: ['comment', 'reply'],
  },
  impression: {
    icon: FaChartSimple,
    label: 'view',
    matches: ['views'],
  },
  play: {
    icon: FaPlay,
    label: 'play',
    matches: ['play'],
  },
  quote: {
    icon: FaQuoteLeft,
    label: 'quote',
    matches: ['quote'],
  },
  share: {
    icon: FaShare,
    label: 'share',
    matches: ['share'],
  },
};
function getActionWord(selector: string | string[]) {
  const selectorMashed = typeof selector === 'string' ? selector : selector.join('');
  // find the action in the lookup based on it's matches
  const actionWord = Object.values(actionLookup).find((lookup) =>
    lookup.matches.some((match) => selectorMashed.includes(match)),
  );
  return actionWord;
}
export function SocialStats({ link }: { link: PopulatedLink }) {
  const Icon = iconLookup[link.link.type];
  return (
    <div className={socialVideoStats}>
      <span>
        <Icon />
      </span>
      {socialLookup[link.link.type].map((selector) => {
        const action = getActionWord(selector);
        const result = findInObject({ obj: link.details?.postData, targetKey: selector });
        if (!result) return null;
        const ActionIcon = action?.icon;
        return (
          <span key={`${link.link.type}-${action?.label}`} title={action?.label || 'Count'}>
            {ActionIcon && <ActionIcon />}
            {formatNumber(result.value)}
          </span>
        );
      })}
    </div>
  );
}
