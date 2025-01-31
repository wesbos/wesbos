import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { readdirSync } from 'fs';

// find the local *.sqlite file. This is because we cannot connect to the D1 database from the local environment.
const D1_DATABASE_PATH = './.wrangler/state/v3/d1/miniflare-D1DatabaseObject';
const sqliteFile = readdirSync(D1_DATABASE_PATH).find(file => file.endsWith('.sqlite'));
export default defineConfig({
  out: './migrations',
  schema: './db/schema.ts',
  dialect: 'sqlite',
  ...(process.env.NODE_ENV === 'development' ?
    // Local D1
    {
      dbCredentials: { url: `${D1_DATABASE_PATH}/${sqliteFile}` },
    } : {
      // Cloudflare D1
      driver: 'd1-http',
      dbCredentials: {
        accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
        databaseId: process.env.CLOUDFLARE_DATABASE_ID,
        token: process.env.CLOUDFLARE_D1_TOKEN,
      },
    }),
});

