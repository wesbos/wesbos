import React from 'react';
import { IoLogoGithub, IoLogoYoutube } from 'react-icons/io';
import Link from 'next/link';
import Podcast from './Podcast';
import LatestCourse from './LatestCourse';
import Instagram from './Instagram';
import Twitter from './Twitter';
import { FooterInner, FooterStyles } from '@/styles/FooterStyles.module.css';

export default function Footer() {
  return (
    <footer className={FooterStyles}>
      <div className={FooterInner}>
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
          {/* TODO DynamicIO Is whining about this <p>Wes Bos &copy; 1999 — {new Date().getFullYear()}</p> */}
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
      </div>
    </footer>
  );
}
