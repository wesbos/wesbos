import { TweetDetails, XMediaEntity } from '@/lib/socials/twitter-fetcher';
import { FooterBlock, FooterHeading, TweetStyles } from '@/styles/FooterStyles.module.css';
import clsx from 'clsx';
import React from 'react';
import { IoIosHeart, IoIosRepeat, IoLogoTwitter } from 'react-icons/io';

const url = `/.netlify/functions/twitter`;
type Media = {
  media: XMediaEntity[];
  alt: string;
};

function Media({ media, alt }: Media) {
  if (!media) return null;
  console.log(media);
  const mediaUrl = media[0].media_url_https;
  // const parts = url.split('.');
  // const base = parts.slice(0, parts.length - 1).join('.');
  const thumb = `${mediaUrl}?name=thumb&format=jpg`;
  return <img src={`https://images.weserv.nl/?url=${encodeURIComponent(thumb)}&h=75`} alt={alt} className="media" width="75" height="75" />;
}

export default function Twitter() {
  const tweets: TweetDetails[] = [];

  return (
    <div className={clsx([FooterBlock, TweetStyles])}>
      <h3 className={FooterHeading}>
        <span className="highlight">
          <IoLogoTwitter />
          <a href="https://twitter.com/wesbos" target="_blank" rel="noopener noreferrer">
            @wesbos{' '}
          </a>
          Tweets
        </span>
      </h3>
      {!tweets.length && (
        <p>
          <s>twitter</s> 𝕏 API is paid now. You'll have to <a href="http://twitter.com/wesbos">follow me</a> to see the 𝕏eets.
        </p>
      )}
      {Array.isArray(tweets) &&
        tweets.map((tweet) => {
          // @ts-ignore
          const media = tweet.extended_entities?.media;
          const text = tweet.full_text?.split('https://t.co').shift()?.slice(0, 100) ?? '';
          return (
            <div key={tweet.id_str}>
              <p>
                <a className="tweet-link" rel="noopener noreferrer" target="_blank" href={`https://twitter.com/wesbos/status/${tweet.id_str}`}>
                  <Media media={media} alt={text} />
                  {text}…
                </a>
              </p>
              <div className="TweetMeta">
                <span title={`${tweet.retweet_count} Retweets`}>
                  <IoIosRepeat />
                  {tweet.retweet_count}
                </span>
                <span className="lilguy" />
                <span title={`${tweet.favorite_count} Hearts`}>
                  <IoIosHeart className="heart" />
                  {tweet.favorite_count}
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
}
