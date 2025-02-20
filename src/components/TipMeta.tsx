import React from 'react';
import { IoIosLink, IoLogoTwitter } from 'react-icons/io';
import { Link } from 'waku';
import formatDistance from 'date-fns/formatDistance';
import { TipMetaStyles } from '@/styles/TipStyles.module.css';

export default function TipMeta({ tip }) {
  return (
    <div className={TipMetaStyles}>
      <Link to={`/tip/${tip.frontmatter.slug}`} title="View Tip Details">
        <IoIosLink /> Deets
      </Link>
      {/*TODO ? Maybe <Helmet>
        <title>{tip.excerpt}</title>
      </Helmet> */}
      <Link to={`/tip/${tip.frontmatter.slug}`} title="View Tip Details">
        <time dateTime={tip.frontmatter.date}>
          {formatDistance(new Date(tip.frontmatter.date), new Date(), {
            addSuffix: true,
          })}
        </time>
      </Link>
      <a href={tip.frontmatter.tweetURL} title="Link to original tweet">
        <IoLogoTwitter className="twitter" /> Tweet
      </a>
    </div>
  );
}
