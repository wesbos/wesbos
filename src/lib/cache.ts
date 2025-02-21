import { getKV } from '@/db/db';

const CACHE_KEYS_KEY = 'cache_keys';
const DEFAULT_EXPIRY = 60 * 60; // 1 hour in seconds

type CacheOptions = {
  expiry?: number; // in seconds
  key?: string;
};

/**
 * Wraps a function with KV caching capabilities
 * @param fn The function to cache
 * @param options Cache options including expiry time and custom key
 * @returns The cached or fresh result of the function
 */
export async function withCache<T>(
  fn: () => Promise<T>,
  options: CacheOptions = {}
): Promise<T | null> {
  const kv = await getKV();
  if (!kv) return fn();

  const { expiry = DEFAULT_EXPIRY, key = fn.name } = options;

  // Try to get from cache first
  try {
    const cached = await kv.get(key);
    if (cached) {
      return JSON.parse(cached) as T;
    }
  } catch (e) {
    console.error('Cache read error:', e);
  }

  // If not in cache, execute function
  const result = await fn();

  // Store in cache
  try {
    await kv.put(key, JSON.stringify(result), { expirationTtl: expiry });

    // Add to cache keys list
    const existingKeys = await kv.get(CACHE_KEYS_KEY);
    const keys = existingKeys ? new Set(JSON.parse(existingKeys)) : new Set();
    keys.add(key);
    await kv.put(CACHE_KEYS_KEY, JSON.stringify(Array.from(keys)));
  } catch (e) {
    console.error('Cache write error:', e);
  }

  return result;
}

/**
 * Invalidates a specific cache key
 * @param key The cache key to invalidate
 */
export async function invalidateCache(key: string): Promise<void> {
  const kv = await getKV();
  if (!kv) return;

  try {
    await kv.delete(key);

    // Remove from cache keys list
    const existingKeys = await kv.get(CACHE_KEYS_KEY);
    if (existingKeys) {
      const keys = new Set(JSON.parse(existingKeys));
      keys.delete(key);
      await kv.put(CACHE_KEYS_KEY, JSON.stringify(Array.from(keys)));
    }
  } catch (e) {
    console.error('Cache invalidation error:', e);
  }
}

/**
 * Invalidates all cached items
 */
export async function invalidateAllCache(): Promise<void> {
  const kv = await getKV();
  if (!kv) return;

  try {
    const existingKeys = await kv.get(CACHE_KEYS_KEY);
    if (existingKeys) {
      const keys = JSON.parse(existingKeys) as string[];
      await Promise.all(keys.map(key => kv.delete(key)));
      await kv.delete(CACHE_KEYS_KEY);
    }
  } catch (e) {
    console.error('Cache invalidation error:', e);
  }
}
