import { Hono } from 'hono';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { hasErroredBoundary, isCacheable, responseCacheMiddleware } from './responseCache';

describe('isCacheable', () => {
  test('caches plain 200s', () => {
    expect(isCacheable(new Response('ok'))).toBe(true);
  });

  test.each([301, 302, 404, 500, 502, 503])('skips %i', (status) => {
    expect(isCacheable(new Response(status === 301 || status === 302 ? null : 'x', { status }))).toBe(false);
  });

  test('skips responses that set cookies', () => {
    expect(isCacheable(new Response('ok', { headers: { 'Set-Cookie': 'a=1' } }))).toBe(false);
  });
});

describe('hasErroredBoundary', () => {
  test('spots React client-render instructions', () => {
    expect(hasErroredBoundary('<script>$RX=function(b,c,d){};$RX("B:0","digest")</script>')).toBe(true);
    expect(hasErroredBoundary('<script>$RX("B:1")</script>')).toBe(true);
  });

  test('ignores normal pages', () => {
    expect(hasErroredBoundary('<html><body><p>The $RX variable</p><script>$RC("B:0","S:0")</script>')).toBe(false);
  });
});

describe('responseCacheMiddleware', () => {
  const store = new Map<string, Response>();
  const waits: Promise<unknown>[] = [];

  beforeEach(() => {
    store.clear();
    waits.length = 0;
    vi.stubEnv('DEV', false);
    vi.stubEnv('WAKU_BUILD_ID', 'build-a');
    vi.stubGlobal('caches', {
      open: async () => ({
        match: async (key: string) => store.get(key)?.clone(),
        put: async (key: string, res: Response) => {
          store.set(key, res);
        },
      }),
    });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  function app(handler: (path: string) => Response) {
    const a = new Hono();
    a.use(responseCacheMiddleware());
    a.get('*', (c) => handler(c.req.path));
    return a;
  }

  async function get(a: Hono, path: string) {
    const ctx = { waitUntil: (p: Promise<unknown>) => waits.push(p), passThroughOnException() {}, props: {} };
    const res = await a.request(`https://wesbos.com${path}`, {}, {}, ctx as unknown as ExecutionContext);
    const body = await res.text();
    await Promise.all(waits);
    return { res, body };
  }

  const html = (body: string, status = 200) =>
    new Response(body, { status, headers: { 'Content-Type': 'text/html; charset=utf-8' } });

  test('caches a good page and serves it from cache', async () => {
    let renders = 0;
    const a = app(() => {
      renders++;
      return html('<p>hi</p>');
    });
    await get(a, '/about');
    const second = await get(a, '/about');
    expect(renders).toBe(1);
    expect(second.body).toBe('<p>hi</p>');
    expect(second.res.headers.get('x-wes-cached-this')).toBeTruthy();
  });

  test('does not cache 503s or redirects', async () => {
    let renders = 0;
    const a = app((path) => {
      renders++;
      return path === '/old' ? new Response(null, { status: 301, headers: { Location: '/new' } }) : html('down', 503);
    });
    await get(a, '/old');
    await get(a, '/old');
    await get(a, '/down');
    await get(a, '/down');
    expect(renders).toBe(4);
    expect(store.size).toBe(0);
  });

  test('serves but does not cache a page whose Suspense content errored', async () => {
    const a = app(() => html('<p>partial</p><script>$RX("B:0","1234")</script>'));
    const first = await get(a, '/blog');
    expect(first.body).toContain('partial');
    expect(store.size).toBe(0);
  });

  test('a new build does not reuse the previous build cache', async () => {
    let renders = 0;
    const a = app(() => {
      renders++;
      return html('<p>hi</p>');
    });
    await get(a, '/about');
    vi.stubEnv('WAKU_BUILD_ID', 'build-b');
    await get(a, '/about');
    expect(renders).toBe(2);
  });

  test('caches lazy slices for 5 minutes but not page RSC payloads', async () => {
    let renders = 0;
    const a = app(() => {
      renders++;
      return new Response('0:["$","div"]', { headers: { 'Content-Type': 'text/x-component' } });
    });
    await get(a, '/RSC/S/twitter.txt');
    const second = await get(a, '/RSC/S/twitter.txt');
    expect(renders).toBe(1);
    expect(second.res.headers.get('CDN-Cache-Control')).toBe('max-age=300');

    await get(a, '/RSC/R/about.txt');
    await get(a, '/RSC/R/about.txt');
    expect(renders).toBe(3);
  });

  test('keeps binary bodies intact', async () => {
    const bytes = new Uint8Array([0xff, 0xd8, 0xff, 0x00, 0x80]);
    const a = app(() => new Response(bytes, { headers: { 'Content-Type': 'image/jpeg' } }));
    await get(a, '/og.jpg');
    const cached = [...store.values()][0];
    expect(new Uint8Array(await cached.arrayBuffer())).toEqual(bytes);
  });
});
