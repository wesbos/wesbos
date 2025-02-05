import React, { Suspense } from 'react';
import { IoLogoGithub, IoLogoYoutube } from 'react-icons/io';
import Link from 'next/link';
import Podcast from './Podcast';
import LatestCourse from './LatestCourse';
// import Instagram from './Instagram';
import Twitter from './Twitter';
import styles, { FooterBottomStyles, FooterInner, FooterStyles, terms } from '@/styles/FooterStyles.module.css';

export default function Footer() {
  return (
    <footer className={FooterStyles}>
      <div className={FooterInner}>
        <Podcast />
        <Suspense fallback={<div>Loading...</div>}>
          <Twitter />
        </Suspense>
        {/* <Instagram /> */}
        <LatestCourse />
        <div className={FooterBottomStyles}>
          I post videos on{' '}
          <a href="https://youtube.com/wesbos?sub_confirmation=1" target="_blank" rel="noreferrer noopener" className={styles.socialLink}>
            <IoLogoYoutube /> YouTube
          </a>{' '}
          and code on{' '}
          <a href="https://github.com/wesbos" target="_blank" rel="noreferrer noopener" className={styles.socialLink}>
            <IoLogoGithub /> GitHub
          </a>
          <p>Wes Bos &copy; 1999 — {new Date().getFullYear()}</p>
          <p>
            <Link className={terms} href="/terms">
              Terms
            </Link>{' '}
            &times;{' '}
            <Link className={terms} href="/privacy">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
