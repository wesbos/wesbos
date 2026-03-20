import type { Browser } from '@cloudflare/puppeteer';
import puppeteer from '@cloudflare/puppeteer';
import type { MiddlewareHandler } from 'hono';

type OgEnv = {
  OG?: KVNamespace;
  MYBROWSER?: unknown;
};

async function getScreenshot(pageUrl: string, c: { env: OgEnv }): Promise<Uint8Array> {
  const kv = c.env.OG;
  if (kv) {
    const cached = await kv.get(pageUrl, 'arrayBuffer');
    if (cached) {
      return new Uint8Array(cached);
    }
  }

  const env = c.env as OgEnv;
  let browser: Browser | undefined;

  try {
    if (env.MYBROWSER) {
      browser = await puppeteer.launch(env.MYBROWSER as Parameters<typeof puppeteer.launch>[0]);
    } else if (import.meta.env.DEV) {
      const { getChromeWsEndpoint } = await import('@/utils/localChrome');
      const browserWSEndpoint = await getChromeWsEndpoint();
      browser = await puppeteer.connect({ browserWSEndpoint });
    } else {
      throw new Error('OG image: MYBROWSER binding missing in production');
    }

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1.5 });
    await page.goto(pageUrl, { waitUntil: 'networkidle0' });
    const shot = await page.screenshot({ type: 'png' });
    const buffer = shot instanceof Uint8Array ? shot : new Uint8Array(shot);

    if (kv) {
      try {
        await kv.put(pageUrl, buffer, { expirationTtl: 60 * 60 * 24 * 30 });
      } catch {
        console.log('Error caching OG image in KV. Skipping');
      }
    }

    return buffer;
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch {
        /* ignore */
      }
    }
  }
}

/**
 * Serves PNG screenshots of `/og?...` at `/og.jpg?...` (Open Graph images).
 */
export function ogJpgMiddleware(): MiddlewareHandler {
  return async (c, next) => {
    const url = new URL(c.req.url);
    if (!url.pathname.startsWith('/og.jpg')) {
      await next();
      return;
    }

    const target = `${url.origin}/og?${url.searchParams.toString()}`;
    const photoBuffer = await getScreenshot(target, c);

    const png = new Uint8Array(photoBuffer.byteLength);
    png.set(photoBuffer);
    return new Response(png, {
      headers: {
        'Content-Type': 'image/png',
        'CDN-Cache-Control': 'public, max-age=86400',
      },
    });
  };
}
