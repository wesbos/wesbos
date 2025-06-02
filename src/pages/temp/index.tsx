import { getPosts } from '@/lib/getPosts';
import { fetchTweetDetailsFromApi } from '@/lib/socials/twitter-fetcher';
import { parseSocialLinks } from '@/utils/parseSocialLinks';
import { readFile, writeFile } from 'fs/promises';

async function updateDate(formData: FormData) {
  'use server';
  console.log(`Updating date!`);
  const path = formData.get('path');
  const tweet = formData.get('tweet');
  console.log(path, tweet);
  // First grab the tweet details
  const tweetDetails = await fetchTweetDetailsFromApi({
    postId: tweet as string,
  });

  console.log(tweetDetails);
  const correctDate = new Date(tweetDetails?.created_at).toISOString();
  if (!correctDate) {
    console.log(`No date found for ${tweet}`);
    return;
  }
  // 1. Read th file
  const file = await readFile(path as string, 'utf-8');
  // find the current date
  const currentDate = file.match(/^date: .*$/im);
  // 2. Replace the date frontmatter with a regex that matches something like `date: ` to the end of the line
  const newFile = file.replace(/^date: .*$/im, `date: ${correctDate}`);
  // 3. Write the file back
  console.log(`Going to update the date for ${path} to ${correctDate}`);
  await writeFile(path as string, newFile);
}

export default async function Temp() {
  const { posts, total, pages } = await getPosts({
    page: 1,
    type: 'tip',
    limit: 1000,
  });

  const recentPosts = posts.filter((post) => {
    const date = new Date(post.frontmatter.date);
    const isRecent = date.getTime() > Date.now() - 15 * 24 * 60 * 60 * 1000;
    const hasTwitter = post.frontmatter.links?.some((link) => link.includes('twitter.com') || link.includes('x.com'));
    return isRecent && !hasTwitter;
  });

  return (
    <div>
      <h2>There are {recentPosts.length} recent tips</h2>
      {recentPosts.map((post) => {
        const socialLinks = parseSocialLinks(post.frontmatter.links);
        return (
          <div key={post.frontmatter.slug}>
            <h3>{post.frontmatter.slug}</h3>
            <p>{post.frontmatter.date}</p>
            <p>Twitter: {socialLinks.twitter?.map((link) => link.url).join(', ')}</p>
            <form action={updateDate}>
              <input type="text" name="path" defaultValue={post.filePath} />
              <button type="submit">Update Date</button>
            </form>
          </div>
        );
      })}
    </div>
  );
}
