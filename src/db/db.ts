import { drizzle } from 'drizzle-orm/d1';
import * as schema from '@/db/schema';
import { getCloudflareEnv } from '@/lib/cloudflare';

export async function getDb() {
  const env = await getCloudflareEnv();
  if (!env?.DB) return;
  const db = drizzle(env.DB as Parameters<typeof drizzle>[0], { schema });
  return db;
}

export async function getKV() {
  const env = await getCloudflareEnv();
  if (!env?.OG) return;
  return env.OG;
}
