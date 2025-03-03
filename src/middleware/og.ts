import type { Middleware } from 'waku/config';
import type { Context } from 'hono';
import { Browser } from '@cloudflare/puppeteer';
import { getHonoContext } from '@/lib/hono';
import puppeteer from '@cloudflare/puppeteer';

let browser: Browser;

/**
 * @todo: This should be switched to using the Cloudlfare cache as seen in
 * @link middleware/cache.ts
 */
async function getScreenshot(url: string, ctx: HandlerContext) {
  const env = getHonoContext(ctx)?.env;
  const kv = env?.OG;
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
    if (process.env.NODE_ENV === 'development') {
      const { getChromeWsEndpoint } = await import('@/utils/localChrome');
      const browserWSEndpoint = await getChromeWsEndpoint();
      browser = await puppeteer.connect({ browserWSEndpoint });
    } else {
      browser = await puppeteer.launch(env.MYBROWSER);
    }
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

const ogInterceptor: Middleware = () => {
  return async function cache(ctx, next) {
    if (!ctx.req.url.pathname.startsWith('/og.jpg')) return next();

    const c = ctx.data.__hono_context as Context; // This is the Hono context
    console.log(`OG Middleware!`);
    // ctx.res.body = 'Hello World';
    // ctx.res.status = 200;
    // return;

    const qs = new URLSearchParams(ctx.req.url.searchParams);
    const url = `${ctx.req.url.origin}/og?${qs.toString()}`;
    console.log(`Getting screenshot for ${url}`);
    const photoBuffer = await getScreenshot(url, ctx).catch(async (err) => {
      console.log(`Error getting screenshot`, err);
      console.dir(err);
      await browser.close();
      throw err;
    });
    console.log(`Returning response`);
    ctx.res.body = photoBuffer;
    ctx.res.headers = {
      'Content-Type': 'image/png',
      'CDN-Cache-Control': 'public, max-age=86400', // 1 day
    };
    return;
  };
};

export default ogInterceptor;
