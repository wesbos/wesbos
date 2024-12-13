import { TweetVideo } from '@/components/TweetVideo';
import * as tip from '../../content/tips/css-grid-stacking/css-grid-stacking.mdx';
import { Tip } from '@/components/Tip';
import { isSocialLink, parseSocialLink } from '@/utils/parseSocialLinks';
import { fetchTweetDetails } from '@/lib/twitter-fetcher';

export default async function Test() {
  console.log(tip);
  // See if there is a twitter link in the tip
  const twitterLink = (tip.frontmatter.links || []).find(link => isSocialLink(link, 'twitter'));
  const socialLink = parseSocialLink(twitterLink);
  const tweetDetails = await fetchTweetDetails(socialLink.postId);
  console.log(tweetDetails);
  return (
    <div>
      <Tip tip={tip} />
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
