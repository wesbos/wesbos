import fetch from 'isomorphic-fetch';
import { promises as fs, createWriteStream } from 'fs';
import { Html5Entities } from 'html-entities';
import replaceAll from 'string.prototype.replaceall';
import { JSDOM } from 'jsdom';

const DLIMAGES = true;

function getImageName(path) {
  return path.split('/').pop();
}

function findImagePaths(content) {
  const DOM = new JSDOM(content);
  const imgs = DOM.window.document.querySelectorAll('img');
  return Array.from(imgs).map(img => img.src);
}

async function tagGetter() {
  const tags = await fetch('https://wesbos.com/wp-json/wp/v2/tags?per_page=100').then(x => x.json());
  return function getTag(id) {
    return tags.find(tag => tag.id === id).name;
  }
}

async function getPosts() {
  const p1 = fetch('https://wesbos.com/wp-json/wp/v2/posts?per_page=100&page=1').then(x => x.json());
  const p2 = fetch('https://wesbos.com/wp-json/wp/v2/posts?per_page=100&page=2').then(x => x.json());
  const content = (await Promise.all([p1, p2])).flat();
  return content;
}

function replacify(text) {
  // this replaces all kinds of stuff that needs to be converted back to markdown, or makes gatsby choke.
  text = replaceAll(text, '<pre><code class="language-js">', '\n\`\`\`js\n')
  text = replaceAll(text, '<pre><code class="js">', '\n\`\`\`js\n')
  text = replaceAll(text, '<pre><code class="bash">', '\n\`\`\`bash\n')
  text = replaceAll(text, '<pre><code>', '\n\`\`\`js\n')
  text = replaceAll(text, '<pre><code class="language-html">', '\n\`\`\`html\n')
  text = replaceAll(text, '<pre><code class="html">', '\n\`\`\`html\n')
  text = replaceAll(text, '<pre><code class="xml">', '\n\`\`\`xml\n')
  text = replaceAll(text, '<pre><code class="language-css">', '\n\`\`\`css\n')
  text = replaceAll(text, '</code></pre>', '\n\`\`\`')
  text = replaceAll(text, '<pre class="brush:js">', '\n\`\`\`js\n')
  text = replaceAll(text, '<pre class="brush:css">', '\n\`\`\`css\n')
  text = replaceAll(text, '<pre class="brush:xml">', '\n\`\`\`xml\n')
  text = replaceAll(text, '<pre class="brush:xml">', '\n\`\`\`xml\n')
  text = replaceAll(text, '<pre class="brush:php">', '\n\`\`\`php\n')
  text = replaceAll(text, '<pre class="brush:plain">', '\n\`\`\`html\n')
  text = replaceAll(text, '<pre>', '\n\`\`\`\n')
  text = replaceAll(text, '</pre>', '\n\`\`\`');
  text = Html5Entities.decode(text);
  text = replaceAll(text, '<p>', '');
  text = replaceAll(text, '<p style="text-align: left;">', '');
  text = replaceAll(text, '<p style="text-align: right;">', '');
  text = replaceAll(text, '<p style="text-align: center;">', '');
  text = replaceAll(text, '<p style="text-align:center;">', '');
  text = replaceAll(text, '<p style="color: white;">', '');
  text = replaceAll(text, /<span style\s*=\s*"([^"]*)">/gi, '');
  text = replaceAll(text, '</span>', '');
  text = replaceAll(text, /style\s*=\s*"([^"]*)"/gi, '');
  text = replaceAll(text, '</p>', '');
  text = replaceAll(text, '<img src="facebook-share2.png">', '<img src="facebook-share2.png" />');
  return text;
}

async function downloadImage(remotePath, localFolder) {
  console.log(`Downloading ${remotePath} to ${localFolder}`);
  const imageData = await fetch(remotePath).then(res => res.buffer());
  const imageName = getImageName(remotePath);
  const [, extension] = imageName.split('.');
  await fs.writeFile(`${localFolder}/${imageName}${extension ? '' : '.png'}`, imageData);
}

async function go() {
  const posts = await getPosts();
  const getTag = await tagGetter();
  await fs.mkdir(`./src/posts-import/`, { recursive: true });
  // loop over each post and make a folder for them
  for(const post of posts) {
    const title = Html5Entities.decode(post.title.rendered).trim(); const folder = title.replace(/[^A-Za-z0-9 \-\:]/g, '')
    const folderPath = `./src/posts-import/${folder}`.trim();
    const imgs = findImagePaths(post.content_raw);
    let contentWithBackticks = replacify(post.content_raw);
    imgs.forEach(img => contentWithBackticks = contentWithBackticks.replace(img, getImageName(img)));
    // 1. Make a folder for that post
    await fs.mkdir(folderPath, { recursive: true });
    // 2. Save the raw contents to a mdx file
    // 3. Save the title slug image tags date
    const tags = post.tags.map(getTag);
    console.log('Fetching ', title);
    const content = `---
title: ${title}
slug: ${post.slug}
image: ${getImageName(post.jetpack_featured_media_url)}
tags: ${tags.join(',')}
date: ${post.date}
---

${contentWithBackticks}
`.trim();

    await fs.writeFile(`${folderPath}/${folder}.mdx`, content, { encoding: 'utf-8'})
    // Fetch Featured Image
    if(post.jetpack_featured_media_url) {
      // 4. Download the feature image for each one
      const imageData = await fetch(post.jetpack_featured_media_url).then(res => res.buffer());
      await fs.writeFile(`${folderPath}/${getImageName(post.jetpack_featured_media_url)}`, imageData);
    }
    // 5. Download all the images of that blog post

    DLIMAGES && await Promise.all(imgs.map(img => downloadImage(img, folderPath)));
  }
}

go();

