import React from 'react';
import styled from 'styled-components';
import { IoLogoGithub, IoLogoYoutube } from 'react-icons/io';
import { Link } from 'gatsby';
import Instagram from './Instagram';
import Twitter from './Twitter';
import Podcast from './Podcast';
import LatestCourse from './LatestCourse';
import blackGrit from './mdxComponents/blackgrit.png';
import whiteGrit from './mdxComponents/whitegrit.png';
import dirty from './styles/Dirty';

const FooterStyles = styled.footer`
  background: var(--dark) url(${whiteGrit});
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
      background: var(--light) url(${blackGrit});
      background-size: 500px;
      h3 {
        margin: 0;
        padding: 2px;
        margin-bottom: 2rem;
        text-align: center;
        margin-top: -30px;
        ${dirty}
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
export default function Footer() {
  return (
    <FooterStyles>
      <div>
        <Podcast />
        <Twitter />
        <Instagram />
        <LatestCourse />
        <div className="bottom">
          I post videos on{' '}
          <a href="https://youtube.com/wesbos?sub_confirmation=1" target="_blank" rel="noreferrer noopener" className="socialLink">
            <IoLogoYoutube /> YouTube
          </a>{' '}
          and code on{' '}
          <a href="https://github.com/wesbos" target="_blank" rel="noreferrer noopener" className="socialLink">
            <IoLogoGithub /> GitHub
          </a>
          <p>Wes Bos &copy; 1999 — {new Date().getFullYear()}</p>
          <p>
            <Link className="terms" to="/terms">
              Terms
            </Link>{' '}
            &times;{' '}
            <Link className="terms" to="/privacy">
              Privacy Policy
            </Link>
          </p>
          {/* <p>
            <small>
              Baked Fresh from commit <a href={process.env.REPOSITORY_URL} />
              {process.env.COMMIT_REF}
            </small>
          </p>
          */}
        </div>
      </div>
    </FooterStyles>
  );
}
