export const SENTRY_DSN = 'https://dd98dd6ca4df23ad958966a5384321e2@o28940.ingest.us.sentry.io/4508735015026688';

/** Shared by the browser and Worker SDKs, so an error can be traced to the deploy that shipped it. */
export const sentryOptions = {
  dsn: SENTRY_DSN,
  enabled: import.meta.env.PROD,
  environment: import.meta.env.SENTRY_ENVIRONMENT,
  release: import.meta.env.SENTRY_RELEASE,
  tracesSampleRate: 1.0,
};

/** Waku's notFound() and redirects are thrown as errors with this digest. They aren't bugs. */
export function isExpectedRouterError(error: unknown) {
  const digest = (error as { digest?: unknown } | null)?.digest;
  return typeof digest === 'string' && digest.startsWith('__WAKU_CUSTOM_ERROR__;');
}
