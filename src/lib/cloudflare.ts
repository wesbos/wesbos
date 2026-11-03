import { getEnv as getWakuEnv } from 'waku';

type CloudflareEnv = Record<string, unknown>;

export function isBuild(): boolean {
  return typeof process !== 'undefined' && process.env.WAKU_BUILD === 'true';
}

export function getEnv(key: string): string | undefined {
  return getWakuEnv(key) || process.env[key];
}

/**
 * Bindings come from `cloudflare:workers`, in production and in dev (via `@cloudflare/vite-plugin`).
 */
export async function getCloudflareEnv(): Promise<CloudflareEnv | undefined> {
  if (isBuild()) return undefined;

  try {
    // Avoid static dep-scanner resolution in local dev.
    const workersModuleId = 'cloudflare:workers';
    const { env } = await import(/* @vite-ignore */ workersModuleId);

    return env as CloudflareEnv;
  } catch {
    return undefined;
  }
}
