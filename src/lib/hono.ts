import type { Env } from 'hono';
import { getHonoContext as getHonoContextFromWaku } from 'waku/unstable_hono';
import { getHonoContext as getHonoContextWaku } from 'waku/unstable_hono';
import type { HandlerContext } from 'waku/lib/middleware/types';
import { isBuild } from './waku';

/**
 * @description Get the Cloudflare context
 * @returns {Env | undefined}
 * @deprecated Use getHonoContext() instead
 */
export function getCloudflareContext() {
  if (isBuild()) {
    return undefined;
  }
  try {
    return getHonoContextFromWaku<{ Bindings: Env }>();
  } catch (e) {
    if (isHonoContextUnavailableError(e)) {
      return undefined;
    }
    throw e;
  }
}
const isHonoContextUnavailableError = (e: unknown): boolean => {
  return e instanceof Error && e.message === 'Hono context is not available';
};

export type HonoContextType<E extends Env = Env> = ReturnType<typeof getHonoContextWaku<E>>;

export const getHonoContext = <E extends Env = Env>(ctx?: HandlerContext): HonoContextType<E> | null => {
  try {
    if (ctx) {
      return ctx.data.__hono_context as HonoContextType<E>;
    }
    if ((globalThis as Record<string, unknown>).__hono_context) {
      return (globalThis as Record<string, unknown>).__hono_context as HonoContextType<E>;
    }
    const c = getHonoContextWaku<E>();
    if (!c) {
      return null;
    }
    return c;
  } catch (e) {
    return null;
  }
};
