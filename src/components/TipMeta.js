import React from 'react';
import { IoIosLink, IoLogoTwitter } from 'react-icons/io';
import { Link } from 'gatsby';
import formatDistance from 'date-fns/formatDistance';
import { TipMetaStyles } from './styles/TipStyles';

export default function TipMeta({ tip }) {
  return (
    <TipMetaStyles className="tipMeta">
      <Link to={`/tip/${tip.frontmatter.slug}`} title="View Tip Details">
        <IoIosLink /> Deets
      </Link>
      <Link to={`/tip/${tip.frontmatter.slug}`} title="View Tip Details">
        <time dateTime={tip.frontmatter.date}>
          {formatDistance(new Date(tip.frontmatter.date), new Date(), {
            addSuffix: true,
          })}
        </time>
      </Link>
      <a href={tip.frontmatter.tweetURL} title="Link to original tweet">
        <IoLogoTwitter class="twitter" /> Tweet
      </a>
    </TipMetaStyles>
  );
}
