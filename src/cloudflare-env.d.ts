/// <reference types="@cloudflare/workers-types" />

/** Wrangler bindings — keep in sync with `wrangler.jsonc` */
interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  MYBROWSER?: Fetcher;
  NEXT_CACHE_WORKERS_KV: KVNamespace;
  OG: KVNamespace;
}
