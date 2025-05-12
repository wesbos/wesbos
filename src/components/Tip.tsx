import { fetchSocialDetails } from '@/lib/socials/fetchers';
import type { MDXResult } from '@/lib/types';
import { socialStatsContainer } from '@/styles/SocialVideoStats.module.css';
import { TipStyles } from '@/styles/TipStyles.module.css';
import { type SocialLink, parseSocialLinks, populateSocialLinks } from '@/utils/parseSocialLinks';
import { SocialStats } from './SocialStats';
import TipMeta from './TipMeta';
import mdxComponents from './mdxComponents';
import { XMediaDisplay } from './media/XMedia';
async function TwitterMedia({ twitterLink }: { twitterLink: SocialLink | undefined }) {
  const tweetDetails = twitterLink ? await fetchSocialDetails(twitterLink) : null;
  if (!tweetDetails) {
    return null;
  }
  return (
    <XMediaDisplay media={tweetDetails?.postData?.extended_entities?.media || tweetDetails?.postData?.entities.media} />
  );
}

export async function Tip({ tip }: { tip: MDXResult }) {
  const links = [...(tip.frontmatter.links || []), ...(tip.frontmatter.tweetURL ? [tip.frontmatter.tweetURL] : [])];
  const socialLinks = parseSocialLinks(links);
  const populatedLinks = await populateSocialLinks(socialLinks);
  const twitterLink = socialLinks.twitter?.at(0);
  const Content = tip.default;
  return (
    <div className={TipStyles}>
      <TwitterMedia twitterLink={twitterLink} />
      <div className="tipContent">
        <TipMeta tip={tip} />
        <Content components={mdxComponents} />
        <div className={socialStatsContainer}>
          {Object.entries(populatedLinks).map(([type, link]) => {
            return <SocialStats key={type} link={link} />;
          })}
        </div>
      </div>
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'dynamic',
  } as const;
};
