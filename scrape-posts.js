import fetch from 'isomorphic-fetch';
import { promises as fs } from 'fs';

import { Html5Entities } from 'html-entities';
import replaceAll from 'string.prototype.replaceall';
import { JSDOM } from 'jsdom';
import FileType from 'file-type';

const DLIMAGES = false;

function getImageName(path) {
  return path.split('/').pop();
}

function findImagePaths(content) {
  const DOM = new JSDOM(content);
  const imgs = DOM.window.document.querySelectorAll('img');
  return Array.from(imgs).map(img => img.src);
}

async function categoryGetter() {
  const tags = await fetch(
    'https://wesbos.com/wp-json/wp/v2/categories?per_page=100'
  ).then(x => x.json());
  return function getCategory(id) {
    return tags.find(tag => tag.id === id).name;
  };
}

async function getPosts() {
  const p1 = fetch(
    'https://wesbos.com/wp-json/wp/v2/posts?per_page=100&page=1'
  ).then(x => x.json());
  const p2 = fetch(
    'https://wesbos.com/wp-json/wp/v2/posts?per_page=100&page=2'
  ).then(x => x.json());
  const content = (await Promise.all([p1, p2])).flat();
  return content;
}

function replacify(text) {
  // this replaces all kinds of stuff that needs to be converted back to markdown, or makes gatsby MDX choke
  text = replaceAll(text, '<pre><code class="language-js">', '\n```js\n');
  text = replaceAll(text, '<pre><code class="js">', '\n```js\n');
  text = replaceAll(text, '<pre><code class="bash">', '\n```bash\n');
  text = replaceAll(text, '<pre><code>', '\n```js\n');
  text = replaceAll(text, '<pre><code class="language-html">', '\n```html\n');
  text = replaceAll(text, '<pre><code class="html">', '\n```html\n');
  text = replaceAll(text, '<pre><code class="xml">', '\n```xml\n');
  text = replaceAll(text, '<pre><code class="language-css">', '\n```css\n');
  text = replaceAll(text, '</code></pre>', '\n```');
  text = replaceAll(text, '<pre class="brush:js">', '\n```js\n');
  text = replaceAll(text, '<pre class="brush:css">', '\n```css\n');
  text = replaceAll(text, '<pre class="brush:xml">', '\n```xml\n');
  text = replaceAll(text, '<pre class="brush:xml">', '\n```xml\n');
  text = replaceAll(text, '<pre class="brush:php">', '\n```php\n');
  text = replaceAll(text, '<pre class="brush:plain">', '\n```html\n');
  text = replaceAll(text, '<pre class="brush:shell">', '\n```bash\n');
  text = replaceAll(text, '<pre>', '\n```\n');
  text = replaceAll(text, '</pre>', '\n```');
  text = Html5Entities.decode(text);
  text = replaceAll(text, '<p>', '');
  text = replaceAll(text, '<p >', '');
  text = replaceAll(text, '<p lang="en" dir="ltr">', '');
  text = replaceAll(text, '<p style="text-align: left;">', '');
  text = replaceAll(text, '<p style="text-align: right;">', '');
  text = replaceAll(text, '<p style="text-align: center;">', '');
  text = replaceAll(text, '<p style="text-align:center;">', '');
  text = replaceAll(text, '<p style="color: white;">', '');
  text = replaceAll(
    text,
    '<img src="facebook-share2.png">',
    '<img src="facebook-share2.png" />'
  );
  text = replaceAll(text, /<span style\s*=\s*"([^"]*)">/gi, '');
  text = replaceAll(text, '</span>', '');
  text = replaceAll(text, /style\s*=\s*"([^"]*)"/gi, '');
  text = replaceAll(text, '</p>', '');
  text = replaceAll(text, /<!-- \/?wp(.*) -->/gi, '');
  text = replaceAll(text, '<!--more-->', '');
  text = replaceAll(text, /<code>(.*)<\/code>/gi, '`$&`');
  text = replaceAll(text, '<code>', '');
  text = replaceAll(text, '</code>', '');
  text = replaceAll(text, '<br>', '<br/>');
  text = replaceAll(text, '<hr>', '<hr/>');
  text = replaceAll(text, '<li>', '* ');
  text = replaceAll(text, '</li>', '\n');
  text = replaceAll(text, '<ul>', '\n');
  text = replaceAll(text, '</ul>', '');
  text = replaceAll(text, '<ol>', '\n');
  text = replaceAll(text, '</ol>', '');
  text = replaceAll(text, '<strong>', '**');
  text = replaceAll(text, '</strong>', '**');
  text = replaceAll(
    text,
    '<img src="iphone-tel.gif">',
    '<img src="iphone-tel.gif"/>'
  );
  text = replaceAll(text, '<img src="hehe.gif">', '<img src="hehe.gif"/>');
  text = replaceAll(text, /<div id="mc_embed_signup2">(.|\n)*<\/div >/gi, '');
  text = replaceAll(text, '<style>.entry-utility {clear:both;}</style>', '');
  text = replaceAll(
    text,
    `<p data-height="487" data-theme-id="5332" data-slug-hash="YPmyxy" data-default-tab="result" data-user="wesbos" class='codepen'>`,
    ''
  );
  text = replaceAll(
    text,
    `<ul class="blocks-gallery-grid"><li class="blocks-gallery-item">`,
    ''
  );
  text = replaceAll(
    text,
    '<h2>`git diff --shortstat "@{0 day ago}"`</h2>',
    '## `git diff --shortstat "@{0 day ago}"`'
  );
  text = replaceAll(text, `2797" >`, `2797" />`);
  text = replaceAll(text, `springboard!</h3>`, `springboard!`);
  text = replaceAll(
    text,
    `**** <em>**UPDATE: **</em>**In Sendy 3 they have added list segmentation! ******`,
    `**UPDATE:** In Sendy 3 they have added list segmentation!`
  );
  return text;
}

