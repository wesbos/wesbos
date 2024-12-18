import { writeFile } from 'fs/promises';
import { prompt } from 'enquirer';
import { join } from 'path';

async function createTip() {
  try {
    // Get user input
    const answers = await prompt([
      {
        type: 'input',
        name: 'slug',
        message: 'What is the slug for this tip?',
      },
      {
        type: 'input',
        name: 'body',
        message: 'What is the body text of the tip?',
      },
      {
        type: 'input',
        name: 'tweetURL',
        message: 'Twitter URL (optional):',
      },
      {
        type: 'input',
        name: 'instagramURL',
        message: 'Instagram URL (optional):',
      },
      {
        type: 'input',
        name: 'tiktokURL',
        message: 'TikTok URL (optional):',
      },
      {
        type: 'list',
        name: 'tags',
        message: 'Enter tags (comma separated):',
      },
    ]);

    // Format the date in ISO format
    const date = new Date().toISOString();

    // Create MDX content
    const mdxContent = `---
tags:
${answers.tags.split(',').map(tag => `  - ${tag.trim()}`).join('\n')}
date: ${date}
tweetURL: ${answers.tweetURL || ''}
instagramURL: ${answers.instagramURL || ''}
tiktokURL: ${answers.tiktokURL || ''}
slug: ${answers.slug}
images:
  -
videos:
links:
---
${answers.body}
`;

    // Write to file
    const filePath = join(process.cwd(), 'content/tips', `${answers.slug}.mdx`);
    await writeFile(filePath, mdxContent);
    console.log(`✅ Created new tip at ${filePath}`);
  } catch (error) {
    console.error('Failed to create tip:', error);
    process.exit(1);
  }
}

createTip();
