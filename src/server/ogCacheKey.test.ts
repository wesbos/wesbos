import { describe, expect, test } from 'vitest';
import { getOgCacheKey } from './ogCacheKey';

describe('getOgCacheKey', () => {
  test('keeps URLs that fit, so existing cached images stay valid', async () => {
    const url = `https://wesbos.com/og?title=${'a'.repeat(100)}`;
    expect(await getOgCacheKey(url)).toBe(url);
    const atLimit = 'a'.repeat(512);
    expect(await getOgCacheKey(atLimit)).toBe(atLimit);
  });

  test('hashes URLs over the limit into a short, stable key', async () => {
    const url = `https://wesbos.com/og?thumbnail=${'a'.repeat(4000)}`;
    const key = await getOgCacheKey(url);
    expect(key).toMatch(/^sha256:[0-9a-f]{64}$/);
    expect(await getOgCacheKey(url)).toBe(key);
    expect(await getOgCacheKey(`${url}b`)).not.toBe(key);
  });

  test('measures bytes, not characters', async () => {
    expect(await getOgCacheKey('é'.repeat(300))).toMatch(/^sha256:/);
  });
});
