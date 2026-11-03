import { trimTrailingSlash } from 'hono/trailing-slash';
import { errorLoggingMiddleware } from './errorLogging';
import { ogJpgMiddleware } from './ogJpg';
import { responseCacheMiddleware } from './responseCache';

/**
 * Order: outer → inner (first runs first on the request, last after `next()` on the way back).
 * Error logging is outermost so it sees everything below it.
 * Trailing slash: Hono's trimTrailingSlash 301s GET/HEAD `/path/` → `/path` and keeps the query
 * string (root "/" unchanged). It runs before RSC and pairs with Wrangler assets `html_handling`.
 * Cache sits innermost so it wraps the Waku RSC handler; OG runs inside the cache layer on misses.
 */
export const cloudflareMiddlewareFns = [
  errorLoggingMiddleware,
  () => trimTrailingSlash({ alwaysRedirect: true }),
  ogJpgMiddleware,
  responseCacheMiddleware,
] as const;
