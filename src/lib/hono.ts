import type { Context, Env } from 'hono';
import { unstable_getContextData as getContextData } from 'waku/server';
import { isBuild } from './waku';

export type HonoContextType<E extends Env = Env> = Context<E>;

/**
 * @description Get the Hono context from Waku's context data
 * In Waku v1, the Hono context is stored in the context data under '__hono_context'
 */
export const getHonoContext = <E extends Env = Env>(ctx?: { data: Record<string, unknown> }): HonoContextType<E> | null => {
  try {
    if (ctx) {
      return ctx.data.__hono_context as HonoContextType<E>;
    }
    if ((globalThis as Record<string, unknown>).__hono_context) {
      return (globalThis as Record<string, unknown>).__hono_context as HonoContextType<E>;
    }
    const contextData = getContextData();
    if (contextData?.__hono_context) {
      return contextData.__hono_context as HonoContextType<E>;
    }
    return null;
  } catch (e) {
    return null;
  }
};

/**
 * @description Get the Cloudflare context
 * @returns The Hono context with Cloudflare bindings, or undefined
 * @deprecated Use getHonoContext() instead
 */
export function getCloudflareContext() {
  if (isBuild()) {
    return undefined;
  }
  return getHonoContext<{ Bindings: Env }>();
}
