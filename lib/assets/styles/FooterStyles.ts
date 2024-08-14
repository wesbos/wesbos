"use client";
import { styled } from '@/styled-system/jsx';

export const FooterStyles = styled.footer`
  background: var(--dark) var(--whiteGrit);
  background-size: 500px;
  padding-top: 180px;
  padding-bottom: 80px;
  clip-path: polygon(0 100px, 100% 0, 100% 100%, 0% 100%);
  overflow: hidden;
  & > div {
    width: 100%;
    color: var(--dark);
    display: grid;
    max-width: var(--maxWidth);
    margin: 0 auto;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    @media (max-width: 1200px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 575px) {
      grid-template-columns: 1fr;
    }
    grid-gap: 3rem;
    .bottom {
      grid-column: 1 / -1;
      text-align: center;
      background: none;
      color: var(--light);
    }
    & > * {
      padding: 2rem;
      background: var(--light) var(--blackGrit);
      background-size: 500px;
      h3 {
        margin: 0;
        padding: 2px;
        margin-bottom: 2rem;
        text-align: center;
        margin-top: -30px;
        /* TODO dirty */
        background: none;
        svg {
          position: relative;
          top: 3.5px;
          margin-right: 3px;
        }
        a {
          text-decoration: none;
        }
      }
      p {
        font-size: 1.6rem;
      }
    }
  }
  a.socialLink {
    background: var(--dark);
    padding: 2px 6px;
    border-radius: 4px;
    text-decoration: none;
    color: var(--light);
    display: inline-flex;
    align-items: center;
    margin: 2px;
    &[href*='youtube.com'] {
      /* Kind of interesting, so I'm leaving this in: https://twitter.com/wesbos/status/1248252653953601538 */
      background: #ff0000; /* Red */
      background: #dd0000; /* AA Grade */
      background: #ec1212;
    }
    &[href*='github.com'] {
      background: var(--light);
      color: var(--dark);
    }
    svg {
      margin-right: 3px;
    }
  }
  a.terms {
    color: white;
    text-decoration: none;
    font-size: 10px;
    &:before {
      display: none;
    }
  }
`;

// Instagram Widget Styles
export const InstaStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  @media (max-width: 320px) {
    grid-template-columns: 1fr;
    img {
      width: 100%;
    }
  }
`;

export const StoriesStyles = styled.a`
  font-size: 0;
  display: flex;
  flex-wrap: wrap;
  .story {
    width: 30px;
    height: 89px1;
    background-size: cover;
    font-size: 0;
    display: block;
  }
`;

// Twitter Styles
export const TweetStyles = styled.div`
  a.tweet-link {
    display: block;
    overflow: hidden;
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

export const TweetMeta = styled.div`
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
