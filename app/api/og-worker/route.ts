import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { Browser } from '@cloudflare/puppeteer';
import { getChromeWsEndpoint } from '@/utils/localChrome';
const puppeteer = require('@cloudflare/puppeteer');
let browser: Browser;

async function getScreenshot(url: string) {
  const env = (await getCloudflareContext()).env;
  const kv = env.OG;
  console.log(`env`, env);
  // first check if this value has been cached
  const cachedImage = await kv.get(url, 'arrayBuffer');
  if (cachedImage) {
    console.log('Returning cached image');
    return cachedImage;
  }
  console.log(`Launching browser`);
  console.log(`Cloudflare Browser:`, env.MYBROWSER);
  console.log(`KV Cache:`, kv);
  if (env.MYBROWSER) {
    // Cloudflare Browser
    browser = await puppeteer.launch(env.MYBROWSER);
  } else {
    // Local Browser (for local development)
    const browserWSEndpoint = await getChromeWsEndpoint();
    browser = await puppeteer.connect({ browserWSEndpoint });
  }
  console.log(`Browser launched`);
  const page = await browser.newPage();
  console.log(`Page created`);
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1.5 });
  console.log(`Viewport set`);
  await page.goto(url, { waitUntil: 'networkidle0' });
  console.log(`Page navigated`);
  const buffer = await page.screenshot({ type: 'png' });
  console.log(`Screenshot taken`);
  // Cache to KV
  // TODO Caching stopped working for some reason locally with miniflare.
  try {
    await kv.put(url, buffer, {
      expirationTtl: 60 * 60 * 24 * 30, // 30 days
    });
  } catch (err) {
    console.log(`Error caching image. Skipping`);
  }
  console.log(`Put in KV cache`);
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
    console.dir(err)
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
