import { withCache } from '@/lib/cache';
import { fetchLatestTweets, type XMediaEntity } from '@/lib/socials/twitter-fetcher';
import {
  FooterBlock,
  FooterHeading,
  Tweet,
  TweetLink,
  TweetMeta,
  Tweets,
  TweetStyles,
} from '@/styles/FooterStyles.module.css';
import clsx from 'clsx';
import { formatDistanceToNowStrict } from 'date-fns';
import { IoIosEye, IoIosHeart, IoIosRepeat, } from 'react-icons/io';

function Media({ media, alt }: { media?: XMediaEntity[]; alt: string }) {
  if (!media) return null;
  const mediaUrl = media[0].media_url_https;
  const thumb = `${mediaUrl}?name=thumb&format=jpg`;
  return (
    <img
      src={`https:///wsrv.nl/?url=${encodeURIComponent(thumb)}&w=150&h=150&fit=cover`}
      alt={alt}
      className="media"
      width="150"
      height="150"
    />
  );
}

const numberFormatter = new Intl.NumberFormat('en-US');

function decodeEntities(encodedString: string) {
  const translate_re = /&(nbsp|amp|quot|lt|gt);/g;
  const translate = {
    nbsp: ' ',
    amp: '&',
    quot: '"',
    lt: '<',
    gt: '>',
  };
  return encodedString
    .replace(translate_re, (match, entity) => translate[entity as keyof typeof translate])
    .replace(/&#(\d+);/gi, (match, numStr) => {
      const num = Number.parseInt(numStr, 10);
      return String.fromCharCode(num);
    });
}

export default async function Twitter() {
  const tweets = await withCache(fetchLatestTweets, {
    key: 'tweets',
    expiry: 60 * 30, // 30 minutes
  });
  const pinnedTweet = tweets?.at(0)?.core.user_results.result.legacy.pinned_tweet_ids_str[0];

  return (
    <div className={clsx([FooterBlock, TweetStyles])}>
      <h3 className={FooterHeading}>
        <span className="highlight">
          𝕏{' '}
          <a href="https://x.com/wesbos" target="_blank" rel="noopener noreferrer">
            @wesbos{' '}
          </a>
          Tweets
        </span>
      </h3>
      {!tweets.length && (
        <p>
          <s>twitter</s> 𝕏 API is paid now. You'll have to <a href="http://twitter.com/wesbos">follow me</a> to see the
          𝕏eets.
        </p>
      )}
      <div className={Tweets}>
        {Array.isArray(tweets) &&
          tweets.slice(0, 4).map((tweet) => {
            const media = tweet.legacy.entities.media;
            const text = tweet.legacy.full_text?.split('https://t.co').shift() ?? '';
            const isPinned = tweet.rest_id === pinnedTweet;
            // Decode HTML entities
            const text_ = decodeEntities(text);
            return (
              <div key={tweet.rest_id} className={Tweet}>
                <div className={TweetMeta}>
                  <span className="timeAgo">
                    {isPinned && <span className="pinned">📌</span>}
                    {formatDistanceToNowStrict(new Date(tweet.legacy.created_at), { addSuffix: false })}
                  </span>
                  <span title={`${tweet.legacy.retweet_count} Retweets`}>
                    <IoIosRepeat />
                    {tweet.legacy.retweet_count}
                  </span>

                  <span title={`${tweet.legacy.favorite_count} Hearts`}>
                    <IoIosHeart className="heart" />
                    {numberFormatter.format(tweet.legacy.favorite_count)}
                  </span>

                  <span title={`${tweet.views.count} Views`}>
                    <IoIosEye />
                    {numberFormatter.format(tweet.views.count)}
                  </span>
                </div>
                <a
                  className={TweetLink}
                  rel="noopener noreferrer"
                  target="_blank"
                  href={`https://twitter.com/wesbos/status/${tweet.rest_id}`}
                >
                  {/* @ts-ignore types are wrong upstream */}
                  {/* I removed the alt because google page speed thinks it's a duplicate */}
                  <Media media={media} alt="" />
                  {text_}
                </a>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'dynamic',
  } as const;
};
