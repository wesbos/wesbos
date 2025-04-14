// const chrome = require('chrome-aws-lambda');
// Switch to this, re: https://answers.netlify.com/t/netlify-function-with-puppeteer-breaks-if-i-make-any-changes/76924/8
const chrome = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');
const wait = require('waait');

const cached = new Map();

const exePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

async function getOptions(isDev) {
  if (isDev) {
    return {
      product: 'chrome',
      args: [],
      executablePath: exePath,
      headless: true,
    };
  }
  return {
    product: 'chrome',
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
  };
}

async function getScreenshot(url, isDev) {
  // first check if this value has been cached
  const cachedImage = cached.get(url);
  if (cachedImage) {
    return cachedImage;
  }
  const options = await getOptions(isDev);
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1.5 });
  await page.goto(url);
  await wait(1000);
  const buffer = await page.screenshot({ type: 'png' });
  const base64Image = buffer.toString('base64');
  cached.set(url, base64Image);
  return base64Image;
}

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event) => {
  const qs = new URLSearchParams(event.queryStringParameters);
  const photoBuffer = await getScreenshot(
    `${process.env.URL || `http://localhost:8888`}/thumbnail?${qs.toString()}`,
    // Here we need to pass a boolean to say if we are on the server. Netlify has a bug where process.env.NETLIFY is undefiend in functions so I'm using one of the only vars I can find
    // !process.env.NETLIFY
    process.env.URL.includes('http://localhost'),
  );
  return {
    statusCode: 200,
    body: photoBuffer,
    isBase64Encoded: true,
  };
};
