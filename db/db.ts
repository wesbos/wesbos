import 'server-only';
import { drizzle } from 'drizzle-orm/d1';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import * as schema from '@/db/schema';

/**
 * @description Get the database connection - D1 Databases cannot be connected to from outside the worker (unless using the D1 HTTP driver, which Drizzle Studio/Kit use), so we need to get the context and then use the DB from there.
 */
export async function getDb() {
  const context = await getCloudflareContext();
  const db = drizzle(context.env.DB, {
    schema,
  });
  console.dir(db, { depth: null });
  return db;
}

