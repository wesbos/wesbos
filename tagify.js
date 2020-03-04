const glob = require('glob');

async function go() {
  glob('./src/tips/**/*.mdx', (err, files) => {
    for (const path of files) {
      const [, , , folderName, fileName] = path.split('/');

      const [slug, tagStart] = folderName.split('[');
      if (!tagStart) {
        console.log(`No tags for ${folderName}`);
      }
      // const tags = tagStart.split(',');
      // console.log({ folderName, fileName, slug, tags });
    }
  });
}

go();
