import { NextRequest, NextResponse } from 'next/server';

// const chrome = require('chrome-aws-lambda');
// Switch to this, re: https://answers.netlify.com/t/netlify-function-with-puppeteer-breaks-if-i-make-any-changes/76924/8
import chrome from '@sparticuz/chromium';
import puppeteer, { LaunchOptions } from 'puppeteer-core';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { writeFileSync } from 'node:fs';

const kv = (await getCloudflareContext()).env.OG;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const exePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

async function getOptions(): Promise<LaunchOptions> {
  if (process.env.NODE_ENV === 'development') {
    return {
      browser: 'chrome',
      args: [],
      executablePath: exePath,
      headless: true,
    };
  }
  return {
    browser: 'chrome',
    args: chrome.args,
    executablePath: await chrome.executablePath(),
    headless: chrome.headless,
  };
}

async function getScreenshot(url: string) {
  // first check if this value has been cached
  const cachedImage = await kv.get(url, 'arrayBuffer');
  if (cachedImage) {
    console.log('Returning cached image');
    return cachedImage;
  }
  const options = await getOptions();
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1.5 });
  await page.goto(url);
  await wait(1000);
  const buffer = await page.screenshot({ type: 'png' });
  // Cache to KV
  await kv.put(url, buffer, {
    expirationTtl: 60 * 60 * 24 * 30, // 30 days
  });
  // const base64Image = buffer.toString('base64');
  // cached.set(url, base64Image);
  return buffer;
}

export async function GET(request: NextRequest) {
  const qs = new URLSearchParams(request.nextUrl.searchParams);
  const url = `${process.env.URL || `http://localhost:3000`}/og?${qs.toString()}`;

  const photoBuffer = await getScreenshot(url);
  return new NextResponse(photoBuffer, {
    headers: {
      'Content-Type': 'image/png',
    },
  });
}
