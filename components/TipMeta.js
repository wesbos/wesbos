import React from 'react';
import { IoIosLink, IoLogoTwitter } from 'react-icons/io';
import Link from 'next/link';
import formatDistance from 'date-fns/formatDistance';
import { Helmet } from 'react-helmet';
import { TipMetaStyles } from './styles/TipStyles';

export default function TipMeta({ tip }) {
  return (
    <TipMetaStyles className="tipMeta">
      <Link href={`/tip/${tip.fields.slug}`} title="View Tip Details">
        <IoIosLink /> Deets
      </Link>
      <Helmet>
        <title>{tip.excerpt}</title>
      </Helmet>
      <Link href={`/tip/${tip.fields.slug}`} title="View Tip Details">
        <time dateTime={tip.frontmatter.date}>
          {formatDistance(new Date(tip.frontmatter.date), new Date(), {
            addSuffix: true,
          })}
        </time>
      </Link>
      <a href={tip.frontmatter.tweetURL} title="Link to original tweet">
        <IoLogoTwitter className="twitter" /> Tweet
      </a>
    </TipMetaStyles>
  );
}
