/* eslint-disable */
import fetch from 'isomorphic-fetch';
import { promises as fs } from 'fs';
import jsdom, { JSDOM } from 'jsdom';
import FileType from 'file-type';
import getSlug from 'speakingurl';
import urlExpander from 'expand-url';
import { promisify } from 'util';
import tips from './tips';

const expand = promisify(urlExpander.expand);

const DLIMAGES = false;

// const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
const expression = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;
const linkRegex = new RegExp(expression);

function getImageName(path) {
  return path.split('/').pop();
}

function findImagePaths(content) {
  const virtualConsole = new jsdom.VirtualConsole();
  // virtualConsole.on('log', console.log);
  const DOM = new JSDOM(content);
  const imgs = DOM.window.document.querySelectorAll('.AdaptiveMedia-container img');
  const videos = DOM.window.document.querySelectorAll('[data-playable-media-url]');
  return {
    images: Array.from(imgs).map((img) => img.src),
    videos: Array.from(videos).map((video) => video.style['background-image'].replace('url(', '').replace(')', '').replace('.jpg', '.mp4').replace('tweet_video_thumb', 'tweet_video')),
    // https://video.twimg.com/tweet_video/EIodxyoXYAI8fLE.mp4
  };
}

async function downloadImage(remotePath, localFolder) {
  const imageData = await fetch(remotePath).then((res) => res.buffer());
  const { ext = 'png' } = (await FileType.fromBuffer(imageData)) || {};
  const imageName = getImageName(remotePath);
  const [, extension] = imageName.split('.');
  await fs.writeFile(`${localFolder}/${imageName}${extension ? '' : `.${ext}`}`, imageData);
}

// const selectedTips = tips.slice(35, 40);
const selectedTips = tips.slice(85);
// const selectedTips = [
//   {
//     url: 'https://twitter.com/wesbos/status/1191797964429283331',
//     time: 12345,
//     text: 'Test tip',
//   },
// ];
async function getTweets() {
  await fs.mkdir(`./src/tips/`, { recursive: true });
  for (const tip of selectedTips) {
    const slug = getSlug(tip.text.split(' ').slice(0, 8).join(' '));
    const folderPath = `./src/tips/${slug}`;
    await fs.mkdir(folderPath, { recursive: true });
    const html = await fetch(tip.url).then((x) => x.text());
    const { images, videos } = await findImagePaths(html);

    // find links
    const links = tip.text.match(linkRegex) || [];
    const resourceLinks = links.slice(0, links.length - 1);
    const expandedLinks = await Promise.all(
      resourceLinks.map((link) => {
        const url = link.startsWith('http') ? link : `http://${link}`;
        return expand(url).catch(console.error);
      })
    );

    // Download images and videos
    await Promise.all(images.map((path) => downloadImage(path, folderPath)));
    await Promise.all(videos.map((path) => downloadImage(path, folderPath)));

    links.forEach((link) => {
      tip.text = tip.text.replace(link, '');
      tip.text = tip.text.replace('http://', '');
      tip.text = tip.text.replace('http://', '');
    });

    // time, url, text
    // 1. Fetch the HTML of this page
    // 2. Save the text, url, and time.
    const content = `---
date: ${tip.time}
tweetURL: ${tip.url}
text: ${tip.text}
slug: ${slug}
images:
  ${images.map((x) => `- ${x}`).join('\n')}
videos:
  ${videos.map((x) => `- ${x}`).join('\n')}
links:
  ${expandedLinks.map((x) => `- ${x}`).join('\n')}
---
${tip.text.trim()}
`;
    await fs.writeFile(`${folderPath}/${slug}.mdx`, content, {
      encoding: 'utf-8',
    });
    await fs.writeFile(`${folderPath}/${slug}.html`, html, {
      encoding: 'utf-8',
    });
  }
}

getTweets();
