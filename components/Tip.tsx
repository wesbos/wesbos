import { TipStyles } from '@/styles/TipStyles.module.css';
import Link from 'next/link';
import Image from 'next/image';
import TipMeta from './TipMeta';
import mdxComponents from './mdxComponents';
import { isSocialLink } from '@/utils/parseSocialLinks';
import { XMediaDisplay } from './media/XMedia';
import { fetchTweetDetails } from '@/lib/twitter-fetcher';
import { parseSocialLink } from '@/utils/parseSocialLinks';
import { getDb } from '@/db/db';

export async function Tip({ tip }) {
  const twitterLink = (tip.frontmatter.links || []).find((link: string) => isSocialLink(link, 'twitter')) || tip.frontmatter.tweetURL;
  const socialLink = parseSocialLink(twitterLink);
  const tweetDetails = socialLink ? await fetchTweetDetails(socialLink.postId) : null;
  const Content = tip.default;
  return (
    <div className={TipStyles}>
      {tweetDetails && <XMediaDisplay media={tweetDetails.postData?.extended_entities?.media || tweetDetails.postData?.entities.media} />}
      <div className="tipContent">
        <TipMeta tip={tip} />
        <Content
          components={{
            ...mdxComponents,
          }}
        />
        {tweetDetails && (
          <div>
            <div className="stats">
              𝕏
              <div className="stat">❤️ {tweetDetails.postData?.favorite_count}</div>
              <div className="stat">👍 {tweetDetails.postData?.retweet_count}</div>
              <div className="stat">💬 {tweetDetails.postData?.reply_count}</div>
              <div className="stat">🔖 {tweetDetails.postData?.bookmark_count}</div>
              <div className="stat">👀 {tweetDetails.postData?.views.count}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
