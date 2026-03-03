import { getEnv as getWakuEnv } from 'waku';

export function isBuild(): boolean {
  return typeof process !== 'undefined' && process.env.WAKU_BUILD === 'true';
}

export function getEnv(key: string): string | undefined {
  return getWakuEnv(key) || process.env[key];
}
