const glob = require('glob');
const { promises: fs } = require('fs');

async function go() {
  glob('./src/tips/**/*.mdx', async (err, files) => {
    for (const path of files) {
      const [, , , folderName, fileName] = path.split('/');

      const [slug, tagStart] = folderName.split('[');
      const tags = tagStart.replace(']', '').split(',');
      const content = await fs.readFile(path, 'utf-8');
      console.log({ folderName, fileName, slug, tags });
      const formattedTags = `tags:
${tags.map(tag => `  - ${tag}`).join('\n')}`;
      let updatedContent = content.replace(
        '---',
        `---
${formattedTags}`
      );

      const [existingSlug] = content.match(/slug: .*/);

      updatedContent = updatedContent.replace(existingSlug, `slug: ${slug}`);
      // console.log(existingSlug);

      // console.log(updatedContent);
      await fs.writeFile(path, updatedContent, 'utf-8');
    }
  });
}

go();
