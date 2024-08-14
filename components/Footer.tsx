import React from 'react';
import { IoLogoGithub, IoLogoYoutube } from 'react-icons/io';
// import Instagram from './Instagram';
// import Twitter from './Twitter';
import Podcast from './Podcast';
import LatestCourse from './LatestCourse';
import Link from 'next/link';
import { FooterInner, FooterStyles } from '@/lib/assets/styles/FooterStyles';
import Instagram from './Instagram';
import Twitter from './Twitter';

export default function Footer() {
  return (
    <FooterStyles>
      <FooterInner>
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
            <Link className="terms" href="/terms">
              Terms
            </Link>{' '}
            &times;{' '}
            <Link className="terms" href="/privacy">
              Privacy Policy
            </Link>
          </p>
        </div>
      </FooterInner>
    </FooterStyles>
  );
}
