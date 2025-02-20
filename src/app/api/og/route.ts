import { NextRequest, NextResponse } from 'next/server';
// import { getCloudflareContext } from '@/lib/hono';
// import { Browser } from '@cloudflare/puppeteer';

// const { env } = getCloudflareContext();
// const kv = env.OG;

// const exePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
// let browser: Browser;

// async function getBrowser() {
//   // If we are in a cloudflare Worker, we need to use the browser binding and @cloudflare/puppeteer
//   if (env.MYBROWSER) {
//     console.log(`🎭 Using cloudflare puppeteer`);
//     const { default: puppeteer } = await import("@cloudflare/puppeteer");
//     console.log(`imported puppeteer!`);
//     return puppeteer.launch(env.MYBROWSER);
//   };
//   // // otherwise, we use puppeteer-core
//   // const { default: puppeteer } = await import('puppeteer-core');
//   // // Local dev, use local chrome
//   // if (process.env.NODE_ENV === 'development') {
//   //   console.log(`🎭 Using local puppeteer`);
//   //   return puppeteer.launch({
//   //     browser: 'chrome',
//   //     args: [],
//   //     executablePath: exePath,
//   //     headless: true,
//   //   });
//   // }
//   // // Otherwise, we use @sparticuz/chromium which fits into a serverless environment (like netlify functions)
//   // console.log(`🎭 Using @sparticuz/chromium`);
//   // const { default: chrome } = await import('@sparticuz/chromium');
//   // return puppeteer.launch({
//   //   browser: 'chrome',
//   //   args: chrome.args,
//   //   executablePath: await chrome.executablePath(),
//   //   headless: chrome.headless,
//   // });
// }


// async function getScreenshot(url: string) {
//   // first check if this value has been cached
//   const cachedImage = await kv.get(url, 'arrayBuffer');
//   if (false && cachedImage) {
//     console.log('Returning cached image');
//     return cachedImage;
//   }
//   browser = await getBrowser();
//   console.log(`Browser launched`, browser);
//   const page = await browser.newPage();
//   console.log(`Page created`, page);
//   await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1.5 });
//   console.log(`Viewport set`);
//   await page.goto(url, { waitUntil: 'networkidle0' });
//   console.log(`Page navigated`);
//   const buffer = await page.screenshot({ type: 'png' });
//   console.log(`Screenshot taken`);
//   // Cache to KV
//   await kv.put(url, buffer, {
//     expirationTtl: 60 * 60 * 24 * 30, // 30 days
//   });
//   console.log(`Put in KV cache`);
//   console.log(`Returning buffer`);
//   await browser.close();
//   return buffer;
// }

// export async function GET(request: NextRequest) {
//   const qs = new URLSearchParams(request.nextUrl.searchParams);
//   const url = `${request.nextUrl.origin}/og?${qs.toString()}`;
//   console.log(`Getting screenshot for ${url}`);
//   const photoBuffer = await getScreenshot(url).catch(async (err) => {
//     console.log(`Error getting screenshot`, err);
//     await browser.close();
//     throw err;
//   });
//   console.log(`Returning response`);
//   return new NextResponse(photoBuffer, {
//     headers: {
//       'Content-Type': 'image/png',
//     },
//   });
// }

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'Hello World. I am too large' });
}
