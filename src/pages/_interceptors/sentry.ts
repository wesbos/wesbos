import * as Sentry from '@sentry/cloudflare';
import type { HandlerInterceptor } from 'waku/router/server';
import { isExpectedRouterError } from '@/lib/sentry';

/** Catches errors thrown before a render starts streaming, which Waku turns into a 500. */
const sentry: HandlerInterceptor = async (next) => {
  try {
    return await next();
  } catch (error) {
    if (!isExpectedRouterError(error)) Sentry.captureException(error);
    throw error;
  }
};

export default sentry;
