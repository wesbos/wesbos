const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');
const wait = require('waait');

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
  const options = await getOptions(isDev);
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1.5 });
  await page.goto(url);
  await wait(1000);
  return page.screenshot({ type: 'png' });
}

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  const qs = new URLSearchParams(event.queryStringParameters);

  const photoBuffer = await getScreenshot(
    `http://localhost:8000/thumbnail?${qs.toString()}`,
    true
  );
  return {
    statusCode: 200,
    body: photoBuffer.toString('base64'),
    isBase64Encoded: true,
  };
};
