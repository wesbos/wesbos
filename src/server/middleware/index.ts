import { agentReadinessMiddleware } from './agentReadiness';
import { errorLoggingMiddleware } from './errorLogging';
import { ogJpgMiddleware } from './ogJpg';
import { responseCacheMiddleware } from './responseCache';
import { trailingSlashMiddleware } from './trailingSlash';

/**
 * Order: outer → inner (first runs first on the request, last after `next()` on the way back).
 * Cache sits innermost so it wraps the Waku RSC handler; OG and trailing slash run inside the cache layer on misses.
 */
export const cloudflareMiddlewareFns = [
  errorLoggingMiddleware,
  trailingSlashMiddleware,
  ogJpgMiddleware,
  agentReadinessMiddleware,
  responseCacheMiddleware,
] as const;
