import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import puppeteer, { Browser } from '@cloudflare/puppeteer';


function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const exePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

let browser: Browser;

async function getScreenshot(url: string) {
  const { env } = (await getCloudflareContext());
  const kv = env.OG;
  // first check if this value has been cached
  const cachedImage = await kv.get(url, 'arrayBuffer');
  if (false && cachedImage) {
    console.log('Returning cached image');
    return cachedImage;
  }
  console.log(`Launching browser`);
  console.log(`Cloudflare Browser:`, env.MYBROWSER);
  browser = await puppeteer.launch(env.MYBROWSER);
  console.log(`Browser launched`);
  const page = await browser.newPage();
  console.log(`Page created`);
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1.5 });
  console.log(`Viewport set`);
  await page.goto(url);
  console.log(`Page navigated`);
  await wait(1000);
  console.log(`Waiting for 1 second`);
  const buffer = await page.screenshot({ type: 'png' });
  console.log(`Screenshot taken`);
  // Cache to KV
  await kv.put(url, buffer, {
    expirationTtl: 60 * 60 * 24 * 30, // 30 days
  });
  console.log(`KV cached`);
  // const base64Image = buffer.toString('base64');
  // cached.set(url, base64Image);
  console.log(`Returning buffer`);
  await browser.close();
  return buffer;
}

export async function GET(request: NextRequest) {
  const qs = new URLSearchParams(request.nextUrl.searchParams);
  const url = `${request.nextUrl.origin}/og?${qs.toString()}`;
  console.log(`Getting screenshot for ${url}`);
  const photoBuffer = await getScreenshot(url).catch(async (err) => {
    console.log(`Error getting screenshot`, err);
    await browser.close();
    throw err;
  });
  console.log(`Returning response`);
  return new NextResponse(photoBuffer, {
    headers: {
      'Content-Type': 'image/png',
    },
  });
}
