import React, { Suspense } from 'react';
import { IoLogoGithub, IoLogoYoutube } from 'react-icons/io';
import Podcast from './Podcast';
import LatestCourse from './LatestCourse';
// import Instagram from './Instagram';
import Twitter from './Twitter';
import styles, { FooterBottomStyles, FooterInner, FooterStyles, terms } from '@/styles/FooterStyles.module.css';
import { Link } from 'waku';


export default async function Footer() {
  return (
    <footer className={FooterStyles}>
      <div className={FooterInner}>
        <Suspense fallback={<div>Loading...</div>}>
          <Podcast />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <Twitter />
        </Suspense>
        <LatestCourse />
        <div className={FooterBottomStyles}>
          I post videos on{" "}
          <a
            href="https://youtube.com/wesbos?sub_confirmation=1"
            target="_blank"
            rel="noreferrer noopener"
            className={styles.socialLink}
          >
            <IoLogoYoutube /> YouTube
          </a>{" "}
          and code on{" "}
          <a
            href="https://github.com/wesbos"
            target="_blank"
            rel="noreferrer noopener"
            className={styles.socialLink}
          >
            <IoLogoGithub /> GitHub
          </a>
          <p>
            Wes Bos &copy;{" "}
            <a href="https://web.archive.org/web/20040615000000*/wesbos.com" target='_blank'>
              1999
            </a>{" "}
            — {new Date().getFullYear()}
          </p>
          <p>
            <Link className={terms} to="/terms">
              Terms
            </Link>{" "}
            &times;{" "}
            <Link className={terms} to="/privacy">
              Privacy Policy
            </Link>
          </p>
          <p>
            <span>Version: {import.meta.env.WAKU_GIT_COMMIT_HASH}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
