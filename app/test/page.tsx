import * as tip from '../../content/tips/css-grid-stacking/css-grid-stacking.mdx';
import { Tip } from '@/components/Tip';
import { isSocialLink, parseSocialLink } from '@/utils/parseSocialLinks';
import { fetchTweetDetails } from '@/lib/twitter-fetcher';
import { XMediaDisplay } from '@/components/media/XMedia';

export default async function Test() {
  // See if there is a twitter link in the tip
  const twitterLink = (tip.frontmatter.links || []).find(link => isSocialLink(link, 'twitter'));
  const socialLink = parseSocialLink(twitterLink);
  const tweetDetails = await fetchTweetDetails(socialLink.postId);
  return (
    <div>
      <Tip tip={tip} />
      <div className="stats">
        𝕏
        <div className="stat">❤️ {tweetDetails.postData?.favorite_count}</div>
        <div className="stat">👍 {tweetDetails.postData?.retweet_count}</div>
        <div className="stat">💬 {tweetDetails.postData?.reply_count}</div>
        <div className="stat">🔖 {tweetDetails.postData?.bookmark_count}</div>
        <div className="stat">👀 {tweetDetails.postData?.views.count}</div>
      </div>
      <XMediaDisplay media={tweetDetails.postData?.extended_entities?.media || tweetDetails.postData?.entities.media} />
      {/* <blockquote
        className="twitter-tweet"
        data-media-max-width="560"
      >
        <p lang="en" dir="ltr">
          Are you using position: absolute; to overlap elements?<br />
          <br />
          It&#39;s almost always better to Use CSS Grid instead!{' '}
          <a href="https://t.co/hmpbExR88Q">pic.twitter.com/hmpbExR88Q</a>
        </p>
        &mdash; Wes Bos (@wesbos) <a href="https://twitter.com/wesbos/status/1834242925401694490?ref_src=twsrc%5Etfw">September 12, 2024</a>
      </blockquote>
      <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> */}
    </div>
  );
}
