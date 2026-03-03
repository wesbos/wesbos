import { getEnv as getWakuEnv } from 'waku';

type CloudflareEnv = Record<string, unknown>;

export function isBuild(): boolean {
  return typeof process !== 'undefined' && process.env.WAKU_BUILD === 'true';
}

export function getEnv(key: string): string | undefined {
  return getWakuEnv(key) || process.env[key];
}

/**
 * In production, bindings come from `cloudflare:workers`.
 * In dev, waku.server.ts injects wrangler's getPlatformProxy onto globalThis.
 */
export async function getCloudflareEnv(): Promise<CloudflareEnv | undefined> {
  if (isBuild()) return undefined;

  const devProxy = (globalThis as Record<string, unknown>).__waku_dev_proxy__ as
    | { env: CloudflareEnv }
    | undefined;
  if (devProxy) return devProxy.env;

  try {
    // Avoid static dep-scanner resolution in local dev.
    const workersModuleId = 'cloudflare:workers';
    const { env } = await import(/* @vite-ignore */ workersModuleId);

    return env as CloudflareEnv;
  } catch {
    return undefined;
  }
}
