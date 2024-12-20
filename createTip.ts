import { writeFile } from 'fs/promises';
import { prompt } from 'enquirer';
import { join } from 'path';
import { fetchTweetDetails } from './lib/socials/twitter-fetcher.js';
import { parseSocialLink } from './utils/parseSocialLinks.ts';
async function createTip() {
  // Format the date in ISO format
  let date = new Date().toISOString();
  try {
    let bodyText = '';
    let links: string[] = [];
    // Get user input
    const answers = await prompt<{ slug: string; tags: string[] }>([
      {
        type: 'input',
        name: 'slug',
        message: 'What is the slug for this tip?',
      },
      {
        type: 'list',
        name: 'tags',
        message: 'Enter tags (comma separated):',
      },
    ]);

    const shouldScaffoldFromTwitter = await prompt<{ shouldScaffoldFromTwitter: boolean }>({
      type: 'confirm',
      name: 'shouldScaffoldFromTwitter',
      message: 'Do you want to scaffold from a Twitter post?',
    });

    if (shouldScaffoldFromTwitter) {
      const { tweetURL } = await prompt<{ tweetURL: string }>({
        type: 'input',
        name: 'tweetURL',
        message: 'Enter the 𝕏 URL:',
      });
      const socialLink = parseSocialLink(tweetURL);
      if (!socialLink) {
        console.log('Invalid URL');
        process.exit(1);
      }
      const tweetDetails = await fetchTweetDetails(socialLink.postId);
      if (!tweetDetails?.postData?.full_text) {
        console.log('No tweet details found, please try again');
        process.exit(1);
      }
      bodyText = tweetDetails.postData?.full_text;
      links.push(tweetURL);
      date = tweetDetails.postData?.created_at;
    } else {
      // ask for body text until the submmitted is empty
      while (true) {
        const { body} = await prompt<{ body: string }>({
          type: 'input',
        name: 'body',
        message: 'What is the body text of the tip?',
        });
        if (body === '') break;
        bodyText += `\n\n${body}`;
      }
    }

    // Ask for links until the submmitted is empty
    while (true) {
      const { link } = await prompt<{ link: string }>({
        type: 'input',
        name: 'link',
        message: 'Enter a link (or press enter to finish):',
      });
      if (link === '') break;
      links.push(link);
    }
    // Create MDX content
    const mdxContent = `---
tags:
${answers.tags.map(tag => `  - ${tag.trim()}`).join('\n')}
date: ${date}
slug: ${answers.slug}
links:
${links.map(link => `  - ${link}`).join('\n')}
---

${bodyText}
`;

    // Write to file
    const filePath = join(process.cwd(), 'content/tips', `${answers.slug}.mdx`);
    const relativePath = filePath.replace(process.cwd(), '').replace(/\\/g, '/');
    await writeFile(filePath, mdxContent);
    console.log(`✅ Created new tip at ${relativePath}`);
    process.exit(0);
  } catch (error) {
    console.error('Failed to create tip:', error);
    process.exit(1);
  }
}

createTip();
