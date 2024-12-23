import { TipStyles } from '@/styles/TipStyles.module.css';
import TipMeta from './TipMeta';
import mdxComponents from './mdxComponents';
import { parseSocialLinks, populateSocialLinks } from '@/utils/parseSocialLinks';
import { XMediaDisplay } from './media/XMedia';
import { socialStatsContainer } from '@/styles/SocialVideoStats.module.css';
import { FaInstagram, FaLinkedinIn, FaTiktok, FaTwitter } from 'react-icons/fa';
import { fetchSocialDetails } from '@/lib/socials/fetchers';
import { Post } from '@/db/schema';
import { SocialStats } from './SocialStats';

export async function Tip({ tip }) {
  const links = [...(tip.frontmatter.links || []), ...(tip.frontmatter.tweetURL ? [tip.frontmatter.tweetURL] : [])];
  const socialLinks = parseSocialLinks(links);
  const populatedLinks = await populateSocialLinks(socialLinks);
  const twitterLink = socialLinks.twitter?.at(0);
  const tweetDetails = twitterLink ? await fetchSocialDetails(twitterLink) : null;

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

        <div className={socialStatsContainer}>
          {Object.entries(populatedLinks).map(([type, link]) => {
            return <SocialStats key={type} link={link} />;
          })}
        </div>
      </div>
    </div>
  );
}
