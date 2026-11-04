import * as Sentry from '@sentry/react';
import { sentryOptions } from './sentry';

// /og is only loaded by the screenshot browser behind /og.jpg. It waits for the network to go
// quiet, so tracing and replay would hold up every image and report sessions nobody visited.
if (location.pathname !== '/og') {
  Sentry.init({
    ...sentryOptions,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],

    // Only same-origin requests, like Waku's RSC fetches, get trace headers
    tracePropagationTargets: [/^\//, /^https:\/\/wesbos\.com/],

    // There's no user data on this site, so record every session unmasked
    replaysSessionSampleRate: 1.0,
    replaysOnErrorSampleRate: 1.0,
  });
}
