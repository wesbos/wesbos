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
  const tiktokLink = socialLinks.tiktok?.at(0);
  const tiktokDetails = tiktokLink ? await fetchSocialDetails(tiktokLink) : null;
  const instagramLink = socialLinks.instagram?.at(0);
  const instagramDetails = instagramLink ? await fetchSocialDetails(instagramLink) : null;
  const blueSkyLink = socialLinks.bluesky?.at(0);
  const blueSkyDetails = blueSkyLink ? await fetchSocialDetails(blueSkyLink) : null;
  const linkedInLink = socialLinks.linkedin?.at(0);
  const linkedInDetails = linkedInLink ? await fetchSocialDetails(linkedInLink) : null;

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
          {/* {tweetDetails && (
            <div className={socialVideoStats}>
              <div className="stat">
                <FaTwitter />
              </div>
              <div className="stat">❤️ {formatNumber(tweetDetails.postData?.favorite_count)}</div>
              <div className="stat">👍 {formatNumber(tweetDetails.postData?.retweet_count)}</div>
              <div className="stat">💬 {formatNumber(tweetDetails.postData?.reply_count)}</div>
              <div className="stat">🔖 {formatNumber(tweetDetails.postData?.bookmark_count)}</div>
              <div className="stat">👀 {formatNumber(tweetDetails.postData?.views.count)}</div>
            </div>
          )}
          {tiktokDetails && (
            <div className={socialVideoStats}>
              <div className="stat">
                <FaTiktok />
              </div>
              <div className="stat">❤️ {formatNumber(tiktokDetails.postData?.stats.diggCount)}</div>
              <div className="stat">👍 {formatNumber(tiktokDetails.postData?.stats.shareCount)}</div>
              <div className="stat">💬 {formatNumber(tiktokDetails.postData?.stats.commentCount)}</div>
              <div className="stat">🔖 {formatNumber(tiktokDetails.postData?.stats.playCount)}</div>
            </div>
          )}
          {instagramDetails && (
            <div className={socialVideoStats}>
              <div className="stat">
                <FaInstagram />
              </div>
              <div className="stat">
                ❤️
                {
                  findInObject({
                    obj: instagramDetails?.postData,
                    targetKey: 'edge_media_preview_like',
                  }).value.count
                }
              </div>
              <div className="stat">
                💬
                {
                  findInObject({
                    obj: instagramDetails?.postData,
                    targetKey: 'edge_media_preview_comment',
                  }).value.count
                }
              </div>
              <div className="stat">
                ▶️
                {
                  findInObject({
                    obj: instagramDetails?.postData,
                    targetKey: 'video_play_count',
                  }).value
                }
              </div>
            </div>
          )}
          {blueSkyDetails && (
            <div className={socialVideoStats}>
              <div className="stat">☁️</div>
              <div className="stat">❤️ {formatNumber(blueSkyDetails.postData?.likeCount)}</div>
              <div className="stat">💬 {formatNumber(blueSkyDetails.postData?.replyCount)}</div>
              <div className="stat">♻️ {formatNumber(blueSkyDetails.postData?.repostCount)}</div>
              <div className="stat">💬 {formatNumber(blueSkyDetails.postData?.quoteCount)}</div>
            </div>
          )}
          {linkedInDetails && (
            <div className={socialVideoStats}>
              <div className="stat"><FaLinkedinIn /></div>
              <div className="stat">❤️ {formatNumber(linkedInDetails.postData?.likeCount)}</div>
              <div className="stat">💬 {formatNumber(linkedInDetails.postData?.commentCount)}</div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
