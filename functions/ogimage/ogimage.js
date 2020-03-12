const chrome = require('chrome-aws-lambda');
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
    console.log('Cached image! Return this');
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
exports.handler = async (event, context) => {
  const qs = new URLSearchParams(event.queryStringParameters);

  const photoBuffer = await getScreenshot(
    `https://condescending-pasteur-8185e8.netlify.com/thumbnail?${qs.toString()}`,
    true
  );
  return {
    statusCode: 200,
    body: photoBuffer,
    isBase64Encoded: true,
  };
};
