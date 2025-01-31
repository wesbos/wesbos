import { TipStyles } from '@/styles/TipStyles.module.css';
import TipMeta from './TipMeta';
import { parseSocialLinks, populateSocialLinks } from '@/utils/parseSocialLinks';
import { XMediaDisplay } from './media/XMedia';
import { socialStatsContainer } from '@/styles/SocialVideoStats.module.css';
import { fetchSocialDetails } from '@/lib/socials/fetchers';
import { SocialStats } from './SocialStats';
import { MDXResult } from '@/lib/types';
import { Suspense } from 'react';

export async function Tip({ tip }: { tip: MDXResult }) {
  const links = [...(tip.frontmatter.links || []), ...(tip.frontmatter.tweetURL ? [tip.frontmatter.tweetURL] : [])];
  const socialLinks = parseSocialLinks(links);
  const populatedLinks = await populateSocialLinks(socialLinks);
  const twitterLink = socialLinks.twitter?.at(0);
  const tweetDetails = twitterLink ? await fetchSocialDetails(twitterLink) : null;

  const Content = tip.default;
  return (
    <div className={TipStyles}>
      {/* @ts-ignore MEH upstream */}
      {tweetDetails && <XMediaDisplay media={tweetDetails.postData?.extended_entities?.media || tweetDetails.postData?.entities.media} />}
      <div className="tipContent">
        <TipMeta tip={tip} />
        <Content />
        <div className={socialStatsContainer}>
          <Suspense fallback={<div>Loading...</div>}>
            {Object.entries(populatedLinks).map(([type, link]) => {
              return <SocialStats key={type} link={link} />;
            })}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
