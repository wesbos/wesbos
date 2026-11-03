import { Suspense } from 'react';
import { IoLogoGithub, IoLogoYoutube } from 'react-icons/io';
import { Link, Slice } from 'waku';
import styles, { FooterBottomStyles, FooterInner, FooterStyles, terms } from '@/styles/FooterStyles.module.css';
import { CurrentYear } from './CurrentYear';
// import Podcast from './Podcast';
import FooterVideo from './FooterVideo';
import LatestCourse from './LatestCourse';
// import Instagram from './Instagram';
import { TwitterFallback } from './Twitter';

export async function Footer() {
  return (
    <footer className={FooterStyles}>
      <div className={FooterInner}>
        <Suspense fallback={<div>Loading...</div>}>
          {/* <Podcast /> */}
          <FooterVideo />
        </Suspense>
        {/* Tweets are the only live data in the footer, so they load as a dynamic lazy slice and the rest stays static */}
        <Slice id="twitter" lazy fallback={<TwitterFallback />} />
        <LatestCourse />
        <div className={FooterBottomStyles}>
          I post videos on{' '}
          <a
            href="https://youtube.com/wesbos?sub_confirmation=1"
            target="_blank"
            rel="noreferrer noopener"
            className={styles.socialLink}
          >
            <IoLogoYoutube /> YouTube
          </a>{' '}
          and code on{' '}
          <a href="https://github.com/wesbos" target="_blank" rel="noreferrer noopener" className={styles.socialLink}>
            <IoLogoGithub /> GitHub
          </a>
          <p>
            Wes Bos &copy;{' '}
            <a href="https://web.archive.org/web/20040615000000*/wesbos.com" target="_blank" rel="noreferrer">
              1999
            </a>{' '}
            — <CurrentYear />
          </p>
          <p>
            <Link className={terms} to="/terms">
              Terms
            </Link>{' '}
            &times;{' '}
            <Link className={terms} to="/privacy">
              Privacy Policy
            </Link>
          </p>
          <p>
            <span>
              Commit{' '}
              <a href={`https://github.com/wesbos/wesbos/commit/${import.meta.env.WAKU_GIT_COMMIT_HASH}`}>
                {import.meta.env.WAKU_GIT_COMMIT_HASH}
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
