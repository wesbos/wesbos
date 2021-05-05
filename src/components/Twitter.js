import React, { useState, useEffect, useRef } from 'react';
import { IoIosHeart, IoIosRepeat, IoLogoTwitter } from 'react-icons/io';
import styled from 'styled-components';

const url = `/.netlify/functions/twitter`;

const TweetStyles = styled.div`
  a.tweet-link {
    display: block;
    &:before {
      display: none;
    }
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  img {
    float: left;
    border: 1px solid #a8a8a8;
    margin-right: 5px;
    position: relative;
    top: 1rem;
  }
`;

const TweetMeta = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 15px auto 1fr;
  justify-items: center;
  align-content: center;
  align-items: center;
  grid-gap: 10px;
  &:before,
  &:after,
  .lilguy {
    display: block;
    content: '';
    width: 100%;
    height: 1.5px;
    background: var(--dark);
  }
  span {
    display: flex;
    align-content: center;
    align-items: center;
    font-size: 1.4rem;
    svg.heart {
      color: var(--yellow);
    }
  }
  .media {
    font-size: 0;
  }
`;

function useTwitter() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      })
      .catch(console.log)
  }, []);
  return posts;
}

function Media({ media, alt }) {
  if (!media) return null;
  const url = media[0].media_url_https;
  const parts = url.split('.');
  // const base = parts.slice(0, parts.length - 1).join('.');
  const thumb = `${url}?name=thumb&format=jpg`;
  return (
    <img
      src={`https://images.weserv.nl/?url=${encodeURIComponent(thumb)}&h=75`}
      alt={alt}
      className="media"
      width="75"
      height="75"
    />
  );
}

export default function Twitter() {
  const tweets = useTwitter();

  return (
    <TweetStyles>
      <h3>
        <span className="highlight">
          <IoLogoTwitter />
          <a
            href="https://twitter.com/wesbos"
            target="_blank"
            rel="noopener noreferrer"
          >
            @wesbos{' '}
          </a>
          Tweets
        </span>
      </h3>
      {!tweets.length && <p>brb getting some good tweets...</p>}
      {tweets.map((tweet) => {
        const { media } = tweet.entities;
        const text = tweet.full_text
          .split('https://t.co')
          .shift()
          .slice(0, 100);
        return (
          <div key={tweet.id_str}>
            <p>
              <a
                className="tweet-link"
                rel="noopener noreferrer"
                target="_blank"
                href={`https://twitter.com/wesbos/status/${tweet.id_str}`}
              >
                <Media media={media} alt={text} />
                {text}…
              </a>
            </p>
            <TweetMeta>
              <span title={`${tweet.retweet_count} Retweets`}>
                <IoIosRepeat />
                {tweet.retweet_count}
              </span>
              <span className="lilguy" />
              <span title={`${tweet.favorite_count} Hearts`}>
                <IoIosHeart className="heart" />
                {tweet.favorite_count}
              </span>
            </TweetMeta>
          </div>
        );
      })}
    </TweetStyles>
  );
}
