import * as schema from '@/db/schema';
import { getCloudflareContext } from '@/lib/hono';
import { drizzle } from 'drizzle-orm/d1';

/**
 * @description Get the database connection - D1 Databases cannot be connected to from outside the worker (unless using the D1 HTTP driver, which Drizzle Studio/Kit use), so we need to get the context and then use the DB from there.
 */
export async function getDb() {
  const context = getCloudflareContext();
  if (!context?.env?.DB) return;
  const db = drizzle(context.env.DB, {
    schema,
  });
  return db;
}

export async function getKV() {
  const context = getCloudflareContext();
  if (!context) return;
  return context.env.OG;
}
