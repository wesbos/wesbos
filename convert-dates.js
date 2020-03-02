const glob = require('glob');
const { promises: fs } = require('fs');

async function go() {
  glob('./src/tips/**/*.mdx', async function(err, files) {
    for (const path of files) {
      const text = await fs.readFile(path, 'utf-8');
      const [match, timestamp] = text.match(/date: (.*)/);
      const date = new Date(parseFloat(timestamp));
      const updatedText = text.replace(timestamp, date.toISOString());
      await fs.writeFile(path, updatedText, 'utf8');
    }
  });
}

go();
