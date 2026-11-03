import * as Sentry from '@sentry/cloudflare';
import clsx from 'clsx';
import { formatDistanceToNowStrict } from 'date-fns';
import { IoIosEye, IoIosHeart, IoIosRepeat } from 'react-icons/io';
import { withCache } from '@/lib/cache';
import { fetchLatestTweets, type XMediaEntity } from '@/lib/socials/twitter-fetcher';
import {
  FooterBlock,
  FooterHeading,
  Tweet,
  TweetError,
  TweetLink,
  TweetMeta,
  TweetPlaceholder,
  TweetStyles,
  Tweets,
} from '@/styles/FooterStyles.module.css';

function Media({ media, alt }: { media: XMediaEntity[]; alt: string }) {
  const first = media.at(0);
  if (!first) return null;
  const mediaUrl = first.media_url_https;
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

function TwitterHeading() {
  return (
    <h3 className={FooterHeading}>
      <span className="highlight">
        𝕏{' '}
        <a href="https://x.com/wesbos" target="_blank" rel="noopener noreferrer">
          @wesbos{' '}
        </a>
        Tweets
      </span>
    </h3>
  );
}

/**
 * Shown while the lazy `twitter` slice loads. Same box and heading as the real block, with
 * placeholder rows roughly the height of 4 tweets, so the footer doesn't jump when they arrive.
 */
export function TwitterFallback() {
  return (
    <div className={clsx([FooterBlock, TweetStyles])} aria-busy="true">
      <TwitterHeading />
      <div className={Tweets}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={TweetPlaceholder} />
        ))}
      </div>
    </div>
  );
}

export default async function Twitter() {
  const tweets = await withCache(fetchLatestTweets, {
    key: 'tweets',
    expiry: 60 * 30, // 30 minutes
  }).catch((err: Error) => {
    Sentry.captureException(err);
  });

  const pinnedTweet = tweets?.at(0)?.core?.user_results.result.legacy.pinned_tweet_ids_str[0];

  return (
    <div className={clsx([FooterBlock, TweetStyles])}>
      <TwitterHeading />
      {!tweets?.length && (
        // Keeps the fallback's height so the page doesn't jump when the API is down
        <div className={TweetError}>
          <p>
            Hrm... It seems my plans to foil the <s>twitter</s> 𝕏 API isn't working rn. You'll have to{' '}
            <a href="http://twitter.com/wesbos">follow me</a> to see the 𝕏eets.
          </p>
        </div>
      )}
      <div className={Tweets}>
        {Array.isArray(tweets) &&
          tweets.slice(0, 4).map((tweet) => {
            const media = tweet.entities?.media as XMediaEntity[] | undefined;
            const text = tweet.full_text?.split('https://t.co').shift() ?? '';
            const isPinned = tweet.rest_id === pinnedTweet;
            const text_ = decodeEntities(text);
            return (
              <div key={tweet.rest_id} className={Tweet}>
                <div className={TweetMeta}>
                  <span className="timeAgo">
                    {isPinned && <span className="pinned">📌</span>}
                    {formatDistanceToNowStrict(new Date(tweet.created_at), { addSuffix: false })}
                  </span>
                  <span title={`${tweet.retweet_count} Retweets`}>
                    <IoIosRepeat />
                    {tweet.retweet_count}
                  </span>

                  <span title={`${tweet.favorite_count} Hearts`}>
                    <IoIosHeart className="heart" />
                    {numberFormatter.format(tweet.favorite_count)}
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
                  href={`https://x.com/wesbos/status/${tweet.rest_id}`}
                >
                  {media && <Media media={media} alt="" />}
                  {text_}
                </a>
              </div>
            );
          })}
      </div>
    </div>
  );
}
