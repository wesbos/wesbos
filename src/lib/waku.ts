import { unstable_getBuildOptions } from 'waku/server';
import { getEnv as getWakuEnv } from 'waku';
import { getCloudflareContext } from './hono';

export function isBuild() {
  return !!unstable_getBuildOptions().unstable_phase;
}

export function getEnv(key: string): string | undefined {
  if (isBuild()) {
    // Environment variables present at build time in process.env
    return getWakuEnv(key);
  }
  const c = getCloudflareContext();
  // Runtime Cloudflare environment variables
  // https://developers.cloudflare.com/workers/configuration/environment-variables/
  return c?.env[key] || process.env[key];
}
