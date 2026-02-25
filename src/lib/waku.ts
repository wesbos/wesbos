import { getEnv as getWakuEnv } from 'waku';
import { getHonoContext } from './hono';

export function isBuild(): boolean {
  return typeof process !== 'undefined' && process.env.WAKU_BUILD === 'true';
}

export function getEnv(key: string): string | undefined {
  if (isBuild()) {
    return getWakuEnv(key);
  }
  const c = getHonoContext();
  return c?.env?.[key] || getWakuEnv(key) || process.env[key];
}