async function downloadImage(remotePath, localFolder) {
  console.log(`Downloading ${remotePath} to ${localFolder}`);
  const imageData = await fetch(remotePath).then(res => res.buffer());
  console.log(`~~~Doing ${remotePath}`);
  const { ext } = await FileType.fromBuffer(imageData);
  const imageName = getImageName(remotePath);
  const [, extension] = imageName.split('.');
  await fs.writeFile(
    `${localFolder}/${imageName}${extension ? '' : `.${ext}`}`,
    imageData
  );
}

async function go() {
  const posts = await getPosts();
  const getCategory = await categoryGetter();
  await fs.mkdir(`./src/posts/`, { recursive: true });
  // loop over each post and make a folder for them
  for (const post of posts) {
    const title = Html5Entities.decode(post.title.rendered)
      .trim()
      .replace(':', ' - ');
    const folder = title.replace(/[^A-Za-z0-9 \-\:]/g, '');
    const folderPath = `./src/posts/${folder}`.trim();
    const imgs = findImagePaths(post.content_raw);
    let contentWithBackticks = replacify(post.content_raw);
    imgs.forEach(
      img =>
        (contentWithBackticks = contentWithBackticks.replace(
          img,
          getImageName(img)
        ))
    );
    contentWithBackticks = replacify(contentWithBackticks);
    // 1. Make a folder for that post
    await fs.mkdir(folderPath, { recursive: true });
    // 2. Save the raw contents to a mdx file
    // 3. Save the title slug image tags date
    const categories = post.categories.map(getCategory);
    console.log('Fetching ', title);
    const content = `---
title: ${title}
slug: ${post.slug}
image: ${getImageName(post.jetpack_featured_media_url)}
category:
${categories.map(cat => ` - ${cat}`).join('\n')}
date: ${post.date}
id: ${post.id}
---

${contentWithBackticks}
`.trim();

    await fs.writeFile(`${folderPath}/${folder}.mdx`, content, {
      encoding: 'utf-8',
    });
    // Fetch Featured Image
    if (post.jetpack_featured_media_url) {
      // 4. Download the feature image for each one
      const imageData = await fetch(post.jetpack_featured_media_url).then(res =>
        res.buffer()
      );
      await fs.writeFile(
        `${folderPath}/${getImageName(post.jetpack_featured_media_url)}`,
        imageData
      );
    }
    // 5. Download all the images of that blog post

    DLIMAGES &&
      (await Promise.all(imgs.map(img => downloadImage(img, folderPath))));
  }
}

go();
