import type { Context } from 'hono';
import * as Sentry from "@sentry/cloudflare";

export const withSentry = (app: Hono) => Sentry.withSentry(
  (env) => ({
    dsn: "https://dd98dd6ca4df23ad958966a5384321e2@o28940.ingest.us.sentry.io/4508735015026688",

    // Set tracesSampleRate to 1.0 to capture 100% of spans for tracing.
    // Learn more at
    // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
    tracesSampleRate: 1.0,
  }),
  app
);
